const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists:", adminExists.email);
      process.exit(0);
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@mano.com",
      password: "123456",
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Password: 123456");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
}

seedAdmin();
