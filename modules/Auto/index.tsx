
import React, { useState } from 'react';
import { 
  Play, 
  Plus, 
  ListFilter,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { AGENTS, AutoState, TestSubType, ManualModule } from '../../types';
import { PrimaryButton } from '../../components/Shared';

// Components
import { AgentSelectionModal } from './components/AgentModal';
import { TypeSelectionModal } from './components/TypeModal';
import { EditorView } from './views/Editor';
import { ResultsView } from './views/Results';
import { OCRResultsView } from './views/OCRResults';
import { HistoryList } from './views/History';
import { StepperView } from './views/Stepper';
import { SimulationLoading } from './views/SimulationLoading';
import { SimulationReview } from './views/SimulationReview';

interface AutoTestPanelProps {
  onSwitchToManual: (module: ManualModule) => void;
  startWithModal?: boolean;
  initialAgentId?: string;
  initialSubType?: TestSubType;
  onBackToHistory?: () => void;
}

export const AutoTestPanel: React.FC<AutoTestPanelProps> = ({ 
  onSwitchToManual, 
  startWithModal = false, 
  initialAgentId,
  initialSubType,
  onBackToHistory 
}) => {
  // Determine initial view state based on props
  const getInitialViewState = (): AutoState => {
    if (initialAgentId && initialSubType) return 'editor';
    if (startWithModal) return 'agent-modal';
    return 'list';
  };

  const [viewState, setViewState] = useState<AutoState>(getInitialViewState());
  const [activeTab, setActiveTab] = useState<'sets' | 'history'>('history');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(initialAgentId || null);
  const [selectedSubType, setSelectedSubType] = useState<TestSubType>(initialSubType || 'assistant-single');
  const [activeStep, setActiveStep] = useState(0);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Handle closing the modal - go back to history if started with modal
  const handleCloseModal = () => {
    if ((startWithModal || initialAgentId) && onBackToHistory) {
      onBackToHistory();
    } else {
      setViewState('list');
    }
  };
  
  // Handle back from editor
  const handleBackFromEditor = () => {
    if (onBackToHistory) {
      onBackToHistory();
    } else {
      setViewState('list');
    }
  };

  const getSubTypesForAgent = (agentId: string) => {
    switch (agentId) {
        case 'assistant': return ['assistant-single', 'assistant-multi'];
        case 'edu-pers': return ['edu-personalization'];
        case 'edu-syll': return ['edu-syllabus'];
        case 'doc-pipeline': return ['docu-pipeline', 'docu-ocr', 'docu-bulk'];
        default: return [];
    }
  };

  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId) || AGENTS[0];

  const handleCreateClick = () => {
      setViewState('agent-modal');
  };

  const handleRun = () => {
     setViewState('running');
     let step = 0;
     setActiveStep(0);
     const interval = setInterval(() => {
        step++;
        setActiveStep(step);
        if (step >= 4) {
           clearInterval(interval);
           setViewState('results');
        }
     }, 800);
  };

  const handleStartSimulation = () => {
      setViewState('simulating');
      let step = 0;
      setActiveStep(0);
      const interval = setInterval(() => {
          step++;
          setActiveStep(step);
          if (step >= 4) {
              clearInterval(interval);
              setViewState('simulation-review');
          }
      }, 1000); // Slightly longer for simulation
  };

  const handleRunEvaluationFromSimulation = () => {
      // Transition from simulation review to running the eval
      setViewState('running');
      handleRun();
  };

  return (
    <div className="h-full flex flex-col relative">
      {viewState === 'list' && (
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Evaluation Suites</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage and run automated test sets for your agents.</p>
                </div>
                <PrimaryButton onClick={handleCreateClick} icon={Plus}>Create test set</PrimaryButton>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm min-h-[400px]">
                 <div className="flex border-b border-slate-200">
                     <button 
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-sky-500 text-sky-700 bg-sky-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                     >
                        Run History
                     </button>
                     <button 
                        onClick={() => setActiveTab('sets')}
                        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'sets' ? 'border-sky-500 text-sky-700 bg-sky-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                     >
                        Saved Sets
                     </button>
                 </div>
                 
                 {activeTab === 'sets' ? (
                     <div className="p-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center text-sky-600"><ListFilter size={24} /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Peak Test Set v1</h3>
                                    <div className="flex gap-3 mt-1 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><Layers size={12}/> 4 Questions</span>
                                        <span className="flex items-center gap-1"><Clock size={12}/> Feb 6, 2026</span>
                                        <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={12}/> 91%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"><ChevronRight size={20} /></div>
                        </div>
                     </div>
                 ) : (
                     <HistoryList />
                 )}
            </div>
        </div>
      )}

      {viewState === 'agent-modal' && (
          <AgentSelectionModal 
            onSelectAgent={setSelectedAgentId} 
            onSelectSubType={setSelectedSubType} 
            setViewState={setViewState} 
            getSubTypesForAgent={getSubTypesForAgent}
            onClose={handleCloseModal}
          />
      )}
      
      {viewState === 'type-modal' && (
          <TypeSelectionModal 
            selectedAgentId={selectedAgentId} 
            onSelectSubType={setSelectedSubType} 
            setViewState={setViewState}
            onStartSimulation={handleStartSimulation}
            onClose={handleCloseModal}
          />
      )}
      
      {viewState === 'editor' && (
          <div className="flex flex-col h-full bg-slate-50">
              <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
                  <div className="flex items-center gap-4">
                      <button onClick={handleBackFromEditor} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"><ChevronLeft size={20} className="text-slate-500" /></button>
                      <div>
                          <h2 className="text-lg font-bold text-slate-900">{selectedAgent?.name || 'Agent'} Evaluation</h2>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                             <span className="font-medium text-slate-700">Draft Mode</span>
                             <span className="text-slate-300">|</span>
                             <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">{selectedSubType}</span>
                          </div>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="text-xs text-slate-400 mr-2">Est. Cost: $0.12</div>
                     <PrimaryButton onClick={handleRun} icon={Play}>Run Evaluation</PrimaryButton>
                  </div>
              </div>
              <EditorView selectedSubType={selectedSubType} />
          </div>
      )}

      {viewState === 'simulating' && (
          <SimulationLoading activeStep={activeStep} />
      )}

      {viewState === 'simulation-review' && (
          <SimulationReview 
            setViewState={setViewState} 
            onRunEvaluation={handleRunEvaluationFromSimulation}
          />
      )}

      {viewState === 'running' && (
          <StepperView activeStep={activeStep} selectedSubType={selectedSubType} agentName={selectedAgent.name} />
      )}

      {viewState === 'results' && selectedSubType === 'docu-bulk' && (
          <OCRResultsView 
            setViewState={setViewState}
            hasGoldens={true}
            onBackToHistory={onBackToHistory}
          />
      )}

      {viewState === 'results' && selectedSubType !== 'docu-bulk' && (
          <ResultsView 
            selectedSubType={selectedSubType}
            selectedAgentId={selectedAgentId}
            expandedRow={expandedRow}
            setExpandedRow={setExpandedRow}
            setViewState={setViewState}
            onSwitchToManual={onSwitchToManual}
            onBackToHistory={onBackToHistory}
          />
      )}
    </div>
  );
};