import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import ArtistDetails from "./pages/ArtistDetails";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import EventManagers from "./pages/EventManagers";
import EventManagerDetails from "./pages/EventManagerDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./dashboards/user/UserDashboard";
import ArtistDashboard from "./dashboards/artist/ArtistDashboard";
import VenueDashboard from "./dashboards/venue/VenueDashboard";
import EventManagerDashboard from "./dashboards/eventManager/EventManagerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArtists from "./pages/admin/AdminArtists";
import AdminVenues from "./pages/admin/AdminVenues";
import AdminEventManagers from "./pages/admin/AdminEventManagers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminGallery from "./pages/admin/AdminGallery";
import UserBookings from "./pages/userBooking";
import Events from "./pages/Events";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import UserProfile from "./pages/UserProfile";
import DeveloperTeam from "./pages/DeveloperTeam";
import ScrollToTop from "./components/ScrollToTop";
import ChatInterface from "./components/chat/ChatInterface";

export default function App() {
  useEffect(() => {
    console.log(
      "%c Developed by Nilesh Kumar ",
      "background: #000; color: #f59e0b; font-size: 14px; font-weight: bold; padding: 4px; border-radius: 4px;"
    );
    console.log(
      "%c Contact: nileshsingh7651@gmail.com ",
      "background: #111; color: #aaa; font-size: 10px; padding: 4px;"
    );
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/event-managers" element={<EventManagers />} />
          <Route path="/event-managers/:id" element={<EventManagerDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-bookings" element={<UserBookings />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/artist"
            element={
              <ProtectedRoute role="artist">
                <ArtistDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/venue"
            element={
              <ProtectedRoute>
                <VenueDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/event-manager"
            element={
              <ProtectedRoute role="event_manager">
                <EventManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="artists" element={<AdminArtists />} />
            <Route path="venues" element={<AdminVenues />} />
            <Route path="event-managers" element={<AdminEventManagers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>

          <Route path="/developer-team" element={<DeveloperTeam />} />
        </Routes>
        <ChatInterface />
      </MainLayout>
    </BrowserRouter>
  );
}
