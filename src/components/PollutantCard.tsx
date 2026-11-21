import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PollutantCardProps {
  label: string;
  value: number | string;
  unit: string;
  description: string;
  status?: string;
  statusColor?: string;
  icon: LucideIcon;
}

export const PollutantCard: React.FC<PollutantCardProps> = ({
  label,
  value,
  unit,
  description,
  status,
  statusColor = 'text-slate-600',
  icon: Icon,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-1 my-1">
        <span className="text-2xl font-bold text-slate-800 tracking-tight">{value}</span>
        <span className="text-xs font-medium text-slate-400">{unit}</span>
      </div>

      <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-100">
        <span className="text-slate-400 truncate text-[11px]">{description}</span>
        {status && (
          <span className={`font-semibold shrink-0 text-[11px] ${statusColor}`}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
};

