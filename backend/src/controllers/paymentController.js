const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");
const Artist = require("../models/Artist");
const Venue = require("../models/Venue");
const notify = require("../utils/createNotification");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * CREATE RAZORPAY ORDER
 */
exports.createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.paymentStatus === "PAID") {
      return res.status(400).json({ message: "Already paid" });
    }

    const options = {
      amount: booking.amount * 100, // paise
      currency: "INR",
      receipt: `booking_${booking._id}`,
    };

    const order = await razorpay.orders.create(options);

    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * VERIFY PAYMENT
 */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "PAID";
    // Change status from AWAITING_PAYMENT to PENDING (waiting for artist/venue approval)
    if (booking.status === "AWAITING_PAYMENT") {
      booking.status = "PENDING";
    }
    booking.razorpayPaymentId = razorpay_payment_id;

    await booking.save();

    // 🔔 Notify Owner that payment is done and request is ready
    let ownerId;
    if (booking.artist) {
      const artist = await Artist.findById(booking.artist);
      if (artist) ownerId = artist.user;
    } else if (booking.venue) {
      const venue = await Venue.findById(booking.venue);
      if (venue) ownerId = venue.owner;
    }

    if (ownerId) {
      await notify(
        ownerId,
        "New Booking Request",
        "You have received a new booking request (Payment Verified)."
      );
    }

    res.json({ message: "Payment verified", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
