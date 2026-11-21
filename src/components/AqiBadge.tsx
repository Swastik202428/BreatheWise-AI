import React from 'react';
import { AqiCategory, CPCB_CATEGORIES } from '../types/aqi';
import { AlertCircle, CheckCircle2, AlertTriangle, Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface AqiBadgeProps {
  category: AqiCategory;
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const AqiBadge: React.FC<AqiBadgeProps> = ({
  category,
  value,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const info = CPCB_CATEGORIES[category] || CPCB_CATEGORIES.Moderate;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-sm px-3 py-1 gap-2',
    lg: 'text-base px-4 py-1.5 gap-2.5 font-bold',
  };

  const getIcon = () => {
    switch (category) {
      case 'Good':
        return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
      case 'Satisfactory':
        return <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />;
      case 'Moderate':
        return <AlertCircle className="w-3.5 h-3.5 shrink-0" />;
      case 'Poor':
        return <AlertTriangle className="w-3.5 h-3.5 shrink-0" />;
      case 'Very Poor':
        return <Flame className="w-3.5 h-3.5 shrink-0" />;
      case 'Severe':
        return <ShieldAlert className="w-3.5 h-3.5 shrink-0 animate-pulse" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border ${info.bgClass} ${info.borderClass} ${info.textClass} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && getIcon()}
      <span>
        {value !== undefined ? `${value} • ` : ''}
        {category}
      </span>
    </span>
  );
};

