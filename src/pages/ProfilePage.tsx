import React, { useState } from 'react';
import {
  Users2,
  MapPin,
  Baby,
  HeartPulse,
  Activity,
  Car,
  Wind,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { useFamilyProfile } from '../context/FamilyProfileContext';
import { POPULAR_CITIES } from '../data/cities';
import { OutdoorActivityType, CommutePreference } from '../types/profile';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, resetProfile } = useFamilyProfile();

  const [formData, setFormData] = useState(profile);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Dynamic Personalization Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            Household & Family Profile
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            Your family details directly tailor AI recommendations, high-risk asthma warnings,
            ventilation schedules, and morning workout windows throughout the application.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Family profile updated successfully! All AI and dashboard recommendations are now personalized.</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Section 1: Location & Household Size */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Location & Household Size</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">City / Urban Region</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.state})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Neighborhood / Sector</label>
              <input
                type="text"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                placeholder="e.g. Dwarka Sector 11, Saket, BKC"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Total Family Members</label>
              <input
                type="number"
                min="1"
                max="15"
                value={formData.familySize}
                onChange={(e) => setFormData({ ...formData, familySize: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Vulnerable Family Members */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
            <Baby className="w-4 h-4 text-rose-600" />
            <span>Vulnerable Family Members & Health Sensitivities</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Children Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasChildren}
                  onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="font-bold text-slate-800">Young Children in Household</span>
              </label>

              {formData.hasChildren && (
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    value={formData.childrenAges}
                    onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                    placeholder="Children ages (e.g. 3 and 7 years old)"
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800"
                  />
                  <p className="text-[11px] text-slate-500">
                    Triggers pediatric school commute alerts and low-altitude dust mopping protocols.
                  </p>
                </div>
              )}
            </div>

            {/* Elderly Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasElderly}
                  onChange={(e) => setFormData({ ...formData, hasElderly: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="font-bold text-slate-800">Elderly Members (60+ years)</span>
              </label>

              {formData.hasElderly && (
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-[11px] text-slate-500">
                    Activates cardiovascular smog warnings, indoor walk alternatives, and night HEPA alerts.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Respiratory Ailments */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasRespiratoryIssues}
                onChange={(e) => setFormData({ ...formData, hasRespiratoryIssues: e.target.checked })}
                className="w-4 h-4 text-rose-600 rounded"
              />
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>Preexisting Respiratory Issues (Asthma, Bronchitis, Seasonal Wheezing)</span>
              </span>
            </label>

            {formData.hasRespiratoryIssues && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  value={formData.respiratoryConditions}
                  onChange={(e) => setFormData({ ...formData, respiratoryConditions: e.target.value })}
                  placeholder="Notes on conditions (e.g. Mild winter asthma in senior, child dust allergy)"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800"
                />
                <p className="text-[11px] text-rose-700 font-medium">
                  Strict cautionary guardrails will be emphasized in all AI Assistant recommendations.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Daily Activity & Transportation */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Outdoor Activity & Commuting Mode</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Daily Outdoor Activity Habit</label>
              <select
                value={formData.outdoorActivity}
                onChange={(e) => setFormData({ ...formData, outdoorActivity: e.target.value as OutdoorActivityType })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
              >
                <option value="Morning Jogger / Walker">Morning Jogger / Walker</option>
                <option value="Evening Runner">Evening Runner</option>
                <option value="Daily Outdoor Commuter">Daily Outdoor Commuter</option>
                <option value="Mainly Indoors">Mainly Indoors</option>
                <option value="Sports & Fitness Enthusiast">Sports & Fitness Enthusiast</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Commute Mode</label>
              <select
                value={formData.commuteMode}
                onChange={(e) => setFormData({ ...formData, commuteMode: e.target.value as CommutePreference })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
              >
                <option value="Metro / Rapid Rail">Metro / Rapid Rail</option>
                <option value="Public Electric Bus">Public Electric Bus</option>
                <option value="Carpooling">Carpooling</option>
                <option value="Personal Car (Petrol/Diesel)">Personal Car (Petrol/Diesel)</option>
                <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
                <option value="Two-Wheeler / Scooter">Two-Wheeler / Scooter</option>
                <option value="Bicycle / Walking">Bicycle / Walking</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Indoor Air Purifier Setup */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
            <Wind className="w-4 h-4 text-emerald-600" />
            <span>Air Purifier & Home Sealing</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasPurifier}
                  onChange={(e) => setFormData({ ...formData, hasPurifier: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="font-bold text-slate-800">HEPA Purifier Available</span>
              </label>

              {formData.hasPurifier && (
                <div className="mt-3">
                  <label className="text-[11px] text-slate-600 block mb-1">Count of Purifiers</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.purifierCount}
                    onChange={(e) => setFormData({ ...formData, purifierCount: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800 font-medium"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Covered Rooms</label>
              <input
                type="text"
                value={formData.purifierRooms}
                onChange={(e) => setFormData({ ...formData, purifierRooms: e.target.value })}
                placeholder="e.g. Master Bedroom & Kids Room"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Home Sealing & Ventilation</label>
              <select
                value={formData.homeVentilation}
                onChange={(e) => setFormData({ ...formData, homeVentilation: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
              >
                <option value="Moderate">Moderate (Standard window frames)</option>
                <option value="Airtight / Double Glazed">Airtight / Double Glazed</option>
                <option value="Cross-Ventilated">Cross-Ventilated (Open Balconies)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetProfile}
            className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Save & Apply Household Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};

