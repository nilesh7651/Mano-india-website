const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getArtistBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const artistOnly = require("../middleware/roleMiddleware");

// USER
router.post("/", protect, createBooking);
router.get("/user", protect, getUserBookings);

// ARTIST
router.get("/artist", protect, artistOnly, getArtistBookings);
router.put("/:id", protect, artistOnly, updateBookingStatus);

module.exports = router;
