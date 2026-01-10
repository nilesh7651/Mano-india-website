import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Button from "../components/ui/Button";
import SEO from "../components/SEO";
import BookingModal from "../components/BookingModal";
import Reviews from "../components/Reviews";
import { getUser } from "../utils/auth";
import { useToast } from "../components/ui/ToastProvider";
import { IMAGES } from "../lib/images";
import PriceRequestModal from "../components/PriceRequestModal";

export default function EventManagerDetails() {
    const { id } = useParams();
    const { notify } = useToast();
    const [manager, setManager] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);
    const [openSuggestion, setOpenSuggestion] = useState(false);

    useEffect(() => {
        API.get(`/event-managers/${id}`)
            .then((res) => {
                setManager(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                // Demo fallback (important for investor demo)
                setManager({
                    _id: id,
                    name: "Meera Joshi",
                    companyName: "Utsav Creators",
                    city: "Jaipur",
                    pricePerEvent: 60000,
                    servicesOffered: ["Destination Weddings", "Mehendi & Haldi", "Decor"],
                    experienceYears: 9,
                    bio: "Destination wedding planning and decor with a strong focus on Indian rituals and details.",
                    portfolio: [IMAGES.planner],
                    isVerified: true,
                });
                setLoading(false);
            });

        // Fetch reviews
        API.get(`/reviews?eventManagerId=${id}`)
            .then(res => setReviews(res.data))
            .catch(() => setReviews([]));

    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-amber-500 animate-pulse text-lg font-medium">Loading profile...</p>
            </div>
        );
    }

    if (!manager) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-white text-lg">Event Manager not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <SEO
                title={`${manager.companyName || manager.name} | Event Manager in ${manager.city}`}
                description={`Hire ${manager.companyName || manager.name} for your next event in ${manager.city}. Expert event planning and management services.`}
                keywords={`event manager ${manager.city}, event planner ${manager.city}, wedding planner ${manager.city}, corporate event management ${manager.city}, mano india event managers`}
                image={manager.portfolio?.[0]}
                canonicalUrl={`https://manoindia.in/event-managers/${manager._id}`}
            />

            {/* Top Section: Image & Details */}
            <div className="grid md:grid-cols-2 gap-10">

                {/* Left: Image / Portfolio Cover */}
                <div className="h-96 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center text-gray-500 shadow-2xl border border-gray-800 relative overflow-hidden group">
                    {manager.portfolio && manager.portfolio.length > 0 ? (
                        <img
                            src={manager.portfolio[0]}
                            alt={`${manager.companyName || manager.name} - Event Manager in ${manager.city}`}
                            className="w-full h-full object-cover"
                            decoding="async"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = IMAGES.planner;
                            }}
                        />
                    ) : (
                        <span className="text-lg font-medium">No Image Available</span>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Right: Info */}
                <div className="space-y-8 flex flex-col justify-center">
                    <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                                {manager.servicesOffered?.[0] || "Event Manager"}
                            </span>
                            {manager.isVerified && (
                                <span className="text-blue-500 flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    Verified
                                </span>
                            )}
                            <span className="text-gray-500 text-sm">• {manager.city}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                            {manager.companyName || manager.name}
                        </h1>
                        <p className="text-gray-400 font-light">
                            {manager.experienceYears} Years Experience
                        </p>
                    </div>

                    {manager.bio && (
                        <div>
                            <h2 className="font-semibold text-gray-300 mb-2 uppercase tracking-wide text-sm">About</h2>
                            <p className="text-gray-400 leading-relaxed text-lg line-clamp-4 hover:line-clamp-none transition-all duration-300">
                                {manager.bio}
                            </p>
                        </div>
                    )}

                    {/* Locations Served - Quick View */}
                    {manager.locationsServed && manager.locationsServed.length > 0 && (
                        <div>
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-2">Serving Locations</span>
                            <div className="flex flex-wrap gap-2">
                                {manager.locationsServed.map(loc => (
                                    <span key={loc} className="px-2 py-1 bg-gray-800 border border-gray-700 text-gray-400 rounded text-xs">
                                        {loc}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price & Action Card */}
                    <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Base Price</p>
                                <div className="text-3xl font-bold text-amber-500">
                                    ₹ {manager.pricePerEvent?.toLocaleString()} <span className="text-sm text-gray-500 font-normal">/ event</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={() => {
                                        const user = getUser();
                                        if (!user) {
                                            notify({ type: "warning", title: "Login required", message: "Please login to book an event manager." });
                                            return;
                                        }
                                        if (user.role !== "user") {
                                            notify({ type: "warning", title: "User account required", message: "Only registered users can make bookings." });
                                            return;
                                        }
                                        setOpenBooking(true);
                                    }}
                                    size="lg"
                                    className="shadow-amber-900/40 transform hover:-translate-y-1"
                                >
                                    Pay and Book
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-white hover:bg-transparent"
                                    onClick={() => {
                                        const user = getUser();
                                        if (!user) {
                                            notify({ type: "warning", title: "Login required", message: "Please login to ask for a suggestion." });
                                            return;
                                        }
                                        if (user.role !== "user") {
                                            notify({ type: "warning", title: "User account required", message: "Only registered users can send requests." });
                                            return;
                                        }
                                        setOpenSuggestion(true);
                                    }}
                                >
                                    Ask Suggestion
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packages Section */}
            {manager.packages && manager.packages.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                        Packages
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {manager.packages.map((pkg, idx) => (
                            <div key={idx} className="bg-gray-900/50 border border-white/5 p-6 rounded-2xl hover:border-amber-500/30 hover:bg-gray-900 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{pkg.name}</h3>
                                    <span className="text-amber-500 font-bold text-lg">₹{pkg.price?.toLocaleString()}</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20 overflow-y-auto custom-scrollbar">
                                    {pkg.description}
                                </p>
                                <Button
                                    onClick={() => {
                                        const user = getUser();
                                        if (!user || user.role !== "user") {
                                            notify({ type: "warning", title: "User account required", message: "Please login as a user to book." });
                                            return;
                                        }
                                        setOpenBooking(true);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-gray-700 text-gray-300 hover:border-amber-500 hover:text-white"
                                >
                                    Select Package
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Portfolio Section */}
            {manager.portfolio && manager.portfolio.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                        Portfolio
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {manager.portfolio.map((img, idx) => (
                            <div key={idx} className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border border-white/10 group bg-gray-900">
                                <img
                                    src={img}
                                    alt={`${manager.companyName || manager.name} portfolio ${idx + 1}`}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="border-t border-gray-800 pt-10">
                <Reviews reviews={reviews} />
            </div>

            {openBooking && (
                <BookingModal
                    eventManagerId={manager._id}
                    onClose={() => setOpenBooking(false)}
                    onSuccess={() => {
                        notify({ type: "success", title: "Request sent", message: "Booking request sent successfully." });
                        setOpenBooking(false);
                    }}
                />
            )}

            {openSuggestion && (
                <PriceRequestModal
                    provider={{
                        role: "event_manager",
                        id: manager._id,
                        name: manager.companyName || manager.name,
                        currentAmount: manager.pricePerEvent,
                    }}
                    onClose={() => setOpenSuggestion(false)}
                    onSubmitted={() => setOpenSuggestion(false)}
                />
            )}
        </div>
    );
}
