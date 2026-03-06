import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line
} from "recharts";

import { IndianRupee, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { formatCurrency } from "../lib/utils";

const summaryStats = {
  totalAllocated: 12000000000,
  totalUtilized: 7200000000,
  activeAnomalies: 14,
  riskScore: 6.4
};

const allocationVsUtilization = [
  { month: "Jan", allocated: 120, utilized: 80 },
  { month: "Feb", allocated: 150, utilized: 110 },
  { month: "Mar", allocated: 180, utilized: 130 },
  { month: "Apr", allocated: 200, utilized: 140 },
  { month: "May", allocated: 220, utilized: 160 },
  { month: "Jun", allocated: 250, utilized: 180 }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Admin Financial Intelligence Dashboard
        </h2>
        <p className="text-slate-500">
          Government Budget Monitoring & Anomaly Detection
        </p>
      </div>

      {/* Stats */}
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
          trend="56% utilization"
          color="emerald"
        />

        <StatCard
          title="Active Anomalies"
          value={summaryStats.activeAnomalies}
          icon={AlertTriangle}
          trend="+5 last 24h"
          color="red"
        />

        <StatCard
          title="System Risk Score"
          value={`${summaryStats.riskScore}/10`}
          icon={Activity}
          trend="Moderate Risk"
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Allocation vs Utilization */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Allocation vs Utilization
          </h3>

          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={allocationVsUtilization}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>

                <Bar dataKey="allocated" fill="#3b82f6" name="Allocated"/>
                <Bar dataKey="utilized" fill="#10b981" name="Utilized"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Anomaly Detection Trend
          </h3>

          <div className="h-80">
            <ResponsiveContainer>
              <LineChart data={allocationVsUtilization}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>

                <Line
                  type="monotone"
                  dataKey="allocated"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Anomalies"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {

  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600"
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

      <div className={`p-3 rounded-lg w-fit mb-4 ${colorMap[color]}`}>
        <Icon className="w-6 h-6"/>
      </div>

      <h4 className="text-slate-500 text-sm">{title}</h4>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400 mt-2">{trend}</p>

    </div>
  );
}