import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ImageUpload from "../../components/ImageUpload";
import { useToast } from "../../components/ui/ToastProvider";

export default function AdminBlogCreate() {
  const { notify } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [form, setForm] = useState({
    title: "",
    coverImage: "",
    excerpt: "",
    keywords: "",
    article: "",
  });

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await API.get("/admin/blog");
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    if (!form.title.trim() || !form.coverImage.trim() || !form.article.trim()) {
      notify({
        type: "error",
        title: "Missing fields",
        message: "Title, cover image, and article are required.",
      });
      return;
    }

    setSubmitting(true);
    setCreatedSlug("");
    try {
      const res = await API.post("/admin/blog", {
        title: form.title,
        coverImage: form.coverImage,
        excerpt: form.excerpt,
        keywords: form.keywords,
        article: form.article,
      });

      const slug = res.data?.post?.slug;
      if (slug) setCreatedSlug(slug);

      notify({ type: "success", title: "Published", message: "Blog post created." });
      setForm({ title: "", coverImage: "", excerpt: "", keywords: "", article: "" });
      loadPosts();
    } catch (err) {
      notify({
        type: "error",
        title: "Failed",
        message: err.response?.data?.message || "Failed to create post",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (post) => {
    const ok = window.confirm(`Delete this post?\n\n${post.title}`);
    if (!ok) return;
    try {
      await API.delete(`/admin/blog/${post._id}`);
      notify({ type: "success", title: "Deleted", message: "Post removed." });
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } catch (err) {
      notify({
        type: "error",
        title: "Delete failed",
        message: err.response?.data?.message || "Failed to delete post",
      });
    }
  };

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Post News / Blog</h1>
        <p className="text-gray-400">Create a new blog post with image and article</p>
        {createdSlug && (
          <p className="text-green-400 mt-2 text-sm">
            Published: <span className="font-mono">/blog/{createdSlug}</span>
          </p>
        )}
      </div>

      <Card variant="dark" className="max-w-3xl">
        <div className="space-y-5">
          <Input
            label="Title"
            variant="dark"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. New features launched"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Cover Image</label>
            <ImageUpload
              existingImage={form.coverImage}
              onUpload={(url) => setForm({ ...form, coverImage: url })}
            />
            <input
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="Or paste an image URL"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Excerpt (optional)</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all duration-200"
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Short summary shown on the blog list"
            />
          </div>

          <Input
            label="Keywords (comma separated)"
            variant="dark"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            placeholder="events, booking, mano india"
          />

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Article</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all duration-200"
              rows={10}
              value={form.article}
              onChange={(e) => setForm({ ...form, article: e.target.value })}
              placeholder="Write the full article here..."
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={submit}
              disabled={submitting}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {submitting ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="max-w-5xl">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-3">
          <div>
            <h2 className="text-xl font-bold text-white">Past Posts</h2>
            <p className="text-gray-500 text-sm">Remove old posts from here</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={loadPosts}
            className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-500"
          >
            Refresh
          </Button>
        </div>

        {loadingPosts ? (
          <div className="text-gray-500 py-6">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-gray-400">
            No posts found.
          </div>
        ) : (
          <div className="grid gap-3">
            {posts.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="text-white font-semibold truncate max-w-[520px]">{p.title}</div>
                    <span className="text-xs font-mono text-gray-500">{p.slug}</span>
                    <span className="text-xs text-gray-500">
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleString() : ""}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm line-clamp-1 mt-1">{p.excerpt}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="px-3 py-1.5 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 transition text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(p)}
                    className="px-3 py-1.5 rounded-lg border border-red-700/60 text-red-300 hover:bg-red-900/20 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
