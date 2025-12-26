const Booking = require("../models/Booking");

/**
 * GET ALL PAYOUTS (ADMIN)
 */
exports.getPayoutQueue = async (req, res) => {
  try {
    const bookings = await Booking.find({
      status: "COMPLETED",
    })
      .populate("artist", "name bankDetails")
      .populate("venue", "name bankDetails")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * MARK PAYOUT AS PAID (ADMIN)
 */
exports.markPayoutPaid = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.payoutStatus = "PAID";
    booking.status = "COMPLETED";

    await booking.save();

    res.json({
      message: "Payout marked as PAID",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
