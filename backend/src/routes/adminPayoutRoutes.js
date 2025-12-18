const express = require("express");
const router = express.Router();

const {
  getPayoutQueue,
  markPayoutPaid,
} = require("../controllers/adminPayoutController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Admin payout queue
router.get("/payouts", protect, adminOnly, getPayoutQueue);

// Mark payout as paid
router.put("/payouts/:id/pay", protect, adminOnly, markPayoutPaid);

module.exports = router;
