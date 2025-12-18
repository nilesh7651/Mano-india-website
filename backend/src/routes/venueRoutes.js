const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createVenue, getVenues, getVenueById, getMyVenue } = require("../controllers/venueController");

router.post("/", protect, createVenue);     // venue owner
router.get("/", getVenues);                 // public
router.get("/my", protect, getMyVenue);     // get user's own venue
router.get("/:id", getVenueById);           // public

module.exports = router;
