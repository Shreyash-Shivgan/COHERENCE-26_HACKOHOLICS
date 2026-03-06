import { anomalies } from '../data/mockData';
import { formatCurrency } from '../lib/utils';
import { AlertTriangle, Search, Filter, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function Anomalies() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Anomaly Detection Center</h2>
          <p className="text-slate-500">AI-driven identification of leakages, mismatches, and abnormal patterns.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Run Manual Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {anomalies.map((anomaly) => (
          <div key={anomaly.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Severity Indicator */}
            <div className={`w-2 md:w-3 shrink-0 ${
              anomaly.severity === 'High' ? 'bg-red-500' : 
              anomaly.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-400'
            }`} />
            
            <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    anomaly.severity === 'High' ? 'bg-red-100 text-red-700' : 
                    anomaly.severity === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {anomaly.severity} Priority
                  </span>
                  <span className="text-sm text-slate-500 font-medium">{anomaly.id}</span>
                  <span className="text-sm text-slate-400">• Detected on {anomaly.date}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    {anomaly.type}
                    {anomaly.type === 'Abnormal Allocation Spike' && <ArrowUpRight className="w-5 h-5 text-orange-500" />}
                  </h3>
                  <p className="text-slate-600 font-medium mt-1">{anomaly.entity}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {anomaly.description}
                  </p>
                </div>
              </div>

              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Funds at Risk</p>
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(anomaly.amountAtRisk)}</p>
                </div>

                <div className="mt-6 md:mt-0 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      anomaly.status === 'Investigating' ? 'bg-blue-500' :
                      anomaly.status === 'Flagged for Audit' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-sm font-medium text-slate-700">{anomaly.status}</span>
                  </div>
                  <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
