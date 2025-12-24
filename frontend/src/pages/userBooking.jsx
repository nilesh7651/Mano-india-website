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

  if (loading) return <p>Loading bookings...</p>;

  if (bookings.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        No bookings yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">My Bookings</h1>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white border rounded-xl p-6 flex justify-between items-center"
        >
          <div>
            <h2 className="font-medium text-lg">
              {booking.artist?.name || booking.venue?.name}
            </h2>

            <p className="text-sm text-gray-600">
              {new Date(booking.eventDate).toDateString()}
            </p>

            <p className="text-sm text-gray-600">
              Amount: ₹ {booking.amount}
            </p>

            <span
              className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                booking.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "ACCEPTED"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {booking.status}
            </span>
          </div>

          {/* PAYMENT PLACEHOLDER (Phase-2) */}
          {booking.status === "PENDING" && (
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Pay Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}