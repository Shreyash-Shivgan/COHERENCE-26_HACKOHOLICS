import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Search, AlertCircle, CheckCircle2, Clock, XCircle,
  AlertTriangle, ArrowDown, MapPin, RotateCcw,
  ChevronDown, Filter, X, Building2,
  TrendingUp, Layers, ChevronRight, Flag,
  Camera, Upload, ThumbsDown, ThumbsUp, Star,
  ImageIcon, Trash2, Send, ShieldAlert, Users,
} from 'lucide-react';
import {
  getProjectsForLocation, getFlowForProject,
  DEPARTMENTS, SCHEMES_BY_DEPT, ALL_STATUSES,
  type Project, type ProjectStatus, type FlowNode,
} from '../data/indiaData';
import { formatCurrency } from '../lib/utils';

// ─── Status configs ────────────────────────────────────────────────
const FLOW_STATUS_CFG: Record<string, { bg: string; text: string; border: string; Icon: any }> = {
  'Disbursed':           { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', Icon: CheckCircle2 },
  'Partially Disbursed': { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    Icon: Clock },
  'Flagged':             { bg: 'bg-red-50',      text: 'text-red-700',     border: 'border-red-200',     Icon: AlertCircle },
  'Pending':             { bg: 'bg-slate-100',   text: 'text-slate-600',   border: 'border-slate-200',   Icon: Clock },
};

const PROJ_STATUS_CFG: Record<ProjectStatus, { bg: string; text: string; Icon: any }> = {
  Ongoing:   { bg: 'bg-blue-50',    text: 'text-blue-700',    Icon: Clock },
  Completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', Icon: CheckCircle2 },
  Delayed:   { bg: 'bg-orange-50',  text: 'text-orange-700',  Icon: AlertCircle },
  Cancelled: { bg: 'bg-red-50',     text: 'text-red-700',     Icon: XCircle },
};

// ─── Issue type options ────────────────────────────────────────────
const ISSUE_TYPES = [
  { id: 'not_done',     label: 'Work Not Done',        desc: 'Project marked complete but work is visibly incomplete' },
  { id: 'poor_quality', label: 'Poor Quality',         desc: 'Work done but quality is unsatisfactory or substandard' },
  { id: 'partial',      label: 'Partially Completed',  desc: 'Only part of the project scope has been executed' },
  { id: 'damaged',      label: 'Already Damaged',      desc: 'Work completed but structure/asset has already deteriorated' },
  { id: 'misuse',       label: 'Funds Misused',        desc: 'Evidence of corruption or misuse of allocated funds' },
];

// ─── Citizen Report Modal ──────────────────────────────────────────
function CitizenReportPanel({
  project,
  onClose,
  onSubmit,
}: {
  project: Project;
  onClose: () => void;
  onSubmit: (report: CitizenReport) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep]             = useState<1 | 2 | 3>(1);
  const [issueType, setIssueType]   = useState('');
  const [rating, setRating]         = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState('');
  const [photos, setPhotos]         = useState<{ file: File; preview: string }[]>([]);
  const [photoError, setPhotoError] = useState('');
  const [name, setName]             = useState('');
  const [phone, setPhone]           = useState('');
  const [submitted, setSubmitted]   = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setPhotoError('');
    const incoming = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (photos.length + incoming.length > 5) {
      setPhotoError('Maximum 5 photos allowed.');
      return;
    }
    const newPhotos = incoming.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const canProceedStep1 = issueType !== '';
  const canProceedStep2 = photos.length > 0 && description.trim().length >= 20;
  const canSubmit       = name.trim().length > 0;

  const handleSubmit = () => {
    const report: CitizenReport = {
      id: `RPT-${Date.now()}`,
      projectId: project.id,
      projectName: project.name,
      department: project.department,
      scheme: project.scheme,
      vendor: project.vendor,
      projectStatus: project.status,
      issueType,
      rating,
      description,
      photoCount: photos.length,
      reporterName: name,
      reporterPhone: phone,
      timestamp: new Date().toISOString(),
      reviewStatus: 'Under Review',
    };
    onSubmit(report);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-emerald-50 border-b border-emerald-100 p-6 text-center">
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg font-bold text-emerald-800">Report Submitted!</h3>
          <p className="text-sm text-emerald-600 mt-1">Your complaint has been registered successfully.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Complaint ID</span>
              <span className="font-mono font-semibold text-slate-800">
                CMP-{Date.now().toString().slice(-8)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Project</span>
              <span className="font-medium text-slate-700 text-right max-w-[200px] truncate">{project.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Photos attached</span>
              <span className="font-semibold text-slate-700">{photos.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status</span>
              <span className="font-semibold text-orange-600">Under Review</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed text-center">
            Your report has been escalated to the concerned department. You will receive updates via SMS.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setIssueType(''); setRating(0); setDescription(''); setPhotos([]); setName(''); setPhone(''); }}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg shadow-orange-100/50">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Citizen Report</h3>
              <p className="text-xs text-orange-100">Report issues with completed project</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step >= s ? 'bg-white text-orange-600' : 'bg-white/20 text-white/60'}`}>
                {step > s ? '✓' : s}
              </div>
              <span className={`text-xs font-medium transition-colors ${step >= s ? 'text-white' : 'text-white/50'}`}>
                {s === 1 ? 'Issue Type' : s === 2 ? 'Evidence' : 'Your Info'}
              </span>
              {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-white/60' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Project reference */}
      <div className="bg-orange-50 border-b border-orange-100 px-5 py-3 flex items-center gap-3">
        <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
        <p className="text-xs text-orange-700 font-medium truncate">{project.name}</p>
        <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full shrink-0">
          Marked Completed
        </span>
      </div>

      {/* ── STEP 1: Issue Type ── */}
      {step === 1 && (
        <div className="p-5 space-y-4">
          <div>
            <p className="text-sm font-bold text-slate-700 mb-1">What is the issue?</p>
            <p className="text-xs text-slate-400">Select the type of problem you've observed</p>
          </div>
          <div className="space-y-2">
            {ISSUE_TYPES.map(issue => (
              <button
                key={issue.id}
                onClick={() => setIssueType(issue.id)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all
                  ${issueType === issue.id
                    ? 'border-orange-400 bg-orange-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/30'
                  }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all
                  ${issueType === issue.id ? 'border-orange-500 bg-orange-500' : 'border-slate-300'}`}>
                  {issueType === issue.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${issueType === issue.id ? 'text-orange-700' : 'text-slate-700'}`}>
                    {issue.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{issue.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Satisfaction rating */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Overall Satisfaction</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(n)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors
                      ${(hoverRating || rating) >= n ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-xs text-slate-500 self-center">
                  {['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][rating]}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Continue — Add Evidence →
          </button>
        </div>
      )}

      {/* ── STEP 2: Evidence (photos + description) ── */}
      {step === 2 && (
        <div className="p-5 space-y-4">
          <div>
            <p className="text-sm font-bold text-slate-700 mb-1">Upload Photo Evidence</p>
            <p className="text-xs text-slate-400">
              Photos are <span className="text-red-600 font-semibold">mandatory</span>. Upload 1–5 clear photos of the issue.
            </p>
          </div>

          {/* Upload zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
              ${photos.length > 0
                ? 'border-orange-300 bg-orange-50/40'
                : 'border-slate-300 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/20'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />
            <Camera className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Click to upload or drag & drop</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, HEIC · Max 5 photos</p>
            {photos.length > 0 && (
              <span className="absolute top-2 right-2 text-xs bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                {photos.length}/5
              </span>
            )}
          </div>

          {/* Photo error */}
          {photoError && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />{photoError}
            </p>
          )}

          {/* Photo previews */}
          {photos.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {photos.map((p, i) => (
                <div key={i} className="relative group aspect-square">
                  <img
                    src={p.preview}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-slate-200"
                  />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center hover:border-orange-300 transition-colors"
                >
                  <Upload className="w-4 h-4 text-slate-300" />
                </button>
              )}
            </div>
          )}

          {/* Mandatory notice */}
          {photos.length === 0 && (
            <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 leading-relaxed">
                <span className="font-bold">Photo evidence is mandatory.</span> Reports without photos cannot be processed or escalated to authorities.
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Describe the Issue <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe what you observed. Be specific — mention location, what was promised vs what was done, approximate dates..."
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs ${description.length < 20 ? 'text-red-400' : 'text-slate-400'}`}>
                {description.length < 20 ? `${20 - description.length} more characters needed` : '✓ Description looks good'}
              </span>
              <span className="text-xs text-slate-300">{description.length}/500</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!canProceedStep2}
              className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Reporter identity ── */}
      {step === 3 && (
        <div className="p-5 space-y-4">
          <div>
            <p className="text-sm font-bold text-slate-700 mb-1">Your Details</p>
            <p className="text-xs text-slate-400">Required for complaint verification and follow-up</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-slate-400 font-normal">(optional but recommended)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <p className="font-bold text-slate-600 uppercase tracking-wider mb-2">Report Summary</p>
            <div className="flex justify-between">
              <span className="text-slate-400">Issue Type</span>
              <span className="font-semibold text-slate-700">
                {ISSUE_TYPES.find(t => t.id === issueType)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Satisfaction Rating</span>
              <span className="font-semibold text-slate-700">
                {rating > 0 ? `${rating}/5 ★` : 'Not rated'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Photos</span>
              <span className="font-semibold text-orange-600">{photos.length} attached ✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Description</span>
              <span className="font-semibold text-slate-700">{description.length} chars</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <ShieldAlert className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Your report will be sent to the concerned department and anti-corruption authorities. False reports are liable under law.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Types ─────────────────────────────────────────────────────────
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
  reporterName: string;
  reporterPhone: string;
  timestamp: string;
  reviewStatus: 'Under Review' | 'Acknowledged' | 'Resolved' | 'Rejected';
}

// ─── Project List Card ─────────────────────────────────────────────
function ProjectCard({ project, selected, onClick }: {
  project: Project; selected: boolean; onClick: () => void;
}) {
  const sc = PROJ_STATUS_CFG[project.status];
  const utilPct = Math.round((project.utilized / project.allocated) * 100);
  const isCompleted = project.status === 'Completed';
  const isReportable = true; // all projects can receive citizen reports

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all group
        ${selected
          ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
        }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            {project.anomalyFlag && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${sc.bg} ${sc.text}`}>
              <sc.Icon className="w-2.5 h-2.5 inline mr-0.5" />{project.status}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-600 flex items-center gap-0.5">
              <Flag className="w-2.5 h-2.5" />Report
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{project.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{project.id}</p>
        </div>
        <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-colors
          ${selected ? 'text-blue-500' : 'text-slate-300 group-hover:text-slate-400'}`} />
      </div>
      <p className="text-xs text-slate-500 truncate mb-2">{project.vendor}</p>
      <p className="text-[10px] text-orange-600 font-medium mb-2 flex items-center gap-1">
        <Flag className="w-3 h-3" />
        Click to view fund flow &amp; raise a citizen report
      </p>
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>{formatCurrency(project.allocated)}</span>
          <span>{utilPct}% used</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-1.5 rounded-full transition-all
              ${utilPct >= 80 ? 'bg-emerald-500' : utilPct >= 50 ? 'bg-blue-500' : 'bg-orange-400'}`}
            style={{ width: `${Math.min(utilPct, 100)}%` }}
          />
        </div>
      </div>
    </button>
  );
}

// ─── Flow Node Card ────────────────────────────────────────────────
function FlowNodeCard({ node, isLast }: { node: FlowNode; isLast: boolean }) {
  const cfg = FLOW_STATUS_CFG[node.status] ?? FLOW_STATUS_CFG['Disbursed'];
  const disbPct = Math.round((node.disbursed / node.allocated) * 100);
  const utilPct = Math.round((node.utilized  / node.allocated) * 100);
  const nodeColor =
    node.status === 'Flagged'            ? 'bg-red-500 text-white shadow-red-200' :
    node.status === 'Pending'            ? 'bg-slate-300 text-slate-600 shadow-slate-100' :
    node.status === 'Partially Disbursed'? 'bg-blue-500 text-white shadow-blue-200' :
    'bg-emerald-500 text-white shadow-emerald-200';

  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center shrink-0 w-12">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10 ${nodeColor}`}>
          {node.level}
        </div>
        {!isLast && (
          <div className="flex flex-col items-center flex-1 py-1">
            <div className="w-px flex-1 bg-slate-200 min-h-4" />
            <ArrowDown className="w-4 h-4 text-slate-300 shrink-0" />
            <div className="w-px flex-1 bg-slate-200 min-h-4" />
          </div>
        )}
      </div>
      <div className={`flex-1 mb-5 rounded-xl border p-5 transition-all hover:shadow-md
        ${node.status === 'Flagged' ? 'border-red-200 bg-red-50/40'
        : node.status === 'Pending' ? 'border-slate-200 bg-slate-50/60'
        : 'border-slate-200 bg-white'}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Level {node.level} · {node.levelLabel}
            </p>
            <p className="text-base font-bold text-slate-800 leading-snug">{node.entity}</p>
            <p className="text-xs text-slate-500 mt-0.5 italic">{node.role}</p>
          </div>
          <div className="sm:text-right shrink-0">
            <p className="text-lg font-bold text-slate-800">{formatCurrency(node.allocated)}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Allocated · {node.date}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span className="font-medium">Disbursed</span>
              <span>{formatCurrency(node.disbursed)} <span className="text-slate-400">({disbPct}%)</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-2 rounded-full bg-blue-400 transition-all" style={{ width: `${Math.min(disbPct, 100)}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span className="font-medium">Utilized</span>
              <span>{formatCurrency(node.utilized)} <span className="text-slate-400">({utilPct}%)</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all
                  ${utilPct >= 80 ? 'bg-emerald-500' : utilPct >= 50 ? 'bg-blue-500' : 'bg-orange-400'}`}
                style={{ width: `${Math.min(utilPct, 100)}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
            <cfg.Icon className="w-3 h-3" />{node.status}
          </span>
          {node.status === 'Flagged' && <span className="text-xs text-red-500 font-semibold">⚠ Anomaly at this level</span>}
          {node.status === 'Pending' && <span className="text-xs text-slate-500">Funds not yet released</span>}
        </div>
        {node.alert && (
          <div className="mt-4 p-3.5 bg-red-100/70 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-800 mb-0.5">Anomaly Detected</p>
              <p className="text-xs text-red-700 leading-relaxed">{node.alert}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function FlowTracker() {
  const profileState    = localStorage.getItem('govflow_state')    || 'Maharashtra';
  const profileDistrict = localStorage.getItem('govflow_district') || 'Mumbai';

  const { projectId: urlProjectId } = useParams<{ projectId: string }>();

  // Auto-select project from URL param on first load
  useEffect(() => {
    if (urlProjectId) {
      setSelectedId(urlProjectId);
      setShowReport(false);
    }
  }, [urlProjectId]);

  const allProjects = useMemo(
    () => getProjectsForLocation(profileState, profileDistrict),
    [profileState, profileDistrict]
  );

  const [search,       setSearch]       = useState('');
  const [filterDept,   setFilterDept]   = useState('');
  const [filterScheme, setFilterScheme] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const schemeOptions = useMemo(() =>
    filterDept ? (SCHEMES_BY_DEPT[filterDept] ?? []) : Object.values(SCHEMES_BY_DEPT).flat(),
    [filterDept]);

  const filteredProjects = useMemo(() =>
    allProjects
      .filter(p => !filterDept   || p.department === filterDept)
      .filter(p => !filterScheme || p.scheme     === filterScheme)
      .filter(p => !filterStatus || p.status     === filterStatus)
      .filter(p => !search
        || p.name.toLowerCase().includes(search.toLowerCase())
        || p.vendor.toLowerCase().includes(search.toLowerCase())
        || p.id.toLowerCase().includes(search.toLowerCase())),
    [allProjects, filterDept, filterScheme, filterStatus, search]);

  const anyFilter = !!(filterDept || filterScheme || filterStatus || search);
  const clearFilters = () => { setSearch(''); setFilterDept(''); setFilterScheme(''); setFilterStatus(''); };

  const [selectedId,     setSelectedId]     = useState<string | null>(null);
  const [showReport,     setShowReport]     = useState(false);
  const [submittedReports, setSubmittedReports] = useState<CitizenReport[]>(() => {
    try { return JSON.parse(localStorage.getItem('govflow_reports') || '[]'); }
    catch { return []; }
  });

  const selectedProject = allProjects.find(p => p.id === selectedId) ?? null;
  const flowNodes = useMemo(() =>
    selectedProject ? getFlowForProject(selectedProject, profileState, profileDistrict) : [],
    [selectedProject, profileState, profileDistrict]);

  const anomalyCount  = flowNodes.filter(n => n.status === 'Flagged').length;
  const utilizationPct = selectedProject
    ? Math.round((selectedProject.utilized / selectedProject.allocated) * 100) : 0;

  const existingReport = submittedReports.find(r => r.projectId === selectedId);

  const handleReportSubmit = (report: CitizenReport) => {
    const updated = [...submittedReports, report];
    setSubmittedReports(updated);
    localStorage.setItem('govflow_reports', JSON.stringify(updated));
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Budget Flow Tracker</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-sm text-slate-500">{profileDistrict}, {profileState}</span>
            <span className="text-[11px] font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">My Location</span>
            {selectedProject && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-sm font-semibold text-slate-700 truncate max-w-xs">{selectedProject.name}</span>
              </>
            )}
          </div>
        </div>
        {selectedProject && (
          <button
            onClick={() => { setSelectedId(null); setShowReport(false); }}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 bg-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />Back to Projects
          </button>
        )}
      </div>

      <div className={`grid gap-5 ${selectedProject ? 'grid-cols-1 lg:grid-cols-[340px_1fr]' : 'grid-cols-1'}`}>

        {/* ── LEFT: Project browser ─────────────────────────────── */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input type="text" placeholder="Search projects or vendors…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filters</span>
              </div>
              {anyFilter && (
                <button onClick={clearFilters} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                  <X className="w-3 h-3" />Clear all
                </button>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Department</label>
              <div className="relative">
                <select value={filterDept} onChange={e => { setFilterDept(e.target.value); setFilterScheme(''); }}
                  className="w-full appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg bg-slate-50 text-xs text-slate-700 focus:ring-2 focus:ring-blue-500">
                  <option value="">All Departments</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d.replace('Ministry of ', 'Min. of ')}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Scheme</label>
              <div className="relative">
                <select value={filterScheme} onChange={e => setFilterScheme(e.target.value)}
                  className="w-full appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg bg-slate-50 text-xs text-slate-700 focus:ring-2 focus:ring-blue-500">
                  <option value="">All Schemes</option>
                  {schemeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Project Status</label>
              <div className="flex flex-wrap gap-1.5">
                {(['', ...ALL_STATUSES] as string[]).map(s => (
                  <button key={s || 'all'} onClick={() => setFilterStatus(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all
                      ${filterStatus === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}>
                    {s || 'All'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick-filter: highlight completed projects */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Quick:</span>
            <button
              onClick={() => setFilterStatus(filterStatus === 'Completed' ? '' : 'Completed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all
                ${filterStatus === 'Completed'
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
                ${filterStatus === 'Completed' ? 'bg-white/30 text-white' : 'bg-emerald-200 text-emerald-800'}`}>
                {allProjects.filter(p => p.status === 'Completed').length}
              </span>
            </button>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <Flag className="w-3 h-3 text-orange-500" />
              Citizen reports available
            </span>
          </div>

          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{filteredProjects.length}</span> of {allProjects.length} projects
            </p>
            {anyFilter && <span className="text-xs text-blue-500 font-medium">Filtered</span>}
          </div>

          <div className="space-y-2 max-h-[calc(100vh-340px)] overflow-y-auto pr-0.5">
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">No projects found</p>
                <button onClick={clearFilters} className="mt-3 text-xs text-blue-500 hover:underline">Clear filters</button>
              </div>
            ) : filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project}
                selected={selectedId === project.id}
                onClick={() => { setSelectedId(selectedId === project.id ? null : project.id); setShowReport(false); }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Flow view ──────────────────────────────────── */}
        {selectedProject ? (
          <div className="space-y-4">

            {/* ── Project title bar ─────────────────────────────── */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {(() => { const sc = PROJ_STATUS_CFG[selectedProject.status]; return (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${sc.bg} ${sc.text}`}>
                        <sc.Icon className="w-3 h-3" />{selectedProject.status}
                      </span>
                    ); })()}
                    {selectedProject.anomalyFlag && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-bold">
                        <AlertTriangle className="w-3 h-3" />Anomaly
                      </span>
                    )}
                    {existingReport && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 border border-orange-200 rounded-full text-xs font-bold">
                        <Flag className="w-3 h-3" />Report Filed
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-800 leading-snug">{selectedProject.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedProject.department} · {selectedProject.scheme}</p>
                </div>
                <div className="flex gap-4 shrink-0 sm:text-right">
                  <div>
                    <p className="text-[10px] text-slate-400">Allocated</p>
                    <p className="text-sm font-bold text-slate-800">{formatCurrency(selectedProject.allocated)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Utilized</p>
                    <p className="text-sm font-bold text-emerald-600">{formatCurrency(selectedProject.utilized)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Rate</p>
                    <p className="text-sm font-bold text-blue-600">{utilizationPct}%</p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-1.5 rounded-full transition-all duration-700
                    ${utilizationPct >= 80 ? 'bg-emerald-500' : utilizationPct >= 50 ? 'bg-blue-500' : 'bg-orange-400'}`}
                    style={{ width: `${Math.min(utilizationPct, 100)}%` }} />
                </div>
              </div>
            </div>

            {/* ── TAB BAR ───────────────────────────────────────── */}
            <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <button
                onClick={() => setShowReport(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all
                  ${!showReport
                    ? 'bg-white text-blue-600 shadow-sm border-b-2 border-blue-500'
                    : 'text-slate-500 hover:text-slate-700'}`}
              >
                <TrendingUp className="w-4 h-4" />
                Fund Flow
                {anomalyCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                    {anomalyCount} ⚠
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowReport(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all
                  ${showReport
                    ? 'bg-white text-orange-600 shadow-sm border-b-2 border-orange-500'
                    : 'text-slate-500 hover:text-orange-600 bg-orange-50/50'}`}
              >
                <Flag className="w-4 h-4" />
                Citizen Report
                {existingReport
                  ? <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full">Filed</span>
                  : <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full animate-pulse">New</span>
                }
              </button>
            </div>

            {/* ── TAB CONTENT ───────────────────────────────────── */}

            {/* FUND FLOW tab */}
            {!showReport && (
              <div className="space-y-4">
                <div className="relative">
                  {flowNodes.map((node, i) => (
                    <FlowNodeCard key={node.level} node={node} isLast={i === flowNodes.length - 1} />
                  ))}
                </div>
              </div>
            )}

            {/* CITIZEN REPORT tab */}
            {showReport && (
              <div className="space-y-4">
                {existingReport ? (
                  /* ── Already submitted — block second submission ── */
                  <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Your Report is Registered</h3>
                        <p className="text-xs text-orange-100 mt-0.5">Only one report allowed per citizen per project</p>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Issue Reported</span>
                          <span className="font-semibold text-slate-800">
                            {ISSUE_TYPES.find(t => t.id === existingReport.issueType)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Photos Submitted</span>
                          <span className="font-semibold text-orange-600">{existingReport.photoCount} attached</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Reported By</span>
                          <span className="font-semibold text-slate-700">{existingReport.reporterName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Status</span>
                          <span className="font-semibold text-orange-600 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Under Review
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                        <ShieldAlert className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700 leading-relaxed">
                          Your complaint has been forwarded to the concerned department. Each citizen can raise one report per project to prevent duplicate submissions. Other citizens can still file independent reports on this project.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Reports from other citizens</p>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                            {Math.floor(Math.random() * 8) + 2}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-700">Other citizens have also reported issues</p>
                            <p className="text-xs text-slate-400">Authorities are reviewing all submissions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Fresh report form ── */
                  <CitizenReportPanel
                    project={selectedProject}
                    onClose={() => setShowReport(false)}
                    onSubmit={handleReportSubmit}
                  />
                )}
              </div>
            )}

          </div>
        ) : (
          <div className="hidden lg:flex flex-col items-center justify-center bg-white border border-dashed border-slate-300 rounded-2xl p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-base font-bold text-slate-700 mb-2">Select a Project</h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Choose any project from the list to trace its complete budget flow — from Union Budget to the contractor.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 flex-wrap justify-center">
              {['Union Budget','Ministry','State','District','Ward','Contractor'].map((s, i, a) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-slate-100 rounded-md">{s}</span>
                  {i < a.length - 1 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}