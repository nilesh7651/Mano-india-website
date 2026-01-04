import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminVenues() {
  const [venues, setVenues] = useState([]);
  const [allVenues, setAllVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("pending"); // "pending" or "all"

  useEffect(() => {
    loadVenues();
    loadAllVenues();
  }, []);

  const loadVenues = () => {
    API.get("/admin/venues/pending")
      .then(res => setVenues(res.data))
      .catch(err => {
        console.error("Failed to load pending venues:", err);
        setVenues([]);
      })
      .finally(() => setLoading(false));
  };

  const loadAllVenues = () => {
    API.get("/admin/venues")
      .then(res => setAllVenues(res.data))
      .catch(err => {
        console.error("Failed to load all venues:", err);
        setAllVenues([]);
      });
  };

  const refreshData = () => {
    loadVenues();
    loadAllVenues();
  };

  const approveVenue = async (id) => {
    try {
      await API.put(`/admin/venues/${id}/approve`);
      refreshData();
      alert("Venue approved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve venue");
    }
  };

  const rejectVenue = async (id) => {
    if (!confirm("Are you sure you want to reject this venue?")) return;

    try {
      await API.delete(`/admin/venues/${id}/reject`);
      refreshData();
      alert("Venue rejected and removed");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject venue");
    }
  };

  if (loading) return <p className="text-gray-500">Loading venues...</p>;

  const displayVenues = viewMode === "pending" ? venues : allVenues;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Venue Approvals</h1>
          <p className="text-gray-600 text-sm">Approve and manage venue profiles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("pending")}
            className={`px-4 py-2 rounded-lg transition ${viewMode === "pending"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Pending ({venues.length})
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 rounded-lg transition ${viewMode === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            All Venues ({allVenues.length})
          </button>
        </div>
      </div>

      {viewMode === "pending" && venues.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No pending venue approvals.</p>
        </div>
      )}

      {viewMode === "all" && allVenues.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No venues registered yet.</p>
        </div>
      )}

      {displayVenues.length > 0 && (
        <div className="grid gap-4">
          {displayVenues.map(venue => (
            <div
              key={venue._id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {venue.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {venue.venueType} • {venue.city}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    📞 {venue.phone}
                  </p>
                  {venue.owner && (
                    <p className="text-sm text-gray-500 mt-1">
                      Owner: {venue.owner.name} ({venue.owner.email})
                    </p>
                  )}
                  {venue.description && (
                    <p className="text-gray-700 mt-2">{venue.description}</p>
                  )}
                  <div className="mt-2 flex gap-2">
                    <p className="text-sm text-gray-600">
                      Capacity: {venue.capacity} guests
                    </p>
                    <span className="text-gray-400">•</span>
                    <p className="text-sm text-gray-600">
                      ₹ {venue.pricePerDay?.toLocaleString()} / day
                    </p>
                  </div>
                  {venue.amenities && venue.amenities.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {venue.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 rounded text-xs"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${venue.isVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {venue.isVerified ? "✓ Verified" : "⏳ Pending"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!venue.isVerified && (
                    <button
                      onClick={() => approveVenue(venue._id)}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => rejectVenue(venue._id)}
                    className={`px-5 py-2 rounded-lg transition font-medium text-sm ${venue.isVerified
                      ? "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                      : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                  >
                    {venue.isVerified ? "Delete" : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
