
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Settings, 
  BarChart3, 
  CheckCircle2, 
  XCircle,
  Cpu,
  Thermometer,
  Hash,
  FileText,
  Wrench,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AutoRun, EvalMetric } from '../../types';
import { PrimaryButton } from '../../components/Shared';

interface AutoRunResultsProps {
  run: AutoRun;
  onBack: () => void;
}

const MetricCard: React.FC<{ metric: EvalMetric }> = ({ metric }) => {
  const passed = metric.passed;
  const percentage = Math.min((metric.value / 10) * 100, 100);
  
  return (
    <div className={`bg-white border rounded-xl p-4 ${passed ? 'border-slate-200' : 'border-red-200 bg-red-50/30'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{metric.name}</span>
        {passed ? (
          <CheckCircle2 size={16} className="text-emerald-500" />
        ) : (
          <XCircle size={16} className="text-red-500" />
        )}
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-slate-900">{metric.value.toFixed(1)}</span>
        <span className="text-xs text-slate-500">/ 10</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all ${passed ? 'bg-[#d2f448]' : 'bg-red-400'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="mt-2 text-xs text-slate-500">
        Threshold: {metric.threshold.toFixed(1)}
      </div>
    </div>
  );
};

export const AutoRunResults: React.FC<AutoRunResultsProps> = ({ run, onBack }) => {
  const [showSettings, setShowSettings] = useState(true);
  const [expandedResult, setExpandedResult] = useState<number | null>(null);

  const passedMetrics = run.metrics.filter(m => m.passed).length;
  const totalMetrics = run.metrics.length;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} className="text-slate-500" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{run.testSetName}</h2>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span>Completed {new Date(run.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
              <span className="text-slate-300">|</span>
              <span className={`px-1.5 py-0.5 rounded font-bold ${
                run.passRate >= 90 ? 'bg-emerald-100 text-emerald-700' : 
                run.passRate >= 70 ? 'bg-amber-100 text-amber-700' : 
                'bg-red-100 text-red-700'
              }`}>
                PASS RATE: {run.passRate}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-slate-200">
            Export Report
          </button>
          <PrimaryButton onClick={onBack}>Back to History</PrimaryButton>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Agent Settings Panel */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 border-b border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                  <Settings size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900">Agent Settings</h3>
                  <p className="text-xs text-slate-500">Configuration used for this evaluation run</p>
                </div>
              </div>
              {showSettings ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>
            
            {showSettings && (
              <div className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Model</div>
                      <div className="text-sm font-semibold text-slate-900">{run.agentSettings.model}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                      <Thermometer size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Temperature</div>
                      <div className="text-sm font-semibold text-slate-900">{run.agentSettings.temperature}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                      <Hash size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Max Tokens</div>
                      <div className="text-sm font-semibold text-slate-900">{run.agentSettings.maxTokens.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                      <Wrench size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Tools</div>
                      <div className="text-sm font-semibold text-slate-900">{run.agentSettings.tools.length} enabled</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">System Prompt</div>
                      <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono">
                        {run.agentSettings.systemPrompt}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-4 mt-4">
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-3">Enabled Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {run.agentSettings.tools.map((tool, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Evaluation Metrics</h3>
                    <p className="text-xs text-slate-500">Performance across selected test criteria</p>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">{passedMetrics}</span>
                  <span className="text-slate-500">/{totalMetrics} passing</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {run.metrics.map((metric, idx) => (
                  <MetricCard key={idx} metric={metric} />
                ))}
              </div>
            </div>
          </div>

          {/* Individual Test Results */}
          {run.results.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center text-sky-600">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Test Case Results</h3>
                    <p className="text-xs text-slate-500">{run.results.length} individual test cases</p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {run.results.map((result) => (
                  <div key={result.id} className="px-6 py-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedResult(expandedResult === result.id ? null : result.id)}
                    >
                      <div className="flex items-center gap-4">
                        {result.status === 'pass' ? (
                          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={18} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                            <XCircle size={18} />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm">{result.title}</h4>
                          {result.fileType && (
                            <p className="text-xs text-slate-500">{result.fileType} • {result.fileSize}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          {result.metrics.slice(0, 3).map((m, idx) => (
                            <span key={idx} className={`text-xs px-2 py-1 rounded ${
                              m.value >= 7 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {m.name}: {m.value.toFixed(1)}
                            </span>
                          ))}
                        </div>
                        {expandedResult === result.id ? (
                          <ChevronUp size={18} className="text-slate-400" />
                        ) : (
                          <ChevronDown size={18} className="text-slate-400" />
                        )}
                      </div>
                    </div>
                    
                    {expandedResult === result.id && result.extractedData && (
                      <div className="mt-4 ml-12 p-4 bg-slate-50 rounded-lg">
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Extracted Data</div>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(result.extractedData).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-slate-500">{key.replace(/_/g, ' ')}:</span>
                              <span className="font-medium text-slate-900">{value || 'N/A'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
