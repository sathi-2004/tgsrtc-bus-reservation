import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Common Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import SearchBuses from './pages/SearchBuses';
import BusSearchResults from './pages/BusSearchResults';
import BusDetails from './pages/BusDetails';
import SeatSelection from './pages/SeatSelection';
import PassengerDetails from './pages/PassengerDetails';
import PaymentPage from './pages/PaymentPage';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import ViewTicket from './pages/ViewTicket';
import CancelTicket from './pages/CancelTicket';
import TrackBus from './pages/TrackBus';
import BusPassInfo from './pages/BusPassInfo';
import Offers from './pages/Offers';
import ContactUs from './pages/ContactUs';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBuses from './pages/admin/ManageBuses';
import ManageRoutes from './pages/admin/ManageRoutes';
import ManageSchedules from './pages/admin/ManageSchedules';
import ManageBookings from './pages/admin/ManageBookings';
import ManagePassengers from './pages/admin/ManagePassengers';
import ManagePayments from './pages/admin/ManagePayments';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            {/* Public Customer Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<SearchBuses />} />
              <Route path="bus-results" element={<BusSearchResults />} />
              <Route path="bus-details/:id" element={<BusDetails />} />
              <Route path="seat-selection/:scheduleId" element={<SeatSelection />} />
              <Route path="passenger-details" element={<PassengerDetails />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="booking-confirmation/:bookingRef" element={<BookingConfirmation />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="view-ticket" element={<ViewTicket />} />
              <Route path="ticket/:ticketNo" element={<ViewTicket />} />
              <Route path="cancel-ticket" element={<CancelTicket />} />
              <Route path="track-bus" element={<TrackBus />} />
              <Route path="track-bus/:scheduleId" element={<TrackBus />} />
              <Route path="bus-pass" element={<BusPassInfo />} />
              <Route path="offers" element={<Offers />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="faqs" element={<FAQs />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsConditions />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="buses" element={<ManageBuses />} />
              <Route path="routes" element={<ManageRoutes />} />
              <Route path="schedules" element={<ManageSchedules />} />
              <Route path="bookings" element={<ManageBookings />} />
              <Route path="passengers" element={<ManagePassengers />} />
              <Route path="payments" element={<ManagePayments />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
