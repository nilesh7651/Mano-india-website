import { useEffect, useState } from "react";
import API from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { useToast } from "../../components/ui/ToastProvider";
import ReceiptModal from "../../components/ReceiptModal";

export default function ArtistDashboard() {
  const { notify } = useToast();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceiptData, setSelectedReceiptData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    city: "",
    phone: "",
    pricePerEvent: "",
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
  const [editingProfile, setEditingProfile] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      const imageArray = form.images.includes(",")
        ? form.images.split(",")
        : [form.images];

      await API.put("/artists/profile", {
        ...form,
        images: imageArray
      });
      notify({ type: "success", title: "Saved", message: "Profile updated successfully." });
      setEditingProfile(false);
      loadData();
    } catch (err) {
      console.error(err);
      notify({
        type: "error",
        title: "Update failed",
        message: err.response?.data?.message || "Failed to update profile.",
      });
    }
  };

  const handleViewReceipt = async (booking) => {
    try {
      const res = await API.get(`/receipts/booking/${booking._id}`);
      setSelectedReceiptData({ receipt: res.data, booking });
    } catch (err) {
      setSelectedReceiptData({ booking });
      notify({
        type: "info",
        title: "Receipt",
        message:
          err.response?.status === 404
            ? "Receipt record not found yet. Showing booking details."
            : "Failed to load receipt. Showing booking details.",
      });
    }
  };

  const loadData = async () => {
    try {
      const profileRes = await API.get("/artists/profile");
      setProfile(profileRes.data);
      if (profileRes.data) {
        const bookingsRes = await API.get("/bookings/artist");
        setBookings(bookingsRes.data);

        // Populate form for editing
        const p = profileRes.data;
        setForm({
          name: p.name || "",
          category: p.category || "",
          city: p.city || "",
          phone: p.phone || "",
          pricePerEvent: p.pricePerEvent || "",
          bio: p.bio || "",
          images: p.images && p.images.length > 0 ? p.images[0] : "", // Taking first image string or array handling
          bankDetails: p.bankDetails || { accountHolderName: "", accountNumber: "", bankName: "", ifscCode: "" }
        });

        // Fix image array vs string issue if any
        if (Array.isArray(p.images) && p.images.length > 0) {
          setForm(prev => ({ ...prev, images: p.images[0] }));
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
      notify({ type: "success", title: "Saved", message: "Bank details updated." });
      setEditingBank(false);
      loadData();
    } catch (err) {
      notify({
        type: "error",
        title: "Update failed",
        message: err.response?.data?.message || "Failed to update bank details.",
      });
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
      notify({
        type: "error",
        title: "Create failed",
        message: err.response?.data?.message || "Failed to create profile.",
      });
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
          <h2 className="text-2xl font-bold mb-6 text-white">Create Artist Profile</h2>
          <form onSubmit={handleCreateProfile} className="space-y-6">
            <Input
              label="Stage Name"
              placeholder="e.g. DJ Snake"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              variant="dark"
            />
            <Input
              label="Category"
              placeholder="e.g. DJ, Singer, Magician"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              variant="dark"
            />

            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="font-bold text-gray-300 mb-4">Bank Details (For Payouts)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Account Holder Name"
                  placeholder="Name as per bank"
                  value={form.bankDetails.accountHolderName}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountHolderName: e.target.value } })}
                  variant="dark"
                />
                <Input
                  label="Account Number"
                  placeholder="Account No."
                  value={form.bankDetails.accountNumber}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })}
                  variant="dark"
                />
                <Input
                  label="Bank Name"
                  placeholder="e.g. HDFC Bank"
                  value={form.bankDetails.bankName}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })}
                  variant="dark"
                />
                <Input
                  label="IFSC Code"
                  placeholder="IFSC Code"
                  value={form.bankDetails.ifscCode}
                  onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, ifscCode: e.target.value } })}
                  variant="dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="City"
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
                variant="dark"
              />
              <Input
                label="Phone Number"
                placeholder="e.g. +91 9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                variant="dark"
              />
              <Input
                label="Price per Event (₹)"
                type="number"
                placeholder="e.g. 15000"
                value={form.pricePerEvent}
                onChange={(e) => setForm({ ...form, pricePerEvent: e.target.value })}
                required
                variant="dark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Bio</label>
              <textarea
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows="4"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Profile Image</label>
              <ImageUpload
                onUpload={(url) => setForm({ ...form, images: url })}
                existingImage={form.images}
              />
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
            Your artist profile is currently under review by our admin team. You will be notified once approved.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 min-h-screen bg-black text-gray-100 p-6 md:p-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Artist Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage your bookings and profile</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-semibold border border-green-800">
            ✓ Verified
          </span>
          <span className="font-semibold text-white">{profile.name}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Incoming Bookings</h2>
          {!editingProfile && (
            <Button variant="outline" size="sm" onClick={() => setEditingProfile(true)} className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-500 hover:bg-gray-900">
              ✏️ Edit Profile
            </Button>
          )}
        </div>

        {editingProfile && (
          <Card variant="dark" className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-white">Edit Your Profile</h3>
              <Button variant="ghost" size="sm" onClick={() => setEditingProfile(false)} className="text-gray-400 hover:text-white hover:bg-gray-800">Cancel</Button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Stage Name"
                  variant="dark"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  label="Category"
                  variant="dark"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <Input
                  label="Phone"
                  variant="dark"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  label="Price Per Event (₹)"
                  type="number"
                  variant="dark"
                  value={form.pricePerEvent}
                  onChange={(e) => setForm({ ...form, pricePerEvent: e.target.value })}
                />
                <Input
                  label="City"
                  variant="dark"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <textarea
                  className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  rows="3"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Update Profile Image</label>
                <ImageUpload
                  existingImage={form.images}
                  onUpload={(url) => setForm({ ...form, images: url })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingProfile(false)} className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">Cancel</Button>
                <Button onClick={handleUpdateProfile}>Save Changes</Button>
              </div>
            </div>
          </Card>
        )}

        {bookings.length === 0 ? (
          <Card variant="dark" className="text-center py-16 border-dashed">
            <p className="text-gray-400 mb-2 text-lg">No booking requests yet.</p>
            <p className="text-gray-500">Your profile is visible to users. Stay tuned!</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <Card
                key={b._id}
                variant="dark"
                className="hover:shadow-lg hover:shadow-amber-900/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">{b.user?.name || "Guest User"}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    📞 {b.user?.phone || "No Phone"}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">📅 {new Date(b.eventDate).toDateString()}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500">₹ {b.amount}</span>
                  </div>
                  {b.eventLocation && (
                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      📍 {b.eventLocation}
                    </div>
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
                ) : (
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${b.status === "ACCEPTED"
                        ? "bg-green-900/30 text-green-400 border-green-800"
                        : b.status === "REJECTED"
                          ? "bg-red-900/30 text-red-400 border-red-800"
                          : "bg-blue-900/30 text-blue-400 border-blue-800"
                        }`}
                    >
                      {b.status}
                    </span>
                    {b.paymentStatus === "PAID" && (
                      <Button
                        size="sm"
                        onClick={() => handleViewReceipt(b)}
                        className="bg-gray-800 border border-gray-700 text-gray-300 hover:text-white text-xs"
                      >
                        View Receipt
                      </Button>
                    )}
                    {b.status === "ACCEPTED" && !b.artistCompleted && (
                      <Button
                        size="sm"
                        onClick={() => handleAction(b._id, "complete")}
                        className="bg-gray-800 border border-gray-700 text-gray-300 hover:text-white text-xs"
                      >
                        Mark Complete
                      </Button>
                    )}
                    {b.status === "ACCEPTED" && b.artistCompleted && (
                      <span className="text-xs text-green-500 italic">Marked as done ✓</span>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedReceiptData && (
        <ReceiptModal
          booking={selectedReceiptData.booking}
          receipt={selectedReceiptData.receipt}
          onClose={() => setSelectedReceiptData(null)}
        />
      )}

      {/* Bank Details Section for Existing Users */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Account Holder</span>
              <span className="font-medium text-white">{profile.bankDetails?.accountHolderName || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Account Number</span>
              <span className="font-medium text-white">{profile.bankDetails?.accountNumber || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">Bank Name</span>
              <span className="font-medium text-white">{profile.bankDetails?.bankName || "Not set"}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">IFSC Code</span>
              <span className="font-medium text-white">{profile.bankDetails?.ifscCode || "Not set"}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
