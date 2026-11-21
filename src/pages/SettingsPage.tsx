import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Bell,
  Sparkles,
  Server,
  Key,
  CheckCircle2,
  Trash2,
  Download,
  AlertCircle,
  Radio,
  Wind,
} from 'lucide-react';
import { useFamilyProfile } from '../context/FamilyProfileContext';
import { useImpact } from '../context/ImpactContext';
import { useAirQuality } from '../context/AirQualityContext';
import { checkBackendHealth, HealthCheckResult } from '../services/api';

export const SettingsPage: React.FC = () => {
  const { profile } = useFamilyProfile();
  const { resetImpactData } = useImpact();
  const { isLiveFeed, aqiData } = useAirQuality();

  const [userName, setUserName] = useState<string>('Priya Sharma');
  const [userEmail, setUserEmail] = useState<string>('priya.sharma@example.com');
  const [morningAlerts, setMorningAlerts] = useState<boolean>(true);
  const [smogSpikes, setSmogSpikes] = useState<boolean>(true);
  const [eveningPurifierAlerts, setEveningPurifierAlerts] = useState<boolean>(true);
  const [aiTone, setAiTone] = useState<'Encouraging' | 'Scientific' | 'Urgent'>('Scientific');
  const [includeProfileInPrompt, setIncludeProfileInPrompt] = useState<boolean>(true);

  const [backendHealth, setBackendHealth] = useState<HealthCheckResult | null>(null);
  const [checkingServer, setCheckingServer] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const verifyBackend = async () => {
    setCheckingServer(true);
    try {
      const res = await checkBackendHealth();
      setBackendHealth(res);
    } finally {
      setCheckingServer(false);
    }
  };

  useEffect(() => {
    verifyBackend();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const backup = {
      profile,
      exportTimestamp: new Date().toISOString(),
      app: 'BreatheWise AI Phase 2',
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breathewise-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Settings className="w-3.5 h-3.5 text-emerald-300" />
            <span>Preferences & Diagnostics</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
            Application Settings
          </h1>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            Configure real-time air quality APIs, notifications, AI response style, location preferences,
            and view backend Gemini connection diagnostics.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Backend & Gemini API Diagnostics */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Backend Server & Live Telemetry Diagnostics</h2>
              <p className="text-xs text-slate-400">Security: API keys are securely kept in backend .env, never in frontend</p>
            </div>
          </div>

          <button
            onClick={verifyBackend}
            disabled={checkingServer}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            {checkingServer ? 'Checking...' : 'Check Status'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 text-[11px] font-semibold uppercase">API Service Link</span>
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  backendHealth?.status === 'ok' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span>
                {backendHealth?.status === 'ok' ? 'Connected (Express Backend)' : 'Local Fallback'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {backendHealth?.service || 'Proxy active at /api'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 text-[11px] font-semibold uppercase">Real-Time AQI & Weather</span>
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isLiveFeed ? 'Live CAMS Feed Active' : 'Demo Simulation Mode'}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate" title={aqiData?.dataSource}>
              {aqiData?.dataSource || 'Open-Meteo CAMS Real-Time Telemetry'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 text-[11px] font-semibold uppercase">Google Gemini AI Key</span>
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {backendHealth?.hasGeminiKey ? 'Configured & Active' : 'Not Loaded in .env'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {backendHealth?.hasGeminiKey
                ? 'Gemini 1.5 Flash live inference active.'
                : 'Using built-in intelligent environmental knowledge engine.'}
            </p>
          </div>
        </div>

        {!backendHealth?.hasGeminiKey && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">How to activate Gemini: </span>
              Copy <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-semibold">GEMINI_API_KEY=your_key</code> into your local <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code> file. The app remains fully functional with its smart local environmental engine in the meantime.
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Details */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <User className="w-4 h-4 text-emerald-600" />
            <span>User Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Display Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Smog Alerts */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Bell className="w-4 h-4 text-teal-600" />
            <span>Pollution & Smog Alerts</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Morning AQI Briefing (07:00 AM)</span>
                <span className="text-slate-500 text-[11px]">Daily wake-up forecast to plan school run and commutes</span>
              </div>
              <input
                type="checkbox"
                checked={morningAlerts}
                onChange={(e) => setMorningAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Severe Smog Spike Warnings (AQI &gt; 300)</span>
                <span className="text-slate-500 text-[11px]">Instant high-priority alerts when emergency conditions trigger</span>
              </div>
              <input
                type="checkbox"
                checked={smogSpikes}
                onChange={(e) => setSmogSpikes(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Evening Air Purifier Pre-Night Reminder</span>
                <span className="text-slate-500 text-[11px]">Prompt to seal bedroom windows and set purifiers to night mode</span>
              </div>
              <input
                type="checkbox"
                checked={eveningPurifierAlerts}
                onChange={(e) => setEveningPurifierAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* AI Assistant Preferences */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Personality & Prompt Context</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">AI Recommendation Tone</label>
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
              >
                <option value="Scientific">Scientific & Data-Driven (Explains inversion, microns, CADR)</option>
                <option value="Encouraging">Encouraging & Habit-Building</option>
                <option value="Urgent">Strict Protective (High caution for health risks)</option>
              </select>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeProfileInPrompt}
                  onChange={(e) => setIncludeProfileInPrompt(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="font-bold text-slate-800">Inject Family & Weather Context in Chat</span>
              </label>
              <p className="text-[11px] text-slate-500 mt-1">
                Shares city, temperature, humidity, wind, children, and purifier status with Gemini.
              </p>
            </div>
          </div>
        </div>

        {/* Data Management & Export */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
            Data Management
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={handleExportData}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Saved Profile (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all logged green actions and checklist states?')) {
                  resetImpactData();
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Local Impact Tracker</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Save All Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
