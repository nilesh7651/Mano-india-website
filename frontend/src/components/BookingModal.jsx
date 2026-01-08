import { useState } from "react";
import API from "../services/api";
import { createOrder, verifyPayment } from "../services/payment";
import { getUser } from "../utils/auth";
import { loadRazorpay } from "../utils/razorpay";
import { useToast } from "./ui/ToastProvider";

export default function BookingModal({
  artistId,
  venueId,
  eventManagerId,
  onClose,
  onSuccess,
}) {
  const { notify } = useToast();
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingType = venueId ? "Venue" : artistId ? "Artist" : "Event Manager";

  const handlePayment = async (booking) => {
    const res = await loadRazorpay();
    if (!res) {
      setError("Payment SDK failed to load. Please check your internet and try again.");
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
            onSuccess?.();
            notify({ type: "success", title: "Payment successful", message: "Your booking is confirmed." });
            onClose();
          } catch (err) {
            notify({ type: "error", title: "Payment failed", message: "Payment verification failed." });
          }
        },
        prefill: {
          name: "User", // You might want to pass user details here if available
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F59E0B",
        },
        modal: {
          ondismiss: function () {
            // If user closes payment, we still close the modal but maybe notify them
            // Or we can keep it open. For now, let's close and let them pay from "My Bookings"
            onClose();
            notify({ type: "warning", title: "Payment pending", message: "Booking created. Please complete payment from 'My Bookings'." });
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment Error:", err);
      setError("Failed to initiate payment");
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (!eventDate || (!eventLocation && !venueId)) {
      setError("Please fill all fields");
      return;
    }

    // Role Check
    const user = getUser();
    if (!user || user.role !== "user") {
      setError("Only registered users can make bookings.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/bookings", {
        artistId,
        venueId,
        eventManagerId,
        eventDate,
        eventLocation,
      });

      // Booking created (AWAITING_PAYMENT), now trigger payment
      await handlePayment(res.data);

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create booking"
      );
      setLoading(false); // Only stop loading if booking creation failed
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl shadow-amber-900/20 transform transition-all">

        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            Request <span className="text-amber-500">{bookingType}</span> Booking
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Fill in the details below to proceed.
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-5 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg p-3">
              ⚠ {error}
            </div>
          )}

          {/* Event Date */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Event Date <span className="text-amber-500">*</span>
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-500"
              required
            />
          </div>

          {/* Event Location - Only show for Artists */}
          {!venueId && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Event Location <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Grand Hotel, Patna"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
                required
              />
            </div>
          )}

          {venueId && (
            <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-800">
              <p className="text-sm text-gray-400">Location: <span className="text-white font-medium">At Venue</span></p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-500 transition-all font-semibold shadow-lg shadow-amber-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-transparent border border-gray-600 text-gray-300 py-3 rounded-lg hover:border-gray-400 hover:text-white transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}