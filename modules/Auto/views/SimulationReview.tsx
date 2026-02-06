
import React, { useState } from 'react';
import { ChevronLeft, RefreshCw, Play, MessageSquare, ChevronDown, User, Bot, Download, CheckCircle2 } from 'lucide-react';
import { PrimaryButton } from '../../../components/Shared';
import { simulatedConversations } from '../data';
import { AutoState } from '../../../types';

interface SimulationReviewProps {
    setViewState: (view: AutoState) => void;
    onRunEvaluation: () => void;
}

export const SimulationReview: React.FC<SimulationReviewProps> = ({ setViewState, onRunEvaluation }) => {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => setViewState('type-modal')} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"><ChevronLeft size={20} className="text-slate-500" /></button>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Review Synthetic Dataset</h2>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500"/> Simulation Complete</span>
                            <span className="text-slate-300">|</span>
                            <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">50 Conversations</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-slate-200 flex items-center gap-2">
                        <RefreshCw size={14} /> Regenerate
                    </button>
                    <PrimaryButton onClick={onRunEvaluation} icon={Play}>Run Evaluation</PrimaryButton>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto space-y-4">
                    {simulatedConversations.map((convo) => (
                        <div key={convo.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            {/* Row Summary */}
                            <div 
                                onClick={() => setExpandedRow(expandedRow === convo.id ? null : convo.id)}
                                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${expandedRow === convo.id ? 'bg-slate-50 border-b border-slate-100' : ''}`}
                            >
                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                    <User size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="text-sm font-bold text-slate-900 truncate">{convo.persona}</h4>
                                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{convo.topic}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate font-mono">{convo.preview}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                                        <MessageSquare size={14} /> {convo.turns} turns
                                    </div>
                                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${expandedRow === convo.id ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* Expanded Conversation Details */}
                            {expandedRow === convo.id && (
                                <div className="p-6 bg-slate-50/50 space-y-4 border-t border-slate-100">
                                    {convo.messages.map((msg, idx) => (
                                        <div key={idx} className={`flex gap-4 ${msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'assistant' ? 'bg-[#D2F948] text-slate-900' : 'bg-slate-200 text-slate-500'}`}>
                                                {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                                            </div>
                                            <div className={`flex-1 max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.role === 'assistant' ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-end pt-4">
                                        <button className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1">
                                            <Download size={12} /> JSON Export
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
