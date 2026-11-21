import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FamilyProfile, DEFAULT_FAMILY_PROFILE } from '../types/profile';

interface FamilyProfileContextType {
  profile: FamilyProfile;
  updateProfile: (updated: Partial<FamilyProfile>) => void;
  resetProfile: () => void;
  hasSensitiveMembers: boolean;
}

const STORAGE_KEY = 'breathewise_family_profile';

const FamilyProfileContext = createContext<FamilyProfileContextType | undefined>(undefined);

export const FamilyProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<FamilyProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_FAMILY_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_FAMILY_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Failed to save profile to localStorage:', err);
    }
  }, [profile]);

  const updateProfile = (updated: Partial<FamilyProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const resetProfile = () => {
    setProfile(DEFAULT_FAMILY_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  };

  const hasSensitiveMembers = Boolean(
    profile.hasChildren || profile.hasElderly || profile.hasRespiratoryIssues
  );

  return (
    <FamilyProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        hasSensitiveMembers,
      }}
    >
      {children}
    </FamilyProfileContext.Provider>
  );
};

export const useFamilyProfile = (): FamilyProfileContextType => {
  const context = useContext(FamilyProfileContext);
  if (!context) {
    throw new Error('useFamilyProfile must be used within a FamilyProfileProvider');
  }
  return context;
};

