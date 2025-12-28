require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
const Artist = require("./src/models/Artist");
const Venue = require("./src/models/Venue");
const Booking = require("./src/models/Booking");
const Review = require("./src/models/Review");
const Gallery = require("./src/models/Gallery");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Artist.deleteMany({});
    await Venue.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await Gallery.deleteMany({});

    console.log("Creating Users...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = [
        { name: "Admin User", email: "admin@example.com", password: hashedPassword, phone: "9876543210", role: "admin" },
        { name: "John Doe", email: "john@example.com", password: hashedPassword, phone: "9876543211", role: "user" },
        { name: "Jane Smith", email: "jane@example.com", password: hashedPassword, phone: "9876543212", role: "user" },
        // Artists Users
        { name: "Arijit Singh", email: "arijit@example.com", password: hashedPassword, phone: "9000000001", role: "artist" },
        { name: "DJ Snake", email: "snake@example.com", password: hashedPassword, phone: "9000000002", role: "artist" },
        { name: "Hrithik Roshan", email: "hrithik@example.com", password: hashedPassword, phone: "9000000003", role: "artist" },
        // Venue Owners
        { name: "Taj Hotels", email: "taj@example.com", password: hashedPassword, phone: "8000000001", role: "venue" },
        { name: "Grand Hyatt", email: "hyatt@example.com", password: hashedPassword, phone: "8000000002", role: "venue" },
    ];

    const createdUsers = await User.insertMany(users);

    // Helper to find user by email
    const getUser = (email) => createdUsers.find(u => u.email === email);

    console.log("Creating Artists...");
    const artists = [
        {
            user: getUser("arijit@example.com")._id,
            name: "Arijit Singh",
            category: "Singer",
            city: "Mumbai",
            phone: "9000000001",
            pricePerEvent: 5000,
            bio: "Soulful singer, known for romantic ballads.",
            isAvailable: true,
            isVerified: true,
            images: ["https://source.unsplash.com/random/800x600/?singer"],
            bankDetails: { accountHolderName: "Arijit Singh", accountNumber: "1234567890", bankName: "HDFC", ifscCode: "HDFC0001234" }
        },
        {
            user: getUser("snake@example.com")._id,
            name: "DJ Snake",
            category: "DJ",
            city: "Delhi",
            phone: "9000000002",
            pricePerEvent: 2000,
            bio: "International DJ and producer.",
            isAvailable: true,
            isVerified: true,
            images: ["https://source.unsplash.com/random/800x600/?dj"],
            bankDetails: { accountHolderName: "DJ Snake", accountNumber: "0987654321", bankName: "SBI", ifscCode: "SBIN0001234" }
        },
        {
            user: getUser("hrithik@example.com")._id,
            name: "Hrithik Roshan",
            category: "Dancer",
            city: "Mumbai",
            phone: "9000000003",
            pricePerEvent: 3000,
            bio: "Professional dancer and performer.",
            isAvailable: true,
            isVerified: true,
            images: ["https://source.unsplash.com/random/800x600/?dancer"],
            bankDetails: { accountHolderName: "Hrithik Roshan", accountNumber: "1122334455", bankName: "ICICI", ifscCode: "ICIC0001234" }
        }
    ];
    const createdArtists = await Artist.insertMany(artists);

    console.log("Creating Venues...");
    const venues = [
        {
            owner: getUser("taj@example.com")._id,
            name: "Taj Mahal Palace",
            venueType: "Resort",
            city: "Mumbai",
            phone: "8000000001",
            capacity: 1000,
            pricePerDay: 1000,
            description: "Luxury hotel facing the Gateway of India.",
            isVerified: true,
            images: ["https://source.unsplash.com/random/800x600/?hotel"],
            amenities: ["AC", "Parking", "Catering"],
            bankDetails: { accountHolderName: "Taj Hotels", accountNumber: "5566778899", bankName: "Axis", ifscCode: "UTIB0001234" }
        },
        {
            owner: getUser("hyatt@example.com")._id,
            name: "Grand Hyatt",
            venueType: "Banquet",
            city: "Goa",
            phone: "8000000002",
            capacity: 500,
            pricePerDay: 500,
            description: "Beautiful banquet hall for weddings.",
            isVerified: true,
            images: ["https://source.unsplash.com/random/800x600/?banquet"],
            amenities: ["AC", "Pool", "Bar"],
            bankDetails: { accountHolderName: "Grand Hyatt", accountNumber: "9988776655", bankName: "HDFC", ifscCode: "HDFC0005678" }
        }
    ];

    const createdVenues = await Venue.insertMany(venues);

    console.log("Creating Bookings...");
    const bookings = [
        {
            user: getUser("john@example.com")._id,
            artist: createdArtists[0]._id, // Arijit
            eventDate: new Date("2025-01-15"),
            eventLocation: "Taj Mahal Palace, Mumbai",
            amount: 5000,
            status: "COMPLETED",
            paymentStatus: "PAID",
            payoutStatus: "PENDING", // Ready for admin payout
            razorpayOrderId: "order_seed_001",
            razorpayPaymentId: "pay_seed_001",
            commissionRate: 0.05,
            commissionAmount: 5000 * 0.05,
            payoutAmount: 5000 * 0.95,
            completedAt: new Date("2025-01-16"),
            paidAt: new Date("2024-12-20")
        },
        {
            user: getUser("jane@example.com")._id,
            artist: createdArtists[1]._id, // DJ Snake
            eventDate: new Date("2025-02-10"),
            eventLocation: "Grand Hyatt, Goa",
            amount: 2000,
            status: "ACCEPTED", // Upcoming
            paymentStatus: "PAID",
            razorpayOrderId: "order_seed_002",
            razorpayPaymentId: "pay_seed_002",
            commissionRate: 0.05,
            commissionAmount: 2000 * 0.05,
            payoutAmount: 2000 * 0.95,
            paidAt: new Date("2024-12-25")
        },
        {
            user: getUser("john@example.com")._id,
            venue: createdVenues[0]._id, // Taj
            eventDate: new Date("2025-03-05"),
            eventLocation: "Mumbai",
            amount: 1000,
            status: "AWAITING_PAYMENT",
            paymentStatus: "PENDING",
            commissionRate: 0.05,
            commissionAmount: 1000 * 0.05
        }
    ];
    const createdBookings = await Booking.insertMany(bookings);

    console.log("Creating Reviews...");
    const reviews = [
        {
            user: getUser("john@example.com")._id,
            artist: createdArtists[0]._id,
            booking: createdBookings[0]._id,
            rating: 5,
            comment: "Absolutely magical performance! Worth every penny."
        }
    ];
    await Review.insertMany(reviews);

    console.log("Creating Gallery Items...");
    const galleryItems = [
        {
            title: "Royal Udaipur Wedding",
            type: "Wedding",
            imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2574&auto=format&fit=crop",
            description: "A majestic destination wedding at grandeur palace."
        },
        {
            title: "Sufi Night Extravaganza",
            type: "Concert",
            imageUrl: "https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=2600&auto=format&fit=crop",
            description: "Soulful musical evening with traditional decor."
        },
        {
            title: "Corporate Gala Dinner",
            type: "Corporate",
            imageUrl: "https://images.unsplash.com/photo-1519671482538-518b5c2bf1c6?q=80&w=2576&auto=format&fit=crop",
            description: "Premium networking event with luxury amenities."
        },
        {
            title: "Traditional Haldi Ceremony",
            type: "Ceremony",
            imageUrl: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2670&auto=format&fit=crop",
            description: "Vibrant and colorful pre-wedding celebration."
        },
        {
            title: "Luxury Beach Resort Party",
            type: "Party",
            imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2670&auto=format&fit=crop",
            description: "Exclusive sunset party by the Goa coastline."
        },
        {
            title: "Grand Sangeet Night",
            type: "Sangeet",
            imageUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=2670&auto=format&fit=crop",
            description: "High-energy dance performances and DJ night."
        }
    ];
    await Gallery.insertMany(galleryItems);

    console.log("Database Seeded Successfully!");
    console.log("Sample Login Credentials:");
    console.log("Admin: admin@example.com / password123");
    console.log("Artist: arijit@example.com / password123");
    console.log("Venue: taj@example.com / password123");
    console.log("User: john@example.com / password123");

    mongoose.connection.close();
};

seedData();
