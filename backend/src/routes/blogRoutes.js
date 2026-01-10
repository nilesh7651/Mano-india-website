const express = require("express");
const router = express.Router();

const { listBlogPosts, getBlogPostBySlug } = require("../controllers/blogController");

router.get("/", listBlogPosts);
router.get("/:slug", getBlogPostBySlug);

module.exports = router;
