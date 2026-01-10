const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  listMyReceipts,
  listProviderReceipts,
  getReceiptById,
  getReceiptByBookingId,
} = require("../controllers/receiptController");

const router = express.Router();

router.get("/user", protect, listMyReceipts);
router.get("/provider", protect, listProviderReceipts);
router.get("/booking/:bookingId", protect, getReceiptByBookingId);
router.get("/:id", protect, getReceiptById);

module.exports = router;
