import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import ReceiptModal from "../../components/ReceiptModal";

export default function AdminReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const query = useMemo(() => q.trim(), [q]);

  const loadReceipts = async (search) => {
    setLoading(true);
    try {
      const res = await API.get("/admin/receipts", {
        params: search ? { q: search } : undefined,
      });
      setReceipts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load receipts", err);
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceipts("");
  }, []);

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Receipts</h1>
          <p className="text-gray-400">Payment receipts created after successful verification</p>
        </div>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            loadReceipts(query);
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search invoice, payment id, location..."
            className="w-72 max-w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading receipts...</p>
        </div>
      ) : receipts.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
          <p className="text-gray-400">No receipts found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-800">
              <tr>
                <th className="text-left py-3 px-4">Invoice</th>
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Provider</th>
                <th className="text-left py-3 px-4">Event</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Paid At</th>
                <th className="text-right py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((r) => (
                <tr key={r._id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-white font-mono">{r.invoiceNumber}</td>
                  <td className="py-3 px-4 text-gray-200">
                    <div className="font-medium">{r.user?.name || "—"}</div>
                    <div className="text-xs text-gray-500">{r.user?.email || ""}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-200">
                    <div className="font-medium">{r.serviceName}</div>
                    <div className="text-xs text-gray-500">{r.providerRole?.replace("_", " ")}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div>{r.eventLocation}</div>
                    <div className="text-xs text-gray-500">
                      {r.eventDate ? new Date(r.eventDate).toDateString() : ""}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-amber-500 font-bold">₹ {Number(r.amount || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-300">
                    {r.paidAt ? new Date(r.paidAt).toLocaleString() : "—"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(r)}
                      className="px-3 py-1.5 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedReceipt && (
        <ReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
      )}
    </div>
  );
}
