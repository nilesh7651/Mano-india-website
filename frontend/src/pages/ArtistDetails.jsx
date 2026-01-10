import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingModal from "../components/BookingModal";
import Reviews from "../components/Reviews";
import { getUser } from "../utils/auth";
import SEO from "../components/SEO";
import { useToast } from "../components/ui/ToastProvider";
import { IMAGES } from "../lib/images";

import API from "../services/api";
import Button from "../components/ui/Button";
import PriceRequestModal from "../components/PriceRequestModal";

export default function ArtistDetails() {
  const { id } = useParams();
  const { notify } = useToast();
  const [artist, setArtist] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);

  useEffect(() => {
    API.get(`/artists/${id}`)
      .then(res => setArtist(res.data))
      .catch(() => {
        // Demo fallback (important for investor demo)
        setArtist({
          _id: id,
          name: "DJ Taal",
          category: "DJ",
          city: "Delhi NCR",
          pricePerEvent: 15000,
          bio: "Bollywood, Punjabi & EDM DJ for weddings, sangeet and corporate events.",
          images: [IMAGES.artists.dj]
        });
      });

    // Fetch reviews
    API.get(`/reviews/artist/${id}`)
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [id]);

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-amber-500 animate-pulse text-lg font-medium">Loading artist details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SEO
        title={`${artist.name} | Book ${artist.category} | Mano India`}
        description={artist.bio || `Book ${artist.name} for your next event with Mano India. Verified ${artist.category} in ${artist.city}.`}
        keywords={`book ${artist.category}, hire ${artist.name}, ${artist.city} artists, mano india artist`}
        image={artist.images?.[0]}
        canonicalUrl={`https://manoindia.in/artists/${artist._id}`}
      />
      {/* Top Section: Image & Details */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image Placeholder - Dark Gradient */}
        <div className="h-96 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center text-gray-500 shadow-2xl border border-gray-800 relative overflow-hidden group">
          {artist.images && artist.images.length > 0 ? (
            <img
              src={artist.images[0]}
              alt={`${artist.name} - ${artist.category} in ${artist.city}`}
              className="w-full h-full object-cover"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = IMAGES.artists.dj;
              }}
            />
          ) : (
            <span className="text-lg font-medium">Artist Image</span>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Artist Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                {artist.category}
              </span>
              <span className="text-gray-500 text-sm">• {artist.city}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {artist.name}
            </h1>
          </div>

          {artist.bio && (
            <div>
              <h2 className="font-semibold text-gray-300 mb-2 uppercase tracking-wide">About the Artist</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {artist.bio}
              </p>
            </div>
          )}

          {/* Price & Action Card */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Starting from</p>
                <div className="text-3xl font-bold text-amber-500">
                  ₹ {artist.pricePerEvent?.toLocaleString()} <span className="text-sm text-gray-500 font-normal">/ event</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    const user = getUser();
                    if (!user) {
                      notify({ type: "warning", title: "Login required", message: "Please login to book an artist." });
                      return;
                    }
                    if (user.role !== "user") {
                      notify({ type: "warning", title: "User account required", message: "Only registered users can make bookings." });
                      return;
                    }
                    setOpenBooking(true);
                  }}
                  size="lg"
                  className="shadow-amber-900/40 transform hover:-translate-y-1"
                >
                  🎤 Book Now
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-white hover:bg-transparent"
                  onClick={() => {
                    const user = getUser();
                    if (!user) {
                      notify({ type: "warning", title: "Login required", message: "Please login to ask for a suggestion." });
                      return;
                    }
                    if (user.role !== "user") {
                      notify({ type: "warning", title: "User account required", message: "Only registered users can send requests." });
                      return;
                    }
                    setOpenSuggestion(true);
                  }}
                >
                  Ask Suggestion
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Available for immediate booking
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-10">
        <Reviews reviews={reviews} />
      </div>

      {openBooking && (
        <BookingModal
          artistId={artist._id}
          onClose={() => setOpenBooking(false)}
          onSuccess={() => {
            notify({ type: "success", title: "Request sent", message: "Booking request sent successfully." });
            setOpenBooking(false);
          }}
        />
      )}

      {openSuggestion && (
        <PriceRequestModal
          provider={{
            role: "artist",
            id: artist._id,
            name: artist.name,
            currentAmount: artist.pricePerEvent,
          }}
          onClose={() => setOpenSuggestion(false)}
          onSubmitted={() => setOpenSuggestion(false)}
        />
      )}
    </div>
  );
}