
import React, { useState } from 'react';
import { XCircle, MessageSquare, ScanLine, Info, Upload, Brain, ChevronDown, ChevronRight, Sparkles, FileText, ChevronLeft } from 'lucide-react';
import { AutoState, TestSubType } from '../../../types';

interface TypeSelectionModalProps {
    selectedAgentId: string | null;
    onSelectSubType: (subType: TestSubType) => void;
    setViewState: (view: AutoState) => void;
    onStartSimulation: () => void;
    onClose: () => void;
}

export const TypeSelectionModal: React.FC<TypeSelectionModalProps> = ({ selectedAgentId, onSelectSubType, setViewState, onStartSimulation, onClose }) => {
    // State for Assistant Config Modal
    const [interactionMode, setInteractionMode] = useState<'single' | 'multi'>('multi');
    const [dataSource, setDataSource] = useState<'upload' | 'simulate'>('simulate');
    const [difficulty, setDifficulty] = useState('Medium');

    // Document Pipeline selection modal
    if (selectedAgentId === 'doc-pipeline') {
        return (
            <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-200">
                    <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                        <XCircle size={24} />
                    </button>
                    <button 
                        onClick={() => setViewState('agent-modal')} 
                        className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
                    >
                        <ChevronLeft size={18} /> Back
                    </button>
                    
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-2 mt-4">Select Evaluation Type</h2>
                    <p className="text-sm text-slate-500 text-center mb-8">Choose the evaluation type for your document processing agent</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div 
                            onClick={() => { onSelectSubType('docu-pipeline'); setViewState('editor'); }} 
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
                            onClick={() => { onSelectSubType('docu-bulk'); setViewState('editor'); }} 
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

    // Assistant configuration modal
    if (selectedAgentId === 'assistant') {
       return (
           <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-200">
                  <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                  <button 
                      onClick={() => setViewState('agent-modal')} 
                      className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
                  >
                      <ChevronLeft size={18} /> Back
                  </button>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 mt-4">Configure Assistant Evaluation</h2>
                  <p className="text-sm text-slate-500 mb-6">Set up how you want to test your assistant agent</p>
                  
                  {/* Interaction Mode */}
                  <div className="mb-8">
                     <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
                        Interaction Mode 
                        <Info size={14} className="text-slate-400" />
                     </label>
                     <div className="bg-slate-100 p-1 rounded-xl flex">
                        <button onClick={() => setInteractionMode('single')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${interactionMode === 'single' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Single-turn</button>
                        <button onClick={() => setInteractionMode('multi')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${interactionMode === 'multi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Multi-turn</button>
                     </div>
                  </div>

                  {/* Data Source */}
                  <div className="mb-8">
                     <label className="block text-sm font-bold text-slate-700 mb-3">Conversation Data Source</label>
                     <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => setDataSource('upload')} className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${dataSource === 'upload' ? 'border-sky-500 bg-sky-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                           <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
                              <Upload size={20} />
                           </div>
                           <h3 className="font-bold text-slate-900 text-sm">Upload Conversations</h3>
                           <p className="text-xs text-slate-500 mt-1">Import JSON or CSV datasets</p>
                           {dataSource === 'upload' && <div className="absolute top-4 right-4 w-4 h-4 rounded-full border-[3px] border-sky-500"></div>}
                           {dataSource !== 'upload' && <div className="absolute top-4 right-4 w-4 h-4 rounded-full border border-slate-300"></div>}
                        </div>
                        
                        <div onClick={() => setDataSource('simulate')} className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${dataSource === 'simulate' ? 'border-[#D2F948] bg-[#f7fecb]/30' : 'border-slate-100 hover:border-slate-200'}`}>
                           <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3">
                              <Brain size={20} />
                           </div>
                           <h3 className="font-bold text-slate-900 text-sm">Simulate with LLM</h3>
                           <p className="text-xs text-slate-500 mt-1">Generate synthetic user personas</p>
                           {dataSource === 'simulate' && <div className="absolute top-4 right-4 w-4 h-4 rounded-full border-[3px] border-[#D2F948] bg-[#D2F948]"></div>}
                           {dataSource !== 'simulate' && <div className="absolute top-4 right-4 w-4 h-4 rounded-full border border-slate-300"></div>}
                        </div>
                     </div>
                  </div>

                  {/* Simulator Config */}
                  {dataSource === 'simulate' && (
                     <div className="pl-4 border-l-2 border-[#D2F948] space-y-5 animate-in slide-in-from-top-2 duration-300">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">User Simulation Model</label>
                           <div className="relative">
                               <select className="w-full appearance-none bg-white border border-slate-200 text-slate-900 text-sm rounded-lg px-4 py-2.5 font-medium shadow-sm focus:outline-none focus:border-sky-500">
                                   <option>GPT-4 User Simulator (v2.1)</option>
                                   <option>Claude 3 Opus Persona</option>
                                   <option>Llama 3 70B Interactive</option>
                               </select>
                               <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                           </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Simulation Difficulty</label>
                                <div className="flex bg-slate-100 p-1 rounded-lg">
                                    {['Easy', 'Medium', 'Hard'].map(d => (
                                        <button 
                                            key={d} 
                                            onClick={() => setDifficulty(d)}
                                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${difficulty === d ? 'bg-[#D2F948] text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Number of Conversations</label>
                                <div className="relative">
                                    <input type="number" defaultValue={50} className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-lg pl-4 pr-16 py-2 focus:outline-none focus:border-sky-500" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">sessions</span>
                                </div>
                            </div>
                        </div>
                     </div>
                  )}

                  <div className="mt-8 flex justify-end gap-3">
                      <button onClick={onClose} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
                      
                      {dataSource === 'simulate' ? (
                          <button 
                            onClick={onStartSimulation} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
                          >
                              <Sparkles size={16} /> Generate Dataset
                          </button>
                      ) : (
                          <button 
                            onClick={() => {
                                onSelectSubType(interactionMode === 'single' ? 'assistant-single' : 'assistant-multi');
                                setViewState('editor');
                            }} 
                            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2"
                          >
                              Continue to Editor <ChevronRight size={16} />
                          </button>
                      )}
                  </div>
               </div>
             </div>
       );
    }

    // Fallback for other agents
    return (
        <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8 relative animate-in fade-in zoom-in duration-200">
              <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
              <button 
                  onClick={() => setViewState('agent-modal')} 
                  className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
              >
                  <ChevronLeft size={18} /> Back
              </button>
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-8 mt-4">Select Evaluation Type</h2>
              <p className="text-center text-slate-500">No configuration available for this agent type.</p>
           </div>
        </div>
    );
};