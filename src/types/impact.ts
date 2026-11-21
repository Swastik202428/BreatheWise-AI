export type ImpactCategory = 'transport' | 'energy' | 'indoor' | 'community';

export interface GreenAction {
  id: string;
  title: string;
  description: string;
  category: ImpactCategory;
  co2SavedKg: number;
  energySavedKwh: number;
  timestamp: string;
  iconName: string;
}

export interface ImpactStats {
  totalActions: number;
  totalCo2AvoidedKg: number;
  totalEnergySavedKwh: number;
  cleanCommuteKm: number;
  streakDays: number;
}

