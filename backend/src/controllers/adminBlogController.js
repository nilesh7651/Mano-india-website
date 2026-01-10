const BlogPost = require("../models/BlogPost");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const makeExcerpt = (article) => {
  const cleaned = String(article || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned.length > 180 ? `${cleaned.slice(0, 177)}...` : cleaned;
};

exports.createBlogPost = async (req, res) => {
  try {
    const { title, coverImage, excerpt, article, keywords } = req.body;

    if (!title || !coverImage || !article) {
      return res
        .status(400)
        .json({ message: "title, coverImage, and article are required" });
    }

    const baseSlug = slugify(title);
    if (!baseSlug) {
      return res.status(400).json({ message: "Invalid title" });
    }

    let finalSlug = baseSlug;
    for (let attempt = 0; attempt < 5; attempt++) {
      const exists = await BlogPost.findOne({ slug: finalSlug }).select("_id");
      if (!exists) break;
      const suffix = Math.random().toString(36).slice(2, 6);
      finalSlug = `${baseSlug}-${suffix}`;
    }

    const created = await BlogPost.create({
      slug: finalSlug,
      title: String(title).trim(),
      coverImage: String(coverImage).trim(),
      excerpt: String(excerpt || "").trim() || makeExcerpt(article),
      article: String(article).trim(),
      keywords: Array.isArray(keywords)
        ? keywords.filter(Boolean).map((k) => String(k).trim())
        : String(keywords || "")
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
      publishedAt: new Date(),
      isPublished: true,
      author: req.user._id,
    });

    res.status(201).json({
      message: "Post created",
      post: {
        slug: created.slug,
        title: created.title,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Slug already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.listBlogPostsAdmin = async (req, res) => {
  try {
    const posts = await BlogPost.find({})
      .select("slug title excerpt coverImage publishedAt isPublished createdAt")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(200);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
