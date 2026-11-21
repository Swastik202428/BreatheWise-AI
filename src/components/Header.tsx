import React, { useState } from 'react';
import {
  Menu,
  RefreshCw,
  AlertTriangle,
  Radio,
  LocateFixed,
  Search,
  X,
  MapPin,
} from 'lucide-react';
import { useAirQuality } from '../context/AirQualityContext';
import { AqiBadge } from './AqiBadge';
import { searchCityLocation } from '../services/api';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const {
    selectedCity,
    setSelectedCity,
    aqiData,
    isLoading,
    refreshAqi,
    availableCities,
    isLiveFeed,
    feedMode,
    toggleLiveFeed,
    useCurrentLocation,
    selectCustomCity,
    customLocation,
  } = useAirQuality();

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<{ name: string; state: string; lat: number; lng: number }>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [locating, setLocating] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchCityLocation(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSelectSearchResult = async (res: { name: string; state: string; lat: number; lng: number }) => {
    await selectCustomCity(res.name, res.state, res.lat, res.lng);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleGpsClick = async () => {
    setLocating(true);
    await useCurrentLocation();
    setLocating(false);
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Left: Mobile Menu, City Selector, GPS, Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* City Selector */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 hidden sm:inline" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={isLoading}
              className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-colors max-w-[140px] sm:max-w-[200px] truncate"
            >
              {customLocation && (
                <option value={customLocation.id}>
                  📍 {customLocation.name}
                </option>
              )}
              {availableCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} ({city.state})
                </option>
              ))}
            </select>
          </div>

          {/* GPS Current Location Button */}
          <button
            onClick={handleGpsClick}
            disabled={locating || isLoading}
            title="Detect My Real-Time Location via GPS"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LocateFixed className={`w-3.5 h-3.5 text-emerald-600 ${locating ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{locating ? 'Locating...' : 'Use GPS'}</span>
          </button>

          {/* Search Custom City Button */}
          <button
            onClick={() => setSearchOpen(true)}
            title="Search any city or district worldwide"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Search City</span>
          </button>

          {/* Live vs Demo Toggle Badge */}
          <button
            onClick={toggleLiveFeed}
            title="Toggle between Live Real-Time Station Feed and Demo Simulation"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${
              isLiveFeed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
            }`}
          >
            {isLiveFeed ? (
              <>
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>LIVE FEED</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>DEMO MODE</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Quick AQI indicator & Refresh button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {aqiData && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden lg:inline font-medium">
                CPCB AQI:
              </span>
              <AqiBadge
                category={aqiData.category}
                value={aqiData.aqi}
                size="sm"
                showIcon
              />
            </div>
          )}

          <button
            onClick={() => refreshAqi()}
            disabled={isLoading}
            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            title="Refresh current air quality and weather telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Custom City Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Search Real-Time City Telemetry</span>
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2 mb-3">
              <input
                type="text"
                autoFocus
                placeholder="Enter city or district (e.g., Ghaziabad, Jaipur, Agra, London)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
              >
                {isSearching ? 'Searching...' : 'Find'}
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block py-1">
                  Select Matching Location:
                </span>
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSearchResult(item)}
                    className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-emerald-50 text-xs flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="font-bold text-slate-800 group-hover:text-emerald-900 block">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {item.state} • {item.lat.toFixed(2)}°, {item.lng.toFixed(2)}°
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700">Select →</span>
                  </button>
                ))}
              </div>
            )}

            {searchQuery && !isSearching && searchResults.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-2">
                Press Find to search Open-Meteo real-time global telemetry.
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
