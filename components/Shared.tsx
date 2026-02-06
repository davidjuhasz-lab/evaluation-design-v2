
import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

export const Breadcrumbs = ({ items, onBack }: { items: string[], onBack?: () => void }) => (
  <div className="flex items-center gap-2 text-sm text-slate-400">
    <Home size={16} className="text-slate-400" />
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ChevronRight size={14} />
        <span 
          className={index === items.length - 1 ? "text-sky-600 font-medium" : "hover:text-slate-600 cursor-pointer"}
          onClick={index === items.length - 2 && onBack ? onBack : undefined}
        >
          {item}
        </span>
      </React.Fragment>
    ))}
  </div>
);

export const PrimaryButton = ({ children, onClick, icon: Icon, disabled, className }: { children?: React.ReactNode, onClick: () => void, icon?: any, disabled?: boolean, className?: string }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-slate-900 font-medium shadow-sm transition-all text-sm
      ${disabled 
        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
        : 'bg-[#D2F948] hover:bg-[#c3ea3e] hover:shadow-md'
      } ${className || ''}`}
  >
    {Icon && <Icon size={16} />}
    {children}
  </button>
);
