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


import { useMemo, useState } from 'react';
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