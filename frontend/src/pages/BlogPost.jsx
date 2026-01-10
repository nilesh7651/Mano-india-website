import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { getBlogPostBySlug } from "../lib/blog";
import { fetchBlogPostBySlug } from "../services/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => getBlogPostBySlug(slug));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    fetchBlogPostBySlug(slug)
      .then((data) => {
        if (!alive) return;
        if (data && data.slug) setPost(data);
      })
      .catch(() => {
        // keep fallback
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-gray-100 px-6 py-20">
        <SEO
          title="Blog Post Not Found | Mano India"
          description="The requested post could not be found."
          keywords="mano india blog"
          canonicalUrl={`https://manoindia.in/blog/${slug || ""}`}
        />

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Post not found</h1>
          <p className="text-gray-400 mb-8">This post may have been moved or removed.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = typeof post.article === "string"
    ? post.article.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-black text-gray-100 px-6 py-20">
      <SEO
        title={`${post.title} | Mano India`}
        description={post.excerpt}
        keywords={post.keywords}
        image={post.coverImage}
        canonicalUrl={`https://manoindia.in/blog/${post.slug}`}
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-medium"
          >
            ← Back to Blog
          </Link>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-800 mb-10">
          <div className="relative h-72 md:h-96">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-3 items-center mb-3">
                <span className="bg-black/60 backdrop-blur-md border border-gray-700 text-amber-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
                <span className="text-gray-300 text-xs uppercase tracking-widest">Mano India News</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-gray-300 leading-relaxed text-lg">{post.excerpt}</p>

          {Array.isArray(post.content) && post.content.length > 0 ? (
            post.content.map((block) => (
              <section key={block.heading} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{block.heading}</h2>
                <p className="text-gray-400 leading-relaxed">{block.body}</p>
              </section>
            ))
          ) : paragraphs.length > 0 ? (
            <section className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-gray-400 leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          ) : (
            !loading && (
              <section className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-400 leading-relaxed">No article content.</p>
              </section>
            )
          )}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/artists"
            className="inline-flex items-center justify-center bg-amber-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/40"
          >
            Browse Artists
          </Link>
        </div>
      </div>
    </div>
  );
}
