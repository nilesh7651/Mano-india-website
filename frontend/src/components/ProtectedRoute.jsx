import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = getUser();

  // Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role check (if role is specified)
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Allow venue role access to venue dashboard
  if (window.location.pathname.includes("/venue") && user?.role === "venue") {
    // Allow access
  }

  return children;
}
