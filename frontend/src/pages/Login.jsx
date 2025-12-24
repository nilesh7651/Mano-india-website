import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data._id,
          name: res.data.name,
          role: res.data.role,
        })
      );

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 ">

      {/* 🌄 OUTER BACKGROUND (Illustration style) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661315459644-18297c559777?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ================= AUTH CARD ================= */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* ================= LEFT : LOGIN FORM ================= */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-500 mt-2">
              Login to continue booking artists & venues
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
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          {/* Mobile Sign up */}
          <div className="mt-6 text-center text-sm text-gray-600 md:hidden">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-500 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* ================= RIGHT : RED PANEL ================= */}
        <div className="flex flex-col items-center justify-center text-center bg-red-500 text-white p-10 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Hello, Friend!
          </h2>
          <p className="text-red-100 mb-8 max-w-xs">
            Enter your personal details and start your journey with us
          </p>

          <Link
            to="/register"
            className="
              border-2 border-white px-8 py-3 rounded-full
              font-semibold
              hover:bg-white hover:text-red-500
              transition
            "
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}
