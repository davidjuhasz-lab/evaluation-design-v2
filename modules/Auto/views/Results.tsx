
import React from 'react';
import { LogOut, ChevronLeft } from 'lucide-react';
import { TestSubType, AutoState, ManualModule } from '../../../types';
import { PrimaryButton } from '../../../components/Shared';
import { ResultRow } from '../components/ResultRow';
import { docuPipelineResults } from '../data';

interface ResultsViewProps {
    selectedSubType: TestSubType;
    selectedAgentId: string | null;
    expandedRow: number | null;
    setExpandedRow: (id: number | null) => void;
    setViewState: (view: AutoState) => void;
    onSwitchToManual: (module: ManualModule) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ selectedSubType, selectedAgentId, expandedRow, setExpandedRow, setViewState, onSwitchToManual }) => {
    const results = selectedSubType.startsWith('docu') ? docuPipelineResults 
                 : [];
    
    const handleManualEval = () => {
        const moduleMap: Record<string, ManualModule> = {
            'assistant-single': 'assistant',
            'assistant-multi': 'assistant',
            'docu-pipeline': 'docu',
            'docu-crosscheck': 'docu',
            'docu-bulk': 'docu',
            'docu-ocr': 'docu'
        };
        onSwitchToManual(moduleMap[selectedSubType] || 'none');
    };

    return (
      <div className="flex flex-col h-full bg-slate-50">
           <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-4">
                  <button onClick={() => setViewState('editor')} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"><ChevronLeft size={20} className="text-slate-500" /></button>
                  <div>
                      <h2 className="text-lg font-bold text-slate-900">Evaluation Results</h2>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>Completed just now</span>
                          <span className="text-slate-300">|</span>
                          <span className={`px-1.5 py-0.5 rounded font-bold ${selectedSubType.startsWith('docu') ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            PASS RATE: {selectedSubType.startsWith('docu') ? '50%' : '66%'}
                          </span>
                      </div>
                  </div>
              </div>
              <div className="flex gap-3">
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-slate-200">Export Report</button>
                  <PrimaryButton onClick={() => setViewState('list')}>Back to Dashboard</PrimaryButton>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-5xl mx-auto">
                {results.map((res, idx) => (
                    <ResultRow 
                        key={idx} 
                        agentType={selectedAgentId || ''} 
                        subType={selectedSubType}
                        data={res} 
                        expanded={expandedRow === idx} 
                        onToggle={() => setExpandedRow(expandedRow === idx ? null : idx)} 
                        onManualEval={handleManualEval}
                    />
                ))}
              </div>
          </div>
      </div>
  );
};