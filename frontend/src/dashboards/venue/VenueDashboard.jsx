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
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
  });
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    loadVenue();
    loadBookings();
  }, []);

  const loadVenue = () => {
    API.get("/venues/profile")
      .then((res) => {
        setVenue(res.data);
        const v = res.data;
        setForm({
          name: v.name || "",
          venueType: v.venueType || "Wedding Hall",
          city: v.city || "",
          phone: v.phone || "",
          capacity: v.capacity || "",
          pricePerDay: v.pricePerDay || "",
          description: v.description || "",
          images: v.images && v.images.length > 0 ? v.images[0] : "",
          bankDetails: v.bankDetails || { accountHolderName: "", accountNumber: "", bankName: "", ifscCode: "" }
        });
      })
      .catch(() => {
        setVenue(null);
      });
  };

  const handleUpdateVenue = async () => {
    try {
      const imageArray = form.images.includes(",")
        ? form.images.split(",")
        : [form.images];

      await API.put("/venues/profile", {
        ...form,
        images: imageArray
      });
      alert("Venue details updated!");
      setEditingProfile(false);
      loadVenue();
    } catch (err) {
      alert("Failed to update venue details");
    }
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

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4">Bank Details (For Payouts)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Account Holder Name"
                  placeholder="Name as per bank"
                  value={form.bankDetails.accountHolderName}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountHolderName: e.target.value } })}
                />
                <Input
                  label="Account Number"
                  placeholder="Account No."
                  value={form.bankDetails.accountNumber}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })}
                />
                <Input
                  label="Bank Name"
                  placeholder="e.g. HDFC Bank"
                  value={form.bankDetails.bankName}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })}
                />
                <Input
                  label="IFSC Code"
                  placeholder="IFSC Code"
                  value={form.bankDetails.ifscCode}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, ifscCode: e.target.value } })}
                />
              </div>
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
    <div className="space-y-8 min-h-screen bg-black text-gray-100 p-6 md:p-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Venue Dashboard</h1>
          <p className="text-gray-400">Manage your venue and bookings</p>
        </div>
        {venue.isVerified ? (
          <span className="px-4 py-2 bg-green-900/30 text-green-400 rounded-full text-sm font-semibold border border-green-800">
            ✓ Verified
          </span>
        ) : (
          <span className="px-4 py-2 bg-yellow-900/30 text-yellow-500 rounded-full text-sm font-semibold border border-yellow-800">
            ⏳ Pending Approval
          </span>
        )}
      </div>

      {!venue.isVerified && (
        <Card className="bg-blue-900/20 border-blue-900/50">
          <div className="flex gap-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h3 className="font-bold text-blue-300">Pending Review</h3>
              <p className="text-blue-200 text-sm mt-1">
                Your venue is visible to you but hidden from the public until an admin approves it.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card variant="dark">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-white">Venue Information</h2>
          <Button variant="outline" size="sm" onClick={() => setEditingProfile(!editingProfile)} className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-500 hover:bg-gray-900">
            {editingProfile ? "Cancel" : "Edit Details"}
          </Button>
        </div>

        {editingProfile ? (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Venue Name"
                variant="dark"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                <select
                  className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-amber-500"
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
              <Input
                label="City"
                variant="dark"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <Input
                label="Phone"
                variant="dark"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                label="Capacity"
                type="number"
                variant="dark"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              />
              <Input
                label="Price Per Day (₹)"
                type="number"
                variant="dark"
                value={form.pricePerDay}
                onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                rows="3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Venue Image</label>
              <ImageUpload
                existingImage={form.images}
                onUpload={(url) => setForm({ ...form, images: url })}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={handleUpdateVenue}>Save Changes</Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Name</p>
              <p className="font-bold text-white">{venue.name}</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Type</p>
              <p className="font-bold text-white">{venue.venueType}</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Location</p>
              <p className="font-bold text-white">{venue.city}</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Contact</p>
              <p className="font-bold text-white">{venue.phone || "Not Set"}</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Price</p>
              <p className="font-bold text-amber-500">₹ {venue.pricePerDay?.toLocaleString()} / day</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-xl col-span-2 border border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Description</p>
              <p className="text-gray-300 text-sm">{venue.description || "No description set."}</p>
            </div>
          </div>
        )}
      </Card>

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
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Account Holder Name"
                variant="dark"
                value={form.bankDetails.accountHolderName}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountHolderName: e.target.value } })}
              />
              <Input
                label="Account Number"
                variant="dark"
                value={form.bankDetails.accountNumber}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })}
              />
              <Input
                label="Bank Name"
                variant="dark"
                value={form.bankDetails.bankName}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })}
              />
              <Input
                label="IFSC Code"
                variant="dark"
                value={form.bankDetails.ifscCode}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, ifscCode: e.target.value } })}
              />
            </div>
            <Button onClick={handleUpdateBankDetails}>Save Bank Details</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6 text-sm">
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Account Holder</span>
              <span className="font-medium text-white">{venue.bankDetails?.accountHolderName || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Account Number</span>
              <span className="font-medium text-white">{venue.bankDetails?.accountNumber || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Bank Name</span>
              <span className="font-medium text-white">{venue.bankDetails?.bankName || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">IFSC Code</span>
              <span className="font-medium text-white">{venue.bankDetails?.ifscCode || "Not set"}</span>
            </div>
          </div>
        )}
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Venue Bookings</h2>

        {bookings.length === 0 ? (
          <Card className="text-center py-16 border-dashed border-gray-800 bg-gray-900/50">
            <p className="text-gray-400 mb-2">No booking requests yet.</p>
            <p className="text-sm text-gray-500">Your bookings will appear here</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <Card
                key={b._id}
                className="hover:shadow-lg hover:shadow-amber-900/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-900 border-gray-800 text-gray-100"
              >
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">{b.user?.name || b.user?.email || "Guest"}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    📞 {b.user?.phone || "No Phone"}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">📅 {new Date(b.eventDate).toDateString()}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500">₹ {b.amount}</span>
                  </div>
                  {b.eventLocation && (
                    <p className="text-xs text-gray-500 mt-2">📍 {b.eventLocation}</p>
                  )}
                </div>

                {b.status === "PENDING" ? (
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      className="bg-green-600 hover:bg-green-700 shadow-green-900/40 border border-green-700"
                      onClick={() => handleAction(b._id, "accept")}
                      size="sm"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleAction(b._id, "reject")}
                      size="sm"
                      className="bg-red-900/50 hover:bg-red-900 text-red-300 border border-red-800"
                    >
                      Reject
                    </Button>
                  </div>
                ) : b.status === "ACCEPTED" ? (
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider border border-green-800">
                      {b.status}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAction(b._id, "complete")}
                      className="bg-gray-800 border border-gray-700 text-gray-300 hover:text-white"
                    >
                      Mark Complete
                    </Button>
                  </div>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${b.status === "COMPLETED"
                    ? "bg-blue-900/30 text-blue-400 border-blue-800"
                    : "bg-gray-800 text-gray-400 border-gray-700"
                    }`}>
                    {b.status}
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}
