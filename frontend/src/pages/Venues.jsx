import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import SEO from "../components/SEO";
import VenueCard from "../components/VenueCard";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/venues")
      .then((res) => setVenues(res.data))
      .catch((err) => {
        console.error("Failed to load venues", err);
        // Optional: Set empty array or simple error state if needed
        setVenues([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-8 md:p-12">
      <SEO
        title="Book Best Event Venues | Wedding Halls, Party Lawns | Mano India"
        description="Find the perfect wedding hall, party lawn, or corporate venue for your event in India with Mano India. Verified and premium venues."
        keywords="venue booking, wedding halls, party lawns, corporate event venues, banquet halls, event spaces"
        canonicalUrl="https://manoindia.in/venues"
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-800 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Premium <span className="text-amber-500">Venues</span>
            </h1>
            <p className="text-gray-400 max-w-xl">
              Find the perfect setting for your event. From grand wedding halls to
              intimate party lawns.
            </p>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Showing {venues.length} results
          </div>
        </div>

        {/* Content Section */}
        {venues.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
            <p className="text-gray-500 text-lg">
              No venues available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <VenueCard key={venue._id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}