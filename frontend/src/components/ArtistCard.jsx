import { Link } from "react-router-dom";

export default function ArtistCard({ artist }) {
  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-900/20 hover:border-amber-500/50 transition-all duration-300">
      {/* Image placeholder - Updated to Dark Gradient */}
      <div className="h-48 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-600">
        {/* If you have an image URL in artist object, you can uncomment below: */}
        {/* <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover" /> */}
        <span className="text-sm">Artist Image</span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-500 transition-colors">
          {artist.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          {artist.category} • {artist.city}
        </p>

        {artist.bio && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {artist.bio}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="font-semibold text-amber-500">
            ₹ {artist.pricePerEvent?.toLocaleString() || artist.pricePerEvent}{" "}
            <span className="text-xs text-gray-500 font-normal">/ event</span>
          </span>

          <Link
            to={`/artists/${artist._id}`}
            className="text-sm font-medium text-gray-300 hover:text-white transition flex items-center gap-1"
          >
            View Details <span className="text-amber-500">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}