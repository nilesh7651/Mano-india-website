import { useEffect, useState } from "react";
import API from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

export default function VenueDashboard() {
  const [bookings, setBookings] = useState([]);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    venueType: "Wedding Hall",
    city: "",
    phone: "",
    capacity: "",
    pricePerDay: "",
    description: "",
    images: "",
  });

  useEffect(() => {
    loadVenue();
    loadBookings();
  }, []);

  const loadVenue = () => {
    API.get("/venues/profile")
      .then((res) => {
        setVenue(res.data);
      })
      .catch(() => {
        setVenue(null);
      });
  };

  const loadBookings = () => {
    API.get("/bookings/venue")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  const handleAction = async (id, action) => {
    try {
      await API.put(`/bookings/${id}/${action}`);
      loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking");
    }
  };

  const handleCreateVenue = async (e) => {
    e.preventDefault();
    try {
      const imageArray = form.images.includes(",")
        ? form.images.split(",").map((img) => img.trim())
        : [form.images];

      await API.post("/venues", { ...form, images: imageArray });
      loadVenue();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create venue");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  // If no venue, show create venue option
  if (!venue) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Venue Profile</h2>
          <form onSubmit={handleCreateVenue} className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Venue Name"
                placeholder="e.g. Grand Palace Hall"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Venue Type</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
                value={form.venueType}
                onChange={(e) => setForm({ ...form, venueType: e.target.value })}
              >
                <option>Wedding Hall</option>
                <option>Banquet</option>
                <option>Resort</option>
                <option>Farmhouse</option>
                <option>Party Hall</option>
              </select>
            </div>

            <div>
              <Input
                label="City"
                placeholder="e.g. Delhi"
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                label="Phone Number"
                placeholder="e.g. +91 9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                label="Capacity"
                type="number"
                placeholder="e.g. 500"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                label="Price Per Day (₹)"
                type="number"
                placeholder="e.g. 50000"
                value={form.pricePerDay}
                onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                placeholder="Describe your venue..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows="4"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Venue Images</label>
              <ImageUpload
                onUpload={(url) => setForm({ ...form, images: url })}
                existingImage={form.images}
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Create Venue Profile
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Venue Dashboard</h1>
          <p className="text-gray-600">Manage your venue and bookings</p>
        </div>
        {venue.isVerified ? (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
            ✓ Verified
          </span>
        ) : (
          <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold border border-yellow-200">
            ⏳ Pending Approval
          </span>
        )}
      </div>

      {!venue.isVerified && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h3 className="font-bold text-blue-900">Pending Review</h3>
              <p className="text-blue-800 text-sm mt-1">
                Your venue is visible to you but hidden from the public until an admin approves it.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-gray-900">Venue Information</h2>
          <Button variant="outline" size="sm">Edit Details</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Name</p>
            <p className="font-bold text-gray-900">{venue.name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Type</p>
            <p className="font-bold text-gray-900">{venue.venueType}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Location</p>
            <p className="font-bold text-gray-900">{venue.city}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Contact</p>
            <p className="font-bold text-gray-900">{venue.phone || "Not Set"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Price</p>
            <p className="font-bold text-amber-600">₹ {venue.pricePerDay?.toLocaleString()} / day</p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Venue Bookings</h2>

        {bookings.length === 0 ? (
          <Card className="text-center py-16 border-dashed">
            <p className="text-gray-500 mb-2">No booking requests yet.</p>
            <p className="text-sm text-gray-400">Your bookings will appear here</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <Card
                key={b._id}
                className="hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg mb-1">{b.user?.name || b.user?.email || "Guest"}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">📅 {new Date(b.eventDate).toDateString()}</span>
                    <span className="flex items-center gap-1 font-semibold text-gray-900">₹ {b.amount}</span>
                  </div>
                  {b.eventLocation && (
                    <p className="text-xs text-gray-500 mt-2">📍 {b.eventLocation}</p>
                  )}
                </div>

                {b.status === "PENDING" ? (
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      className="bg-green-600 hover:bg-green-700 shadow-green-600/20"
                      onClick={() => handleAction(b._id, "accept")}
                      size="sm"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleAction(b._id, "reject")}
                      size="sm"
                    >
                      Reject
                    </Button>
                  </div>
                ) : b.status === "ACCEPTED" ? (
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {b.status}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAction(b._id, "complete")}
                    >
                      Mark Complete
                    </Button>
                  </div>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${b.status === "COMPLETED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                    }`}>
                    {b.status}
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
