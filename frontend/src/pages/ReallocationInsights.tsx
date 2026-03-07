import { useState, useEffect, useMemo } from 'react';
import {
  IndianRupee, TrendingUp, TrendingDown, AlertTriangle, ArrowRightLeft,
  ArrowRight, BarChart3, PieChart, Zap, Shield, CheckCircle2,
  Clock, Target, Layers, ChevronDown, Sparkles, Activity,
  Building2, MapPin, ArrowUpRight, ArrowDownRight, Info,
} from 'lucide-react';
import { formatCurrency } from '../lib/utils';

// ─── Types ────────────────────────────────────────────────────────
interface Project {
  project_id: number;
  project_name: string;
  project_type: string;
  project_budget: number;
  project_status: string;
  department: string;
  scheme: string;
  vendor: string;
  state: string;
  district: string;
  utilized_amount: number;
  anomaly_flag: boolean;
}

interface Suggestion {
  id: number;
  fromProject: Project;
  toProject: Project;
  amount: number;
  reason: string;
  impact: string;
  priority: 'Critical' | 'High' | 'Medium';
  category: 'Under-utilized' | 'Anomaly-driven' | 'Efficiency';
}

// ─── Helpers ──────────────────────────────────────────────────────
function utilPct(p: Project) {
  return p.project_budget > 0 ? Math.round((p.utilized_amount / p.project_budget) * 100) : 0;
}

function generateSuggestions(projects: Project[]): Suggestion[] {
  if (projects.length < 4) return [];

  const overFunded = projects
    .filter(p => p.project_status !== 'Completed' && utilPct(p) < 40 && p.project_budget > 500000)
    .sort((a, b) => utilPct(a) - utilPct(b));

  const underFunded = projects
    .filter(p => utilPct(p) > 80 && p.project_status === 'Ongoing')
    .sort((a, b) => utilPct(b) - utilPct(a));

  const anomalyProjects = projects
    .filter(p => p.anomaly_flag && p.project_budget > 500000);

  const suggestions: Suggestion[] = [];
  let id = 1;

  // Anomaly-driven reallocations  
  for (let i = 0; i < Math.min(anomalyProjects.length, 3); i++) {
    const target = underFunded[i % Math.max(underFunded.length, 1)];
    if (!target || anomalyProjects[i].project_id === target.project_id) continue;
    const realloc = Math.round(anomalyProjects[i].project_budget * 0.25);
    suggestions.push({
      id: id++,
      fromProject: anomalyProjects[i],
      toProject: target,
      amount: realloc,
      reason: `${anomalyProjects[i].project_name} has been flagged with anomalies. Partial funds can be redirected while investigation is underway.`,
      impact: `Accelerates ${target.project_name} which is at ${utilPct(target)}% utilization and needs additional funding.`,
      priority: 'Critical',
      category: 'Anomaly-driven',
    });
  }

  // Under-utilized reallocations
  for (let i = 0; i < Math.min(overFunded.length, 4); i++) {
    const target = underFunded[(i + 3) % Math.max(underFunded.length, 1)];
    if (!target || overFunded[i].project_id === target.project_id) continue;
    const surplus = overFunded[i].project_budget - overFunded[i].utilized_amount;
    const realloc = Math.round(surplus * 0.4);
    if (realloc < 100000) continue;
    suggestions.push({
      id: id++,
      fromProject: overFunded[i],
      toProject: target,
      amount: realloc,
      reason: `Only ${utilPct(overFunded[i])}% budget utilized. Surplus of ${formatCurrency(surplus)} can be partially reallocated to high-demand projects.`,
      impact: `Estimated ${Math.round(realloc / target.project_budget * 100)}% budget boost for ${target.project_name}.`,
      priority: i < 2 ? 'High' : 'Medium',
      category: 'Under-utilized',
    });
  }

  // Efficiency suggestions
  const delayed = projects.filter(p => p.project_status === 'Delayed' && utilPct(p) > 50);
  for (let i = 0; i < Math.min(delayed.length, 2); i++) {
    const target = underFunded[(i + 5) % Math.max(underFunded.length, 1)];
    if (!target || delayed[i].project_id === target.project_id) continue;
    const realloc = Math.round(delayed[i].project_budget * 0.15);
    suggestions.push({
      id: id++,
      fromProject: delayed[i],
      toProject: target,
      amount: realloc,
      reason: `${delayed[i].project_name} is delayed. Partial reallocation can optimize overall program delivery.`,
      impact: `Improves completion timeline for ${target.project_name} by an estimated 1-2 months.`,
      priority: 'Medium',
      category: 'Efficiency',
    });
  }

  return suggestions;
}

// ─── Priority Badge ───────────────────────────────────────────────
function PriorityBadge({ priority }: { priority: string }) {
  const cfg: Record<string, { bg: string; text: string; dot: string }> = {
    Critical: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
    High: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500' },
    Medium: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
  };
  const c = cfg[priority] || cfg.Medium;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {priority}
    </span>
  );
}

// ─── Category Badge ───────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const icons: Record<string, any> = {
    'Under-utilized': TrendingDown,
    'Anomaly-driven': Shield,
    'Efficiency': Zap,
  };
  const Icon = icons[category] || Activity;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
      <Icon className="w-3 h-3" />
      {category}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────
function StatCard({ title, value, subtitle, icon: Icon, gradient, trend }: {
  title: string; value: string; subtitle: string; icon: any; gradient: string; trend?: string;
}) {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className={`absolute inset-0 opacity-[0.03] ${gradient}`} />
      <div className="relative p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className={`p-2.5 rounded-xl ${gradient} bg-opacity-10`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          {trend && (
            <span className="flex items-center gap-0.5 text-emerald-600 text-[11px] font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" />
              {trend}
            </span>
          )}
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Suggestion Card ──────────────────────────────────────────────
function SuggestionCard({ s, expanded, onToggle }: {
  s: Suggestion; expanded: boolean; onToggle: () => void;
}) {
  const fromUtil = utilPct(s.fromProject);
  const toUtil = utilPct(s.toProject);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <PriorityBadge priority={s.priority} />
            <CategoryBadge category={s.category} />
          </div>
          <span className="text-lg font-bold text-emerald-600 whitespace-nowrap">
            {formatCurrency(s.amount)}
          </span>
        </div>

        {/* Flow visualization */}
        <div className="flex items-center gap-3">

          {/* FROM project */}
          <div className="flex-1 bg-red-50/50 border border-red-100 rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">From</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{s.fromProject.project_name}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-red-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 rounded-full transition-all" style={{ width: `${fromUtil}%` }} />
              </div>
              <span className="text-[10px] font-bold text-red-600">{fromUtil}%</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <ArrowRight className="w-5 h-5 text-blue-500" />
            <span className="text-[9px] font-bold text-blue-400">MOVE</span>
          </div>

          {/* TO project */}
          <div className="flex-1 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">To</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{s.toProject.project_name}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${toUtil}%` }} />
              </div>
              <span className="text-[10px] font-bold text-emerald-600">{toUtil}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expand/collapse */}
      {expanded && (
        <div className="px-5 pb-4 space-y-3 border-t border-slate-50 pt-4">
          <div className="bg-slate-50 rounded-xl p-3.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reason</p>
            <p className="text-sm text-slate-700 leading-relaxed">{s.reason}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Expected Impact</p>
            <p className="text-sm text-emerald-800 leading-relaxed">{s.impact}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Source District</p>
              <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <MapPin className="w-3 h-3" />{s.fromProject.district}, {s.fromProject.state}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Target District</p>
              <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <MapPin className="w-3 h-3" />{s.toProject.district}, {s.toProject.state}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50/50 border-t border-slate-100">
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Show Less' : 'View Analysis'}
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Approve
        </button>
      </div>
    </div>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────
function MiniDonut({ segments }: { segments: { pct: number; color: string; label: string }[] }) {
  const r = 36, cx = 50, cy = 50, stroke = 10;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const el = (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

// ─── Mock fallback data ───────────────────────────────────────────
const MOCK_PROJECTS: Project[] = [
  { project_id: 1, project_name: 'Pune Urban PHC Upgrade', project_type: 'Healthcare', project_budget: 45000000, project_status: 'Ongoing', department: 'Ministry of Health', scheme: 'NHM', vendor: 'MedBuild Infra', state: 'Maharashtra', district: 'Pune', utilized_amount: 12000000, anomaly_flag: true },
  { project_id: 2, project_name: 'Mumbai District ICU Modernization', project_type: 'Healthcare', project_budget: 32000000, project_status: 'Ongoing', department: 'Ministry of Health', scheme: 'NHM', vendor: 'CareZone Solutions', state: 'Maharashtra', district: 'Mumbai', utilized_amount: 28800000, anomaly_flag: false },
  { project_id: 3, project_name: 'Nagpur Ward Pavement Rehabilitation', project_type: 'Roads', project_budget: 28000000, project_status: 'Delayed', department: 'Ministry of Road Transport', scheme: 'PMGSY', vendor: 'RoadKing Constructions', state: 'Maharashtra', district: 'Nagpur', utilized_amount: 5600000, anomaly_flag: true },
  { project_id: 4, project_name: 'Nashik Eastern Link Road Upgrade', project_type: 'Roads', project_budget: 22000000, project_status: 'Ongoing', department: 'Ministry of Road Transport', scheme: 'PMGSY', vendor: 'Ashoka Buildcon', state: 'Maharashtra', district: 'Nashik', utilized_amount: 19800000, anomaly_flag: false },
  { project_id: 5, project_name: 'Thane Insurance Enrollment Acceleration', project_type: 'Welfare', project_budget: 18000000, project_status: 'Ongoing', department: 'Ministry of Finance', scheme: 'PMJJBY', vendor: 'DigiGov Services', state: 'Maharashtra', district: 'Thane', utilized_amount: 3600000, anomaly_flag: false },
  { project_id: 6, project_name: 'Kolhapur Digital Claims Integration', project_type: 'IT', project_budget: 15000000, project_status: 'Ongoing', department: 'Ministry of Finance', scheme: 'Digital India', vendor: 'TechStar Infra', state: 'Maharashtra', district: 'Kolhapur', utilized_amount: 13500000, anomaly_flag: false },
  { project_id: 7, project_name: 'Solapur Primary School Renovation', project_type: 'Education', project_budget: 35000000, project_status: 'Delayed', department: 'Ministry of Education', scheme: 'Samagra Shiksha', vendor: 'EduBuild Ltd', state: 'Maharashtra', district: 'Solapur', utilized_amount: 21000000, anomaly_flag: true },
  { project_id: 8, project_name: 'Aurangabad Smart Water Grid', project_type: 'Water', project_budget: 50000000, project_status: 'Ongoing', department: 'Ministry of Jal Shakti', scheme: 'JJM', vendor: 'AquaPure Systems', state: 'Maharashtra', district: 'Aurangabad', utilized_amount: 10000000, anomaly_flag: false },
  { project_id: 9, project_name: 'Satara Rural Electrification Phase-II', project_type: 'Energy', project_budget: 40000000, project_status: 'Ongoing', department: 'Ministry of Power', scheme: 'DDUGJY', vendor: 'PowerGrid Corp', state: 'Maharashtra', district: 'Satara', utilized_amount: 36000000, anomaly_flag: false },
  { project_id: 10, project_name: 'Sangli Agricultural Market Yard', project_type: 'Agriculture', project_budget: 25000000, project_status: 'Ongoing', department: 'Ministry of Agriculture', scheme: 'eNAM', vendor: 'AgriTech Solutions', state: 'Maharashtra', district: 'Sangli', utilized_amount: 7500000, anomaly_flag: true },
  { project_id: 11, project_name: 'Ratnagiri Fisheries Cold Storage', project_type: 'Agriculture', project_budget: 12000000, project_status: 'Completed', department: 'Ministry of Agriculture', scheme: 'Blue Revolution', vendor: 'SeaCold Infra', state: 'Maharashtra', district: 'Ratnagiri', utilized_amount: 11400000, anomaly_flag: false },
  { project_id: 12, project_name: 'Ahmednagar Solar Micro-Grid', project_type: 'Energy', project_budget: 30000000, project_status: 'Ongoing', department: 'Ministry of New Energy', scheme: 'KUSUM', vendor: 'SolarEdge India', state: 'Maharashtra', district: 'Ahmednagar', utilized_amount: 27000000, anomaly_flag: false },
];

// ─── Main Page ────────────────────────────────────────────────────
export default function ReallocationInsights() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterPriority, setFilterPriority] = useState('');

  useEffect(() => {
    // Try fetching real data from API; fall back to mock data if unavailable
    fetch('http://localhost:8000/api/projects/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 3) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const suggestions = useMemo(() => generateSuggestions(projects), [projects]);

  const totalReallocation = suggestions.reduce((s, x) => s + x.amount, 0);
  const criticalCount = suggestions.filter(s => s.priority === 'Critical').length;
  const highCount = suggestions.filter(s => s.priority === 'High').length;
  const anomalyDriven = suggestions.filter(s => s.category === 'Anomaly-driven').length;
  const underUt = suggestions.filter(s => s.category === 'Under-utilized').length;
  const eff = suggestions.filter(s => s.category === 'Efficiency').length;

  const filtered = filterPriority
    ? suggestions.filter(s => s.priority === filterPriority)
    : suggestions;

  const donutSegments = [
    { pct: anomalyDriven / Math.max(suggestions.length, 1) * 100, color: '#ef4444', label: 'Anomaly' },
    { pct: underUt / Math.max(suggestions.length, 1) * 100, color: '#3b82f6', label: 'Under-utilized' },
    { pct: eff / Math.max(suggestions.length, 1) * 100, color: '#f59e0b', label: 'Efficiency' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-800">Reallocation Insights</h2>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
              AI-Powered
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Intelligent budget optimization recommendations based on utilization patterns, anomaly signals, and project performance.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{suggestions.length} recommendations generated</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reallocation Suggested"
          value={formatCurrency(totalReallocation)}
          subtitle="Across all recommendations"
          icon={IndianRupee}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Critical Alerts"
          value={`${criticalCount}`}
          subtitle="Require immediate attention"
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-red-500 to-red-600"
          trend={criticalCount > 0 ? 'Action Required' : undefined}
        />
        <StatCard
          title="High-Impact Moves"
          value={`${highCount}`}
          subtitle="Strong downstream effect"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Anomaly-Linked"
          value={`${anomalyDriven}`}
          subtitle="Driven by flagged projects"
          icon={Shield}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Category breakdown + Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Category breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Recommendation Breakdown</h3>
          <div className="flex items-center gap-6">
            <MiniDonut segments={donutSegments} />
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-slate-600">Anomaly-driven</span>
                <span className="font-bold text-slate-800 ml-auto">{anomalyDriven}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600">Under-utilized</span>
                <span className="font-bold text-slate-800 ml-auto">{underUt}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">Efficiency</span>
                <span className="font-bold text-slate-800 ml-auto">{eff}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick filters */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-3">Filter by Priority</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {['', 'Critical', 'High', 'Medium'].map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${filterPriority === p
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {p || 'All'}
              </button>
            ))}
          </div>

          <div className="mt-4 p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Recommendations are generated by analyzing budget utilization rates, ML anomaly detection signals,
                project completion timelines, and inter-department spending patterns across {projects.length} active projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Recommended Reallocations</h3>
          <span className="text-xs text-slate-400 font-medium">{filtered.length} showing</span>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Target className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">No recommendations match the filter</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your priority filter above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(s => (
              <SuggestionCard
                key={s.id}
                s={s}
                expanded={expandedId === s.id}
                onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
