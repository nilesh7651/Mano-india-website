import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate password length
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await API.post("/auth/register", form);
      alert("Registration successful! Please login.");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      alert(errorMessage);
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Join Mano to book artists & venues
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              placeholder="John Doe"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="user">User</option>
              <option value="artist">Artist</option>
              <option value="venue">Venue Owner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition font-medium mt-6"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
