const Venue = require("../models/Venue");

/**
 * GET ALL VENUES
 */
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET PENDING VENUES
 */
exports.getPendingVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ isVerified: false })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * APPROVE VENUE
 */
exports.approveVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate("owner");
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    venue.isVerified = true;
    await venue.save();

    // Notify venue owner
    const notify = require("../utils/createNotification");
    await notify(
      venue.owner._id,
      "Venue Approved",
      "Your venue has been approved! It is now visible to users."
    );

    res.json({ message: "Venue approved successfully", venue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REJECT / DELETE VENUE
 */
exports.rejectVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    await venue.deleteOne();
    res.json({ message: "Venue rejected and removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
