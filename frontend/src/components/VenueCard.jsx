import { Link } from "react-router-dom";

export default function VenueCard({ venue }) {
  return (
    <Link
      to={`/venues/${venue._id}`}
      className="block group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-900/20 hover:border-amber-500/50 transition-all duration-300"
    >
      {/* Image Placeholder - Dark Gradient */}
      <div className="h-48 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-600 relative overflow-hidden">
        {/* Optional: Add a subtle overlay effect on hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />

        {venue.images && venue.images.length > 0 ? (
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=Venue+Image";
            }}
          />
        ) : (
          <span className="text-sm z-10">Venue Image</span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-amber-500 transition-colors">
          {venue.name}
        </h3>
        <p className="text-sm text-gray-400 mb-1">
          {venue.venueType} • {venue.city}
        </p>

        {venue.capacity && (
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
            <span className="text-amber-500/80">👥</span> Capacity: {venue.capacity} guests
          </p>
        )}

        <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
          <p className="font-semibold text-amber-500 text-lg">
            ₹ {venue.pricePerDay?.toLocaleString() || venue.pricePerDay}{" "}
            <span className="text-xs text-gray-500 font-normal">/ day</span>
          </p>

          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide group-hover:text-white transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}