import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </div>
    </div>
  );
}
