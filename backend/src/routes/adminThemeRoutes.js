const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  listAllThemes,
  createTheme,
  updateTheme,
  deleteTheme,
} = require("../controllers/adminThemeController");

router.get("/themes", protect, adminOnly, listAllThemes);
router.post("/themes", protect, adminOnly, createTheme);
router.put("/themes/:id", protect, adminOnly, updateTheme);
router.delete("/themes/:id", protect, adminOnly, deleteTheme);

module.exports = router;
