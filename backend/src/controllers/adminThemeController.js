const Theme = require("../models/Theme");

exports.listAllThemes = async (req, res) => {
  try {
    const themes = await Theme.find({}).sort({ createdAt: -1 }).limit(500);
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTheme = async (req, res) => {
  try {
    const { name, description, image, tags, priceFrom, active } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "name is required" });
    }

    const theme = await Theme.create({
      name: String(name).trim(),
      description: String(description || "").trim(),
      image: String(image || "").trim(),
      tags: Array.isArray(tags)
        ? tags.map((t) => String(t).trim()).filter(Boolean)
        : String(tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      priceFrom: Number(priceFrom || 0),
      active: active !== false,
    });

    res.status(201).json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const { name, description, image, tags, priceFrom, active } = req.body;

    const update = {};
    if (name !== undefined) update.name = String(name || "").trim();
    if (description !== undefined) update.description = String(description || "").trim();
    if (image !== undefined) update.image = String(image || "").trim();
    if (tags !== undefined) {
      update.tags = Array.isArray(tags)
        ? tags.map((t) => String(t).trim()).filter(Boolean)
        : String(tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
    }
    if (priceFrom !== undefined) update.priceFrom = Number(priceFrom || 0);
    if (active !== undefined) update.active = Boolean(active);

    const theme = await Theme.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!theme) return res.status(404).json({ message: "Theme not found" });

    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTheme = async (req, res) => {
  try {
    const deleted = await Theme.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Theme not found" });
    res.json({ message: "Theme deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
