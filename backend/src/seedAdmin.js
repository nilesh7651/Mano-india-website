const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

dotenv.config();

const requireEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

async function seedAdmin() {
  let connected = false;
  try {
    const mongoUri = requireEnv("MONGO_URI");
    const adminEmail = requireEnv("ADMIN_EMAIL").toLowerCase();
    const adminPassword = requireEnv("ADMIN_PASSWORD");
    const adminPhone = requireEnv("ADMIN_PHONE");
    const adminName = process.env.ADMIN_NAME || "Admin";

    const resetPassword = String(process.env.RESET_ADMIN_PASSWORD || "").toLowerCase() === "true";
    const forceCreate = String(process.env.FORCE_CREATE_ADMIN || "").toLowerCase() === "true";

    await mongoose.connect(mongoUri);
    connected = true;
    console.log("MongoDB connected");

    const existingByEmail = await User.findOne({ email: adminEmail });
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin && (!existingByEmail || existingAdmin.email !== adminEmail) && !forceCreate) {
      console.error(
        `Admin already exists (${existingAdmin.email}). ` +
          `If you really want to create/update a different admin (${adminEmail}), set FORCE_CREATE_ADMIN=true.`
      );
      process.exitCode = 1;
      return;
    }

    if (existingByEmail) {
      existingByEmail.name = adminName;
      existingByEmail.phone = adminPhone;
      existingByEmail.role = "admin";

      if (resetPassword) {
        if (adminPassword.length < 6) {
          throw new Error("ADMIN_PASSWORD must be at least 6 characters");
        }
        existingByEmail.password = await bcrypt.hash(adminPassword, 10);
      }

      await existingByEmail.save();
      console.log("✅ Admin updated successfully");
      console.log("Email:", existingByEmail.email);
      console.log("Password updated:", resetPassword ? "YES" : "NO (set RESET_ADMIN_PASSWORD=true to reset)");
      return;
    }

    if (adminPassword.length < 6) {
      throw new Error("ADMIN_PASSWORD must be at least 6 characters");
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Password set from ADMIN_PASSWORD");
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    process.exitCode = 1;
  } finally {
    if (connected) {
      await mongoose.connection.close();
    }
  }
}

seedAdmin();
