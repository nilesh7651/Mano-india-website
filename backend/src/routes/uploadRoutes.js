const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private
router.post("/", protect, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Return the Cloudinary URL
    res.json({
        message: "Image uploaded successfully",
        imageUrl: req.file.path
    });
});

module.exports = router;
