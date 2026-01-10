import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import SEO from "../components/SEO";
import { IMAGES } from "../lib/images";
import { useToast } from "../components/ui/ToastProvider";

export default function Signup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { notify } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  // Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const qRole = params.get("role");
    const valid = ["user", "artist", "venue", "event_manager"].includes(qRole);
    if (valid) {
      setForm((prev) => ({ ...prev, role: qRole }));
    }
  }, [params]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isVerified) {
      setError("Please verify your email address first.");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      // Include OTP in the registration payload for backend verification
      await API.post("/auth/register", { ...form, otp });
      notify({
        type: "success",
        title: "Account created",
        message: "Please login to continue.",
      });
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );
    }
  };

  const handleSendOtp = async () => {
    if (!form.email) {
      setError("Please enter your email address first");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      await API.post("/auth/send-otp", { email: form.email });
      setOtpSent(true);
      notify({
        type: "success",
        title: "OTP sent",
        message: "Check your email inbox (and spam).",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      await API.post("/auth/verify-otp", { email: form.email, otp });
      setIsVerified(true);
      setOtpSent(false); // Hide OTP field
      notify({
        type: "success",
        title: "Email verified",
        message: "You can now complete signup.",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <SEO
        title="Sign Up | Join Mano India"
        description="Create a new Mano India account to start booking artists and venues, or list your services."
        keywords="mano india signup, create account, book artists india, book venues india, become event manager, list your services"
        canonicalUrl="https://manoindia.in/signup"
      />

      {/* 🌟 LUXURY ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-800/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* 🌟 GLASS AUTH CARD */}
      <div className="relative z-10 w-full max-w-6xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT: FORM SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center relative order-2 md:order-1">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join the most exclusive events platform in India.
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Email Address</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    onChange={handleChange}
                    required
                    disabled={isVerified}
                    className={`w-full sm:flex-1 bg-black/40 border ${isVerified ? "border-green-500/50 text-green-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all font-light`}
                  />
                  {!isVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isVerifying || otpSent}
                      className="w-full sm:w-auto bg-white/10 border border-white/10 text-amber-500 px-4 py-3 sm:py-0 rounded-xl hover:bg-white/20 disabled:opacity-50 transition-all text-sm font-medium whitespace-nowrap"
                    >
                      {isVerifying ? "Sending..." : otpSent ? "Resend" : "Verify"}
                    </button>
                  )}
                </div>
                {isVerified && <p className="text-green-500 text-xs ml-1 flex items-center gap-1">✓ Email Verified</p>}
              </div>

              {/* OTP SECTION */}
              {otpSent && !isVerified && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl animate-fade-in">
                  <label className="text-xs uppercase tracking-wider text-amber-500 font-semibold mb-2 block">Enter Verification Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="XXXXXX"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="flex-1 bg-black/50 border border-amber-500/30 text-white text-center tracking-[0.5em] text-lg rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="bg-amber-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-amber-500 shadow-lg shadow-amber-900/20"
                    >
                      Confirm
                    </button>
                  </div>
                  <p className="text-xs text-amber-200/60 mt-2">
                    Check your email inbox (and spam) for the code.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Role</label>
                <div className="relative">
                  <select
                    name="role"
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="user" className="bg-gray-900">User (Book Events)</option>
                    <option value="artist" className="bg-gray-900">Artist (List Services)</option>
                    <option value="venue" className="bg-gray-900">Venue Owner (List Space)</option>
                    <option value="event_manager" className="bg-gray-900">Event Manager (Offer Services)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">▼</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-light"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 bg-black/40 border-white/10 rounded focus:ring-amber-500 text-amber-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the <Link to="/terms-and-conditions" className="text-amber-500 hover:underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-amber-500 hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={!isVerified || !agreedToTerms}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg mt-2 ${isVerified && agreedToTerms
                ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white transform hover:scale-[1.02]"
                : "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
                }`}
            >
              Start Your Journey
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium hover:underline transition-all">
              Login Here
            </Link>
          </div>
        </div>

        {/* RIGHT: IMAGE / BRAND SECTION */}
        <div className="hidden md:block relative overflow-hidden bg-black/20 order-1 md:order-2">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
            style={{ backgroundImage: `url('${IMAGES.auth.side}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-12 text-white text-right">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Join the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-amber-500">Elite Network</span>
            </h2>
            <p className="text-gray-400 font-light ml-auto max-w-sm">
              Whether you are an artist, a venue owner, or planning your dream wedding, Mano India is your stage.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}