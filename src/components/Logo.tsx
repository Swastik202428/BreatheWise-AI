import React from 'react';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ collapsed = false, className = '', showTagline = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-900/20 shrink-0">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Leaf outline */}
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="rgba(255,255,255,0.2)" />
          {/* Leaf stem */}
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          {/* Wind gusts */}
          <path d="M7 6c2-1 4-1 6 0" strokeWidth="1.5" strokeDasharray="1 1" />
        </svg>
        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-emerald-950"></span>
        </span>
      </div>

      {/* Brand Text */}
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
            BreatheWise <span className="text-emerald-400 text-xs px-1.5 py-0.5 rounded font-mono font-semibold bg-emerald-900/60 border border-emerald-500/30">AI</span>
          </span>
          {showTagline && (
            <span className="text-[11px] text-emerald-300/80 font-medium tracking-wide">
              Breathe Better. Live Greener.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

