import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../services/api";
import SEO from "../components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      // Token is now stored in an HttpOnly cookie by the backend.
      localStorage.removeItem("token");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        })
      );

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <SEO
        title="Login | Mano India - Artist & Venue Booking"
        description="Login to your Mano India account to manage bookings, profiles, and events."
        canonicalUrl="https://manoindia.in/login"
      />

      {/* 🌟 LUXURY ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* 🌟 GLASS AUTH CARD */}
      <div className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT: FORM SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center relative">

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 min-w-[1.25rem]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex. nilesh@manoindia.in"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-medium hover:underline transition-all">
              Create Account
            </Link>
          </div>
        </div>

        {/* RIGHT: IMAGE / BRAND SECTION */}
        <div className="hidden md:block relative overflow-hidden bg-black/20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Events Experience</span>
            </h2>
            <p className="text-gray-400 font-light">
              Connect with India's top artists and premium venues. Managing your bookings has never been this elegant.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}