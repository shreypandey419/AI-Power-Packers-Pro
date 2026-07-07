import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/ServicesPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProtectedRoute from "./components/routes/CustomerProtectedRoute";
import BookMove from "./pages/BookMove";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import BookingDetails from "./pages/BookingDetails";
import AdminBookings from "./pages/AdminBookings";
import AdminReviews from "./pages/AdminReviews";
import NotFound from "./pages/NotFound";
import BookingSuccess from "./pages/BookingSuccess";
import AIAssistant from "./components/ai/AIAssistant";

function App() {
  return (
    <>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />

        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/dashboard"
          element={
            <CustomerProtectedRoute>
              <CustomerDashboard />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/book-move"
          element={
            <CustomerProtectedRoute>
              <BookMove />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <CustomerProtectedRoute>
              <MyBookings />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <CustomerProtectedRoute>
              <Profile />
            </CustomerProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/booking/:id" element={<BookingDetails />} />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <AdminReviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-success"
          element={
            <CustomerProtectedRoute>
              <BookingSuccess />
            </CustomerProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <AIAssistant />
    </>
  );
}

export default App;