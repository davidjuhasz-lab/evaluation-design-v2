
import React from 'react';
import { 
  FileText, 
  Settings, 
  Check,
  ChevronDown,
  AlertCircle,
  FileJson,
  Gauge,
  XCircle,
  AlertTriangle,
  Scale,
  User,
  Calendar,
  Microscope
} from 'lucide-react';
import { TestSubType } from '../../../types';

interface ResultRowProps {
  agentType: string;
  subType: TestSubType;
  data: any;
  expanded: boolean;
  onToggle: () => void;
  onManualEval: () => void;
}

export const ResultRow: React.FC<ResultRowProps> = ({ agentType, subType, data, expanded, onToggle, onManualEval }) => {
  // For Docu Pipeline: Check if any metric is below threshold (7.0) to flag the whole row
  const isDocuFlagged = subType.startsWith('docu') && data.metrics.some((m: any) => m.value < 7.0);
  const rowBorderClass = isDocuFlagged ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-transparent';
  
  return (
    <div className={`border border-slate-200 rounded-xl mb-3 bg-white shadow-sm transition-all hover:shadow-md ${rowBorderClass}`}>
      <div 
        onClick={onToggle} 
        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors ${expanded ? 'rounded-t-xl' : 'rounded-xl'}`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDocuFlagged ? 'bg-rose-100 text-rose-600' : data.status === 'pass' ? 'bg-emerald-100 text-emerald-600' : data.status === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
            {isDocuFlagged ? <AlertCircle size={16} /> : data.status === 'pass' ? <Check size={16} /> : data.status === 'warning' ? <AlertTriangle size={16} /> : <XCircle size={16} />}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                {subType.startsWith('docu') && <FileText size={14} className="text-slate-400"/>}
                {data.title}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
               {subType.startsWith('docu') ? (
                  <>
                    <span className="font-mono bg-slate-100 px-1 rounded">{data.fileType}</span>
                    <span className="text-slate-300">|</span>
                    <span>Size: {data.fileSize}</span>
                  </>
               ) : (
                  <>
                    <span>Tokens: <span className="font-mono text-slate-700">{data.tokens || '420'}</span></span>
                    <span className="text-slate-300">|</span>
                    <span>Cost: <span className="font-mono text-slate-700">${data.cost || '0.002'}</span></span>
                    <span className="text-slate-300">|</span>
                    <span>Time: <span className="font-mono text-slate-700">{data.time || '1.2s'}</span></span>
                  </>
               )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {data.metricsSummary && (
               <div className="flex items-center gap-2 mr-4">
                   {data.metricsSummary.map((m: any, i: number) => (
                       <div key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.status === 'pass' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : m.status === 'fail' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                           {m.name}: {m.value}
                       </div>
                   ))}
               </div>
           )}
           {/* Quick Stats for Documents */}
           {subType.startsWith('docu') && (
               <div className="flex items-center gap-1 mr-4">
                   {data.metrics.map((m: any, i: number) => (
                       <div key={i} className={`w-8 h-1 rounded-full ${m.value < 7.0 ? 'bg-rose-500' : 'bg-emerald-500'}`} title={`${m.name}: ${m.value}/10`}></div>
                   ))}
               </div>
           )}

           <div className="px-2 py-1 bg-slate-100 rounded border border-slate-200 flex items-center gap-1.5 text-xs text-slate-500" title="Agent Settings Snapshot">
              <Settings size={12} /> <span>v1.2</span>
           </div>
           <ChevronDown size={18} className={`text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Manual Debug Button Action Area */}
          <div className="flex justify-end -mt-2 mb-2">
             <button 
                onClick={(e) => { e.stopPropagation(); onManualEval(); }} 
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 rounded-lg text-xs font-bold transition-all shadow-sm group"
             >
                 <Microscope size={14} className="group-hover:scale-110 transition-transform" /> Inspect in Manual Debugger
             </button>
          </div>

          {subType === 'assistant-single' && (
            <>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Expected Answer</h4>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700">{data.expected}</div>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Actual Output</h4>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700">{data.actual}</div>
                 </div>
              </div>
            </>
          )}

          {subType.startsWith('docu') && (
            <>
                {/* Confidence Metrics Visualization */}
                <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Gauge size={14} /> Evaluation Step Confidence
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                        {data.metrics.map((metric: any, i: number) => {
                            const isLowConfidence = metric.value < 7.0;
                            return (
                                <div key={i} className={`p-4 rounded-lg border ${isLowConfidence ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200'}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-xs font-bold uppercase ${isLowConfidence ? 'text-rose-700' : 'text-slate-500'}`}>{metric.name}</span>
                                        {isLowConfidence && <AlertCircle size={14} className="text-rose-500" />}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-2xl font-bold font-mono ${isLowConfidence ? 'text-rose-600' : 'text-emerald-600'}`}>{metric.value}</span>
                                        <span className="text-xs text-slate-400">/ 10</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${isLowConfidence ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                            style={{ width: `${(metric.value / 10) * 100}%` }}
                                        ></div>
                                    </div>
                                    {isLowConfidence && <p className="text-[10px] text-rose-600 mt-2 font-medium">Confidence check failed.</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Extracted Data Preview */}
                <div>
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <FileJson size={14} /> Extracted Data
                    </h4>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <pre>{JSON.stringify(data.extractedData, null, 2)}</pre>
                    </div>
                </div>
            </>
          )}

          {/* Common Retrieved Chunks Section - Hide for docu pipeline as it uses extraction logic */}
          {!subType.startsWith('docu') && (
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Retrieved Chunks</h4>
                <div className="space-y-2">
                    {data.chunks?.map((chunk: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-2 rounded border border-slate-200 text-xs text-slate-600 hover:border-blue-300 transition-colors cursor-pointer group">
                        <div className="p-1 bg-blue-50 text-blue-600 rounded">
                            <FileText size={14} />
                        </div>
                        <span className="font-bold text-slate-700">{chunk.source}</span>
                        <span className="text-slate-300">|</span>
                        <span className="italic truncate flex-1 text-slate-500">"{chunk.excerpt}..."</span>
                    </div>
                    ))}
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
