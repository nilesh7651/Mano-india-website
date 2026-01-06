const express = require("express");
const router = express.Router();
const {
    createProfile,
    getAllEventManagers,
    getEventManagerById,
    getCurrentEventManager,
    updateProfile,
} = require("../controllers/eventManagerController");
const { protect } = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllEventManagers);
router.get("/:id", getEventManagerById);

// Protected Routes
router.post("/", protect, createProfile);
router.get("/profile/me", protect, getCurrentEventManager);
router.put("/profile/me", protect, updateProfile);

module.exports = router;
