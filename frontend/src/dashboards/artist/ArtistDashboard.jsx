import { useEffect, useState } from "react";
import API from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

export default function ArtistDashboard() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    category: "",
    city: "",
    phone: "",
    pricePerEvent: "",
    bio: "",
    bio: "",
    images: "",
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
  });
  const [editingBank, setEditingBank] = useState(false);

  const loadData = async () => {
    try {
      const profileRes = await API.get("/artists/profile");
      setProfile(profileRes.data);
      if (profileRes.data) {
        const bookingsRes = await API.get("/bookings/artist");
        setBookings(bookingsRes.data);
        // Pre-fill form for editing (if needed later)
        if (profileRes.data.bankDetails) {
          setForm(prev => ({ ...prev, bankDetails: profileRes.data.bankDetails }));
        }
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

  const handleAction = async (id, action) => {
    await API.put(`/bookings/${id}/${action}`);
    loadData();
  };

  const handleUpdateBankDetails = async () => {
    try {
      await API.put("/artists/profile", { bankDetails: form.bankDetails });
      alert("Bank details updated!");
      setEditingBank(false);
      loadData();
    } catch (err) {
      alert("Failed to update bank details");
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const imageArray = form.images.includes(",")
        ? form.images.split(",").map((img) => img.trim())
        : [form.images];

      await API.post("/artists", { ...form, images: imageArray });
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create profile");
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
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Artist Profile</h2>
          <form onSubmit={handleCreateProfile} className="space-y-6">
            <Input
              label="Stage Name"
              placeholder="e.g. DJ Snake"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Category"
              placeholder="e.g. DJ, Singer, Magician"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4">Bank Details (For Payouts)</h3>
              <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-2 gap-4">
              <Input
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                placeholder="e.g. +91 9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <Input
                label="Price per Event (₹)"
                type="number"
                placeholder="e.g. 15000"
                value={form.pricePerEvent}
                onChange={(e) => setForm({ ...form, pricePerEvent: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
              <textarea
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows="4"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <ImageUpload
                onUpload={(url) => setForm({ ...form, images: url })}
                existingImage={form.images}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Profile
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  if (!profile.isVerified) {
    return (
      <div className="flex justify-center py-20">
        <Card className="text-center max-w-md w-full border-yellow-200 bg-yellow-50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4 text-2xl">
            ⏳
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Pending</h2>
          <p className="text-gray-600">
            Your artist profile is currently under review by our admin team. You will be notified once approved.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl">Artist Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your bookings and profile</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
            ✓ Verified
          </span>
          <span className="font-semibold text-gray-900">{profile.name}</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Incoming Bookings</h2>
        {bookings.length === 0 ? (
          <Card className="text-center py-16 border-dashed">
            <p className="text-gray-500 mb-2 text-lg">No booking requests yet.</p>
            <p className="text-gray-400">Your profile is visible to users. Stay tuned!</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <Card
                key={b._id}
                className="hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg mb-1">{b.user?.name || "Guest User"}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    📞 {b.user?.phone || "No Phone"}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">📅 {new Date(b.eventDate).toDateString()}</span>
                    <span className="flex items-center gap-1 font-semibold text-gray-900">₹ {b.amount}</span>
                  </div>
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
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${b.status === "ACCEPTED"
                      ? "bg-green-100 text-green-800"
                      : b.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {b.status}
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bank Details Section for Existing Users */}
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Bank Details</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingBank(!editingBank)}
          >
            {editingBank ? "Cancel" : "Edit"}
          </Button>
        </div>

        {editingBank ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Account Holder Name"
                value={form.bankDetails.accountHolderName}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountHolderName: e.target.value } })}
              />
              <Input
                label="Account Number"
                value={form.bankDetails.accountNumber}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })}
              />
              <Input
                label="Bank Name"
                value={form.bankDetails.bankName}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })}
              />
              <Input
                label="IFSC Code"
                value={form.bankDetails.ifscCode}
                onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, ifscCode: e.target.value } })}
              />
            </div>
            <Button onClick={handleUpdateBankDetails}>Save Bank Details</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Account Holder</span>
              <span className="font-medium text-gray-900">{profile.bankDetails?.accountHolderName || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Account Number</span>
              <span className="font-medium text-gray-900">{profile.bankDetails?.accountNumber || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Bank Name</span>
              <span className="font-medium text-gray-900">{profile.bankDetails?.bankName || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">IFSC Code</span>
              <span className="font-medium text-gray-900">{profile.bankDetails?.ifscCode || "Not set"}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
