import React, { useState } from 'react';
import {
  Home,
  Wind,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Sparkles,
  BedDouble,
  Baby,
  ChefHat,
  Sofa,
  Clock,
  Sliders,
} from 'lucide-react';
import { useFamilyProfile } from '../context/FamilyProfileContext';
import { ROOM_CHECKLISTS, HEPA_PURIFIER_GUIDELINES } from '../data/indoorTips';

export const IndoorPage: React.FC = () => {
  const { profile } = useFamilyProfile();
  const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(0);

  const activeRoom = ROOM_CHECKLISTS[selectedRoomIdx];

  const getRoomIcon = (iconName: string) => {
    switch (iconName) {
      case 'BedDouble':
        return <BedDouble className="w-4 h-4" />;
      case 'Baby':
        return <Baby className="w-4 h-4" />;
      case 'ChefHat':
        return <ChefHat className="w-4 h-4" />;
      case 'Sofa':
        return <Sofa className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Indoor Air Quality & Smog Shield</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            Create a Clean-Air Haven for Your Family
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            During peak winter inversion, indoor air can become 2x to 5x more hazardous than outdoor
            air if cooking smoke, unvented gas heaters, or resuspended floor dust combine with
            infiltrating PM2.5.
          </p>
        </div>
      </div>

      {/* HEPA Air Purifier Best Practices */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">HEPA Air Purifier Operational Protocol</h2>
            <p className="text-xs text-slate-400">Maximize filtration efficiency and lower electricity consumption</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HEPA_PURIFIER_GUIDELINES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 block mb-1">0{idx + 1}</span>
                <h3 className="text-xs font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Current User Air Purifier Context */}
        <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold text-emerald-950">Your Home Purifier Setup: </span>
              <span className="text-emerald-900">
                {profile.hasPurifier
                  ? `${profile.purifierCount} units active in ${profile.purifierRooms} (${profile.purifierModel})`
                  : 'No air purifier currently configured.'}
              </span>
            </div>
          </div>
          <span className="font-semibold text-emerald-800 whitespace-nowrap">
            Recommended Air Changes: 4 ACH
          </span>
        </div>
      </div>

      {/* Room-by-Room Checklist & Hazard Guide */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-800">Room-Wise Indoor Air Checklist</h2>
          <p className="text-xs text-slate-400">
            Select a room to see tailored filtration settings, key hazards, and protective steps
          </p>
        </div>

        {/* Room Tab Selector */}
        <div className="flex flex-wrap gap-2">
          {ROOM_CHECKLISTS.map((room, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRoomIdx(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                selectedRoomIdx === idx
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {getRoomIcon(room.icon)}
              <span>{room.room}</span>
            </button>
          ))}
        </div>

        {/* Active Room Header & Target */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">{activeRoom.room} Clean-Air Target</h3>
            <p className="text-xs text-slate-500">{activeRoom.focus}</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-emerald-700">
            Target: {activeRoom.targetAqi}
          </div>
        </div>

        {/* Room Key Hazards */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Primary Hazards in this space:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeRoom.keyHazards.map((hazard, hIdx) => (
              <span
                key={hIdx}
                className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium"
              >
                ⚠️ {hazard}
              </span>
            ))}
          </div>
        </div>

        {/* Action Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeRoom.actionSteps.map((step, sIdx) => (
            <div
              key={sIdx}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      step.importance === 'Essential'
                        ? 'bg-rose-100 text-rose-800'
                        : step.importance === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {step.importance}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">Tip #{sIdx + 1}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Clean-Air Protocol</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indoor Dust & Cooking Smoke Prevention Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Dust Resuspension Prevention</h3>
              <p className="text-xs text-slate-400">Protect children breathing at low heights</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              Traditional dry sweeping with straw brooms kicks up heavy lead and silica particulates
              that hover in the breathing zone for 4+ hours.
            </p>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
              <li>Always damp-mop using microfiber cloths with mild plant-based soap.</li>
              <li>Establish a double-doormat barrier at the entrance door (coir + microfiber).</li>
              <li>Remove outdoor footwear at the foyer to prevent tracking vehicular brake dust.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Cooking Smoke & Combustion Control</h3>
              <p className="text-xs text-slate-400">Prevent indoor NO2 and aerosol spikes</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              High-heat frying without suction exhaust generates ultrafine PM0.1 particles that
              penetrate through living rooms and settle inside bedroom fabrics.
            </p>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
              <li>Turn on chimney exhaust 1 minute before igniting the LPG burner.</li>
              <li>Use tight lids when sautéing or boiling to trap grease mist.</li>
              <li>Completely avoid indoor incense sticks, agarbattis, and mosquito coils.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

