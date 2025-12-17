const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createReview,
  getArtistReviews,
} = require("../controllers/reviewController");

router.post("/", protect, createReview);
router.get("/artist/:artistId", getArtistReviews);

module.exports = router;
