import { useEffect, useState } from "react";
import API from "../../services/api";
import { useToast } from "../../components/ui/ToastProvider";

export default function AdminVenues() {
  const { notify } = useToast();
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
      notify({ type: "success", title: "Approved", message: "Venue approved successfully." });
    } catch (err) {
      notify({
        type: "error",
        title: "Approve failed",
        message: err.response?.data?.message || "Failed to approve venue.",
      });
    }
  };

  const rejectVenue = async (id) => {
    if (!confirm("Are you sure you want to reject this venue?")) return;

    try {
      await API.delete(`/admin/venues/${id}/reject`);
      refreshData();
      notify({ type: "success", title: "Removed", message: "Venue rejected and removed." });
    } catch (err) {
      notify({
        type: "error",
        title: "Reject failed",
        message: err.response?.data?.message || "Failed to reject venue.",
      });
    }
  };

  if (loading) return <p className="text-gray-500">Loading venues...</p>;

  const displayVenues = viewMode === "pending" ? venues : allVenues;

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Venue Approvals</h1>
          <p className="text-gray-400 text-sm">Approve and manage venue profiles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("pending")}
            className={`px-4 py-2 rounded-lg transition border ${viewMode === "pending"
              ? "bg-amber-600 text-black border-amber-600 font-bold"
              : "bg-gray-900 text-gray-400 border-gray-700 hover:border-amber-500 hover:text-amber-500"
              }`}
          >
            Pending ({venues.length})
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 rounded-lg transition border ${viewMode === "all"
              ? "bg-amber-600 text-black border-amber-600 font-bold"
              : "bg-gray-900 text-gray-400 border-gray-700 hover:border-amber-500 hover:text-amber-500"
              }`}
          >
            All Venues ({allVenues.length})
          </button>
        </div>
      </div>

      {viewMode === "pending" && venues.length === 0 && (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
          <p className="text-gray-500">No pending venue approvals.</p>
        </div>
      )}

      {viewMode === "all" && allVenues.length === 0 && (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
          <p className="text-gray-500">No venues registered yet.</p>
        </div>
      )}

      {displayVenues.length > 0 && (
        <div className="grid gap-4">
          {displayVenues.map(venue => (
            <div
              key={venue._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {venue.name}
                  </h3>
                  <p className="text-gray-400 mt-1">
                    {venue.venueType} • {venue.city}
                  </p>
                  <p className="text-amber-500 text-sm mt-1 font-mono">
                    📞 {venue.phone}
                  </p>
                  {venue.owner && (
                    <p className="text-sm text-gray-500 mt-1">
                      Owner: {venue.owner.name} ({venue.owner.email})
                    </p>
                  )}
                  {venue.description && (
                    <p className="text-gray-300 mt-2">{venue.description}</p>
                  )}
                  <div className="mt-2 flex gap-2">
                    <p className="text-sm text-gray-400">
                      Capacity: {venue.capacity} guests
                    </p>
                    <span className="text-gray-600">•</span>
                    <p className="text-sm text-amber-500 font-semibold">
                      ₹ {venue.pricePerDay?.toLocaleString()} / day
                    </p>
                  </div>
                  {venue.amenities && venue.amenities.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {venue.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-800 border border-gray-700 text-gray-300 rounded text-xs"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${venue.isVerified
                      ? "bg-green-900/30 text-green-400 border border-green-800"
                      : "bg-yellow-900/30 text-yellow-400 border border-yellow-800"
                      }`}>
                      {venue.isVerified ? "✓ Verified" : "⏳ Pending"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!venue.isVerified && (
                    <button
                      onClick={() => approveVenue(venue._id)}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-medium text-sm shadow-lg shadow-green-900/20"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => rejectVenue(venue._id)}
                    className={`px-5 py-2 rounded-lg transition font-medium text-sm ${venue.isVerified
                      ? "bg-red-900/20 text-red-500 border border-red-800 hover:bg-red-900/40"
                      : "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/20"
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
