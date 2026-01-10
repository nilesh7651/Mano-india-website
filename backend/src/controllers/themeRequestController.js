const ThemeRequest = require("../models/ThemeRequest");
const Theme = require("../models/Theme");
const User = require("../models/User");
const notify = require("../utils/createNotification");

exports.createThemeRequest = async (req, res) => {
  try {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Only users can book themes" });
    }

    const { themeId, eventDate, city, budget, notes } = req.body;

    if (!themeId) return res.status(400).json({ message: "themeId is required" });
    if (!eventDate) return res.status(400).json({ message: "eventDate is required" });
    if (!city || !String(city).trim()) return res.status(400).json({ message: "city is required" });

    const parsedDate = new Date(eventDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid eventDate" });
    }

    const parsedBudget = Number(budget);
    if (!Number.isFinite(parsedBudget) || parsedBudget <= 0) {
      return res.status(400).json({ message: "Invalid budget" });
    }

    const theme = await Theme.findById(themeId);
    if (!theme) return res.status(404).json({ message: "Theme not found" });
    if (!theme.active) return res.status(400).json({ message: "Theme is not available" });

    const created = await ThemeRequest.create({
      theme: theme._id,
      user: req.user._id,
      eventDate: parsedDate,
      city: String(city).trim(),
      budget: parsedBudget,
      notes: String(notes || "").trim(),
      status: "PENDING",
    });

    const admins = await User.find({ role: "admin" }).select("_id");
    await Promise.all(
      admins.map((a) =>
        notify(
          a._id,
          "Theme Booking Request",
          `New theme request for ${theme.name}: ₹${parsedBudget.toLocaleString()} (${String(city).trim()})`
        )
      )
    );

    res.status(201).json({ message: "Request submitted", request: created });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
