const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  listAllThemeRequests,
  updateThemeRequest,
} = require("../controllers/adminThemeRequestController");

router.get("/theme-requests", protect, adminOnly, listAllThemeRequests);
router.patch("/theme-requests/:id", protect, adminOnly, updateThemeRequest);

module.exports = router;
