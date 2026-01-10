import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { getBlogPosts } from "../lib/blog";
import { fetchBlogPosts } from "../services/blog";
import { IMAGES } from "../lib/images";

export default function Blog() {
  const [posts, setPosts] = useState(() => getBlogPosts());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchBlogPosts()
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      })
      .catch(() => {
        // Keep fallback posts
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 px-6 py-20">
      <SEO
        title="News & Blog | Mano India"
        description="Latest updates, guides, and announcements from Mano India—artists, venues, event managers, and event planning tips."
        keywords="mano india blog, event planning tips, wedding planning india, corporate events, venue booking"
        image={IMAGES.gallery.sangeet}
        canonicalUrl="https://manoindia.in/blog"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            News & <span className="text-amber-500">Blog</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Updates, guides, and practical checklists to plan better events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(loading ? posts : posts).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-500 shadow-lg hover:shadow-amber-900/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md border border-gray-700 text-amber-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-amber-500 transition-colors">
                  Read More
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
