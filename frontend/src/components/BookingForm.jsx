import { useState } from "react";
import API from "../services/api";

export default function BookingForm({ itemId, type, onClose }) {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings", {
        itemId,
        bookingType: type, // "artist" or "venue"
        eventDate: date,
        notes,
      });
      setSuccess(true);
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#161616] border border-primary/20 rounded-xl p-8 w-full max-w-md">
        {success ? (
          <>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Booking Successful 🎉
            </h2>
            <p className="text-muted mb-6">
              Your booking request has been sent. The provider will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-primary text-dark py-3 rounded-lg font-semibold"
            >
              Close
            </button>
          </>
        ) : (
          <form onSubmit={submitHandler}>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Book This {type === "artist" ? "Artist" : "Venue"}
            </h2>

            <input
              type="date"
              required
              onChange={(e) => setDate(e.target.value)}
              className="input"
            />

            <textarea
              placeholder="Event details / notes"
              onChange={(e) => setNotes(e.target.value)}
              className="input h-24"
            />

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-dark py-3 rounded-lg font-semibold"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-primary text-primary py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
