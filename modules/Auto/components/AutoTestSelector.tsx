
import React, { useState } from 'react';
import { MessageSquare, ScanLine, XCircle, ChevronLeft, FileText } from 'lucide-react';
import { TestSubType } from '../../../types';

interface AutoTestSelectorProps {
  onConfigure: (agentId: string, subType: TestSubType) => void;
  onClose: () => void;
}

type ModalStep = 'agent' | 'document-type';

export const AutoTestSelector: React.FC<AutoTestSelectorProps> = ({ onConfigure, onClose }) => {
  const [step, setStep] = useState<ModalStep>('agent');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
    if (agentId === 'doc-pipeline') {
      // Document agents need to choose between Full Pipeline or OCR
      setStep('document-type');
    } else {
      // Assistant goes directly to configuration
      onConfigure(agentId, 'assistant-multi');
    }
  };

  const handleDocumentTypeSelect = (subType: TestSubType) => {
    if (selectedAgent) {
      onConfigure(selectedAgent, subType);
    }
  };

  // Agent selection step
  if (step === 'agent') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
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
  }

  // Document type selection step
  if (step === 'document-type') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-200">
          <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
            <XCircle size={24} />
          </button>
          <button 
            onClick={() => setStep('agent')} 
            className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2 mt-4">Select Evaluation Type</h2>
          <p className="text-sm text-slate-500 text-center mb-8">Choose the evaluation type for your document processing agent</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div 
              onClick={() => handleDocumentTypeSelect('docu-pipeline')}
              className="group bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all"
            >
              <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-all">
                <ScanLine size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Full Pipeline</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Complete evaluation including OCR, classification, entity extraction, and cross-checking.
              </p>
            </div>
            <div 
              onClick={() => handleDocumentTypeSelect('docu-bulk')}
              className="group bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-sky-400 hover:bg-sky-50 cursor-pointer transition-all"
            >
              <div className="w-12 h-12 bg-sky-50 group-hover:bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 mb-5 group-hover:scale-110 transition-all">
                <FileText size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">OCR Only</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Focus on raw text extraction accuracy without classification or entity recognition.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
