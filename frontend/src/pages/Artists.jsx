import { useEffect, useState } from "react";
import API from "../services/api";
import ArtistCard from "../components/ArtistCard";

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    API.get("/artists")
      .then(res => setArtists(res.data))
      .catch(() => {
        // demo fallback
        setArtists([
          {
            _id: "1",
            name: "DJ Alpha",
            category: "DJ",
            city: "Delhi",
            pricePerEvent: 15000,
            bio: "Professional DJ with 5+ years of experience."
          },
          {
            _id: "2",
            name: "Singer Neha",
            category: "Singer",
            city: "Mumbai",
            pricePerEvent: 20000,
            bio: "Bollywood & live performance specialist."
          }
        ]);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Artists</h1>
        <p className="text-gray-600">
          Discover verified artists for your events
        </p>
      </div>

      {artists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No artists available at the moment.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map(artist => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}
