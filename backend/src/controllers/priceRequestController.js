const PriceRequest = require("../models/PriceRequest");
const Booking = require("../models/Booking");
const Artist = require("../models/Artist");
const Venue = require("../models/Venue");
const EventManager = require("../models/EventManager");
const User = require("../models/User");
const notify = require("../utils/createNotification");

exports.createPriceRequest = async (req, res) => {
  try {
    const {
      bookingId,
      providerRole,
      providerId,
      proposedAmount,
      currentAmount,
      eventDate,
      eventLocation,
      message,
    } = req.body;

    const proposed = Number(proposedAmount);
    if (!Number.isFinite(proposed) || proposed <= 0) {
      return res.status(400).json({ message: "Invalid proposedAmount" });
    }

    let resolvedProviderRole;
    let resolvedProviderId;
    let resolvedProviderName;
    let resolvedEventDate;
    let resolvedEventLocation;
    let resolvedCurrentAmount;
    let resolvedUserId;
    let booking;

    if (bookingId) {
      booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }

      if (booking.paymentStatus === "PAID") {
        return res
          .status(400)
          .json({ message: "Cannot request price change after payment" });
      }

      resolvedUserId = booking.user;
      resolvedEventDate = booking.eventDate;
      resolvedEventLocation = booking.eventLocation;
      resolvedCurrentAmount = booking.amount;

      if (booking.artist) {
        const artist = await Artist.findById(booking.artist).select("name");
        if (!artist) return res.status(400).json({ message: "Artist not found" });
        resolvedProviderRole = "artist";
        resolvedProviderId = booking.artist;
        resolvedProviderName = artist.name;
      } else if (booking.venue) {
        const venue = await Venue.findById(booking.venue).select("name");
        if (!venue) return res.status(400).json({ message: "Venue not found" });
        resolvedProviderRole = "venue";
        resolvedProviderId = booking.venue;
        resolvedProviderName = venue.name;
      } else if (booking.eventManager) {
        const em = await EventManager.findById(booking.eventManager).select(
          "companyName name"
        );
        if (!em)
          return res.status(400).json({ message: "Event Manager not found" });
        resolvedProviderRole = "event_manager";
        resolvedProviderId = booking.eventManager;
        resolvedProviderName = em.companyName || em.name;
      } else {
        return res.status(400).json({ message: "Booking has no provider" });
      }
    } else {
      // Pre-booking request (from details pages)
      if (!providerRole || !providerId) {
        return res
          .status(400)
          .json({ message: "providerRole and providerId are required" });
      }
      if (!eventDate || !eventLocation) {
        return res
          .status(400)
          .json({ message: "eventDate and eventLocation are required" });
      }

      const current = Number(currentAmount);
      if (!Number.isFinite(current) || current <= 0) {
        return res.status(400).json({ message: "Invalid currentAmount" });
      }

      resolvedUserId = req.user._id;
      resolvedEventDate = new Date(eventDate);
      resolvedEventLocation = String(eventLocation || "").trim();
      resolvedCurrentAmount = current;

      if (!resolvedEventLocation) {
        return res.status(400).json({ message: "Invalid eventLocation" });
      }
      if (Number.isNaN(resolvedEventDate.getTime())) {
        return res.status(400).json({ message: "Invalid eventDate" });
      }

      resolvedProviderRole = providerRole;
      resolvedProviderId = providerId;

      if (providerRole === "artist") {
        const artist = await Artist.findById(providerId).select("name");
        if (!artist) return res.status(404).json({ message: "Artist not found" });
        resolvedProviderName = artist.name;
      } else if (providerRole === "venue") {
        const venue = await Venue.findById(providerId).select("name");
        if (!venue) return res.status(404).json({ message: "Venue not found" });
        resolvedProviderName = venue.name;
      } else if (providerRole === "event_manager") {
        const em = await EventManager.findById(providerId).select(
          "companyName name"
        );
        if (!em)
          return res
            .status(404)
            .json({ message: "Event Manager not found" });
        resolvedProviderName = em.companyName || em.name;
      } else {
        return res.status(400).json({ message: "Invalid providerRole" });
      }
    }

    const created = await PriceRequest.create({
      booking: booking?._id,
      providerId: resolvedProviderId,
      user: resolvedUserId,
      providerRole: resolvedProviderRole,
      providerName: resolvedProviderName,
      eventDate: resolvedEventDate,
      eventLocation: resolvedEventLocation,
      currentAmount: resolvedCurrentAmount,
      proposedAmount: proposed,
      message: String(message || "").trim(),
      status: "PENDING",
    });

    // Notify all admins
    const admins = await User.find({ role: "admin" }).select("_id");
    await Promise.all(
      admins.map((a) =>
        notify(
          a._id,
          "Price Suggestion Request",
          `New price request for ${resolvedProviderName}: ₹${resolvedCurrentAmount} → ₹${proposed} (${resolvedEventLocation})`
        )
      )
    );

    res.status(201).json({ message: "Request submitted", request: created });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
