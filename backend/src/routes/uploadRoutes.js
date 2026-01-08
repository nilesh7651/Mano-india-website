const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadBufferToCloudinary = (buffer) =>
    new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "mano-india",
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            }
        );

        Readable.from([buffer]).pipe(uploadStream);
    });

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private
router.post("/", protect, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    uploadBufferToCloudinary(req.file.buffer)
        .then((result) => {
            res.json({
                message: "Image uploaded successfully",
                imageUrl: result?.secure_url || result?.url,
            });
        })
        .catch((error) => {
            console.error("Upload Error:", error);
            res.status(500).json({ message: "Upload failed" });
        });
});

module.exports = router;
