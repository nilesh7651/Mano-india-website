const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true, // e.g., "Wedding", "Concert"
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Gallery", gallerySchema);
