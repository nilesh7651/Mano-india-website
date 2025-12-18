const Booking = require("../models/Booking");
const Artist = require("../models/Artist");

exports.getArtistEarnings = async (req, res) => {
  try {
    const artist = await Artist.findOne({ user: req.user._id });
    if (!artist) {
      return res.status(403).json({ message: "Artist profile not found" });
    }

    const bookings = await Booking.find({
      artist: artist._id,
      status: { $in: ["ACCEPTED", "COMPLETED"] },
    });

    const totalEarnings = bookings.reduce(
      (sum, b) => sum + b.payoutAmount,
      0
    );

    const pending = bookings.filter(b => b.payoutStatus === "PENDING").length;
    const paid = bookings.filter(b => b.payoutStatus === "PAID").length;

    res.json({
      artist: artist.name,
      totalBookings: bookings.length,
      totalEarnings,
      pendingPayouts: pending,
      paidPayouts: paid,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
