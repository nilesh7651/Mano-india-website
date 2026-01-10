import { useMemo, useState } from "react";
import API from "../services/api";
import { useToast } from "./ui/ToastProvider";

export default function PriceRequestModal({ booking, provider, onClose, onSubmitted }) {
  const { notify } = useToast();
  const [proposedAmount, setProposedAmount] = useState(booking?.amount || provider?.currentAmount || "");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const providerName = useMemo(() => {
    return (
      booking?.artist?.name ||
      booking?.venue?.name ||
      booking?.eventManager?.companyName ||
      booking?.eventManager?.name ||
      provider?.name ||
      "Provider"
    );
  }, [booking, provider]);

  const currentAmount = booking?.amount ?? provider?.currentAmount ?? 0;
  const isPreBooking = !booking && !!provider;

  if (!booking && !provider) return null;

  const submit = async () => {
    try {
      setSaving(true);
      if (booking) {
        await API.post("/price-requests", {
          bookingId: booking._id,
          proposedAmount,
          message,
        });
      } else {
        await API.post("/price-requests", {
          providerRole: provider.role,
          providerId: provider.id,
          currentAmount,
          proposedAmount,
          eventDate,
          eventLocation,
          message,
        });
      }
      notify({
        type: "success",
        title: "Sent",
        message: "Your request has been sent to admin for review.",
      });
      onSubmitted?.();
      onClose?.();
    } catch (err) {
      notify({
        type: "error",
        title: "Failed",
        message: err.response?.data?.message || "Failed to submit request.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-amber-500/30 rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Ask Suggestion</h3>
        <p className="text-sm text-gray-400 mb-4">
          Share your budget and we’ll forward it to admin to negotiate on your behalf for <span className="text-white">{providerName}</span>.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-800/40 border border-gray-800 rounded-xl p-3 text-sm text-gray-300">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Current</span>
              <span className="font-bold text-amber-500">₹ {Number(currentAmount || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 mt-1">
              <span className="text-gray-400">Event</span>
              <span className="text-gray-200 text-right">
                {booking?.eventLocation || "—"}
                {booking?.eventDate ? ` • ${new Date(booking.eventDate).toDateString()}` : ""}
              </span>
            </div>
          </div>

          {isPreBooking && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Event Location</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                  placeholder="City / Venue / Address"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Your Budget (₹)</label>
            <input
              type="number"
              min={1}
              value={proposedAmount}
              onChange={(e) => setProposedAmount(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:border-amber-500 focus:outline-none"
              placeholder="e.g. 5000"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Message (optional)</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:border-amber-500 focus:outline-none"
              rows={4}
              placeholder="Optional: explain your budget or requirements (duration, add-ons, etc.)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            onClick={submit}
            disabled={saving}
            className="w-full bg-amber-600 text-white py-2 rounded-lg font-bold hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Sending..." : "Send to Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}
