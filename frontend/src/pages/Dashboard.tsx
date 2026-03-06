// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   LineChart, Line
// } from 'recharts';
// import { IndianRupee, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
// import { summaryStats, allocationVsUtilization } from '../data/mockData';
// import { formatCurrency } from '../lib/utils';

// export default function Dashboard() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-slate-800">Platform Overview</h2>
//         <p className="text-slate-500">National Budget Flow & Intelligence Summary</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard 
//           title="Total Allocated" 
//           value={formatCurrency(summaryStats.totalAllocated)} 
//           icon={IndianRupee} 
//           trend="+12% from last year"
//           color="blue"
//         />
//         <StatCard 
//           title="Total Utilized" 
//           value={formatCurrency(summaryStats.totalUtilized)} 
//           icon={TrendingUp} 
//           trend="56% utilization rate"
//           color="emerald"
//         />
//         <StatCard 
//           title="Active Anomalies" 
//           value={summaryStats.activeAnomalies.toString()} 
//           icon={AlertTriangle} 
//           trend="+5 in last 24h"
//           color="red"
//         />
//         <StatCard 
//           title="System Risk Score" 
//           value={`${summaryStats.riskScore}/10`} 
//           icon={Activity} 
//           trend="Moderate Risk Level"
//           color="orange"
//         />
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//           <h3 className="text-lg font-semibold text-slate-800 mb-4">Allocation vs Utilization (in Cr)</h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={allocationVsUtilization}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} />
//                 <YAxis axisLine={false} tickLine={false} />
//                 <Tooltip 
//                   cursor={{fill: '#f1f5f9'}}
//                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
//                 />
//                 <Legend />
//                 <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 <Bar dataKey="utilized" name="Utilized" fill="#10b981" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//           <h3 className="text-lg font-semibold text-slate-800 mb-4">Anomaly Detection Trend</h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={allocationVsUtilization}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} />
//                 <YAxis axisLine={false} tickLine={false} />
//                 <Tooltip 
//                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
//                 />
//                 <Line type="monotone" dataKey="allocated" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} name="Anomalies Detected" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, icon: Icon, trend, color }: any) {
//   const colorMap: Record<string, string> = {
//     blue: 'bg-blue-50 text-blue-600',
//     emerald: 'bg-emerald-50 text-emerald-600',
//     red: 'bg-red-50 text-red-600',
//     orange: 'bg-orange-50 text-orange-600',
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
//       <div className="flex justify-between items-start mb-4">
//         <div className={`p-3 rounded-lg ${colorMap[color]}`}>
//           <Icon className="w-6 h-6" />
//         </div>
//       </div>
//       <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
//       <p className="text-2xl font-bold text-slate-800 mb-2">{value}</p>
//       <p className="text-xs text-slate-400 mt-auto">{trend}</p>
//     </div>
//   );
// }
import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  IndianRupee, AlertTriangle, TrendingUp, Activity,
  MapPin, ChevronDown, RotateCcw, Globe, Map, Building2
} from 'lucide-react';
import { ALL_STATES, getDistricts, getStateBudgetData } from '../data/indiaData';
import { formatCurrency } from '../lib/utils';

type ViewLevel = 'national' | 'state' | 'district';

export default function Dashboard() {
  // Pull saved profile location as the personal default
  const profileState    = localStorage.getItem('govflow_state')    || 'Maharashtra';
  const profileDistrict = localStorage.getItem('govflow_district') || 'Mumbai';

  const [viewLevel,        setViewLevel]        = useState<ViewLevel>('district');
  const [activeState,      setActiveState]       = useState(profileState);
  const [activeDistrict,   setActiveDistrict]    = useState(profileDistrict);

  // Staged selections — only applied when user clicks "Apply"
  const [draftState,    setDraftState]    = useState(profileState);
  const [draftDistrict, setDraftDistrict] = useState(profileDistrict);
  const draftDistricts = getDistricts(draftState);

  const handleDraftStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const s = e.target.value;
    setDraftState(s);
    setDraftDistrict(getDistricts(s)[0] || '');
  };

  const applyFilter = () => {
    setActiveState(draftState);
    if (viewLevel === 'district') setActiveDistrict(draftDistrict);
  };

  const resetToMyLocation = () => {
    setViewLevel('district');
    setActiveState(profileState);
    setActiveDistrict(profileDistrict);
    setDraftState(profileState);
    setDraftDistrict(profileDistrict);
  };

  // Derive data based on current view level
  const data =
    viewLevel === 'national' ? getStateBudgetData('India') :
    viewLevel === 'state'    ? getStateBudgetData(activeState) :
                               getStateBudgetData(activeState, activeDistrict);

  const locationLabel =
    viewLevel === 'national' ? 'National Overview' :
    viewLevel === 'state'    ? activeState :
                               `${activeDistrict}, ${activeState}`;

  const isMyLocation =
    viewLevel === 'district' &&
    activeState === profileState &&
    activeDistrict === profileDistrict;

  const utilizationPct = Math.round((data.totalUtilized / data.totalAllocated) * 100);
  const riskColor = data.riskScore >= 7 ? 'red' : data.riskScore >= 5 ? 'orange' : 'emerald';

  return (
    <div className="space-y-6">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Platform Overview</h2>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-sm text-slate-500">
              Viewing:{' '}
              <span className="font-semibold text-slate-700">{locationLabel}</span>
            </span>
            {isMyLocation && (
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                My Location
              </span>
            )}
          </div>
        </div>

        {/* View-level switcher */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
          {(
            [
              { level: 'national', label: 'National', Icon: Globe },
              { level: 'state',    label: 'State',    Icon: Map },
              { level: 'district', label: 'District', Icon: Building2 },
            ] as { level: ViewLevel; label: string; Icon: any }[]
          ).map(({ level, label, Icon }) => (
            <button
              key={level}
              onClick={() => setViewLevel(level)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                viewLevel === level
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Region Filter Panel (hidden on National) ─────────────── */}
      {viewLevel !== 'national' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Filter Region
          </p>
          <div className="flex flex-col sm:flex-row items-end gap-3">
            {/* State dropdown — always shown */}
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">State / UT</label>
              <div className="relative">
                <select
                  value={draftState}
                  onChange={handleDraftStateChange}
                  className="w-full appearance-none px-3 py-2.5 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-sm text-slate-800"
                >
                  {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* District dropdown — only in district view */}
            {viewLevel === 'district' && (
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">District / City</label>
                <div className="relative">
                  <select
                    value={draftDistrict}
                    onChange={e => setDraftDistrict(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-sm text-slate-800"
                  >
                    {draftDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={applyFilter}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Apply
              </button>
              {!isMyLocation && (
                <button
                  onClick={resetToMyLocation}
                  title="Reset to my saved location"
                  className="flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-500 text-sm font-medium rounded-lg transition-colors bg-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  My Location
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Stat Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Allocated"
          value={formatCurrency(data.totalAllocated)}
          icon={IndianRupee}
          sub="FY 2024-25"
          color="blue"
        />
        <StatCard
          title="Total Utilized"
          value={formatCurrency(data.totalUtilized)}
          icon={TrendingUp}
          sub={`${utilizationPct}% utilization rate`}
          color="emerald"
        />
        <StatCard
          title="Active Anomalies"
          value={data.activeAnomalies.toString()}
          icon={AlertTriangle}
          sub="Flagged for review"
          color="red"
        />
        <StatCard
          title="Risk Score"
          value={`${data.riskScore} / 10`}
          icon={Activity}
          sub={data.riskScore >= 7 ? 'High Risk' : data.riskScore >= 5 ? 'Moderate Risk' : 'Low Risk'}
          color={riskColor}
        />
      </div>

      {/* ── Utilization Progress Bar ─────────────────────────────── */}
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
            className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${utilizationPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>₹ 0</span>
          <span>{formatCurrency(data.totalAllocated)} allocated</span>
        </div>
      </div>

      {/* ── Charts ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Bar chart: Allocation vs Utilization */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-700">Allocation vs Utilization</h3>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">{locationLabel} · in ₹ Cr</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.allocationVsUtilization} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0 / 0.06)', fontSize: 12 }}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="utilized"  name="Utilized"  fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area chart: Anomaly Trend */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-700">Anomaly Detection Trend</h3>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">{locationLabel} · anomalies per month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.anomaliesTrend}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0 / 0.06)', fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Anomalies"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#aGrad)"
                  dot={{ r: 3.5, fill: '#ef4444', strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── StatCard ──────────────────────────────────────────────────── */
function StatCard({
  title, value, icon: Icon, sub, color,
}: {
  title: string; value: string; icon: any; sub: string; color: string;
}) {
  const palette: Record<string, { bg: string; text: string; ring: string }> = {
    blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    ring: 'ring-blue-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
    red:     { bg: 'bg-red-50',     text: 'text-red-600',     ring: 'ring-red-100' },
    orange:  { bg: 'bg-orange-50',  text: 'text-orange-600',  ring: 'ring-orange-100' },
  };
  const c = palette[color] ?? palette.blue;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ring-4 ${c.bg} ${c.text} ${c.ring}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
      </div>
      <p className="text-xs text-slate-400 mt-auto">{sub}</p>
    </div>
  );
}