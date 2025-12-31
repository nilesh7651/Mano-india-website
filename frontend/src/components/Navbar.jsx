import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Mano"
            className="h-8 w-auto object-contain"
          />
          <span className="font-semibold text-lg text-white tracking-wide">
            Mano<span className="text-amber-500">India</span>
          </span>
        </Link>

        {/* Center Links */}
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
            to="/#how-it-works"
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
          >
            How it Works
          </Link>
          <Link
            to="/#about"
            className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* Right Side */}
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
              className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-500 transition-all font-medium shadow-lg shadow-amber-900/30"
            >
              Sign Up
            </Link>
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

      </div>
    </nav>
  );
}