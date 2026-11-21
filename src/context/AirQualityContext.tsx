import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AqiData } from '../types/aqi';
import { fetchCityAqi, FetchAqiOptions } from '../services/api';
import { POPULAR_CITIES, CityOption } from '../data/cities';

interface CustomLocation {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
}

interface AirQualityContextType {
  selectedCity: string;
  setSelectedCity: (cityId: string) => void;
  aqiData: AqiData | null;
  isLoading: boolean;
  error: string | null;
  apiUnavailable: boolean;
  isLiveFeed: boolean;
  feedMode: 'live' | 'demo';
  setFeedMode: (mode: 'live' | 'demo') => void;
  toggleLiveFeed: () => void;
  refreshAqi: () => Promise<void>;
  useCurrentLocation: () => Promise<boolean>;
  selectCustomCity: (name: string, state: string, lat: number, lng: number) => Promise<void>;
  availableCities: CityOption[];
  customLocation: CustomLocation | null;
}

const AirQualityContext = createContext<AirQualityContextType | undefined>(undefined);

export const AirQualityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCityState] = useState<string>('delhi');
  const [customLocation, setCustomLocation] = useState<CustomLocation | null>(null);
  const [aqiData, setAqiData] = useState<AqiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiUnavailable, setApiUnavailable] = useState<boolean>(false);
  const [feedMode, setFeedMode] = useState<'live' | 'demo'>('live');

  const loadData = async (
    cityKey: string,
    mode: 'live' | 'demo' = feedMode,
    customLoc: CustomLocation | null = customLocation
  ) => {
    setIsLoading(true);
    setError(null);

    const options: FetchAqiOptions = {
      mode,
    };

    if (customLoc && cityKey === customLoc.id) {
      options.lat = customLoc.lat;
      options.lng = customLoc.lng;
      options.cityName = customLoc.name;
    }

    try {
      const data = await fetchCityAqi(cityKey, options);
      setAqiData(data);
      setApiUnavailable(Boolean(data.apiUnavailable));
      if (data.error) {
        setError(data.error);
      }
    } catch (err: any) {
      console.error('Error fetching AQI telemetry:', err);
      setError('Unable to reach real-time air quality services.');
      setApiUnavailable(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedCity, feedMode, customLocation);
  }, [selectedCity, feedMode]);

  const setSelectedCity = (cityId: string) => {
    setSelectedCityState(cityId);
  };

  const refreshAqi = async () => {
    await loadData(selectedCity, feedMode, customLocation);
  };

  const toggleLiveFeed = () => {
    setFeedMode((prev) => (prev === 'live' ? 'demo' : 'live'));
  };

  const selectCustomCity = async (name: string, state: string, lat: number, lng: number) => {
    const id = `custom-${name.toLowerCase().replace(/\s+/g, '-')}`;
    const custom: CustomLocation = { id, name, state, lat, lng };
    setCustomLocation(custom);
    setSelectedCityState(id);
    await loadData(id, feedMode, custom);
  };

  const useCurrentLocation = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return false;
    }

    setIsLoading(true);
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const custom: CustomLocation = {
            id: 'current-gps-location',
            name: 'Your GPS Location',
            state: 'Local Station Area',
            lat,
            lng,
          };
          setCustomLocation(custom);
          setSelectedCityState('current-gps-location');
          await loadData('current-gps-location', feedMode, custom);
          resolve(true);
        },
        (geoErr) => {
          console.warn('Geolocation error:', geoErr);
          setError('Location permission denied or unavailable. Using default city.');
          setIsLoading(false);
          resolve(false);
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    });
  };

  return (
    <AirQualityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        aqiData,
        isLoading,
        error,
        apiUnavailable,
        isLiveFeed: aqiData?.isLive === true,
        feedMode,
        setFeedMode,
        toggleLiveFeed,
        refreshAqi,
        useCurrentLocation,
        selectCustomCity,
        availableCities: POPULAR_CITIES,
        customLocation,
      }}
    >
      {children}
    </AirQualityContext.Provider>
  );
};

export const useAirQuality = (): AirQualityContextType => {
  const context = useContext(AirQualityContext);
  if (!context) {
    throw new Error('useAirQuality must be used within an AirQualityProvider');
  }
  return context;
};
