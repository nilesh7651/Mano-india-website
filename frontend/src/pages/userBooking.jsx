import { useEffect, useState } from "react";
import API from "../services/api";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/user");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
        <h3 className="text-lg font-medium text-white mb-2">No Bookings Found</h3>
        <p className="text-gray-500">
          You haven't made any bookings yet. Start exploring artists or venues!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">
          My <span className="text-amber-500">Bookings</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your upcoming events and payment status
        </p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:border-gray-700 transition-colors"
          >
            {/* Info Section */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-white">
                  {booking.artist?.name || booking.venue?.name}
                </h2>
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700 uppercase">
                  {booking.artist ? "Artist" : "Venue"}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  📅 {new Date(booking.eventDate).toDateString()}
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  💰 Amount: <span className="text-white font-medium">₹ {booking.amount?.toLocaleString()}</span>
                </p>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.status === "PENDING"
                      ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      : booking.status === "ACCEPTED" || booking.status === "CONFIRMED"
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : booking.status === "REJECTED" || booking.status === "CANCELLED"
                      ? "bg-red-500/10 text-red-500 border border-red-500/20"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    booking.status === "PENDING" ? "bg-yellow-500" :
                    booking.status === "ACCEPTED" || booking.status === "CONFIRMED" ? "bg-green-500" :
                    booking.status === "REJECTED" || booking.status === "CANCELLED" ? "bg-red-500" : "bg-gray-400"
                  }`}></span>
                  {booking.status}
                </span>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              {booking.status === "PENDING" ? (
                <button className="w-full md:w-auto bg-amber-600 text-white px-6 py-2.5 rounded-lg hover:bg-amber-500 font-medium transition-all shadow-lg shadow-amber-900/20">
                  Proceed to Pay
                </button>
              ) : booking.status === "ACCEPTED" || booking.status === "CONFIRMED" ? (
                 <button className="w-full md:w-auto border border-gray-700 text-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                  View Receipt
                </button>
              ) : null}
              
              <p className="text-xs text-gray-500">
                ID: {booking._id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}