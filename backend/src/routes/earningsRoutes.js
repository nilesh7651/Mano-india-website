const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getPlatformEarnings,
  getCompletedBookings,
} = require("../controllers/earningsController");

router.get("/summary", protect, adminOnly, getPlatformEarnings);
router.get("/bookings", protect, adminOnly, getCompletedBookings);

module.exports = router;
