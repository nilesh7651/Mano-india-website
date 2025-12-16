const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true, // Singer, DJ, Dancer, etc.
    },
    city: {
      type: String,
      required: true,
    },
    pricePerEvent: {
      type: Number,
      required: true,
    },
    bio: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artist", artistSchema);

