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
    <div className="relative min-h-screen flex items-center justify-center px-4">

      {/* 🌄 OUTER BACKGROUND (same as Login) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661315459644-18297c559777?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* ================= AUTH CARD ================= */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* ================= LEFT : SIGNUP FORM ================= */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-900">
              Create Account
            </h1>
            <p className="text-gray-500 mt-2">
              Join Mano to book artists & venues
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type
              </label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="user">User</option>
                <option value="artist">Artist</option>
                <option value="venue">Venue Owner</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition mt-4"
            >
              Sign Up
            </button>
          </form>

          {/* Mobile Login Link */}
          <div className="mt-6 text-center text-sm text-gray-600 md:hidden">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>

        {/* ================= RIGHT : RED PANEL ================= */}
        <div className="flex flex-col items-center justify-center text-center bg-red-500 text-white p-10 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Welcome Back!
          </h2>
          <p className="text-red-100 mb-8 max-w-xs">
            Already have an account? Login to continue your journey with us
          </p>

          <Link
            to="/login"
            className="
              border-2 border-white px-8 py-3 rounded-full
              font-semibold
              hover:bg-white hover:text-red-500
              transition
            "
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
