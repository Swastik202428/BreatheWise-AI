import React, { useState } from 'react';
import {
  Sun,
  Sunset,
  Sunrise,
  CheckCircle2,
  Car,
  Zap,
  ShieldCheck,
  Footprints,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useAirQuality } from '../context/AirQualityContext';
import { useFamilyProfile } from '../context/FamilyProfileContext';
import { useImpact } from '../context/ImpactContext';
import { DAILY_ROUTINES, DEFAULT_CHECKLIST_ITEMS } from '../data/routines';

export const RoutinePage: React.FC = () => {
  const { aqiData } = useAirQuality();
  const { profile } = useFamilyProfile();
  const { completedChecklistIds, toggleChecklist } = useImpact();

  const [activeTab, setActiveTab] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');

  const selectedRoutine = DAILY_ROUTINES.find((r) => r.period === activeTab) || DAILY_ROUTINES[0];

  const totalChecklist = DEFAULT_CHECKLIST_ITEMS.length;
  const completedCount = completedChecklistIds.length;
  const progressPercent = Math.round((completedCount / totalChecklist) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Pollution-Aware Daily Routine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            Harmonize Your Day with Air Science
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            Winter weather follows distinct atmospheric inversion curves. Structuring your outdoor
            chores, school commute, and window ventilation around diurnal smog cycles cuts your
            family's toxic particulate exposure by up to 70%.
          </p>
        </div>
      </div>

      {/* Routine Tabs (Morning, Afternoon, Evening) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('Morning')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'Morning'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sunrise className="w-4 h-4" />
          <span>Morning (06:00 – 10:30 AM)</span>
        </button>

        <button
          onClick={() => setActiveTab('Afternoon')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'Afternoon'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Afternoon (11:00 AM – 04:00 PM)</span>
        </button>

        <button
          onClick={() => setActiveTab('Evening')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'Evening'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sunset className="w-4 h-4" />
          <span>Evening (05:00 – 10:30 PM)</span>
        </button>
      </div>

      {/* Selected Period Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Smog Science Explanation */}
        <div className="bg-slate-50 rounded-2xl p-4 lg:p-5 border border-slate-200/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Atmospheric Behavior:
                </span>
                <span className="text-xs font-medium text-slate-500">{selectedRoutine.timeRange}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {selectedRoutine.smogBehavior}
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                <strong className="text-slate-700">Why this matters: </strong>
                {selectedRoutine.whyItMatters}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Routine Actions for this period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedRoutine.activities.map((act, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {act.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Step {idx + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">{act.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{act.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-teal-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{act.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Mobility & Energy Conservation Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carpooling & Public Transit */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Clean Commuting & Carpooling</h3>
                <p className="text-xs text-slate-400">Reduce localized road congestion</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Tailpipe exhaust from slow-moving bumper-to-bumper traffic releases warm NOx gases that react
              with winter fog to form secondary nitrate aerosols.
            </p>

            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Metro / Train Transit:</strong> Zero tailpipe emissions along your route. Eliminates ~2.5 kg CO2 per 15 km trip.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>
                  <strong>3-Person Office Carpool:</strong> Cuts fuel costs by 66% and removes 2 idling vehicles from school zones and choke points.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Cabin Air Recirculation:</strong> Keep car AC set to internal recirculation so diesel trucks in front of you do not fill your cabin with soot.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
            Current Family Commute: <strong className="text-slate-800">{profile.commuteMode}</strong>
          </div>
        </div>

        {/* Energy-Saving Habits */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Winter Energy-Saving Habits</h3>
                <p className="text-xs text-slate-400">Prevent backup diesel generator surges</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              When millions of homes run space heaters and water geysers simultaneously, local substations overload, triggering loud diesel gensets that emit black soot directly outside apartment balconies.
            </p>

            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Set Heaters to 20°C–21°C:</strong> Every degree above 21°C increases energy consumption by ~8% without significant comfort improvement.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Stagger Water Heating:</strong> Switch off electric water heaters after morning showers to curb peak morning grid draw.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Purifier Auto Mode:</strong> Modern brushless DC (BLDC) motor air purifiers use only 15–30W on auto mode, saving ~40 kWh/month compared to full speed.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
            Estimated Daily Energy Saved: <strong className="text-slate-800">~2.8 kWh/household</strong>
          </div>
        </div>
      </div>

      {/* Interactive Daily Checklist */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800">Daily Clean-Air Checklist</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                {completedCount} of {totalChecklist} Done
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Check actions you've completed today to automatically log saved CO2 in your Impact Tracker
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full sm:w-48 flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-600">
              <span>Today's Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DEFAULT_CHECKLIST_ITEMS.map((item) => {
            const isChecked = completedChecklistIds.includes(item.id);
            return (
              <label
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  toggleChecklist(item.id, item.estimatedCo2);
                }}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-xs'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-emerald-200 hover:bg-slate-50/50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${isChecked ? 'line-through text-slate-500' : ''}`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.timeOfDay}
                    </span>
                  </div>
                  {item.estimatedCo2 > 0 && (
                    <span className="text-[11px] text-emerald-700 font-medium">
                      +{item.estimatedCo2} kg CO2e avoided
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

