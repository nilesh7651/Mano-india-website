const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
    },

    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },

    eventDate: {
      type: Date,
      required: true,
    },

    eventLocation: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "COMPLETED"],
      default: "PENDING",
    },

    commissionRate: {
      type: Number,
      default: 0.1, // 10%
    },

    commissionAmount: {
      type: Number,
      default: 0,
    },

    payoutAmount: {
      type: Number,
      default: 0,
    },
    payoutStatus: {
  type: String,
  enum: ["NOT_READY", "PENDING", "PAID"],
  default: "NOT_READY",
},

paidAt: {
  type: Date,
},


    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
