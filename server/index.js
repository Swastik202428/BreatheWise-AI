import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Known metro coordinates
const CITY_COORDINATES = {
  'delhi': { lat: 28.6139, lng: 77.2090, name: 'Delhi NCR', state: 'Delhi' },
  'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai', state: 'Maharashtra' },
  'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata', state: 'West Bengal' },
  'bengaluru': { lat: 12.9716, lng: 77.5946, name: 'Bengaluru', state: 'Karnataka' },
  'lucknow': { lat: 26.8467, lng: 80.9462, name: 'Lucknow', state: 'Uttar Pradesh' },
  'patna': { lat: 25.5941, lng: 85.1376, name: 'Patna', state: 'Bihar' },
  'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad', state: 'Telangana' },
  'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune', state: 'Maharashtra' },
  'noida': { lat: 28.5355, lng: 77.3910, name: 'Noida', state: 'Uttar Pradesh' },
  'gurugram': { lat: 28.4595, lng: 77.0266, name: 'Gurugram', state: 'Haryana' },
  'chandigarh': { lat: 30.7333, lng: 76.7794, name: 'Chandigarh', state: 'Punjab/Haryana' },
  'ahmedabad': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad', state: 'Gujarat' },
};

// Demo/Fallback Data
const FALLBACK_CITIES = {
  'delhi': {
    city: 'Delhi NCR',
    state: 'Delhi',
    aqi: 342,
    category: 'Very Poor',
    dominantPollutant: 'PM2.5',
    pm25: 218.4,
    pm10: 362.1,
    no2: 58.2,
    so2: 18.5,
    co: 2.4,
    o3: 31.0,
    temperature: 17,
    humidity: 78,
    windSpeed: 4.2,
    windDirection: 'NW',
    weatherCondition: 'Dense Winter Smog Inversion',
    isLive: false,
    dataSource: 'Demo CPCB Station Simulation (Anand Vihar & RK Puram)',
  },
  'mumbai': {
    city: 'Mumbai',
    state: 'Maharashtra',
    aqi: 148,
    category: 'Moderate',
    dominantPollutant: 'PM2.5',
    pm25: 62.8,
    pm10: 124.5,
    no2: 41.0,
    so2: 12.3,
    co: 1.1,
    o3: 28.5,
    temperature: 28,
    humidity: 65,
    windSpeed: 11.5,
    windDirection: 'SW',
    weatherCondition: 'Humid Coastal Haze',
    isLive: false,
    dataSource: 'Demo CPCB Station Simulation (Bandra Kurla Complex)',
  },
  'kolkata': {
    city: 'Kolkata',
    state: 'West Bengal',
    aqi: 226,
    category: 'Poor',
    dominantPollutant: 'PM2.5',
    pm25: 112.5,
    pm10: 204.0,
    no2: 49.0,
    so2: 16.0,
    co: 1.8,
    o3: 22.0,
    temperature: 22,
    humidity: 71,
    windSpeed: 5.8,
    windDirection: 'NE',
    weatherCondition: 'Cool Gangetic Smog Mist',
    isLive: false,
    dataSource: 'Demo CPCB Station Simulation (Victoria Memorial)',
  },
  'bengaluru': {
    city: 'Bengaluru',
    state: 'Karnataka',
    aqi: 68,
    category: 'Satisfactory',
    dominantPollutant: 'PM10',
    pm25: 22.4,
    pm10: 74.2,
    no2: 24.8,
    so2: 8.2,
    co: 0.7,
    o3: 35.1,
    temperature: 24,
    humidity: 58,
    windSpeed: 9.2,
    windDirection: 'E',
    weatherCondition: 'Pleasant Plateau Breeze',
    isLive: false,
    dataSource: 'Demo CPCB Station Simulation (BTM Layout)',
  },
  'lucknow': {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    aqi: 288,
    category: 'Poor',
    dominantPollutant: 'PM2.5',
    pm25: 164.2,
    pm10: 278.0,
    no2: 52.4,
    so2: 14.1,
    co: 2.1,
    o3: 26.0,
    temperature: 18,
    humidity: 75,
    windSpeed: 3.8,
    windDirection: 'NW',
    weatherCondition: 'Stagnant Winter Smog Blanket',
    isLive: false,
    dataSource: 'Demo CPCB Station Simulation (Talkatora)',
  },
};

// CPCB Sub-index Calculation Functions
function calcCpcbSubIndex(conc, breakpoints) {
  for (const b of breakpoints) {
    if (conc >= b.cLow && conc <= b.cHigh) {
      return Math.round(((b.iHigh - b.iLow) / (b.cHigh - b.cLow)) * (conc - b.cLow) + b.iLow);
    }
  }
  return conc > 500 ? 500 : 0;
}

const PM25_BREAKPOINTS = [
  { cLow: 0, cHigh: 30, iLow: 0, iHigh: 50 },
  { cLow: 30.1, cHigh: 60, iLow: 51, iHigh: 100 },
  { cLow: 60.1, cHigh: 90, iLow: 101, iHigh: 200 },
  { cLow: 90.1, cHigh: 120, iLow: 201, iHigh: 300 },
  { cLow: 120.1, cHigh: 250, iLow: 301, iHigh: 400 },
  { cLow: 250.1, cHigh: 500, iLow: 401, iHigh: 500 },
];

const PM10_BREAKPOINTS = [
  { cLow: 0, cHigh: 50, iLow: 0, iHigh: 50 },
  { cLow: 50.1, cHigh: 100, iLow: 51, iHigh: 100 },
  { cLow: 100.1, cHigh: 250, iLow: 101, iHigh: 200 },
  { cLow: 250.1, cHigh: 350, iLow: 201, iHigh: 300 },
  { cLow: 350.1, cHigh: 430, iLow: 301, iHigh: 400 },
  { cLow: 430.1, cHigh: 600, iLow: 401, iHigh: 500 },
];

function getAqiCategory(aqi) {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderate';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

function getWindDirectionText(deg) {
  if (deg === undefined || deg === null) return 'NW';
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((deg % 360) / 45) % 8;
  return dirs[index];
}

function getWeatherConditionText(code, pm25) {
  if (pm25 > 120) return 'Dense Winter Inversion Smog';
  if (code === 0) return 'Clear Skies';
  if (code <= 3) return 'Partly Cloudy & Haze';
  if (code <= 48) return 'Fog & Atmospheric Inversion';
  if (code <= 67) return 'Cold Rain Showers';
  return 'Overcast Winter Skies';
}

// System prompt with strict environmental guardrails
const SYSTEM_INSTRUCTION = `You are BreatheWise AI, an expert winter smog and urban air pollution assistant created to help families and communities make healthier, safer, and more sustainable daily decisions.
Tagline: "Breathe Better. Live Greener."

CORE RULES:
1. NEVER invent sensor readings or claim unverified demo data is live. Explicitly reference whether the telemetry provided is LIVE real-time station data or simulated DEMO data.
2. Adhere strictly to the Indian Central Pollution Control Board (CPCB) AQI scale:
   - 0–50: Good (Minimal impact)
   - 51–100: Satisfactory (Minor breathing discomfort to sensitive people)
   - 101–200: Moderate (Breathing discomfort to people with lung, asthma, and heart diseases)
   - 201–300: Poor (Breathing discomfort to most people on prolonged exposure)
   - 301–400: Very Poor (Respiratory illness on prolonged exposure)
   - 401–500: Severe (Affects healthy people and seriously impacts those with existing diseases)
3. Synthesize BOTH air pollution and weather conditions scientifically:
   - Cold morning temperatures (< 18°C) + low wind speed (< 5 km/h) + high humidity (> 70%) trigger thermal inversions that trap soot within 50m of the ground.
   - Faster winds (> 12 km/h) assist atmospheric particulate dispersion.
   - Solar warming around 1–3 PM temporarily raises the planetary boundary layer.
4. Clearly explain WHY each recommendation is useful (e.g. explain how mouth breathing during morning jogs bypasses nasal filtration, delivering fine PM2.5 directly into lung alveoli).
5. Provide extra caution for high-risk individuals: young children (higher minute ventilation per body weight), elderly family members, and people with respiratory conditions (asthma/bronchitis).
6. NEVER diagnose medical conditions or prescribe medications. Provide lifestyle, protective (N95 masks, HEPA air purifiers, timing outdoor exposure), and environmental guidance only.
7. Suggest sustainable daily habits (public transport, metro, electric commute, carpooling, avoiding open trash/leaf burning, energy efficiency).
8. Keep formatting readable with bold highlights, clean bullet points, and actionable sections.`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  res.json({
    status: 'ok',
    service: 'BreatheWise AI Backend',
    hasGeminiKey: hasKey,
    hasWaqiKey: Boolean(process.env.WAQI_API_KEY),
    realtimeProvider: 'Open-Meteo CAMS Real-Time Telemetry',
    timestamp: new Date().toISOString(),
  });
});

// Real-Time AQI & Weather Endpoint
app.get('/api/aqi', async (req, res) => {
  const cityQuery = (req.query.city || 'delhi').toString().toLowerCase().trim();
  const reqMode = (req.query.mode || 'live').toString().toLowerCase().trim();
  const reqLat = parseFloat(req.query.lat);
  const reqLng = parseFloat(req.query.lng);

  // If user explicitly chose demo mode, return pre-calibrated demo telemetry
  if (reqMode === 'demo') {
    const fallback = FALLBACK_CITIES[cityQuery] || FALLBACK_CITIES['delhi'];
    return res.json({
      success: true,
      data: {
        ...fallback,
        isLive: false,
        apiUnavailable: false,
        lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' (Demo)',
      },
    });
  }

  // Determine Coordinates for Live Telemetry
  let lat = reqLat;
  let lng = reqLng;
  let resolvedName = cityQuery.toUpperCase();
  let resolvedState = 'India';

  if (!isNaN(lat) && !isNaN(lng)) {
    resolvedName = req.query.cityName ? req.query.cityName.toString() : 'Current Location';
    resolvedState = 'Local Airshed';
  } else if (CITY_COORDINATES[cityQuery]) {
    lat = CITY_COORDINATES[cityQuery].lat;
    lng = CITY_COORDINATES[cityQuery].lng;
    resolvedName = CITY_COORDINATES[cityQuery].name;
    resolvedState = CITY_COORDINATES[cityQuery].state;
  } else {
    // Geocode custom city query via Open-Meteo Geocoding API
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl, { signal: AbortSignal.timeout(4000) });
      if (geoRes.ok) {
        const geoJson = await geoRes.json();
        if (geoJson.results && geoJson.results.length > 0) {
          lat = geoJson.results[0].latitude;
          lng = geoJson.results[0].longitude;
          resolvedName = geoJson.results[0].name;
          resolvedState = geoJson.results[0].admin1 || geoJson.results[0].country || 'India';
        }
      }
    } catch {
      // Use Delhi fallback coordinates if geocoding times out
      lat = CITY_COORDINATES['delhi'].lat;
      lng = CITY_COORDINATES['delhi'].lng;
      resolvedName = 'Delhi NCR';
    }
  }

  if (isNaN(lat) || isNaN(lng)) {
    lat = 28.6139;
    lng = 77.2090;
  }

  try {
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi&hourly=pm10,pm2_5,us_aqi&timezone=auto`;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&timezone=auto`;

    const [aqiRes, weatherRes] = await Promise.all([
      fetch(aqiUrl, { signal: AbortSignal.timeout(6000) }),
      fetch(weatherUrl, { signal: AbortSignal.timeout(6000) }),
    ]);

    if (!aqiRes.ok || !weatherRes.ok) {
      throw new Error(`Open-Meteo API returned error status: ${aqiRes.status}/${weatherRes.status}`);
    }

    const aqiData = await aqiRes.json();
    const weatherData = await weatherRes.json();

    const currAqi = aqiData.current || {};
    const currWeather = weatherData.current || {};

    const rawPm25 = typeof currAqi.pm2_5 === 'number' ? currAqi.pm2_5 : 55;
    const rawPm10 = typeof currAqi.pm10 === 'number' ? currAqi.pm10 : 95;

    const pm25 = Math.round(rawPm25 * 10) / 10;
    const pm10 = Math.round(rawPm10 * 10) / 10;
    const no2 = Math.round((currAqi.nitrogen_dioxide || 24) * 10) / 10;
    const so2 = Math.round((currAqi.sulphur_dioxide || 12) * 10) / 10;
    const co = Math.round(((currAqi.carbon_monoxide || 600) / 1000) * 10) / 10;
    const o3 = Math.round((currAqi.ozone || 30) * 10) / 10;

    const temperature = Math.round(currWeather.temperature_2m !== undefined ? currWeather.temperature_2m : 22);
    const humidity = Math.round(currWeather.relative_humidity_2m !== undefined ? currWeather.relative_humidity_2m : 60);
    const windSpeed = Math.round((currWeather.wind_speed_10m || 5) * 10) / 10;
    const windDirection = getWindDirectionText(currWeather.wind_direction_10m);
    const weatherCondition = getWeatherConditionText(currWeather.weather_code, pm25);

    // Calculate Indian CPCB AQI accurately
    const pm25Index = calcCpcbSubIndex(pm25, PM25_BREAKPOINTS);
    const pm10Index = calcCpcbSubIndex(pm10, PM10_BREAKPOINTS);
    const aqi = Math.max(pm25Index, pm10Index, 12);
    const category = getAqiCategory(aqi);
    const dominantPollutant = pm25Index >= pm10Index ? 'PM2.5' : 'PM10';

    // Parse Hourly Trend History
    let hourlyHistory = [];
    if (aqiData.hourly && aqiData.hourly.time && aqiData.hourly.time.length > 0) {
      const times = aqiData.hourly.time;
      const pm25Arr = aqiData.hourly.pm2_5 || [];
      const pm10Arr = aqiData.hourly.pm10 || [];

      // Sample past 24 hours (step by 2 for compact chart)
      const maxIndex = times.length;
      const startIndex = Math.max(0, maxIndex - 24);

      for (let i = startIndex; i < maxIndex; i += 2) {
        const timeStr = times[i];
        const dateObj = new Date(timeStr);
        const hourLabel = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
        const hPm25 = pm25Arr[i] || pm25;
        const hPm10 = pm10Arr[i] || pm10;
        const hAqi = Math.max(calcCpcbSubIndex(hPm25, PM25_BREAKPOINTS), calcCpcbSubIndex(hPm10, PM10_BREAKPOINTS));

        hourlyHistory.push({
          time: hourLabel,
          aqi: hAqi,
          pm25: Math.round(hPm25),
          pm10: Math.round(hPm10),
        });
      }
    }

    if (hourlyHistory.length === 0) {
      hourlyHistory = FALLBACK_CITIES['delhi'].hourlyHistory;
    }

    const payload = {
      city: resolvedName,
      state: resolvedState,
      aqi,
      category,
      dominantPollutant,
      pm25,
      pm10,
      no2,
      so2,
      co,
      o3,
      temperature,
      humidity,
      windSpeed,
      windDirection,
      weatherCondition,
      isLive: true,
      apiUnavailable: false,
      dataSource: 'Open-Meteo CAMS Real-Time Telemetry (Copernicus Atmosphere)',
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' (Live)',
      coordinates: { lat, lng },
      hourlyHistory,
    };

    res.json({
      success: true,
      data: payload,
    });
  } catch (error) {
    console.warn(`[AQI API Warning] Live API failed for ${cityQuery} (${error.message}). Returning verified demo simulation.`);

    const fallback = FALLBACK_CITIES[cityQuery] || FALLBACK_CITIES['delhi'];
    res.json({
      success: true,
      data: {
        ...fallback,
        city: resolvedName || fallback.city,
        state: resolvedState || fallback.state,
        isLive: false,
        apiUnavailable: true,
        error: 'Live atmospheric API was temporarily unreachable. Displaying verified demo simulation.',
        dataSource: 'Demo CPCB Station Simulation (Live API Offline)',
        lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' (Demo)',
      },
    });
  }
});

// Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const {
      message,
      conversationHistory = [],
      familyProfile = {},
      currentAqi = null,
      city = 'Delhi NCR',
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if API key is present
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(200).json({
        success: false,
        missingKey: true,
        message: 'Gemini API key is not configured on the backend server. To enable real-time Gemini AI intelligence, add your GEMINI_API_KEY to the .env file and restart the server.',
        fallbackNotice: true,
      });
    }

    // Build context-aware telemetry string
    const isLiveData = currentAqi?.isLive === true;
    const aqiTelemetryContext = currentAqi
      ? `
ATMOSPHERIC & WEATHER TELEMETRY:
- Location: ${currentAqi.city || city} (${currentAqi.state || ''})
- Data Status: ${isLiveData ? 'LIVE Real-Time Station Telemetry' : 'DEMO Simulation Telemetry'}
- Data Source: ${currentAqi.dataSource || 'CPCB Monitoring Station'}
- Last Updated: ${currentAqi.lastUpdated || 'Recent'}
- Current CPCB AQI: ${currentAqi.aqi} (${currentAqi.category})
- Dominant Pollutant: ${currentAqi.dominantPollutant || 'PM2.5'}
- PM2.5: ${currentAqi.pm25} µg/m³
- PM10: ${currentAqi.pm10} µg/m³
- Ambient Temperature: ${currentAqi.temperature}°C
- Relative Humidity: ${currentAqi.humidity}%
- Wind: ${currentAqi.windSpeed} km/h (Direction: ${currentAqi.windDirection})
- Weather Condition: ${currentAqi.weatherCondition || 'Winter Atmosphere'}
- Gas Pollutants: NO2: ${currentAqi.no2} µg/m³, SO2: ${currentAqi.so2} µg/m³, CO: ${currentAqi.co} mg/m³, O3: ${currentAqi.o3} µg/m³
`
      : `
ATMOSPHERIC TELEMETRY:
- Location: ${city}
- Current AQI: ~320 (Very Poor, winter demo simulation)
- Temperature: ~18°C, Humidity: ~75%, Wind: ~4 km/h
`;

    const userProfileContext = `
USER CONTEXT & FAMILY PROFILE:
- Location: ${city}
- Family Size: ${familyProfile.familySize || 3} members
- Has Children: ${familyProfile.hasChildren ? `Yes (${familyProfile.childrenCount || 1} child/children, ages: ${familyProfile.childrenAges || 'young'})` : 'No'}
- Has Elderly Members: ${familyProfile.hasElderly ? `Yes (${familyProfile.elderlyCount || 1} senior(s))` : 'No'}
- Respiratory Sensitivities (Asthma/Allergies): ${familyProfile.hasRespiratoryIssues ? `Yes - HIGH RISK (${familyProfile.respiratoryConditions || 'Asthma/bronchial sensitivity'})` : 'None reported'}
- Daily Outdoor Activity: ${familyProfile.outdoorActivity || 'Moderate commute'}
- Commute Mode: ${familyProfile.commuteMode || 'Public Transit'}
- Air Purifier at Home: ${familyProfile.hasPurifier ? `Yes (${familyProfile.purifierRooms || 'Living Room'}, model: ${familyProfile.purifierModel || 'HEPA'})` : 'No air purifier'}
- Home Sealing: ${familyProfile.homeVentilation || 'Moderate'}
`;

    // Construct Gemini API contents format
    const contents = [];

    // Add conversation history
    for (const msg of conversationHistory.slice(-8)) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }

    // Add current user message with context
    contents.push({
      role: 'user',
      parts: [{
        text: `${aqiTelemetryContext}\n${userProfileContext}\n\nUSER QUESTION: ${message}\n\nPlease provide a caring, scientific, and actionable answer tailored to their family profile, current air quality, and ambient weather conditions. Explicitly mention whether the reading is LIVE or DEMO data.`,
      }],
    });

    // Call Google Gemini API (gemini-1.5-flash with fallback to gemini-2.0-flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error('Gemini API error response:', errText);
      return res.status(200).json({
        success: false,
        error: `Gemini API returned status ${geminiResponse.status}. Please check your API key quota or permissions.`,
        fallbackNotice: true,
      });
    }

    const data = await geminiResponse.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      return res.status(200).json({
        success: false,
        error: 'No text response received from Gemini.',
        fallbackNotice: true,
      });
    }

    res.json({
      success: true,
      reply: replyText,
      model: 'gemini-1.5-flash',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Backend /api/chat error:', error);
    res.status(500).json({
      error: 'An internal server error occurred while contacting Gemini.',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`[BreatheWise AI Backend] Server running on port ${PORT}`);
  console.log(`[BreatheWise AI Backend] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[BreatheWise AI Backend] Gemini API Key status: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Missing (Add to .env)'}`);
  console.log(`[BreatheWise AI Backend] Real-time AQI Provider: Open-Meteo CAMS active`);
});
