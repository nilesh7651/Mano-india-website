import { useEffect, useState } from "react";
import API from "../services/api";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get("/users/profile");
            setUser(res.data);
            setForm({
                name: res.data.name,
                phone: res.data.phone || "",
                email: res.data.email
            });
        } catch (err) {
            console.error("Failed to load profile", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put("/users/profile", {
                name: form.name,
                phone: form.phone
            });
            setUser(res.data);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-gray-100 p-6 md:p-12">
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Profile</h1>
                    <p className="text-gray-400 mt-1">Manage your personal information</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center text-2xl font-bold text-white">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                                <p className="text-gray-400 text-sm">{user?.role === "user" ? "Client Account" : "Partner Account"}</p>
                            </div>
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-amber-500 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Phone Number</label>
                                    <input
                                        type="text"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all"
                                        placeholder="+91 XXXXX XXXXX"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        disabled
                                        className="w-full bg-gray-800/50 border border-gray-800 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500">Email cannot be changed.</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/20"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email</p>
                                <p className="text-gray-300 font-medium">{user?.email}</p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Phone</p>
                                <p className="text-gray-300 font-medium">{user?.phone || <span className="text-red-400 italic">Not set</span>}</p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Account Created</p>
                                <p className="text-gray-300 font-medium">{new Date(user?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
