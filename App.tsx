
import React, { useState } from 'react';
import { Settings, Plus, Play } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Breadcrumbs, PrimaryButton } from './components/Shared';
import { ManualTestSelector } from './modules/Manual/Selector';
import { ManualAssistant } from './modules/Manual/Assistant';
import { ManualEdu } from './modules/Manual/Edu';
import { ManualDocu } from './modules/Manual/Document';
import { AutoTestPanel } from './modules/Auto';
import { RunHistoryLanding } from './modules/RunHistory';
import { AutoRunResults } from './modules/RunHistory/AutoRunResults';
import { AutoTestSelector } from './modules/Auto/components/AutoTestSelector';
import { mockManualRuns } from './modules/RunHistory/data';
import { ViewState, ManualModule, EvalLandingView, ManualRun, AutoRun, TestSubType } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('evaluation');
  const [manualModule, setManualModule] = useState<ManualModule>('none');
  
  // State for navigation
  const [evalLandingView, setEvalLandingView] = useState<EvalLandingView>('history');
  const [selectedManualRun, setSelectedManualRun] = useState<ManualRun | null>(null);
  const [selectedAutoRun, setSelectedAutoRun] = useState<AutoRun | null>(null);
  
  // Modal states
  const [showManualModal, setShowManualModal] = useState(false);
  const [showAutoModal, setShowAutoModal] = useState(false);
  
  // Auto test configuration
  const [autoTestAgentId, setAutoTestAgentId] = useState<string | null>(null);
  const [autoTestSubType, setAutoTestSubType] = useState<TestSubType | null>(null);

  const switchToManual = (module: ManualModule) => {
    setManualModule(module);
    setEvalLandingView('manual-run');
  };

  // Get available runs for a specific module
  const getAvailableRunsForModule = (module: ManualModule): ManualRun[] => {
    return mockManualRuns.filter(run => run.module === module);
  };

  // Handle selecting a different run from the header
  const handleSelectManualRun = (run: ManualRun) => {
    setSelectedManualRun(run);
    setManualModule(run.module);
  };

  // Handle starting a new run from within a manual view
  const handleNewRunFromManual = () => {
    setSelectedManualRun(null);
  };

  // Handle opening a manual run for inspection
  const handleOpenManualRun = (run: ManualRun) => {
    setSelectedManualRun(run);
    setManualModule(run.module);
    setEvalLandingView('manual-run');
  };

  // Handle opening auto run results
  const handleOpenAutoResults = (run: AutoRun) => {
    setSelectedAutoRun(run);
    setEvalLandingView('auto-results');
  };

  // Handle starting new manual test - shows modal
  const handleStartNewManualTest = () => {
    setShowManualModal(true);
  };

  // Handle manual module selection from modal
  const handleManualModuleSelect = (module: ManualModule) => {
    setShowManualModal(false);
    setSelectedManualRun(null);
    setManualModule(module);
    setEvalLandingView('manual-run');
  };

  // Handle starting new auto test - shows modal
  const handleStartNewAutoTest = () => {
    setShowAutoModal(true);
  };

  // Handle auto test configuration complete
  const handleAutoTestConfigure = (agentId: string, subType: TestSubType) => {
    setShowAutoModal(false);
    setAutoTestAgentId(agentId);
    setAutoTestSubType(subType);
    setEvalLandingView('auto-editor');
  };

  // Handle rerunning an auto test
  const handleRerunAutoTest = (run: AutoRun) => {
    setSelectedAutoRun(null);
    setShowAutoModal(true);
    console.log('Rerunning test set:', run.testSetName, 'with agent:', run.agentName);
  };

  // Back to history landing
  const handleBackToHistory = () => {
    setEvalLandingView('history');
    setSelectedManualRun(null);
    setSelectedAutoRun(null);
    setManualModule('none');
    setShowManualModal(false);
    setShowAutoModal(false);
    setAutoTestAgentId(null);
    setAutoTestSubType(null);
  };

  const renderContent = () => {
    if (currentView !== 'evaluation') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center bg-white text-slate-400">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6"><Settings size={40} className="text-slate-300" /></div>
           <h2 className="text-xl font-bold text-slate-900 mb-2">Work in Progress</h2>
           <p className="text-sm text-slate-500 max-w-sm text-center">The {currentView} module is currently under development.</p>
        </div>
      );
    }

    // If viewing auto run results
    if (evalLandingView === 'auto-results' && selectedAutoRun) {
      return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
          <AutoRunResults 
            run={selectedAutoRun} 
            onBack={handleBackToHistory} 
          />
        </div>
      );
    }

    // If viewing manual run inspection
    if (evalLandingView === 'manual-run' && selectedManualRun) {
      return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
          {selectedManualRun.module === 'assistant' ? (
            <ManualAssistant 
              onBack={handleBackToHistory} 
              run={selectedManualRun}
              isInspecting={true}
              availableRuns={getAvailableRunsForModule('assistant')}
              onSelectRun={handleSelectManualRun}
              onNewRun={handleNewRunFromManual}
            />
          ) : selectedManualRun.module === 'docu' ? (
            <ManualDocu 
              onBack={handleBackToHistory}
              run={selectedManualRun}
              isInspecting={true}
              availableRuns={getAvailableRunsForModule('docu')}
              onSelectRun={handleSelectManualRun}
              onNewRun={handleNewRunFromManual}
            />
          ) : (
            <ManualEdu 
              onBack={handleBackToHistory}
              run={selectedManualRun}
              isInspecting={true}
              availableRuns={getAvailableRunsForModule('edu')}
              onSelectRun={handleSelectManualRun}
              onNewRun={handleNewRunFromManual}
            />
          )}
        </div>
      );
    }

    // If in manual testing mode (new test, not inspecting)
    if (evalLandingView === 'manual-run' && manualModule !== 'none') {
      return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
          {manualModule === 'assistant' ? (
            <ManualAssistant 
              onBack={handleBackToHistory}
              availableRuns={getAvailableRunsForModule('assistant')}
              onSelectRun={handleSelectManualRun}
              onNewRun={handleNewRunFromManual}
            />
          ) : manualModule === 'docu' ? (
            <ManualDocu 
              onBack={handleBackToHistory}
              availableRuns={getAvailableRunsForModule('docu')}
              onSelectRun={handleSelectManualRun}
              onNewRun={handleNewRunFromManual}
            />
          ) : (
            <ManualEdu 
              onBack={handleBackToHistory}
              availableRuns={getAvailableRunsForModule('edu')}
              onSelectRun={handleSelectManualRun}
              onNewRun={handleNewRunFromManual}
            />
          )}
        </div>
      );
    }

    // If in auto test editor mode (after configuration)
    if (evalLandingView === 'auto-editor' && autoTestAgentId && autoTestSubType) {
      return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
          <AutoTestPanel 
            onSwitchToManual={switchToManual} 
            startWithModal={false}
            initialAgentId={autoTestAgentId}
            initialSubType={autoTestSubType}
            onBackToHistory={handleBackToHistory} 
          />
        </div>
      );
    }

    // Default: Show Run History Landing Page
    return (
      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
        <div className="pt-8 px-8 pb-4 flex-shrink-0">
          <Breadcrumbs items={['Home', 'Agent Management', 'Evaluation Suite']} onBack={() => {}} />
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Evaluation Suite</h1>
                <p className="text-slate-500 text-sm mt-1">Track and manage all your manual and automated test runs.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleStartNewManualTest}
                  className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-full text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors"
                >
                  <Play size={16} /> Manual Test
                </button>
                <PrimaryButton onClick={handleStartNewAutoTest} icon={Plus}>
                  New Auto Test
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative bg-white px-8 pb-8">
          <RunHistoryLanding 
            onOpenManualRun={handleOpenManualRun}
            onOpenAutoResults={handleOpenAutoResults}
            onStartNewManualTest={handleStartNewManualTest}
            onStartNewAutoTest={handleStartNewAutoTest}
            onRerunAutoTest={handleRerunAutoTest}
          />
        </div>
        
        {/* Manual Test Modal */}
        {showManualModal && (
          <ManualTestSelector 
            onSelect={handleManualModuleSelect}
            onClose={() => setShowManualModal(false)}
            isModal={true}
          />
        )}
        
        {/* Auto Test Modal */}
        {showAutoModal && (
          <AutoTestSelector
            onConfigure={handleAutoTestConfigure}
            onClose={() => setShowAutoModal(false)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen bg-white">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      {renderContent()}
    </div>
  );
}
