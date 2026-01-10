import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import SEO from "../components/SEO";
import { IMAGES } from "../lib/images";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFallbackImage = (type) => {
    const t = (type || "").toLowerCase();
    if (t.includes("wedding") || t.includes("shaadi") || t.includes("reception")) return IMAGES.hero.wedding;
    if (t.includes("sangeet") || t.includes("mehendi") || t.includes("haldi")) return IMAGES.gallery.sangeet;
    if (t.includes("corporate") || t.includes("conference") || t.includes("launch")) return IMAGES.gallery.conference;
    if (t.includes("birthday") || t.includes("party") || t.includes("anniversary")) return IMAGES.gallery.birthday;
    if (t.includes("garba") || t.includes("fest") || t.includes("festival")) return IMAGES.gallery.garba;
    return IMAGES.gallery.collegeFest;
  };

  useEffect(() => {
    API.get("/gallery")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("Failed to load events", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 px-6 py-20">
      <SEO
        title="Event Gallery - Weddings, Concerts & Parties | Mano India"
        description="Explore our gallery of past events including royal weddings, corporate gatherings, and energetic concerts managed by Mano India."
        keywords="event gallery india, wedding event gallery, sangeet events, corporate events gallery, event management portfolio, past events"
        image={IMAGES.gallery.collegeFest}
        canonicalUrl="https://manoindia.in/events"
      />
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Signature <span className="text-amber-500">Events</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Immerse yourself in a portfolio of exquisite celebrations.
            From royal weddings to high-energy concerts, we curate experiences that leave a lasting legacy.
          </p>
        </div>

        {/* EVENTS GRID */}
        {events.length === 0 ? (
          <div className="text-center py-20 border border-gray-800 border-dashed rounded-xl">
            <p className="text-gray-500 text-xl">No events found in the gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event) => (
              <div
                key={event._id}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-500 shadow-lg hover:shadow-amber-900/20"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={event.imageUrl || getFallbackImage(event.type)}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getFallbackImage(event.type);
                    }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md border border-gray-700 text-amber-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                      {event.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6">
                    {event.description || "A spectacular event curated by ManoIndia."}
                  </p>

                  <Link
                    to="/artists"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-amber-500 transition-colors"
                  >
                    Plan Similar Event
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA SECTION */}
        <div className="mt-32 relative rounded-3xl overflow-hidden text-center py-24 px-6 border border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black z-0" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Your Own Masterpiece?
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Connect with India's finest artists and premium venues to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/artists"
                className="bg-amber-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/40"
              >
                Find Artists
              </Link>
              <Link
                to="/venues"
                className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-lg font-bold hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                Browse Venues
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}