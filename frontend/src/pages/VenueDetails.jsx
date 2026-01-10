import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingModal from "../components/BookingModal";
import Reviews from "../components/Reviews";
import SEO from "../components/SEO";

import API from "../services/api";
import { getUser } from "../utils/auth";
import Button from "../components/ui/Button";
import { useToast } from "../components/ui/ToastProvider";
import { IMAGES } from "../lib/images";
import PriceRequestModal from "../components/PriceRequestModal";

export default function VenueDetails() {
  const { id } = useParams();
  const { notify } = useToast();
  const [venue, setVenue] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);

  useEffect(() => {
    API.get(`/venues/${id}`)
      .then(res => setVenue(res.data))
      .catch(() => {
        // Demo fallback (important for investor demo)
        setVenue({
          _id: id,
          name: "Grand Banquet & Lawn",
          venueType: "Banquet Hall",
          city: "Delhi NCR",
          capacity: 500,
          pricePerDay: 200000,
          description:
            "A premium banquet + lawn venue for weddings, receptions, sangeet, and corporate events with great lighting and spacious parking.",
          amenities: ["Parking", "AC", "Power Backup", "Decoration Area", "Catering"],
          images: [IMAGES.venue.banquet]
        });
      });

    // Venues don't have reviews in the current backend, so we'll leave it empty
    setReviews([]);
  }, [id]);

  if (!venue) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-amber-500 animate-pulse text-lg font-medium">Loading venue details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SEO
        title={`${venue.name} | Book ${venue.venueType} in ${venue.city} | Mano India`}
        description={venue.description || `Book ${venue.name} for your wedding or event in ${venue.city}. Verified venue on Mano India.`}
        keywords={`book ${venue.venueType}, ${venue.name}, ${venue.city} venues, wedding hall booking`}
        image={venue.images?.[0]}
        canonicalUrl={`https://manoindia.in/venues/${venue._id}`}
      />
      {/* Top Section: Image & Details */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image Placeholder - Dark Gradient */}
        <div className="h-96 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center text-gray-500 shadow-2xl border border-gray-800 relative overflow-hidden group">
          {venue.images && venue.images.length > 0 ? (
            <img
              src={venue.images[0]}
              alt={`${venue.name} - ${venue.venueType} in ${venue.city}`}
              className="w-full h-full object-cover"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = IMAGES.venue.banquet;
              }}
            />
          ) : (
            <span className="text-lg font-medium">Venue Image</span>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Venue Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                {venue.venueType}
              </span>
              <span className="text-gray-500 text-sm">• {venue.city}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {venue.name}
            </h1>
          </div>

          {venue.description && (
            <div>
              <h2 className="font-semibold text-gray-300 mb-2 uppercase tracking-wide text-sm">About the Venue</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {venue.description}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="space-y-4">
            <div>
              <span className="text-gray-500 text-sm uppercase tracking-wider block mb-1">Capacity</span>
              <span className="text-xl font-semibold text-white flex items-center gap-2">
                👥 {venue.capacity} guests
              </span>
            </div>

            {/* Amenities */}
            {venue.amenities && venue.amenities.length > 0 && (
              <div>
                <span className="text-gray-500 text-sm uppercase tracking-wider block mb-2">Amenities</span>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:border-amber-500/50 hover:text-amber-500 transition-colors cursor-default"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price & Action Card */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Price per day</p>
                <div className="text-3xl font-bold text-amber-500">
                  ₹ {venue.pricePerDay?.toLocaleString()} <span className="text-sm text-gray-500 font-normal">/ day</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    const user = getUser();
                    if (!user) {
                      notify({ type: "warning", title: "Login required", message: "Please login to book a venue." });
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
                  📅 Book Venue
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
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-10">
        <Reviews reviews={reviews} />
      </div>

      {openBooking && (
        <BookingModal
          venueId={venue._id}
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
            role: "venue",
            id: venue._id,
            name: venue.name,
            currentAmount: venue.pricePerDay,
          }}
          onClose={() => setOpenSuggestion(false)}
          onSubmitted={() => setOpenSuggestion(false)}
        />
      )}
    </div>
  );
}