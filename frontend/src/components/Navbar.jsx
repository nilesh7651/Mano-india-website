import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { getUser, logout } from "../utils/auth";
import API from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = getUser();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {
      // Ignore network errors; still clear local state.
    }
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Mano India Logo"
            className="h-8 w-auto object-contain"
            decoding="async"
          />
          <span className="font-semibold text-lg text-white tracking-wide">
            Mano<span className="text-amber-500">India</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/artists"
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
          >
            Browse Artists
          </Link>
          <Link
            to="/venues"
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
          >
            Browse Venues
          </Link>
          <Link
            to="/event-managers"
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
          >
            Find Event Managers
          </Link>
          <Link
            to="/themes"
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
          >
            Book Theme
          </Link>
          <Link
            to="/join"
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
          >
            Join as Provider
          </Link>
          <button
            onClick={() => {
              if (window.location.pathname !== "/") {
                navigate("/#how-it-works");
              } else {
                const element = document.getElementById("how-it-works");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            How it Works
          </button>
          <button
            onClick={() => {
              if (window.location.pathname !== "/") {
                navigate("/#footer");
              } else {
                const element = document.getElementById("footer");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            About
          </button>
        </div>

        {/* Right Side (User/Auth) & Mobile Toggle */}
        <div className="flex items-center gap-4">

          {/* Auth Buttons / User Profile */}
          {!user ? (
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-500 transition-all font-medium shadow-lg shadow-amber-900/30 hidden sm:block"
              >
                Sign Up
              </Link>
              {/* Mobile Sign Up Icon/Link if needed, or just keep Login and Menu */}
            </div>
          ) : (
            <div className="relative">
              {/* User Initial */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-gray-800 text-amber-500 border border-gray-700 flex items-center justify-center font-bold hover:border-amber-500 transition-colors"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-sm text-white font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    {user.role === "admin" ? (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    ) : user.role === "artist" ? (
                      <Link
                        to="/dashboard/artist"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-colors"
                      >
                        Artist Dashboard
                      </Link>
                    ) : user.role === "venue" ? (
                      <Link
                        to="/dashboard/venue"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-colors"
                      >
                        Venue Dashboard
                      </Link>
                    ) : user.role === "event_manager" ? (
                      <Link
                        to="/dashboard/event-manager"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-colors"
                      >
                        Event Manager Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-colors"
                      >
                        My Dashboard
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-colors"
                    >
                      My Profile
                    </Link>
                  </div>

                  <div className="border-t border-gray-800"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 absolute top-16 left-0 w-full shadow-2xl z-40">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/artists"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-amber-500 font-medium py-2 border-b border-gray-800/50"
            >
              Browse Artists
            </Link>
            <Link
              to="/venues"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-amber-500 font-medium py-2 border-b border-gray-800/50"
            >
              Browse Venues
            </Link>
            <Link
              to="/event-managers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-amber-500 font-medium py-2 border-b border-gray-800/50"
            >
              Find Event Managers
            </Link>
            <Link
              to="/themes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-amber-500 font-medium py-2 border-b border-gray-800/50"
            >
              Book Theme
            </Link>
            <Link
              to="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-amber-500 font-medium py-2 border-b border-gray-800/50"
            >
              Join as Provider
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (window.location.pathname !== "/") {
                  navigate("/#how-it-works");
                } else {
                  const element = document.getElementById("how-it-works");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-left text-gray-300 hover:text-amber-500 font-medium py-2 border-b border-gray-800/50 bg-transparent"
            >
              How it Works
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (window.location.pathname !== "/") {
                  navigate("/#footer");
                } else {
                  const element = document.getElementById("footer");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-left text-gray-300 hover:text-amber-500 font-medium py-2 border-b border-gray-800/50 bg-transparent"
            >
              About
            </button>
            {!user && (
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-amber-600 text-white text-center py-3 rounded-lg hover:bg-amber-500 font-medium shadow w-full mt-2"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}