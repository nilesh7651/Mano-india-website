const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
	createBlogPost,
	listBlogPostsAdmin,
	deleteBlogPost,
} = require("../controllers/adminBlogController");

router.post("/blog", protect, adminOnly, createBlogPost);
router.get("/blog", protect, adminOnly, listBlogPostsAdmin);
router.delete("/blog/:id", protect, adminOnly, deleteBlogPost);

module.exports = router;
