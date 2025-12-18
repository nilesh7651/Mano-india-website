const Booking = require("../models/Booking");
const Artist = require("../models/Artist");
const Venue = require("../models/Venue");
const notify = require("../utils/createNotification");

const createBooking = async (req, res) => {
  try {
    const { artistId, venueId, eventDate, eventLocation } = req.body;

    // ✅ Basic validation
    if (!eventDate || !eventLocation) {
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

    const booking = await Booking.create({
      user: req.user._id,
      artist: artistId || undefined,
      venue: venueId || undefined,
      eventDate,
      eventLocation,
      amount,
      status: "PENDING",
      commissionRate: 0.1,
    });

    // 🔔 Notify owner
    await notify(
      ownerId,
      "New Booking Request",
      "You have received a new booking request."
    );

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
      .populate("artist", "name category")
      .populate("venue", "name venueType")
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

    // Check if user is the owner
    const isOwner = 
      (booking.artist && (await Artist.findById(booking.artist))?.user?.toString() === req.user._id.toString()) ||
      (booking.venue && (await Venue.findById(booking.venue))?.owner?.toString() === req.user._id.toString());

    if (!isOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.status !== "ACCEPTED") {
      return res.status(400).json({ message: "Booking must be accepted first" });
    }

    booking.status = "COMPLETED";
    booking.completedAt = new Date();
    await booking.save();

    // Notify user
    await notify(
      booking.user,
      "Booking Completed",
      "Your booking has been marked as completed. You can now leave a review."
    );

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

    const bookings = await Booking.find({ artist: artist._id })
      .populate("user", "name email")
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

    const bookings = await Booking.find({ venue: venue._id })
      .populate("user", "name email")
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
