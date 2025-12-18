import { Link } from "react-router-dom";

export default function ArtistCard({ artist }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
        <span className="text-sm">Artist Image</span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {artist.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {artist.category} • {artist.city}
        </p>

        {artist.bio && (
          <p className="text-gray-700 text-sm line-clamp-2 mb-4">
            {artist.bio}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="font-semibold text-gray-900">
            ₹ {artist.pricePerEvent?.toLocaleString() || artist.pricePerEvent} <span className="text-xs text-gray-500 font-normal">/ event</span>
          </span>

          <Link
            to={`/artists/${artist._id}`}
            className="text-sm font-medium text-black hover:text-gray-700 transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
