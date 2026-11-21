export type AqiCategory =
  | 'Good'
  | 'Satisfactory'
  | 'Moderate'
  | 'Poor'
  | 'Very Poor'
  | 'Severe';

export interface HourlyReading {
  time: string;
  aqi: number;
  pm25: number;
  pm10: number;
}

export interface AqiData {
  city: string;
  state: string;
  aqi: number;
  category: AqiCategory;
  dominantPollutant: string;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  weatherCondition?: string;
  isLive: boolean;
  dataSource: string;
  lastUpdated: string;
  hourlyHistory: HourlyReading[];
  apiUnavailable?: boolean;
  error?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export function getAqiCategory(aqi: number): AqiCategory {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderate';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

export interface CpcbScaleInfo {
  category: AqiCategory;
  min: number;
  max: number;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeBg: string;
  description: string;
  healthAdvisory: string;
  maskRecommended: boolean;
  purifierRecommended: boolean;
  outdoorSafe: boolean;
}

export const CPCB_CATEGORIES: Record<AqiCategory, CpcbScaleInfo> = {
  Good: {
    category: 'Good',
    min: 0,
    max: 50,
    color: '#10b981',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    textClass: 'text-emerald-700',
    badgeBg: 'bg-emerald-600',
    description: 'Minimal impact',
    healthAdvisory: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
    maskRecommended: false,
    purifierRecommended: false,
    outdoorSafe: true,
  },
  Satisfactory: {
    category: 'Satisfactory',
    min: 51,
    max: 100,
    color: '#84cc16',
    bgClass: 'bg-lime-50',
    borderClass: 'border-lime-200',
    textClass: 'text-lime-800',
    badgeBg: 'bg-lime-600',
    description: 'Minor breathing discomfort to sensitive people',
    healthAdvisory: 'Acceptable air quality; sensitive individuals might experience slight irritation.',
    maskRecommended: false,
    purifierRecommended: false,
    outdoorSafe: true,
  },
  Moderate: {
    category: 'Moderate',
    min: 101,
    max: 200,
    color: '#eab308',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    textClass: 'text-amber-800',
    badgeBg: 'bg-amber-600',
    description: 'Breathing discomfort to people with lung, asthma & heart disease',
    healthAdvisory: 'Children and seniors with asthma should limit heavy prolonged exertion outside.',
    maskRecommended: false,
    purifierRecommended: true,
    outdoorSafe: true,
  },
  Poor: {
    category: 'Poor',
    min: 201,
    max: 300,
    color: '#f97316',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    textClass: 'text-orange-800',
    badgeBg: 'bg-orange-600',
    description: 'Breathing discomfort to most people on prolonged exposure',
    healthAdvisory: 'Everyone may begin to experience health effects; high-risk groups should avoid outdoor workouts.',
    maskRecommended: true,
    purifierRecommended: true,
    outdoorSafe: false,
  },
  'Very Poor': {
    category: 'Very Poor',
    min: 301,
    max: 400,
    color: '#ef4444',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    textClass: 'text-red-800',
    badgeBg: 'bg-red-600',
    description: 'Respiratory illness on prolonged exposure',
    healthAdvisory: 'Health alert: serious risk of respiratory symptoms in general population. Avoid morning jogs.',
    maskRecommended: true,
    purifierRecommended: true,
    outdoorSafe: false,
  },
  Severe: {
    category: 'Severe',
    min: 401,
    max: 500,
    color: '#831843',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
    textClass: 'text-rose-900',
    badgeBg: 'bg-rose-900',
    description: 'Affects healthy people & seriously impacts those with existing conditions',
    healthAdvisory: 'Emergency conditions. Keep windows tightly sealed, run HEPA purifiers continuously, wear N95.',
    maskRecommended: true,
    purifierRecommended: true,
    outdoorSafe: false,
  },
};
