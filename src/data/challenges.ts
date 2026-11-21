export interface CleanAirChallenge {
  id: string;
  title: string;
  category: 'commute' | 'energy' | 'community' | 'indoor';
  duration: string;
  participantsCount: number;
  co2TargetKg: number;
  description: string;
  rules: string[];
  joined: boolean;
  progressPercent: number;
  badgeAward: string;
}

export interface CommunityLeaderboardMember {
  id: string;
  name: string;
  avatar: string;
  neighborhood: string;
  points: number;
  co2SavedKg: number;
  rank: number;
  badges: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  neighborhood: string;
  timeAgo: string;
  actionTaken: string;
  co2Saved: string;
  cheersCount: number;
  userCheered: boolean;
  avatarBg: string;
}

export const COMMUNITY_CHALLENGES: CleanAirChallenge[] = [
  {
    id: 'ch-1',
    title: '7-Day Zero Stubble Burning & Clean Transit Pledge',
    category: 'commute',
    duration: 'Nov 20 - Nov 27',
    participantsCount: 1420,
    co2TargetKg: 5000,
    description: 'Commit to choosing Metro, EV, bus, or carpools instead of solo petrol cars for all 7 workdays.',
    rules: [
      'Take public metro or bus at least 4 days this week',
      'Never burn dry garden leaves or waste outdoors',
      'Log your clean transit trips in BreatheWise Impact Tracker',
    ],
    joined: true,
    progressPercent: 71,
    badgeAward: 'Metro Pioneer',
  },
  {
    id: 'ch-2',
    title: 'Indoor Smog Shield Challenge',
    category: 'indoor',
    duration: 'Ongoing Winter Season',
    participantsCount: 890,
    co2TargetKg: 2200,
    description: 'Seal bedroom draft gaps, eliminate indoor incense sticks, and ensure safe 15-minute afternoon airing.',
    rules: [
      'Keep windows sealed during morning smog spikes (6-10 AM)',
      'Inspect and vacuum air purifier pre-filters weekly',
      'Damp-mop floors with microfiber instead of dry sweeping',
    ],
    joined: false,
    progressPercent: 45,
    badgeAward: 'Clean Haven Master',
  },
  {
    id: 'ch-3',
    title: 'Peak Load Shaver: Winter Power Saver',
    category: 'energy',
    duration: 'Nov 15 - Dec 15',
    participantsCount: 2150,
    co2TargetKg: 12500,
    description: 'Reduce non-essential heavy appliance loads between 6 PM and 9 PM to reduce local diesel generator demand in residential sectors.',
    rules: [
      'Set space heaters to 21°C instead of max',
      'Turn off standby electronics when not in use',
      'Avoid running washing machines during evening peak grid hours',
    ],
    joined: false,
    progressPercent: 84,
    badgeAward: 'Grid Guardian',
  },
];

export const LEADERBOARD_MEMBERS: CommunityLeaderboardMember[] = [
  {
    id: 'm-1',
    name: 'Aarav Sharma',
    avatar: 'AS',
    neighborhood: 'South Delhi (Saket)',
    points: 2480,
    co2SavedKg: 84.5,
    rank: 1,
    badges: ['Top Commuter', 'Purifier Pro', 'Eco Champion'],
  },
  {
    id: 'm-2',
    name: 'Pooja Iyer',
    avatar: 'PI',
    neighborhood: 'Dwarka Sector 11',
    points: 2210,
    co2SavedKg: 76.2,
    rank: 2,
    badges: ['Metro Pioneer', 'Winter Shield'],
  },
  {
    id: 'm-3',
    name: 'Rohan Mehra',
    avatar: 'RM',
    neighborhood: 'Noida Sector 62',
    points: 1980,
    co2SavedKg: 68.0,
    rank: 3,
    badges: ['Carpool Captain', 'Grid Guardian'],
  },
  {
    id: 'm-4',
    name: 'Dr. Sunita Sen',
    avatar: 'SS',
    neighborhood: 'Gurugram Cyber City',
    points: 1750,
    co2SavedKg: 59.4,
    rank: 4,
    badges: ['Clean Haven Master'],
  },
  {
    id: 'm-5',
    name: 'Karan Verma',
    avatar: 'KV',
    neighborhood: 'Kolkata Salt Lake',
    points: 1540,
    co2SavedKg: 51.8,
    rank: 5,
    badges: ['Eco Commuter'],
  },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p-1',
    author: 'Priya N.',
    neighborhood: 'Dwarka, Delhi',
    timeAgo: '25m ago',
    actionTaken: 'Took the Airport Express Metro instead of driving my SUV today. Fast, smog-free, and saved ~3.4 kg CO2!',
    co2Saved: '3.4 kg CO2',
    cheersCount: 19,
    userCheered: false,
    avatarBg: 'bg-emerald-600',
  },
  {
    id: 'p-2',
    author: 'Vikram Rajput',
    neighborhood: 'Indirapuram, Ghaziabad',
    timeAgo: '1h ago',
    actionTaken: 'Sealed all bedroom window seams with silicone tape yesterday. Bedroom AQI dropped from 145 down to 22 with the purifier on auto!',
    co2Saved: '1.2 kg CO2',
    cheersCount: 34,
    userCheered: true,
    avatarBg: 'bg-teal-600',
  },
  {
    id: 'p-3',
    author: 'Ananya Roy',
    neighborhood: 'New Town, Kolkata',
    timeAgo: '3h ago',
    actionTaken: 'Convinced 3 neighbors to carpool to the tech park today. That is 2 cars taken off the morning rush hour grid.',
    co2Saved: '6.8 kg CO2',
    cheersCount: 42,
    userCheered: false,
    avatarBg: 'bg-green-700',
  },
  {
    id: 'p-4',
    author: 'Amit Joshi',
    neighborhood: 'Powai, Mumbai',
    timeAgo: '5h ago',
    actionTaken: 'Installed 4 Areca Palms and Snake Plants in our living room. Natural indoor air freshener without aerosols!',
    co2Saved: '0.8 kg CO2',
    cheersCount: 28,
    userCheered: true,
    avatarBg: 'bg-emerald-700',
  },
];

export const ENVIRONMENTAL_AWARENESS_TIPS = [
  {
    title: 'The Science of Winter Thermal Inversion',
    summary: 'During winter nights, the Earth’s surface cools rapidly. Instead of warm air rising, a layer of cold, dense air gets trapped beneath a warm cap, trapping city exhaust like a lid on a pot.',
    readTime: '3 min read',
    tag: 'Meteorology',
  },
  {
    title: 'Why PM2.5 is So Dangerous to the Human Body',
    summary: 'Unlike dust particles filtered by nasal hairs, PM2.5 particles are smaller than 2.5 microns (30x thinner than a human hair). They penetrate directly into lung alveoli and can enter the arterial bloodstream.',
    readTime: '4 min read',
    tag: 'Human Health',
  },
  {
    title: 'How Stubble Burning & Wind Patterns Collide',
    summary: 'Post-harvest paddy straw burning in northwestern plains coincides with calm post-monsoon wind directions blowing southeasterly across the Indo-Gangetic basin, multiplying urban vehicle emissions.',
    readTime: '5 min read',
    tag: 'Regional Climate',
  },
];

