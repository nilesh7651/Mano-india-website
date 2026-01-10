const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  listAllPriceRequests,
  updatePriceRequest,
} = require("../controllers/adminPriceRequestController");

router.get("/price-requests", protect, adminOnly, listAllPriceRequests);
router.patch("/price-requests/:id", protect, adminOnly, updatePriceRequest);

module.exports = router;
