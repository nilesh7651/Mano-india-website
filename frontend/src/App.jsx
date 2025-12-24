import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import ArtistDetails from "./pages/ArtistDetails";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./dashboards/user/UserDashboard";
import ArtistDashboard from "./dashboards/artist/ArtistDashboard";
import VenueDashboard from "./dashboards/venue/VenueDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArtists from "./pages/admin/AdminArtists";
import AdminVenues from "./pages/admin/AdminVenues";
import AdminBookings from "./pages/admin/AdminBookings";
import CreateVenue from "./pages/CreateVenue";
import UserBookings from "./pages/userBooking";
import Events from "./pages/Events";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />  */}
  <Route path="/events" element={<Events />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/my-bookings" element={<UserBookings />} />
          <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  }
/>
0
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
  path="/create-venue"
  element={
    <ProtectedRoute>
      <CreateVenue />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
>
  <Route path="artists" element={<AdminArtists />} />
  <Route path="venues" element={<AdminVenues />} />
  <Route path="bookings" element={<AdminBookings />} />
</Route>
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="bookings" element={<AdminBookings />} />
</Route>


        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
