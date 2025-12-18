const VenueBooking = require("../models/VenueBooking");
const Venue = require("../models/Venue");
const notify = require("../utils/createNotification");

const createVenueBooking = async (req, res) => {
  try {
    const { venueId, eventType, eventDate, price } = req.body;

    if (!venueId || !eventType || !eventDate || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const booking = await VenueBooking.create({
      user: req.user._id,
      venue: venueId,
      eventType,
      eventDate,
      price,
      bookingStatus: "pending",
    });

    // Notify venue owner
    await notify(
      venue.owner,
      "New Venue Booking Request",
      "You have received a new venue booking request."
    );

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVenueBooking };

