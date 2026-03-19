import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Team from './pages/public/Team';
import Matches from './pages/public/Matches';
import News from './pages/public/News';
import Gallery from './pages/public/Gallery';
import Shop from './pages/public/Shop';
import Contact from './pages/public/Contact';

// Fan Pages
import FanDashboard from './pages/fan/Dashboard';
import FanProfile from './pages/fan/Profile';
import TicketBooking from './pages/fan/Tickets';
import Community from './pages/fan/Community';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManagePlayers from './pages/admin/ManagePlayers';
import ManageMatches from './pages/admin/ManageMatches';
import ManageNews from './pages/admin/ManageNews';
import ManageFans from './pages/admin/ManageFans';
import ManageTickets from './pages/admin/ManageTickets';
import ManageImages from './pages/admin/ManageImages';
import ManageOrders from './pages/admin/ManageOrders';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Layout
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

// Auth Layout
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {children}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
            <Route path="/matches" element={<PublicLayout><Matches /></PublicLayout>} />
            <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
            
            {/* Fan Routes */}
            <Route path="/fan/dashboard" element={
              <ProtectedRoute allowedRoles={['fan', 'admin']}>
                <PublicLayout><FanDashboard /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/fan/profile" element={
              <ProtectedRoute allowedRoles={['fan', 'admin']}>
                <PublicLayout><FanProfile /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/fan/tickets" element={
              <ProtectedRoute allowedRoles={['fan', 'admin']}>
                <PublicLayout><TicketBooking /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/fan/community" element={
              <ProtectedRoute allowedRoles={['fan', 'admin']}>
                <PublicLayout><Community /></PublicLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><AdminDashboard /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/players" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><ManagePlayers /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/matches" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><ManageMatches /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/news" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><ManageNews /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/fans" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><ManageFans /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/tickets" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><ManageTickets /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/images" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><ManageImages /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicLayout><ManageOrders /></PublicLayout>
              </ProtectedRoute>
            } />
            
            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
