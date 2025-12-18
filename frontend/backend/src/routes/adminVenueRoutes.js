const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getPendingVenues,
  approveVenue,
} = require("../controllers/adminVenueController");

// Admin only
router.get("/venues/pending", protect, adminMiddleware, getPendingVenues);
router.put(
  "/venues/:id/approve",
  protect,
  adminMiddleware,
  approveVenue
);

module.exports = router;
