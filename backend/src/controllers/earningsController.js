const Booking = require("../models/Booking");

/**
 * ADMIN — PLATFORM EARNINGS
 */
exports.getPlatformEarnings = async (req, res) => {
  try {
    const completedBookings = await Booking.find({ status: "COMPLETED" });

    const totalRevenue = completedBookings.reduce(
      (sum, b) => sum + b.amount,
      0
    );

    const totalCommission = completedBookings.reduce(
      (sum, b) => sum + b.commissionAmount,
      0
    );

    const totalPayout = completedBookings.reduce(
      (sum, b) => sum + b.payoutAmount,
      0
    );

    res.json({
      totalBookings: completedBookings.length,
      totalRevenue,
      totalCommission,
      totalPayout,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN — ALL COMPLETED BOOKINGS
 */
exports.getCompletedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "COMPLETED" })
      .populate("artist venue user", "name email")
      .sort({ completedAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
