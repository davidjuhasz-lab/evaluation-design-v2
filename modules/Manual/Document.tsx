
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { DebugTerminal } from './DebugTerminal';
import { ManualRunHeader } from './RunHeader';
import { ManualRun } from '../../types';

interface ManualDocuProps {
  onBack: () => void;
  run?: ManualRun;
  isInspecting?: boolean;
  availableRuns?: ManualRun[];
  onSelectRun?: (run: ManualRun) => void;
  onNewRun?: () => void;
}

export const ManualDocu: React.FC<ManualDocuProps> = ({ 
  onBack, 
  run, 
  isInspecting = false,
  availableRuns = [],
  onSelectRun,
  onNewRun
}) => {
  const terminalData = run?.terminalData;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Run Header - always show */}
      <ManualRunHeader
        currentRun={run || null}
        availableRuns={availableRuns}
        onSelectRun={onSelectRun || (() => {})}
        onBack={onBack}
        onNewRun={onNewRun}
        isNewRun={!isInspecting && !run}
      />

      <div className="flex-1 flex items-center justify-center p-8 text-center min-h-0">
        <div className="max-w-md">
            <h3 className="text-xl font-semibold text-slate-700">Our current framework with slight modifications for now</h3>
        </div>
      </div>
      <DebugTerminal data={terminalData} />
    </div>
  );
};
