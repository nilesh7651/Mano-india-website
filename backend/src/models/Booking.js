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
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },

    // BUSINESS FIELDS
    amount: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: [
        "pending_payment",
        "paid",
        "approved",
        "completed",
        "cancelled",
      ],
      default: "pending_payment",
    },

    // PAYMENT PLACEHOLDERS
    paymentProvider: {
      type: String, // razorpay | stripe | etc
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
