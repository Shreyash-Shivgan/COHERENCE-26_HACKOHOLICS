// // import { Bell, Search, User, LogOut } from 'lucide-react';
// // import { useNavigate, Link } from 'react-router-dom';

// // export default function Header() {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem('govflow_auth');
// //     navigate('/login');
// //   };

// //   return (
// //     <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
// //       <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96">
// //         <Search className="w-4 h-4 text-slate-400 mr-2" />
// //         <input 
// //           type="text" 
// //           placeholder="Search projects, contractors, or transactions..." 
// //           className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
// //         />
// //       </div>

// //       <div className="flex items-center gap-6">
// //         <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
// //           <Bell className="w-5 h-5" />
// //           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
// //         </button>
// //         <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
// //           <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
// //               <User className="w-4 h-4" />
// //             </div>
// //             <div className="text-sm">
// //               <p className="font-medium text-slate-700">Rajesh Kumar</p>
// //               <p className="text-xs text-slate-500">Ministry of Finance</p>
// //             </div>
// //           </Link>
// //           <button 
// //             onClick={handleLogout}
// //             className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
// //             title="Log out"
// //           >
// //             <LogOut className="w-5 h-5" />
// //           </button>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }
// import { Bell, Search, User, LogOut } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';

// export default function Header() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('govflow_auth');
//     navigate('/login');
//   };

//   return (
//     <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
//       <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96">
//         <Search className="w-4 h-4 text-slate-400 mr-2" />
//         <input 
//           type="text" 
//           placeholder="Search projects, contractors, or transactions..." 
//           className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
//         />
//       </div>

//       <div className="flex items-center gap-6">
//         <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
//         </button>
//         <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
//           <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
//             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
//               <User className="w-4 h-4" />
//             </div>
//             <div className="text-sm">
//               <p className="font-medium text-slate-700">Rajesh Kumar</p>
//               <p className="text-xs text-slate-500">Ministry of Finance</p>
//             </div>
//           </Link>
//           <button 
//             onClick={handleLogout}
//             className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
//             title="Log out"
//           >
//             <LogOut className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Bell, Search, User, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('govflow_auth');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search projects, contractors, or transactions..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
          <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User className="w-4 h-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-700">Rajesh Kumar</p>
              <p className="text-xs text-slate-500">Ministry of Finance</p>
            </div>
          </Link>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
