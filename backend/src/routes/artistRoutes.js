const express = require("express");
const router = express.Router();

const {
  createArtistProfile,
  getAllArtists,
  getArtistById,
} = require("../controllers/artistController");

const protect = require("../middleware/authMiddleware");
const artistOnly = require("../middleware/roleMiddleware");

// Public routes
router.get("/", getAllArtists);
router.get("/:id", getArtistById);

// Protected route (artist only)
router.post("/", protect, artistOnly, createArtistProfile);

module.exports = router;
