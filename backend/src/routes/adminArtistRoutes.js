const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllArtists,
  getPendingArtists,
  approveArtist,
  rejectArtist,
} = require("../controllers/adminArtistController");

// List artists
router.get("/artists", protect, adminOnly, getAllArtists);
router.get("/artists/pending", protect, adminOnly, getPendingArtists);

// Approve / Reject
router.put("/artists/:id/approve", protect, adminOnly, approveArtist);
router.delete("/artists/:id/reject", protect, adminOnly, rejectArtist);

module.exports = router;
