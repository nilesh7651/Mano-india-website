const Receipt = require("../models/Receipt");
const Booking = require("../models/Booking");

const isProviderRole = (role) =>
  role === "artist" || role === "venue" || role === "event_manager";

exports.listMyReceipts = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Only users can access user receipts" });
    }

    const receipts = await Receipt.find({ user: req.user._id })
      .populate("booking")
      .sort({ paidAt: -1, createdAt: -1 });

    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listProviderReceipts = async (req, res) => {
  try {
    if (!isProviderRole(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Only providers can access provider receipts" });
    }

    const receipts = await Receipt.find({ providerUser: req.user._id })
      .populate("booking")
      .populate("user", "name email phone")
      .sort({ paidAt: -1, createdAt: -1 });

    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate("booking")
      .populate("user", "name email phone")
      .populate("providerUser", "name email phone");

    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    const isOwner = receipt.user?._id?.toString() === req.user._id.toString();
    const isProvider =
      receipt.providerUser?._id?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isProvider && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReceiptByBookingId = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const isBookingUser = booking.user?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    let isBookingProvider = false;
    if (req.user.role === "artist" && booking.artist) isBookingProvider = true;
    if (req.user.role === "venue" && booking.venue) isBookingProvider = true;
    if (req.user.role === "event_manager" && booking.eventManager)
      isBookingProvider = true;

    if (!isBookingUser && !isBookingProvider && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const receipt = await Receipt.findOne({ booking: bookingId })
      .populate("booking")
      .populate("user", "name email phone")
      .populate("providerUser", "name email phone");

    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
