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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of platform statistics and management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          label="Total Artists"
          value={stats?.totalArtists || 0}
          link="/admin/artists"
          color="blue"
        />
        <StatCard
          label="Total Venues"
          value={stats?.totalVenues || 0}
          link="/admin/venues"
          color="green"
        />
        <StatCard
          label="Pending Artists"
          value={stats?.pendingArtists || 0}
          link="/admin/artists"
          color="yellow"
        />
        <StatCard
          label="Pending Venues"
          value={stats?.pendingVenues || 0}
          link="/admin/venues"
          color="yellow"
        />
      </div>

      {/* Financial Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          label="Total Revenue"
          value={`₹ ${(stats?.totalRevenue || 0).toLocaleString()}`}
          color="green"
        />
        <StatCard
          label="Platform Commission"
          value={`₹ ${(stats?.totalCommission || 0).toLocaleString()}`}
          color="purple"
        />
        <StatCard
          label="Pending Payouts"
          value={`₹ ${(stats?.pendingPayouts || 0).toLocaleString()}`}
          link="/admin/bookings"
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/artists"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Review Artists
          </Link>
          <Link
            to="/admin/venues"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
          >
            Review Venues
          </Link>
          <Link
            to="/admin/bookings"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium shadow-sm"
          >
            Manage Payouts
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, link, color = "gray" }) {
  const colorClasses = {
    yellow: "bg-yellow-50 border-yellow-200",
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    orange: "bg-orange-50 border-orange-200",
    gray: "bg-gray-50 border-gray-200",
  };

  const content = (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-2 ${colorClasses[color]} hover:shadow-md transition-shadow duration-200`}>
      <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}
