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
    <div className="min-h-screen bg-black py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl shadow-amber-900/10 border border-gray-800 p-8 md:p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create <span className="text-amber-500">Venue Profile</span>
          </h1>
          <p className="text-gray-400 text-sm">
            List your venue on ManoIndia and reach premium clients.
          </p>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg p-4 flex items-center gap-2">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Venue Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Venue Name <span className="text-amber-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Royal Wedding Hall"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
              onChange={handleChange}
              required
            />
          </div>

          {/* Type & City */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Venue Type <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="venueType"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors appearance-none cursor-pointer"
                  onChange={handleChange}
                  required
                >
                  <option value="Wedding Hall">Wedding Hall</option>
                  <option value="Banquet">Banquet</option>
                  <option value="Resort">Resort</option>
                  <option value="Farmhouse">Farmhouse</option>
                  <option value="Party Hall">Party Hall</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  ▼
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                City <span className="text-amber-500">*</span>
              </label>
              <input
                name="city"
                type="text"
                placeholder="e.g. Delhi"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Capacity & Price */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Capacity (guests) <span className="text-amber-500">*</span>
              </label>
              <input
                name="capacity"
                type="number"
                placeholder="e.g. 500"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price Per Day (₹) <span className="text-amber-500">*</span>
              </label>
              <input
                name="pricePerDay"
                type="number"
                placeholder="e.g. 200000"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your venue, ambiance, and special features..."
              rows="4"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600 resize-none"
              onChange={handleChange}
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Amenities (comma-separated)
            </label>
            <input
              name="amenities"
              type="text"
              placeholder="e.g. Parking, AC, Power Backup, Decoration Area"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-2">
              Tip: Separate multiple amenities with commas.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Creating Profile..." : "Create Venue Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}