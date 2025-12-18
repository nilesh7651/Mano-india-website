import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function BookArtist() {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [notes, setNotes] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", {
        artistId: id,
        eventDate: date,
        eventLocation: notes || "Location to be confirmed",
      });

      alert("Booking placed successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={submitHandler} style={card}>
        <h2>Book Artist</h2>

        <input type="date" required onChange={(e) => setDate(e.target.value)} style={input} />
        <input placeholder="Event Type (Wedding, Party)" required onChange={(e) => setEventType(e.target.value)} style={input} />
        <textarea placeholder="Additional notes" onChange={(e) => setNotes(e.target.value)} style={input} />

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
