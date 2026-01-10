import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./ui/Button";
import { getUser } from "../utils/auth";
import { useToast } from "./ui/ToastProvider";
import PriceRequestModal from "./PriceRequestModal";

export default function ArtistCard({ artist }) {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [openSuggestion, setOpenSuggestion] = useState(false);

  return (
    <Link
      to={`/artists/${artist._id}`}
      className="group relative bg-gray-900 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/20 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60"></div>
        {artist.images && artist.images.length > 0 ? (
          <img
            src={artist.images[0]}
            alt={`${artist.name} - ${artist.category} in ${artist.city}`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=Artist+Image";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
            {artist.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 relative z-20 -mt-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors line-clamp-1">
              {artist.name}
            </h3>
            <div className="flex items-center gap-1 text-gray-400 text-xs uppercase tracking-wide font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {artist.city}
            </div>
          </div>
        </div>

        {artist.bio && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
            {artist.bio}
          </p>
        )}

        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Starting at</p>
            <p className="text-lg font-bold text-amber-500">
              ₹ {artist.pricePerEvent?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button size="sm" onClick={() => navigate(`/artists/${artist._id}`)} className="w-full">
            Book Now
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
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
    </Link>
  );
}