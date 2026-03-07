import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flag, Clock, CheckCircle2, XCircle, AlertCircle,
  Search, X, ChevronDown, RotateCcw, MapPin,
  Camera, Star, FileText, TrendingUp, Filter,
  Building2, Layers, ArrowRight, Trash2, ShieldAlert,
  CalendarDays, Phone, User,
} from 'lucide-react';

// ─── Types (must mirror FlowTracker's CitizenReport exactly) ──────
interface CitizenReport {
  id: string;
  projectId: string;
  projectName: string;
  department: string;
  scheme: string;
  vendor: string;
  projectStatus: string;
  issueType: string;
  rating: number;
  description: string;
  photoCount: number;
  photos: string[];
  reporterName: string;
  reporterPhone: string;
  timestamp: string;
  reviewStatus: 'Under Review' | 'Acknowledged' | 'Resolved' | 'Rejected';
}

const ISSUE_LABELS: Record<string, string> = {
  not_done: 'Work Not Done',
  poor_quality: 'Poor Quality',
  partial: 'Partially Completed',
  damaged: 'Already Damaged',
  misuse: 'Funds Misused',
};

const REVIEW_STATUS_CFG = {
  'Under Review': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500', Icon: Clock },
  'Acknowledged': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500', Icon: AlertCircle },
  'Resolved': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', Icon: CheckCircle2 },
  'Rejected': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500', Icon: XCircle },
};

// ─── Report Card ──────────────────────────────────────────────────
function ReportCard({ report, onViewProject, onDelete }: {
  report: CitizenReport;
  onViewProject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cfg = REVIEW_STATUS_CFG[report.reviewStatus];
  const date = new Date(report.timestamp);
  const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-start gap-4 p-5">
        {/* Status dot + icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
          <cfg.Icon className={`w-5 h-5 ${cfg.text}`} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {report.reviewStatus}
              </span>
              <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                <Flag className="w-2.5 h-2.5 inline mr-0.5" />
                {ISSUE_LABELS[report.issueType] ?? report.issueType}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
              <CalendarDays className="w-3 h-3" />
              {dateStr} · {timeStr}
            </div>
          </div>

          {/* Project name */}
          <p className="text-sm font-bold text-slate-800 mt-2 leading-snug">{report.projectName}</p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            {report.department.replace('Ministry of ', 'Min. of ')} · {report.scheme}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-[10px] text-slate-500">
              <Camera className="w-3 h-3" />{report.photoCount} photo{report.photoCount !== 1 ? 's' : ''}
            </span>
            {report.rating > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-yellow-600">
                {Array.from({ length: report.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-slate-400 ml-0.5">{report.rating}/5</span>
              </span>
            )}
            <span className="text-[10px] font-mono text-slate-400">{report.id}</span>
          </div>
        </div>
      </div>

      {/* Expanded description */}
      {expanded && (
        <div className="px-5 pb-4 space-y-3 border-t border-slate-50 pt-4">
          <div className="bg-slate-50 rounded-xl p-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Description</p>
            <p className="text-sm text-slate-700 leading-relaxed">{report.description}</p>
          </div>

          {/* Photo thumbnails */}
          {report.photos && report.photos.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Attached Photos ({report.photos.length})</p>
              <div className="flex gap-2 flex-wrap">
                {report.photos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Evidence photo ${i + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => window.open(src, '_blank')}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vendor</p>
              <p className="text-xs font-semibold text-slate-700">{report.vendor}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Project Status</p>
              <p className="text-xs font-semibold text-slate-700">{report.projectStatus}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reported By</p>
              <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <User className="w-3 h-3" />{report.reporterName}
              </p>
            </div>
            {report.reporterPhone && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile</p>
                <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Phone className="w-3 h-3" />+91 {report.reporterPhone}
                </p>
              </div>
            )}
          </div>

          {/* Status timeline */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2">Report Timeline</p>
            <div className="space-y-2">
              {[
                { label: 'Report Submitted', done: true, date: dateStr },
                { label: 'Acknowledged by Department', done: report.reviewStatus !== 'Under Review' },
                { label: 'Field Verification', done: report.reviewStatus === 'Resolved' || report.reviewStatus === 'Rejected' },
                { label: 'Case Closed', done: report.reviewStatus === 'Resolved' || report.reviewStatus === 'Rejected' },
              ].map(({ label, done, date: d }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-blue-500' : 'bg-slate-200'}`}>
                    {done && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={`text-xs ${done ? 'text-blue-700 font-medium' : 'text-slate-400'}`}>{label}</span>
                  {d && done && <span className="text-[10px] text-blue-400 ml-auto">{d}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action footer */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-t border-slate-100">
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Show Less' : 'Show Details'}
        </button>
        <div className="flex-1" />
        <button
          onClick={() => onViewProject(report.projectId)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          View Fund Flow
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => onDelete(report.id)}
          className="flex items-center gap-1 px-2.5 py-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 text-xs font-medium rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Reports() {
  const navigate = useNavigate();

  const readReports = (): CitizenReport[] => {
    try {
      const raw = JSON.parse(localStorage.getItem('govflow_reports') || '[]');
      return raw.map((r: any, i: number) => ({
        id: r.id || `RPT-${Date.now()}-${i}`,
        projectId: r.projectId || r.project_id?.toString() || '',
        projectName: r.projectName || r.project_name || 'Unknown Project',
        department: r.department || '',
        scheme: r.scheme || '',
        vendor: r.vendor || '',
        projectStatus: r.projectStatus || r.project_status || '',
        issueType: r.issueType || r.issue_type || '',
        rating: r.rating || 0,
        description: r.description || '',
        photoCount: r.photoCount || r.photo_count || 0,
        photos: r.photos || [],
        reporterName: r.reporterName || r.reporter_name || '',
        reporterPhone: r.reporterPhone || r.reporter_phone || '',
        timestamp: r.timestamp || new Date().toISOString(),
        reviewStatus: r.reviewStatus || r.review_status || 'Under Review',
      }));
    } catch { return []; }
  };

  const [reports, setReports] = useState<CitizenReport[]>(readReports);

  // Re-read localStorage + fetch from backend on mount
  useEffect(() => {
    const localReports = readReports();

    // Also fetch complaints from backend for admin view
    fetch('http://localhost:8000/api/citizens')
      .then(res => res.json())
      .then((apiReports: any[]) => {
        const backendReports: CitizenReport[] = apiReports.map((r: any, i: number) => ({
          id: r.id?.toString() || `API-${i}`,
          projectId: r.project_id?.toString() || '',
          projectName: r.project_name || '',
          department: r.department || '',
          scheme: r.scheme || '',
          vendor: r.vendor || '',
          projectStatus: '',
          issueType: r.issue_type || '',
          rating: r.rating || 0,
          description: r.description || '',
          photoCount: r.photo_count || 0,
          photos: r.photos || [],
          reporterName: r.reporter_name || '',
          reporterPhone: r.reporter_phone || '',
          timestamp: r.timestamp || new Date().toISOString(),
          reviewStatus: r.review_status || 'Under Review',
        }));

        // Merge: combine backend entries and local entries, avoiding duplicates
        const ids = new Set(localReports.map(r => r.id));
        const merged = [...localReports];
        for (const br of backendReports) {
          if (!ids.has(br.id)) {
            merged.push(br);
          }
        }
        setReports(merged);
      })
      .catch(() => {
        // If backend is down, just use localStorage
        setReports(localReports);
      });
  }, []);

  const [search, setSearch] = useState('');
  const [filterIssue, setFilterIssue] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = useMemo(() =>
    [...reports]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .filter(r => !filterIssue || r.issueType === filterIssue)
      .filter(r => !filterStatus || r.reviewStatus === filterStatus)
      .filter(r => !search
        || r.projectName.toLowerCase().includes(search.toLowerCase())
        || r.description.toLowerCase().includes(search.toLowerCase())
        || r.id.toLowerCase().includes(search.toLowerCase())
        || r.reporterName.toLowerCase().includes(search.toLowerCase())),
    [reports, filterIssue, filterStatus, search]);

  const deleteReport = (id: string) => {
    const updated = reports.filter(r => r.id !== id);
    setReports(updated);
    localStorage.setItem('govflow_reports', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (!window.confirm('Delete all reports? This cannot be undone.')) return;
    setReports([]);
    localStorage.removeItem('govflow_reports');
  };

  // Summary counts
  const underReview = reports.filter(r => r.reviewStatus === 'Under Review').length;
  const acknowledged = reports.filter(r => r.reviewStatus === 'Acknowledged').length;
  const resolved = reports.filter(r => r.reviewStatus === 'Resolved').length;

  if (reports.length === 0) {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Reports</h2>
          <p className="text-sm text-slate-500 mt-1">All citizen reports you've submitted</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Flag className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-base font-bold text-slate-700 mb-2">No Reports Yet</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            You haven't filed any citizen reports. Go to the Fund Flow Tracker, select a project, and use the Citizen Report tab to raise an issue.
          </p>
          <button
            onClick={() => navigate('/flow')}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors mx-auto"
          >
            <TrendingUp className="w-4 h-4" />
            Go to Fund Flow Tracker
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Reports</h2>
          <p className="text-sm text-slate-500 mt-1">
            All citizen reports you've submitted · {reports.length} total
          </p>
        </div>
        <button
          onClick={() => navigate('/flow')}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors self-start"
        >
          <Flag className="w-4 h-4" />
          File New Report
        </button>
      </div>

      {/* ── Summary stat row ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Filed', value: reports.length, bg: 'bg-slate-50  border-slate-200  text-slate-700', dot: 'bg-slate-500' },
          { label: 'Under Review', value: underReview, bg: 'bg-orange-50 border-orange-200 text-orange-700', dot: 'bg-orange-500' },
          { label: 'Acknowledged', value: acknowledged, bg: 'bg-blue-50   border-blue-200   text-blue-700', dot: 'bg-blue-500' },
          { label: 'Resolved', value: resolved, bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-500' },
        ].map(({ label, value, bg, dot }) => (
          <div key={label} className={`rounded-xl border p-4 flex items-center gap-3 ${bg}`}>
            <div className={`w-3 h-3 rounded-full shrink-0 ${dot}`} />
            <div>
              <p className="text-xs font-medium opacity-70">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ──────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search reports by project, description, ID…"
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

        {/* Issue type filter */}
        <div className="relative w-full sm:w-48">
          <select
            value={filterIssue}
            onChange={e => setFilterIssue(e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Issue Types</option>
            {Object.entries(ISSUE_LABELS).map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Review status filter */}
        <div className="relative w-full sm:w-44">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {(search || filterIssue || filterStatus) && (
          <button
            onClick={() => { setSearch(''); setFilterIssue(''); setFilterStatus(''); }}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-slate-500 hover:text-red-500 border border-slate-200 rounded-xl transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />Clear
          </button>
        )}
      </div>

      {/* ── Results count + clear all ─────────────────────────────── */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of {reports.length} reports
        </p>
        <button
          onClick={clearAll}
          className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />Delete all reports
        </button>
      </div>

      {/* ── Report list ──────────────────────────────────────────── */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <Search className="w-8 h-8 text-slate-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No reports match your filters</p>
            <button
              onClick={() => { setSearch(''); setFilterIssue(''); setFilterStatus(''); }}
              className="mt-3 text-xs text-blue-500 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              onViewProject={id => navigate(`/flow/${id}`)}
              onDelete={deleteReport}
            />
          ))
        )}
      </div>
    </div>
  );
}