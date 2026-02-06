
import React from 'react';
import { Terminal, ChevronRight, FileText, Database, Layers, ArrowUpRight } from 'lucide-react';
import { TerminalData, OrchestrationStep } from '../../types';

interface DebugTerminalProps {
  data?: TerminalData;
}

const getAgentColorClasses = (color: string) => {
  const colorMap: Record<string, { dot: string; text: string; bg: string; border: string }> = {
    purple: { dot: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50/50', border: 'border-purple-100' },
    orange: { dot: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50/50', border: 'border-orange-100' },
    blue: { dot: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-100' },
    green: { dot: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50/50', border: 'border-green-100' },
    amber: { dot: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50/50', border: 'border-amber-100' },
    teal: { dot: 'bg-teal-500', text: 'text-teal-600', bg: 'bg-teal-50/50', border: 'border-teal-100' },
  };
  return colorMap[color] || colorMap.purple;
};

// Default terminal data for when no specific run data is provided
const defaultTerminalData: TerminalData = {
  traceId: 'req_892jks9',
  orchestrationSteps: [
    {
      id: 'step-1',
      agent: '@Orchestrator',
      agentColor: 'purple',
      timestamp: '10:24:02.120',
      action: 'Routing Decision',
      details: 'Dispatching tasks:\n1. Summarization → @DocReader\n2. Comparison → @Analyst'
    },
    {
      id: 'step-2',
      agent: '@DocReader',
      agentColor: 'orange',
      timestamp: '10:24:02.450',
      action: 'Extraction',
      details: 'Extracted key metrics from Q4_Earnings.pdf (Page 3, Table 1).'
    },
    {
      id: 'step-3',
      agent: '@Analyst',
      agentColor: 'blue',
      timestamp: '10:24:03.100',
      action: 'SQL Query Execution',
      details: "SELECT * FROM projections WHERE quarter = 'Q4' AND year = 2023;"
    }
  ],
  metrics: {
    totalCost: '$0.042',
    latency: '2.4s',
    tokens: 1248,
    steps: 3
  },
  retrievalContext: [
    {
      fileName: 'Q4_Earnings.pdf',
      chunkId: 'chunk_02',
      preview: '"...revenue increased by 15% YoY to $4.2M while operating expenses..."'
    }
  ]
};

export const DebugTerminal: React.FC<DebugTerminalProps> = ({ data }) => {
  const terminalData = data || defaultTerminalData;
  
  return (
    <div className="bg-white border-t border-slate-200 h-[35%] flex flex-col flex-shrink-0 font-sans">
      {/* Header */}
      <div className="h-10 border-b border-slate-100 flex items-center justify-between px-4 bg-slate-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wide">
             <Terminal size={10} /> Debug Terminal
          </div>
          <span className="text-xs text-slate-500">Trace ID: <span className="text-slate-900 font-mono">{terminalData.traceId}</span></span>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Active
           </div>
           <button className="text-xs text-slate-400 hover:text-slate-600">Clear</button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex min-h-0">
        {/* Left Panel: Orchestration Flow */}
        <div className="w-[65%] border-r border-slate-100 p-6 overflow-y-auto">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 sticky top-0 bg-white pb-2 z-10">Orchestration Flow</h3>
           
           <div className="relative pl-2">
             {/* Vertical Line */}
             <div className="absolute left-[7px] top-2 bottom-0 w-px bg-slate-200"></div>

             {terminalData.orchestrationSteps.map((step) => {
               const colors = getAgentColorClasses(step.agentColor);
               return (
                 <div key={step.id} className="relative pl-8 mb-8 group">
                   <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${colors.dot} ring-4 ring-white z-10`}></div>
                   <div className="flex items-baseline gap-2 mb-2">
                     <span className={`text-sm font-bold ${colors.text}`}>{step.agent}</span>
                     <span className="text-xs font-mono text-slate-400">{step.timestamp}</span>
                   </div>
                   <div className={`${colors.bg} rounded-lg p-3 border ${colors.border} text-sm`}>
                     <div className={`font-bold ${colors.text.replace('600', '700')} mb-2 flex items-center gap-2 text-xs uppercase tracking-wide`}>
                       <ChevronRight size={14} strokeWidth={3} /> {step.action}
                     </div>
                     <div className="text-slate-700 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                       {step.details}
                     </div>
                   </div>
                 </div>
               );
             })}

           </div>
        </div>

        {/* Right Panel: Metrics */}
        <div className="flex-1 bg-slate-50/30 p-6 overflow-y-auto flex flex-col gap-8">
           {/* Metrics */}
           <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 sticky top-0 bg-slate-50/0 backdrop-blur-sm z-10">Session Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                 <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Cost</div>
                    <div className="text-lg font-mono text-slate-900 font-semibold">{terminalData.metrics.totalCost}</div>
                 </div>
                 <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Latency</div>
                    <div className="text-lg font-mono text-slate-900 font-semibold">{terminalData.metrics.latency}</div>
                 </div>
                 <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tokens</div>
                    <div className="text-lg font-mono text-slate-900 font-semibold">{terminalData.metrics.tokens.toLocaleString()}</div>
                 </div>
                 <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Steps</div>
                    <div className="text-lg font-mono text-slate-900 font-semibold">{terminalData.metrics.steps}</div>
                 </div>
              </div>
           </div>

           {/* Retrieval Context */}
           {terminalData.retrievalContext.length > 0 && (
             <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 sticky top-0 bg-slate-50/0 backdrop-blur-sm z-10">Retrieval Context</h3>
                {terminalData.retrievalContext.map((chunk, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)] group cursor-pointer hover:border-slate-300 transition-colors mb-2">
                      <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                              <FileText size={14} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-700">{chunk.fileName}</span>
                          </div>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">{chunk.chunkId}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic leading-relaxed border-l-2 border-slate-200 pl-2">
                          {chunk.preview}
                      </p>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
