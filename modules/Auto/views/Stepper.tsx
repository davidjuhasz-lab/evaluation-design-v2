
import React from 'react';
import { Play, Check, Bot } from 'lucide-react';
import { TestSubType } from '../../../types';
import { docuPipelineFiles } from '../data';

interface StepperViewProps {
    activeStep: number;
    selectedSubType: TestSubType;
    agentName: string;
}

export const StepperView: React.FC<StepperViewProps> = ({ activeStep, selectedSubType, agentName }) => (
    <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="w-80 space-y-8 text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
            <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#0ea5e9" strokeWidth="8" 
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * activeStep / 4)}
                      className="transition-all duration-500 ease-out -rotate-90 origin-center"
                      strokeLinecap="round"
                    />
                </svg>
                <Bot size={32} className="absolute inset-0 m-auto text-slate-700" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Running Evaluation...</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Processing test cases against <span className="font-bold text-slate-700">{agentName}</span> agent swarm.</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 font-mono text-left space-y-2 border border-slate-100">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${activeStep >= 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    <span className={activeStep >= 1 ? 'text-slate-700' : 'text-slate-400'}>Initializing Agent Runtime...</span>
                </div>
                <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${activeStep >= 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                     <span className={activeStep >= 2 ? 'text-slate-700' : 'text-slate-400'}>Executing Test Vectors ({selectedSubType.startsWith('docu') ? docuPipelineFiles.length : '3'} items)...</span>
                </div>
                <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${activeStep >= 3 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                     <span className={activeStep >= 3 ? 'text-slate-700' : 'text-slate-400'}>Running Automated Judges...</span>
                </div>
                <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${activeStep >= 4 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                     <span className={activeStep >= 4 ? 'text-slate-700' : 'text-slate-400'}>Aggregating Metrics...</span>
                </div>
            </div>
        </div>
    </div>
);
