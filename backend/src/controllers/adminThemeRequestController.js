const ThemeRequest = require("../models/ThemeRequest");

exports.listAllThemeRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      filter.status = status;
    }

    const requests = await ThemeRequest.find(filter)
      .populate("user", "name email phone")
      .populate("theme")
      .sort({ createdAt: -1 })
      .limit(500);

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateThemeRequest = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const update = {};
    if (status && ["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      update.status = status;
    }
    if (adminNote !== undefined) {
      update.adminNote = String(adminNote || "").trim();
    }

    const updated = await ThemeRequest.findByIdAndUpdate(req.params.id, update, {
      new: true,
    })
      .populate("user", "name email phone")
      .populate("theme");

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
