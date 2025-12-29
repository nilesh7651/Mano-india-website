require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

const userRoutes = require("./src/routes/userRoutes");
const artistRoutes = require("./src/routes/artistRoutes");
const venueRoutes = require("./src/routes/venueRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
