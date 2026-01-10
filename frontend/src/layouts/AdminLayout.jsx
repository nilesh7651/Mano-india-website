import { Navigate, Outlet, Link } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function AdminLayout() {
  const user = getUser();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="text-2xl font-bold mb-8 text-amber-400">Admin Panel</div>
        <nav className="flex-grow">
          <ul>
            <li>
              <Link
                to="/admin"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/admin/artists"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                to="/admin/venues"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Venues
              </Link>
            </li>
            <li>
              <Link
                to="/admin/event-managers"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Event Managers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/gallery"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition text-amber-400"
              >
                Gallery Manager
              </Link>
            </li>
            <li>
              <Link
                to="/admin/receipts"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Receipts
              </Link>
            </li>
            <li>
              <Link
                to="/admin/blog"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Post Blog
              </Link>
            </li>
            <li>
              <Link
                to="/admin/price-requests"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Price Requests
              </Link>
            </li>
            <li>
              <Link
                to="/admin/themes"
                className="block py-2 px-4 rounded hover:bg-gray-800 transition"
              >
                Themes
              </Link>
            </li>
          </ul>
        </nav>
        {/* You can add a logout link or other footer items here */}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
