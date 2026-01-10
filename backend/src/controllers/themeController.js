const Theme = require("../models/Theme");

exports.listPublicThemes = async (req, res) => {
  try {
    const themes = await Theme.find({ active: true })
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
