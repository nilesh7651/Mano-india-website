const express = require("express");
const router = express.Router();

const {
  createArtistProfile,
  getAllArtists,
  getArtistById,
  getCurrentArtist,
  updateArtistProfile,
} = require("../controllers/artistController");

const protect = require("../middleware/authMiddleware");
const artistOnly = require("../middleware/roleMiddleware");

// Public routes
router.get("/", getAllArtists);
// Protected route to get own profile
router.get("/profile", protect, artistOnly, getCurrentArtist);
router.get("/:id", getArtistById);

// Protected route (artist only)
router.post("/", protect, artistOnly, createArtistProfile);
router.put("/profile", protect, artistOnly, updateArtistProfile);

module.exports = router;
