const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getPendingArtists,
  approveArtist,
} = require("../controllers/adminController");

// ARTIST VERIFICATION
router.get("/artists/pending", protect, adminOnly, getPendingArtists);
router.put("/artists/:id/approve", protect, adminOnly, approveArtist);

module.exports = router;
