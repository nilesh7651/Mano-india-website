const Booking = require("../models/Booking");
const Venue = require("../models/Venue");

exports.getVenueEarnings = async (req, res) => {
  try {
    const venue = await Venue.findOne({ owner: req.user._id });
    if (!venue) {
      return res.status(403).json({ message: "Venue not found" });
    }

    const bookings = await Booking.find({
      venue: venue._id,
      status: { $in: ["ACCEPTED", "COMPLETED"] },
    });

    const totalEarnings = bookings.reduce(
      (sum, b) => sum + b.payoutAmount,
      0
    );

    res.json({
      venue: venue.name,
      totalBookings: bookings.length,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
