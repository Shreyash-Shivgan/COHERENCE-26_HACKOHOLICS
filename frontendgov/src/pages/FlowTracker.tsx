import { fundFlowHierarchy } from '../data/mockData';
import { formatCurrency } from '../lib/utils';
import { ArrowDown, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FlowTracker() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Budget Flow Tracker</h2>
        <p className="text-slate-500">Tracing funds from Union Budget to Implementation Level</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200"></div>

          <div className="space-y-12">
            {fundFlowHierarchy.map((node, index) => (
              <div key={node.level} className="relative flex items-start gap-6">
                {/* Node Icon */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-sm
                  ${node.status === 'Flagged' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}
                `}>
                  <span className="font-bold text-lg">{node.level}</span>
                </div>

                {/* Content Card */}
                <div className={`flex-1 rounded-xl border p-5 transition-all hover:shadow-md
                  ${node.status === 'Flagged' ? 'border-red-200 bg-red-50/30' : 'border-slate-200 bg-white'}
                `}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{node.title}</h3>
                      <p className="text-lg font-bold text-slate-800">{node.entity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-800">{formatCurrency(node.allocated)}</p>
                      <p className="text-xs text-slate-400 mt-1">Allocated on {node.date}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {node.status === 'Flagged' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {node.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {node.status}
                      </span>
                    )}
                  </div>

                  {node.alert && (
                    <div className="mt-4 p-3 bg-red-100/50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Anomaly Detected</p>
                        <p className="text-sm text-red-600 mt-1">{node.alert}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
