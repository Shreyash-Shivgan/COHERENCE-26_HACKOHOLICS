import { Bell, Search, User, LogOut, Check } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

type AppNotification = {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function Header() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read profile from localStorage
  let userName = 'User';
  let userDept = 'GovFlow';
  let userEmail = 'citizen@govflow.in';
  try {
    const profile = JSON.parse(localStorage.getItem('govflow_user_profile') || '{}');
    if (profile.fullName) userName = profile.fullName;
    if (profile.department) userDept = profile.department;
    if (profile.email) userEmail = profile.email;
  } catch { }

  const handleLogout = () => {
    localStorage.removeItem('govflow_auth');
    localStorage.removeItem('govflow_role');
    localStorage.removeItem('govflow_user_profile');
    localStorage.removeItem('govflow_aadhaar_verified');
    localStorage.removeItem('aadhaar_name');
    navigate('/login');
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/notifications?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (e) {
      console.error('Failed to fetch notifications', e);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userEmail]);

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkRead = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/api/notifications/${id}/read`, { method: 'PUT' });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (e) {
      console.error('Failed to mark read', e);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetch(`http://localhost:8000/api/notifications/read-all?email=${encodeURIComponent(userEmail)}`, { method: 'PUT' });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (e) {
      console.error('Failed to mark all read', e);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="Search projects, contractors, or transactions..."
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:bg-slate-50 rounded-full"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 lg:w-96 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 origin-top-right">
              <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:text-blue-700 hover:underline">
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500 py-8">
                    <Bell className="w-8 h-8 mx-auto text-slate-200 mb-2" />
                    No notifications yet
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={() => handleMarkRead(notification.id)}
                      className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors ${!notification.is_read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <p className={`text-sm ${!notification.is_read ? 'font-semibold text-slate-800' : 'font-medium text-slate-600'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                            {new Date(notification.created_at).toLocaleString(undefined, {
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                        </div>
                        {!notification.is_read ? (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                        ) : (
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-1 shrink-0" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
          <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User className="w-4 h-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-700">{userName}</p>
              <p className="text-xs text-slate-500">{userDept}</p>
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
