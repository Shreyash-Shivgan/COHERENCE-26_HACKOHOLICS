import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { IndianRupee, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { summaryStats, allocationVsUtilization } from '../data/mockData';
import { formatCurrency } from '../lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Platform Overview</h2>
        <p className="text-slate-500">National Budget Flow & Intelligence Summary</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Allocated" 
          value={formatCurrency(summaryStats.totalAllocated)} 
          icon={IndianRupee} 
          trend="+12% from last year"
          color="blue"
        />
        <StatCard 
          title="Total Utilized" 
          value={formatCurrency(summaryStats.totalUtilized)} 
          icon={TrendingUp} 
          trend="56% utilization rate"
          color="emerald"
        />
        <StatCard 
          title="Active Anomalies" 
          value={summaryStats.activeAnomalies.toString()} 
          icon={AlertTriangle} 
          trend="+5 in last 24h"
          color="red"
        />
        <StatCard 
          title="System Risk Score" 
          value={`${summaryStats.riskScore}/10`} 
          icon={Activity} 
          trend="Moderate Risk Level"
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Allocation vs Utilization (in Cr)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={allocationVsUtilization}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="utilized" name="Utilized" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Anomaly Detection Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={allocationVsUtilization}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="allocated" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} name="Anomalies Detected" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
      <p className="text-2xl font-bold text-slate-800 mb-2">{value}</p>
      <p className="text-xs text-slate-400 mt-auto">{trend}</p>
    </div>
  );
}
