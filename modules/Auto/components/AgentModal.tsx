
import React from 'react';
import { XCircle, MessageSquare, ScanLine } from 'lucide-react';
import { AutoState, TestSubType } from '../../../types';

interface AgentSelectionModalProps {
    onSelectAgent: (id: string) => void;
    onSelectSubType: (subType: TestSubType) => void;
    setViewState: (view: AutoState) => void;
    getSubTypesForAgent: (id: string) => string[];
    onClose: () => void;
}

export const AgentSelectionModal: React.FC<AgentSelectionModalProps> = ({ onSelectAgent, onSelectSubType, setViewState, getSubTypesForAgent, onClose }) => {
    const handleAgentSelect = (agentId: string) => {
        onSelectAgent(agentId);
        // Document agents go to type selection (Full Pipeline vs OCR)
        // Assistant goes directly to configuration
        setViewState('type-modal');
    };

    return (
        <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-200">
              <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Select Agent to Evaluate</h2>
              <p className="text-sm text-slate-500 text-center mb-8">Choose an agent type for automated evaluation</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div 
                    onClick={() => handleAgentSelect('assistant')}
                    className="group bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-sky-400 hover:bg-sky-50 cursor-pointer transition-all"
                >
                    <div className="w-12 h-12 bg-sky-50 group-hover:bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 mb-5 group-hover:scale-110 transition-all">
                        <MessageSquare size={24} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Assistant</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Evaluate conversational RAG, slot filling, and query rewriting capabilities.</p>
                </div>
                <div 
                    onClick={() => handleAgentSelect('doc-pipeline')}
                    className="group bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all"
                >
                    <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-all">
                        <ScanLine size={24} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Document Agents</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Evaluate OCR extraction, entity recognition, and document classification.</p>
                </div>
              </div>
           </div>
        </div>
    );
};