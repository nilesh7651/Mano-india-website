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

const firstNames = ["Aarav", "Vihaan", "Aditya", "Arjun", "Sai", "Riyan", "Krishna", "Ishaan", "Shaurya", "Atharv", "Ananya", "Diya", "Sanya", "Kavya", "Isha", "Riya", "Aarohi", "Avni", "Sara", "Neha", "Rahul", "Rohit", "Vikram", "Suresh", "Ramesh", "Pooja", "Priya", "Sneha", "Nidhi", "Simran", "Amit", "Sumit", "Raj", "Aryan", "Kabir", "Meera", "Rani", "Aarti", "Priti", "Shruti", "Anil", "Sunil", "Sanjay", "Mahesh", "Dinesh", "Kiran", "Vijay", "Ajay", "Deepak", "Prakash"];
const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Das", "Kaur", "Gupta", "Yadav", "Jain", "Choudhary", "Reddy", "Nair", "Iyer", "Pillai", "Menon", "Khan", "Ali", "Sheikh", "Bose", "Chatterjee", "Sengupta", "Dutta", "Verma", "Tiwari", "Pandey", "Mishra", "Desai", "Joshi", "Bhatt", "Rao", "Naidu", "Agarwal", "Bansal", "Garg", "Mehta", "Shah", "Khatri", "Thakur", "Chauhan", "Rajput", "Kapoor", "Malhotra", "Mehra", "Chopra", "Kapur", "Sethi", "Kohli", "Nanda", "Ahuja", "Oberoi"];
const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi"];
const artistCategories = ["Singer", "Dancer", "DJ", "Band", "Comedian", "Magician", "Instrumentalist", "Anchor", "Photographer", "Makeup Artist"];
const venueTypes = ["Wedding Hall", "Banquet", "Resort", "Farmhouse", "Party Hall"];
const eventTypes = ["Wedding", "Concert", "Corporate", "Ceremony", "Party", "Sangeet", "Exhibition", "Birthday", "Conference", "Reception"];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const generatePhone = () => `9${Math.floor(100000000 + Math.random() * 900000000)}`;
const getPicsum = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const seedData = async () => {
    await connectDB();

    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Artist.deleteMany({});
    await Venue.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await Gallery.deleteMany({});

    console.log("Creating Admin and Base Users...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = [
        { name: "Admin User", email: "admin@example.com", password: hashedPassword, phone: "9876543210", role: "admin" },
        { name: "John Doe", email: "john@example.com", password: hashedPassword, phone: "9876543211", role: "user" },
        { name: "Jane Smith", email: "jane@example.com", password: hashedPassword, phone: "9876543212", role: "user" },
        { name: "Arijit Singh", email: "arijit@example.com", password: hashedPassword, phone: "9000000001", role: "artist" },
        { name: "DJ Snake", email: "snake@example.com", password: hashedPassword, phone: "9000000002", role: "artist" },
        { name: "Hrithik Roshan", email: "hrithik@example.com", password: hashedPassword, phone: "9000000003", role: "artist" },
        { name: "Taj Hotels", email: "taj@example.com", password: hashedPassword, phone: "8000000001", role: "venue" },
        { name: "Grand Hyatt", email: "hyatt@example.com", password: hashedPassword, phone: "8000000002", role: "venue" },
    ];

    // Generate 100 Random Users
    for (let i = 0; i < 100; i++) {
        users.push({
            name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
            email: `user${i}@example.com`,
            password: hashedPassword,
            phone: generatePhone(),
            role: "user"
        });
    }

    // Generate 100 Random Artist Users
    for (let i = 0; i < 100; i++) {
        users.push({
            name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
            email: `artist${i}@example.com`,
            password: hashedPassword,
            phone: generatePhone(),
            role: "artist"
        });
    }

    // Generate 50 Random Venue Users
    for (let i = 0; i < 50; i++) {
        users.push({
            name: `${getRandomItem(lastNames)} Enterprises`,
            email: `venue${i}@example.com`,
            password: hashedPassword,
            phone: generatePhone(),
            role: "venue"
        });
    }

    const createdUsers = await User.insertMany(users);
    const getUser = (email) => createdUsers.find(u => u.email === email);
    console.log(`Created ${createdUsers.length} Users.`);

    console.log("Creating Artists...");
    const artists = [
        {
            user: getUser("arijit@example.com")._id,
            name: "Arijit Singh",
            category: "Singer",
            city: "Mumbai",
            phone: "9000000001",
            pricePerEvent: 500000,
            bio: "Soulful singer, known for romantic ballads.",
            isAvailable: true,
            isVerified: true,
            images: [getPicsum("arijit")],
            bankDetails: { accountHolderName: "Arijit Singh", accountNumber: "1234567890", bankName: "HDFC", ifscCode: "HDFC0001234" },
            rating: 5,
            reviewCount: 200
        },
        {
            user: getUser("snake@example.com")._id,
            name: "DJ Snake",
            category: "DJ",
            city: "Delhi",
            phone: "9000000002",
            pricePerEvent: 200000,
            bio: "International DJ and producer.",
            isAvailable: true,
            isVerified: true,
            images: [getPicsum("djsnake")],
            bankDetails: { accountHolderName: "DJ Snake", accountNumber: "0987654321", bankName: "SBI", ifscCode: "SBIN0001234" },
            rating: 4.8,
            reviewCount: 150
        },
        {
            user: getUser("hrithik@example.com")._id,
            name: "Hrithik Roshan",
            category: "Dancer",
            city: "Mumbai",
            phone: "9000000003",
            pricePerEvent: 300000,
            bio: "Professional dancer and performer.",
            isAvailable: true,
            isVerified: true,
            images: [getPicsum("hrithik")],
            bankDetails: { accountHolderName: "Hrithik Roshan", accountNumber: "1122334455", bankName: "ICICI", ifscCode: "ICIC0001234" },
            rating: 4.9,
            reviewCount: 250
        }
    ];

    const artistUsers = createdUsers.filter(u => u.email.startsWith('artist') && !['arijit@example.com', 'snake@example.com', 'hrithik@example.com'].includes(u.email));
    for (let i = 0; i < artistUsers.length; i++) {
        const u = artistUsers[i];
        const category = getRandomItem(artistCategories);
        artists.push({
            user: u._id,
            name: u.name,
            category: category,
            city: getRandomItem(cities),
            phone: u.phone,
            pricePerEvent: getRandomInt(5000, 100000),
            bio: `Experienced ${category} ready to make your event memorable. Open for bookings across the city. High energy, professional service.`,
            isAvailable: Math.random() > 0.1,
            isVerified: Math.random() > 0.2,
            images: [getPicsum(`artist${i}`), getPicsum(`artist_b${i}`)],
            bankDetails: { accountHolderName: u.name, accountNumber: generatePhone(), bankName: "HDFC", ifscCode: "HDFC0001234" },
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            reviewCount: getRandomInt(0, 500)
        });
    }

    const createdArtists = await Artist.insertMany(artists);
    console.log(`Created ${createdArtists.length} Artists.`);

    console.log("Creating Venues...");
    const venues = [
        {
            owner: getUser("taj@example.com")._id,
            name: "Taj Mahal Palace",
            venueType: "Resort",
            city: "Mumbai",
            phone: "8000000001",
            capacity: 1000,
            pricePerDay: 500000,
            description: "Luxury hotel facing the Gateway of India.",
            isVerified: true,
            images: [getPicsum("taj1"), getPicsum("taj2")],
            amenities: ["AC", "Parking", "Catering", "Pool", "Wifi"],
            bankDetails: { accountHolderName: "Taj Hotels", accountNumber: "5566778899", bankName: "Axis", ifscCode: "UTIB0001234" },
            rating: 4.9,
            reviewCount: 1200
        },
        {
            owner: getUser("hyatt@example.com")._id,
            name: "Grand Hyatt",
            venueType: "Banquet",
            city: "Goa",
            phone: "8000000002",
            capacity: 500,
            pricePerDay: 250000,
            description: "Beautiful banquet hall for weddings.",
            isVerified: true,
            images: [getPicsum("hyatt1"), getPicsum("hyatt2")],
            amenities: ["AC", "Pool", "Bar", "Valet"],
            bankDetails: { accountHolderName: "Grand Hyatt", accountNumber: "9988776655", bankName: "HDFC", ifscCode: "HDFC0005678" },
            rating: 4.7,
            reviewCount: 850
        }
    ];

    const venueUsers = createdUsers.filter(u => u.email.startsWith('venue') && !['taj@example.com', 'hyatt@example.com'].includes(u.email));
    for (let i = 0; i < venueUsers.length; i++) {
        const u = venueUsers[i];
        const vType = getRandomItem(venueTypes);
        venues.push({
            owner: u._id,
            name: `${getRandomItem(firstNames)} ${vType}`,
            venueType: vType,
            city: getRandomItem(cities),
            phone: u.phone,
            capacity: getRandomInt(50, 5000),
            pricePerDay: getRandomInt(10000, 500000),
            description: `A fantastic ${vType} perfect for your next big event. Located in the heart of the city with ample parking and great ambiance.`,
            isVerified: Math.random() > 0.2,
            images: [getPicsum(`venue${i}`), getPicsum(`venue_b${i}`), getPicsum(`venue_c${i}`)],
            amenities: ["AC", "Parking", Math.random() > 0.5 ? "Catering" : "Wifi", Math.random() > 0.5 ? "Pool" : "Bar"],
            bankDetails: { accountHolderName: u.name, accountNumber: generatePhone(), bankName: "SBI", ifscCode: "SBIN0001234" },
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            reviewCount: getRandomInt(0, 300)
        });
    }

    const createdVenues = await Venue.insertMany(venues);
    console.log(`Created ${createdVenues.length} Venues.`);

    console.log("Creating Bookings...");
    const bookings = [];
    const normalUsers = createdUsers.filter(u => u.role === "user");
    const statuses = ["PENDING", "ACCEPTED", "REJECTED", "COMPLETED", "AWAITING_PAYMENT"];
    const paymentStatuses = ["PENDING", "PAID", "FAILED"];

    for (let i = 0; i < 300; i++) {
        const isArtistBooking = Math.random() > 0.5;
        const user = getRandomItem(normalUsers);
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + getRandomInt(-100, 100)); // Between 100 days ago and 100 days in future

        let booking = {
            user: user._id,
            eventDate: eventDate,
            status: getRandomItem(statuses),
            paymentStatus: getRandomItem(paymentStatuses),
            commissionRate: 0.05,
        };

        if (isArtistBooking) {
            const artist = getRandomItem(createdArtists);
            booking.artist = artist._id;
            booking.eventLocation = `${getRandomItem(cities)} Venue`;
            booking.amount = artist.pricePerEvent;
        } else {
            const venue = getRandomItem(createdVenues);
            booking.venue = venue._id;
            booking.eventLocation = venue.city;
            booking.amount = venue.pricePerDay;
        }

        if (booking.paymentStatus === "PAID") {
            booking.razorpayOrderId = `order_seed_${i}`;
            booking.razorpayPaymentId = `pay_seed_${i}`;
            booking.paidAt = new Date(eventDate.getTime() - 86400000 * getRandomInt(2, 20)); // 2 to 20 days before event
            booking.commissionAmount = booking.amount * booking.commissionRate;
            booking.payoutAmount = booking.amount * (1 - booking.commissionRate);
            if (booking.status === "COMPLETED") {
                booking.payoutStatus = Math.random() > 0.3 ? "PAID" : "PENDING";
                booking.completedAt = new Date(eventDate.getTime() + 86400000 * 1);
            }
        }

        bookings.push(booking);
    }
    const createdBookings = await Booking.insertMany(bookings);
    console.log(`Created ${createdBookings.length} Bookings.`);

    console.log("Creating Reviews...");
    const reviews = [];
    const completedBookings = createdBookings.filter(b => b.status === "COMPLETED");

    for (let i = 0; i < completedBookings.length; i++) {
        const b = completedBookings[i];
        if (Math.random() > 0.2) { // 80% chance of a review
            reviews.push({
                user: b.user,
                artist: b.artist,
                venue: b.venue,
                booking: b._id,
                rating: getRandomInt(3, 5),
                comment: ["Great experience!", "Absolutely fantastic", "Good, could be better", "Amazing performance", "Perfect venue for the event.", "Highly recommended!", "Loved every bit of it.", "A bit pricey but worth it."][getRandomInt(0, 7)],
                createdAt: new Date((b.completedAt ? b.completedAt.getTime() : b.eventDate.getTime()) + 86400000 * getRandomInt(1, 15))
            });
        }
    }
    
    // Add some random unattached reviews to boost review counts if needed (though schema requires booking ref usually, let's stick to attached ones)

    const createdReviews = await Review.insertMany(reviews);
    console.log(`Created ${createdReviews.length} Reviews.`);

    console.log("Creating Gallery Items...");
    const galleryItems = [
        { title: "Royal Udaipur Wedding", type: "Wedding", imageUrl: getPicsum("g1", 1000, 600), description: "A majestic destination wedding at grandeur palace." },
        { title: "Sufi Night Extravaganza", type: "Concert", imageUrl: getPicsum("g2", 1000, 600), description: "Soulful musical evening with traditional decor." },
        { title: "Corporate Gala Dinner", type: "Corporate", imageUrl: getPicsum("g3", 1000, 600), description: "Premium networking event with luxury amenities." },
        { title: "Traditional Haldi Ceremony", type: "Ceremony", imageUrl: getPicsum("g4", 1000, 600), description: "Vibrant and colorful pre-wedding celebration." },
        { title: "Luxury Beach Resort Party", type: "Party", imageUrl: getPicsum("g5", 1000, 600), description: "Exclusive sunset party by the Goa coastline." },
        { title: "Grand Sangeet Night", type: "Sangeet", imageUrl: getPicsum("g6", 1000, 600), description: "High-energy dance performances and DJ night." }
    ];
    
    for(let i=0; i<100; i++) {
        const type = getRandomItem(eventTypes);
        galleryItems.push({
            title: `${getRandomItem(cities)} ${type} Event`,
            type: type,
            imageUrl: getPicsum(`gal_${i}`, 800, 600),
            description: `Amazing ${type} experience captured in the beautiful city. Wonderful memories created.`
        });
    }

    const createdGallery = await Gallery.insertMany(galleryItems);
    console.log(`Created ${createdGallery.length} Gallery Items.`);

    console.log("-----------------------------------------");
    console.log("Database Seeded Successfully with Large Demo Data!");
    console.log("Sample Login Credentials:");
    console.log("Admin: admin@example.com / password123");
    console.log("Artist: arijit@example.com / password123");
    console.log("Venue: taj@example.com / password123");
    console.log("User: john@example.com / password123");
    console.log(`Total records -> Users: ${createdUsers.length}, Artists: ${createdArtists.length}, Venues: ${createdVenues.length}, Bookings: ${createdBookings.length}, Reviews: ${createdReviews.length}, Gallery: ${createdGallery.length}`);
    console.log("-----------------------------------------");

    mongoose.connection.close();
};

seedData();
