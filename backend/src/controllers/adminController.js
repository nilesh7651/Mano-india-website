const Artist = require("../models/Artist");

// GET ALL UNVERIFIED ARTISTS
const getPendingArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isVerified: false }).populate(
      "user",
      "name email"
    );
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE ARTIST
const approveArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    artist.isVerified = true;
    await artist.save();

    res.json({ message: "Artist approved successfully", artist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingArtists,
  approveArtist,
};
