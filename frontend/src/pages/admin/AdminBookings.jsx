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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Payout Management</h1>
        <p className="text-gray-600 text-sm">Manage artist and venue payouts</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No payouts pending.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-900">User</th>
                <th className="p-4 text-left font-semibold text-gray-900">Type</th>
                <th className="p-4 text-left font-semibold text-gray-900">Provider</th>
                <th className="p-4 text-left font-semibold text-gray-900">Bank Details</th>
                <th className="p-4 text-right font-semibold text-gray-900">Amount</th>
                <th className="p-4 text-right font-semibold text-gray-900">Commission</th>
                <th className="p-4 text-right font-semibold text-gray-900">Payout</th>
                <th className="p-4 text-left font-semibold text-gray-900">Status</th>
                <th className="p-4 text-left font-semibold text-gray-900">Payout Status</th>
                <th className="p-4 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">{b.user?.name || b.user?.email || "N/A"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${b.artist ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                      }`}>
                      {b.artist ? "Artist" : "Venue"}
                    </span>
                  </td>
                  <td className="p-4">
                    {b.artist?.name || b.venue?.name || "N/A"}
                  </td>
                  <td className="p-4 text-xs text-gray-600">
                    {b.artist?.bankDetails?.accountNumber || b.venue?.bankDetails?.accountNumber ? (
                      <div>
                        <p className="font-bold">{b.artist?.bankDetails?.bankName || b.venue?.bankDetails?.bankName}</p>
                        <p>Acc: {b.artist?.bankDetails?.accountNumber || b.venue?.bankDetails?.accountNumber}</p>
                        <p>IFSC: {b.artist?.bankDetails?.ifscCode || b.venue?.bankDetails?.ifscCode}</p>
                        <p>Holder: {b.artist?.bankDetails?.accountHolderName || b.venue?.bankDetails?.accountHolderName}</p>
                      </div>
                    ) : (
                      <span className="text-red-500 italic">No Bank Info</span>
                    )}
                  </td>
                  <td className="p-4 text-right font-medium">
                    ₹ {b.amount?.toLocaleString() || 0}
                  </td>
                  <td className="p-4 text-right text-gray-600">
                    ₹ {b.commissionAmount?.toLocaleString() || 0}
                  </td>
                  <td className="p-4 text-right font-semibold">
                    ₹ {b.payoutAmount?.toLocaleString() || 0}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${b.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                        b.status === "ACCEPTED" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                      }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${b.payoutStatus === "PAID" ? "bg-green-100 text-green-700" :
                        b.payoutStatus === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                      }`}>
                      {b.payoutStatus || "NOT_READY"}
                    </span>
                  </td>
                  <td className="p-4">
                    {b.payoutStatus !== "PAID" && b.status !== "PENDING" && (
                      <button
                        onClick={() => markAsPaid(b._id)}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-xs"
                      >
                        Mark Paid
                      </button>
                    )}
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
