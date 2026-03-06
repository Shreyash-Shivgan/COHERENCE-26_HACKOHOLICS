import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FlowTracker from './pages/FlowTracker';
import Anomalies from './pages/Anomalies';
import Reports from './pages/reports';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import ReallocationInsights from './pages/ReallocationInsights';

// A simple protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('govflow_auth') === 'true';
  const role = localStorage.getItem('govflow_role');
  const profileCompleted = localStorage.getItem('govflow_profile_completed') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Force admins to complete profile if they haven't already, except when already on /profile
  if (role === 'admin' && !profileCompleted && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="flow" element={<FlowTracker />} />
          <Route path="flow/:projectId" element={<FlowTracker />} />
          <Route path="anomalies" element={<Anomalies />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reallocation-insights" element={<ReallocationInsights />} />
          <Route path="settings" element={<div className="p-8 text-slate-500">Settings Module (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;