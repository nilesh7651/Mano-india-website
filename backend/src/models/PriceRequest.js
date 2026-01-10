const mongoose = require("mongoose");

const priceRequestSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
      index: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    providerRole: {
      type: String,
      enum: ["artist", "venue", "event_manager"],
      required: true,
      index: true,
    },
    providerName: {
      type: String,
      required: true,
      trim: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
      trim: true,
    },

    currentAmount: {
      type: Number,
      required: true,
    },
    proposedAmount: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "RESOLVED"],
      default: "PENDING",
      index: true,
    },

    adminNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PriceRequest", priceRequestSchema);
