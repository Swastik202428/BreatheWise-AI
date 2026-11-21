import { FamilyProfile } from '../types/profile';
import { AqiData } from '../types/aqi';
import { ChatMessage } from '../types/chat';
import { MOCK_AQI_DATA } from '../data/cities';
import { getEnvironmentalAiResponse } from './geminiFallback';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface HealthCheckResult {
  status: string;
  hasGeminiKey: boolean;
  service?: string;
  realtimeProvider?: string;
}

export async function checkBackendHealth(): Promise<HealthCheckResult> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Health check non-ok');
    const data = await res.json();
    return {
      status: data.status || 'ok',
      hasGeminiKey: Boolean(data.hasGeminiKey),
      service: data.service,
      realtimeProvider: data.realtimeProvider,
    };
  } catch {
    return {
      status: 'offline',
      hasGeminiKey: false,
    };
  }
}

export interface FetchAqiOptions {
  lat?: number;
  lng?: number;
  cityName?: string;
  mode?: 'live' | 'demo';
}

export async function fetchCityAqi(cityKey: string, options?: FetchAqiOptions): Promise<AqiData> {
  const normalizedKey = cityKey.toLowerCase().trim();
  const queryParams = new URLSearchParams();
  queryParams.set('city', normalizedKey);

  if (options?.mode) {
    queryParams.set('mode', options.mode);
  }
  if (options?.lat !== undefined && options?.lng !== undefined) {
    queryParams.set('lat', options.lat.toString());
    queryParams.set('lng', options.lng.toString());
  }
  if (options?.cityName) {
    queryParams.set('cityName', options.cityName);
  }

  try {
    const res = await fetch(`${API_BASE}/aqi?${queryParams.toString()}`, {
      signal: AbortSignal.timeout(6000),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          ...json.data,
          hourlyHistory: json.data.hourlyHistory || MOCK_AQI_DATA[normalizedKey]?.hourlyHistory || MOCK_AQI_DATA['delhi'].hourlyHistory,
        };
      }
    }
  } catch (err) {
    console.warn('API call failed; using fallback demo dataset:', err);
  }

  const fallback = MOCK_AQI_DATA[normalizedKey] || MOCK_AQI_DATA['delhi'];
  return {
    ...fallback,
    isLive: false,
    apiUnavailable: true,
    error: 'Live atmospheric API was temporarily unreachable. Displaying certified demo simulation.',
    dataSource: 'Demo CPCB Station Simulation (Fallback Mode)',
    lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' (Demo)',
  };
}

export async function searchCityLocation(query: string): Promise<Array<{ name: string; state: string; lat: number; lng: number }>> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results.map((r: any) => ({
          name: r.name,
          state: r.admin1 || r.country || 'Region',
          lat: r.latitude,
          lng: r.longitude,
        }));
      }
    }
  } catch (err) {
    console.warn('Geocoding search failed:', err);
  }
  return [];
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  profile: FamilyProfile,
  aqiData: AqiData | null
): Promise<{ text: string; isFallback: boolean; missingKeyNotice?: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversationHistory: history.map((m) => ({ role: m.role, content: m.content })),
        familyProfile: profile,
        currentAqi: aqiData,
        city: aqiData?.city || profile.city || 'Delhi NCR',
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.reply) {
        return {
          text: data.reply,
          isFallback: false,
        };
      }

      if (data.missingKey) {
        const fallbackText = getEnvironmentalAiResponse(message, profile, aqiData);
        return {
          text: `${fallbackText}\n\n> ℹ️ **Notice:** The backend server is currently operating in *Local Intelligent Mode* because \`GEMINI_API_KEY\` is not yet configured in your \`.env\` file. To enable real-time Gemini LLM answers, add your key to \`.env\` and restart the server.`,
          isFallback: true,
          missingKeyNotice: true,
        };
      }
    }
  } catch {
    // Network or server offline; use local intelligent environmental engine
  }

  const fallbackText = getEnvironmentalAiResponse(message, profile, aqiData);
  return {
    text: fallbackText,
    isFallback: true,
  };
}
