const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Artist = require("../models/Artist");
const Venue = require("../models/Venue");
const EventManager = require("../models/EventManager");

// CREATE REVIEW
const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({ message: "Booking ID and Rating are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure user is the one who booked
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to review this booking" });
    }

    if (booking.status !== "COMPLETED") {
      return res.status(400).json({ message: "Can only review completed bookings" });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: "Review already submitted" });
    }

    const review = await Review.create({
      user: req.user._id,
      artist: booking.artist || undefined,
      venue: booking.venue || undefined,
      eventManager: booking.eventManager || undefined,
      booking: bookingId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEWS FOR ARTIST/VENUE/EVENT MANAGER
const getReviews = async (req, res) => {
  try {
    const { artistId, venueId, eventManagerId } = req.query;
    let filter = {};

    if (artistId) filter.artist = artistId;
    if (venueId) filter.venue = venueId;
    if (eventManagerId) filter.eventManager = eventManagerId;

    const reviews = await Review.find(filter).populate("user", "name").sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createReview, getReviews };
