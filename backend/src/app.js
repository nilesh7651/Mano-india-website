const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const artistRoutes = require("./routes/artistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminVenueRoutes = require("./routes/adminVenueRoutes");
const venueRoutes = require("./routes/venueRoutes");
const eventManagerRoutes = require("./routes/eventManagerRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const blogRoutes = require("./routes/blogRoutes");
const priceRequestRoutes = require("./routes/priceRequestRoutes");
const themeRoutes = require("./routes/themeRoutes");
const themeRequestRoutes = require("./routes/themeRequestRoutes");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const app = express();

app.disable("x-powered-by");

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Security Headers
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean)
    : true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const path = require("path");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // strict limit for auth routes
  message: "Too many login attempts, please try again later."
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", require("./routes/adminArtistRoutes"));
app.use("/api/admin", adminVenueRoutes);
app.use("/api/admin", require("./routes/adminEventManagerRoutes")); // Added
app.use("/api/venues", venueRoutes);
app.use("/api/event-managers", eventManagerRoutes); // Added
app.use("/api/admin", require("./routes/adminPayoutRoutes"));
app.use("/api/admin", require("./routes/adminDashboardRoutes"));
app.use("/api/earnings", require("./routes/earningsRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/payments", paymentRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/price-requests", priceRequestRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/theme-requests", themeRequestRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

app.use("/api/admin", require("./routes/adminReceiptRoutes"));
app.use("/api/admin", require("./routes/adminBlogRoutes"));
app.use("/api/admin", require("./routes/adminPriceRequestRoutes"));
app.use("/api/admin", require("./routes/adminThemeRoutes"));
app.use("/api/admin", require("./routes/adminThemeRequestRoutes"));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Artist Booking API is running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
