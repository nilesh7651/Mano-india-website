import { useEffect, useState } from "react";
import API from "../../services/api";
import { useToast } from "../../components/ui/ToastProvider";

export default function AdminArtists() {
  const { notify } = useToast();
  const [artists, setArtists] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("pending"); // "pending" or "all"

  useEffect(() => {
    loadArtists();
    loadAllArtists();
  }, []);

  const loadArtists = () => {
    API.get("/admin/artists/pending")
      .then(res => setArtists(res.data))
      .catch(err => {
        console.error("Failed to load pending artists:", err);
        setArtists([]);
      })
      .finally(() => setLoading(false));
  };

  const loadAllArtists = () => {
    API.get("/admin/artists")
      .then(res => setAllArtists(res.data))
      .catch(err => {
        console.error("Failed to load all artists:", err);
        setAllArtists([]);
      });
  };

  const refreshData = () => {
    loadArtists();
    loadAllArtists();
  };

  const approveArtist = async (id) => {
    try {
      await API.put(`/admin/artists/${id}/approve`);
      refreshData();
      notify({ type: "success", title: "Approved", message: "Artist approved successfully." });
    } catch (err) {
      notify({
        type: "error",
        title: "Approve failed",
        message: err.response?.data?.message || "Failed to approve artist.",
      });
    }
  };

  const rejectArtist = async (id) => {
    if (!confirm("Are you sure you want to reject this artist?")) return;

    try {
      await API.delete(`/admin/artists/${id}/reject`);
      refreshData();
      notify({ type: "success", title: "Removed", message: "Artist rejected and removed." });
    } catch (err) {
      notify({
        type: "error",
        title: "Reject failed",
        message: err.response?.data?.message || "Failed to reject artist.",
      });
    }
  };

  if (loading) return <p className="text-gray-500">Loading artists...</p>;

  const displayArtists = viewMode === "pending" ? artists : allArtists;

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Artist Management</h1>
          <p className="text-gray-400 text-sm">Approve and manage artist profiles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("pending")}
            className={`px-4 py-2 rounded-lg transition border ${viewMode === "pending"
              ? "bg-amber-600 text-black border-amber-600 font-bold"
              : "bg-gray-900 text-gray-400 border-gray-700 hover:border-amber-500 hover:text-amber-500"
              }`}
          >
            Pending ({artists.length})
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 rounded-lg transition border ${viewMode === "all"
              ? "bg-amber-600 text-black border-amber-600 font-bold"
              : "bg-gray-900 text-gray-400 border-gray-700 hover:border-amber-500 hover:text-amber-500"
              }`}
          >
            All Artists ({allArtists.length})
          </button>
        </div>
      </div>

      {viewMode === "pending" && artists.length === 0 && (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
          <p className="text-gray-500">No pending artist approvals.</p>
        </div>
      )}

      {viewMode === "all" && allArtists.length === 0 && (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
          <p className="text-gray-500">No artists registered yet.</p>
        </div>
      )}

      {displayArtists.length > 0 && (
        <div className="grid gap-6">
          {displayArtists.map(artist => (
            <div
              key={artist._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {artist.name}
                  </h3>
                  <p className="text-gray-400 mt-1">
                    {artist.category} • {artist.city}
                  </p>
                  <p className="text-amber-500 text-sm mt-1 font-mono">
                    📞 {artist.phone}
                  </p>
                  {artist.user && (
                    <p className="text-sm text-gray-500 mt-1">
                      Owner: {artist.user.name} ({artist.user.email})
                    </p>
                  )}
                  {artist.bio && (
                    <p className="text-gray-300 mt-2">{artist.bio}</p>
                  )}
                  <p className="text-lg font-semibold mt-3 text-amber-500">
                    ₹ {artist.pricePerEvent?.toLocaleString()} / event
                  </p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${artist.isVerified
                      ? "bg-green-900/30 text-green-400 border border-green-800"
                      : "bg-yellow-900/30 text-yellow-500 border border-yellow-800"
                      }`}>
                      {artist.isVerified ? "✓ Verified" : "⏳ Pending"}
                    </span>
                  </div>
                </div>

                {!artist.isVerified && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveArtist(artist._id)}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-medium text-sm shadow-lg shadow-green-900/20"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectArtist(artist._id)}
                      className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition font-medium text-sm shadow-lg shadow-red-900/20"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {artist.isVerified && (
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-green-900/20 border border-green-800 rounded-lg text-green-500 font-semibold text-sm">
                      ✓ Approved
                    </span>
                    <button
                      onClick={() => rejectArtist(artist._id)}
                      className="px-4 py-2 bg-red-900/20 text-red-500 border border-red-800 rounded-lg hover:bg-red-900/40 transition font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
