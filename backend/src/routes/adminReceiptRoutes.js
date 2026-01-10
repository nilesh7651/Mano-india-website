const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { listAllReceipts } = require("../controllers/adminReceiptController");

const router = express.Router();

router.get("/receipts", protect, adminOnly, listAllReceipts);

module.exports = router;
