const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createPriceRequest } = require("../controllers/priceRequestController");

router.post("/", protect, createPriceRequest);

module.exports = router;
