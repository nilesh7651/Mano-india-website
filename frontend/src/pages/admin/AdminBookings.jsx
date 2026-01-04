import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    API.get("/admin/payouts")
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error("Failed to load bookings:", err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  };

  const markAsPaid = async (id) => {
    try {
      await API.put(`/admin/payouts/${id}/pay`);
      loadBookings();
      alert("Payout marked as paid!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark as paid");
    }
  };

  if (loading) return <p className="text-gray-500">Loading payouts...</p>;

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-semibold text-white mb-2">Payout Management</h1>
        <p className="text-gray-400 text-sm">Manage artist and venue payouts</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
          <p className="text-gray-500">No payouts pending.</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-300">User</th>
                <th className="p-4 text-left font-semibold text-gray-300">Type</th>
                <th className="p-4 text-left font-semibold text-gray-300">Provider</th>
                <th className="p-4 text-left font-semibold text-gray-300">Bank Details</th>
                <th className="p-4 text-right font-semibold text-gray-300">Amount</th>
                <th className="p-4 text-right font-semibold text-gray-300">Commission</th>
                <th className="p-4 text-right font-semibold text-gray-300">Payout</th>
                <th className="p-4 text-left font-semibold text-gray-300">Status</th>
                <th className="p-4 text-center font-semibold text-gray-300">Completion</th>
                <th className="p-4 text-left font-semibold text-gray-300">Payout Status</th>
                <th className="p-4 text-left font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {bookings.map(b => (
                <tr key={b._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-gray-300">{b.user?.name || b.user?.email || "N/A"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${b.artist ? "bg-purple-900/30 text-purple-400 border-purple-800" : "bg-blue-900/30 text-blue-400 border-blue-800"
                      }`}>
                      {b.artist ? "Artist" : "Venue"}
                    </span>
                  </td>
                  <td className="p-4 text-white font-medium">
                    {b.artist?.name || b.venue?.name || "N/A"}
                  </td>
                  <td className="p-4 text-xs text-gray-400">
                    {b.artist?.bankDetails?.accountNumber || b.venue?.bankDetails?.accountNumber ? (
                      <div>
                        <p className="font-bold text-gray-300">{b.artist?.bankDetails?.bankName || b.venue?.bankDetails?.bankName}</p>
                        <p>Acc: {b.artist?.bankDetails?.accountNumber || b.venue?.bankDetails?.accountNumber}</p>
                        <p>IFSC: {b.artist?.bankDetails?.ifscCode || b.venue?.bankDetails?.ifscCode}</p>
                        <p>Holder: {b.artist?.bankDetails?.accountHolderName || b.venue?.bankDetails?.accountHolderName}</p>
                      </div>
                    ) : (
                      <span className="text-red-400 italic">No Bank Info</span>
                    )}
                  </td>
                  <td className="p-4 text-right font-medium text-white">
                    ₹ {b.amount?.toLocaleString() || 0}
                  </td>
                  <td className="p-4 text-right text-gray-400">
                    ₹ {b.commissionAmount?.toLocaleString() || 0}
                  </td>
                  <td className="p-4 text-right font-bold text-amber-500">
                    ₹ {b.payoutAmount?.toLocaleString() || 0}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${b.status === "COMPLETED" ? "bg-green-900/30 text-green-400 border border-green-800" :
                      b.status === "ACCEPTED" ? "bg-blue-900/30 text-blue-400 border border-blue-800" :
                        "bg-yellow-900/30 text-yellow-500 border border-yellow-800"
                      }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className={b.artistCompleted || b.status === "COMPLETED" ? "text-green-400 font-bold" : "text-gray-500"}>
                        {b.artist ? "Artist" : "Venue"}: {b.artistCompleted || b.status === "COMPLETED" ? "✓" : "⏳"}
                      </span>
                      <span className={b.userCompleted || b.status === "COMPLETED" ? "text-green-400 font-bold" : "text-gray-500"}>
                        User: {b.userCompleted || b.status === "COMPLETED" ? "✓" : "⏳"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${b.payoutStatus === "PAID" ? "bg-green-900/30 text-green-400 border border-green-800" :
                      b.payoutStatus === "PENDING" ? "bg-yellow-900/30 text-yellow-500 border border-yellow-800" :
                        "bg-gray-800 text-gray-500 border border-gray-700"
                      }`}>
                      {b.payoutStatus || "NOT_READY"}
                    </span>
                  </td>
                  <td className="p-4">
                    {b.payoutStatus !== "PAID" && (
                      <button
                        onClick={() => markAsPaid(b._id)}
                        disabled={b.payoutStatus !== "PENDING"}
                        className={`px-3 py-1.5 rounded-lg transition font-medium text-xs ${b.payoutStatus === "PENDING"
                          ? "bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/20"
                          : "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700"
                          }`}
                      >
                        Mark Paid
                      </button>
                    )}
                    {b.payoutStatus === "PAID" && (
                      <span className="text-green-500 font-bold text-xs">✓ Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      )
      }
    </div >
  );
}
