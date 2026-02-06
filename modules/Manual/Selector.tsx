
import React from 'react';
import { MessageSquare, BookOpen, ScanLine, XCircle } from 'lucide-react';
import { ManualModule } from '../../types';

interface ManualTestSelectorProps {
  onSelect: (module: ManualModule) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const ManualTestSelector: React.FC<ManualTestSelectorProps> = ({ onSelect, onClose, isModal = false }) => {
  const content = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div onClick={() => onSelect('assistant')} className="group bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-sky-400 hover:bg-sky-50 cursor-pointer transition-all">
        <div className="w-12 h-12 bg-sky-50 group-hover:bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 mb-5 group-hover:scale-110 transition-all">
          <MessageSquare size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-2">Assistant</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Test conversational RAG, slot filling, and query rewriting.</p>
      </div>
      <div onClick={() => onSelect('edu')} className="group bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition-all">
        <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 transition-all">
          <BookOpen size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-2">Educational Agents</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Generate syllabi and personalize educational content.</p>
      </div>
      <div onClick={() => onSelect('docu')} className="group bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all">
        <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-all">
          <ScanLine size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-2">Document Agents</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Upload documents to test OCR and entity recognition.</p>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative animate-in fade-in zoom-in duration-200">
          <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Select Agent to Test</h2>
          <p className="text-sm text-slate-500 text-center mb-8">Choose an agent type for manual interactive testing</p>
          {content}
        </div>
      </div>
    );
  }

  return <div className="p-8">{content}</div>;
};
