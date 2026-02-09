
import React, { useState } from 'react';
import { LogOut, ChevronLeft, GitCompare, ArrowLeftRight, CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { TestSubType, AutoState, ManualModule } from '../../../types';
import { PrimaryButton } from '../../../components/Shared';
import { ResultRow } from '../components/ResultRow';
import { docuPipelineResults, crossCheckResults, CrossCheckResult } from '../data';

interface ResultsViewProps {
    selectedSubType: TestSubType;
    selectedAgentId: string | null;
    expandedRow: number | null;
    setExpandedRow: (id: number | null) => void;
    setViewState: (view: AutoState) => void;
    onSwitchToManual: (module: ManualModule) => void;
    onBackToHistory?: () => void;
}

// Cross-check result card component
const CrossCheckResultCard: React.FC<{ result: CrossCheckResult }> = ({ result }) => {
    const [expanded, setExpanded] = useState(false);
    
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pass': return <CheckCircle2 size={20} className="text-emerald-500" />;
            case 'warning': return <AlertTriangle size={20} className="text-amber-500" />;
            case 'fail': return <XCircle size={20} className="text-red-500" />;
            default: return null;
        }
    };
    
    const getStatusBg = (status: string) => {
        switch (status) {
            case 'pass': return 'bg-emerald-50 border-emerald-200';
            case 'warning': return 'bg-amber-50 border-amber-200';
            case 'fail': return 'bg-red-50 border-red-200';
            default: return 'bg-slate-50 border-slate-200';
        }
    };

    const getFindingStatusStyle = (status: string) => {
        switch (status) {
            case 'match': return 'bg-emerald-100 text-emerald-700';
            case 'mismatch': return 'bg-amber-100 text-amber-700';
            case 'added': return 'bg-blue-100 text-blue-700';
            case 'removed': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getSeverityDot = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500';
            case 'warning': return 'bg-amber-500';
            default: return 'bg-slate-300';
        }
    };

    return (
        <div className={`border rounded-xl overflow-hidden ${getStatusBg(result.status)}`}>
            {/* Header */}
            <div 
                className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-white/30 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-4">
                    {getStatusIcon(result.status)}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200">
                            <FileText size={14} className="text-rose-500" />
                            <span className="text-sm font-medium text-slate-700 max-w-[150px] truncate">{result.doc1Name}</span>
                        </div>
                        <ArrowLeftRight size={16} className="text-slate-400" />
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200">
                            <FileText size={14} className="text-rose-500" />
                            <span className="text-sm font-medium text-slate-700 max-w-[150px] truncate">{result.doc2Name}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">{result.overallScore}%</div>
                        <div className="text-xs text-slate-500">Consistency Score</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        result.crossCheckType === 'version_compare' ? 'bg-purple-100 text-purple-700' :
                        result.crossCheckType === 'reference_verify' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                    }`}>
                        {result.crossCheckType.replace('_', ' ')}
                    </span>
                    {expanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                </div>
            </div>
            
            {/* Expanded Content */}
            {expanded && (
                <div className="border-t border-slate-200 bg-white p-5">
                    {/* Summary */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600">{result.summary}</p>
                    </div>
                    
                    {/* Findings Table */}
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-2 px-3 text-xs font-bold text-slate-500 uppercase">Field</th>
                                <th className="text-left py-2 px-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="text-left py-2 px-3 text-xs font-bold text-slate-500 uppercase">{result.doc1Name.split('.')[0].slice(0, 15)}...</th>
                                <th className="text-left py-2 px-3 text-xs font-bold text-slate-500 uppercase">{result.doc2Name.split('.')[0].slice(0, 15)}...</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {result.findings.map((finding, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="py-2 px-3 font-medium text-slate-700 flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${getSeverityDot(finding.severity)}`}></span>
                                        {finding.category}
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getFindingStatusStyle(finding.status)}`}>
                                            {finding.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 font-mono text-xs text-slate-600">{finding.doc1Value}</td>
                                    <td className="py-2 px-3 font-mono text-xs text-slate-600">{finding.doc2Value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export const ResultsView: React.FC<ResultsViewProps> = ({ selectedSubType, selectedAgentId, expandedRow, setExpandedRow, setViewState, onSwitchToManual, onBackToHistory }) => {
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
                  <PrimaryButton onClick={() => onBackToHistory ? onBackToHistory() : setViewState('list')}>Back to Dashboard</PrimaryButton>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-5xl mx-auto space-y-8">
                {/* Document Results */}
                <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Document Extraction Results</h3>
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

                {/* Cross-Check Results - Only for docu-pipeline */}
                {selectedSubType === 'docu-pipeline' && crossCheckResults.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <GitCompare size={18} className="text-indigo-600" />
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Cross-Check Results</h3>
                            <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                                {crossCheckResults.length} pairs analyzed
                            </span>
                        </div>
                        <div className="space-y-4">
                            {crossCheckResults.map((result) => (
                                <CrossCheckResultCard key={result.linkId} result={result} />
                            ))}
                        </div>
                    </div>
                )}
              </div>
          </div>
      </div>
  );
};