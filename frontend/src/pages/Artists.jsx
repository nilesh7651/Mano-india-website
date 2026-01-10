import { useEffect, useState } from "react";
import API from "../services/api";
import ArtistCard from "../components/ArtistCard";
import SEO from "../components/SEO";
import { IMAGES } from "../lib/images";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    API.get("/artists")
      .then((res) => {
        setArtists(res.data);
        setLoading(false);
      })
      .catch(() => {
        // demo fallback
        setArtists([
          {
            _id: "65f000000000000000000001",
            name: "DJ Taal",
            category: "DJ",
            city: "Delhi NCR",
            pricePerEvent: 15000,
            bio: "Bollywood, Punjabi & EDM sets for weddings, sangeet and high-energy parties.",
            images: [IMAGES.artists.dj]
          },
          {
            _id: "65f000000000000000000002",
            name: "Singer Ananya",
            category: "Singer",
            city: "Mumbai",
            pricePerEvent: 20000,
            bio: "Live Bollywood, indie and sufi performances for weddings, receptions and corporate events.",
            images: [IMAGES.artists.singer]
          },
          {
            _id: "65f000000000000000000003",
            name: "The Fusion Band",
            category: "Band",
            city: "Bengaluru",
            pricePerEvent: 45000,
            bio: "Bollywood + folk fusion band for college fests, corporate nights and concerts.",
            images: [IMAGES.artists.band]
          },
          {
            _id: "65f000000000000000000004",
            name: "Dhol & Beats",
            category: "Percussion",
            city: "Pune",
            pricePerEvent: 12000,
            bio: "Dhol, nagada & live percussion to elevate baraat entries and stage moments.",
            images: [IMAGES.artists.dhol]
          },
        ]);
        setLoading(false);
      });
  }, []);

  const filteredArtists = artists.filter((artist) => {
    const matchName = artist.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter ? artist.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
    const matchCity = cityFilter ? artist.city.toLowerCase().includes(cityFilter.toLowerCase()) : true;
    return matchName && matchCategory && matchCity;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Book Top Artists | Singers, Dancers, DJs | Mano India"
        description="Explore and book verified artists across India. Find singers, DJs, bands, and performers for weddings, sangeet, receptions, corporate events, and parties."
        keywords="artist booking india, book singer for wedding, dj for sangeet, live band for reception, dhol for baraat, hire performers, delhi ncr, mumbai, bengaluru, pune"
        image={IMAGES.artists.dj}
        canonicalUrl="https://manoindia.in/artists"
      />

      {/* Hero Section */}
      <div className="relative py-20 px-6 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
            Discover Top Talent Across India
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            From soulful singers to high-energy DJs, find the right performer for your shaadi, sangeet, corporate event, or party.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search Artists..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all backdrop-blur-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category (e.g. DJ)"
              className="w-full md:w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all backdrop-blur-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
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
        ) : filteredArtists.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-gray-900/50 mb-4 border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No artists found</h3>
            <p className="text-gray-400">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}