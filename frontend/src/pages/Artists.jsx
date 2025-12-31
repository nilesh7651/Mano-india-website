import { useEffect, useState } from "react";
import API from "../services/api";
import ArtistCard from "../components/ArtistCard";
import SEO from "../components/SEO";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

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
          },
          {
            _id: "2",
            name: "Singer Neha",
            category: "Singer",
            city: "Mumbai",
            pricePerEvent: 20000,
            bio: "Bollywood & live performance specialist ensuring a soulful evening.",
          },
          {
            _id: "3",
            name: "The Rockers",
            category: "Band",
            city: "Bangalore",
            pricePerEvent: 45000,
            bio: "High energy rock band perfect for corporate events and fests.",
          },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <SEO
        title="Hire Top Artists | Musicians, Bands, DJs & More"
        description="Explore and book verified artists for your event. Find singers, bands, DJs, and performers in your city."
      />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Verified <span className="text-amber-500">Artists</span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            Discover top-tier talent for your weddings, parties, and corporate
            events. All artists are verified for quality.
          </p>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Showing {artists.length} results
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-gray-400">Loading artists...</p>
        </div>
      ) : artists.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
          <p className="text-gray-500 text-lg">
            No artists available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}