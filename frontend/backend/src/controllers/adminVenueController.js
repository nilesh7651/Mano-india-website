const Venue = require("../models/Venue");

// GET ALL PENDING VENUES
const getPendingVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ isVerified: false }).populate(
      "owner",
      "name email"
    );
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE VENUE
const approveVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    venue.isVerified = true;
    await venue.save();

    res.json({ message: "Venue approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingVenues,
  approveVenue,
};
