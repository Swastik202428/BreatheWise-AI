export type OutdoorActivityType =
  | 'Morning Jogger / Walker'
  | 'Evening Runner'
  | 'Daily Outdoor Commuter'
  | 'Mainly Indoors'
  | 'Sports & Fitness Enthusiast';

export type CommutePreference =
  | 'Metro / Rapid Rail'
  | 'Public Electric Bus'
  | 'Carpooling'
  | 'Personal Car (Petrol/Diesel)'
  | 'Electric Vehicle (EV)'
  | 'Two-Wheeler / Scooter'
  | 'Bicycle / Walking';

export interface FamilyProfile {
  city: string;
  neighborhood: string;
  familySize: number;
  hasChildren: boolean;
  childrenCount: number;
  childrenAges: string;
  hasElderly: boolean;
  elderlyCount: number;
  hasRespiratoryIssues: boolean;
  respiratoryConditions: string;
  outdoorActivity: OutdoorActivityType;
  commuteMode: CommutePreference;
  hasPurifier: boolean;
  purifierCount: number;
  purifierRooms: string;
  purifierModel: string;
  homeVentilation: 'Cross-Ventilated' | 'Moderate' | 'Airtight / Double Glazed';
}

export const DEFAULT_FAMILY_PROFILE: FamilyProfile = {
  city: 'Delhi NCR',
  neighborhood: 'Dwarka / South Delhi',
  familySize: 4,
  hasChildren: true,
  childrenCount: 1,
  childrenAges: '5 years old',
  hasElderly: true,
  elderlyCount: 1,
  hasRespiratoryIssues: true,
  respiratoryConditions: 'Mild seasonal bronchitis in elderly, child pollen sensitivity',
  outdoorActivity: 'Morning Jogger / Walker',
  commuteMode: 'Metro / Rapid Rail',
  hasPurifier: true,
  purifierCount: 2,
  purifierRooms: 'Master Bedroom & Kids Room',
  purifierModel: 'Philips 2000i Series HEPA + Carbon',
  homeVentilation: 'Moderate',
};

