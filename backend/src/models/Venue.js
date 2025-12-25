const mongoose = require("mongoose");

const venueSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    venueType: {
      type: String,
      enum: ["Wedding Hall", "Banquet", "Resort", "Farmhouse", "Party Hall"],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    amenities: [String],
    description: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);
