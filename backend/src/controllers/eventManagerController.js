const EventManager = require("../models/EventManager");

// CREATE EVENT MANAGER PROFILE
const createProfile = async (req, res) => {
    try {
        const { name, companyName, city, phone, experienceYears, servicesOffered, pricePerEvent, bio, portfolio, bankDetails } = req.body;

        if (!name || !city || !pricePerEvent || !phone) {
            return res.status(400).json({ message: "All required fields missing" });
        }

        const existingProfile = await EventManager.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(400).json({ message: "Event Manager profile already exists" });
        }

        const eventManager = await EventManager.create({
            user: req.user._id,
            name,
            companyName,
            city,
            phone,
            experienceYears: experienceYears || 0,
            servicesOffered: servicesOffered || [],
            pricePerEvent,
            bio,
            portfolio: portfolio || [],
            bankDetails: bankDetails || {},
            isVerified: false, // Default to false
        });

        res.status(201).json({
            ...eventManager.toObject(),
            message: "Event Manager profile created successfully. Waiting for admin approval."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL EVENT MANAGERS (PUBLIC)
const getAllEventManagers = async (req, res) => {
    try {
        const managers = await EventManager.find({ isVerified: true }).populate(
            "user",
            "name email role"
        );
        res.json(managers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET EVENT MANAGER BY ID
const getEventManagerById = async (req, res) => {
    try {
        const manager = await EventManager.findById(req.params.id).populate(
            "user",
            "name email role"
        );

        if (!manager) {
            return res.status(404).json({ message: "Event Manager not found" });
        }

        res.json(manager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET CURRENT EVENT MANAGER PROFILE (PROTECTED)
const getCurrentEventManager = async (req, res) => {
    try {
        const manager = await EventManager.findOne({ user: req.user._id }).populate(
            "user",
            "name email role"
        );

        if (!manager) {
            return res.status(404).json({ message: "Event Manager profile not found" });
        }

        res.json(manager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE EVENT MANAGER PROFILE
const updateProfile = async (req, res) => {
    try {
        const manager = await EventManager.findOne({ user: req.user._id });

        if (!manager) {
            return res.status(404).json({ message: "Event Manager profile not found" });
        }

        const { name, companyName, city, phone, experienceYears, servicesOffered, pricePerEvent, bio, portfolio, bankDetails } = req.body;

        manager.name = name || manager.name;
        manager.companyName = companyName || manager.companyName;
        manager.city = city || manager.city;
        manager.phone = phone || manager.phone;
        manager.experienceYears = experienceYears || manager.experienceYears;
        manager.pricePerEvent = pricePerEvent || manager.pricePerEvent;
        manager.bio = bio || manager.bio;

        if (servicesOffered) manager.servicesOffered = servicesOffered;
        if (portfolio) manager.portfolio = portfolio;
        if (bankDetails) manager.bankDetails = bankDetails;

        await manager.save();

        res.json({ message: "Profile updated successfully", manager });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProfile,
    getAllEventManagers,
    getEventManagerById,
    getCurrentEventManager,
    updateProfile,
};
