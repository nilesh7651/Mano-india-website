const Artist = require("../models/Artist");
const Venue = require("../models/Venue");
const Booking = require("../models/Booking");

exports.getAdminDashboard = async (req, res) => {
  try {
    // Pending approvals
    const pendingArtists = await Artist.countDocuments({ isVerified: false });
    const pendingVenues = await Venue.countDocuments({ isVerified: false });

    // Total counts
    const totalArtists = await Artist.countDocuments();
    const totalVenues = await Venue.countDocuments();

    // Booking stats
    const totalBookings = await Booking.countDocuments();

    const completedBookings = await Booking.find({ status: "COMPLETED" });

    let totalRevenue = 0;
    let totalCommission = 0;
    let pendingPayouts = 0;

    completedBookings.forEach((b) => {
      totalRevenue += b.amount;
      totalCommission += b.commissionAmount;
      pendingPayouts += b.payoutAmount;
    });

    res.json({
      pendingArtists,
      pendingVenues,
      totalArtists,
      totalVenues,
      totalBookings,
      totalRevenue,
      totalCommission,
      pendingPayouts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
