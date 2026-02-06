
import React from 'react';
import { 
  LayoutDashboard, 
  MessageCircle, 
  PieChart, 
  Bot, 
  FileText, 
  Beaker, 
  MoreVertical, 
  LogOut 
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const SidebarItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 text-sm font-medium ${
      active ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <span className={active ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'}>{icon}</span>
    {label}
  </button>
);

export const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  return (
    <div className="w-[280px] bg-white h-full flex flex-col border-r border-slate-200 flex-shrink-0 z-20">
      <div className="p-6 pb-2">
        <div className="flex items-start text-slate-900 font-bold text-2xl tracking-tight mb-6">
          <span>peak</span>
          <span className="text-xs -mt-1 ml-0.5">x</span>
        </div>
        <button className="w-full bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg p-3 flex items-center justify-between text-sm border border-transparent hover:border-slate-200">
           <span className="font-medium text-slate-700">Application Name</span>
           <MoreVertical size={16} className="text-slate-400" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => onViewChange('dashboard')} />
        <SidebarItem icon={<MessageCircle size={20} />} label="Threads" active={currentView === 'threads'} onClick={() => onViewChange('threads')} />
        <SidebarItem icon={<PieChart size={20} />} label="Metrics" active={currentView === 'metrics'} onClick={() => onViewChange('metrics')} />
        <SidebarItem icon={<Bot size={20} />} label="Agent Management" active={currentView === 'agents'} onClick={() => onViewChange('agents')} />
        <SidebarItem icon={<FileText size={20} />} label="Documents" active={currentView === 'documents'} onClick={() => onViewChange('documents')} />
        <div className="my-4 border-t border-slate-100 mx-2"></div>
        <SidebarItem icon={<Beaker size={20} />} label="Evaluation Suite" active={currentView === 'evaluation'} onClick={() => onViewChange('evaluation')} />
      </nav>

      <div className="p-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">F</div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium text-slate-900 truncate">John Doe</span>
            <span className="text-xs text-slate-500 truncate">john.doe@ffnext...</span>
          </div>
          <LogOut size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>
      </div>
    </div>
  );
};
