const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Venue = require("./models/Venue");

// Load env vars
dotenv.config({ path: "./.env" }); // Adjust path if running from root

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding...");

        // CLEAR DATA
        await User.deleteMany({});
        await Artist.deleteMany({});
        await Venue.deleteMany({});
        console.log("Old data cleared.");

        // CREATE USERS (1 Admin, 3 Artists, 3 Venue Owners, 1 Normal User)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123456", salt);

        const users = await User.insertMany([
            { name: "Admin User", email: "admin@mano.com", password: hashedPassword, role: "admin" },
            { name: "Artist One", email: "artist1@mano.com", password: hashedPassword, role: "artist" },
            { name: "Artist Two", email: "artist2@mano.com", password: hashedPassword, role: "artist" },
            { name: "Artist Three", email: "artist3@mano.com", password: hashedPassword, role: "artist" },
            { name: "Venue Owner 1", email: "venue1@mano.com", password: hashedPassword, role: "venue" },
            { name: "Venue Owner 2", email: "venue2@mano.com", password: hashedPassword, role: "venue" },
            { name: "Venue Owner 3", email: "venue3@mano.com", password: hashedPassword, role: "venue" },
            { name: "Normal User", email: "user@mano.com", password: hashedPassword, role: "user" },
        ]);

        const artistUsers = users.filter((u) => u.role === "artist");
        const venueUsers = users.filter((u) => u.role === "venue");

        // CREATE ARTISTS
        await Artist.insertMany([
            {
                user: artistUsers[0]._id,
                name: "DJ Alpha",
                category: "DJ",
                city: "Delhi",
                pricePerEvent: 15000,
                bio: "Top-rated DJ in Delhi specialising in Bollywood and EDM.",
                isVerified: true,
                images: ["https://images.unsplash.com/photo-1571266028243-3716950639dd?q=80&w=800"],
            },
            {
                user: artistUsers[1]._id,
                name: "Shreya Melody",
                category: "Singer",
                city: "Mumbai",
                pricePerEvent: 25000,
                bio: "Soulful singer for weddings and private parties.",
                isVerified: true,
                images: ["https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800"],
            },
            {
                user: artistUsers[2]._id,
                name: "The Rockers Band",
                category: "Band",
                city: "Bangalore",
                pricePerEvent: 50000,
                bio: "High energy rock band for corporate events.",
                isVerified: true,
                images: ["https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800"],
            },
        ]);

        // CREATE VENUES
        await Venue.insertMany([
            {
                owner: venueUsers[0]._id,
                name: "Royal Palace Hall",
                venueType: "Wedding Hall",
                city: "Delhi",
                capacity: 500,
                pricePerDay: 200000,
                description: "A grand hall perfect for luxury weddings.",
                isVerified: true,
                amenities: ["AC", "Parking", "Catering"],
                images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800"],
            },
            {
                owner: venueUsers[1]._id,
                name: "Sunset Resort",
                venueType: "Resort",
                city: "Goa",
                capacity: 200,
                pricePerDay: 150000,
                description: "Beachside resort for exotic weddings and parties.",
                isVerified: true,
                amenities: ["Pool", "Beach Access", "Bar"],
                images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"],
            },
            {
                owner: venueUsers[2]._id,
                name: "Green Lawns",
                venueType: "Farmhouse",
                city: "Gurgaon",
                capacity: 300,
                pricePerDay: 80000,
                description: "Open green lawns for outdoor parties.",
                isVerified: true,
                amenities: ["Open Air", "Decor", "Parking"],
                images: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc6?q=80&w=800"],
            },
        ]);

        console.log("Database Seeded Successfully!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
