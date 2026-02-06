
import React from 'react';
import { Brain, Sparkles, User, MessageSquare } from 'lucide-react';

interface SimulationLoadingProps {
    activeStep: number;
}

export const SimulationLoading: React.FC<SimulationLoadingProps> = ({ activeStep }) => (
    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
        <div className="w-96 space-y-10 text-center p-10 bg-white rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#D2F948]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-sky-100/50 rounded-full blur-3xl"></div>

            <div className="relative w-32 h-32 mx-auto">
                {/* Rotating Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-[#D2F948] border-t-transparent animate-spin"></div>
                
                {/* Central Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Brain size={48} className="text-slate-800 animate-pulse" />
                </div>
                
                {/* Floating Particles */}
                <Sparkles className="absolute -top-2 -right-4 text-sky-400 animate-bounce delay-100" size={24} />
                <Sparkles className="absolute bottom-0 -left-4 text-[#D2F948] animate-bounce delay-300" size={20} />
            </div>

            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Generating Dataset</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">Creating synthetic user personas and simulating realistic conversation flows.</p>
            </div>

            <div className="space-y-4 text-left bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 transition-opacity duration-300">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${activeStep >= 1 ? 'bg-sky-100 text-sky-600' : 'bg-slate-200 text-slate-400'}`}>
                        <User size={14} />
                    </div>
                    <div className="flex-1">
                        <span className={`text-sm font-medium ${activeStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Defining Personas</span>
                        {activeStep === 1 && <span className="text-[10px] text-sky-600 block animate-pulse">Generating attributes...</span>}
                    </div>
                    {activeStep > 1 && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                </div>

                <div className="flex items-center gap-3 transition-opacity duration-300">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${activeStep >= 2 ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                        <MessageSquare size={14} />
                    </div>
                    <div className="flex-1">
                        <span className={`text-sm font-medium ${activeStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Simulating Interactions</span>
                        {activeStep === 2 && <span className="text-[10px] text-indigo-600 block animate-pulse">Running multi-turn chat...</span>}
                    </div>
                    {activeStep > 2 && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                </div>

                <div className="flex items-center gap-3 transition-opacity duration-300">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${activeStep >= 3 ? 'bg-[#f4fcc0] text-slate-800' : 'bg-slate-200 text-slate-400'}`}>
                        <Sparkles size={14} />
                    </div>
                    <div className="flex-1">
                        <span className={`text-sm font-medium ${activeStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Finalizing Dataset</span>
                    </div>
                    {activeStep > 3 && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                </div>
            </div>
        </div>
    </div>
);
