const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createReview, getReviews } = require("../controllers/reviewController");

router.post("/", protect, createReview);
router.get("/", getReviews);

module.exports = router;
