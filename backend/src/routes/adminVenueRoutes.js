const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllVenues,
  getPendingVenues,
  approveVenue,
  rejectVenue,
} = require("../controllers/adminVenueController");

// List venues
router.get("/venues", protect, adminOnly, getAllVenues);
router.get("/venues/pending", protect, adminOnly, getPendingVenues);

// Approve / Reject
router.put("/venues/:id/approve", protect, adminOnly, approveVenue);
router.delete("/venues/:id/reject", protect, adminOnly, rejectVenue);

module.exports = router;
