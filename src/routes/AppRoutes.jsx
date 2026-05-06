import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public Pages
import Home from '../pages/public/Home';
import Halls from '../pages/public/Halls';
import HallDetails from '../pages/public/HallDetails';
import Services from '../pages/public/Services';
import ServiceDetails from '../pages/public/ServiceDetails';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

// Dashboard Pages
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import OwnerDashboard from '../pages/dashboard/owner/OwnerDashboard';
import UserOverview from '../pages/dashboard/user/UserOverview';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="halls" element={<Halls />} />
        <Route path="halls/:id" element={<HallDetails />} />
        <Route path="services" element={<Services />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard">
        {/* User Dashboard */}
        <Route 
          path="user" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <DashboardLayout role="user" />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserOverview />} />
          <Route path="wishlist" element={<UserOverview />} />
          <Route path="bookings" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">My Bookings Content</div>} />
          <Route path="settings" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">Profile Settings Content</div>} />
        </Route>

        {/* Owner Dashboard */}
        <Route 
          path="owner" 
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <DashboardLayout role="owner" />
            </ProtectedRoute>
          }
        >
          <Route index element={<OwnerDashboard />} />
          <Route path="venues" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">My Venues Management</div>} />
          <Route path="bookings" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">Venue Reservations Content</div>} />
          <Route path="settings" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">Venue Settings Content</div>} />
        </Route>

        {/* Admin Dashboard */}
        <Route 
          path="admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout role="admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">Manage Users Content</div>} />
          <Route path="halls" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">Review Halls Content</div>} />
          <Route path="settings" element={<div className="p-10 bg-white rounded-3xl soft-shadow border border-gold/5">System Settings Content</div>} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<div className="p-20 text-center text-2xl font-bold">404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
