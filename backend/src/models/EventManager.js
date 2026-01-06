const mongoose = require("mongoose");

const eventManagerSchema = new mongoose.Schema(
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
        companyName: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        experienceYears: {
            type: Number,
            default: 0,
        },
        servicesOffered: [{ type: String }], // e.g. ["Wedding Planning", "Corporate Events"]
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
        isVerified: {
            type: Boolean,
            default: false,
        },
        portfolio: [{ type: String }], // Array of image URLs
        bankDetails: {
            accountHolderName: String,
            accountNumber: String,
            bankName: String,
            ifscCode: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("EventManager", eventManagerSchema);
