const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const Otp = require("../models/Otp");
const { sendOtpEmail } = require("../utils/emailService");
const crypto = require("crypto");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;


    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Validate role
    const validRoles = ["user", "artist", "venue", "admin"];
    const userRole = role || "user";
    if (!validRoles.includes(userRole)) {
      return res.status(400).json({ message: `Invalid role. Must be one of: ${validRoles.join(", ")}` });
    }

    // VERIFY OTP (Security Check)
    // We expect the OTP to be passed in the registration body to prove verification
    if (!req.body.otp) {
      return res.status(400).json({ message: "Email verification is required. Please verify your email." });
    }

    const validOtp = await Otp.findOne({ email, otp: req.body.otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP. Please verify email again." });
    }

    // OTP is valid, proceed to delete it to prevent reuse
    await Otp.deleteOne({ _id: validOtp._id });

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: "Account created successfully",
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.error("Registration error:", error);
    res.status(500).json({ message: error.message || "Registration failed. Please try again." });
  }
};

// SEND EMAIL OTP
const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB (upsert: if email exists, update otp)
    // First delete any existing OTP for this email to avoid duplicates/confusion
    await Otp.deleteMany({ email });

    await Otp.create({ email, otp });

    // Send Email
    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent successfully to your email" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

// VERIFY EMAIL OTP
const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const validOtp = await Otp.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Don't delete here anymore, we delete in registerUser after final submission.
    // just return success to frontend so UI can show "Verified"

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendEmailOtp,
  verifyEmailOtp,
};
