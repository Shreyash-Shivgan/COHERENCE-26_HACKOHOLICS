import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, ArrowUpRight, Filter, Search, X,
  ChevronDown, ShieldAlert, CheckCircle2, Clock,
  RotateCcw, MapPin, Building2, SlidersHorizontal,
  CheckSquare, Square, TrendingDown, FileWarning,
  BadgeAlert, Layers,
} from 'lucide-react';
import {
  getAnomaliesForLocation,
  ALL_STATES, getDistricts,
  DEPARTMENTS, SCHEMES_BY_DEPT, VENDORS,
  ALL_ANOMALY_STATUSES, ALL_ANOMALY_SEVERITIES,
  type Anomaly, type AnomalySeverity, type AnomalyStatus,
} from '../data/indiaData';
import { formatCurrency } from '../lib/utils';
import { anomaliesApi, type AnomalyData } from '../services/api';

// ─── Config maps ──────────────────────────────────────────────────
const SEVERITY_CFG: Record<AnomalySeverity, { bar: string; badge: string; text: string; border: string }> = {
  High: { bar: 'bg-red-500', badge: 'bg-red-100 text-red-700 border-red-200', text: 'text-red-700', border: 'border-l-red-500' },
  Medium: { bar: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700 border-orange-200', text: 'text-orange-700', border: 'border-l-orange-500' },
  Low: { bar: 'bg-yellow-400', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', text: 'text-yellow-700', border: 'border-l-yellow-400' },
};

const STATUS_CFG: Record<AnomalyStatus, { dot: string; text: string; bg: string }> = {
  'Investigating': { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  'Flagged for Audit': { dot: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' },
  'Warning Issued': { dot: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
  'Resolved': { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
};

// ─── Multi-select dropdown (same pattern as Dashboard) ───────────
function MultiSelect({
  label, icon: Icon, options, selected, onChange,
}: {
  label: string; icon: any; options: string[];
  selected: string[]; onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const allSel = selected.length === 0;
  const toggle = (opt: string) =>
    selected.includes(opt) ? onChange(selected.filter(x => x !== opt)) : onChange([...selected, opt]);

  const chipLabel = allSel ? `All ${label}s`
    : selected.length === 1 ? (selected[0].length > 24 ? selected[0].slice(0, 22) + '…' : selected[0])
      : `${selected.length} selected`;

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        {!allSel && (
          <button onClick={() => onChange([])} className="ml-auto text-[10px] text-blue-500 hover:text-red-500 flex items-center gap-0.5 transition-colors">
            <X className="w-2.5 h-2.5" />Clear
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-sm text-left transition-all
          ${!allSel ? 'border-blue-400 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
      >
        <span className="truncate text-xs">{chipLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1.5 z-30 w-full min-w-[200px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
            <button onClick={() => { onChange([]); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs border-b border-slate-100 hover:bg-slate-50 transition-colors">
              {allSel ? <CheckSquare className="w-4 h-4 text-blue-500 shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
              <span className={allSel ? 'font-bold text-blue-600' : 'text-slate-600'}>All {label}s</span>
            </button>
            <div className="max-h-52 overflow-y-auto">
              {options.map(opt => {
                const checked = selected.includes(opt);
                return (
                  <button key={opt} onClick={() => toggle(opt)}
                    className="w-full flex items-start gap-3 px-4 py-2.5 text-xs hover:bg-slate-50 transition-colors text-left">
                    {checked ? <CheckSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />}
                    <span className={checked ? 'text-blue-700 font-medium leading-snug' : 'text-slate-600 leading-snug'}>{opt}</span>
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

// ─── Anomaly Card ─────────────────────────────────────────────────
function AnomalyCard({ anomaly, onViewDetails }: { anomaly: Anomaly; onViewDetails: (id: string) => void }) {
  const sev = SEVERITY_CFG[anomaly.severity];
  const sta = STATUS_CFG[anomaly.status];

  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-l-4 shadow-sm overflow-hidden flex ${sev.border}`}>
      <div className="p-5 flex-1 flex flex-col md:flex-row gap-5">
        {/* Left: main info */}
        <div className="flex-1 space-y-3">
          {/* Top row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${sev.badge}`}>
              {anomaly.severity} Priority
            </span>
            <span className="text-xs text-slate-400 font-mono">{anomaly.id}</span>
            <span className="text-xs text-slate-300">·</span>
            <span className="text-xs text-slate-400">Detected {anomaly.date}</span>
            <span className={`ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${sta.bg} ${sta.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sta.dot}`} />
              {anomaly.status}
            </span>
          </div>

          {/* Type + entity */}
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              {anomaly.type === 'Abnormal Allocation Spike' && <ArrowUpRight className="w-4 h-4 text-orange-500 shrink-0" />}
              {anomaly.type === 'Verification Mismatch' && <BadgeAlert className="w-4 h-4 text-red-500 shrink-0" />}
              {anomaly.type === 'Fund Idling' && <TrendingDown className="w-4 h-4 text-yellow-500 shrink-0" />}
              {anomaly.type === 'Duplicate Disbursement' && <FileWarning className="w-4 h-4 text-red-500 shrink-0" />}
              {anomaly.type === 'Contractor Non-Performance' && <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />}
              {anomaly.type}
            </h3>
            <p className="text-sm text-slate-600 font-medium mt-0.5 truncate">{anomaly.projectName}</p>
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-slate-700 text-xs leading-relaxed">{anomaly.description}</p>
          </div>

          {/* Tags row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              <Building2 className="w-3 h-3" />
              {anomaly.department.replace('Ministry of ', 'Min. of ')}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              <Layers className="w-3 h-3" />{anomaly.scheme}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              <ShieldAlert className="w-3 h-3" />{anomaly.vendor}
            </span>
          </div>
        </div>

        {/* Right: amount + action */}
        <div className="md:w-52 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5 gap-4">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Funds at Risk</p>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(anomaly.amountAtRisk)}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              of {formatCurrency(anomaly.amountAtRisk * 2)} allocated
            </p>
          </div>
          <div className="space-y-2">
            <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-center ${sta.bg} ${sta.text}`}>
              {anomaly.status}
            </div>
            <button
              onClick={() => onViewDetails(anomaly.projectId)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              View in Flow Tracker →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Anomalies() {
  const navigate = useNavigate();
  const profileState = localStorage.getItem('govflow_state') || 'Maharashtra';
  const profileDistrict = localStorage.getItem('govflow_district') || 'Mumbai';

  // ── Location filter (State → District) ──────────────────────
  const [activeState, setActiveState] = useState(profileState);
  const [activeDistrict, setActiveDistrict] = useState(profileDistrict);
  const [draftState, setDraftState] = useState(profileState);
  const [draftDistrict, setDraftDistrict] = useState(profileDistrict);
  const draftDistricts = getDistricts(draftState);

  const handleDraftStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const s = e.target.value;
    setDraftState(s);
    setDraftDistrict(getDistricts(s)[0] || '');
  };

  const applyLocation = () => {
    setActiveState(draftState);
    setActiveDistrict(draftDistrict);
    resetGovFilters();
  };

  const resetToMyLocation = () => {
    setActiveState(profileState); setActiveDistrict(profileDistrict);
    setDraftState(profileState); setDraftDistrict(profileDistrict);
    resetGovFilters();
  };

  const isMyLocation = activeState === profileState && activeDistrict === profileDistrict;

  // Anomalies for the active location
  const localAnomalies = useMemo(
    () => getAnomaliesForLocation(activeState, activeDistrict),
    [activeState, activeDistrict]
  );

  const [apiAnomalies, setApiAnomalies] = useState<AnomalyData[] | null>(null);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const res = await anomaliesApi.list({ state: activeState, district: activeDistrict });
        setApiAnomalies(res.data);
      } catch {
        setApiAnomalies(null);
      }
    };
    fetchAnomalies();
  }, [activeState, activeDistrict]);

  const allAnomalies = apiAnomalies && apiAnomalies.length > 0
    ? apiAnomalies.map(a => ({
      id: a.anomaly_id,
      projectId: a.project_id,
      projectName: a.project_name,
      department: a.department,
      scheme: a.scheme,
      vendor: a.vendor,
      status: a.status as any,
      severity: a.severity as any,
      type: a.anomaly_type,
      description: a.description,
      amountAtRisk: a.amount_at_risk,
      date: a.date,
      district: a.district,
    }))
    : localAnomalies;

  // ── Search ────────────────────────────────────────────────────
  const [search, setSearch] = useState('');

  // ── Gov-work filters (same order as Dashboard) ───────────────
  const [selDepts, setSelDepts] = useState<string[]>([]);
  const [selSchemes, setSelSchemes] = useState<string[]>([]);
  const [selVendors, setSelVendors] = useState<string[]>([]);
  const [selSeverities, setSelSeverities] = useState<string[]>([]);
  const [selStatuses, setSelStatuses] = useState<string[]>([]);

  const resetGovFilters = () => {
    setSearch('');
    setSelDepts([]); setSelSchemes([]); setSelVendors([]);
    setSelSeverities([]); setSelStatuses([]);
  };

  const activeFilterCount =
    selDepts.length + selSchemes.length + selVendors.length +
    selSeverities.length + selStatuses.length;

  // Cascading options
  const availableSchemes = useMemo(() =>
    selDepts.length === 0
      ? Object.values(SCHEMES_BY_DEPT).flat()
      : selDepts.flatMap(d => SCHEMES_BY_DEPT[d] ?? []),
    [selDepts]);

  const availableVendors = useMemo(() =>
    [...new Set(
      allAnomalies
        .filter(a => selDepts.length === 0 || selDepts.includes(a.department))
        .filter(a => selSchemes.length === 0 || selSchemes.includes(a.scheme))
        .map(a => a.vendor)
    )],
    [allAnomalies, selDepts, selSchemes]);

  // Final filtered list
  const filtered = useMemo(() =>
    allAnomalies
      .filter(a => selDepts.length === 0 || selDepts.includes(a.department))
      .filter(a => selSchemes.length === 0 || selSchemes.includes(a.scheme))
      .filter(a => selVendors.length === 0 || selVendors.includes(a.vendor))
      .filter(a => selSeverities.length === 0 || selSeverities.includes(a.severity))
      .filter(a => selStatuses.length === 0 || selStatuses.includes(a.status))
      .filter(a => !search
        || a.projectName.toLowerCase().includes(search.toLowerCase())
        || a.type.toLowerCase().includes(search.toLowerCase())
        || a.vendor.toLowerCase().includes(search.toLowerCase())
        || a.id.toLowerCase().includes(search.toLowerCase())),
    [allAnomalies, selDepts, selSchemes, selVendors, selSeverities, selStatuses, search]);

  // Summary counts
  const highCount = filtered.filter(a => a.severity === 'High').length;
  const mediumCount = filtered.filter(a => a.severity === 'Medium').length;
  const lowCount = filtered.filter(a => a.severity === 'Low').length;
  const totalAtRisk = filtered.reduce((s, a) => s + a.amountAtRisk, 0);

  return (
    <div className="space-y-5">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Anomaly Detection Center</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-sm text-slate-500">
              Viewing: <span className="font-semibold text-slate-700">{activeDistrict}, {activeState}</span>
            </span>
            {isMyLocation && (
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                My Location
              </span>
            )}
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors self-start">
          <ShieldAlert className="w-4 h-4" /> Run Manual Scan
        </button>
      </div>

      {/* ── Summary stat row ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'High Priority', count: highCount, color: 'bg-red-50 border-red-200 text-red-700', dot: 'bg-red-500' },
          { label: 'Medium Priority', count: mediumCount, color: 'bg-orange-50 border-orange-200 text-orange-700', dot: 'bg-orange-500' },
          { label: 'Low Priority', count: lowCount, color: 'bg-yellow-50 border-yellow-200 text-yellow-700', dot: 'bg-yellow-400' },
          { label: 'Total at Risk', count: null, value: formatCurrency(totalAtRisk), color: 'bg-slate-50 border-slate-200 text-slate-700', dot: 'bg-slate-400' },
        ].map(({ label, count, value, color, dot }) => (
          <div key={label} className={`rounded-xl border p-4 flex items-center gap-3 ${color}`}>
            <div className={`w-3 h-3 rounded-full shrink-0 ${dot}`} />
            <div>
              <p className="text-xs font-medium opacity-70">{label}</p>
              <p className="text-lg font-bold">{count !== null ? count : value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter panel ─────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-5">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filters</p>
            {activeFilterCount > 0 && (
              <span className="text-[11px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button onClick={resetGovFilters}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition-colors">
              <RotateCcw className="w-3 h-3" />Clear filters
            </button>
          )}
        </div>

        {/* ── STEP 1: Location — State + District ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            {/* State */}
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">State / UT</label>
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
            {/* District */}
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">District / City</label>
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
            {/* Actions */}
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
                  <RotateCcw className="w-3.5 h-3.5" />My Location
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* ── STEP 2: Gov-work filters ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Government Work</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by project name, anomaly type, vendor, ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 5 cascade dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <MultiSelect
              label="Department"
              icon={Building2}
              options={DEPARTMENTS}
              selected={selDepts}
              onChange={v => { setSelDepts(v); setSelSchemes([]); setSelVendors([]); }}
            />
            <MultiSelect
              label="Scheme"
              icon={Layers}
              options={availableSchemes}
              selected={selSchemes}
              onChange={v => { setSelSchemes(v); setSelVendors([]); }}
            />
            <MultiSelect
              label="Vendor"
              icon={ShieldAlert}
              options={availableVendors}
              selected={selVendors}
              onChange={setSelVendors}
            />
            <MultiSelect
              label="Severity"
              icon={AlertTriangle}
              options={ALL_ANOMALY_SEVERITIES}
              selected={selSeverities}
              onChange={setSelSeverities}
            />
            <MultiSelect
              label="Status"
              icon={CheckCircle2}
              options={ALL_ANOMALY_STATUSES}
              selected={selStatuses}
              onChange={setSelStatuses}
            />
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            {[
              ...selDepts.map(v => ({ label: v, clear: () => setSelDepts(selDepts.filter(x => x !== v)) })),
              ...selSchemes.map(v => ({ label: v, clear: () => setSelSchemes(selSchemes.filter(x => x !== v)) })),
              ...selVendors.map(v => ({ label: v, clear: () => setSelVendors(selVendors.filter(x => x !== v)) })),
              ...selSeverities.map(v => ({ label: v, clear: () => setSelSeverities(selSeverities.filter(x => x !== v)) })),
              ...selStatuses.map(v => ({ label: v, clear: () => setSelStatuses(selStatuses.filter(x => x !== v)) })),
            ].map(({ label, clear }) => (
              <span key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium rounded-lg">
                {label.length > 30 ? label.slice(0, 28) + '…' : label}
                <button onClick={clear} className="hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Results header ───────────────────────────────────────── */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of{' '}
          <span className="font-semibold">{allAnomalies.length}</span> anomalies
          {activeFilterCount > 0 && <span className="text-blue-500 ml-1">(filtered)</span>}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />High</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />Medium</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />Low</span>
        </div>
      </div>

      {/* ── Anomaly list ─────────────────────────────────────────── */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
            <Search className="w-10 h-10 text-slate-200 mx-auto mb-4" />
            <p className="text-base font-semibold text-slate-500">No anomalies match your filters</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting or clearing the active filters</p>
            <button onClick={resetGovFilters}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-100 transition-colors">
              Clear all filters
            </button>
          </div>
        ) : (
          filtered.map(anomaly => (
            <AnomalyCard
              key={anomaly.id}
              anomaly={anomaly}
              onViewDetails={(projectId) => navigate(`/flow/${projectId}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}