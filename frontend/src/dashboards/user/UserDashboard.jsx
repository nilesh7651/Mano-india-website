import { useEffect, useState } from "react";
import API from "../../services/api";
import { createOrder, verifyPayment } from "../../services/payment";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    API.get("/bookings/user")
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  };

  const handlePayment = async (booking) => {
    try {
      const orderData = await createOrder(booking._id);

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mano India",
        description: `Payment for ${booking.artist?.name || booking.venue?.name}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id,
            });
            alert("Payment Successful!");
            loadBookings(); // Refresh status
          } catch (error) {
            alert("Payment verification failed");
            console.error(error);
          }
        },
        prefill: {
          name: "User Name", // Ideally fetch from user profile
          email: "user@example.com",
        },
        theme: {
          color: "#d97706",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Failed to start payment");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 animate-pulse">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl">My Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage your event bookings</p>
      </div>

      {bookings.length === 0 ? (
        <Card className="text-center py-16 border-dashed">
          <p className="text-gray-500 mb-4 text-lg">No bookings yet.</p>
          <p className="text-gray-400">Start by browsing artists or venues to make your first booking.</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <Card
              key={b._id}
              className="hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">
                    {b.artist?.name || b.venue?.name}
                  </h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${b.artist ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {b.artist ? "Artist" : "Venue"}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📅</span> {new Date(b.eventDate).toDateString()}
                  </p>
                  {b.eventLocation && (
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <span>📍</span> {b.eventLocation}
                    </p>
                  )}
                  {b.amount && (
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      ₹ {b.amount.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${b.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : b.status === "ACCEPTED"
                        ? "bg-green-100 text-green-800"
                        : b.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                    }`}
                >
                  {b.status}
                </span>

                <div className="flex items-center gap-3">
                  {b.status === "ACCEPTED" && b.paymentStatus !== "PAID" && (
                    <Button
                      onClick={() => handlePayment(b)}
                      size="sm"
                    >
                      Pay Now
                    </Button>
                  )}

                  {b.paymentStatus === "PAID" && (
                    <span className="flex items-center gap-1 text-sm font-bold text-green-600">
                      <span>✓</span> Paid
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
