import { useState } from "react";
import API from "../services/api";

export default function BookingForm({ itemId, type, onClose }) {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings", {
        itemId,
        bookingType: type, // "artist" or "venue"
        eventDate: date,
        eventLocation: location,
        notes,
      });
      setSuccess(true);
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-amber-500/30 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-amber-900/20 relative">

        {/* Close Button (X) - Absolute Position */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          ✕
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl border border-amber-500/50">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Booking <span className="text-amber-500">Successful</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Your request has been sent! The provider will contact you shortly to confirm details.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/40"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Book This <span className="text-amber-500 capitalize">{type}</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the details below to send a request.
              </p>
            </div>

            {/* Location Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-400 ml-1">Event Location</label>
              <input
                type="text"
                placeholder="e.g. Grand Hotel, Mumbai or 123 Street Name"
                required
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-500"
              />
            </div>

            {/* Date Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-400 ml-1">Event Date</label>
              <input
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-500"
              />
            </div>

            {/* Notes Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-400 ml-1">Event Details / Notes</label>
              <textarea
                placeholder="Tell us about your event (e.g., time, venue size, special requests)..."
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-lg font-medium text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/30"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}