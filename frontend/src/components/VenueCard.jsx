import { Link } from "react-router-dom";

export default function VenueCard({ venue }) {
  return (
    <Link
      to={`/venues/${venue._id}`}
      className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
        <span className="text-sm">Venue Image</span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {venue.name}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {venue.venueType} • {venue.city}
        </p>
        {venue.capacity && (
          <p className="text-sm text-gray-500 mb-3">
            Capacity: {venue.capacity} guests
          </p>
        )}

        <div className="pt-4 border-t border-gray-100">
          <p className="font-semibold text-gray-900">
            ₹ {venue.pricePerDay?.toLocaleString() || venue.pricePerDay} <span className="text-xs text-gray-500 font-normal">/ day</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
