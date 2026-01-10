import { useEffect, useRef, useState } from "react";
import API from "../../services/api";
import { useToast } from "../../components/ui/ToastProvider";

export default function AdminPriceRequests() {
  const { notify } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const didNotifyRef = useRef(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/price-requests");
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load price requests", err);
      setRequests([]);
      const status = err?.response?.status;
      const serverMessage = err?.response?.data?.message;

      let message = serverMessage || "Failed to load requests.";
      if (status === 404) message = "Route not configured on backend (404). Restart backend / deploy latest backend.";
      if (status === 401 || status === 403) message = serverMessage || "Admin login expired or not authorized.";

      // React StrictMode can run effects twice in dev; prevent duplicate toast spam
      if (!didNotifyRef.current) {
        notify({ type: "error", title: "Failed", message });
        didNotifyRef.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/admin/price-requests/${id}`, { status });
      notify({ type: "success", title: "Updated", message: `Marked as ${status}.` });
      load();
    } catch (err) {
      notify({
        type: "error",
        title: "Update failed",
        message: err.response?.data?.message || "Failed to update request.",
      });
    }
  };

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-semibold text-white mb-2">Price Suggestion Requests</h1>
        <p className="text-gray-400 text-sm">User requests when they are not satisfied with the price</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
          <p className="text-gray-500">No requests found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-800">
              <tr>
                <th className="text-left py-3 px-4">Created</th>
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Provider</th>
                <th className="text-left py-3 px-4">Event</th>
                <th className="text-right py-3 px-4">Current</th>
                <th className="text-right py-3 px-4">Proposed</th>
                <th className="text-left py-3 px-4">Message</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-gray-300">{r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}</td>
                  <td className="py-3 px-4 text-gray-200">
                    <div className="font-medium">{r.user?.name || "—"}</div>
                    <div className="text-xs text-gray-500">{r.user?.email || ""}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-200">
                    <div className="font-medium">{r.providerName}</div>
                    <div className="text-xs text-gray-500">{String(r.providerRole || "").replace("_", " ")}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div>{r.eventLocation}</div>
                    <div className="text-xs text-gray-500">{r.eventDate ? new Date(r.eventDate).toDateString() : ""}</div>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-200 font-medium">₹ {Number(r.currentAmount || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-amber-500 font-bold">₹ {Number(r.proposedAmount || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-300 max-w-xs truncate" title={r.message || ""}>
                    {r.message || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${r.status === "PENDING"
                      ? "bg-yellow-900/30 text-yellow-500 border-yellow-800"
                      : r.status === "REVIEWED"
                        ? "bg-blue-900/30 text-blue-400 border-blue-800"
                        : "bg-green-900/30 text-green-400 border-green-800"
                      }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {r.status !== "REVIEWED" && r.status !== "RESOLVED" && (
                        <button
                          onClick={() => updateStatus(r._id, "REVIEWED")}
                          className="px-3 py-1.5 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      {r.status !== "RESOLVED" && (
                        <button
                          onClick={() => updateStatus(r._id, "RESOLVED")}
                          className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-500 transition"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
