import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FlowTracker from './pages/FlowTracker';
import Anomalies from './pages/Anomalies';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import ReallocationInsights from './pages/ReallocationInsights';

// A simple protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('govflow_auth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const role = localStorage.getItem('govflow_role');
  if (role !== 'admin') {
    return <Navigate to="/" replace />;
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
          <Route
            path="reallocation-insights"
            element={
              <AdminRoute>
                <ReallocationInsights />
              </AdminRoute>
            }
          />
          <Route path="reports" element={<div className="p-8 text-slate-500">Reports Module (Coming Soon)</div>} />
          <Route path="settings" element={<div className="p-8 text-slate-500">Settings Module (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
