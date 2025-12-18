import { useState } from "react";
import API from "../services/api";

export default function BookingModal({
  artistId,
  venueId,
  onClose,
  onSuccess,
}) {
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingType = venueId ? "Venue" : "Artist";

  const handleSubmit = async () => {
    setError("");

    if (!eventDate || !eventLocation) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/bookings", {
        artistId,
        venueId,
        eventDate,
        eventLocation,
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create booking"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Request {bookingType} Booking
          </h2>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Event Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Date *
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Event Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Location *
            </label>
            <input
              type="text"
              placeholder="Enter event location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-black text-white py-2.5 rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>

            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
