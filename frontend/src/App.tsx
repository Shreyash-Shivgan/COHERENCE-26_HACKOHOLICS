// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import Layout from './components/Layout';
// // // import Dashboard from './pages/Dashboard';
// // // import FlowTracker from './pages/FlowTracker';
// // // import Anomalies from './pages/Anomalies';
// // // import Auth from './pages/Auth';
// // // import Profile from './pages/Profile';

// // // // A simple protected route wrapper
// // // function ProtectedRoute({ children }: { children: React.ReactNode }) {
// // //   const isAuthenticated = localStorage.getItem('govflow_auth') === 'true';
  
// // //   if (!isAuthenticated) {
// // //     return <Navigate to="/login" replace />;
// // //   }

// // //   return <>{children}</>;
// // // }

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         {/* Public Route */}
// // //         <Route path="/login" element={<Auth />} />

// // //         {/* Protected Routes */}
// // //         <Route 
// // //           path="/" 
// // //           element={
// // //             <ProtectedRoute>
// // //               <Layout />
// // //             </ProtectedRoute>
// // //           }
// // //         >
// // //           <Route index element={<Dashboard />} />
// // //           <Route path="flow" element={<FlowTracker />} />
// // //           <Route path="anomalies" element={<Anomalies />} />
// // //           <Route path="profile" element={<Profile />} />
// // //           <Route path="reports" element={<div className="p-8 text-slate-500">Reports Module (Coming Soon)</div>} />
// // //           <Route path="settings" element={<div className="p-8 text-slate-500">Settings Module (Coming Soon)</div>} />
// // //         </Route>
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;

// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Auth from "./pages/Auth";
// // import AdminDashboard from "./pages/AdminDashboard";
// // import CitizenDashboard from "./pages/CitizenDashboard";
// // import ProtectedRoute from "./components/ProtectedRoutes";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>

// //         <Route path="/login" element={<Auth />} />

// //         <Route
// //           path="/admin-dashboard"
// //           element={
// //             <ProtectedRoute role="admin">
// //               <AdminDashboard />
// //             </ProtectedRoute>
// //           }
// //         />

// //         <Route
// //           path="/citizen-dashboard"
// //           element={
// //             <ProtectedRoute role="citizen">
// //               <CitizenDashboard />
// //             </ProtectedRoute>
// //           }
// //         />

// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Auth from "./pages/Auth";
// import AdminDashboard from "./pages/AdminDashboard";
// import CitizenDashboard from "./pages/CitizenDashboard";
// import ProtectedRoute from "./components/ProtectedRoutes";
// // import { BrowserRouter as Router, Navigate } from 'react-router-dom';
// // import Layout from './components/Layout';
// import Dashboard from './pages/Dashboard';
// import FlowTracker from './pages/FlowTracker';
// import Anomalies from './pages/Anomalies';
// import Profile from './pages/Profile';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Default route */}
//         <Route path="/" element={<Auth />} />

//         <Route path="/login" element={<Auth />} />

//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute role="admin">
//               {/* <AdminDashboard /> */}
//               <Dashboard/>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/citizen-dashboard"
//           element={
//             <ProtectedRoute role="citizen">
//               {/* <CitizenDashboard /> */}
//               <Dashboard/>
//             </ProtectedRoute>
//           }
//         />
//         <Route index element={<Dashboard />} />
//           <Route path="flow" element={<FlowTracker />} />
//           <Route path="flow/:projectId" element={<FlowTracker />} />
//           <Route path="anomalies" element={<Anomalies />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="reports" element={<div className="p-8 text-slate-500">Reports Module (Coming Soon)</div>} />
//           <Route path="settings" element={<div className="p-8 text-slate-500">Settings Module (Coming Soon)</div>} />


//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoutes";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import FlowTracker from "./pages/FlowTracker";
import Anomalies from "./pages/Anomalies";
import Profile from "./pages/Profile";
import Reports from "./pages/reports";
import AdminDashboard from "./pages/AdminDashboard";
import CitizenDashboard from "./pages/CitizenDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
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
        </Route>

        {/* Citizen Protected Routes */}
        <Route
          path="/citizen-dashboard"
          element={
            <ProtectedRoute role="citizen">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CitizenDashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;