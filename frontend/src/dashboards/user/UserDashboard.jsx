import { useEffect, useState } from "react";
import API from "../../services/api";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/bookings/user")
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your event bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-2">No bookings yet.</p>
          <p className="text-sm text-gray-400">Start by browsing artists or venues</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 flex justify-between items-center"
            >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">
                  {b.artist?.name || b.venue?.name}
                </h2>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {b.artist ? "Artist" : "Venue"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(b.eventDate).toDateString()}
              </p>
              {b.eventLocation && (
                <p className="text-xs text-gray-500 mt-1">
                  📍 {b.eventLocation}
                </p>
              )}
              {b.amount && (
                <p className="text-sm font-medium mt-1">
                  ₹ {b.amount}
                </p>
              )}
            </div>

              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  b.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "ACCEPTED"
                    ? "bg-green-100 text-green-700"
                    : b.status === "COMPLETED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
