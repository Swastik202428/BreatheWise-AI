import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GreenAction, ImpactStats } from '../types/impact';

interface ImpactContextType {
  actions: GreenAction[];
  stats: ImpactStats;
  logAction: (action: Omit<GreenAction, 'id' | 'timestamp'>) => void;
  completedChecklistIds: string[];
  toggleChecklist: (id: string, estimatedCo2: number) => void;
  resetImpactData: () => void;
}

const STORAGE_KEY_ACTIONS = 'breathewise_green_actions';
const STORAGE_KEY_CHECKLIST = 'breathewise_completed_checklist';

const INITIAL_ACTIONS: GreenAction[] = [
  {
    id: 'act-1',
    title: 'Took Delhi Metro to Office',
    description: 'Swapped 18 km solo petrol car drive with yellow line metro ride.',
    category: 'transport',
    co2SavedKg: 2.8,
    energySavedKwh: 1.4,
    timestamp: 'Today, 09:15 AM',
    iconName: 'TrainFront',
  },
  {
    id: 'act-2',
    title: 'Sealed Bedroom Windows',
    description: 'Used silicone weatherstripping tape on bedroom sashes.',
    category: 'indoor',
    co2SavedKg: 0.8,
    energySavedKwh: 2.1,
    timestamp: 'Yesterday, 07:30 PM',
    iconName: 'ShieldCheck',
  },
  {
    id: 'act-3',
    title: 'Space Heater Set to 21°C',
    description: 'Avoided max 26°C setting, lowering peak evening grid consumption.',
    category: 'energy',
    co2SavedKg: 1.6,
    energySavedKwh: 3.5,
    timestamp: '2 days ago',
    iconName: 'Zap',
  },
  {
    id: 'act-4',
    title: '3-Person Office Carpool',
    description: 'Shared commute with 2 colleagues, reducing 2 cars from peak ring road.',
    category: 'transport',
    co2SavedKg: 4.2,
    energySavedKwh: 2.0,
    timestamp: '3 days ago',
    iconName: 'Users',
  },
];

const ImpactContext = createContext<ImpactContextType | undefined>(undefined);

export const ImpactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actions, setActions] = useState<GreenAction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ACTIONS;
  });

  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['c1', 'c2', 'c3', 'c9'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIONS, JSON.stringify(actions));
    } catch (err) {
      console.error('Failed to save actions:', err);
    }
  }, [actions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(completedChecklistIds));
    } catch (err) {
      console.error('Failed to save checklist:', err);
    }
  }, [completedChecklistIds]);

  const stats: ImpactStats = {
    totalActions: actions.length,
    totalCo2AvoidedKg: Number(actions.reduce((acc, a) => acc + a.co2SavedKg, 0).toFixed(1)),
    totalEnergySavedKwh: Number(actions.reduce((acc, a) => acc + a.energySavedKwh, 0).toFixed(1)),
    cleanCommuteKm: Number(
      actions
        .filter((a) => a.category === 'transport')
        .reduce((acc, a) => acc + a.co2SavedKg * 6.5, 0)
        .toFixed(0)
    ),
    streakDays: 6,
  };

  const logAction = (actionData: Omit<GreenAction, 'id' | 'timestamp'>) => {
    const newAction: GreenAction = {
      ...actionData,
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
    };
    setActions((prev) => [newAction, ...prev]);
  };

  const toggleChecklist = (id: string, estimatedCo2: number) => {
    if (completedChecklistIds.includes(id)) {
      setCompletedChecklistIds((prev) => prev.filter((item) => item !== id));
    } else {
      setCompletedChecklistIds((prev) => [...prev, id]);
      if (estimatedCo2 > 0) {
        logAction({
          title: `Completed daily checklist action (#${id})`,
          description: 'Pollution-aware sustainable routine action logged.',
          category: 'lifestyle' as any,
          co2SavedKg: estimatedCo2,
          energySavedKwh: Number((estimatedCo2 * 0.8).toFixed(1)),
          iconName: 'CheckCircle2',
        });
      }
    }
  };

  const resetImpactData = () => {
    setActions(INITIAL_ACTIONS);
    setCompletedChecklistIds(['c1', 'c2', 'c3', 'c9']);
    localStorage.removeItem(STORAGE_KEY_ACTIONS);
    localStorage.removeItem(STORAGE_KEY_CHECKLIST);
  };

  return (
    <ImpactContext.Provider
      value={{
        actions,
        stats,
        logAction,
        completedChecklistIds,
        toggleChecklist,
        resetImpactData,
      }}
    >
      {children}
    </ImpactContext.Provider>
  );
};

export const useImpact = (): ImpactContextType => {
  const context = useContext(ImpactContext);
  if (!context) {
    throw new Error('useImpact must be used within an ImpactProvider');
  }
  return context;
};

