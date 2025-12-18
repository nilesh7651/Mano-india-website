import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function VenueDashboard() {
  const [bookings, setBookings] = useState([]);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVenue();
    loadBookings();
  }, []);

  const loadVenue = () => {
    API.get("/venues/my")
      .then((res) => {
        setVenue(res.data);
      })
      .catch(() => {
        setVenue(null);
      });
  };

  const loadBookings = () => {
    API.get("/bookings/venue")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  const handleAction = async (id, action) => {
    try {
      await API.put(`/bookings/${id}/${action}`);
      loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // If no venue, show create venue option
  if (!venue) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Venue Dashboard</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">No Venue Profile Found</h2>
          <p className="text-gray-700 mb-4">
            Create your venue profile to start receiving bookings. Your venue will be reviewed by admin before going live.
          </p>
          <Link
            to="/create-venue"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            Create Venue Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Venue Dashboard</h1>
          <p className="text-gray-600">Manage your venue and bookings</p>
        </div>
        {venue.isVerified ? (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            ✓ Verified
          </span>
        ) : (
          <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            ⏳ Pending Approval
          </span>
        )}
      </div>

      {!venue.isVerified && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            Your venue is pending admin approval. Once approved, it will be visible to users.
          </p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Venue Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-semibold">{venue.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-semibold">{venue.venueType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">City</p>
            <p className="font-semibold">{venue.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Capacity</p>
            <p className="font-semibold">{venue.capacity} guests</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price Per Day</p>
            <p className="font-semibold">₹ {venue.pricePerDay?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Venue Bookings</h2>
        <p className="text-gray-600 text-sm">Manage incoming booking requests</p>
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
