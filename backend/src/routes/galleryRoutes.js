const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/authMiddleware"); // Assuming you might have separate admin middleware or standard protect covers it? 
// Wait, looking at previous files, 'protect' handles auth. Need to verify if we have admin middleware.
// I'll stick to 'protect' and add a check inside or reuse existing roles.
// Let's check authMiddleware first. For now using standard protect.

const {
    getGallery,
    addGalleryItem,
    deleteGalleryItem,
} = require("../controllers/galleryController");

// We need an admin check. I will reuse the 'protect' middleware which attaches req.user.
// And I'll add a simple inline middleware or check if `adminOnly` exists.
// Based on previous interaction, verifyAdmin was not explicitly seen. 
// I will create a middleware for it here inline for safety or just assume protect + role check in controller?
// Better: I will use a simple inline function to check role.

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
};

router.get("/", getGallery);
router.post("/", protect, checkAdmin, addGalleryItem);
router.delete("/:id", protect, checkAdmin, deleteGalleryItem);

module.exports = router;
