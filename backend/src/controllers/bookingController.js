const Booking = require("../models/Booking");
const Artist = require("../models/Artist");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { artistId, eventDate, eventLocation } = req.body;

    if (!artistId || !eventDate || !eventLocation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const existingBooking = await Booking.findOne({
      artist: artistId,
      eventDate,
      status: { $in: ["pending", "approved"] },
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "Artist already booked on this date" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      artist: artistId,
      eventDate,
      eventLocation,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER BOOKINGS
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("artist")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ARTIST BOOKINGS
const getArtistBookings = async (req, res) => {
  try {
    const artist = await Artist.findOne({ user: req.user._id });
    if (!artist) {
      return res.status(403).json({ message: "Artist profile not found" });
    }

    const bookings = await Booking.find({ artist: artist._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id).populate("artist");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const artist = await Artist.findOne({ user: req.user._id });
    if (!artist || booking.artist._id.toString() !== artist._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getArtistBookings,
  updateBookingStatus,
};
