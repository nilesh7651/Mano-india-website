const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createVenue, getVenues, getVenueById, getMyVenue, updateVenue } = require("../controllers/venueController");

// CREATE VENUE
router.post("/", protect, createVenue);
// PUBLIC LIST
router.get("/", getVenues);
// GET OWN VENUE PROFILE
router.get("/profile", protect, getMyVenue);
// GET SINGLE VENUE
router.get("/:id", getVenueById);
// UPDATE VENUE
router.put("/profile", protect, updateVenue);

module.exports = router;
