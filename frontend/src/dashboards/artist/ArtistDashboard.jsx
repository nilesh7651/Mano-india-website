import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ArtistDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    API.get("/bookings/artist")
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleAction = async (id, action) => {
    await API.put(`/bookings/${id}/${action}`);
    loadBookings();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading artist bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Incoming Bookings</h1>
        <p className="text-gray-600">Manage your booking requests</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-2">No booking requests yet.</p>
          <p className="text-sm text-gray-400">Your bookings will appear here</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 flex justify-between items-center"
            >
            <div>
              <h2 className="font-semibold">{b.user?.name || b.user?.email || "Guest"}</h2>
              <p className="text-sm text-gray-600">
                📅 {new Date(b.eventDate).toDateString()}
              </p>
              {b.eventLocation && (
                <p className="text-xs text-gray-500 mt-1">
                  📍 {b.eventLocation}
                </p>
              )}
              <p className="text-sm font-medium mt-1">₹ {b.amount}</p>
            </div>

              {b.status === "PENDING" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(b._id, "accept")}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(b._id, "reject")}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-medium text-sm"
                  >
                    Reject
                  </button>
                </div>
              ) : b.status === "ACCEPTED" ? (
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {b.status}
                  </span>
                  <button
                    onClick={() => handleAction(b._id, "complete")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    Mark Complete
                  </button>
                </div>
              ) : (
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  b.status === "COMPLETED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {b.status}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
