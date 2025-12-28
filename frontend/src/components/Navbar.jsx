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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Mano"
            className="h-8 w-auto object-contain"
          />
          <span className="font-semibold text-lg">ManoIndia</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/artists" className="text-gray-700 hover:text-black transition">
            Artists
          </Link>
          <Link to="/venues" className="text-gray-700 hover:text-black transition">
            Venues
          </Link>
        </div>

        {/* Right Side */}
        {!user ? (
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link to="/login" className="text-gray-700 hover:text-black transition">
              Login
            </Link>
            {/* <Link
              to="/signup"
              className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium"
            >
              Sign Up
            </Link> */}
            <Link
  to="/signup"
  className="bg-[#C2185B] text-white px-4 py-2 rounded-lg 
             hover:bg-[#AD1457] transition font-medium shadow-md"
>
  Sign Up
</Link>

          </div>
        ) : (
          <div className="relative">
            {/* User Initial */}
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:opacity-90 transition"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                  >
                    Admin Dashboard
                  </Link>
                ) : user.role === "artist" ? (
                  <Link
                    to="/dashboard/artist"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                  >
                    Artist Dashboard
                  </Link>
                ) : user.role === "venue" ? (
                  <Link
                    to="/dashboard/venue"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                  >
                    Venue Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                  >
                    My Dashboard
                  </Link>
                )}

                <div className="border-t border-gray-100"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition text-red-600 font-medium"
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
