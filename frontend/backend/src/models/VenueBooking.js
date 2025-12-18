const mongoose = require("mongoose");

const venueBookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Wedding", "Party", "Corporate", "Reception"],
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VenueBooking", venueBookingSchema);
