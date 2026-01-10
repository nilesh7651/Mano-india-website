const Receipt = require("../models/Receipt");

exports.listAllReceipts = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = {};
    if (q && String(q).trim()) {
      const query = String(q).trim();
      const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { invoiceNumber: regex },
        { razorpayOrderId: regex },
        { razorpayPaymentId: regex },
        { eventLocation: regex },
        { serviceName: regex },
      ];
    }

    const receipts = await Receipt.find(filter)
      .populate("user", "name email phone")
      .populate("providerUser", "name email phone")
      .populate("booking")
      .sort({ paidAt: -1, createdAt: -1 })
      .limit(500);

    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
