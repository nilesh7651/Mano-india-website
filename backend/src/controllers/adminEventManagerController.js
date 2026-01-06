const EventManager = require("../models/EventManager");

/**
 * GET ALL EVENT MANAGERS
 */
exports.getAllEventManagers = async (req, res) => {
    try {
        const managers = await EventManager.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(managers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET PENDING EVENT MANAGERS
 */
exports.getPendingEventManagers = async (req, res) => {
    try {
        const managers = await EventManager.find({ isVerified: false })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(managers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * APPROVE EVENT MANAGER
 */
exports.approveEventManager = async (req, res) => {
    try {
        const manager = await EventManager.findById(req.params.id).populate("user");
        if (!manager) {
            return res.status(404).json({ message: "Event Manager not found" });
        }

        manager.isVerified = true;
        await manager.save();

        // Notify manager
        const notify = require("../utils/createNotification");
        await notify(
            manager.user._id,
            "Profile Approved",
            "Your Event Manager profile has been approved! You can now receive bookings."
        );

        res.json({ message: "Event Manager approved successfully", manager });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * REJECT / DELETE EVENT MANAGER
 */
exports.rejectEventManager = async (req, res) => {
    try {
        const manager = await EventManager.findById(req.params.id);
        if (!manager) {
            return res.status(404).json({ message: "Event Manager not found" });
        }

        await manager.deleteOne();
        res.json({ message: "Event Manager rejected and removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
