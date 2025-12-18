const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAdminDashboard,
} = require("../controllers/adminDashboardController");

router.get("/dashboard", protect, adminOnly, getAdminDashboard);

module.exports = router;
