import { useEffect, useState } from "react";
import API from "../services/api";
import SEO from "../components/SEO";
import VenueCard from "../components/VenueCard";
import { IMAGES } from "../lib/images";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    API.get("/venues")
      .then((res) => setVenues(res.data))
      .catch((err) => {
        console.error("Failed to load venues", err);
        setVenues([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredVenues = venues.filter((venue) => {
    const matchName = venue.name.toLowerCase().includes(search.toLowerCase());
    const matchCity = cityFilter ? venue.city.toLowerCase().includes(cityFilter.toLowerCase()) : true;
    return matchName && matchCity;
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <SEO
        title="Book Best Event Venues | Wedding Halls, Party Lawns | Mano India"
        description="Find the perfect wedding hall, party lawn, or corporate venue for your event in India with Mano India. Verified and premium venues."
        keywords="venue booking india, banquet hall booking, marriage hall booking, wedding lawn, party lawn, corporate venue, event spaces delhi mumbai bengaluru"
        image={IMAGES.venue.banquet}
        canonicalUrl="https://manoindia.in/venues"
      />

      {/* Hero Section */}
      <div className="relative py-20 px-6 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
            Find the Perfect Venue
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            From grand wedding halls to intimate party lawns, discover and book your ideal event space.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search Venues..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all backdrop-blur-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="City (e.g. Mumbai)"
              className="w-full md:w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all backdrop-blur-sm"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-gray-900/50 rounded-2xl animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : filteredVenues.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-gray-900/50 mb-4 border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No venues found</h3>
            <p className="text-gray-400">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue._id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}