const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createVenueBooking } = require("../controllers/venueBookingController");

router.post("/", protect, createVenueBooking);

module.exports = router;
