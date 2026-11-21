import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wind,
  Thermometer,
  Droplets,
  ShieldAlert,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Info,
  CalendarCheck2,
  Home,
  BotMessageSquare,
  Activity,
  Flame,
  Radio,
  AlertTriangle,
  RefreshCw,
  Gauge,
  CloudFog,
} from 'lucide-react';
import { useAirQuality } from '../context/AirQualityContext';
import { useFamilyProfile } from '../context/FamilyProfileContext';
import { AqiBadge } from '../components/AqiBadge';
import { AqiGauge } from '../components/AqiGauge';
import { PollutantCard } from '../components/PollutantCard';
import { CPCB_CATEGORIES } from '../types/aqi';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { aqiData, isLoading, isLiveFeed, apiUnavailable, error, refreshAqi, toggleLiveFeed } = useAirQuality();
  const { profile } = useFamilyProfile();

  if (isLoading && !aqiData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Retrieving real-time atmospheric telemetry...</p>
      </div>
    );
  }

  if (!aqiData) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
        <h3 className="text-base font-bold text-slate-800">Telemetry Unavailable</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">Could not load air quality data. Please check connection.</p>
        <button
          onClick={() => refreshAqi()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  const categoryInfo = CPCB_CATEGORIES[aqiData.category] || CPCB_CATEGORIES.Moderate;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* API Unavailable / Fallback Banner */}
      {apiUnavailable && (
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950">Live Sensor API Status: </span>
              <span>
                {error || 'External real-time sensor API was temporarily unreachable. Displaying verified demo simulation.'}
              </span>
            </div>
          </div>
          <button
            onClick={() => refreshAqi()}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Live Feed</span>
          </button>
        </div>
      )}

      {/* 1. Welcome Section & Personalized Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden">
        {/* Background decorative leaf vector */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none w-96 flex items-center justify-center">
          <Wind className="w-80 h-80" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Phase 2 Real-Time Air Quality & Weather</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
            Good day, {profile.city} Family!
          </h1>
          <p className="text-emerald-100/80 text-sm lg:text-base leading-relaxed mb-4">
            {aqiData.weatherCondition ? `${aqiData.weatherCondition}. ` : ''}
            Here is your verified atmospheric shield and personalized health recommendations for{' '}
            <span className="text-white font-semibold">{aqiData.city}</span> ({aqiData.state}).
          </p>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-700/40 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[280px]">{aqiData.dataSource}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-700/40 text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{aqiData.lastUpdated}</span>
            </div>
            <button
              onClick={toggleLiveFeed}
              title="Click to toggle between Live Real-Time Feed and Demo Mode"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                isLiveFeed
                  ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/50 hover:bg-emerald-500/40'
                  : 'bg-amber-500/30 text-amber-200 border-amber-400/50 hover:bg-amber-500/40'
              }`}
            >
              {isLiveFeed ? (
                <>
                  <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                  <span>● LIVE SENSOR TELEMETRY</span>
                </>
              ) : (
                <>
                  <Info className="w-3.5 h-3.5 text-amber-300" />
                  <span>DEMO SIMULATION READING</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main AQI Overview & Gauge Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gauge Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">Current Air Quality</h2>
                <p className="text-xs text-slate-400">Indian CPCB Standard (0–500)</p>
              </div>
              <AqiBadge category={aqiData.category} value={aqiData.aqi} size="md" />
            </div>

            <AqiGauge aqi={aqiData.aqi} category={aqiData.category} />

            <div className={`mt-4 p-4 rounded-2xl border ${categoryInfo.bgClass} ${categoryInfo.borderClass}`}>
              <div className="flex items-start gap-2.5">
                <ShieldAlert className={`w-5 h-5 shrink-0 mt-0.5 ${categoryInfo.textClass}`} />
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${categoryInfo.textClass}`}>
                    {aqiData.category}: {categoryInfo.description}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {categoryInfo.healthAdvisory}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-emerald-600" />
              <span>Primary Dominant Pollutant:</span>
            </span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
              {aqiData.dominantPollutant}
            </span>
          </div>
        </div>

        {/* Multi-pollutant & Ambient Weather Telemetry (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <PollutantCard
              label="PM2.5"
              value={aqiData.pm25}
              unit="µg/m³"
              description="Fine Inhalable Soot"
              status={aqiData.pm25 > 120 ? 'Critical' : aqiData.pm25 > 60 ? 'Unhealthy' : 'Moderate'}
              statusColor={aqiData.pm25 > 120 ? 'text-rose-600' : 'text-amber-600'}
              icon={Activity}
            />
            <PollutantCard
              label="PM10"
              value={aqiData.pm10}
              unit="µg/m³"
              description="Coarse Dust Particles"
              status={aqiData.pm10 > 250 ? 'Very High' : 'Moderate'}
              statusColor={aqiData.pm10 > 250 ? 'text-rose-600' : 'text-amber-600'}
              icon={Wind}
            />
            <PollutantCard
              label="Temperature"
              value={`${aqiData.temperature}°`}
              unit="C"
              description="Ambient Winter Level"
              status={aqiData.temperature < 19 ? 'Inversion Trap' : 'Mild'}
              statusColor={aqiData.temperature < 19 ? 'text-blue-600' : 'text-slate-600'}
              icon={Thermometer}
            />
            <PollutantCard
              label="Humidity"
              value={aqiData.humidity}
              unit="%"
              description="Relative Moisture"
              status={aqiData.humidity > 70 ? 'Smog Mist' : 'Normal'}
              statusColor="text-teal-600"
              icon={Droplets}
            />
            <PollutantCard
              label="Wind Speed"
              value={aqiData.windSpeed}
              unit="km/h"
              description={`Direction: ${aqiData.windDirection}`}
              status={aqiData.windSpeed < 6 ? 'Stagnant Air' : 'Dispersing'}
              statusColor={aqiData.windSpeed < 6 ? 'text-amber-600' : 'text-emerald-600'}
              icon={Wind}
            />
            <PollutantCard
              label="Nitrogen Dioxide"
              value={aqiData.no2}
              unit="µg/m³"
              description="Vehicular Exhaust"
              status="Traffic Combustion"
              statusColor="text-slate-600"
              icon={Flame}
            />
          </div>

          {/* Additional Trace Pollutants Row */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Carbon Monoxide (CO)</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{aqiData.co} <span className="text-[10px] font-normal text-slate-400">mg/m³</span></p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Sulfur Dioxide (SO2)</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{aqiData.so2} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Ground Ozone (O3)</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{aqiData.o3} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
            </div>
          </div>

          {/* Quick AI & Routine Action Bar */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <BotMessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Ask BreatheWise Assistant</h4>
                <p className="text-[11px] text-emerald-800">
                  Synthesize real-time {aqiData.city} weather & AQI into personalized family advice.
                </p>
              </div>
            </div>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <span>Chat with AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. 24-Hour Pollution Trends Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-800">24-Hour Pollution Trend & Diurnal Curve</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {isLiveFeed ? 'CAMS Measured' : 'CPCB Simulation'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hourly PM2.5 and AQI variations illustrating morning and evening thermal inversion spikes in {aqiData.city}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
              <span className="text-slate-600">AQI Index</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
              <span className="text-slate-600">PM2.5 (µg/m³)</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={aqiData.hourlyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="pmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                        <p className="font-bold text-slate-300">{payload[0].payload.time}</p>
                        <p className="text-emerald-400 font-semibold">
                          AQI: <span className="text-white">{payload[0].value}</span>
                        </p>
                        <p className="text-teal-300 font-semibold">
                          PM2.5: <span className="text-white">{payload[1]?.value} µg/m³</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="aqi" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#aqiGrad)" />
              <Area type="monotone" dataKey="pm25" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#pmGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Pollution-Aware Personalized Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Outdoor Routine Shift</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {aqiData.aqi > 200
                ? `Current AQI (${aqiData.aqi}) and cold morning temp (${aqiData.temperature}°C) require postponing morning runs. Best outdoor window is 1:00 PM – 3:30 PM.`
                : `Moderate AQI (${aqiData.aqi}) permits outdoor workouts. Avoid heavy traffic roads where diesel soot concentrates.`}
            </p>
          </div>
          <Link
            to="/routine"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>View full daily schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Indoor Air Defense</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Keep bedroom doors closed and run HEPA purifier in night-mode. Damp-mop floors with microfiber instead of dry sweeping to avoid particulate resuspension.
            </p>
          </div>
          <Link
            to="/indoor"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>Room-wise purifier guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Family Health Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {profile.hasChildren
                ? 'Equip children with well-fitted N95 masks for school commute. Ensure warm hydration and avoid early morning outdoor assembly.'
                : 'Wear N95 respirators on your commute. Avoid cloth masks which do not filter fine 2.5 micron particles.'}
            </p>
          </div>
          <Link
            to="/profile"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>Customize family profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
