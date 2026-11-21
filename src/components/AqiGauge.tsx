import React from 'react';
import { AqiCategory, CPCB_CATEGORIES } from '../types/aqi';

interface AqiGaugeProps {
  aqi: number;
  category: AqiCategory;
}

export const AqiGauge: React.FC<AqiGaugeProps> = ({ aqi, category }) => {
  const info = CPCB_CATEGORIES[category] || CPCB_CATEGORIES.Moderate;

  // Normalized percentage for 0 to 500 scale
  const percentage = Math.min(Math.max((aqi / 500) * 100, 5), 100);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Semi-circular speedometer arc */}
      <div className="relative w-48 h-28 flex items-end justify-center overflow-hidden">
        {/* Background track arc */}
        <div className="absolute top-0 w-48 h-48 rounded-full border-[14px] border-slate-100 border-b-transparent border-l-transparent -rotate-45" />

        {/* Dynamic color arc representing CPCB bands */}
        <svg className="w-48 h-28 -rotate-180" viewBox="0 0 100 50">
          {/* Base gradient track */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Filled track according to aqi */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={info.color}
            strokeWidth="9"
            strokeDasharray="126"
            strokeDashoffset={126 - (percentage / 100) * 126}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center AQI value */}
        <div className="absolute bottom-1 flex flex-col items-center">
          <span className="text-4xl font-extrabold text-slate-800 tracking-tight leading-none">
            {aqi}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-1">
            CPCB AQI
          </span>
        </div>
      </div>

      {/* Scale guide markers */}
      <div className="w-full flex justify-between text-[10px] text-slate-400 font-medium px-4 mt-1">
        <span>0 Good</span>
        <span>200 Mod</span>
        <span>500 Severe</span>
      </div>
    </div>
  );
};

