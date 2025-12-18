const Artist = require("../models/Artist");

// CREATE ARTIST PROFILE
const createArtistProfile = async (req, res) => {
  try {
    const { name, category, city, pricePerEvent, bio } = req.body;

    if (!name || !category || !city || !pricePerEvent) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const existingArtist = await Artist.findOne({ user: req.user._id });
    if (existingArtist) {
      return res
        .status(400)
        .json({ message: "Artist profile already exists" });
    }

    // Ensure isVerified is explicitly set to false for admin approval
    const artist = await Artist.create({
      user: req.user._id,
      name,
      category,
      city,
      pricePerEvent,
      bio,
      isVerified: false, // Explicitly set to false for admin approval
    });

    res.status(201).json({
      ...artist.toObject(),
      message: "Artist profile created successfully. Waiting for admin approval."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ARTISTS (PUBLIC)
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find().populate(
      "user",
      "name email role"
    );
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ARTIST BY ID
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate(
      "user",
      "name email role"
    );

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createArtistProfile,
  getAllArtists,
  getArtistById,
};
