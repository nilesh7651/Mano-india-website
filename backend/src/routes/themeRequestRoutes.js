const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createThemeRequest } = require("../controllers/themeRequestController");

router.post("/", protect, createThemeRequest);

module.exports = router;
