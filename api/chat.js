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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [], familyProfile = {}, currentAqi = null, city = 'Delhi NCR' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(200).json({
        success: false,
        missingKey: true,
        message: 'Gemini API key is not configured on the backend server. To enable real-time Gemini AI intelligence, add your GEMINI_API_KEY to your Vercel project environment variables.',
        fallbackNotice: true,
      });
    }

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
- Air Purifier at Home: ${familyProfile.hasPurifier ? `Yes (${familyProfile.purifierRooms || 'Living Room'})` : 'No air purifier'}
- Home Sealing: ${familyProfile.homeVentilation || 'Moderate'}
`;

    const contents = [];
    for (const msg of conversationHistory.slice(-8)) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }

    contents.push({
      role: 'user',
      parts: [{
        text: `${aqiTelemetryContext}\n${userProfileContext}\n\nUSER QUESTION: ${message}\n\nPlease provide a caring, scientific, and actionable answer tailored to their family profile, current air quality, and ambient weather conditions. Explicitly mention whether the reading is LIVE or DEMO data.`,
      }],
    });

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
      console.error('Gemini API error:', errText);
      return res.status(200).json({
        success: false,
        error: `Gemini API returned status ${geminiResponse.status}.`,
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

    res.status(200).json({
      success: true,
      reply: replyText,
      model: 'gemini-1.5-flash',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Vercel API error:', error);
    res.status(500).json({
      error: 'An internal server error occurred while contacting Gemini.',
      details: error.message,
    });
  }
}
