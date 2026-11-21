import React from 'react';
import { Info } from 'lucide-react';

interface EstimateDisclaimerProps {
  className?: string;
  customText?: string;
}

export const EstimateDisclaimer: React.FC<EstimateDisclaimerProps> = ({
  className = '',
  customText,
}) => {
  return (
    <div
      className={`flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 ${className}`}
    >
      <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-semibold text-slate-700">Estimated Values Notice: </span>
        {customText ||
          'All environmental impact metrics (CO2 emissions avoided, kilowatt-hours of energy conserved, and AQI simulations) are calculated using standardized environmental conversion models and regional averages. They serve as valuable behavioral guidance and are estimates, not certified laboratory measurements.'}
      </div>
    </div>
  );
};

