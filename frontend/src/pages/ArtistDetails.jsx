import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingModal from "../components/BookingModal";
import Reviews from "../components/Reviews";

import API from "../services/api";

export default function ArtistDetails() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);

  useEffect(() => {
    API.get(`/artists/${id}`)
      .then(res => setArtist(res.data))
      .catch(() => {
        // Demo fallback (important for investor demo)
        setArtist({
          _id: id,
          name: "DJ Alpha",
          category: "DJ",
          city: "Delhi",
          pricePerEvent: 15000,
          bio: "Professional DJ with 5+ years of experience in weddings, parties and corporate events."
        });
      });

    // Fetch reviews
    API.get(`/reviews/artist/${id}`)
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [id]);

  if (!artist) {
    return <p className="text-gray-500">Loading artist details...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
          <span>Artist Image</span>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {artist.name}
            </h1>
            <p className="text-gray-600">
              {artist.category} • {artist.city}
            </p>
          </div>

          {artist.bio && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {artist.bio}
              </p>
            </div>
          )}

          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-2xl font-semibold text-gray-900">
              ₹ {artist.pricePerEvent?.toLocaleString()} <span className="text-sm text-gray-500 font-normal">/ event</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Book this artist for your event
            </p>
          </div>

          <button
            onClick={() => setOpenBooking(true)}
            className="w-full bg-black text-white px-8 py-3.5 rounded-lg hover:opacity-90 font-medium text-lg transition shadow-md"
          >
            🎤 Book This Artist
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Reviews reviews={reviews} />

      </div>

      {openBooking && (
        <BookingModal
          artistId={artist._id}
          onClose={() => setOpenBooking(false)}
          onSuccess={() => {
            alert("Booking request sent successfully!");
            setOpenBooking(false);
          }}
        />
      )}
    </div>
  );
}
