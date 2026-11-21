import { FamilyProfile } from '../types/profile';
import { AqiData } from '../types/aqi';

export function getEnvironmentalAiResponse(
  prompt: string,
  profile: FamilyProfile,
  aqiData: AqiData | null
): string {
  const query = prompt.toLowerCase();
  const currentAqi = aqiData ? aqiData.aqi : 340;
  const city = aqiData?.city || profile.city || 'your city';
  const category = aqiData ? aqiData.category : 'Very Poor';
  const isLive = aqiData?.isLive === true;
  const temp = aqiData ? aqiData.temperature : 18;
  const humidity = aqiData ? aqiData.humidity : 75;
  const wind = aqiData ? aqiData.windSpeed : 4.2;
  const windDir = aqiData ? aqiData.windDirection : 'NW';
  const weatherCond = aqiData?.weatherCondition || 'Winter Smog Haze';

  const telemetryNotice = `*Atmospheric Telemetry Status:* **${isLive ? 'LIVE Measured Data' : 'DEMO Simulation Data'}** (${city} • AQI **${currentAqi}** [${category}] • Temp: **${temp}°C** • Humidity: **${humidity}%** • Wind: **${wind} km/h ${windDir}** • ${weatherCond}).`;

  // High risk flag check
  const hasVulnerableFamily = profile.hasChildren || profile.hasElderly || profile.hasRespiratoryIssues;

  // 1. Jogging / Outdoor Workout questions
  if (query.includes('jog') || query.includes('walk') || query.includes('run') || query.includes('exercise') || query.includes('outdoor')) {
    if (currentAqi > 200) {
      return `### ⚠️ Outdoor Exercise & Smog Advisory for ${city} (AQI: ${currentAqi} — ${category})

${telemetryNotice}

**Recommendation:** **Strictly avoid outdoor jogging, running, or heavy cardio workouts today.**

**Why this matters scientifically (Weather & Pollution Interaction):**
- **Thermal Inversion Impact:** The current cold ambient temperature (**${temp}°C**) combined with low wind velocity (**${wind} km/h**) and high humidity (**${humidity}%**) creates a classic winter ground inversion trap. Particulate soot cannot rise and stays concentrated in the lowest 50 meters of the atmosphere.
- **Cardiovascular & Alveolar Damage:** During running, breathing volume surges by **up to 10x**, and inhalation naturally shifts to mouth breathing. This bypasses nasal cilia, delivering toxic **PM2.5 micro-particles** deep into alveoli and capillary blood vessels, triggering acute pulmonary and vascular inflammation.

${hasVulnerableFamily ? `**Family High-Risk Caution:**
Because your household includes ${profile.hasChildren ? 'children' : ''}${profile.hasChildren && profile.hasElderly ? ' and ' : ''}${profile.hasElderly ? 'elderly family members' : ''}${profile.hasRespiratoryIssues ? ' with respiratory sensitivities' : ''}, keep them strictly indoors in a HEPA-filtered room during early morning hours.` : ''}

**Safer Alternatives:**
- **Indoor Low-Impact Aerobics / Yoga:** Practice in an enclosed room with an active True HEPA air purifier running on medium speed.
- **Safest Window:** If outdoor errands are unavoidable, wait until **1:00 PM – 3:30 PM**, when solar warmth temporarily raises the planetary boundary layer and helps disperse dense ground smoke. Always wear a snug **N95 respirator**.`;
    } else {
      return `### 🏃 Outdoor Activity Guidance for ${city} (AQI: ${currentAqi} — ${category})

${telemetryNotice}

**Recommendation:** Moderate outdoor physical activities are permissible, with sensible timing adjustments.

**Key Precautions:**
- Schedule running or brisk walking between **11:00 AM and 4:00 PM** when solar warming and wind speed (${wind} km/h) assist atmospheric dispersion.
- Avoid routes directly adjacent to high-traffic arterial roads where localized NO2 and diesel soot spikes occur.
- Stay well hydrated (warm water or tulsi tea) to protect mucous membranes from drying out in cold air.`;
    }
  }

  // 2. Air Purifier questions
  if (query.includes('purifier') || query.includes('hepa') || query.includes('filter') || query.includes('clean air')) {
    return `### 🛡️ Optimal Air Purifier Strategy for Winter Smog (${city})

${telemetryNotice}

**Recommended Settings & Operating Protocols:**
1. **Continuous Operation on Auto / Medium:** Air purifiers work cumulatively. Running a purifier for only 30 minutes is ineffective because room air infiltrates continuously. During winter smog, run units on low/night mode during sleep and auto/medium during the day.
2. **True HEPA (H13) vs Carbon:**
   - **True HEPA H13:** Captures 99.97% of physical PM2.5 and PM0.1 particles.
   - **Activated Carbon Layer:** Essential for neutralizing winter ozone, sulfur dioxide, and toxic vehicle exhaust fumes (benzene, toluene).
3. **Strategic Placement:** Position the unit at least **30–50 cm away from walls and heavy furniture** to allow 360° air intake. Avoid placing it directly next to open doors or drafty windows.
4. **Maintenance Schedule:**
   - **Pre-filter mesh:** Vacuum or rinse every 7–10 days in winter. A choked pre-filter forces the fan to work harder, wasting electricity and dropping Clean Air Delivery Rate (CADR) by up to 30%.
   - **HEPA filter:** Inspect after 3 months of severe winter use.

${profile.hasPurifier ? `*Note for your home:* You have purifiers in **${profile.purifierRooms || 'your rooms'}**. Keep interior bedroom doors shut to allow the purifier to maintain a clean-air microclimate (< 30 AQI).` : `*Recommendation for your home:* Since you do not currently have an air purifier, consider investing in an H13 True HEPA unit for the bedroom where your family spends 7–8 hours sleeping.`}`;
  }

  // 3. Child or elderly protection questions
  if (query.includes('child') || query.includes('kid') || query.includes('baby') || query.includes('elderly') || query.includes('asthma') || query.includes('bronchitis') || query.includes('health')) {
    return `### 👶 Vulnerable Family Protection Protocol (${city})

${telemetryNotice}

**Why children and seniors are disproportionately impacted:**
- **Children:** Breathe 50% more air per pound of body weight than adults, and their lung tissue is still actively developing alveoli until ages 6–8.
- **Elderly & Sensitive Individuals:** Reduced pulmonary elasticity and preexisting cardiovascular strain amplify the risk of smog-induced wheezing, COPD flare-ups, and elevated blood pressure.

**Immediate Protective Steps:**
1. **N95 Masks with Child-Fitting:** Standard surgical or cloth masks leave large gaps along the cheeks and chin. Use small-sized, certified N95 or KN95 respirators with adjustable nose clips for outdoor school commutes.
2. **Damp-Mopping Only:** Never sweep floors with dry brooms in the morning. Dry sweeping resuspends toxic heavy metal soot and micro-dust into your child's breathing zone (3 feet from the floor). Use damp microfiber cloths.
3. **Warm Steam & Hydration:** Encourage frequent sips of lukewarm water to lubricate dry throat tissues. A warm steam inhalation before bed helps clear trapped mucus.
4. **Physician Guidance:** *Please consult your family pediatrician or pulmonologist for any specific medical prescriptions, preventer inhaler dosages, or symptoms of breathing distress.*`;
  }

  // 4. Commute, Carpooling, and Sustainable Habits
  if (query.includes('commute') || query.includes('carpool') || query.includes('metro') || query.includes('transport') || query.includes('habit') || query.includes('carbon') || query.includes('co2')) {
    return `### 🌿 Sustainable Commute & Clean Habit Action Plan (${city})

${telemetryNotice}

**High-Impact Daily Swaps:**
1. **Adopt Metro or Rapid Transit:** Choosing electric metro rail over a solo petrol car eliminates approximately **2.4 kg of CO2 equivalent per 15 km trip**, while completely eliminating tailpipe NO2 and particulate emissions along crowded streets.
2. **Organize a 3-Person Neighborhood Carpool:** If transit is inaccessible, sharing a ride with two colleagues cuts individual commute emissions by **66%** and reduces the localized idle-traffic gridlocks that poison school zones and residential rings.
3. **Recirculate Car AC Air:** When driving, set your vehicle ventilation to **Internal Air Recirculation** mode. Drawing outside air while stuck behind trucks and buses pulls unfiltered diesel exhaust directly into your cabin.
4. **Energy Conservation at Home:** Lower space heater thermostat settings by 2°C and switch off idle electronics. Peak winter electricity draws often trigger backup diesel generator sets in apartment complexes, releasing thick black carbon soot.`;
  }

  // 5. Indoor Air Quality & Ventilation
  if (query.includes('window') || query.includes('ventilation') || query.includes('indoor') || query.includes('cook') || query.includes('smoke')) {
    return `### 🪟 Smart Indoor Ventilation & Smog Defense (${city})

${telemetryNotice}

**When to open windows during winter smog:**
- **Never open between 6:00 AM and 10:30 AM:** Morning temperature inversion acts like a ceiling, keeping cold, dense particulate matter trapped close to the ground.
- **Safest Window for Cross-Ventilation:** Crack opposite windows slightly for **15–20 minutes between 1:00 PM and 3:00 PM**, when solar warmth disperses ground fog. Then reseal and run the purifier on high for 15 minutes.

**Indoor Pollution Traps to Avoid:**
- **Zero Incense & Mosquito Coils:** Burning a single mosquito coil produces the particulate equivalent of roughly 75–100 cigarettes. Opt for plug-in vaporizers or bed nets.
- **Kitchen Suction:** Always turn on your kitchen chimney or exhaust fan *before* striking the stove flame. Unvented LPG combustion generates nitrogen dioxide (NO2) and carbon monoxide (CO).`;
  }

  // Default comprehensive response
  return `### 🍃 BreatheWise AI Environmental Advisory for ${city}

${telemetryNotice}

Thank you for your question. Here is an actionable, pollution-aware guide tailored to your family profile:

**Current Environmental Summary:**
- **Location:** ${city} | **Telemetry:** AQI ${currentAqi} (${category})
- **Atmospheric Conditions:** ${temp}°C, ${humidity}% humidity, wind ${wind} km/h ${windDir} (${weatherCond})
- **Household Context:** ${profile.familySize} family members (${profile.hasChildren ? 'includes children' : 'no kids'}, ${profile.hasElderly ? 'includes seniors' : 'no seniors'})

**Top 3 Actionable Recommendations:**
1. **Protect Your Lungs Outdoors:** For any outdoor errands, equip a certified **N95 respirator**. Cloth masks do not stop fine PM2.5 soot.
2. **Optimize Indoor Protection:** Keep windows sealed during early morning and late evening smog peaks. Run your air purifier in the bedroom where your family sleeps.
3. **Choose Sustainable Mobility:** Avoid solo car trips; choose **Metro or Carpooling** to reduce local vehicular congestion and cut personal emissions by ~2.5 kg CO2/day.

*Do you have specific questions about air purifier CADR selection, morning jog safety, or room-by-room air quality checklists? Just ask!*`;
}
