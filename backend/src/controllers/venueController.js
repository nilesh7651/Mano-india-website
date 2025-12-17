const Venue = require("../models/Venue");

// CREATE VENUE (OWNER)
const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create({
      owner: req.user._id,
      ...req.body,
    });

    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VERIFIED VENUES (PUBLIC)
const getVenues = async (req, res) => {
  const venues = await Venue.find({ isVerified: true });
  res.json(venues);
};

module.exports = { createVenue, getVenues };
