const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  sendEmailOtp,
  verifyEmailOtp,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/send-otp", sendEmailOtp);
router.post("/verify-otp", verifyEmailOtp);

module.exports = router;
