const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public Routes
router.get("/trending", recommendationController.getTrending);
router.get("/similar/:type/:id", recommendationController.getSimilarItems);
router.get("/also-booked/:type/:id", recommendationController.getAlsoBooked);

// Protected Routes
router.get("/for-you", authMiddleware, recommendationController.getPersonalized);

module.exports = router;
