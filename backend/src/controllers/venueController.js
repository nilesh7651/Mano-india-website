const Venue = require("../models/Venue");

// CREATE VENUE (OWNER)
// CREATE VENUE (OWNER)
const createVenue = async (req, res) => {
  try {
    const { images } = req.body;
    // Ensure isVerified is explicitly set to false for admin approval
    const venue = await Venue.create({
      owner: req.user._id,
      isVerified: false, // Explicitly set to false for admin approval
      ...req.body,
      images: images || [],
    });

    res.status(201).json({
      ...venue.toObject(),
      message: "Venue created successfully. Waiting for admin approval."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VERIFIED VENUES (PUBLIC)
const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ isVerified: true });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VENUE BY ID (PUBLIC)
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER'S VENUE (OWNER)
const getMyVenue = async (req, res) => {
  try {
    const venue = await Venue.findOne({ owner: req.user._id });
    if (!venue) {
      return res.status(404).json({ message: "No venue found" });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE VENUE PROFILE
const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findOne({ owner: req.user._id });

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const { name, venueType, city, phone, capacity, pricePerDay, description, images, bankDetails } = req.body;

    venue.name = name || venue.name;
    venue.venueType = venueType || venue.venueType;
    venue.city = city || venue.city;
    venue.phone = phone || venue.phone;
    venue.capacity = capacity || venue.capacity;
    venue.pricePerDay = pricePerDay || venue.pricePerDay;
    venue.description = description || venue.description;
    if (images) venue.images = images;
    if (bankDetails) venue.bankDetails = bankDetails;

    await venue.save();

    res.json({ message: "Venue updated successfully", venue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVenue, getVenues, getVenueById, getMyVenue, updateVenue };
