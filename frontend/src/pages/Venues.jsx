import { useEffect, useState } from "react";
import API from "../services/api";
import VenueCard from "../components/VenueCard";

export default function Venues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    API.get("/venues")
      .then(res => setVenues(res.data))
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
        ]);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Venues</h1>
        <p className="text-gray-600">
          Find the perfect venue for your event
        </p>
      </div>

      {venues.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No venues available at the moment.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map(venue => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
