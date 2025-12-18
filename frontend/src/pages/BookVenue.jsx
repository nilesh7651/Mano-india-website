import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function BookVenue() {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [days, setDays] = useState(1);
  const [notes, setNotes] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", {
        venueId: id,
        eventDate: date,
        eventLocation: notes || "Location to be confirmed",
      });

      alert("Venue booking placed successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={submitHandler} style={card}>
        <h2>Book Venue</h2>

        <input type="date" required onChange={(e) => setDate(e.target.value)} style={input} />
        <input type="number" min="1" placeholder="Number of days" onChange={(e) => setDays(e.target.value)} style={input} />
        <textarea placeholder="Event details" onChange={(e) => setNotes(e.target.value)} style={input} />

        <button style={btn}>Confirm Booking</button>
      </form>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "400px",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
