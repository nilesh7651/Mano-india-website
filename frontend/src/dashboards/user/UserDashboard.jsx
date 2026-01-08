import { useEffect, useState } from "react";
import API from "../../services/api";
import { createOrder, verifyPayment } from "../../services/payment";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { loadRazorpay } from "../../utils/razorpay";
import { useToast } from "../../components/ui/ToastProvider";

export default function UserDashboard() {
  const { notify } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState({ isOpen: false, bookingId: null });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  const handleAction = async (id, action) => {
    try {
      await API.put(`/bookings/${id}/${action}`);
      loadBookings();
    } catch (err) {
      notify({
        type: "error",
        title: "Failed",
        message: err.response?.data?.message || "Failed to update booking",
      });
    }
  };

  const openReviewModal = (booking) => {
    setReviewModal({ isOpen: true, bookingId: booking._id });
    setReviewForm({ rating: 5, comment: "" });
  };

  const submitReview = async () => {
    try {
      await API.post("/reviews", {
        bookingId: reviewModal.bookingId,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      notify({ type: "success", title: "Thanks!", message: "Review submitted successfully." });
      setReviewModal({ isOpen: false, bookingId: null });
    } catch (err) {
      notify({
        type: "error",
        title: "Review failed",
        message: err.response?.data?.message || "Failed to submit review",
      });
    }
  };

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
      const loaded = await loadRazorpay();
      if (!loaded) {
        notify({ type: "error", title: "Payment unavailable", message: "Payment SDK failed to load." });
        return;
      }

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
            notify({ type: "success", title: "Payment successful", message: "Your booking is confirmed." });
            loadBookings(); // Refresh status
          } catch (error) {
            notify({ type: "error", title: "Payment failed", message: "Payment verification failed." });
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
      notify({ type: "error", title: "Payment failed", message: "Failed to start payment." });
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
    <div className="space-y-8 min-h-screen bg-black text-gray-100 p-6 md:p-12">
      <div>
        <h1 className="text-3xl font-bold text-white">My Bookings</h1>
        <p className="text-gray-400 mt-1">View and manage your event bookings</p>
      </div>

      {bookings.length === 0 ? (
        <Card variant="dark" className="text-center py-16 border-dashed border-gray-800 bg-gray-900/50">
          <p className="text-gray-400 mb-4 text-lg">No bookings yet.</p>
          <p className="text-gray-500">Start by browsing artists or venues to make your first booking.</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <Card
              key={b._id}
              variant="dark"
              className="hover:shadow-lg hover:shadow-amber-900/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-white">
                    {b.artist?.name || b.venue?.name}
                  </h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${b.artist ? 'bg-purple-900/30 text-purple-300 border-purple-800' : 'bg-blue-900/30 text-blue-300 border-blue-800'}`}>
                    {b.artist ? "Artist" : "Venue"}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <span>📅</span> {new Date(b.eventDate).toDateString()}
                  </p>
                  {b.eventLocation && (
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <span>📍</span> {b.eventLocation}
                    </p>
                  )}
                  {b.amount && (
                    <p className="text-sm font-bold text-amber-500 mt-2">
                      ₹ {b.amount.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${b.status === "PENDING"
                    ? "bg-yellow-900/30 text-yellow-500 border-yellow-800"
                    : b.status === "ACCEPTED"
                      ? "bg-green-900/30 text-green-400 border-green-800"
                      : b.status === "COMPLETED"
                        ? "bg-blue-900/30 text-blue-400 border-blue-800"
                        : b.status === "AWAITING_PAYMENT"
                          ? "bg-orange-900/30 text-orange-400 border-orange-800"
                          : "bg-red-900/30 text-red-400 border-red-800"
                    }`}
                >
                  {b.status === "AWAITING_PAYMENT" ? "Payment Pending" : b.status}
                </span>

                <div className="flex items-center gap-3">
                  {(b.status === "AWAITING_PAYMENT" || (b.status === "ACCEPTED" && b.paymentStatus !== "PAID")) && (
                    <Button
                      onClick={() => handlePayment(b)}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Pay Now
                    </Button>
                  )}

                  {b.paymentStatus === "PAID" && (
                    <span className="flex items-center gap-1 text-sm font-bold text-green-500">
                      <span>✓</span> Paid
                    </span>
                  )}

                  {b.status === "ACCEPTED" && !b.userCompleted && (
                    <Button
                      onClick={() => handleAction(b._id, "complete")}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white border-green-700"
                    >
                      Mark Complete
                    </Button>
                  )}

                  {b.status === "ACCEPTED" && b.userCompleted && (
                    <span className="text-xs text-green-500 italic">Waiting for provider...</span>
                  )}

                  {b.status === "COMPLETED" && (
                    <Button
                      onClick={() => openReviewModal(b)}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Write Review
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {reviewModal.isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-amber-500/30 rounded-2xl p-6 w-full max-w-md relative">
            <button onClick={() => setReviewModal({ isOpen: false, bookingId: null })} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
            <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className={`text-2xl transition-colors ${reviewForm.rating >= star ? "text-amber-500" : "text-gray-600"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Comment</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                  rows="4"
                  placeholder="Share your experience..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                />
              </div>
              <button
                onClick={submitReview}
                className="w-full bg-amber-600 text-white py-2 rounded-lg font-bold hover:bg-amber-500"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
