import { useEffect, useState } from "react";
import API from "../services/api";
import ArtistCard from "../components/ArtistCard";
import SEO from "../components/SEO";

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
            _id: "1",
            name: "DJ Alpha",
            category: "DJ",
            city: "Delhi",
            pricePerEvent: 15000,
            bio: "Professional DJ with 5+ years of experience mixing Bollywood and EDM.",
            images: ["https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80"]
          },
          {
            _id: "2",
            name: "Singer Neha",
            category: "Singer",
            city: "Mumbai",
            pricePerEvent: 20000,
            bio: "Bollywood & live performance specialist ensuring a soulful evening.",
            images: ["https://images.unsplash.com/photo-1520786968037-77299a915995?auto=format&fit=crop&q=80"]
          },
          {
            _id: "3",
            name: "The Rockers",
            category: "Band",
            city: "Bangalore",
            pricePerEvent: 45000,
            bio: "High energy rock band perfect for corporate events and fests.",
            images: ["https://images.unsplash.com/photo-1459749411177-d2899476b689?auto=format&fit=crop&q=80"]
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
        description="Explore and book verified artists for your event. Find singers, bands, DJs, and performers in your city with Mano India."
        keywords="hire artists, book singers, dj booking, live bands, event performers, artist booking india"
        canonicalUrl="https://manoindia.in/artists"
      />

      {/* Hero Section */}
      <div className="relative py-20 px-6 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
            Discover World-Class Talent
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            From soul-stirring singers to high-energy DJs, find the perfect performer for your special occasion.
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