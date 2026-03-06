// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Network, 
//   AlertTriangle, 
//   FileText, 
//   Settings,
//   ShieldAlert,
//   UserCircle
// } from 'lucide-react';
// import { cn } from '../lib/utils';

// const navItems = [
//   { name: 'Dashboard', path: '/', icon: LayoutDashboard },
//   { name: 'Fund Flow Tracker', path: '/flow', icon: Network },
//   { name: 'Anomaly Detection', path: '/anomalies', icon: AlertTriangle },
//   { name: 'Reports', path: '/reports', icon: FileText },
//   { name: 'Profile', path: '/profile', icon: UserCircle },
//   { name: 'Settings', path: '/settings', icon: Settings },
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
//       <div className="p-6 flex items-center gap-3 border-b border-slate-800">
//         <ShieldAlert className="w-8 h-8 text-blue-500" />
//         <div>
//           <h1 className="font-bold text-lg leading-tight">GovFlow</h1>
//           <p className="text-xs text-slate-400">Intelligence Platform</p>
//         </div>
//       </div>
      
//       <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//         {navItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={cn(
//                 "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
//                 isActive 
//                   ? "bg-blue-600/10 text-blue-400" 
//                   : "text-slate-400 hover:bg-slate-800 hover:text-white"
//               )}
//             >
//               <item.icon className="w-5 h-5" />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-slate-800">
//         <div className="bg-slate-800 rounded-lg p-4">
//           <p className="text-xs text-slate-400 mb-2">System Status</p>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-sm font-medium text-emerald-400">All Systems Operational</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Network, 
//   AlertTriangle, 
//   FileText, 
//   Settings,
//   ShieldAlert,
//   UserCircle
// } from 'lucide-react';
// import { cn } from '../lib/utils';

// const navItems = [
//   { name: 'Dashboard', path: '/', icon: LayoutDashboard },
//   { name: 'Fund Flow Tracker', path: '/flow', icon: Network },
//   { name: 'Anomaly Detection', path: '/anomalies', icon: AlertTriangle },
//   { name: 'Reports', path: '/reports', icon: FileText },
//   { name: 'Profile', path: '/profile', icon: UserCircle },
//   { name: 'Settings', path: '/settings', icon: Settings },
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
//       <div className="p-6 flex items-center gap-3 border-b border-slate-800">
//         <ShieldAlert className="w-8 h-8 text-blue-500" />
//         <div>
//           <h1 className="font-bold text-lg leading-tight">GovFlow</h1>
//           <p className="text-xs text-slate-400">Intelligence Platform</p>
//         </div>
//       </div>
      
//       <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//         {navItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={cn(
//                 "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
//                 isActive 
//                   ? "bg-blue-600/10 text-blue-400" 
//                   : "text-slate-400 hover:bg-slate-800 hover:text-white"
//               )}
//             >
//               <item.icon className="w-5 h-5" />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-slate-800">
//         <div className="bg-slate-800 rounded-lg p-4">
//           <p className="text-xs text-slate-400 mb-2">System Status</p>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-sm font-medium text-emerald-400">All Systems Operational</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  AlertTriangle, 
  FileText, 
  Settings,
  ShieldAlert,
  UserCircle,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Fund Flow Tracker', path: '/flow', icon: Network },
  { name: 'Anomaly Detection', path: '/anomalies', icon: AlertTriangle },
  { name: 'Reallocation Insights', path: '/reallocation-insights', icon: ArrowRightLeft, adminOnly: true },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Profile', path: '/profile', icon: UserCircle },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const role = localStorage.getItem('govflow_role');
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || role === 'admin');

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <ShieldAlert className="w-8 h-8 text-blue-500" />
        <div>
          <h1 className="font-bold text-lg leading-tight">GovFlow</h1>
          <p className="text-xs text-slate-400">Intelligence Platform</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600/10 text-blue-400" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
