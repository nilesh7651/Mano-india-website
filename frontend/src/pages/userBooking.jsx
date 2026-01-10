import { useEffect, useState } from "react";
import API from "../services/api";
import { createOrder, verifyPayment } from "../services/payment";
import ReceiptModal from "../components/ReceiptModal";
import { loadRazorpay } from "../utils/razorpay";
import { useToast } from "../components/ui/ToastProvider";
import PriceRequestModal from "../components/PriceRequestModal";

export default function UserBookings() {
  const { notify } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceiptData, setSelectedReceiptData] = useState(null);
  const [priceRequestBooking, setPriceRequestBooking] = useState(null);
  const [reviewModal, setReviewModal] = useState({ isOpen: false, bookingId: null });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  const canAskSuggestion = (booking) => {
    if (!booking) return false;
    if (booking.paymentStatus === "PAID") return false;
    // Before paying only (avoid completed/rejected/cancelled)
    const blocked = ["COMPLETED", "REJECTED", "CANCELLED"];
    if (blocked.includes(booking.status)) return false;
    return true;
  };

  const handleAction = async (id, action) => {
    try {
      await API.put(`/bookings/${id}/${action}`);
      // Refresh
      const res = await API.get("/bookings/user");
      setBookings(res.data);
    } catch (err) {
      notify({ type: "error", title: "Failed", message: "Failed to update booking." });
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
      // Optionally refresh to remove review button or show "Reviewed"
    } catch (err) {
      notify({ type: "error", title: "Review failed", message: err.response?.data?.message || "Failed to submit review" });
    }
  };

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

  const handlePayment = async (booking) => {
    const res = await loadRazorpay();
    if (!res) {
      notify({ type: "error", title: "Payment unavailable", message: "Razorpay SDK failed to load." });
      return;
    }

    try {
      const orderData = await createOrder(booking._id);
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mano India",
        description: "Booking Payment",
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await verifyPayment({
              ...response,
              bookingId: booking._id,
            });
            // Refresh bookings
            const updatedRes = await API.get("/bookings/user");
            setBookings(updatedRes.data);
            notify({ type: "success", title: "Payment successful", message: "Your booking is confirmed." });
          } catch (err) {
            notify({ type: "error", title: "Payment failed", message: "Payment verification failed." });
          }
        },
        theme: { color: "#F59E0B" }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error", err);
      notify({ type: "error", title: "Payment failed", message: "Failed to start payment." });
    }
  };

  const handleViewReceipt = async (booking) => {
    try {
      const res = await API.get(`/receipts/booking/${booking._id}`);
      setSelectedReceiptData({ receipt: res.data, booking });
    } catch (err) {
      // Backward compatibility: show booking-based receipt even if receipt record doesn't exist yet
      setSelectedReceiptData({ booking });
      notify({
        type: "info",
        title: "Receipt",
        message:
          err.response?.status === 404
            ? "Receipt record not found yet. Showing booking details."
            : "Failed to load receipt. Showing booking details.",
      });
    }
  };

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
                  {booking.artist?.name || booking.venue?.name || booking.eventManager?.companyName || booking.eventManager?.name}
                </h2>
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700 uppercase">
                  {booking.artist ? "Artist" : booking.venue ? "Venue" : "Event Manager"}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  📅 {new Date(booking.eventDate).toDateString()}
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  💰 Amount: <span className="text-white font-medium">₹ {booking.amount?.toLocaleString()}</span>
                </p>
                {(booking.status === "ACCEPTED" || booking.status === "CONFIRMED" || booking.status === "PENDING") && (
                  <p className="text-sm text-amber-500 flex items-center gap-2 font-medium">
                    📞 {booking.artist?.phone || booking.venue?.phone || booking.eventManager?.phone || "Contact Info Hidden"}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === "PENDING"
                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                    : booking.status === "ACCEPTED" || booking.status === "CONFIRMED"
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : booking.status === "REJECTED" || booking.status === "CANCELLED"
                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                        : "bg-gray-700 text-gray-300"
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${booking.status === "PENDING" ? "bg-yellow-500" :
                    booking.status === "AWAITING_PAYMENT" ? "bg-orange-500" :
                      booking.status === "ACCEPTED" || booking.status === "CONFIRMED" ? "bg-green-500" :
                        booking.status === "REJECTED" || booking.status === "CANCELLED" ? "bg-red-500" : "bg-gray-400"
                    }`}></span>
                  {booking.status === "AWAITING_PAYMENT" ? "PAYMENT PENDING" : booking.status}
                </span>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              {booking.status === "AWAITING_PAYMENT" ? (
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handlePayment(booking)}
                    className="w-full md:w-auto bg-amber-600 text-white px-6 py-2.5 rounded-lg hover:bg-amber-500 font-medium transition-all shadow-lg shadow-amber-900/20"
                  >
                    Pay Now
                  </button>
                  {canAskSuggestion(booking) && (
                    <button
                      onClick={() => setPriceRequestBooking(booking)}
                      className="w-full md:w-auto border border-gray-700 text-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Ask Suggestion
                    </button>
                  )}
                </div>
              ) : booking.status === "PENDING" ? (
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <span className="text-yellow-500 text-sm italic">Waiting for approval</span>
                  {canAskSuggestion(booking) && (
                    <button
                      onClick={() => setPriceRequestBooking(booking)}
                      className="w-full md:w-auto border border-gray-700 text-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Ask Suggestion
                    </button>
                  )}
                </div>
              ) : booking.status === "ACCEPTED" ? (
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleViewReceipt(booking)}
                    className="w-full md:w-auto border border-gray-700 text-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                  >
                    View Receipt
                  </button>
                  {canAskSuggestion(booking) && (
                    <button
                      onClick={() => setPriceRequestBooking(booking)}
                      className="w-full md:w-auto border border-gray-700 text-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Ask Suggestion
                    </button>
                  )}
                  {!booking.userCompleted && (
                    <button
                      onClick={() => handleAction(booking._id, "complete")}
                      className="w-full md:w-auto bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-500 font-medium transition-all shadow-lg shadow-green-900/20 text-sm"
                    >
                      Mark Complete
                    </button>
                  )}
                  {booking.userCompleted && (
                    <span className="text-xs text-green-500 text-center italic">Waiting for provider confirmation...</span>
                  )}
                </div>
              ) : booking.status === "COMPLETED" ? (
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleViewReceipt(booking)}
                    className="w-full md:w-auto border border-gray-700 text-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                  >
                    View Receipt
                  </button>
                  {/* Check if already reviewed? Need logic or just let them try and fail? Best to check. 
                        For now, assuming button is always shown until we fetch reviews. 
                        The user didn't ask to HIDE it if reviewed, but it's good UX.
                        Let's add a simple "Review" button that opens a modal.
                    */}
                  <button
                    onClick={() => openReviewModal(booking)}
                    className="w-full md:w-auto bg-amber-600 text-white px-6 py-2.5 rounded-lg hover:bg-amber-500 font-medium transition-all shadow-lg shadow-amber-900/20 text-sm"
                  >
                    Write Review
                  </button>
                </div>
              ) : null}

              <p className="text-xs text-gray-500">
                ID: {booking._id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedReceiptData && (
        <ReceiptModal
          booking={selectedReceiptData.booking}
          receipt={selectedReceiptData.receipt}
          onClose={() => setSelectedReceiptData(null)}
        />
      )}

      {priceRequestBooking && (
        <PriceRequestModal
          booking={priceRequestBooking}
          onClose={() => setPriceRequestBooking(null)}
        />
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