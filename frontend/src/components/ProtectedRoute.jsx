import { Navigate, useLocation } from "react-router-dom";
import { getUser, isTokenValid } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const user = getUser();
  const isValid = isTokenValid();

  // Not logged in OR token expired → redirect to login
  if (!isValid) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
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
