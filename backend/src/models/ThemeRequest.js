const mongoose = require("mongoose");

const themeRequestSchema = new mongoose.Schema(
  {
    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventDate: { type: Date, required: true },
    city: { type: String, required: true, trim: true },
    budget: { type: Number, required: true },
    notes: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    adminNote: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ThemeRequest", themeRequestSchema);
