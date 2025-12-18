import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreateVenue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    venueType: "Wedding Hall",
    city: "",
    capacity: "",
    pricePerDay: "",
    description: "",
    amenities: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const amenitiesArray = form.amenities
        ? form.amenities.split(",").map((a) => a.trim()).filter(Boolean)
        : [];

      const venueData = {
        ...form,
        capacity: parseInt(form.capacity),
        pricePerDay: parseFloat(form.pricePerDay),
        amenities: amenitiesArray,
      };

      const res = await API.post("/venues", venueData);
      
      alert("Venue profile created successfully! Waiting for admin approval.");
      navigate("/dashboard/venue");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create venue profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Create Venue Profile
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue Name *
            </label>
            <input
              name="name"
              type="text"
              placeholder="Royal Wedding Hall"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue Type *
            </label>
            <select
              name="venueType"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              required
            >
              <option value="Wedding Hall">Wedding Hall</option>
              <option value="Banquet">Banquet</option>
              <option value="Resort">Resort</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Party Hall">Party Hall</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              name="city"
              type="text"
              placeholder="Delhi"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity (guests) *
              </label>
              <input
                name="capacity"
                type="number"
                placeholder="500"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Per Day (₹) *
              </label>
              <input
                name="pricePerDay"
                type="number"
                placeholder="200000"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your venue..."
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amenities (comma-separated)
            </label>
            <input
              name="amenities"
              type="text"
              placeholder="Parking, AC, Power Backup, Decoration Area"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate amenities with commas
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            {loading ? "Creating..." : "Create Venue Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

