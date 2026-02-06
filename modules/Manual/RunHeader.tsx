
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Clock, Hash, Check, Plus } from 'lucide-react';
import { ManualRun } from '../../types';
import { formatRelativeTime } from '../RunHistory/data';

interface ManualRunHeaderProps {
  currentRun: ManualRun | null;
  availableRuns: ManualRun[];
  onSelectRun: (run: ManualRun) => void;
  onBack: () => void;
  onNewRun?: () => void;
  isNewRun?: boolean;
}

export const ManualRunHeader: React.FC<ManualRunHeaderProps> = ({
  currentRun,
  availableRuns,
  onSelectRun,
  onBack,
  onNewRun,
  isNewRun = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Generate a temporary ID for new runs
  const displayRunId = currentRun?.id || `new-${Date.now().toString(36).slice(-6)}`;
  const displayName = currentRun?.moduleName || 'New Session';

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm z-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} className="text-slate-500" />
        </button>
        
        <div className="flex items-center gap-3">
          {/* Run ID Badge */}
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
            <Hash size={14} className="text-slate-400" />
            <code className="text-sm font-mono font-medium text-slate-700">{displayRunId}</code>
          </div>
          
          {/* Module Name & Time */}
          <div className="text-sm">
            <span className="font-medium text-slate-900">{displayName}</span>
            {currentRun && (
              <span className="text-slate-400 ml-2">
                • {formatRelativeTime(currentRun.createdAt)}
              </span>
            )}
            {isNewRun && (
              <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Run Switcher */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
        >
          <Clock size={14} className="text-slate-400" />
          Switch Run
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsDropdownOpen(false)}
            />
            
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Recent Runs</h4>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {/* New Run Option */}
                {onNewRun && (
                  <button
                    onClick={() => {
                      onNewRun();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition-colors border-b border-slate-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Plus size={16} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-emerald-700">Start New Run</div>
                      <div className="text-xs text-slate-500">Create a fresh session</div>
                    </div>
                  </button>
                )}

                {availableRuns.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-slate-500">
                    No previous runs available
                  </div>
                ) : (
                  availableRuns.map((run) => (
                    <button
                      key={run.id}
                      onClick={() => {
                        onSelectRun(run);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${
                        currentRun?.id === run.id ? 'bg-sky-50' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        currentRun?.id === run.id 
                          ? 'bg-sky-100 text-sky-600' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Hash size={14} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono text-slate-600 truncate">{run.id}</code>
                          {currentRun?.id === run.id && (
                            <Check size={12} className="text-sky-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{formatRelativeTime(run.createdAt)}</span>
                          <span>•</span>
                          <span>{run.duration}</span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
