import { useEffect, useState } from "react";
import API from "../services/api";
import VenueCard from "../components/VenueCard";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/venues")
      .then((res) => {
        setVenues(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Demo fallback
        setVenues([
          {
            _id: "1",
            name: "Royal Wedding Hall",
            venueType: "Wedding Hall",
            city: "Delhi",
            capacity: 500,
            pricePerDay: 200000,
          },
          {
            _id: "2",
            name: "Grand Party Lawn",
            venueType: "Party Lawn",
            city: "Gurgaon",
            capacity: 300,
            pricePerDay: 150000,
          },
          {
            _id: "3",
            name: "Oceanic Resort",
            venueType: "Resort",
            city: "Goa",
            capacity: 200,
            pricePerDay: 350000,
          },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
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
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-gray-400">Loading venues...</p>
        </div>
      ) : venues.length === 0 ? (
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
  );
}