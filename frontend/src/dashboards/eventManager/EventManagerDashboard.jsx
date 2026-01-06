import { useEffect, useState } from "react";
import API from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

export default function EventManagerDashboard() {
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]); // Placeholder for future implementation
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        companyName: "",
        city: "",
        phone: "",
        experienceYears: "",
        pricePerEvent: "",
        servicesOffered: "", // Comma separated
        bio: "",
        portfolio: "", // Comma separated or single for now
        bankDetails: {
            accountHolderName: "",
            accountNumber: "",
            bankName: "",
            ifscCode: "",
        },
    });
    const [editingBank, setEditingBank] = useState(false);
    const [editingProfile, setEditingProfile] = useState(false);

    const loadData = async () => {
        try {
            const profileRes = await API.get("/event-managers/profile/me");
            setProfile(profileRes.data);
            if (profileRes.data) {
                const bookingsRes = await API.get("/bookings/event-manager");
                setBookings(bookingsRes.data);

                const p = profileRes.data;
                setForm({
                    name: p.name || "",
                    companyName: p.companyName || "",
                    city: p.city || "",
                    phone: p.phone || "",
                    experienceYears: p.experienceYears || "",
                    pricePerEvent: p.pricePerEvent || "",
                    servicesOffered: p.servicesOffered ? p.servicesOffered.join(", ") : "",
                    bio: p.bio || "",
                    portfolio: p.portfolio && p.portfolio.length > 0 ? p.portfolio.join(", ") : "",
                    bankDetails: p.bankDetails || { accountHolderName: "", accountNumber: "", bankName: "", ifscCode: "" }
                });
            }
        } catch (err) {
            if (err.response?.status === 404) {
                setProfile(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAcceptBooking = async (id) => {
        try {
            await API.put(`/bookings/${id}/accept`);
            loadData();
            alert("Booking accepted!");
        } catch (err) {
            alert("Failed to accept booking");
        }
    };

    const handleRejectBooking = async (id) => {
        if (!window.confirm("Are you sure you want to reject this booking?")) return;
        try {
            await API.put(`/bookings/${id}/reject`);
            loadData();
            alert("Booking rejected");
        } catch (err) {
            alert("Failed to reject booking");
        }
    };

    const handleCompleteBooking = async (id) => {
        if (!window.confirm("Verify that the event is completed?")) return;
        try {
            await API.put(`/bookings/${id}/complete`);
            loadData();
            alert("Booking marked as completed!");
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        try {
            const servicesArray = form.servicesOffered.split(",").map(s => s.trim()).filter(Boolean);
            const portfolioArray = form.portfolio.split(",").map(img => img.trim()).filter(Boolean);

            await API.post("/event-managers", {
                ...form,
                servicesOffered: servicesArray,
                portfolio: portfolioArray
            });
            loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to create profile");
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const servicesArray = typeof form.servicesOffered === 'string' ? form.servicesOffered.split(",").map(s => s.trim()).filter(Boolean) : form.servicesOffered;
            const portfolioArray = typeof form.portfolio === 'string' ? form.portfolio.split(",").map(img => img.trim()).filter(Boolean) : form.portfolio;

            await API.put("/event-managers/profile/me", {
                ...form,
                servicesOffered: servicesArray,
                portfolio: portfolioArray
            });
            alert("Profile updated successfully!");
            setEditingProfile(false);
            loadData();
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        }
    };

    const handleUpdateBankDetails = async () => {
        try {
            await API.put("/event-managers/profile/me", { bankDetails: form.bankDetails });
            alert("Bank details updated!");
            setEditingBank(false);
            loadData();
        } catch (err) {
            alert("Failed to update bank details");
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-500 animate-pulse">Loading...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="max-w-2xl mx-auto py-8 px-4">
                <Card variant="dark">
                    <h2 className="text-2xl font-bold mb-6 text-white">Create Event Manager Profile</h2>
                    <form onSubmit={handleCreateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                variant="dark"
                            />
                            <Input
                                label="Company Name"
                                placeholder="Ex. Elite Events"
                                value={form.companyName}
                                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                                variant="dark"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                label="City"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                required
                                variant="dark"
                            />
                            <Input
                                label="Phone"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                required
                                variant="dark"
                            />
                            <Input
                                label="Experience (Years)"
                                type="number"
                                value={form.experienceYears}
                                onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                                variant="dark"
                            />
                        </div>

                        <Input
                            label="Services Offered (Comma Separated)"
                            placeholder="Ex. Wedding Planning, Corporate Events, Birthday Parties"
                            value={form.servicesOffered}
                            onChange={(e) => setForm({ ...form, servicesOffered: e.target.value })}
                            variant="dark"
                        />

                        <Input
                            label="Base Price Per Event (₹)"
                            type="number"
                            placeholder="e.g. 25000"
                            value={form.pricePerEvent}
                            onChange={(e) => setForm({ ...form, pricePerEvent: e.target.value })}
                            required
                            variant="dark"
                        />

                        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <h3 className="font-bold text-gray-300 mb-4">Bank Details (For Payouts)</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Account Holder Name"
                                    value={form.bankDetails.accountHolderName}
                                    onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountHolderName: e.target.value } })}
                                    variant="dark"
                                />
                                <Input
                                    label="Account Number"
                                    value={form.bankDetails.accountNumber}
                                    onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })}
                                    variant="dark"
                                />
                                <Input
                                    label="Bank Name"
                                    value={form.bankDetails.bankName}
                                    onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })}
                                    variant="dark"
                                />
                                <Input
                                    label="IFSC Code"
                                    value={form.bankDetails.ifscCode}
                                    onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, ifscCode: e.target.value } })}
                                    variant="dark"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Bio</label>
                            <textarea
                                placeholder="Tell us about your event management services..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
                                value={form.bio}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                rows="4"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-400">Portfolio Image (Upload One for now)</label>
                            <ImageUpload
                                onUpload={(url) => setForm({ ...form, portfolio: url })}
                                existingImage={form.portfolio}
                            />
                            <p className="text-xs text-gray-500">More portfolio uploads coming soon.</p>
                        </div>

                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold">
                            Create Profile
                        </Button>
                    </form>
                </Card>
            </div>
        );
    }

    if (!profile.isVerified) {
        return (
            <div className="flex justify-center py-20 px-4">
                <Card className="text-center max-w-md w-full border-yellow-900/50 bg-yellow-900/10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-900/30 text-yellow-500 mb-4 text-2xl border border-yellow-800">
                        ⏳
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Profile Pending</h2>
                    <p className="text-gray-400">
                        Your Event Manager profile is currently under review by our admin team. You will be notified once approved.
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 min-h-screen bg-black text-gray-100 p-6 md:p-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Event Manager Dashboard</h1>
                    <p className="text-gray-400 mt-1">Manage your profile and services</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-semibold border border-green-800">
                        ✓ Verified
                    </span>
                    <span className="font-semibold text-white">{profile.companyName || profile.name}</span>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Your Profile Details</h2>
                    {!editingProfile && (
                        <Button variant="outline" size="sm" onClick={() => setEditingProfile(true)} className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-500 hover:bg-gray-900">
                            ✏️ Edit Profile
                        </Button>
                    )}
                </div>

                {editingProfile ? (
                    <Card variant="dark" className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-white">Edit Your Profile</h3>
                            <Button variant="ghost" size="sm" onClick={() => setEditingProfile(false)} className="text-gray-400 hover:text-white hover:bg-gray-800">Cancel</Button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} variant="dark" />
                                <Input label="Company Name" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} variant="dark" />
                                <Input label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} variant="dark" />
                                <Input label="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} variant="dark" />
                                <Input label="Price Per Event" value={form.pricePerEvent} onChange={e => setForm({ ...form, pricePerEvent: e.target.value })} variant="dark" />
                                <Input label="Experience (Years)" value={form.experienceYears} onChange={e => setForm({ ...form, experienceYears: e.target.value })} variant="dark" />
                            </div>

                            <Input label="Services (Comma Separated)" value={form.servicesOffered} onChange={e => setForm({ ...form, servicesOffered: e.target.value })} variant="dark" />

                            <textarea
                                className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                                rows="3"
                                value={form.bio}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Portfolio Image</label>
                                <ImageUpload existingImage={form.portfolio} onUpload={(url) => setForm({ ...form, portfolio: url })} />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setEditingProfile(false)} className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">Cancel</Button>
                                <Button onClick={handleUpdateProfile}>Save Changes</Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card variant="dark">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm">Company Name</p>
                                <p className="text-lg font-semibold text-white">{profile.companyName || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Full Name</p>
                                <p className="text-lg font-semibold text-white">{profile.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Services</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {profile.servicesOffered?.map(s => (
                                        <span key={s} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Base Price</p>
                                <p className="text-lg font-semibold text-amber-500">₹ {profile.pricePerEvent}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-400 text-sm">Bio</p>
                                <p className="text-gray-300 mt-1">{profile.bio}</p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            {/* Bank Details Section */}
            <Card variant="dark">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-white">Bank Details</h2>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingBank(!editingBank)}
                        className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-500 hover:bg-gray-900"
                    >
                        {editingBank ? "Cancel" : "Edit"}
                    </Button>
                </div>

                {editingBank ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Account Holder Name" variant="dark" value={form.bankDetails.accountHolderName} onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountHolderName: e.target.value } })} />
                            <Input label="Account Number" variant="dark" value={form.bankDetails.accountNumber} onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })} />
                            <Input label="Bank Name" variant="dark" value={form.bankDetails.bankName} onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })} />
                            <Input label="IFSC Code" variant="dark" value={form.bankDetails.ifscCode} onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, ifscCode: e.target.value } })} />
                        </div>
                        <Button onClick={handleUpdateBankDetails}>Save Bank Details</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div><span className="block text-gray-500 text-xs uppercase">Holder</span><span className="text-white">{profile.bankDetails?.accountHolderName || "N/A"}</span></div>
                        <div><span className="block text-gray-500 text-xs uppercase">Account No</span><span className="text-white">{profile.bankDetails?.accountNumber || "N/A"}</span></div>
                        <div><span className="block text-gray-500 text-xs uppercase">Bank</span><span className="text-white">{profile.bankDetails?.bankName || "N/A"}</span></div>
                        <div><span className="block text-gray-500 text-xs uppercase">IFSC</span><span className="text-white">{profile.bankDetails?.ifscCode || "N/A"}</span></div>
                    </div>
                )}
            </Card>

            {/* Bookings Section */}
            <h2 className="text-xl font-bold text-white mt-8 mb-4">Booking Requests</h2>
            <div className="grid gap-6">
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <Card key={booking._id} variant="dark" className="border-l-4 border-l-amber-500">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${booking.status === 'ACCEPTED' ? 'bg-green-900/40 text-green-400' :
                                                booking.status === 'PENDING' ? 'bg-yellow-900/40 text-yellow-500' :
                                                    booking.status === 'COMPLETED' ? 'bg-blue-900/40 text-blue-400' :
                                                        'bg-gray-800 text-gray-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {new Date(booking.eventDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        {booking.user.name}
                                    </h3>
                                    <div className="text-sm text-gray-400 space-y-1">
                                        <p>📍 {booking.eventLocation}</p>
                                        <p>📞 {booking.user.phone}</p>
                                        <p>📧 {booking.user.email}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="text-2xl font-bold text-amber-500">
                                        ₹{booking.amount.toLocaleString()}
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        {booking.status === 'AWAITING_PAYMENT' && (
                                            <span className="text-sm text-yellow-500 font-medium">User Payment Pending</span>
                                        )}

                                        {booking.status === 'PENDING' && (
                                            <>
                                                <Button size="sm" onClick={() => handleAcceptBooking(booking._id)} className="bg-green-600 hover:bg-green-700">Accept</Button>
                                                <Button size="sm" variant="outline" onClick={() => handleRejectBooking(booking._id)} className="border-red-500 text-red-500 hover:bg-red-900/20">Reject</Button>
                                            </>
                                        )}

                                        {booking.status === 'ACCEPTED' && !booking.artistCompleted && (
                                            <Button size="sm" onClick={() => handleCompleteBooking(booking._id)} className="bg-blue-600 hover:bg-blue-700">Mark Completed</Button>
                                        )}

                                        {booking.status === 'COMPLETED' && (
                                            <span className="text-green-500 font-bold flex items-center gap-1">✓ Completed</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-10 bg-gray-900/50 rounded-xl border border-gray-800">
                        <p className="text-gray-500">No booking requests yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
