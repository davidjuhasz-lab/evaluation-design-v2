
import React, { useState } from 'react';
import { Send, User, Bot, Paperclip, ArrowUp, Zap, ChevronLeft } from 'lucide-react';
import { DebugTerminal } from './DebugTerminal';
import { ManualRunHeader } from './RunHeader';
import { ManualRun, ChatMessage, TerminalData } from '../../types';

interface ManualAssistantProps {
  onBack: () => void;
  run?: ManualRun;
  isInspecting?: boolean;
  availableRuns?: ManualRun[];
  onSelectRun?: (run: ManualRun) => void;
  onNewRun?: () => void;
}

const defaultMessages: ChatMessage[] = [
  { 
    id: 1, 
    role: 'user', 
    content: 'I need to summarize the quarterly earnings report uploaded earlier and compare it with Q3 projections.', 
    timestamp: '10:24 AM' 
  },
  { 
    id: 2, 
    role: 'assistant', 
    content: `I've analyzed the <strong>Q4_Earnings.pdf</strong> and compared it against the Q3 projections. Here are the key findings:

<ul class="list-disc pl-5 my-3 space-y-2">
  <li><strong>Revenue</strong>: $4.2M (Actual) vs $4.0M (Projected) — <span class="text-emerald-600 font-medium">Exceeded by 5.0%</span>.</li>
  <li><strong>Operating Expenses</strong>: $1.65M (Actual) vs $1.8M (Projected) — <span class="text-emerald-600 font-medium">Reduced by 8.3%</span> thanks to automation efforts.</li>
  <li><strong>Net Profit Margin</strong>: Currently stands at a healthy 22%.</li>
</ul>

Overall, Q4 performance surpassed expectations with higher revenue and lower costs.`,
    timestamp: '10:24 AM' 
  }
];

export const ManualAssistant: React.FC<ManualAssistantProps> = ({ 
  onBack, 
  run, 
  isInspecting = false,
  availableRuns = [],
  onSelectRun,
  onNewRun
}) => {
  const messages = run?.messages.length ? run.messages : defaultMessages;
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

      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              <div className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {msg.role === 'assistant' ? (
                  <div className="w-8 h-8 rounded-full bg-[#d2f448] flex items-center justify-center text-slate-900 shadow-sm flex-shrink-0 mt-1">
                    <Bot size={16} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 opacity-0"></div> 
                )}

                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-2xl px-6 py-4 shadow-sm text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                    }`}>
                        <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-2 px-1">
                        {msg.role === 'user' ? 'User' : 'Assistant'} • {msg.timestamp}
                    </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Floating Input Area - only show when not inspecting */}
        {!isInspecting && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto relative bg-white rounded-2xl shadow-lg border border-slate-200 p-2 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Type your instruction to the agent swarm..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 text-slate-700 placeholder:text-slate-400"
              />
              <button className="p-2 bg-[#d2f448] hover:bg-[#c2e438] text-slate-900 rounded-xl transition-colors shadow-sm">
                  <ArrowUp size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      <DebugTerminal data={terminalData} />
    </div>
  );
};
