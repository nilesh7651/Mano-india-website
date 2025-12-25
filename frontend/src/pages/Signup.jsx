import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await API.post("/auth/register", form);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-black">

      {/* 🌄 OUTER BACKGROUND (Matches Login) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1400&auto=format&fit=crop')",
        }}
      />
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* ================= AUTH CARD ================= */}
      <div className="relative z-10 w-full max-w-5xl bg-gray-900 rounded-3xl shadow-2xl shadow-amber-900/20 overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-800">

        {/* ================= LEFT : SIGNUP FORM ================= */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">
              Join <span className="text-amber-500 font-semibold">ManoIndia</span> to book exclusive events
            </p>
          </div>

          {error && (
            <div className="mb-6 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg p-3 text-center">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600"
              />
              <p className="text-xs text-gray-500 mt-2">
                Minimum 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                I want to join as
              </label>
              <div className="relative">
                <select
                  name="role"
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="user">User (Book Events)</option>
                  <option value="artist">Artist (List Services)</option>
                  <option value="venue">Venue Owner (List Space)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  ▼
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/30 mt-4"
            >
              Create Account
            </button>
          </form>

          {/* Mobile Login Link */}
          <div className="mt-8 text-center text-sm text-gray-500 md:hidden">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-500 font-semibold hover:text-amber-400 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* ================= RIGHT : GOLD PANEL ================= */}
        <div className="hidden md:flex flex-col items-center justify-center text-center bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white p-12 relative overflow-hidden">
          
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Welcome Back!
            </h2>
            <p className="text-amber-100 mb-10 max-w-xs mx-auto text-lg leading-relaxed">
              Already have an account? Login to access your dashboard and manage bookings.
            </p>

            <Link
              to="/login"
              className="
                inline-block border-2 border-white px-10 py-3 rounded-full
                font-bold tracking-wide
                hover:bg-white hover:text-amber-700
                transition-all duration-300
                shadow-lg
              "
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}