const Booking = require("../models/Booking");
const Artist = require("../models/Artist");
const Venue = require("../models/Venue");
const notify = require("../utils/createNotification");

const createBooking = async (req, res) => {
  try {
    const { artistId, venueId, eventDate, eventLocation } = req.body;

    // ✅ Basic validation
    if (!eventDate || (!eventLocation && !venueId)) {
      return res.status(400).json({ message: "Event date & location required" });
    }

    if (!artistId && !venueId) {
      return res
        .status(400)
        .json({ message: "Artist or Venue is required" });
    }

    let amount;
    let ownerId;

    // ✅ Artist booking
    if (artistId) {
      const artist = await Artist.findById(artistId);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      amount = artist.pricePerEvent;
      ownerId = artist.user;
    }

    // ✅ Venue booking
    if (venueId) {
      const venue = await Venue.findById(venueId);
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      amount = venue.pricePerDay;
      ownerId = venue.owner;
    }

    // ✅ Final safety check
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid booking amount" });
    }

    // Default location for venue bookings if not provided
    const finalLocation = eventLocation || (venueId ? "At Venue" : "Unknown Location");

    const booking = await Booking.create({
      user: req.user._id,
      artist: artistId || undefined,
      venue: venueId || undefined,
      eventDate,
      eventLocation: finalLocation,
      amount,
      status: "AWAITING_PAYMENT",
      commissionRate: 0.05,
    });

    // Notification will be sent after payment verification

    res.status(201).json(booking);
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET USER BOOKINGS
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("artist", "name category phone")
      .populate("venue", "name venueType phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ACCEPT BOOKING
const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user is the owner (artist or venue owner)
    const isOwner =
      (booking.artist && (await Artist.findById(booking.artist))?.user?.toString() === req.user._id.toString()) ||
      (booking.venue && (await Venue.findById(booking.venue))?.owner?.toString() === req.user._id.toString());

    if (!isOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "ACCEPTED";

    // Calculate payout amounts
    booking.commissionAmount = booking.amount * booking.commissionRate;
    booking.payoutAmount = booking.amount - booking.commissionAmount;
    booking.payoutStatus = "PENDING";

    await booking.save();

    // Notify user
    await notify(
      booking.user,
      "Booking Accepted",
      "Your booking request has been accepted."
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REJECT BOOKING
const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user is the owner
    const isOwner =
      (booking.artist && (await Artist.findById(booking.artist))?.user?.toString() === req.user._id.toString()) ||
      (booking.venue && (await Venue.findById(booking.venue))?.owner?.toString() === req.user._id.toString());

    if (!isOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "REJECTED";
    await booking.save();

    // Notify user
    await notify(
      booking.user,
      "Booking Rejected",
      "Your booking request has been rejected."
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMPLETE BOOKING
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const userId = req.user._id.toString();
    const isArtist = booking.artist && (await Artist.findById(booking.artist))?.user?.toString() === userId;
    const isVenue = booking.venue && (await Venue.findById(booking.venue))?.owner?.toString() === userId;
    const isUser = booking.user.toString() === userId;

    if (!isArtist && !isVenue && !isUser) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.status !== "ACCEPTED") {
      return res.status(400).json({ message: "Booking must be accepted first" });
    }

    // Update flags
    if (isArtist || isVenue) {
      booking.artistCompleted = true;
    }
    if (isUser) {
      booking.userCompleted = true;
    }

    // Check if BOTH are completed
    if (booking.artistCompleted && booking.userCompleted) {
      booking.status = "COMPLETED";
      booking.completedAt = new Date();
      // Ready for payout
      booking.payoutStatus = "PENDING";

      // Notify both parties
      // Notify user
      await notify(
        booking.user,
        "Booking Completed",
        "Your event is marked as fully completed. You can now leave a review."
      );
      // Notify Artist/Venue? (Optional, maybe not needed as they probably just marked it)
    }

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ARTIST BOOKINGS
const getArtistBookings = async (req, res) => {
  try {
    const artist = await Artist.findOne({ user: req.user._id });
    if (!artist) {
      return res.status(403).json({ message: "Artist profile not found" });
    }

    const bookings = await Booking.find({
      artist: artist._id,
      status: { $ne: "AWAITING_PAYMENT" }
    })
      .populate("user", "name email phone")
      .populate("venue", "name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VENUE BOOKINGS
const getVenueBookings = async (req, res) => {
  try {
    const venue = await Venue.findOne({ owner: req.user._id });
    if (!venue) {
      return res.status(403).json({ message: "Venue not found" });
    }

    const bookings = await Booking.find({
      venue: venue._id,
      status: { $ne: "AWAITING_PAYMENT" }
    })
      .populate("user", "name email phone")
      .populate("artist", "name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
  getArtistBookings,
  getVenueBookings,
};
