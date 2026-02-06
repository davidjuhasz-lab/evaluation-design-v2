
import React from 'react';
import { Search, Filter, ArrowUpDown, Clock, Play, ChevronLeft, ChevronRight, MessageSquare, FileText, Globe, Shield } from 'lucide-react';

export const HistoryList = () => {
    const historyData = [
      { id: 1, name: "General Assistant V2", count: 42, icon: MessageSquare, iconColor: "text-indigo-600 bg-indigo-50", type: "Multi-turn", typeColor: "bg-indigo-100 text-indigo-700", lastRun: "2 hours ago", score: 94, scoreColor: "bg-[#d2f448]", status: "Passing", statusColor: "bg-emerald-100 text-emerald-700", statusDot: "bg-emerald-500" },
      { id: 2, name: "Invoices OCR Extraction", count: 128, icon: FileText, iconColor: "text-orange-600 bg-orange-50", type: "OCR / Vision", typeColor: "bg-orange-100 text-orange-700", lastRun: "1 day ago", score: 88, scoreColor: "bg-[#d2f448]", status: "Passing", statusColor: "bg-emerald-100 text-emerald-700", statusDot: "bg-emerald-500" },
      { id: 3, name: "Policy Retrieval (RAG)", count: 85, icon: Globe, iconColor: "text-purple-600 bg-purple-50", type: "RAG", typeColor: "bg-purple-100 text-purple-700", lastRun: "3 days ago", score: 72, scoreColor: "bg-amber-400", status: "Warning", statusColor: "bg-amber-100 text-amber-700", statusDot: "bg-amber-500" },
      { id: 4, name: "Safety Guardrails", count: 210, icon: Shield, iconColor: "text-teal-600 bg-teal-50", type: "Compliance", typeColor: "bg-teal-100 text-teal-700", lastRun: "5 days ago", score: 99, scoreColor: "bg-[#d2f448]", status: "Passing", statusColor: "bg-emerald-100 text-emerald-700", statusDot: "bg-emerald-500" }
    ];

    return (
      <div className="flex flex-col h-full">
         <div className="flex justify-between items-center mb-6">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input type="text" placeholder="Search test sets..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm" />
           </div>
           <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"><Filter size={16} /> Filter</button>
             <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"><ArrowUpDown size={16} /> Sort</button>
           </div>
         </div>

         <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0">
             <div className="grid grid-cols-[2.5fr_1.2fr_1.2fr_1.5fr_1.2fr_auto] gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
               <div>Name</div>
               <div>Type</div>
               <div>Last Run</div>
               <div>Average Score</div>
               <div>Status</div>
               <div className="w-[80px]"></div> 
             </div>
             
             <div className="overflow-y-auto flex-1">
               {historyData.map((item) => (
                 <div key={item.id} className="grid grid-cols-[2.5fr_1.2fr_1.2fr_1.5fr_1.2fr_auto] gap-4 px-6 py-4 items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.iconColor}`}>
                         <item.icon size={20} />
                      </div>
                      <div className="min-w-0">
                         <h4 className="font-semibold text-slate-900 text-sm truncate">{item.name}</h4>
                         <p className="text-xs text-slate-500 truncate">{item.count} test cases</p>
                      </div>
                   </div>
                   
                   <div>
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${item.typeColor}`}>{item.type}</span>
                   </div>
                   
                   <div className="flex items-center gap-2 text-sm text-slate-500 whitespace-nowrap">
                      <Clock size={14} /> {item.lastRun}
                   </div>
                   
                   <div className="pr-4">
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-sm font-bold text-slate-900">{item.score}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full ${item.scoreColor}`} style={{ width: `${item.score}%` }}></div>
                      </div>
                   </div>
                   
                   <div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${item.statusColor}`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${item.statusDot}`}></div>
                         {item.status}
                      </span>
                   </div>
                   
                   <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors">
                      <Play size={12} fill="currentColor" /> Run
                   </button>
                 </div>
               ))}
             </div>

             <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <span className="text-sm text-slate-500">Showing 1 to 4 of 24 results</span>
                <div className="flex items-center gap-1">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50"><ChevronLeft size={16} /></button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-600 font-medium">1</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-500 hover:bg-slate-100 font-medium transition-colors">2</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-500 hover:bg-slate-100 font-medium transition-colors">3</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50"><ChevronRight size={16} /></button>
                </div>
             </div>
         </div>
      </div>
    );
};
