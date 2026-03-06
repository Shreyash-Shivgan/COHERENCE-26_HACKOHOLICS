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
import { useMemo, useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, Camera, Save, Building, MapPin, AlertTriangle, ClipboardList, ShieldCheck, ShieldAlert, Upload, CheckCircle2, XCircle, Loader2, CreditCard, FileText } from 'lucide-react';
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

const API_BASE = 'http://localhost:8000';

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

  // ─── Aadhaar Verification State ──────────────────────────────────
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarName, setAadhaarName] = useState(displayName !== 'User' ? displayName : '');
  const [aadhaarImage, setAadhaarImage] = useState<File | null>(null);
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verificationError, setVerificationError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check verification status on mount
  useEffect(() => {
    if (displayEmail && displayEmail !== 'Not provided') {
      fetch(`${API_BASE}/aadhaar/status?email=${encodeURIComponent(displayEmail)}`)
        .then(res => res.json())
        .then(data => {
          if (data.is_verified) {
            setIsAadhaarVerified(true);
            localStorage.setItem('govflow_aadhaar_verified', 'true');
          }
        })
        .catch(() => {
          setIsAadhaarVerified(localStorage.getItem('govflow_aadhaar_verified') === 'true');
        });
    } else {
      setIsAadhaarVerified(localStorage.getItem('govflow_aadhaar_verified') === 'true');
    }
  }, [displayEmail]);

  const handleAadhaarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAadhaarImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setAadhaarPreview(reader.result as string);
      reader.readAsDataURL(file);
      setVerificationResult(null);
      setVerificationError('');
    }
  };

  const handleAadhaarVerify = async () => {
    if (!aadhaarNumber.trim() || !aadhaarName.trim() || !aadhaarImage) {
      setVerificationError('Please fill in all fields and upload your Aadhaar card image.');
      return;
    }
    const cleanNum = aadhaarNumber.replace(/[\s\-]/g, '');
    if (cleanNum.length !== 12 || !/^\d+$/.test(cleanNum)) {
      setVerificationError('Aadhaar number must be exactly 12 digits.');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');
    setVerificationResult(null);

    try {
      const formData = new FormData();
      formData.append('user_email', displayEmail);
      formData.append('aadhaar_number', cleanNum);
      formData.append('full_name', aadhaarName.trim());
      formData.append('aadhaar_image', aadhaarImage);

      const response = await fetch(`${API_BASE}/aadhaar/verify`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Verification failed');
      }

      const data = await response.json();
      setVerificationResult(data);
      if (data.is_verified) {
        setIsAadhaarVerified(true);
        localStorage.setItem('govflow_aadhaar_verified', 'true');
      }
    } catch (err: any) {
      setVerificationError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const formatAadhaarInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 12);
    const parts = digits.match(/.{1,4}/g);
    return parts ? parts.join(' ') : digits;
  };

  // ─── Citizen Form State ──────────────────────────────────────────
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

          {/* ─── Aadhaar Verification Section ──────────────────────── */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-800">Aadhaar Verification</h3>
              </div>
              {isAadhaarVerified ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Citizen
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Not Verified
                </span>
              )}
            </div>

            {!isAadhaarVerified ? (
              <>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-sm text-blue-700 leading-relaxed">
                    <strong>Why verify?</strong> Aadhaar verification confirms your identity as a valid citizen.
                    Only verified citizens can submit reports and complaints on the platform.
                    Upload a clear photo of your Aadhaar card and enter your details below.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Form inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Aadhaar Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={aadhaarNumber}
                          onChange={(e) => setAadhaarNumber(formatAadhaarInput(e.target.value))}
                          placeholder="XXXX XXXX XXXX"
                          maxLength={14}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm font-mono tracking-wider"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Enter the 12-digit number exactly as printed on your card</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (as on Aadhaar)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={aadhaarName}
                          onChange={(e) => setAadhaarName(e.target.value)}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Image upload */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Aadhaar Card Photo</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                        aadhaarPreview
                          ? 'border-blue-300 bg-blue-50/50'
                          : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/30'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleAadhaarImageChange}
                        className="hidden"
                      />
                      {aadhaarPreview ? (
                        <div className="space-y-3">
                          <img
                            src={aadhaarPreview}
                            alt="Aadhaar Card Preview"
                            className="max-h-40 mx-auto rounded-lg shadow-sm object-contain"
                          />
                          <p className="text-xs text-blue-600 font-medium">Click to change image</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-10 h-10 text-slate-300 mx-auto" />
                          <p className="text-sm text-slate-500 font-medium">Click to upload Aadhaar card</p>
                          <p className="text-xs text-slate-400">JPG, PNG, or WEBP • Max 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {verificationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{verificationError}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAadhaarVerify}
                  disabled={isVerifying}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Extracting & Verifying...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Verify My Identity
                    </>
                  )}
                </button>

                {/* Verification Result */}
                {verificationResult && (
                  <div className={`rounded-xl border p-5 space-y-4 ${
                    verificationResult.is_verified
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {verificationResult.is_verified ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-amber-600" />
                      )}
                      <div>
                        <h4 className={`text-base font-bold ${
                          verificationResult.is_verified ? 'text-emerald-800' : 'text-amber-800'
                        }`}>
                          {verificationResult.is_verified ? 'Identity Verified!' : 'Verification Incomplete'}
                        </h4>
                        <p className={`text-xs ${
                          verificationResult.is_verified ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {verificationResult.is_verified
                            ? 'Your Aadhaar details match. You can now file reports.'
                            : 'The details entered do not fully match the OCR text from your card. Please try again with a clearer image.'}
                        </p>
                      </div>
                    </div>

                    {/* Match Details */}
                    {verificationResult.match_details && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Aadhaar Number Match */}
                        {verificationResult.match_details.aadhaar_number && (
                          <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aadhaar Number</p>
                            <div className="flex items-start gap-2">
                              {verificationResult.match_details.aadhaar_number.match ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <p className="text-xs text-slate-600">
                                  <span className="font-medium">Entered:</span> {verificationResult.match_details.aadhaar_number.entered}
                                </p>
                                <p className={`text-xs font-semibold ${verificationResult.match_details.aadhaar_number.match ? 'text-emerald-600' : 'text-red-600'}`}>
                                  {verificationResult.match_details.aadhaar_number.match ? '✓ Found in Aadhaar image' : '✗ Not found in image'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Name Match */}
                        {verificationResult.match_details.name && (
                          <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</p>
                            <div className="flex items-start gap-2">
                              {verificationResult.match_details.name.match ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <p className="text-xs text-slate-600">
                                  <span className="font-medium">Entered:</span> {verificationResult.match_details.name.entered}
                                </p>
                                <p className={`text-xs font-semibold ${verificationResult.match_details.name.match ? 'text-emerald-600' : 'text-red-600'}`}>
                                  {verificationResult.match_details.name.match
                                    ? `✓ Found in image (${verificationResult.match_details.name.match_ratio || 100}% match)`
                                    : '✗ Not found in image'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* OCR Raw Text Preview */}
                    {verificationResult.ocr_raw_text && (
                      <details className="group">
                        <summary className="text-xs font-medium text-slate-500 cursor-pointer hover:text-blue-600 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          View extracted text from image
                        </summary>
                        <pre className="mt-2 p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {verificationResult.ocr_raw_text}
                        </pre>
                      </details>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-800">Identity Verified ✓</h4>
                  <p className="text-sm text-emerald-600 mt-0.5">Your Aadhaar card has been verified. You are authorized to file reports and complaints on this platform.</p>
                </div>
              </div>
            )}
          </div>

          {/* ─── Additional Details Section ─────────────────────────── */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4">Additional Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={citizenForm.phone}
                    onChange={handleCitizenChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alternate Email</label>
                <input
                  type="email"
                  name="alternateEmail"
                  value={citizenForm.alternateEmail}
                  onChange={handleCitizenChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={citizenForm.designation}
                  onChange={handleCitizenChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={citizenForm.organization}
                  onChange={handleCitizenChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Skills / Interests</label>
                <input
                  type="text"
                  name="skills"
                  value={citizenForm.skills}
                  onChange={handleCitizenChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={citizenForm.emergencyContact}
                  onChange={handleCitizenChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Website / Portfolio</label>
                <input
                  type="text"
                  name="website"
                  value={citizenForm.website}
                  onChange={handleCitizenChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={citizenForm.bio}
                  onChange={handleCitizenChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-colors text-sm resize-none"
                />
              </div>
            </div>
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
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed'
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