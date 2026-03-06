import { IndianRupee, TrendingUp, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const reallocationSuggestions = [
  {
    fromProject: 'Urban PHC Upgrade Program',
    toProject: 'District ICU Modernization',
    amount: 25000000,
    reason: 'PHC upgrade has surplus allocation; ICU expansion is underfunded against utilization trend.',
    impact: 'Can reduce completion delay by ~2 months for ICU modernization.'
  },
  {
    fromProject: 'Ward Pavement Rehabilitation',
    toProject: 'Eastern Link Road Upgrade',
    amount: 18000000,
    reason: 'Pavement project is flagged and execution is paused pending review.',
    impact: 'Improves continuity for high-priority arterial road package.'
  },
  {
    fromProject: 'Insurance Enrollment Acceleration',
    toProject: 'Digital Claims Integration',
    amount: 12000000,
    reason: 'Low utilization in enrollment campaign; claims platform needs immediate infra support.',
    impact: 'Expected increase in processing efficiency and reduced pending claims.'
  }
];

export default function ReallocationInsights() {
  const totalSuggested = reallocationSuggestions.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Reallocation Insights</h2>
        <p className="text-slate-500">Admin-only recommendations for budget reallocation based on utilization and anomaly signals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InsightCard
          title="Suggested Reallocation"
          value={formatCurrency(totalSuggested)}
          subtitle="Across active optimization opportunities"
          icon={IndianRupee}
          color="blue"
        />
        <InsightCard
          title="High-Impact Moves"
          value="3"
          subtitle="Recommendations with strong downstream effect"
          icon={TrendingUp}
          color="emerald"
        />
        <InsightCard
          title="Flag-Driven Actions"
          value="2"
          subtitle="Linked to anomaly or stalled execution patterns"
          icon={AlertTriangle}
          color="orange"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">Recommended Budget Reallocations</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {reallocationSuggestions.map((item) => (
            <div key={`${item.fromProject}-${item.toProject}`} className="p-5 space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span>{item.fromProject}</span>
                  <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                  <span>{item.toProject}</span>
                </div>
                <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {formatCurrency(item.amount)}
                </span>
              </div>
              <p className="text-sm text-slate-600">{item.reason}</p>
              <p className="text-xs text-emerald-700 font-medium">{item.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, value, subtitle, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
}
