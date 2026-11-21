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
};

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

export default async function handler(req, res) {
  const cityQuery = (req.query.city || 'delhi').toString().toLowerCase().trim();
  const reqMode = (req.query.mode || 'live').toString().toLowerCase().trim();
  const reqLat = parseFloat(req.query.lat);
  const reqLng = parseFloat(req.query.lng);

  if (reqMode === 'demo') {
    const fallback = FALLBACK_CITIES[cityQuery] || FALLBACK_CITIES['delhi'];
    return res.status(200).json({
      success: true,
      data: {
        ...fallback,
        isLive: false,
        apiUnavailable: false,
        lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' (Demo)',
      },
    });
  }

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
    lat = 28.6139;
    lng = 77.2090;
    resolvedName = 'Delhi NCR';
  }

  try {
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi&hourly=pm10,pm2_5,us_aqi&timezone=auto`;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&timezone=auto`;

    const [aqiRes, weatherRes] = await Promise.all([
      fetch(aqiUrl, { signal: AbortSignal.timeout(6000) }),
      fetch(weatherUrl, { signal: AbortSignal.timeout(6000) }),
    ]);

    if (!aqiRes.ok || !weatherRes.ok) throw new Error('API non-ok response');

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

    const pm25Index = calcCpcbSubIndex(pm25, PM25_BREAKPOINTS);
    const pm10Index = calcCpcbSubIndex(pm10, PM10_BREAKPOINTS);
    const aqi = Math.max(pm25Index, pm10Index, 12);
    const category = getAqiCategory(aqi);
    const dominantPollutant = pm25Index >= pm10Index ? 'PM2.5' : 'PM10';

    res.status(200).json({
      success: true,
      data: {
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
        weatherCondition: pm25 > 120 ? 'Dense Winter Smog Inversion' : 'Winter Skies',
        isLive: true,
        apiUnavailable: false,
        dataSource: 'Open-Meteo CAMS Real-Time Telemetry',
        lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' (Live)',
        coordinates: { lat, lng },
        hourlyHistory: FALLBACK_CITIES['delhi'].hourlyHistory,
      },
    });
  } catch {
    const fallback = FALLBACK_CITIES[cityQuery] || FALLBACK_CITIES['delhi'];
    res.status(200).json({
      success: true,
      data: {
        ...fallback,
        isLive: false,
        apiUnavailable: true,
        error: 'Live atmospheric API was temporarily unreachable. Displaying certified demo simulation.',
        dataSource: 'Demo CPCB Station Simulation (Live API Offline)',
        lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' (Demo)',
      },
    });
  }
}
