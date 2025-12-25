const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const artistRoutes = require("./routes/artistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminVenueRoutes = require("./routes/adminVenueRoutes");
const venueRoutes = require("./routes/venueRoutes");
const uploadRoutes = require("./routes/uploadRoutes"); // Added
const galleryRoutes = require("./routes/galleryRoutes"); // Added
const paymentRoutes = require("./routes/paymentRoutes"); // Added

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

app.use("/api/auth", authRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", require("./routes/adminArtistRoutes"));
app.use("/api/admin", adminVenueRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/admin", require("./routes/adminPayoutRoutes"));
app.use("/api/admin", require("./routes/adminDashboardRoutes"));
app.use("/api/earnings", require("./routes/earningsRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/payments", paymentRoutes); // Changed to use variable
app.use("/api/upload", uploadRoutes); // Changed to use variable
app.use("/api/gallery", galleryRoutes); // Added

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));



app.get("/", (req, res) => {
  res.send("Artist Booking API is running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
