const Artist = require("../models/Artist");
const Venue = require("../models/Venue");
const Booking = require("../models/Booking");

// 1. Get Trending Items
exports.getTrending = async (req, res) => {
  try {
    const topArtists = await Artist.find({ isVerified: true })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(10)
      .select("name category city pricePerEvent images rating reviewCount");

    const topVenues = await Venue.find({ isVerified: true })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(10)
      .select("name venueType city pricePerDay images rating reviewCount");

    res.json({ artists: topArtists, venues: topVenues });
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending items", error: error.message });
  }
};

// 2. Get Similar Items (Content-Based)
exports.getSimilarItems = async (req, res) => {
  try {
    const { type, id } = req.params; // type: 'artist' | 'venue'
    let similar = [];

    if (type === "artist") {
      const artist = await Artist.findById(id);
      if (!artist) return res.status(404).json({ message: "Artist not found" });

      const priceMargin = artist.pricePerEvent * 0.5; // +/- 50%
      similar = await Artist.find({
        _id: { $ne: artist._id },
        category: artist.category,
        isVerified: true,
        pricePerEvent: { 
          $gte: artist.pricePerEvent - priceMargin, 
          $lte: artist.pricePerEvent + priceMargin 
        }
      }).limit(5).select("name category city pricePerEvent images rating reviewCount");

      // Fallback if not enough similar by category and price: just same category
      if (similar.length < 3) {
        const extra = await Artist.find({
          _id: { $ne: artist._id, $nin: similar.map(s => s._id) },
          category: artist.category,
          isVerified: true
        }).limit(5 - similar.length).select("name category city pricePerEvent images rating reviewCount");
        similar = [...similar, ...extra];
      }
    } else if (type === "venue") {
      const venue = await Venue.findById(id);
      if (!venue) return res.status(404).json({ message: "Venue not found" });

      similar = await Venue.find({
        _id: { $ne: venue._id },
        city: venue.city,
        isVerified: true
      }).limit(5).select("name venueType city pricePerDay images rating reviewCount");
    }

    res.json(similar);
  } catch (error) {
    res.status(500).json({ message: "Error fetching similar items", error: error.message });
  }
};

// 3. Customers who booked this also booked... (Collaborative)
exports.getAlsoBooked = async (req, res) => {
  try {
    const { type, id } = req.params;
    
    // Find users who booked this item
    const filter = type === "artist" ? { artist: id } : { venue: id };
    const initialBookings = await Booking.find(filter).select("user");
    const userIds = initialBookings.map(b => b.user);

    if (userIds.length === 0) return res.json({ artists: [], venues: [] });

    // Find other bookings by these users
    const otherBookings = await Booking.find({
      user: { $in: userIds },
      ...(type === "artist" ? { artist: { $ne: id } } : { venue: { $ne: id } })
    }).select("artist venue");

    const artistIds = [...new Set(otherBookings.map(b => b.artist?.toString()).filter(Boolean))];
    const venueIds = [...new Set(otherBookings.map(b => b.venue?.toString()).filter(Boolean))];

    // Remove the current item just in case
    if (type === "artist") {
      const index = artistIds.indexOf(id);
      if (index > -1) artistIds.splice(index, 1);
    } else {
      const index = venueIds.indexOf(id);
      if (index > -1) venueIds.splice(index, 1);
    }

    const recommendedArtists = await Artist.find({ _id: { $in: artistIds }, isVerified: true })
      .limit(5).select("name category city pricePerEvent images rating reviewCount");
    
    const recommendedVenues = await Venue.find({ _id: { $in: venueIds }, isVerified: true })
      .limit(5).select("name venueType city pricePerDay images rating reviewCount");

    res.json({ artists: recommendedArtists, venues: recommendedVenues });
  } catch (error) {
    res.status(500).json({ message: "Error fetching collaborative recommendations", error: error.message });
  }
};

// 4. Personalized Recommendations (Based on Profile/History)
exports.getPersonalized = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's past bookings
    const userBookings = await Booking.find({ user: userId })
      .populate("artist", "category city")
      .populate("venue", "city venueType");

    if (userBookings.length === 0) {
      // Fallback to trending if no history
      return exports.getTrending(req, res);
    }

    // Analyze history to find most common city and category
    const cityCount = {};
    const categoryCount = {};

    userBookings.forEach(b => {
      const city = b.artist?.city || b.venue?.city;
      if (city) cityCount[city] = (cityCount[city] || 0) + 1;
      
      if (b.artist?.category) {
        categoryCount[b.artist.category] = (categoryCount[b.artist.category] || 0) + 1;
      }
    });

    const topCity = Object.keys(cityCount).sort((a, b) => cityCount[b] - cityCount[a])[0];
    const topCategory = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a])[0];

    // Fetch recommendations based on topCity and topCategory
    let recommendedArtists = [];
    let recommendedVenues = [];

    if (topCategory || topCity) {
      let query = { isVerified: true };
      if (topCategory) query.category = topCategory;
      if (topCity) query.city = topCity;

      recommendedArtists = await Artist.find(query)
        .limit(5)
        .select("name category city pricePerEvent images rating reviewCount");
    }

    if (topCity) {
      recommendedVenues = await Venue.find({ city: topCity, isVerified: true })
        .limit(5)
        .select("name venueType city pricePerDay images rating reviewCount");
    }

    res.json({ 
      artists: recommendedArtists, 
      venues: recommendedVenues,
      basedOn: { city: topCity, category: topCategory }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching personalized recommendations", error: error.message });
  }
};
