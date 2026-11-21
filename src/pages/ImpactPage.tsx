import React, { useState } from 'react';
import {
  Footprints,
  Leaf,
  Zap,
  Car,
  TrendingUp,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrainFront,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useImpact } from '../context/ImpactContext';
import { EstimateDisclaimer } from '../components/EstimateDisclaimer';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

export const ImpactPage: React.FC = () => {
  const { actions, stats, logAction } = useImpact();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'transport' | 'energy' | 'indoor' | 'community'>('transport');
  const [newCo2, setNewCo2] = useState<string>('2.5');

  // Realistic weekly progress chart data
  const WEEKLY_DATA = [
    { day: 'Mon', co2: 3.2, energy: 2.1 },
    { day: 'Tue', co2: 4.8, energy: 2.9 },
    { day: 'Wed', co2: 2.6, energy: 1.8 },
    { day: 'Thu', co2: 5.4, energy: 3.4 },
    { day: 'Fri', co2: 4.1, energy: 2.7 },
    { day: 'Sat', co2: 3.0, energy: 3.8 },
    { day: 'Sun (Today)', co2: 3.5, energy: 2.4 },
  ];

  // Monthly progress chart data
  const MONTHLY_DATA = [
    { week: 'Week 1', co2: 18.5, energy: 12.0 },
    { week: 'Week 2', co2: 24.2, energy: 16.4 },
    { week: 'Week 3', co2: 29.8, energy: 20.1 },
    { week: 'Week 4', co2: 34.6, energy: 22.8 },
  ];

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const co2Val = parseFloat(newCo2) || 1.5;
    logAction({
      title: newTitle.trim(),
      description: newDescription.trim() || 'Sustainable action recorded.',
      category: newCategory,
      co2SavedKg: co2Val,
      energySavedKwh: Number((co2Val * 0.75).toFixed(1)),
      iconName: newCategory === 'transport' ? 'TrainFront' : newCategory === 'energy' ? 'Zap' : 'ShieldCheck',
    });

    setNewTitle('');
    setNewDescription('');
    setModalOpen(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return <TrainFront className="w-4 h-4 text-emerald-700" />;
      case 'energy':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'community':
        return <Users className="w-4 h-4 text-blue-600" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 lg:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Community Climate & Clean-Air Accounting</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            Your Family's Environmental Impact
          </h1>
          <p className="text-emerald-100/80 text-sm max-w-2xl leading-relaxed">
            Every metro ride, shared carpool, weatherstripped door, and timed air purifier saves real carbon
            emissions and curbs peak winter urban smog.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all self-start md:self-center shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-emerald-700" />
          <span>Log Green Action</span>
        </button>
      </div>

      {/* Prominent Estimated Values Notice */}
      <EstimateDisclaimer />

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Actions Done
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-800 tracking-tight my-1">
            {stats.totalActions}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>6-day active streak</span>
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              CO2 Avoided
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {stats.totalCo2AvoidedKg}
            </span>
            <span className="text-xs font-medium text-slate-400">kg CO2e*</span>
          </div>
          <span className="text-[11px] text-slate-400">Estimated carbon prevented</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Energy Conserved
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {stats.totalEnergySavedKwh}
            </span>
            <span className="text-xs font-medium text-slate-400">kWh*</span>
          </div>
          <span className="text-[11px] text-slate-400">Reduced grid peak strain</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Clean Commute
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {stats.cleanCommuteKm}
            </span>
            <span className="text-xs font-medium text-slate-400">km</span>
          </div>
          <span className="text-[11px] text-slate-400">Metro & shared journeys</span>
        </div>
      </div>

      {/* Charts Grid: Weekly & Monthly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Weekly Carbon Savings (kg CO2e)</h3>
              <p className="text-xs text-slate-400">Daily estimated carbon reductions across household actions</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              This Week
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg text-xs">
                          <p className="font-bold text-slate-300">{payload[0].payload.day}</p>
                          <p className="text-emerald-400 font-semibold">
                            CO2 Saved: {payload[0].value} kg
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="co2" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Progress Area Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Monthly Cumulative Progress</h3>
              <p className="text-xs text-slate-400">Estimated trajectory of clean air habits this winter</p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
              Winter Season
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg text-xs">
                          <p className="font-bold text-slate-300">{payload[0].payload.week}</p>
                          <p className="text-teal-400 font-semibold">
                            Total CO2: {payload[0].value} kg
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="co2" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#monthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interactive Action History Log */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">Green Action Activity Log</h2>
            <p className="text-xs text-slate-400">Real-time log of sustainable habits verified by your household</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{actions.length} Total Logs</span>
        </div>

        <div className="divide-y divide-slate-100">
          {actions.map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  {getCategoryIcon(act.category)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{act.title}</h4>
                  <p className="text-[11px] text-slate-500">{act.description}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-emerald-700 block">
                  +{act.co2SavedKg} kg CO2e
                </span>
                <span className="text-[10px] text-slate-400">{act.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Logger Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Log a Sustainable Clean-Air Action</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter details below. Impact metrics will be calculated and added to your dashboard.
            </p>

            <form onSubmit={handleCreateAction} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Action Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Took Metro instead of driving car"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Short Description</label>
                <input
                  type="text"
                  placeholder="e.g. 15 km transit trip; avoided peak highway gridlock"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium"
                  >
                    <option value="transport">Clean Transit</option>
                    <option value="energy">Energy Efficiency</option>
                    <option value="indoor">Indoor Air Shield</option>
                    <option value="community">Community / Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimated CO2 Saved (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={newCo2}
                    onChange={(e) => setNewCo2(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                >
                  Save Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

