const Artist = require("../models/Artist");

/**
 * GET ALL ARTISTS
 */
exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET PENDING ARTISTS
 */
exports.getPendingArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isVerified: false })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * APPROVE ARTIST
 */
exports.approveArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate("user");
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    artist.isVerified = true;
    await artist.save();

    // Notify artist
    const notify = require("../utils/createNotification");
    await notify(
      artist.user._id,
      "Artist Profile Approved",
      "Your artist profile has been approved! You can now receive bookings."
    );

    res.json({ message: "Artist approved successfully", artist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REJECT / DELETE ARTIST
 */
exports.rejectArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    await artist.deleteOne();
    res.json({ message: "Artist rejected and removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
