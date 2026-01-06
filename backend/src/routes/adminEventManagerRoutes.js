const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getAllEventManagers,
    getPendingEventManagers,
    approveEventManager,
    rejectEventManager,
} = require("../controllers/adminEventManagerController");

// List event managers
router.get("/event-managers", protect, adminOnly, getAllEventManagers);
router.get("/event-managers/pending", protect, adminOnly, getPendingEventManagers);

// Approve / Reject
router.put("/event-managers/:id/approve", protect, adminOnly, approveEventManager);
router.delete("/event-managers/:id/reject", protect, adminOnly, rejectEventManager);

module.exports = router;
