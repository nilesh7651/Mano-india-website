import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => {
        console.error("Failed to load stats:", err);
        setStats({
          pendingArtists: 0,
          pendingVenues: 0,
          totalArtists: 0,
          totalVenues: 0,
          totalBookings: 0,
          totalRevenue: 0,
          totalCommission: 0,
          pendingPayouts: 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-black min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Overview of platform statistics and management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          label="Total Artists"
          value={stats?.totalArtists || 0}
          link="/admin/artists"
          color="amber"
          icon="🎤"
        />
        <StatCard
          label="Total Venues"
          value={stats?.totalVenues || 0}
          link="/admin/venues"
          color="amber"
          icon="🏰"
        />
        <StatCard
          label="Pending Artists"
          value={stats?.pendingArtists || 0}
          link="/admin/artists"
          color="red"
          icon="⏳"
        />
        <StatCard
          label="Pending Venues"
          value={stats?.pendingVenues || 0}
          link="/admin/venues"
          color="red"
          icon="⏳"
        />
      </div>

      {/* Financial Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          label="Total Revenue"
          value={`₹ ${(stats?.totalRevenue || 0).toLocaleString()}`}
          color="green"
          icon="💰"
        />
        <StatCard
          label="Platform Commission"
          value={`₹ ${(stats?.totalCommission || 0).toLocaleString()}`}
          color="amber"
          icon="✨"
        />
        <StatCard
          label="Pending Payouts"
          value={`₹ ${(stats?.pendingPayouts || 0).toLocaleString()}`}
          link="/admin/bookings"
          color="blue"
          icon="💸"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/artists"
            className="px-6 py-3 bg-gray-900 border border-amber-500/30 text-amber-500 rounded-lg hover:bg-amber-900/20 transition font-medium shadow-sm hover:shadow-amber-900/20"
          >
            Review Artists
          </Link>
          <Link
            to="/admin/venues"
            className="px-6 py-3 bg-gray-900 border border-amber-500/30 text-amber-500 rounded-lg hover:bg-amber-900/20 transition font-medium shadow-sm hover:shadow-amber-900/20"
          >
            Review Venues
          </Link>
          <Link
            to="/admin/bookings"
            className="px-6 py-3 bg-gray-900 border border-amber-500/30 text-amber-500 rounded-lg hover:bg-amber-900/20 transition font-medium shadow-sm hover:shadow-amber-900/20"
          >
            Manage Payouts
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, link, color = "gray", icon }) {
  const colorClasses = {
    yellow: "border-yellow-500/50 text-yellow-500",
    blue: "border-blue-500/50 text-blue-400",
    green: "border-green-500/50 text-green-400",
    purple: "border-purple-500/50 text-purple-400",
    orange: "border-orange-500/50 text-orange-400",
    red: "border-red-500/50 text-red-500",
    amber: "border-amber-500/50 text-amber-500",
    gray: "border-gray-700 text-gray-400",
  };

  const content = (
    <div className={`bg-gray-900 rounded-xl shadow-lg p-6 border ${colorClasses[color]} hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300 relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl grayscale-0">
        {icon}
      </div>
      <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{label}</p>
      <h2 className="text-3xl font-bold text-white group-hover:text-amber-500 transition-colors">{value}</h2>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}
