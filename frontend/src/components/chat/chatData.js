export const CHAT_DATA = {
    // Initial Greeting
    greeting: {
        message: "Welcome to Mano India! 🌟 I'm your event assistant. I can help you find venues, book artists, or answer your questions. What's on your mind today?",
        options: ["Find a Venue", "Book an Artist", "Pricing & Payments", "Support", "Cancel Booking"]
    },

    // VENUE RELATED
    "find a venue": {
        message: "We have a wide range of premium venues! Are you looking for a specific type or just browsing?",
        options: ["Marriage Halls", "Banquet Halls", "Open Gardens", "Browse All Venues"]
    },
    "marriage halls": {
        message: "Great choice! Our marriage halls accommodate 500-2000+ guests. You can view them on our Venues page.",
        options: ["Go to Venues Page", "Check Availability", "Main Menu"]
    },
    "banquet halls": {
        message: "Perfect for receptions and parties! Our AC banquet halls offer premium catering options.",
        options: ["Go to Venues Page", "Pricing Info", "Main Menu"]
    },
    "open gardens": {
        message: "Beautiful outdoor settings for grand events. These are very popular in winter!",
        options: ["Go to Venues Page", "Check Availability", "Main Menu"]
    },
    "browse all venues": {
        message: "You can explore our entire collection here. Use filters to find the perfect match.",
        options: ["Go to Venues Page", "Main Menu"]
    },

    // ARTIST RELATED
    "book an artist": {
        message: "We work with top-tier talent! Who are you looking for?",
        options: ["Singers", "Dancers", "Musicians", "Magicians", "Comedians", "Anchors"]
    },
    "singers": {
        message: "From classical to bollywood, our singers can set the perfect mood.",
        options: ["View Singers", "Popular Artists", "Main Menu"]
    },
    "dancers": {
        message: "Add some energy to your event with our professional dance troupes!",
        options: ["View Dancers", "Main Menu"]
    },

    // PRICING & PAYMENTS
    "pricing & payments": {
        message: "We value transparency. What would you like to know?",
        options: ["Venue Pricing", "Artist Fees", "Payment Methods", "Refund Policy"]
    },
    "venue pricing": {
        message: "Venue prices vary by capacity and amenities, typically ranging from ₹50,000 to ₹5 Lakhs per day. Check specific venue pages for exact rates.",
        options: ["Browse Venues", "Main Menu"]
    },
    "artist fees": {
        message: "Artist fees depend on their popularity and performance duration. It can range from ₹15,000 to ₹5 Lakhs+.",
        options: ["Browse Artists", "Main Menu"]
    },
    "payment methods": {
        message: "We accept all major credit/debit cards, UPI (GPay, PhonePe), and Net Banking. 20% advance is required to confirm bookings.",
        options: ["Refund Policy", "Main Menu"]
    },
    "refund policy": {
        message: "Cancellations made 30 days before the event get a 90% refund. Within 7 days, there is no refund of the advance. See our full policy for details.",
        options: ["Read Full Policy", "Main Menu"]
    },

    // SUPPORT & MISC
    "support": {
        message: "Need human help? You can reach us at support@manoindia.in or +91-9876543210 (10 AM - 7 PM).",
        options: ["Main Menu", "Close Chat"]
    },
    "cancel booking": {
        message: "To cancel a booking, please go to your Dashboard > My Bookings and select 'Cancel'. Refunds are processed within 5-7 business days.",
        options: ["Go to Dashboard", "Refund Policy", "Main Menu"]
    },
    "default": {
        message: "I didn't quite catch that. Could you select one of these options?",
        options: ["Find a Venue", "Book an Artist", "Support", "Main Menu"]
    }
};
