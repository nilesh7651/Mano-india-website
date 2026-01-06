import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Button from "../components/ui/Button";
import SEO from "../components/SEO";
import BookingModal from "../components/BookingModal";
import Reviews from "../components/Reviews";

export default function EventManagerDetails() {
    const { id } = useParams();
    const [manager, setManager] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);

    useEffect(() => {
        API.get(`/event-managers/${id}`)
            .then((res) => {
                setManager(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });

        // Fetch reviews
        API.get(`/reviews?eventManagerId=${id}`)
            .then(res => setReviews(res.data))
            .catch(() => setReviews([]));

    }, [id]);

    if (loading) return <div className="text-center py-20 text-white">Loading profile...</div>;
    if (!manager) return <div className="text-center py-20 text-white">Event Manager not found</div>;

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <SEO
                title={`${manager.companyName || manager.name} | Event Manager in ${manager.city}`}
                description={`Hire ${manager.companyName || manager.name} for your next event in ${manager.city}. Expert event planning and management services.`}
            />

            {/* Hero / Cover Image */}
            <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10"></div>
                <img
                    src={
                        manager.portfolio && manager.portfolio.length > 0
                            ? manager.portfolio[0]
                            : "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80"
                    }
                    alt={manager.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {manager.servicesOffered?.map(s => (
                                <span key={s} className="px-3 py-1 bg-amber-600/90 text-white rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                    {s}
                                </span>
                            ))}
                            <span className="px-3 py-1 bg-gray-800/80 text-gray-300 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                                {manager.city}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
                            {manager.companyName || manager.name}
                            {manager.isVerified && (
                                <span className="ml-3 inline-block align-middle">
                                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            )}
                        </h1>
                        <p className="text-xl text-gray-300 font-light">
                            Experience: {manager.experienceYears} Years
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="text-3xl font-bold text-amber-500">
                            ₹{manager.pricePerEvent.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">Starting Price Per Event</div>
                        <Button
                            onClick={() => setOpenBooking(true)}
                            className="mt-2 bg-white text-black hover:bg-gray-200 font-bold px-8 py-3 text-lg rounded-full"
                        >
                            Contact to Book
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left Column: About & Portfolio */}
                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                            About
                        </h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 leading-relaxed text-gray-300 text-lg">
                            {manager.bio || "No bio available."}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                            Portfolio
                        </h2>
                        {manager.portfolio && manager.portfolio.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {manager.portfolio.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Portfolio ${idx}`}
                                        className="rounded-xl w-full h-64 object-cover hover:opacity-90 transition-opacity cursor-pointer border border-white/10"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No portfolio images uploaded.</p>
                        )}
                    </section>
                </div>

                {/* Right Column: Contact & Info */}
                <div className="space-y-8">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
                            Book Event Manager
                        </h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                                    📍
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 uppercase font-bold">Location</div>
                                    <div className="text-white">{manager.city}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                                    📞
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 uppercase font-bold">Phone</div>
                                    <div className="text-white font-mono">{manager.phone}</div>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => setOpenBooking(true)}
                            className="w-full shadow-lg shadow-amber-900/40"
                            size="lg"
                        >
                            Request Booking
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-10">
                <Reviews reviews={reviews} />
            </div>

            {openBooking && (
                <BookingModal
                    eventManagerId={manager._id}
                    onClose={() => setOpenBooking(false)}
                    onSuccess={() => {
                        alert("Booking request sent successfully to the Event Manager!");
                        setOpenBooking(false);
                    }}
                />
            )}
        </div>
    );
}
