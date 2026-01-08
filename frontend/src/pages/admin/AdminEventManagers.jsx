import { useEffect, useState } from "react";
import API from "../../services/api";
import { useToast } from "../../components/ui/ToastProvider";

export default function AdminEventManagers() {
    const { notify } = useToast();
    const [managers, setManagers] = useState([]);
    const [allManagers, setAllManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("pending"); // "pending" or "all"

    useEffect(() => {
        loadManagers();
        loadAllManagers();
    }, []);

    const loadManagers = () => {
        API.get("/admin/event-managers/pending")
            .then(res => setManagers(res.data))
            .catch(err => {
                console.error("Failed to load pending managers:", err);
                setManagers([]);
            })
            .finally(() => setLoading(false));
    };

    const loadAllManagers = () => {
        API.get("/admin/event-managers")
            .then(res => setAllManagers(res.data))
            .catch(err => {
                console.error("Failed to load all managers:", err);
                setAllManagers([]);
            });
    };

    const refreshData = () => {
        loadManagers();
        loadAllManagers();
    };

    const approveManager = async (id) => {
        try {
            await API.put(`/admin/event-managers/${id}/approve`);
            refreshData();
            notify({ type: "success", title: "Approved", message: "Event Manager approved successfully." });
        } catch (err) {
            notify({
                type: "error",
                title: "Approve failed",
                message: err.response?.data?.message || "Failed to approve manager.",
            });
        }
    };

    const rejectManager = async (id) => {
        if (!confirm("Are you sure you want to reject this event manager?")) return;

        try {
            await API.delete(`/admin/event-managers/${id}/reject`);
            refreshData();
            notify({ type: "success", title: "Removed", message: "Event Manager rejected and removed." });
        } catch (err) {
            notify({
                type: "error",
                title: "Reject failed",
                message: err.response?.data?.message || "Failed to reject manager.",
            });
        }
    };

    if (loading) return <p className="text-gray-500">Loading event managers...</p>;

    const displayManagers = viewMode === "pending" ? managers : allManagers;

    return (
        <div className="space-y-6 bg-black min-h-screen p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-white mb-2">Event Manager Management</h1>
                    <p className="text-gray-400 text-sm">Approve and manage event manager profiles</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode("pending")}
                        className={`px-4 py-2 rounded-lg transition border ${viewMode === "pending"
                            ? "bg-amber-600 text-black border-amber-600 font-bold"
                            : "bg-gray-900 text-gray-400 border-gray-700 hover:border-amber-500 hover:text-amber-500"
                            }`}
                    >
                        Pending ({managers.length})
                    </button>
                    <button
                        onClick={() => setViewMode("all")}
                        className={`px-4 py-2 rounded-lg transition border ${viewMode === "all"
                            ? "bg-amber-600 text-black border-amber-600 font-bold"
                            : "bg-gray-900 text-gray-400 border-gray-700 hover:border-amber-500 hover:text-amber-500"
                            }`}
                    >
                        All Managers ({allManagers.length})
                    </button>
                </div>
            </div>

            {viewMode === "pending" && managers.length === 0 && (
                <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
                    <p className="text-gray-500">No pending event manager approvals.</p>
                </div>
            )}

            {viewMode === "all" && allManagers.length === 0 && (
                <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
                    <p className="text-gray-500">No event managers registered yet.</p>
                </div>
            )}

            {displayManagers.length > 0 && (
                <div className="grid gap-6">
                    {displayManagers.map(manager => (
                        <div
                            key={manager._id}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:border-amber-500/50 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {manager.companyName || manager.name}
                                    </h3>
                                    <p className="text-gray-400 mt-1">
                                        {manager.city} • {manager.experienceYears} Years Exp.
                                    </p>
                                    <p className="text-amber-500 text-sm mt-1 font-mono">
                                        📞 {manager.phone}
                                    </p>
                                    {manager.servicesOffered?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {manager.servicesOffered.map(s => (
                                                <span key={s} className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {manager.user && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Owner: {manager.user.name} ({manager.user.email})
                                        </p>
                                    )}
                                    {manager.bio && (
                                        <p className="text-gray-300 mt-2 line-clamp-2">{manager.bio}</p>
                                    )}
                                    <p className="text-lg font-semibold mt-3 text-amber-500">
                                        ₹ {manager.pricePerEvent?.toLocaleString()} / event
                                    </p>
                                    <div className="mt-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${manager.isVerified
                                            ? "bg-green-900/30 text-green-400 border border-green-800"
                                            : "bg-yellow-900/30 text-yellow-500 border border-yellow-800"
                                            }`}>
                                            {manager.isVerified ? "✓ Verified" : "⏳ Pending"}
                                        </span>
                                    </div>
                                </div>

                                {!manager.isVerified && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => approveManager(manager._id)}
                                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-medium text-sm shadow-lg shadow-green-900/20"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => rejectManager(manager._id)}
                                            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition font-medium text-sm shadow-lg shadow-red-900/20"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}

                                {manager.isVerified && (
                                    <div className="flex items-center gap-3">
                                        <span className="px-4 py-2 bg-green-900/20 border border-green-800 rounded-lg text-green-500 font-semibold text-sm">
                                            ✓ Approved
                                        </span>
                                        <button
                                            onClick={() => rejectManager(manager._id)}
                                            className="px-4 py-2 bg-red-900/20 text-red-500 border border-red-800 rounded-lg hover:bg-red-900/40 transition font-medium text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
