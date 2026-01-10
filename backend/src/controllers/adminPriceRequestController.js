const PriceRequest = require("../models/PriceRequest");

exports.listAllPriceRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["PENDING", "REVIEWED", "RESOLVED"].includes(status)) {
      filter.status = status;
    }

    const requests = await PriceRequest.find(filter)
      .populate("user", "name email phone")
      .populate("booking")
      .sort({ createdAt: -1 })
      .limit(500);

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePriceRequest = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const update = {};
    if (status && ["PENDING", "REVIEWED", "RESOLVED"].includes(status)) {
      update.status = status;
    }
    if (adminNote !== undefined) {
      update.adminNote = String(adminNote || "").trim();
    }

    const updated = await PriceRequest.findByIdAndUpdate(req.params.id, update, {
      new: true,
    })
      .populate("user", "name email phone")
      .populate("booking");

    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
