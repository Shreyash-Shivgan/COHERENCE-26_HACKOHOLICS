// import { useState } from 'react';
// import { 
//   User, Mail, Phone, Building, CreditCard, 
//   MapPin, Camera, Save, ShieldCheck 
// } from 'lucide-react';

// export default function Profile() {
//   const [isSaving, setIsSaving] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: 'Rajesh',
//     lastName: 'Kumar',
//     email: 'rajesh.kumar@gov.in',
//     phone: '+91 98765 43210',
//     aadhaar: 'XXXX XXXX 1234',
//     department: 'Ministry of Finance',
//     designation: 'Senior Nodal Officer',
//     employeeId: 'GOV-FIN-2049',
//     address: 'Block C, Government Quarters',
//     city: 'New Delhi',
//     state: 'Delhi',
//     pincode: '110001'
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);
//     // Mock API call
//     setTimeout(() => {
//       setIsSaving(false);
//     }, 1000);
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-slate-800">User Profile</h2>
//         <p className="text-slate-500">Manage your official identity, contact details, and platform preferences.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Top Section: Avatar & Basic Info */}
//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative group cursor-pointer">
//               <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
//                 <User className="w-16 h-16 text-blue-500" />
//               </div>
//               <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Camera className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <div className="text-center">
//               <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
//                 <ShieldCheck className="w-3.5 h-3.5" />
//                 Verified Official
//               </span>
//             </div>
//           </div>

//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Official Email</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-4 w-4 text-slate-400" />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   disabled
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Phone className="h-4 w-4 text-slate-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Official Details */}
//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
//             <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
//               <Building className="w-5 h-5 text-blue-600" />
//               <h3 className="text-lg font-semibold text-slate-800">Official Details</h3>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Department / Ministry</label>
//                 <input
//                   type="text"
//                   name="department"
//                   value={formData.department}
//                   disabled
//                   className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
//                 <input
//                   type="text"
//                   name="designation"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Employee ID</label>
//                 <input
//                   type="text"
//                   name="employeeId"
//                   value={formData.employeeId}
//                   disabled
//                   className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Identity & Address */}
//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
//             <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
//               <CreditCard className="w-5 h-5 text-blue-600" />
//               <h3 className="text-lg font-semibold text-slate-800">Identity & Location</h3>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Aadhaar Number</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <CreditCard className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="aadhaar"
//                     value={formData.aadhaar}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//                     placeholder="XXXX XXXX XXXX"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Residential Address</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
//                     <MapPin className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={(e) => setFormData({...formData, address: e.target.value})}
//                     rows={2}
//                     className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm resize-none"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="col-span-1">
//                   <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//                   />
//                 </div>
//                 <div className="col-span-1">
//                   <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//                   />
//                 </div>
//                 <div className="col-span-1">
//                   <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end pt-4">
//           <button
//             type="submit"
//             disabled={isSaving}
//             className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
//           >
//             {isSaving ? (
//               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// import { useState } from 'react';
// import { 
//   User, Mail, Phone, Building, CreditCard, 
//   MapPin, Camera, Save, ShieldCheck, CheckCircle2
// } from 'lucide-react';
// import { ALL_STATES, getDistricts } from '../data/indiaData';

// export function getProfileLocation(): { state: string; district: string } {
//   return {
//     state: localStorage.getItem('govflow_state') || 'Maharashtra',
//     district: localStorage.getItem('govflow_district') || 'Mumbai',
//   };
// }

// export default function Profile() {
//   const [isSaving, setIsSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: 'Rajesh',
//     lastName: 'Kumar',
//     email: 'rajesh.kumar@gov.in',
//     phone: '+91 98765 43210',
//     aadhaar: 'XXXX XXXX 1234',
//     department: 'Ministry of Finance',
//     designation: 'Senior Nodal Officer',
//     employeeId: 'GOV-FIN-2049',
//     address: 'Block C, Government Quarters',
//     state: localStorage.getItem('govflow_state') || 'Maharashtra',
//     district: localStorage.getItem('govflow_district') || 'Mumbai',
//     pincode: '400001',
//   });

//   const districts = getDistricts(formData.state);

//   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newState = e.target.value;
//     const newDistricts = getDistricts(newState);
//     setFormData(prev => ({ ...prev, state: newState, district: newDistricts[0] || '' }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);
//     setTimeout(() => {
//       localStorage.setItem('govflow_state', formData.state);
//       localStorage.setItem('govflow_district', formData.district);
//       setIsSaving(false);
//       setSaved(true);
//       setTimeout(() => setSaved(false), 3000);
//     }, 800);
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-slate-800">User Profile</h2>
//         <p className="text-slate-500">Manage your official identity, contact details, and location preferences.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative group cursor-pointer">
//               <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center">
//                 <User className="w-16 h-16 text-blue-500" />
//               </div>
//               <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Camera className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
//               <ShieldCheck className="w-3.5 h-3.5" />Verified Official
//             </span>
//           </div>

//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
//               <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
//               <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Official Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                 <input type="email" name="email" value={formData.email} disabled
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm" />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
//             <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
//               <Building className="w-5 h-5 text-blue-600" />
//               <h3 className="text-lg font-semibold text-slate-800">Official Details</h3>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Department / Ministry</label>
//               <input type="text" value={formData.department} disabled
//                 className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
//               <input type="text" name="designation" value={formData.designation} onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Employee ID</label>
//               <input type="text" value={formData.employeeId} disabled
//                 className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Aadhaar Number</label>
//               <div className="relative">
//                 <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                 <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
//                   placeholder="XXXX XXXX XXXX" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
//             <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
//               <MapPin className="w-5 h-5 text-blue-600" />
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-800">Location & Address</h3>
//                 <p className="text-xs text-blue-500 mt-0.5">Sets your default Dashboard view</p>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Residential Address</label>
//               <textarea name="address" value={formData.address}
//                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                 rows={2}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm resize-none" />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">
//                 State / UT
//                 <span className="ml-2 text-xs text-blue-500 font-normal">↗ affects Dashboard</span>
//               </label>
//               <select name="state" value={formData.state} onChange={handleStateChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm text-slate-700">
//                 {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">
//                 District / City
//                 <span className="ml-2 text-xs text-blue-500 font-normal">↗ affects Dashboard</span>
//               </label>
//               <select name="district" value={formData.district} onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm text-slate-700">
//                 {districts.map(d => <option key={d} value={d}>{d}</option>)}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
//               <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm" />
//             </div>

//             <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
//               <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
//               <p className="text-xs text-blue-700 leading-relaxed">
//                 Your <strong>State</strong> and <strong>District</strong> set the default budget view on your Dashboard. You can always explore any other region from there too.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end items-center gap-4 pt-4">
//           {saved && (
//             <span className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
//               <CheckCircle2 className="w-4 h-4" /> Location preferences saved!
//             </span>
//           )}
//           <button type="submit" disabled={isSaving}
//             className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors">
//             {isSaving
//               ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               : <><Save className="w-4 h-4" />Save Changes</>
//             }
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from 'react';
import { User, Mail, Phone, Camera, Save, Building, MapPin, AlertTriangle, ClipboardList } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

type ProjectRow = {
  projectName: string;
  department: string;
  allocatedBudget: number;
  amountSpent: number;
  startDate: string;
  expectedCompletionDate: string;
  status: 'Planned' | 'In Progress' | 'Completed';
};

type ContractorRow = {
  contractorName: string;
  projectsAssigned: number;
  totalContractValue: number;
  projectCompletionRate: string;
};

const adminProjects: ProjectRow[] = [
  {
    projectName: 'Urban Road Restoration Phase 2',
    department: 'Ministry of Road Transport',
    allocatedBudget: 1200000000,
    amountSpent: 830000000,
    startDate: '2025-04-10',
    expectedCompletionDate: '2026-12-30',
    status: 'In Progress'
  },
  {
    projectName: 'Water Grid Modernization',
    department: 'State Water Department',
    allocatedBudget: 850000000,
    amountSpent: 790000000,
    startDate: '2025-01-08',
    expectedCompletionDate: '2026-03-31',
    status: 'Completed'
  },
  {
    projectName: 'Primary Health Center Upgrade',
    department: 'Ministry of Health',
    allocatedBudget: 450000000,
    amountSpent: 140000000,
    startDate: '2026-02-01',
    expectedCompletionDate: '2027-01-15',
    status: 'Planned'
  }
];

const contractorData: ContractorRow[] = [
  {
    contractorName: 'ABC Infra Pvt Ltd',
    projectsAssigned: 4,
    totalContractValue: 980000000,
    projectCompletionRate: '76%'
  },
  {
    contractorName: 'MetroBuild Consortium',
    projectsAssigned: 3,
    totalContractValue: 760000000,
    projectCompletionRate: '63%'
  },
  {
    contractorName: 'CivicWorks Engineering',
    projectsAssigned: 2,
    totalContractValue: 420000000,
    projectCompletionRate: '88%'
  }
];

const anomalyAlerts = [
  'Budget spike detected in district-level sanitation allocation (+37% vs prior quarter).',
  'Underutilized funds flagged in healthcare modernization scheme (utilization < 35%).',
  'Suspicious contractor payment pattern: accelerated milestone claims in 2 linked projects.',
  'Project completion mismatch with citizen feedback in Road Restoration Phase 2.'
];

const activityLog = [
  'Approved revised allocation for district water infrastructure upgrade.',
  'Updated policy compliance note for procurement threshold limits.',
  'Assigned new contractor panel for municipal road resurfacing.',
  'Escalated delayed project review to state monitoring cell.'
];

// ─── Aadhaar Verification Form Component ──────────────────────────
function AadhaarVerificationForm() {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarName, setAadhaarName] = useState('');
  const [aadhaarImage, setAadhaarImage] = useState<File | null>(null);
  const [aadhaarPreview, setAadhaarPreview] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verificationError, setVerificationError] = useState('');

  // ─ On mount: check if already verified via backend or localStorage ─
  useEffect(() => {
    const profile = (() => { try { return JSON.parse(localStorage.getItem('govflow_user_profile') || '{}'); } catch { return {}; } })();
    const email = profile.email || '';

    if (localStorage.getItem('govflow_aadhaar_verified') === 'true') {
      setIsAadhaarVerified(true);
      return;
    }

    if (email) {
      fetch(`http://localhost:8000/api/aadhaar/status?email=${encodeURIComponent(email)}`)
        .then(r => r.json())
        .then(data => {
          if (data.is_verified) {
            setIsAadhaarVerified(true);
            localStorage.setItem('govflow_aadhaar_verified', 'true');
            localStorage.setItem('aadhaar_name', data.full_name || '');
          }
        })
        .catch(() => { });
    }
  }, []);

  // ─ Auto-format XXXX XXXX XXXX ─
  const formatAadhaarInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 12);
    const parts = [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8, 12)].filter(Boolean);
    return parts.join(' ');
  };

  // ─ Image handler ─
  const handleAadhaarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setVerificationError('Please upload an image file.'); return; }
    setAadhaarImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setAadhaarPreview(reader.result as string);
    reader.readAsDataURL(file);
    setVerificationError('');
  };

  // ─ Verify via FormData POST ─
  const handleAadhaarVerify = async () => {
    const digits = aadhaarNumber.replace(/\D/g, '');
    if (!aadhaarName.trim()) { setVerificationError('Please enter your full name as on Aadhaar.'); return; }
    if (digits.length !== 12) { setVerificationError('Aadhaar number must be exactly 12 digits.'); return; }
    if (!aadhaarImage) { setVerificationError('Please upload your Aadhaar card image.'); return; }

    const profile = (() => { try { return JSON.parse(localStorage.getItem('govflow_user_profile') || '{}'); } catch { return {}; } })();
    const email = profile.email || 'citizen@govflow.in';

    setIsVerifying(true);
    setVerificationError('');
    setVerificationResult(null);

    try {
      const formData = new FormData();
      formData.append('user_email', email);
      formData.append('aadhaar_number', digits);
      formData.append('full_name', aadhaarName.trim());
      formData.append('aadhaar_image', aadhaarImage);

      const res = await fetch('http://localhost:8000/api/aadhaar/verify', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setVerificationResult(data);

      if (data.is_verified) {
        setIsAadhaarVerified(true);
        localStorage.setItem('govflow_aadhaar_verified', 'true');
        localStorage.setItem('aadhaar_name', aadhaarName.trim());
      } else {
        setVerificationError(data.error || 'Verification failed. The details did not match the card.');
      }
    } catch {
      setVerificationError('Could not connect to the verification server. Make sure the backend is running.');
    } finally {
      setIsVerifying(false);
    }
  };

  // ─ Verified state ─
  if (isAadhaarVerified) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-sm font-bold text-emerald-800">Identity Verified via Aadhaar</p>
        <p className="text-xs text-emerald-600">
          Verified as: <strong>{localStorage.getItem('aadhaar_name') || 'Citizen'}</strong>
        </p>
        <p className="text-[10px] text-emerald-500">You can now submit complaints and reviews.</p>
      </div>
    );
  }

  // ─ Form ─
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (as on Aadhaar)</label>
          <input
            type="text"
            value={aadhaarName}
            onChange={e => setAadhaarName(e.target.value)}
            placeholder="e.g. Rajesh Kumar"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Aadhaar Number</label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={e => setAadhaarNumber(formatAadhaarInput(e.target.value))}
            placeholder="XXXX XXXX XXXX"
            maxLength={14}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm font-mono tracking-wider"
          />
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Upload Aadhaar Card Image</label>
        <input type="file" accept="image/*" className="hidden" id="aadhaar-upload" onChange={handleAadhaarImageChange} />
        {aadhaarPreview ? (
          <div className="relative">
            <img src={aadhaarPreview} alt="Aadhaar card" className="w-full h-48 object-contain rounded-lg border border-slate-200 bg-slate-50" />
            <button type="button" onClick={() => { setAadhaarImage(null); setAadhaarPreview(''); }}
              className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors">✕</button>
          </div>
        ) : (
          <label htmlFor="aadhaar-upload"
            className="w-full py-10 border-2 border-dashed border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all flex flex-col items-center gap-2 cursor-pointer">
            <Camera className="w-6 h-6 text-blue-400" />
            <span className="text-xs font-semibold text-slate-500">Click to upload Aadhaar card photo</span>
            <span className="text-[10px] text-slate-400">Front side with name and number clearly visible</span>
          </label>
        )}
      </div>

      {/* Verification result details */}
      {verificationResult && !verificationResult.is_verified && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1.5">
          <p className="text-xs font-bold text-amber-800">Match Details:</p>
          <div className="flex gap-4 text-xs">
            <span className={verificationResult.match_details?.number_match ? 'text-emerald-700' : 'text-red-700'}>
              {verificationResult.match_details?.number_match ? '✓' : '✗'} Aadhaar Number
            </span>
            <span className={verificationResult.match_details?.name_match ? 'text-emerald-700' : 'text-red-700'}>
              {verificationResult.match_details?.name_match ? '✓' : '✗'} Name
            </span>
          </div>
          {verificationResult.ocr_raw_text && (
            <details className="mt-1">
              <summary className="text-[10px] text-amber-600 cursor-pointer">View OCR extracted text</summary>
              <pre className="mt-1 text-[10px] bg-white/60 p-2 rounded border border-amber-100 whitespace-pre-wrap max-h-28 overflow-auto">{verificationResult.ocr_raw_text}</pre>
            </details>
          )}
        </div>
      )}

      {/* Error */}
      {verificationError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 leading-relaxed">{verificationError}</p>
        </div>
      )}

      {/* Verify Button */}
      <button type="button" onClick={handleAadhaarVerify}
        disabled={isVerifying || !aadhaarName.trim() || aadhaarNumber.replace(/\D/g, '').length !== 12 || !aadhaarImage}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
        {isVerifying ? (
          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying via OCR…</>
        ) : (
          <><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Verify My Identity</>
        )}
      </button>

      <p className="text-[10px] text-slate-400 text-center leading-relaxed">
        Your Aadhaar card image is stored securely. Details are verified via OCR and saved to the database.
      </p>
    </div>
  );
}

// ─── Location Preferences Component ──────────────────────────
function LocationPreferencesForm() {
  const [state, setState] = useState(localStorage.getItem('govflow_state') || '');
  const [district, setDistrict] = useState(localStorage.getItem('govflow_district') || '');
  const [pincode, setPincode] = useState(localStorage.getItem('govflow_pincode') || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveLocation = async () => {
    setIsSaving(true);
    setSaved(false);

    // Save to local storage for immediate UI feedback
    localStorage.setItem('govflow_state', state);
    localStorage.setItem('govflow_district', district);
    localStorage.setItem('govflow_pincode', pincode);

    // Get user email
    const profile = (() => { try { return JSON.parse(localStorage.getItem('govflow_user_profile') || '{}'); } catch { return {}; } })();
    const email = profile.email || 'citizen@govflow.in';

    try {
      await fetch('http://localhost:8000/api/profile/location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: email,
          state,
          district,
          pincode
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save location', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">State / UT</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="e.g. Maharashtra"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">District / City</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="e.g. Mumbai"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="e.g. 400001"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 pt-2">
        {saved && (
          <span className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Location saved!
          </span>
        )}
        <button type="button" onClick={handleSaveLocation} disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors">
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><Save className="w-4 h-4" />Save Location Setup</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Profile() {
  const [isSaving, setIsSaving] = useState(false);
  const storedRole = localStorage.getItem('govflow_role') || 'citizen';
  const isAdmin = storedRole === 'admin';

  const storedProfile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('govflow_user_profile') || '{}');
    } catch {
      return {};
    }
  }, []);

  const displayName = storedProfile.fullName?.trim() ? storedProfile.fullName : 'User';
  const displayEmail = storedProfile.email?.trim() ? storedProfile.email : 'Not provided';
  const displayDepartment = storedProfile.department?.trim() ? storedProfile.department : 'Not provided';

  const [citizenForm, setCitizenForm] = useState({
    phone: '',
    alternateEmail: '',
    designation: '',
    bio: '',
    skills: '',
    emergencyContact: '',
    organization: '',
    website: ''
  });

  const [adminForm, setAdminForm] = useState({
    fullName: displayName,
    officerId: 'GOV-FIN-2049',
    officialEmail: displayEmail,
    phoneNumber: '+91 98765 43210',
    designation: 'Senior Nodal Officer',
    department: displayDepartment === 'Not provided' ? 'Ministry of Finance' : displayDepartment,
    country: 'India',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Mumbai',
    wardTaluka: 'R/North Ward',
    governmentBody: 'Municipal Corporation',
    ministryDepartment: displayDepartment === 'Not provided' ? 'Ministry of Finance' : displayDepartment,
    subDepartment: 'Public Expenditure Division',
    schemesHandled: 'Smart Roads Mission, Urban Renewal Fund',
    policyAreas: 'Public infrastructure, procurement compliance',
    financialYear: '2025-26',
    totalBudgetAllocated: '5000000000',
    budgetUtilized: '3400000000',
    pendingFinancialApprovals: '12'
  });

  const handleCitizenChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setCitizenForm({
      ...citizenForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setAdminForm({
      ...adminForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const totalAllocated = Number(adminForm.totalBudgetAllocated) || 0;
  const utilizedBudget = Number(adminForm.budgetUtilized) || 0;
  const remainingBudget = Math.max(totalAllocated - utilizedBudget, 0);

  if (!isAdmin) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Profile</h2>
          <p className="text-slate-500">View login details and complete your profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-blue-500" />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={displayName}
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  value="Citizen"
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={displayEmail}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={displayDepartment}
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-600" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="12" r="2" /><path d="M14 10h4M14 14h4" /></svg>
                <h3 className="text-lg font-semibold text-slate-800">Aadhaar Verification</h3>
              </div>
              {localStorage.getItem('govflow_aadhaar_verified') === 'true' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Verified
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Verify your identity using your Aadhaar card to submit complaints and reviews. Your Aadhaar details are processed via OCR for verification and are not stored on our servers.
            </p>

            <AadhaarVerificationForm />
          </div>

          {/* ─── Location Preferences Section ─── */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-800">Location Preferences for Alerts</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Save your state and district to receive real-time notifications when new projects are allocated or anomalies are flagged in your area.
            </p>
            <LocationPreferencesForm />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Admin Profile</h2>
        <p className="text-slate-500">Government employee profile with administrative, budget, and oversight details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-blue-500" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              Government Administrator
            </span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={adminForm.fullName}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Officer ID / Employee ID</label>
              <input
                type="text"
                name="officerId"
                value={adminForm.officerId}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Official Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="officialEmail"
                  value={adminForm.officialEmail}
                  onChange={handleAdminChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={adminForm.phoneNumber}
                  onChange={handleAdminChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={adminForm.designation}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department / Ministry</label>
              <input
                type="text"
                name="department"
                value={adminForm.department}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Building className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Official Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department / Ministry</label>
              <input
                type="text"
                name="department"
                value={adminForm.department}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={adminForm.designation}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Officer ID</label>
              <input
                type="text"
                name="officerId"
                value={adminForm.officerId}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                name="officialEmail"
                value={adminForm.officialEmail}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Administrative Jurisdiction</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
              <input type="text" name="country" value={adminForm.country} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
              <input type="text" name="state" value={adminForm.state} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
              <input type="text" name="district" value={adminForm.district} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City / Municipal Area</label>
              <input type="text" name="city" value={adminForm.city} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ward / Taluka</label>
              <input type="text" name="wardTaluka" value={adminForm.wardTaluka} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Government Body</label>
              <select
                name="governmentBody"
                value={adminForm.governmentBody}
                onChange={handleAdminChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              >
                <option>Municipal Corporation</option>
                <option>State Department</option>
                <option>Central Ministry</option>
              </select>
            </div>
          </div>
        </div>

        {/* ─── Location Preferences Section ─── */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Location Preferences for Alerts</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Save your state and district to receive real-time notifications when new projects are allocated in your area.
          </p>
          <LocationPreferencesForm />
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Building className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Department Authority</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ministry / Department</label>
              <input type="text" name="ministryDepartment" value={adminForm.ministryDepartment} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sub-department</label>
              <input type="text" name="subDepartment" value={adminForm.subDepartment} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Government Schemes Handled</label>
              <textarea name="schemesHandled" value={adminForm.schemesHandled} onChange={handleAdminChange} rows={2} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Policy Areas Supervised</label>
              <textarea name="policyAreas" value={adminForm.policyAreas} onChange={handleAdminChange} rows={2} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm resize-none" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Budget Responsibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Financial Year</label>
              <input type="text" name="financialYear" value={adminForm.financialYear} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Budget Allocated</label>
              <input type="number" name="totalBudgetAllocated" value={adminForm.totalBudgetAllocated} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Budget Utilized</label>
              <input type="number" name="budgetUtilized" value={adminForm.budgetUtilized} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Remaining Funds</label>
              <input type="text" value={formatCurrency(remainingBudget)} disabled className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pending Financial Approvals</label>
              <input type="number" name="pendingFinancialApprovals" value={adminForm.pendingFinancialApprovals} onChange={handleAdminChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-xs text-blue-700 font-medium">Allocated</p>
              <p className="text-lg font-bold text-slate-800">{formatCurrency(totalAllocated)}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-xs text-emerald-700 font-medium">Utilized</p>
              <p className="text-lg font-bold text-slate-800">{formatCurrency(utilizedBudget)}</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
              <p className="text-xs text-amber-700 font-medium">Remaining</p>
              <p className="text-lg font-bold text-slate-800">{formatCurrency(remainingBudget)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Projects Under Supervision</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-600">
                  <th className="py-3 pr-4">Project Name</th>
                  <th className="py-3 pr-4">Department</th>
                  <th className="py-3 pr-4">Allocated Budget</th>
                  <th className="py-3 pr-4">Amount Spent</th>
                  <th className="py-3 pr-4">Start Date</th>
                  <th className="py-3 pr-4">Expected Completion</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminProjects.map((project) => (
                  <tr key={project.projectName} className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-800 font-medium">{project.projectName}</td>
                    <td className="py-3 pr-4 text-slate-600">{project.department}</td>
                    <td className="py-3 pr-4 text-slate-600">{formatCurrency(project.allocatedBudget)}</td>
                    <td className="py-3 pr-4 text-slate-600">{formatCurrency(project.amountSpent)}</td>
                    <td className="py-3 pr-4 text-slate-600">{project.startDate}</td>
                    <td className="py-3 pr-4 text-slate-600">{project.expectedCompletionDate}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : project.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                        }`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Contractor & Vendor Information</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-600">
                  <th className="py-3 pr-4">Contractor Name</th>
                  <th className="py-3 pr-4">Projects Assigned</th>
                  <th className="py-3 pr-4">Total Contract Value</th>
                  <th className="py-3 pr-4">Project Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {contractorData.map((contractor) => (
                  <tr key={contractor.contractorName} className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-800 font-medium">{contractor.contractorName}</td>
                    <td className="py-3 pr-4 text-slate-600">{contractor.projectsAssigned}</td>
                    <td className="py-3 pr-4 text-slate-600">{formatCurrency(contractor.totalContractValue)}</td>
                    <td className="py-3 pr-4 text-slate-600">{contractor.projectCompletionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Citizen Complaint Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
              <p className="text-xs text-slate-500">Total Complaints Received</p>
              <p className="text-xl font-bold text-slate-800">248</p>
            </div>
            <div className="rounded-lg border border-amber-200 p-4 bg-amber-50">
              <p className="text-xs text-amber-700">Pending Complaints</p>
              <p className="text-xl font-bold text-amber-800">42</p>
            </div>
            <div className="rounded-lg border border-emerald-200 p-4 bg-emerald-50">
              <p className="text-xs text-emerald-700">Resolved Complaints</p>
              <p className="text-xl font-bold text-emerald-800">181</p>
            </div>
            <div className="rounded-lg border border-red-200 p-4 bg-red-50">
              <p className="text-xs text-red-700">Escalated Issues</p>
              <p className="text-xl font-bold text-red-800">25</p>
            </div>
            <div className="rounded-lg border border-blue-200 p-4 bg-blue-50">
              <p className="text-xs text-blue-700">Project-linked Complaints</p>
              <p className="text-xl font-bold text-blue-800">136</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-slate-800">Anomaly Detection Alerts</h3>
          </div>
          <div className="space-y-3">
            {anomalyAlerts.map((alert, index) => (
              <div key={index} className="p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm text-amber-900">
                {alert}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Administrative Activity Log</h3>
          </div>
          <div className="space-y-3">
            {activityLog.map((entry, index) => (
              <div key={index} className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700">
                {entry}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Admin Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}