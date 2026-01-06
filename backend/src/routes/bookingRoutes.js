const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getUserBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
  getArtistBookings,
  getVenueBookings,
  getEventManagerBookings,
} = require("../controllers/bookingController");

/**
 * USER
 */
router.post("/", protect, createBooking);
router.get("/user", protect, getUserBookings);

/**
 * ARTIST / VENUE OWNER
 */
router.get("/artist", protect, getArtistBookings);
router.get("/venue", protect, getVenueBookings);
router.get("/event-manager", protect, getEventManagerBookings);
router.put("/:id/accept", protect, acceptBooking);
router.put("/:id/reject", protect, rejectBooking);
router.put("/:id/complete", protect, completeBooking);

module.exports = router;
