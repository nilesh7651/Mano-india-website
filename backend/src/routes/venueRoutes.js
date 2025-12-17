const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createVenue, getVenues } = require("../controllers/venueController");

router.post("/", protect, createVenue);     // venue owner
router.get("/", getVenues);                 // public

module.exports = router;
