import { useEffect, useMemo, useState } from "react";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import { IMAGES } from "../lib/images";
import { getThemes as getFallbackThemes } from "../utils/themeStore";
import ThemeRequestModal from "../components/ThemeRequestModal";
import { fetchPublicThemes } from "../services/themes";

export default function Themes() {
  const fallbackThemes = useMemo(() => getFallbackThemes().filter((t) => t.active !== false), []);
  const [themes, setThemes] = useState(fallbackThemes);
  const [usingDemo, setUsingDemo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchPublicThemes()
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data) && data.length > 0) {
          setThemes(data.filter((t) => t.active !== false));
          setUsingDemo(false);
        } else {
          setThemes(fallbackThemes);
          setUsingDemo(true);
        }
      })
      .catch(() => {
        if (!alive) return;
        setThemes(fallbackThemes);
        setUsingDemo(true);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [fallbackThemes]);

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Book Event Decor Themes | ManoIndia"
        description="Book premium event decor themes from ManoIndia for weddings, sangeet, corporate events, birthdays and more. Send a request and our team confirms availability and pricing."
        keywords="book event decor theme, wedding decor themes, sangeet decor, corporate event decor, birthday decor themes, stage decor, entry decor, balloon decor, floral decor, theme booking india"
        image={IMAGES.gallery.sangeet}
        canonicalUrl="https://manoindia.in/themes"
      />

      <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-950 to-black p-8 md:p-12">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${IMAGES.gallery.sangeet})`, backgroundSize: "cover" }} />
        <div className="relative">
          <h1 className="text-3xl md:text-5xl font-bold text-white">Book Themes from ManoIndia</h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            Choose a ready-to-book decor theme for your event. Send a request and our admin team will confirm availability and pricing.
          </p>
          {loading ? (
            <p className="mt-4 text-sm text-gray-500">Loading themes...</p>
          ) : usingDemo ? (
            <p className="mt-4 text-sm text-amber-200/80">
              Showing demo themes (backend unavailable).
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((t) => (
          <div
            key={t._id || t.id}
            className="group bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={t.image}
                alt={`${t.name} theme`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-white leading-snug">{t.name}</h3>
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase">Starts at</div>
                  <div className="text-amber-500 font-bold">₹ {Number(t.priceFrom || 0).toLocaleString()}</div>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-400 line-clamp-2">{t.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {(t.tags || []).slice(0, 4).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-black border border-gray-800 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button
                  size="sm"
                  onClick={() => setSelectedTheme(t)}
                  className="w-full !bg-amber-600 !text-white"
                >
                  Book Theme
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSelectedTheme(t)}
                  className="w-full"
                >
                  Ask suggestion
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTheme ? (
        <ThemeRequestModal
          theme={selectedTheme}
          onClose={() => setSelectedTheme(null)}
          onSubmitted={() => setSelectedTheme(null)}
        />
      ) : null}
    </div>
  );
}
