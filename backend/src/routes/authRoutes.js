const express = require("express");
const {
  registerUser,
  loginUser,
  sendEmailOtp,
  verifyEmailOtp,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendEmailOtp);
router.post("/verify-otp", verifyEmailOtp);

module.exports = router;
