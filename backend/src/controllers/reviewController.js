const Review = require("../models/Review");
const Booking = require("../models/Booking");

// CREATE REVIEW
const createReview = async (req, res) => {
  try {
    const { rating, comment, bookingId } = req.body;

    if (!rating || !bookingId) {
      return res.status(400).json({ message: "Rating and bookingId required" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure booking belongs to user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your booking" });
    }

    // Only completed bookings
    if (booking.bookingStatus !== "completed") {
      return res
        .status(400)
        .json({ message: "Booking not completed yet" });
    }

    const review = await Review.create({
      user: req.user._id,
      artist: booking.artist,
      booking: booking._id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Review already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEWS FOR ARTIST
const getArtistReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ artist: req.params.artistId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getArtistReviews,
};
