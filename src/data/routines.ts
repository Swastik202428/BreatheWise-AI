export interface RoutineActivity {
  title: string;
  description: string;
  badge: string;
  impact: string;
}

export interface RoutineSection {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  timeRange: string;
  smogBehavior: string;
  whyItMatters: string;
  activities: RoutineActivity[];
}

export const DAILY_ROUTINES: RoutineSection[] = [
  {
    id: 'morning',
    period: 'Morning',
    timeRange: '06:00 AM – 10:30 AM',
    smogBehavior: 'Peak Winter Inversion: Cool night air traps vehicular exhaust and smoke within 50 meters of ground level.',
    whyItMatters: 'Morning is the most hazardous time for outdoor cardio workouts during winter. Inhaling deep breaths at AQI > 300 forces toxic PM2.5 micro-particles deep into alveoli and bloodstream.',
    activities: [
      {
        title: 'Switch to Indoor Aerobics or Yoga',
        description: 'Postpone outdoor jogging or brisk walking until noon when sunlight helps disperse ground smog. Exercise in a room with a running HEPA filter.',
        badge: 'Health Protection',
        impact: 'Avoids ~150 micrograms of ultrafine PM2.5 lung deposit',
      },
      {
        title: 'Keep Windows Tightly Shut',
        description: 'Morning temperature inversions allow heavy smog to seep indoors if windows are kept open. Keep curtains and glass panes closed.',
        badge: 'Indoor Defense',
        impact: 'Prevents 60% surge in indoor PM2.5 levels',
      },
      {
        title: 'Opt for Metro or Shared Transit',
        description: 'Avoid solitary petrol/diesel car runs during morning gridlock. Cold engine starts produce 3x higher VOCs and carbon emissions.',
        badge: 'Clean Commute',
        impact: 'Avoids 2.4 kg CO2e per 15 km commute',
      },
      {
        title: 'Wear Certified N95 Mask If Commuting',
        description: 'Cloth and surgical masks do NOT stop PM2.5 particulates. Fasten a well-fitted N95 mask snugly around nasal bridge.',
        badge: 'Vital Safeguard',
        impact: 'Filters 95%+ of fine soot and dust particles',
      },
    ],
  },
  {
    id: 'afternoon',
    period: 'Afternoon',
    timeRange: '11:00 AM – 04:00 PM',
    smogBehavior: 'Solar Warming & Atmospheric Mixing: Solar thermal lift temporarily disperses heavy ground-level particulate blanket.',
    whyItMatters: 'Afternoon offers the safest window of the day for quick indoor airing and essential outdoor errands before nightfall.',
    activities: [
      {
        title: 'Safe 15-Minute Window Airing (1 PM - 3 PM)',
        description: 'Crack opposite windows slightly for cross-ventilation to flush out indoor CO2 and cooking humidity while outdoor AQI is at its daytime low.',
        badge: 'Smart Airing',
        impact: 'Lowers indoor CO2 without catastrophic PM spike',
      },
      {
        title: 'Check Air Purifier Pre-Filters',
        description: 'In winter smog seasons, vacuum the reusable mesh pre-filter every 7 days so the True HEPA layer does not choke and waste electricity.',
        badge: 'Energy Efficiency',
        impact: 'Restores 25% CADR airflow and saves ~0.4 kWh/day',
      },
      {
        title: 'Consolidate Vehicle Trips & Carpooling',
        description: 'Coordinate errands with colleagues or neighbors. Combine school pickup and grocery stops into a single continuous loop.',
        badge: 'Green Transit',
        impact: 'Saves ~1.8 kg CO2 and reduces local congestion',
      },
      {
        title: 'Stay Hydrated & Eat Antioxidant Foods',
        description: 'Drink warm water, green tea, or ginger-tulsi decoctions. Vitamin C and bioflavonoids help counteract oxidative lung stress caused by ozone and NO2.',
        badge: 'Wellness Defense',
        impact: 'Supports respiratory mucosal hydration',
      },
    ],
  },
  {
    id: 'evening',
    period: 'Evening',
    timeRange: '05:00 PM – 10:30 PM',
    smogBehavior: 'Evening Inversion & Traffic Surge: Sunset lowers boundary layer again while millions of vehicles emit hot exhaust into cold, still air.',
    whyItMatters: 'Evening air rapidly deteriorates. Preparing the home environment ensures restorative sleep without nocturnal wheezing or coughing.',
    activities: [
      {
        title: 'Seal Doors & Gaps with Foam Strips',
        description: 'Drafty door sills allow toxic outdoor haze to drift into bedrooms overnight. Install simple draft excluders at main doors.',
        badge: 'Air Sealing',
        impact: 'Maintains healthy < 35 AQI inside bedroom all night',
      },
      {
        title: 'Turn Purifiers to Auto / Night Mode',
        description: 'Keep your bedroom HEPA filter running throughout sleep. Low-speed night modes maintain whisper-quiet continuous filtration at only 15–25 watts.',
        badge: 'Sleep Quality',
        impact: 'Provides 8 hours of clean air for cellular recovery',
      },
      {
        title: 'Warm Saline Gargle & Nasal Rinse',
        description: 'Use isotonic saline solution to gently rinse nasal passages after returning from outdoor urban traffic to clear trapped micro-dust.',
        badge: 'Hygiene Care',
        impact: 'Reduces morning mucosal irritation by up to 70%',
      },
      {
        title: 'Avoid Scented Candles and Unvented Stoves',
        description: 'Do not burn agarbattis (incense sticks), mosquito coils, or paraffin wax candles indoors. They generate concentrated benzene and fine soot.',
        badge: 'Zero Indoor Burning',
        impact: 'Eliminates up to 180 µg/m³ of self-generated indoor PM2.5',
      },
    ],
  },
];

export interface ChecklistItem {
  id: string;
  title: string;
  category: 'routine' | 'transit' | 'energy' | 'protection';
  estimatedCo2: number;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'All Day';
}

export const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'c1', title: 'Checked local AQI before leaving home', category: 'routine', estimatedCo2: 0, timeOfDay: 'Morning' },
  { id: 'c2', title: 'Equipped N95 mask for transit & outdoor errands', category: 'protection', estimatedCo2: 0, timeOfDay: 'Morning' },
  { id: 'c3', title: 'Chose metro/bus/carpool over single-occupant car', category: 'transit', estimatedCo2: 2.5, timeOfDay: 'Morning' },
  { id: 'c4', title: 'Swapped outdoor jog with indoor yoga / fitness', category: 'routine', estimatedCo2: 0, timeOfDay: 'Morning' },
  { id: 'c5', title: 'Aired home during safe afternoon window (1-3 PM)', category: 'routine', estimatedCo2: 0, timeOfDay: 'Afternoon' },
  { id: 'c6', title: 'Turned off unnecessary heating/air heaters when rooms empty', category: 'energy', estimatedCo2: 1.2, timeOfDay: 'Afternoon' },
  { id: 'c7', title: 'Used exhaust fan and lids while cooking dinner', category: 'protection', estimatedCo2: 0.2, timeOfDay: 'Evening' },
  { id: 'c8', title: 'Cleaned nasal passages with warm saline rinse', category: 'routine', estimatedCo2: 0, timeOfDay: 'Evening' },
  { id: 'c9', title: 'Turned bedroom HEPA purifier to auto night-mode', category: 'protection', estimatedCo2: 0.5, timeOfDay: 'Evening' },
  { id: 'c10', title: 'Eliminated indoor incense / mosquito coils', category: 'protection', estimatedCo2: 0.1, timeOfDay: 'All Day' },
];

