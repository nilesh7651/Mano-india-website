import { Navigate, Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

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
