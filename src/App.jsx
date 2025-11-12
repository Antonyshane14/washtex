import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminStores from './pages/Admin/Stores';
import AdminFactories from './pages/Admin/Factories';
import AdminCustomers from './pages/Admin/Customers';
import AdminTransfers from './pages/Admin/Transfers';
import AdminOrderTracking from './pages/Admin/OrderTracking';
import StoreDashboard from './pages/Store/Dashboard';
import StoreCustomers from './pages/Store/Customers';
import StoreOrders from './pages/Store/Orders';
import StoreBilling from './pages/Store/Billing';
import FactoryDashboard from './pages/Factory/Dashboard';
import FactoryReception from './pages/Factory/Reception';
import FactoryProcessing from './pages/Factory/Processing';
import FactoryQuality from './pages/Factory/Quality';
import AccountantDashboard from './pages/Accountant/Dashboard';
import AccountantBilling from './pages/Accountant/Billing';
import AccountantMembership from './pages/Accountant/Membership';
import TrackingSystem from './pages/Tracking/System';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role.toLowerCase()}`} replace />;
  }

  return children;
};

function App() {
  console.log('App component rendering');
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stores"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminStores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/factories"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminFactories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transfers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminTransfers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tracking"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOrderTracking />
              </ProtectedRoute>
            }
          />

          {/* Store Routes */}
          <Route
            path="/store"
            element={
              <ProtectedRoute allowedRoles={['store_manager', 'store_staff']}>
                <StoreDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store/customers"
            element={
              <ProtectedRoute allowedRoles={['store_manager', 'store_staff']}>
                <StoreCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store/orders"
            element={
              <ProtectedRoute allowedRoles={['store_manager', 'store_staff']}>
                <StoreOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store/billing"
            element={
              <ProtectedRoute allowedRoles={['store_manager', 'store_staff']}>
                <StoreBilling />
              </ProtectedRoute>
            }
          />

          {/* Factory Routes */}
          <Route
            path="/factory"
            element={
              <ProtectedRoute allowedRoles={['factory_manager', 'factory_staff']}>
                <FactoryDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/factory/reception"
            element={
              <ProtectedRoute allowedRoles={['factory_manager', 'factory_staff']}>
                <FactoryReception />
              </ProtectedRoute>
            }
          />
          <Route
            path="/factory/processing"
            element={
              <ProtectedRoute allowedRoles={['factory_manager', 'factory_staff']}>
                <FactoryProcessing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/factory/quality"
            element={
              <ProtectedRoute allowedRoles={['factory_manager', 'factory_staff']}>
                <FactoryQuality />
              </ProtectedRoute>
            }
          />

          {/* Accountant Routes */}
          <Route
            path="/accountant"
            element={
              <ProtectedRoute allowedRoles={['accountant']}>
                <AccountantDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accountant/billing"
            element={
              <ProtectedRoute allowedRoles={['accountant']}>
                <AccountantBilling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accountant/membership"
            element={
              <ProtectedRoute allowedRoles={['accountant']}>
                <AccountantMembership />
              </ProtectedRoute>
            }
          />

          {/* Common Routes */}
          <Route
            path="/tracking"
            element={
              <ProtectedRoute>
                <TrackingSystem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
