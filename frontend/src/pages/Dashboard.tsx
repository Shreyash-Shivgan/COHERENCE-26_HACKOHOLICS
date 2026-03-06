// import { useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   AreaChart, Area
// } from 'recharts';
// import {
//   IndianRupee, AlertTriangle, TrendingUp, Activity,
//   MapPin, ChevronDown, RotateCcw, Globe, Map, Building2
// } from 'lucide-react';
// import { ALL_STATES, getDistricts, getStateBudgetData } from '../data/indiaData';
// import { formatCurrency } from '../lib/utils';

// type ViewLevel = 'national' | 'state' | 'district';

// export default function Dashboard() {
//   // Pull saved profile location as the personal default
//   const profileState    = localStorage.getItem('govflow_state')    || 'Maharashtra';
//   const profileDistrict = localStorage.getItem('govflow_district') || 'Mumbai';

//   const [viewLevel,        setViewLevel]        = useState<ViewLevel>('district');
//   const [activeState,      setActiveState]       = useState(profileState);
//   const [activeDistrict,   setActiveDistrict]    = useState(profileDistrict);

//   // Staged selections — only applied when user clicks "Apply"
//   const [draftState,    setDraftState]    = useState(profileState);
//   const [draftDistrict, setDraftDistrict] = useState(profileDistrict);
//   const draftDistricts = getDistricts(draftState);

//   const handleDraftStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const s = e.target.value;
//     setDraftState(s);
//     setDraftDistrict(getDistricts(s)[0] || '');
//   };

//   const applyFilter = () => {
//     setActiveState(draftState);
//     if (viewLevel === 'district') setActiveDistrict(draftDistrict);
//   };

//   const resetToMyLocation = () => {
//     setViewLevel('district');
//     setActiveState(profileState);
//     setActiveDistrict(profileDistrict);
//     setDraftState(profileState);
//     setDraftDistrict(profileDistrict);
//   };

//   // Derive data based on current view level
//   const data =
//     viewLevel === 'national' ? getStateBudgetData('India') :
//     viewLevel === 'state'    ? getStateBudgetData(activeState) :
//                                getStateBudgetData(activeState, activeDistrict);

//   const locationLabel =
//     viewLevel === 'national' ? 'National Overview' :
//     viewLevel === 'state'    ? activeState :
//                                `${activeDistrict}, ${activeState}`;

//   const isMyLocation =
//     viewLevel === 'district' &&
//     activeState === profileState &&
//     activeDistrict === profileDistrict;

//   const utilizationPct = Math.round((data.totalUtilized / data.totalAllocated) * 100);
//   const riskColor = data.riskScore >= 7 ? 'red' : data.riskScore >= 5 ? 'orange' : 'emerald';

//   return (
//     <div className="space-y-6">

//       {/* ── Page Header ─────────────────────────────────────────── */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-slate-800">Platform Overview</h2>
//           <div className="flex items-center gap-2 mt-1">
//             <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
//             <span className="text-sm text-slate-500">
//               Viewing:{' '}
//               <span className="font-semibold text-slate-700">{locationLabel}</span>
//             </span>
//             {isMyLocation && (
//               <span className="text-[11px] font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
//                 My Location
//               </span>
//             )}
//           </div>
//         </div>

//         {/* View-level switcher */}
//         <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
//           {(
//             [
//               { level: 'national', label: 'National', Icon: Globe },
//               { level: 'state',    label: 'State',    Icon: Map },
//               { level: 'district', label: 'District', Icon: Building2 },
//             ] as { level: ViewLevel; label: string; Icon: any }[]
//           ).map(({ level, label, Icon }) => (
//             <button
//               key={level}
//               onClick={() => setViewLevel(level)}
//               className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
//                 viewLevel === level
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-slate-500 hover:text-slate-700'
//               }`}
//             >
//               <Icon className="w-3.5 h-3.5" />
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Region Filter Panel (hidden on National) ─────────────── */}
//       {viewLevel !== 'national' && (
//         <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
//           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
//             Filter Region
//           </p>
//           <div className="flex flex-col sm:flex-row items-end gap-3">
//             {/* State dropdown — always shown */}
//             <div className="flex-1 w-full">
//               <label className="block text-xs font-medium text-slate-600 mb-1.5">State / UT</label>
//               <div className="relative">
//                 <select
//                   value={draftState}
//                   onChange={handleDraftStateChange}
//                   className="w-full appearance-none px-3 py-2.5 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-sm text-slate-800"
//                 >
//                   {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
//                 </select>
//                 <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* District dropdown — only in district view */}
//             {viewLevel === 'district' && (
//               <div className="flex-1 w-full">
//                 <label className="block text-xs font-medium text-slate-600 mb-1.5">District / City</label>
//                 <div className="relative">
//                   <select
//                     value={draftDistrict}
//                     onChange={e => setDraftDistrict(e.target.value)}
//                     className="w-full appearance-none px-3 py-2.5 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-sm text-slate-800"
//                   >
//                     {draftDistricts.map(d => <option key={d} value={d}>{d}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
//                 </div>
//               </div>
//             )}

//             {/* Action buttons */}
//             <div className="flex gap-2 shrink-0">
//               <button
//                 onClick={applyFilter}
//                 className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
//               >
//                 Apply
//               </button>
//               {!isMyLocation && (
//                 <button
//                   onClick={resetToMyLocation}
//                   title="Reset to my saved location"
//                   className="flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-500 text-sm font-medium rounded-lg transition-colors bg-white"
//                 >
//                   <RotateCcw className="w-3.5 h-3.5" />
//                   My Location
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Stat Cards ───────────────────────────────────────────── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <StatCard
//           title="Total Allocated"
//           value={formatCurrency(data.totalAllocated)}
//           icon={IndianRupee}
//           sub="FY 2024-25"
//           color="blue"
//         />
//         <StatCard
//           title="Total Utilized"
//           value={formatCurrency(data.totalUtilized)}
//           icon={TrendingUp}
//           sub={`${utilizationPct}% utilization rate`}
//           color="emerald"
//         />
//         <StatCard
//           title="Active Anomalies"
//           value={data.activeAnomalies.toString()}
//           icon={AlertTriangle}
//           sub="Flagged for review"
//           color="red"
//         />
//         <StatCard
//           title="Risk Score"
//           value={`${data.riskScore} / 10`}
//           icon={Activity}
//           sub={data.riskScore >= 7 ? 'High Risk' : data.riskScore >= 5 ? 'Moderate Risk' : 'Low Risk'}
//           color={riskColor}
//         />
//       </div>

//       {/* ── Utilization Progress Bar ─────────────────────────────── */}
//       <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
//         <div className="flex justify-between items-baseline mb-3">
//           <div>
//             <h3 className="text-sm font-semibold text-slate-700">Budget Utilization Rate</h3>
//             <p className="text-xs text-slate-400 mt-0.5">{locationLabel}</p>
//           </div>
//           <span className="text-3xl font-bold text-slate-800">{utilizationPct}%</span>
//         </div>
//         <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
//           <div
//             className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
//             style={{ width: `${utilizationPct}%` }}
//           />
//         </div>
//         <div className="flex justify-between text-xs text-slate-400 mt-2">
//           <span>₹ 0</span>
//           <span>{formatCurrency(data.totalAllocated)} allocated</span>
//         </div>
//       </div>

//       {/* ── Charts ───────────────────────────────────────────────── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

//         {/* Bar chart: Allocation vs Utilization */}
//         <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
//           <h3 className="text-sm font-semibold text-slate-700">Allocation vs Utilization</h3>
//           <p className="text-xs text-slate-400 mt-0.5 mb-5">{locationLabel} · in ₹ Cr</p>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data.allocationVsUtilization} barCategoryGap="30%">
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
//                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
//                 <Tooltip
//                   cursor={{ fill: '#f8fafc' }}
//                   contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0 / 0.06)', fontSize: 12 }}
//                 />
//                 <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
//                 <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 <Bar dataKey="utilized"  name="Utilized"  fill="#10b981" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Area chart: Anomaly Trend */}
//         <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
//           <h3 className="text-sm font-semibold text-slate-700">Anomaly Detection Trend</h3>
//           <p className="text-xs text-slate-400 mt-0.5 mb-5">{locationLabel} · anomalies per month</p>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={data.anomaliesTrend}>
//                 <defs>
//                   <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.12} />
//                     <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
//                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
//                 <Tooltip
//                   contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0 / 0.06)', fontSize: 12 }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="count"
//                   name="Anomalies"
//                   stroke="#ef4444"
//                   strokeWidth={2}
//                   fill="url(#aGrad)"
//                   dot={{ r: 3.5, fill: '#ef4444', strokeWidth: 0 }}
//                   activeDot={{ r: 5 }}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// /* ── StatCard ──────────────────────────────────────────────────── */
// function StatCard({
//   title, value, icon: Icon, sub, color,
// }: {
//   title: string; value: string; icon: any; sub: string; color: string;
// }) {
//   const palette: Record<string, { bg: string; text: string; ring: string }> = {
//     blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    ring: 'ring-blue-100' },
//     emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
//     red:     { bg: 'bg-red-50',     text: 'text-red-600',     ring: 'ring-red-100' },
//     orange:  { bg: 'bg-orange-50',  text: 'text-orange-600',  ring: 'ring-orange-100' },
//   };
//   const c = palette[color] ?? palette.blue;

//   return (
//     <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col gap-3">
//       <div className={`w-10 h-10 rounded-lg flex items-center justify-center ring-4 ${c.bg} ${c.text} ${c.ring}`}>
//         <Icon className="w-5 h-5" />
//       </div>
//       <div>
//         <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
//         <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
//       </div>
//       <p className="text-xs text-slate-400 mt-auto">{sub}</p>
//     </div>
//   );
// }

import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import {
  IndianRupee, AlertTriangle, TrendingUp, Activity, MapPin,
  ChevronDown, RotateCcw, Globe, Map, Building2, SlidersHorizontal,
  CheckSquare, Square, Clock, CheckCircle2, AlertCircle, XCircle, X,
} from 'lucide-react';
import {
  ALL_STATES, getDistricts, getStateBudgetData,
  DEPARTMENTS, SCHEMES_BY_DEPT, ALL_STATUSES,
  getProjectsForLocation,
  type ProjectStatus,
} from '../data/indiaData';
import { formatCurrency } from '../lib/utils';
import { budgetApi } from '../lib/api';
import { useEffect } from 'react';

type ViewLevel = 'national' | 'state' | 'district';

// ─────────────────────────────────────────────────────────────────
// Multi-select dropdown  (checkbox style, cascading)
// ─────────────────────────────────────────────────────────────────
function MultiSelect({
  label, icon: Icon, options, selected, onChange, placeholder,
}: {
  label: string;
  icon: any;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const toggle = (opt: string) =>
    selected.includes(opt)
      ? onChange(selected.filter(x => x !== opt))
      : onChange([...selected, opt]);

  const allSelected = selected.length === 0;
  const chipLabel = allSelected
    ? (placeholder ?? `All ${label}s`)
    : selected.length === 1
    ? (selected[0].length > 24 ? selected[0].slice(0, 22) + '…' : selected[0])
    : `${selected.length} selected`;

  return (
    <div className="relative w-full">
      {/* Label row */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        {!allSelected && (
          <button
            onClick={() => onChange([])}
            className="ml-auto text-[10px] text-blue-500 hover:text-red-500 flex items-center gap-0.5 transition-colors"
          >
            <X className="w-2.5 h-2.5" /> Clear
          </button>
        )}
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-all
          ${!allSelected
            ? 'border-blue-400 bg-blue-50 text-blue-700 font-medium'
            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
          }`}
      >
        <span className="truncate">{chipLabel}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1.5 z-30 w-full min-w-[220px] bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-200/80 overflow-hidden">
            {/* All option */}
            <button
              onClick={() => { onChange([]); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              {allSelected
                ? <CheckSquare className="w-4 h-4 text-blue-500 shrink-0" />
                : <Square className="w-4 h-4 text-slate-300 shrink-0" />
              }
              <span className={allSelected ? 'font-semibold text-blue-600' : 'text-slate-600'}>
                All {label}s
              </span>
            </button>

            {/* Options */}
            <div className="max-h-56 overflow-y-auto">
              {options.map(opt => {
                const checked = selected.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggle(opt)}
                    className="w-full flex items-start gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors text-left"
                  >
                    {checked
                      ? <CheckSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      : <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    }
                    <span className={checked ? 'text-blue-700 font-medium leading-snug' : 'text-slate-600 leading-snug'}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Status badge
// ─────────────────────────────────────────────────────────────────
const STATUS_CFG: Record<ProjectStatus, { bg: string; text: string; border: string; Icon: any }> = {
  Ongoing:   { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',   Icon: Clock },
  Completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', Icon: CheckCircle2 },
  Delayed:   { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  Icon: AlertCircle },
  Cancelled: { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     Icon: XCircle },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const c = STATUS_CFG[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      <c.Icon className="w-3 h-3" />{status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// StatCard
// ─────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, sub, color }: {
  title: string; value: string; icon: any; sub: string; color: string;
}) {
  const p: Record<string, string> = {
    blue:    'bg-blue-50 text-blue-600 ring-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    red:     'bg-red-50 text-red-600 ring-red-100',
    orange:  'bg-orange-50 text-orange-600 ring-orange-100',
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-4 ${p[color] ?? p.blue}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
      </div>
      <p className="text-xs text-slate-400 mt-auto">{sub}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const profileState    = localStorage.getItem('govflow_state')    || 'Maharashtra';
  const profileDistrict = localStorage.getItem('govflow_district') || 'Mumbai';

  // ── Location state ──────────────────────────────────────────────
  const [viewLevel,      setViewLevel]      = useState<ViewLevel>('district');
  const [activeState,    setActiveState]    = useState(profileState);
  const [activeDistrict, setActiveDistrict] = useState(profileDistrict);
  const [draftState,     setDraftState]     = useState(profileState);
  const [draftDistrict,  setDraftDistrict]  = useState(profileDistrict);
  const draftDistricts = getDistricts(draftState);

  // ── Gov-work filter state ───────────────────────────────────────
  const [selDepts,    setSelDepts]    = useState<string[]>([]);
  const [selSchemes,  setSelSchemes]  = useState<string[]>([]);
  const [selProjects, setSelProjects] = useState<string[]>([]);
  const [selVendors,  setSelVendors]  = useState<string[]>([]);
  const [selStatuses, setSelStatuses] = useState<string[]>([]);

  const resetGovFilters = () => {
    setSelDepts([]); setSelSchemes([]); setSelProjects([]);
    setSelVendors([]); setSelStatuses([]);
  };

  const activeGovFilterCount =
    selDepts.length + selSchemes.length + selProjects.length +
    selVendors.length + selStatuses.length;

  // ── Location helpers ────────────────────────────────────────────
  const handleDraftStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const s = e.target.value;
    setDraftState(s);
    setDraftDistrict(getDistricts(s)[0] || '');
  };

  const applyLocation = () => {
    setActiveState(draftState);
    if (viewLevel === 'district') setActiveDistrict(draftDistrict);
    resetGovFilters();
  };

  const resetToMyLocation = () => {
    setViewLevel('district');
    setActiveState(profileState);    setActiveDistrict(profileDistrict);
    setDraftState(profileState);     setDraftDistrict(profileDistrict);
    resetGovFilters();
  };

  // ── Budget summary data ─────────────────────────────────────────
  const [budgetData, setBudgetData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    budgetApi.getStateSummary()
      .then(res => {
        const stateSummary = res.data.find((s: any) => s.state === activeState) || res.data[0];
        if (stateSummary) {
          setBudgetData({
            totalAllocated: stateSummary.central,
            totalUtilized: stateSummary.state_received,
            activeAnomalies: 1,
            riskScore: 5.4,
            allocationVsUtilization: [
              { month: 'Jan', allocated: 400, utilized: 240 },
              { month: 'Feb', allocated: 300, utilized: 139 },
            ],
            anomaliesTrend: [
              { month: 'Jan', count: 4 },
              { month: 'Feb', count: 7 },
            ]
          });
        }
      })
      .catch(err => console.error("API error:", err))
      .finally(() => setLoading(false));
  }, [viewLevel, activeState, activeDistrict]);

  // ── All projects for current district ──────────────────────────
  const allProjects = useMemo(() =>
    viewLevel === 'district' ? getProjectsForLocation(activeState, activeDistrict) : [],
    [viewLevel, activeState, activeDistrict]);

  // ── Cascading filter options ────────────────────────────────────
  // Schemes: filtered by selected depts
  const availableSchemes = useMemo(() =>
    selDepts.length === 0
      ? Object.values(SCHEMES_BY_DEPT).flat()
      : selDepts.flatMap(d => SCHEMES_BY_DEPT[d] ?? []),
    [selDepts]);

  // Projects: filtered by dept + scheme
  const filteredByDeptScheme = useMemo(() =>
    allProjects
      .filter(p => selDepts.length   === 0 || selDepts.includes(p.department))
      .filter(p => selSchemes.length === 0 || selSchemes.includes(p.scheme)),
    [allProjects, selDepts, selSchemes]);

  const availableProjectNames = useMemo(() =>
    [...new Set(filteredByDeptScheme.map(p => p.name))],
    [filteredByDeptScheme]);

  // Vendors: filtered by dept + scheme + project
  const filteredByDeptSchemeProject = useMemo(() =>
    filteredByDeptScheme
      .filter(p => selProjects.length === 0 || selProjects.includes(p.name)),
    [filteredByDeptScheme, selProjects]);

  const availableVendors = useMemo(() =>
    [...new Set(filteredByDeptSchemeProject.map(p => p.vendor))],
    [filteredByDeptSchemeProject]);

  // Final filtered projects for the table
  const filteredProjects = useMemo(() =>
    filteredByDeptSchemeProject
      .filter(p => selVendors.length  === 0 || selVendors.includes(p.vendor))
      .filter(p => selStatuses.length === 0 || selStatuses.includes(p.status)),
    [filteredByDeptSchemeProject, selVendors, selStatuses]);

  if (loading || !budgetData) {
    return <div className="p-8 text-center text-slate-500">Loading budget data from API...</div>;
  }

  // ── Derived labels ──────────────────────────────────────────────
  const locationLabel =
    viewLevel === 'national' ? 'National Overview' :
    viewLevel === 'state'    ? activeState :
                               `${activeDistrict}, ${activeState}`;

  const isMyLocation =
    viewLevel === 'district' &&
    activeState === profileState &&
    activeDistrict === profileDistrict;

  const utilizationPct = Math.round((budgetData.totalUtilized / budgetData.totalAllocated) * 100);
  const riskColor = budgetData.riskScore >= 7 ? 'red' : budgetData.riskScore >= 5 ? 'orange' : 'emerald';

  return (
    <div className="space-y-5">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Platform Overview</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-sm text-slate-500">
              Viewing: <span className="font-semibold text-slate-700">{locationLabel}</span>
            </span>
            {isMyLocation && (
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                My Location
              </span>
            )}
          </div>
        </div>

        {/* View-level switcher */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 self-start">
          {([
            { level: 'national' as ViewLevel, label: 'National', Icon: Globe },
            { level: 'state'    as ViewLevel, label: 'State',    Icon: Map },
            { level: 'district' as ViewLevel, label: 'District', Icon: Building2 },
          ]).map(({ level, label, Icon }) => (
            <button
              key={level}
              onClick={() => { setViewLevel(level); resetGovFilters(); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all
                ${viewLevel === level ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── STEP 1 & 2: Location filter (State + District) ──────── */}
      {viewLevel !== 'national' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-slate-400" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</p>
            <span className="text-xs text-slate-400">— Step 1 of 2</span>
          </div>

          <div className="flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                State / UT
              </label>
              <div className="relative">
                <select
                  value={draftState}
                  onChange={handleDraftStateChange}
                  className="w-full appearance-none px-3 py-2.5 pr-8 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {viewLevel === 'district' && (
              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  District / City
                </label>
                <div className="relative">
                  <select
                    value={draftDistrict}
                    onChange={e => setDraftDistrict(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 pr-8 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {draftDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            )}

            <div className="flex gap-2 shrink-0">
              <button
                onClick={applyLocation}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Apply
              </button>
              {!isMyLocation && (
                <button
                  onClick={resetToMyLocation}
                  className="flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-500 text-sm font-medium rounded-xl bg-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  My Location
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 2: Gov-work cascade filters (district only) ─────── */}
      {viewLevel === 'district' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-500" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Government Work Filters
              </p>
              <span className="text-xs text-slate-400">— Step 2 of 2</span>
              {activeGovFilterCount > 0 && (
                <span className="text-[11px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  {activeGovFilterCount} active
                </span>
              )}
            </div>
            {activeGovFilterCount > 0 && (
              <button
                onClick={resetGovFilters}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Clear all filters
              </button>
            )}
          </div>

          {/* Flow indicator */}
          <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
            {['Department', 'Scheme', 'Project', 'Vendor', 'Status'].map((step, i) => (
              <div key={step} className="flex items-center gap-1 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                  [selDepts, selSchemes, selProjects, selVendors, selStatuses][i].length > 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {step}
                </span>
                {i < 4 && <ChevronDown className="w-3 h-3 text-slate-300 rotate-[-90deg] shrink-0" />}
              </div>
            ))}
          </div>

          {/* The 5 filter dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* 1. Department */}
            <MultiSelect
              label="Department"
              icon={Building2}
              options={DEPARTMENTS}
              selected={selDepts}
              onChange={v => {
                setSelDepts(v);
                // Cascade: clear downstream
                setSelSchemes([]); setSelProjects([]); setSelVendors([]);
              }}
              placeholder="All Departments"
            />

            {/* 2. Scheme — options narrow based on dept */}
            <MultiSelect
              label="Scheme"
              icon={SlidersHorizontal}
              options={availableSchemes}
              selected={selSchemes}
              onChange={v => {
                setSelSchemes(v);
                setSelProjects([]); setSelVendors([]);
              }}
              placeholder="All Schemes"
            />

            {/* 3. Project — options narrow based on dept + scheme */}
            <MultiSelect
              label="Project"
              icon={Map}
              options={availableProjectNames}
              selected={selProjects}
              onChange={v => {
                setSelProjects(v);
                setSelVendors([]);
              }}
              placeholder="All Projects"
            />

            {/* 4. Vendor — options narrow based on dept + scheme + project */}
            <MultiSelect
              label="Vendor"
              icon={Activity}
              options={availableVendors}
              selected={selVendors}
              onChange={setSelVendors}
              placeholder="All Vendors"
            />

            {/* 5. Status — independent */}
            <MultiSelect
              label="Status"
              icon={CheckCircle2}
              options={ALL_STATUSES as string[]}
              selected={selStatuses}
              onChange={setSelStatuses}
              placeholder="All Statuses"
            />
          </div>

          {/* Active filter chips */}
          {activeGovFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
              {[
                ...selDepts.map(v    => ({ label: v, clear: () => setSelDepts(selDepts.filter(x => x !== v)) })),
                ...selSchemes.map(v  => ({ label: v, clear: () => setSelSchemes(selSchemes.filter(x => x !== v)) })),
                ...selProjects.map(v => ({ label: v, clear: () => setSelProjects(selProjects.filter(x => x !== v)) })),
                ...selVendors.map(v  => ({ label: v, clear: () => setSelVendors(selVendors.filter(x => x !== v)) })),
                ...selStatuses.map(v => ({ label: v, clear: () => setSelStatuses(selStatuses.filter(x => x !== v)) })),
              ].map(({ label, clear }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium rounded-lg"
                >
                  {label.length > 30 ? label.slice(0, 28) + '…' : label}
                  <button onClick={clear} className="hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Stat Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Allocated"
          value={formatCurrency(budgetData.totalAllocated)}
          icon={IndianRupee} sub="FY 2024-25" color="blue"
        />
        <StatCard
          title="Total Utilized"
          value={formatCurrency(budgetData.totalUtilized)}
          icon={TrendingUp}
          sub={`${utilizationPct}% utilization rate`}
          color="emerald"
        />
        <StatCard
          title="Active Anomalies"
          value={budgetData.activeAnomalies.toString()}
          icon={AlertTriangle} sub="Flagged for review" color="red"
        />
        <StatCard
          title="Risk Score"
          value={`${budgetData.riskScore} / 10`}
          icon={Activity}
          sub={budgetData.riskScore >= 7 ? 'High Risk' : budgetData.riskScore >= 5 ? 'Moderate Risk' : 'Low Risk'}
          color={riskColor}
        />
      </div>

      {/* ── Utilization bar ──────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-baseline mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Budget Utilization Rate</h3>
            <p className="text-xs text-slate-400 mt-0.5">{locationLabel}</p>
          </div>
          <span className="text-3xl font-bold text-slate-800">{utilizationPct}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${utilizationPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>₹ 0</span>
          <span>{formatCurrency(budgetData.totalAllocated)} allocated</span>
        </div>
      </div>

      {/* ── Charts ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-700">Allocation vs Utilization</h3>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">{locationLabel} · in ₹ Cr</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData.allocationVsUtilization} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0/0.06)', fontSize: 12 }}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="utilized"  name="Utilized"  fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-700">Anomaly Detection Trend</h3>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">{locationLabel} · anomalies per month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={budgetData.anomaliesTrend}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0/0.06)', fontSize: 12 }} />
                <Area type="monotone" dataKey="count" name="Anomalies" stroke="#ef4444" strokeWidth={2}
                  fill="url(#aGrad)" dot={{ r: 3.5, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Project Table (district view only) ───────────────────── */}
      {viewLevel === 'district' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                Projects in {activeDistrict}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {filteredProjects.length} of {allProjects.length} projects
                {activeGovFilterCount > 0 && ' (filtered)'}
              </p>
            </div>
            {activeGovFilterCount > 0 && (
              <button onClick={resetGovFilters}
                className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                <X className="w-3 h-3" />Clear filters
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheme</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vendor</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Allocated</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Utilized</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                      No projects match the selected filters.
                    </td>
                  </tr>
                ) : filteredProjects.map(p => {
                  const util = Math.round((p.utilized / p.allocated) * 100);
                  return (
                    <tr key={p.id} className={`hover:bg-slate-50/70 transition-colors ${p.anomalyFlag ? 'bg-red-50/30' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          {p.anomalyFlag && (
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                          )}
                          <div>
                            <p className="font-medium text-slate-800 leading-snug">{p.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-500 max-w-[140px]">
                        <span className="line-clamp-2">{p.department.replace('Ministry of ', 'Min. of ')}</span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-500 max-w-[120px]">
                        <span className="line-clamp-2">{p.scheme}</span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-600">{p.vendor}</td>
                      <td className="px-4 py-4 text-right text-xs font-medium text-slate-700">
                        {formatCurrency(p.allocated)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div>
                          <p className="text-xs font-medium text-slate-700">{formatCurrency(p.utilized)}</p>
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full ${util >= 90 ? 'bg-emerald-500' : util >= 50 ? 'bg-blue-500' : 'bg-orange-400'}`}
                                style={{ width: `${Math.min(util, 100)}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-400">{util}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}