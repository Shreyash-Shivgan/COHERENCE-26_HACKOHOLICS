// import { useState, useEffect } from 'react';
// import {
//   User, Lock, MapPin, Bell, Shield, Palette, Globe,
//   Download, Trash2, LogOut, ChevronRight, Check,
//   Eye, EyeOff, Smartphone, Mail, Camera, Info,
//   AlertTriangle, Moon, Sun, Monitor, FileText, ExternalLink,
//   ToggleLeft, ToggleRight, Save, RotateCcw
// } from 'lucide-react';
// import { INDIAN_STATES, getDistrictsForState } from '../data/indiaData';
// import { useNavigate } from 'react-router-dom';

// // ── Types ─────────────────────────────────────────────
// interface SettingsState {
//   // Account
//   name: string;
//   email: string;
//   phone: string;
//   // Location
//   defaultState: string;
//   defaultDistrict: string;
//   autoDetectLocation: boolean;
//   // Notifications
//   reportStatusAlerts: boolean;
//   anomalyAlerts: 'none' | 'high_only' | 'all';
//   weeklyDigest: boolean;
//   emailNotifications: boolean;
//   smsNotifications: boolean;
//   // Privacy
//   publicReports: boolean;
//   // Display
//   theme: 'light' | 'dark' | 'system';
//   language: string;
//   density: 'compact' | 'comfortable';
// }

// const DEFAULT_SETTINGS: SettingsState = {
//   name: '',
//   email: '',
//   phone: '',
//   defaultState: '',
//   defaultDistrict: '',
//   autoDetectLocation: false,
//   reportStatusAlerts: true,
//   anomalyAlerts: 'high_only',
//   weeklyDigest: true,
//   emailNotifications: true,
//   smsNotifications: false,
//   publicReports: true,
//   theme: 'light',
//   language: 'en',
//   density: 'comfortable',
// };

// const LANGUAGES = [
//   { code: 'en', label: 'English' },
//   { code: 'hi', label: 'हिन्दी (Hindi)' },
//   { code: 'mr', label: 'मराठी (Marathi)' },
//   { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
//   { code: 'ta', label: 'தமிழ் (Tamil)' },
//   { code: 'te', label: 'తెలుగు (Telugu)' },
//   { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
//   { code: 'bn', label: 'বাংলা (Bengali)' },
//   { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
// ];

// // ── Sub components ────────────────────────────────────

// const SectionHeader = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
//   <div className="flex items-start gap-3 mb-6">
//     <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//       <Icon className="w-4.5 h-4.5 text-blue-600" size={18} />
//     </div>
//     <div>
//       <h3 className="text-base font-semibold text-slate-800">{title}</h3>
//       <p className="text-sm text-slate-500 mt-0.5">{description}</p>
//     </div>
//   </div>
// );

// const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
//   <button
//     onClick={() => onChange(!checked)}
//     className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
//   >
//     <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
//   </button>
// );

// const FieldLabel = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
//   <label className="block text-sm font-medium text-slate-700 mb-1.5">
//     {children}
//     {hint && <span className="ml-1.5 text-xs text-slate-400 font-normal">{hint}</span>}
//   </label>
// );

// const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
//   <input
//     {...props}
//     className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
//   />
// );

// const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
//   <select
//     {...props}
//     className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//   >
//     {children}
//   </select>
// );

// const SaveToast = ({ show }: { show: boolean }) => (
//   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-lg text-sm font-medium transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
//     <Check size={16} />
//     Settings saved successfully
//   </div>
// );

// const DangerButton = ({ icon: Icon, label, onClick, confirm }: { icon: React.ElementType; label: string; onClick: () => void; confirm?: string }) => {
//   const [confirming, setConfirming] = useState(false);
//   const handleClick = () => {
//     if (confirm && !confirming) { setConfirming(true); setTimeout(() => setConfirming(false), 3000); return; }
//     onClick();
//     setConfirming(false);
//   };
//   return (
//     <button onClick={handleClick} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${confirming ? 'bg-red-600 border-red-600 text-white' : 'border-red-200 text-red-600 hover:bg-red-50'}`}>
//       <Icon size={15} />
//       {confirming ? `Click again to ${confirm}` : label}
//     </button>
//   );
// };

// // ── NAV ITEMS ─────────────────────────────────────────
// const NAV_ITEMS = [
//   { id: 'account',       label: 'Account',            icon: User },
//   { id: 'location',      label: 'Location',           icon: MapPin },
//   { id: 'notifications', label: 'Notifications',      icon: Bell },
//   { id: 'privacy',       label: 'Privacy & Data',     icon: Shield },
//   { id: 'display',       label: 'Display',            icon: Palette },
//   { id: 'about',         label: 'About & Legal',      icon: Info },
// ];

// // ── MAIN SETTINGS PAGE ────────────────────────────────
// export default function Settings() {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState('account');
//   const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
//   const [showToast, setShowToast] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordSuccess, setPasswordSuccess] = useState(false);
//   const [reportCount, setReportCount] = useState(0);

//   // Load saved settings + profile data
//   useEffect(() => {
//     const saved = localStorage.getItem('govflow_settings');
//     const parsed = saved ? JSON.parse(saved) : {};
//     const profileState = localStorage.getItem('profileState') || '';
//     const profileDistrict = localStorage.getItem('profileDistrict') || '';
//     const userName = localStorage.getItem('govflow_user_name') || '';
//     const userEmail = localStorage.getItem('govflow_user_email') || '';

//     setSettings({
//       ...DEFAULT_SETTINGS,
//       ...parsed,
//       defaultState: parsed.defaultState || profileState,
//       defaultDistrict: parsed.defaultDistrict || profileDistrict,
//       name: parsed.name || userName,
//       email: parsed.email || userEmail,
//     });

//     const reports = JSON.parse(localStorage.getItem('govflow_citizen_reports') || '[]');
//     setReportCount(reports.length);
//   }, []);

//   const set = <K extends keyof SettingsState>(key: K, val: SettingsState[K]) => {
//     setSettings(prev => ({ ...prev, [key]: val }));
//   };

//   const save = () => {
//     localStorage.setItem('govflow_settings', JSON.stringify(settings));
//     // Sync location back to profile keys used by Dashboard/FlowTracker
//     if (settings.defaultState) localStorage.setItem('profileState', settings.defaultState);
//     if (settings.defaultDistrict) localStorage.setItem('profileDistrict', settings.defaultDistrict);
//     if (settings.name) localStorage.setItem('govflow_user_name', settings.name);
//     if (settings.email) localStorage.setItem('govflow_user_email', settings.email);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 2500);
//   };

//   const handlePasswordChange = () => {
//     setPasswordError('');
//     setPasswordSuccess(false);
//     if (!currentPassword) { setPasswordError('Enter your current password.'); return; }
//     if (newPassword.length < 8) { setPasswordError('New password must be at least 8 characters.'); return; }
//     if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match.'); return; }
//     // Simulate success
//     setPasswordSuccess(true);
//     setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
//     setTimeout(() => setPasswordSuccess(false), 3000);
//   };

//   const handleDeleteAllReports = () => {
//     localStorage.removeItem('govflow_citizen_reports');
//     setReportCount(0);
//   };

//   const handleDownloadData = () => {
//     const reports = JSON.parse(localStorage.getItem('govflow_citizen_reports') || '[]');
//     const data = { settings, reports, exportedAt: new Date().toISOString() };
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a'); a.href = url; a.download = 'govflow_my_data.json'; a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('govflow_auth');
//     navigate('/login');
//   };

//   const handleDeleteAccount = () => {
//     ['govflow_auth', 'govflow_settings', 'govflow_citizen_reports', 'profileState', 'profileDistrict', 'govflow_user_name', 'govflow_user_email'].forEach(k => localStorage.removeItem(k));
//     navigate('/login');
//   };

//   const districtOptions = settings.defaultState ? getDistrictsForState(settings.defaultState) : [];

//   // ── Render sections ───────────────────────────────
//   const renderSection = () => {
//     switch (activeSection) {

//       case 'account':
//         return (
//           <div className="space-y-8">
//             <SectionHeader icon={User} title="Account & Identity" description="Manage your personal information and login credentials." />

//             {/* Profile photo */}
//             <div className="flex items-center gap-5">
//               <div className="relative">
//                 <div className="w-18 h-18 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white w-[72px] h-[72px]">
//                   {settings.name ? settings.name[0].toUpperCase() : '?'}
//                 </div>
//                 <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors">
//                   <Camera size={13} />
//                 </button>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-slate-800">{settings.name || 'Not set'}</p>
//                 <p className="text-xs text-slate-500 mt-0.5">Citizen Account</p>
//                 <p className="text-xs text-blue-600 mt-1 cursor-pointer hover:underline">Change photo</p>
//               </div>
//             </div>

//             {/* Personal info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <FieldLabel>Full Name</FieldLabel>
//                 <Input value={settings.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
//               </div>
//               <div>
//                 <FieldLabel>Email Address</FieldLabel>
//                 <div className="relative">
//                   <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <Input value={settings.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" className="pl-8" style={{ paddingLeft: '2rem' }} />
//                 </div>
//               </div>
//               <div>
//                 <FieldLabel hint="(optional)">Mobile Number</FieldLabel>
//                 <div className="relative">
//                   <Smartphone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <Input value={settings.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" style={{ paddingLeft: '2rem' }} />
//                 </div>
//               </div>
//             </div>

//             {/* Change password */}
//             <div className="border-t border-slate-100 pt-6">
//               <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2"><Lock size={14} /> Change Password</h4>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <FieldLabel>Current Password</FieldLabel>
//                   <div className="relative">
//                     <Input type={showPassword ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" />
//                     <button onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                       {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <FieldLabel>New Password</FieldLabel>
//                   <Input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 8 characters" />
//                 </div>
//                 <div>
//                   <FieldLabel>Confirm Password</FieldLabel>
//                   <Input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" />
//                 </div>
//               </div>
//               {passwordError && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertTriangle size={12} />{passwordError}</p>}
//               {passwordSuccess && <p className="mt-2 text-xs text-emerald-600 flex items-center gap-1"><Check size={12} />Password updated successfully.</p>}
//               <button onClick={handlePasswordChange} className="mt-3 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors font-medium">
//                 Update Password
//               </button>
//             </div>

//             {/* Danger zone */}
//             <div className="border-t border-slate-100 pt-6">
//               <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2"><AlertTriangle size={14} /> Danger Zone</h4>
//               <div className="flex flex-wrap gap-3">
//                 <DangerButton icon={LogOut} label="Logout" onClick={handleLogout} />
//                 <DangerButton icon={Trash2} label="Delete Account" onClick={handleDeleteAccount} confirm="delete account" />
//               </div>
//             </div>
//           </div>
//         );

//       case 'location':
//         return (
//           <div className="space-y-6">
//             <SectionHeader icon={MapPin} title="Location Preferences" description="Set your default state and district. The dashboard and flow tracker will use this as the default view." />

//             <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 flex items-start gap-2">
//               <Info size={16} className="flex-shrink-0 mt-0.5" />
//               Changes here automatically sync to your Profile page and update dashboard defaults.
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <FieldLabel>Default State / UT</FieldLabel>
//                 <Select
//                   value={settings.defaultState}
//                   onChange={e => { set('defaultState', e.target.value); set('defaultDistrict', ''); }}
//                 >
//                   <option value="">Select State / UT</option>
//                   {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
//                 </Select>
//               </div>
//               <div>
//                 <FieldLabel>Default District / City</FieldLabel>
//                 <Select
//                   value={settings.defaultDistrict}
//                   onChange={e => set('defaultDistrict', e.target.value)}
//                   disabled={!settings.defaultState}
//                 >
//                   <option value="">
//                     {settings.defaultState ? 'Select District' : 'Select state first'}
//                   </option>
//                   {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
//                 </Select>
//               </div>
//             </div>

//             <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
//               <div>
//                 <p className="text-sm font-medium text-slate-800">Auto-detect Location</p>
//                 <p className="text-xs text-slate-500 mt-0.5">Use your device GPS to set location automatically on login</p>
//               </div>
//               <Toggle checked={settings.autoDetectLocation} onChange={v => set('autoDetectLocation', v)} />
//             </div>

//             {settings.defaultState && settings.defaultDistrict && (
//               <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
//                 <p className="text-sm font-medium text-emerald-700">Current default location</p>
//                 <p className="text-base font-semibold text-emerald-800 mt-1">{settings.defaultDistrict}, {settings.defaultState}</p>
//               </div>
//             )}
//           </div>
//         );

//       case 'notifications':
//         return (
//           <div className="space-y-6">
//             <SectionHeader icon={Bell} title="Notifications & Alerts" description="Control what updates you receive about your reports and your district's fund activity." />

//             {/* Delivery methods */}
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Delivery Methods</p>
//               <div className="space-y-3">
//                 {[
//                   { key: 'emailNotifications' as const, icon: Mail, label: 'Email Notifications', sub: settings.email || 'No email set' },
//                   { key: 'smsNotifications' as const, icon: Smartphone, label: 'SMS Notifications', sub: settings.phone || 'No phone set' },
//                 ].map(item => (
//                   <div key={item.key} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
//                     <div className="flex items-center gap-3">
//                       <item.icon size={16} className="text-slate-400" />
//                       <div>
//                         <p className="text-sm font-medium text-slate-800">{item.label}</p>
//                         <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
//                       </div>
//                     </div>
//                     <Toggle checked={settings[item.key] as boolean} onChange={v => set(item.key, v)} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Alert types */}
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Alert Types</p>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
//                   <div>
//                     <p className="text-sm font-medium text-slate-800">Report Status Updates</p>
//                     <p className="text-xs text-slate-500 mt-0.5">Notify when your filed reports are reviewed, acknowledged, or resolved</p>
//                   </div>
//                   <Toggle checked={settings.reportStatusAlerts} onChange={v => set('reportStatusAlerts', v)} />
//                 </div>

//                 <div className="p-4 bg-white border border-slate-200 rounded-xl">
//                   <p className="text-sm font-medium text-slate-800 mb-3">Anomaly Alerts for Your District</p>
//                   <div className="space-y-2">
//                     {([
//                       { val: 'none', label: 'No anomaly alerts' },
//                       { val: 'high_only', label: 'High severity only' },
//                       { val: 'all', label: 'All anomalies (High + Medium)' },
//                     ] as const).map(opt => (
//                       <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer">
//                         <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${settings.anomalyAlerts === opt.val ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
//                           {settings.anomalyAlerts === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                         </div>
//                         <span className="text-sm text-slate-700">{opt.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
//                   <div>
//                     <p className="text-sm font-medium text-slate-800">Weekly District Digest</p>
//                     <p className="text-xs text-slate-500 mt-0.5">Summary of fund activity, new projects, and anomaly count in your area</p>
//                   </div>
//                   <Toggle checked={settings.weeklyDigest} onChange={v => set('weeklyDigest', v)} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'privacy':
//         return (
//           <div className="space-y-6">
//             <SectionHeader icon={Shield} title="Privacy & Data" description="Control your public visibility, and manage or export your data." />

//             <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
//               <div>
//                 <p className="text-sm font-medium text-slate-800">Public Reports</p>
//                 <p className="text-xs text-slate-500 mt-0.5">When ON, your name appears on public reports you file. When OFF, reports appear as anonymous.</p>
//               </div>
//               <Toggle checked={settings.publicReports} onChange={v => set('publicReports', v)} />
//             </div>

//             {/* Data summary */}
//             <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
//               <p className="text-sm font-semibold text-slate-700 mb-3">Your Data</p>
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div className="bg-white rounded-lg p-3 border border-slate-200">
//                   <p className="text-xs text-slate-500">Reports Filed</p>
//                   <p className="text-lg font-bold text-slate-800 mt-1">{reportCount}</p>
//                 </div>
//                 <div className="bg-white rounded-lg p-3 border border-slate-200">
//                   <p className="text-xs text-slate-500">Data stored</p>
//                   <p className="text-lg font-bold text-slate-800 mt-1">Local only</p>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="space-y-3">
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Data Actions</p>

//               <button onClick={handleDownloadData} className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/40 transition-all group">
//                 <div className="flex items-center gap-3">
//                   <Download size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
//                   <div className="text-left">
//                     <p className="text-sm font-medium text-slate-800">Download My Data</p>
//                     <p className="text-xs text-slate-500">Export settings + all reports as JSON</p>
//                   </div>
//                 </div>
//                 <ChevronRight size={16} className="text-slate-400" />
//               </button>

//               <div className="p-4 bg-white border border-red-100 rounded-xl">
//                 <p className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-2"><AlertTriangle size={14} />Danger Zone</p>
//                 <div className="flex flex-wrap gap-3">
//                   <DangerButton icon={Trash2} label={`Delete All Reports (${reportCount})`} onClick={handleDeleteAllReports} confirm="delete all" />
//                   <DangerButton icon={RotateCcw} label="Reset All Settings" onClick={() => setSettings(DEFAULT_SETTINGS)} confirm="reset all" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'display':
//         return (
//           <div className="space-y-6">
//             <SectionHeader icon={Palette} title="Display Preferences" description="Personalise how the app looks and behaves." />

//             {/* Theme */}
//             <div>
//               <FieldLabel>Theme</FieldLabel>
//               <div className="grid grid-cols-3 gap-3">
//                 {([
//                   { val: 'light', icon: Sun, label: 'Light' },
//                   { val: 'dark', icon: Moon, label: 'Dark' },
//                   { val: 'system', icon: Monitor, label: 'System' },
//                 ] as const).map(opt => (
//                   <button
//                     key={opt.val}
//                     onClick={() => set('theme', opt.val)}
//                     className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${settings.theme === opt.val ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
//                   >
//                     <opt.icon size={20} className={settings.theme === opt.val ? 'text-blue-600' : 'text-slate-400'} />
//                     <span className={`text-sm font-medium ${settings.theme === opt.val ? 'text-blue-700' : 'text-slate-600'}`}>{opt.label}</span>
//                     {settings.theme === opt.val && <Check size={12} className="text-blue-600" />}
//                   </button>
//                 ))}
//               </div>
//               <p className="text-xs text-slate-400 mt-2">Dark mode is coming soon. Selecting it will apply once available.</p>
//             </div>

//             {/* Language */}
//             <div>
//               <FieldLabel>Language</FieldLabel>
//               <Select value={settings.language} onChange={e => set('language', e.target.value)}>
//                 {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
//               </Select>
//               <p className="text-xs text-slate-400 mt-1.5">Full regional language support is coming in a future update.</p>
//             </div>

//             {/* Density */}
//             <div>
//               <FieldLabel>View Density</FieldLabel>
//               <div className="grid grid-cols-2 gap-3">
//                 {([
//                   { val: 'comfortable', label: 'Comfortable', sub: 'More spacing, easier to read' },
//                   { val: 'compact', label: 'Compact', sub: 'More data, less scrolling' },
//                 ] as const).map(opt => (
//                   <button
//                     key={opt.val}
//                     onClick={() => set('density', opt.val)}
//                     className={`text-left p-4 rounded-xl border-2 transition-all ${settings.density === opt.val ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
//                   >
//                     <div className="flex items-center justify-between mb-1">
//                       <span className={`text-sm font-semibold ${settings.density === opt.val ? 'text-blue-700' : 'text-slate-700'}`}>{opt.label}</span>
//                       {settings.density === opt.val && <Check size={14} className="text-blue-600" />}
//                     </div>
//                     <p className="text-xs text-slate-500">{opt.sub}</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 'about':
//         return (
//           <div className="space-y-6">
//             <SectionHeader icon={Info} title="About & Legal" description="App information, version details, and legal documents." />

//             {/* App info card */}
//             <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">G</div>
//                 <div>
//                   <p className="font-bold text-base">GovFlow</p>
//                   <p className="text-xs text-blue-200">National Budget Flow Intelligence Platform</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 gap-3 mt-4">
//                 {[
//                   { label: 'Version', value: '1.0.0' },
//                   { label: 'Build', value: '2025.1' },
//                   { label: 'Track', value: 'Smart Gov' },
//                 ].map(item => (
//                   <div key={item.label} className="bg-white/10 rounded-lg p-2.5 text-center">
//                     <p className="text-xs text-blue-200">{item.label}</p>
//                     <p className="text-sm font-bold mt-0.5">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Links */}
//             <div className="space-y-2">
//               {[
//                 { icon: FileText, label: 'Terms of Service', sub: 'Citizen usage guidelines' },
//                 { icon: Shield, label: 'Privacy Policy', sub: 'How your data is handled' },
//                 { icon: FileText, label: 'Grievance Officer', sub: 'Official: complaints@govflow.in' },
//                 { icon: ExternalLink, label: 'Open Source Licences', sub: 'Third-party libraries used' },
//               ].map((item, i) => (
//                 <button key={i} className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
//                   <div className="flex items-center gap-3">
//                     <item.icon size={16} className="text-slate-400" />
//                     <div className="text-left">
//                       <p className="text-sm font-medium text-slate-800">{item.label}</p>
//                       <p className="text-xs text-slate-500">{item.sub}</p>
//                     </div>
//                   </div>
//                   <ChevronRight size={15} className="text-slate-400" />
//                 </button>
//               ))}
//             </div>

//             {/* Tech stack */}
//             <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Built With</p>
//               <div className="flex flex-wrap gap-2">
//                 {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'FastAPI', 'SQLite', 'Scikit-learn', 'Ollama'].map(tech => (
//                   <span key={tech} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">{tech}</span>
//                 ))}
//               </div>
//             </div>

//             <p className="text-xs text-center text-slate-400">
//               Built for Smart Governance & Public Platforms Track · Hackathon 2025
//             </p>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto">
//       {/* Page header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
//         <p className="text-slate-500 text-sm mt-1">Manage your account, location defaults, notifications, and preferences</p>
//       </div>

//       <div className="flex gap-6 items-start">
//         {/* Left nav */}
//         <aside className="w-56 flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-4">
//           <div className="p-3 space-y-0.5">
//             {NAV_ITEMS.map(item => {
//               const active = activeSection === item.id;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveSection(item.id)}
//                   className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
//                 >
//                   <item.icon size={15} className={active ? 'text-blue-600' : 'text-slate-400'} />
//                   {item.label}
//                   {active && <ChevronRight size={13} className="ml-auto text-blue-400" />}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Save button pinned in sidebar */}
//           {activeSection !== 'about' && (
//             <div className="p-3 border-t border-slate-100">
//               <button
//                 onClick={save}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
//               >
//                 <Save size={14} />
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 min-h-[500px]">
//           {renderSection()}
//         </main>
//       </div>

//       {/* Toast */}
//       <SaveToast show={showToast} />
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import {
  User, Lock, MapPin, Bell, Shield, Palette,
  Download, Trash2, LogOut, ChevronRight, Check,
  Eye, EyeOff, Smartphone, Mail, Camera, Info,
  AlertTriangle, Moon, Sun, Monitor, FileText, ExternalLink,
  Save, RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Self-contained India geography data ───────────────
const INDIA_DISTRICTS: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Tirupati","Kurnool","Nellore","Kakinada","Rajahmundry","Kadapa","Anantapur"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Pasighat","Tawang","Ziro"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Nagaon","Tinsukia","Tezpur"],
  "Bihar": ["Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga","Purnia","Arrah","Bihar Sharif"],
  "Chhattisgarh": ["Raipur","Bhilai","Korba","Bilaspur","Durg","Rajnandgaon"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Junagadh","Anand"],
  "Haryana": ["Faridabad","Gurugram","Panipat","Ambala","Yamunanagar","Rohtak","Hisar","Karnal"],
  "Himachal Pradesh": ["Shimla","Dharamsala","Solan","Mandi","Kullu","Hamirpur"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Hazaribagh"],
  "Karnataka": ["Bengaluru","Mysuru","Hubli","Mangaluru","Belagavi","Kalaburagi","Ballari","Davangere"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Palakkad","Alappuzha","Malappuram"],
  "Madhya Pradesh": ["Bhopal","Indore","Gwalior","Jabalpur","Ujjain","Sagar","Ratlam","Satna"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Thane","Aurangabad","Solapur","Kolhapur","Ahmednagar","Nanded"],
  "Manipur": ["Imphal","Thoubal","Bishnupur","Churachandpur"],
  "Meghalaya": ["Shillong","Tura","Jowai","Nongpoh"],
  "Mizoram": ["Aizawl","Lunglei","Champhai","Serchhip"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore"],
  "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Firozpur"],
  "Rajasthan": ["Jaipur","Jodhpur","Udaipur","Kota","Ajmer","Bikaner","Bhilwara","Alwar"],
  "Sikkim": ["Gangtok","Namchi","Mangan","Gyalshing"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Salem","Tiruchirappalli","Tirunelveli","Vellore","Erode"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Ramagundam","Nalgonda"],
  "Tripura": ["Agartala","Udaipur","Dharmanagar","Kailashahar"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Agra","Varanasi","Meerut","Allahabad","Bareilly","Aligarh","Moradabad","Gorakhpur"],
  "Uttarakhand": ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Kashipur"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Malda","Bardhaman"],
  "Andaman and Nicobar Islands": ["Port Blair","Diglipur","Car Nicobar"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman","Diu","Silvassa"],
  "Delhi": ["New Delhi","North Delhi","South Delhi","East Delhi","West Delhi","Central Delhi","Dwarka","Rohini"],
  "Jammu and Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla","Udhampur","Kathua"],
  "Ladakh": ["Leh","Kargil"],
  "Lakshadweep": ["Kavaratti","Agatti","Minicoy"],
  "Puducherry": ["Puducherry","Karaikal","Mahe","Yanam"],
};

const INDIAN_STATES: string[] = Object.keys(INDIA_DISTRICTS).sort();

function getDistrictsForState(state: string): string[] {
  return INDIA_DISTRICTS[state] ?? [];
}

// ── Types ─────────────────────────────────────────────
interface SettingsState {
  name: string;
  email: string;
  phone: string;
  defaultState: string;
  defaultDistrict: string;
  autoDetectLocation: boolean;
  reportStatusAlerts: boolean;
  anomalyAlerts: 'none' | 'high_only' | 'all';
  weeklyDigest: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  publicReports: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  density: 'compact' | 'comfortable';
}

const DEFAULT_SETTINGS: SettingsState = {
  name: '',
  email: '',
  phone: '',
  defaultState: '',
  defaultDistrict: '',
  autoDetectLocation: false,
  reportStatusAlerts: true,
  anomalyAlerts: 'high_only',
  weeklyDigest: true,
  emailNotifications: true,
  smsNotifications: false,
  publicReports: true,
  theme: 'light',
  language: 'en',
  density: 'comfortable',
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
];

// ── Sub-components ────────────────────────────────────
const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
      <Icon size={18} className="text-blue-600" />
    </div>
    <div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-0.5">{description}</p>
    </div>
  </div>
);

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
      checked ? 'bg-blue-600' : 'bg-slate-200'
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const FieldLabel = ({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) => (
  <label className="block text-sm font-medium text-slate-700 mb-1.5">
    {children}
    {hint && (
      <span className="ml-1.5 text-xs text-slate-400 font-normal">{hint}</span>
    )}
  </label>
);

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
  />
);

const StyledSelect = ({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
  >
    {children}
  </select>
);

const SaveToast = ({ show }: { show: boolean }) => (
  <div
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-lg text-sm font-medium transition-all duration-300 ${
      show
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-2 pointer-events-none'
    }`}
  >
    <Check size={16} />
    Settings saved successfully
  </div>
);

const DangerButton = ({
  icon: Icon,
  label,
  onClick,
  confirm,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  confirm?: string;
}) => {
  const [confirming, setConfirming] = useState(false);
  const handleClick = () => {
    if (confirm && !confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    onClick();
    setConfirming(false);
  };
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
        confirming
          ? 'bg-red-600 border-red-600 text-white'
          : 'border-red-200 text-red-600 hover:bg-red-50'
      }`}
    >
      <Icon size={15} />
      {confirming ? `Click again to ${confirm}` : label}
    </button>
  );
};

// ── Nav items ─────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'account',       label: 'Account',        icon: User    },
  { id: 'location',      label: 'Location',       icon: MapPin  },
  { id: 'notifications', label: 'Notifications',  icon: Bell    },
  { id: 'privacy',       label: 'Privacy & Data', icon: Shield  },
  { id: 'display',       label: 'Display',        icon: Palette },
  { id: 'about',         label: 'About & Legal',  icon: Info    },
];

// ── Main page ─────────────────────────────────────────
export default function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('govflow_settings');
    const parsed: Partial<SettingsState> = saved ? JSON.parse(saved) : {};
    const profileState    = localStorage.getItem('profileState')       ?? '';
    const profileDistrict = localStorage.getItem('profileDistrict')    ?? '';
    const userName        = localStorage.getItem('govflow_user_name')  ?? '';
    const userEmail       = localStorage.getItem('govflow_user_email') ?? '';

    setSettings({
      ...DEFAULT_SETTINGS,
      ...parsed,
      defaultState:    parsed.defaultState    || profileState,
      defaultDistrict: parsed.defaultDistrict || profileDistrict,
      name:            parsed.name            || userName,
      email:           parsed.email           || userEmail,
    });

    const reports = JSON.parse(
      localStorage.getItem('govflow_citizen_reports') ?? '[]'
    ) as unknown[];
    setReportCount(reports.length);
  }, []);

  const set = <K extends keyof SettingsState>(key: K, val: SettingsState[K]) =>
    setSettings(prev => ({ ...prev, [key]: val }));

  const save = () => {
    localStorage.setItem('govflow_settings', JSON.stringify(settings));
    if (settings.defaultState)    localStorage.setItem('profileState',       settings.defaultState);
    if (settings.defaultDistrict) localStorage.setItem('profileDistrict',    settings.defaultDistrict);
    if (settings.name)            localStorage.setItem('govflow_user_name',  settings.name);
    if (settings.email)           localStorage.setItem('govflow_user_email', settings.email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    setPasswordSuccess(false);
    if (!currentPassword)               { setPasswordError('Enter your current password.'); return; }
    if (newPassword.length < 8)         { setPasswordError('New password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match.'); return; }
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleDeleteAllReports = () => {
    localStorage.removeItem('govflow_citizen_reports');
    setReportCount(0);
  };

  const handleDownloadData = () => {
    const reports = JSON.parse(localStorage.getItem('govflow_citizen_reports') ?? '[]');
    const data = { settings, reports, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'govflow_my_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem('govflow_auth');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    [
      'govflow_auth', 'govflow_settings', 'govflow_citizen_reports',
      'profileState', 'profileDistrict', 'govflow_user_name', 'govflow_user_email',
    ].forEach(k => localStorage.removeItem(k));
    navigate('/login');
  };

  const districtOptions: string[] = settings.defaultState
    ? getDistrictsForState(settings.defaultState)
    : [];

  // ── Section renderers ─────────────────────────────
  const renderSection = () => {
    switch (activeSection) {

      case 'account':
        return (
          <div className="space-y-8">
            <SectionHeader
              icon={User}
              title="Account & Identity"
              description="Manage your personal information and login credentials."
            />

            {/* Avatar */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                  {settings.name ? settings.name[0].toUpperCase() : '?'}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors">
                  <Camera size={13} />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{settings.name || 'Not set'}</p>
                <p className="text-xs text-slate-500 mt-0.5">Citizen Account</p>
              </div>
            </div>

            {/* Personal info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FieldLabel>Full Name</FieldLabel>
                <StyledInput
                  value={settings.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <FieldLabel>Email Address</FieldLabel>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <StyledInput
                    value={settings.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="email@example.com"
                    style={{ paddingLeft: '2rem' }}
                  />
                </div>
              </div>
              <div>
                <FieldLabel hint="(optional)">Mobile Number</FieldLabel>
                <div className="relative">
                  <Smartphone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <StyledInput
                    value={settings.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{ paddingLeft: '2rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Change password */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Lock size={14} /> Change Password
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FieldLabel>Current Password</FieldLabel>
                  <div className="relative">
                    <StyledInput
                      type={showPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <button
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <FieldLabel>New Password</FieldLabel>
                  <StyledInput
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <StyledInput
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                </div>
              </div>
              {passwordError && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle size={12} />{passwordError}
                </p>
              )}
              {passwordSuccess && (
                <p className="mt-2 text-xs text-emerald-600 flex items-center gap-1">
                  <Check size={12} />Password updated successfully.
                </p>
              )}
              <button
                onClick={handlePasswordChange}
                className="mt-3 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Update Password
              </button>
            </div>

            {/* Danger zone */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                <AlertTriangle size={14} /> Danger Zone
              </h4>
              <div className="flex flex-wrap gap-3">
                <DangerButton icon={LogOut} label="Logout" onClick={handleLogout} />
                <DangerButton
                  icon={Trash2}
                  label="Delete Account"
                  onClick={handleDeleteAccount}
                  confirm="delete account"
                />
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <SectionHeader
              icon={MapPin}
              title="Location Preferences"
              description="Set your default state and district. The dashboard and flow tracker will use this as the default view."
            />

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 flex items-start gap-2">
              <Info size={16} className="flex-shrink-0 mt-0.5" />
              Changes here automatically sync to your Profile page and update dashboard defaults.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FieldLabel>Default State / UT</FieldLabel>
                <StyledSelect
                  value={settings.defaultState}
                  onChange={e => {
                    set('defaultState', e.target.value);
                    set('defaultDistrict', '');
                  }}
                >
                  <option value="">Select State / UT</option>
                  {INDIAN_STATES.map((s: string) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </StyledSelect>
              </div>
              <div>
                <FieldLabel>Default District / City</FieldLabel>
                <StyledSelect
                  value={settings.defaultDistrict}
                  onChange={e => set('defaultDistrict', e.target.value)}
                  disabled={!settings.defaultState}
                >
                  <option value="">
                    {settings.defaultState ? 'Select District' : 'Select state first'}
                  </option>
                  {districtOptions.map((d: string) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </StyledSelect>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-800">Auto-detect Location</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Use your device GPS to set location automatically on login
                </p>
              </div>
              <Toggle
                checked={settings.autoDetectLocation}
                onChange={v => set('autoDetectLocation', v)}
              />
            </div>

            {settings.defaultState && settings.defaultDistrict && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-sm font-medium text-emerald-700">Current default location</p>
                <p className="text-base font-semibold text-emerald-800 mt-1">
                  {settings.defaultDistrict}, {settings.defaultState}
                </p>
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <SectionHeader
              icon={Bell}
              title="Notifications & Alerts"
              description="Control what updates you receive about your reports and your district's fund activity."
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Delivery Methods
              </p>
              <div className="space-y-3">
                {(
                  [
                    { key: 'emailNotifications' as const, icon: Mail,       label: 'Email Notifications', sub: settings.email || 'No email set'  },
                    { key: 'smsNotifications'   as const, icon: Smartphone, label: 'SMS Notifications',   sub: settings.phone || 'No phone set'  },
                  ]
                ).map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <item.icon size={16} className="text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                    <Toggle
                      checked={settings[item.key]}
                      onChange={v => set(item.key, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Alert Types
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Report Status Updates</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Notify when your filed reports are reviewed, acknowledged, or resolved
                    </p>
                  </div>
                  <Toggle
                    checked={settings.reportStatusAlerts}
                    onChange={v => set('reportStatusAlerts', v)}
                  />
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                  <p className="text-sm font-medium text-slate-800 mb-3">
                    Anomaly Alerts for Your District
                  </p>
                  <div className="space-y-2">
                    {(
                      [
                        { val: 'none'      as const, label: 'No anomaly alerts'              },
                        { val: 'high_only' as const, label: 'High severity only'              },
                        { val: 'all'       as const, label: 'All anomalies (High + Medium)'  },
                      ]
                    ).map(opt => (
                      <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            settings.anomalyAlerts === opt.val
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-slate-300'
                          }`}
                        >
                          {settings.anomalyAlerts === opt.val && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-sm text-slate-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Weekly District Digest</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Summary of fund activity, new projects, and anomaly count in your area
                    </p>
                  </div>
                  <Toggle
                    checked={settings.weeklyDigest}
                    onChange={v => set('weeklyDigest', v)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <SectionHeader
              icon={Shield}
              title="Privacy & Data"
              description="Control your public visibility, and manage or export your data."
            />

            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-800">Public Reports</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  When ON, your name appears on public reports you file. When OFF, reports appear as anonymous.
                </p>
              </div>
              <Toggle
                checked={settings.publicReports}
                onChange={v => set('publicReports', v)}
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-sm font-semibold text-slate-700 mb-3">Your Data</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-500">Reports Filed</p>
                  <p className="text-lg font-bold text-slate-800 mt-1">{reportCount}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-500">Storage</p>
                  <p className="text-lg font-bold text-slate-800 mt-1">Local only</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Data Actions
              </p>

              <button
                onClick={handleDownloadData}
                className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Download size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-slate-800">Download My Data</p>
                    <p className="text-xs text-slate-500">Export settings + all reports as JSON</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <div className="p-4 bg-white border border-red-100 rounded-xl">
                <p className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-2">
                  <AlertTriangle size={14} />Danger Zone
                </p>
                <div className="flex flex-wrap gap-3">
                  <DangerButton
                    icon={Trash2}
                    label={`Delete All Reports (${reportCount})`}
                    onClick={handleDeleteAllReports}
                    confirm="delete all"
                  />
                  <DangerButton
                    icon={RotateCcw}
                    label="Reset All Settings"
                    onClick={() => setSettings(DEFAULT_SETTINGS)}
                    confirm="reset all"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'display':
        return (
          <div className="space-y-6">
            <SectionHeader
              icon={Palette}
              title="Display Preferences"
              description="Personalise how the app looks and behaves."
            />

            <div>
              <FieldLabel>Theme</FieldLabel>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { val: 'light'  as const, icon: Sun,     label: 'Light'  },
                    { val: 'dark'   as const, icon: Moon,    label: 'Dark'   },
                    { val: 'system' as const, icon: Monitor, label: 'System' },
                  ]
                ).map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => set('theme', opt.val)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      settings.theme === opt.val
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <opt.icon
                      size={20}
                      className={settings.theme === opt.val ? 'text-blue-600' : 'text-slate-400'}
                    />
                    <span className={`text-sm font-medium ${settings.theme === opt.val ? 'text-blue-700' : 'text-slate-600'}`}>
                      {opt.label}
                    </span>
                    {settings.theme === opt.val && <Check size={12} className="text-blue-600" />}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Dark mode is coming soon. Selecting it will apply once available.
              </p>
            </div>

            <div>
              <FieldLabel>Language</FieldLabel>
              <StyledSelect
                value={settings.language}
                onChange={e => set('language', e.target.value)}
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </StyledSelect>
              <p className="text-xs text-slate-400 mt-1.5">
                Full regional language support is coming in a future update.
              </p>
            </div>

            <div>
              <FieldLabel>View Density</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { val: 'comfortable' as const, label: 'Comfortable', sub: 'More spacing, easier to read' },
                    { val: 'compact'     as const, label: 'Compact',     sub: 'More data, less scrolling'   },
                  ]
                ).map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => set('density', opt.val)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      settings.density === opt.val
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-semibold ${settings.density === opt.val ? 'text-blue-700' : 'text-slate-700'}`}>
                        {opt.label}
                      </span>
                      {settings.density === opt.val && <Check size={14} className="text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-500">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <SectionHeader
              icon={Info}
              title="About & Legal"
              description="App information, version details, and legal documents."
            />

            <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
                  G
                </div>
                <div>
                  <p className="font-bold text-base">GovFlow</p>
                  <p className="text-xs text-blue-200">National Budget Flow Intelligence Platform</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Version', value: '1.0.0'     },
                  { label: 'Build',   value: '2025.1'    },
                  { label: 'Track',   value: 'Smart Gov' },
                ].map(item => (
                  <div key={item.label} className="bg-white/10 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-blue-200">{item.label}</p>
                    <p className="text-sm font-bold mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {[
                { icon: FileText,     label: 'Terms of Service',     sub: 'Citizen usage guidelines'   },
                { icon: Shield,       label: 'Privacy Policy',       sub: 'How your data is handled'   },
                { icon: FileText,     label: 'Grievance Officer',    sub: 'complaints@govflow.in'       },
                { icon: ExternalLink, label: 'Open Source Licences', sub: 'Third-party libraries used' },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className="text-slate-400" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-slate-400" />
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Built With
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'FastAPI', 'SQLite', 'Scikit-learn', 'Ollama'].map(
                  tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <p className="text-xs text-center text-slate-400">
              Built for Smart Governance & Public Platforms Track · Hackathon 2025
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // ── Layout ────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account, location defaults, notifications, and preferences
        </p>
      </div>

      <div className="flex gap-6 items-start">
        {/* Sidebar nav */}
        <aside className="w-56 flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-4">
          <div className="p-3 space-y-0.5">
            {NAV_ITEMS.map(item => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <item.icon size={15} className={active ? 'text-blue-600' : 'text-slate-400'} />
                  {item.label}
                  {active && <ChevronRight size={13} className="ml-auto text-blue-400" />}
                </button>
              );
            })}
          </div>

          {activeSection !== 'about' && (
            <div className="p-3 border-t border-slate-100">
              <button
                onClick={save}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
              >
                <Save size={14} />
                Save Changes
              </button>
            </div>
          )}
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 min-h-[500px]">
          {renderSection()}
        </main>
      </div>

      <SaveToast show={showToast} />
    </div>
  );
}