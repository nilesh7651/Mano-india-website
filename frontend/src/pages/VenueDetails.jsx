import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingModal from "../components/BookingModal";
import Reviews from "../components/Reviews";

import API from "../services/api";

export default function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);

  useEffect(() => {
    API.get(`/venues/${id}`)
      .then(res => setVenue(res.data))
      .catch(() => {
        // Demo fallback (important for investor demo)
        setVenue({
          _id: id,
          name: "Royal Wedding Hall",
          venueType: "Wedding Hall",
          city: "Delhi",
          capacity: 500,
          pricePerDay: 200000,
          description:
            "A premium wedding and event venue suitable for large celebrations, receptions, and corporate events.",
          amenities: ["Parking", "AC", "Power Backup", "Decoration Area"],
        });
      });

    // Venues don't have reviews in the current backend, so we'll leave it empty
    setReviews([]);
  }, [id]);

  if (!venue) {
    return <p className="text-gray-500">Loading venue details...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
          <span>Venue Image</span>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {venue.name}
            </h1>
            <p className="text-gray-600">
              {venue.venueType} • {venue.city}
            </p>
          </div>

          {venue.description && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {venue.description}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Capacity: </span>
              <span className="font-semibold text-gray-900">{venue.capacity} guests</span>
            </div>

            {/* Amenities */}
            {venue.amenities && venue.amenities.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-2xl font-semibold text-gray-900">
              ₹ {venue.pricePerDay?.toLocaleString()} <span className="text-sm text-gray-500 font-normal">/ day</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Book this venue for your event
            </p>
          </div>

          <button
            onClick={() => setOpenBooking(true)}
            className="w-full bg-black text-white px-8 py-3.5 rounded-lg hover:opacity-90 font-medium text-lg transition shadow-md"
          >
            📅 Book This Venue
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Reviews reviews={reviews} />

      </div>

      {openBooking && (
        <BookingModal
          venueId={venue._id}
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
