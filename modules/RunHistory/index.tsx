
import React, { useState } from 'react';
import { 
  Play, 
  Eye, 
  Search, 
  Filter,
  Clock,
  MessageSquare,
  FileText,
  Bot,
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { RunHistoryEntry, ManualRun, AutoRun, EvalLandingView, ManualModule } from '../../types';
import { mockRunHistory, formatRelativeTime } from './data';

interface RunHistoryLandingProps {
  onOpenManualRun: (run: ManualRun) => void;
  onOpenAutoResults: (run: AutoRun) => void;
  onStartNewManualTest: () => void;
  onStartNewAutoTest: () => void;
  onRerunAutoTest?: (run: AutoRun) => void;
}

const getModuleIcon = (module: ManualModule) => {
  switch (module) {
    case 'assistant': return MessageSquare;
    case 'docu': return FileText;
    default: return Bot;
  }
};

const getModuleColor = (module: ManualModule) => {
  switch (module) {
    case 'assistant': return 'text-sky-600 bg-sky-50';
    case 'docu': return 'text-amber-600 bg-amber-50';
    default: return 'text-slate-600 bg-slate-50';
  }
};

const getStatusBadge = (status: string, passRate?: number) => {
  if (status === 'running') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
        Running
      </span>
    );
  }
  if (status === 'failed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
        <XCircle size={12} />
        Failed
      </span>
    );
  }
  if (passRate !== undefined) {
    const color = passRate >= 90 ? 'bg-emerald-100 text-emerald-700' : 
                  passRate >= 70 ? 'bg-amber-100 text-amber-700' : 
                  'bg-red-100 text-red-700';
    const dot = passRate >= 90 ? 'bg-emerald-500' : 
                passRate >= 70 ? 'bg-amber-500' : 
                'bg-red-500';
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${dot}`}></div>
        {passRate}% Pass
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
      <CheckCircle2 size={12} />
      Completed
    </span>
  );
};

export const RunHistoryLanding: React.FC<RunHistoryLandingProps> = ({
  onOpenManualRun,
  onOpenAutoResults,
  onStartNewManualTest,
  onStartNewAutoTest,
  onRerunAutoTest
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'manual' | 'auto'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredRuns = mockRunHistory.filter(run => {
    const matchesSearch = filterType === 'all' || run.type === filterType;
    const matchesText = run.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (run.type === 'manual' 
        ? (run as ManualRun).moduleName.toLowerCase().includes(searchTerm.toLowerCase())
        : (run as AutoRun).testSetName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch && matchesText;
  });

  const totalPages = Math.ceil(filteredRuns.length / itemsPerPage);
  const paginatedRuns = filteredRuns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowAction = (run: RunHistoryEntry) => {
    if (run.type === 'manual') {
      onOpenManualRun(run as ManualRun);
    } else {
      onOpenAutoResults(run as AutoRun);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search runs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm" 
          />
        </div>
        <div className="flex gap-3">
          {/* Type Filter */}
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => { setFilterType('all'); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${filterType === 'all' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              All
            </button>
            <button 
              onClick={() => { setFilterType('manual'); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l border-slate-200 ${filterType === 'manual' ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Manual
            </button>
            <button 
              onClick={() => { setFilterType('auto'); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l border-slate-200 ${filterType === 'auto' ? 'bg-purple-50 text-purple-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Auto
            </button>
          </div>
        </div>
      </div>

      {/* Run History Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1.2fr_1.2fr_1.2fr_1.2fr_auto] gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="w-[80px]">Type</div>
          <div>Run ID</div>
          <div>Agent</div>
          <div>Time</div>
          <div>Status</div>
          <div className="w-[180px]">Actions</div>
        </div>
        
        {/* Table Body */}
        <div className="overflow-y-auto flex-1">
          {paginatedRuns.map((run) => {
            const isManual = run.type === 'manual';
            const manualRun = run as ManualRun;
            const autoRun = run as AutoRun;
            
            const ModuleIcon = isManual ? getModuleIcon(manualRun.module) : Zap;
            const iconColor = isManual ? getModuleColor(manualRun.module) : 'text-purple-600 bg-purple-50';
            const agentName = isManual ? manualRun.moduleName : autoRun.agentName;
            const testCount = isManual ? `${manualRun.messages.length} messages` : `${autoRun.testCaseCount} test cases`;

            return (
              <div 
                key={run.id} 
                className="grid grid-cols-[auto_1.2fr_1.2fr_1.2fr_1.2fr_auto] gap-4 px-6 py-4 items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group"
              >
                {/* Type Badge */}
                <div className="w-[80px]">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    isManual ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {isManual ? 'Manual' : 'Auto'}
                  </span>
                </div>

                {/* Run ID */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                    <ModuleIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <code className="font-mono text-sm text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{run.id}</code>
                    <p className="text-xs text-slate-500 mt-1 truncate">{testCount}</p>
                  </div>
                </div>
                
                {/* Agent */}
                <div className="text-sm text-slate-600">
                  {agentName}
                </div>
                
                {/* Time */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock size={14} className="text-slate-400" /> 
                    {formatRelativeTime(run.createdAt)}
                  </div>
                  <div className="text-xs text-slate-400">
                    Duration: {run.duration}
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  {getStatusBadge(run.status, isManual ? undefined : autoRun.passRate)}
                </div>
                
                {/* Action Buttons */}
                <div className="w-[180px] flex gap-2">
                  <button 
                    onClick={() => handleRowAction(run)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 hover:text-sky-600 transition-colors flex-1 justify-center"
                  >
                    {isManual ? (
                      <>
                        <Eye size={12} /> Inspect
                      </>
                    ) : (
                      <>
                        <Eye size={12} /> Results
                      </>
                    )}
                  </button>
                  {!isManual && onRerunAutoTest && (
                    <button 
                      onClick={() => onRerunAutoTest(autoRun)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d2f448] hover:bg-[#c3ea3e] rounded-lg text-xs font-bold text-slate-900 transition-colors justify-center"
                      title="Rerun this test set with current agent configuration"
                    >
                      <RotateCcw size={12} /> Rerun
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRuns.length)} of {filteredRuns.length} runs
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 3).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border font-medium transition-colors ${
                  currentPage === page 
                    ? 'border-sky-200 bg-sky-50 text-sky-600' 
                    : 'border-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
