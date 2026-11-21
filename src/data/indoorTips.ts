export interface RoomActionStep {
  title: string;
  description: string;
  importance: 'High' | 'Medium' | 'Essential';
}

export interface RoomChecklist {
  room: string;
  icon: string;
  focus: string;
  targetAqi: string;
  keyHazards: string[];
  actionSteps: RoomActionStep[];
}

export const ROOM_CHECKLISTS: RoomChecklist[] = [
  {
    room: 'Master Bedroom',
    icon: 'BedDouble',
    focus: 'Night-time restoration & sleep air purity',
    targetAqi: '< 30 AQI (Good)',
    keyHazards: ['Mattress dust mites', 'Dry stagnant winter air', 'Drafts through window frames', 'VOCs from synthetic blankets'],
    actionSteps: [
      {
        title: 'Run True HEPA Filter Continuously on Low',
        description: 'Position the air purifier at least 1.5 meters away from the bed headboard and away from walls for 360° air circulation.',
        importance: 'Essential',
      },
      {
        title: 'Weatherstrip Bedroom Windows',
        description: 'Use self-adhesive silicone or foam sealing tape around window frames to eliminate cold smog seepage during winter inversion nights.',
        importance: 'High',
      },
      {
        title: 'Wash Bedding in 60°C Warm Water Weekly',
        description: 'Eliminates dust mites and settled particulate matter tracked indoors on clothes.',
        importance: 'Medium',
      },
      {
        title: 'Maintain Relative Humidity at 40%–50%',
        description: 'Overly dry air (<30%) parches nasal membranes, reducing natural immune defenses against bacteria and smog.',
        importance: 'Medium',
      },
    ],
  },
  {
    room: 'Children & Elderly Room',
    icon: 'Baby',
    focus: 'Maximum vulnerability protection',
    targetAqi: '< 25 AQI (Pristine)',
    keyHazards: ['Developing lungs in toddlers', 'Lower breathing height (closer to ground-level dust)', 'Bronchial hyper-reactivity'],
    actionSteps: [
      {
        title: 'Dedicated HEPA Purifier with CADR > 250 m³/h',
        description: 'Children breathe 50% more air per kilogram of body weight than adults. Ensure at least 4 Air Changes per Hour (ACH).',
        importance: 'Essential',
      },
      {
        title: 'Damp Microfiber Mopping Only (No Dry Brooms)',
        description: 'Dry sweeping resuspends toxic settled PM10 and heavy metal dust back into breathing air. Always damp-mop with microfiber.',
        importance: 'Essential',
      },
      {
        title: 'Keep Soft Toys & Plush Carpets Cleaned',
        description: 'Synthetic rugs act as particulate dust sponges. Shake them outdoors during clear afternoons or vacuum with sealed HEPA vacuums.',
        importance: 'High',
      },
      {
        title: 'Zero Aerosols or Air Fresheners',
        description: 'Never spray artificial air fresheners, deodorants, or insect repellents in rooms where children or elderly sleep.',
        importance: 'High',
      },
    ],
  },
  {
    room: 'Kitchen',
    icon: 'ChefHat',
    focus: 'Combustion & cooking aerosol containment',
    targetAqi: '< 50 AQI',
    keyHazards: ['Gas stove NO2 & CO emissions', 'Ultra-fine aerosolized cooking oils', 'High heat frying smoke'],
    actionSteps: [
      {
        title: 'Turn on Kitchen Chimney / Exhaust Before Igniting Burners',
        description: 'Unvented gas burners release significant levels of nitrogen dioxide (NO2). Start high-suction exhaust 1 minute before flame ignition.',
        importance: 'Essential',
      },
      {
        title: 'Cook with Pan Lids Whenever Possible',
        description: 'Traps aerosolized grease and oil vapors inside cookware, cutting kitchen PM2.5 emissions by up to 75%.',
        importance: 'High',
      },
      {
        title: 'Isolate Kitchen from Rest of Living Space',
        description: 'Keep kitchen doors closed during deep frying or tadka preparation so smoke does not overwhelm living room air purifiers.',
        importance: 'High',
      },
      {
        title: 'Clean Chimney Baffle Filters Fortnightly',
        description: 'Grease-clogged filters reduce suction airflow by up to 50% and present a fire risk.',
        importance: 'Medium',
      },
    ],
  },
  {
    room: 'Living Room & Entryway',
    icon: 'Sofa',
    focus: 'First line of outdoor particulate defense',
    targetAqi: '< 45 AQI',
    keyHazards: ['Shoe-borne road dust', 'Frequent door opening', 'Guest traffic', 'Pet dander'],
    actionSteps: [
      {
        title: 'Adopt a Strict Shoe-Free Home Policy',
        description: 'Outdoor footwear carries brake dust, lead, and toxic road soot. Keep an entryway shoe rack outside or at the immediate foyer.',
        importance: 'Essential',
      },
      {
        title: 'Place Double Coir Doormats at Entryway',
        description: 'One coarse bristled mat outside the door and one microfiber absorbing mat inside captures 85% of footwear particulate dirt.',
        importance: 'High',
      },
      {
        title: 'Incorporate Air-Purifying Indoor Plants',
        description: 'Areca Palms, Snake Plants (Sansevieria), and Money Plants help absorb VOCs and restore indoor oxygen balance naturally.',
        importance: 'Medium',
      },
      {
        title: 'Seal Main Entrance Door Threshold',
        description: 'Install brush or rubber sweepers at the bottom of the main entryway door to block exterior corridor smog leaks.',
        importance: 'High',
      },
    ],
  },
];

export interface HepaGuideline {
  title: string;
  description: string;
}

export const HEPA_PURIFIER_GUIDELINES: HepaGuideline[] = [
  {
    title: 'True HEPA (H13 / H14) vs "HEPA-Type"',
    description: 'Ensure your filter is certified True HEPA H13, which traps 99.97% of particles down to 0.3 microns. "HEPA-type" filters lack medical-grade testing.',
  },
  {
    title: 'CADR Rating Calculation',
    description: 'Multiply your room area (in sq. ft) by 1.5 to calculate the minimum CADR (Clean Air Delivery Rate in cfm) required for 4 air changes per hour.',
  },
  {
    title: 'Activated Carbon Filter Layer',
    description: 'HEPA filters capture solid particulates; activated carbon is required to neutralize toxic gases, winter ozone, sulfur dioxide, and vehicle odors.',
  },
  {
    title: 'Filter Replacement Indicators',
    description: 'During severe winter smog seasons (AQI > 300), inspect filters every 2 months. Heavily gray or black pre-filters drastically reduce blower motor lifespan.',
  },
];

