const BlogPost = require("../models/BlogPost");

exports.listBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ isPublished: true })
      .select("slug title excerpt coverImage publishedAt keywords")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(100);

    res.json(
      posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        date: p.publishedAt,
        keywords: (p.keywords || []).join(", "),
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      date: post.publishedAt,
      keywords: (post.keywords || []).join(", "),
      article: post.article,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
