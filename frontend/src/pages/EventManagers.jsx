import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import SEO from "../components/SEO";
import { IMAGES } from "../lib/images";
import Button from "../components/ui/Button";
import { getUser } from "../utils/auth";
import { useToast } from "../components/ui/ToastProvider";
import PriceRequestModal from "../components/PriceRequestModal";

export default function EventManagers() {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [openSuggestion, setOpenSuggestion] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const navigate = useNavigate();
    const { notify } = useToast();

    useEffect(() => {
        API.get("/event-managers")
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setManagers(res.data);
                } else {
                    setManagers(getDemoManagers());
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setManagers(getDemoManagers());
                setLoading(false);
            });
    }, []);

    const getDemoManagers = () => [
        {
            _id: "65f000000000000000000101",
            name: "Rahul Sharma",
            companyName: "Shaadi Sutra Events",
            city: "Delhi NCR",
            pricePerEvent: 50000,
            servicesOffered: ["Wedding Planning", "Decor", "Hospitality"],
            experienceYears: 8,
            bio: "Specializing in Indian weddings, sangeet nights, and end-to-end vendor coordination.",
            portfolio: [IMAGES.hero.wedding],
            isVerified: true
        },
        {
            _id: "65f000000000000000000102",
            name: "Anita Desai",
            companyName: "Corporate Edge India",
            city: "Mumbai",
            pricePerEvent: 75000,
            servicesOffered: ["Corporate Events", "Conferences", "Product Launch"],
            experienceYears: 12,
            bio: "Corporate event planning for conferences, launches, offsites and award nights.",
            portfolio: [IMAGES.hero.corporate],
            isVerified: true
        },
        {
            _id: "65f000000000000000000103",
            name: "Vikram Singh",
            companyName: "Party Poppers",
            city: "Bengaluru",
            pricePerEvent: 25000,
            servicesOffered: ["Birthday Parties", "Anniversaries", "House Parties"],
            experienceYears: 5,
            bio: "Theme parties, birthdays and private events with seamless planning and execution.",
            portfolio: [IMAGES.hero.party],
            isVerified: true
        },
        {
            _id: "65f000000000000000000104",
            name: "Meera Joshi",
            companyName: "Utsav Creators",
            city: "Jaipur",
            pricePerEvent: 60000,
            servicesOffered: ["Destination Weddings", "Mehendi & Haldi", "Decor"],
            experienceYears: 9,
            bio: "Destination wedding planning and decor with a strong focus on Indian rituals and details.",
            portfolio: [IMAGES.planner],
            isVerified: true
        }
    ];

    const filteredManagers = managers.filter((em) => {
        const matchesSearch =
            em.name.toLowerCase().includes(search.toLowerCase()) ||
            (em.companyName && em.companyName.toLowerCase().includes(search.toLowerCase())) ||
            (em.servicesOffered && em.servicesOffered.some(s => s.toLowerCase().includes(search.toLowerCase())));

        const matchesCity = cityFilter
            ? em.city.toLowerCase().includes(cityFilter.toLowerCase())
            : true;

        return matchesSearch && matchesCity;
    });

    return (
        <div className="min-h-screen bg-black text-white">
            <SEO
                title="Hire Top Event Managers | Mano India"
                description="Find and book expert event managers for weddings, corporate events, and parties in your area."
                keywords="event manager india, event planner, wedding planner, destination wedding planner, corporate event management, decor, catering, logistics, delhi ncr, mumbai, bengaluru, pune, hyderabad, jaipur"
                image={IMAGES.planner}
                canonicalUrl="https://manoindia.in/event-managers"
            />

            {/* Hero Section */}
            <div className="relative py-20 px-6 text-center border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80 z-0"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                        Master Planners for Your Perfect Event
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        From intimate gatherings to grand weddings, hire the best event managers to bring your vision to life.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search by Name, Company, or Service..."
                            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all backdrop-blur-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Filter by City..."
                            className="w-full md:w-48 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all backdrop-blur-sm"
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Listing Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-96 bg-gray-900/50 rounded-2xl animate-pulse border border-white/5"></div>
                        ))}
                    </div>
                ) : filteredManagers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredManagers.map((em) => (
                            <Link
                                to={`/event-managers/${em._id}`}
                                key={em._id}
                                className="group relative bg-gray-900/40 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/20"
                            >
                                {/* Image / Portfolio Cover */}
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-80"></div>
                                    <img
                                        src={
                                            em.portfolio && em.portfolio.length > 0
                                                ? em.portfolio[0]
                                                : IMAGES.planner
                                        }
                                        alt={`${em.companyName || em.name} - Event Manager in ${em.city}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-semibold text-amber-400">
                                        Starting ₹{em.pricePerEvent.toLocaleString()}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-20 -mt-10">
                                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-lg">
                                        <h2 className="text-xl font-bold text-white mb-1 truncate">
                                            {em.companyName || em.name}
                                        </h2>
                                        <p className="text-amber-500 text-sm font-medium mb-3">
                                            {em.servicesOffered?.[0] || "Event Expert"}
                                            {em.servicesOffered?.length > 1 && ` +${em.servicesOffered.length - 1} more`}
                                        </p>

                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {em.city}
                                        </div>

                                        <div className="pt-3 border-t border-white/10">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500 font-medium">
                                                    {em.experienceYears > 0 ? `${em.experienceYears} Years Exp.` : 'Fresh Talent'}
                                                </span>
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                <Button
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(`/event-managers/${em._id}`);
                                                    }}
                                                    className="w-full"
                                                >
                                                    Book Now
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="w-full"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const user = getUser();
                                                        if (!user) {
                                                            notify({ type: "warning", title: "Login required", message: "Please login to ask for a suggestion." });
                                                            return;
                                                        }
                                                        if (user.role !== "user") {
                                                            notify({ type: "warning", title: "User account required", message: "Only registered users can send requests." });
                                                            return;
                                                        }
                                                        setSelectedProvider({
                                                            role: "event_manager",
                                                            id: em._id,
                                                            name: em.companyName || em.name,
                                                            currentAmount: em.pricePerEvent,
                                                        });
                                                        setOpenSuggestion(true);
                                                    }}
                                                >
                                                    Ask Suggestion
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 rounded-full bg-gray-900/50 mb-4 border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Event Managers Found</h3>
                        <p className="text-gray-400">Try adjusting your search filters or check back later.</p>
                    </div>
                )}
            </div>

            {openSuggestion && selectedProvider && (
                <PriceRequestModal
                    provider={selectedProvider}
                    onClose={() => {
                        setOpenSuggestion(false);
                        setSelectedProvider(null);
                    }}
                    onSubmitted={() => {
                        setOpenSuggestion(false);
                        setSelectedProvider(null);
                    }}
                />
            )}
        </div>
    );
}
