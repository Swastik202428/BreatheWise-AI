# BreatheWise AI 🍃 — Phase 2 Upgraded

> **Breathe Better. Live Greener.**  
> An AI-powered winter smog and urban air pollution assistant that helps families and communities make healthier, safer, and more sustainable daily decisions.

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Real-Time AQI](https://img.shields.io/badge/Real--Time%20AQI-Open--Meteo%20CAMS-059669)](https://open-meteo.com/)

---

## 🌟 What's New in Phase 2

1. **🛰️ Real-Time Multi-Pollutant Integration:** Live ambient telemetry powered by Open-Meteo & European Copernicus Atmosphere Monitoring Service (CAMS) measuring **PM2.5, PM10, NO2, SO2, CO, and O3**.
2. **🌡️ Complete Weather Synchronization:** Real-time **temperature, relative humidity, wind speed, wind direction**, and winter atmospheric condition reporting.
3. **📍 Advanced Location Selection & Geolocation:**
   - Dropdown of top smog-impacted metros.
   - **"Use GPS" button:** Detects user coordinates in real-time (`navigator.geolocation`) and queries local station telemetry.
   - **Global City Search:** Search any city or district worldwide with instant geocoding.
4. **🏷️ Certified Live vs. Demo Distinctions:**
   - Visual toggle badge: `● LIVE SENSOR TELEMETRY` vs. `DEMO SIMULATION READING`.
   - Never claims simulated data is live; displays explicit data sources and timestamps.
5. **🛡️ Resilient Error & Offline States:**
   - Loading skeletons and spinners.
   - Informative API-unavailable banners with one-click **"Retry Live Feed"**.
6. **🤖 Weather & Pollution-Aware Gemini AI:**
   - Assistant synthesizes weather dynamics (cold temperatures + calm winds + high humidity = severe ground inversion) with family sensitivities (children, elderly, asthma).
   - Strict server-side security: API keys are loaded solely in backend `.env`.

---

## 🚀 Key Pages & Features

### 1. 📊 Interactive Dashboard (`/`)
- **Current AQI & Live Gauge:** Dynamic semi-circular speedometer following the Indian CPCB scale (0–500).
- **Multi-Pollutant Telemetry:** Live and simulated metrics for **PM2.5, PM10, NO2, CO, SO2, O3, Temperature, Humidity, and Wind Speed**.
- **Diurnal Pollution Chart:** 24-hour hourly trend visualizer built with Recharts, highlighting diurnal morning and evening thermal inversion spikes.
- **Location Selector:** Instant switching across top smog-impacted metros: *Delhi NCR, Mumbai, Kolkata, Bengaluru, Lucknow, Patna, Hyderabad, Pune, Noida, Gurugram, Chandigarh, and Ahmedabad*.
- **Demo vs. Live Toggle:** Clearly distinguishes simulated station telemetry from live feeds.

### 2. 🤖 AI Environmental Assistant (`/assistant`)
- **Google Gemini API Integration:** Connected via a secure Node.js + Express backend (`/api/chat`). **API keys are NEVER exposed to the frontend.**
- **Scientific Guardrails & Family Context:** Enforces CPCB standards, explains *why* recommendations matter (e.g. respiratory alveolar penetration of PM2.5), avoids diagnosing medical conditions, and provides heightened caution for children and seniors.
- **Personalized Context Injection:** Automatically informs Gemini of your city, family composition, presence of asthma or allergies, and home air purifier availability.
- **Local Fallback Engine:** Features an intelligent built-in rule-based environmental knowledge engine so the app remains fully responsive and functional even if an API key is not yet configured.

### 3. 🗓️ Daily Routine (`/routine`)
- **Diurnal Phased Schedules:** Morning, afternoon, and evening smog science explanations and safe exercise windows.
- **Clean Commute & Carpooling Guidance:** 3-person office carpool and electric metro transit calculations.
- **Energy-Saving Habits:** Preventing evening peak load brownouts that trigger black-carbon diesel generators in residential sectors.
- **Interactive Daily Checklist:** Check off daily green habits and automatically log saved CO2 in your Impact Tracker.

### 4. 🏡 Indoor Air Quality (`/indoor`)
- **HEPA Air Purifier Operational Protocol:** True HEPA (H13) vs. HEPA-type filters, CADR sizing formulas, and activated carbon requirements.
- **Smart Window Airing Schedules:** Safe timing (1–3 PM) vs. nocturnal thermal smog trap warnings.
- **Room-Wise Checklists:** Dedicated tabs for **Master Bedroom, Kids & Elderly Room, Kitchen, and Living Room**.
- **Source Pollution Prevention:** Guidance on eliminating incense sticks, damp-mopping without dry brooms, and kitchen suction exhaust timing.

### 5. 👣 Impact Tracker (`/impact`)
- **Personal Carbon & Energy Accounting:** Estimated CO2 emissions avoided (kg CO2e) and energy saved (kWh).
- **Interactive Action Logger:** Log custom green actions (Metro trips, window sealing, heater dial-down, indoor plants).
- **Weekly & Monthly Recharts Visualizations:** Beautiful bar and area charts displaying household sustainability progress.
- **Prominent Estimate Disclaimers:** Transparently labels metrics as behavioral guidance estimates based on regional conversion standards.

### 6. 👨‍👩‍👧‍👦 Family Profile (`/profile`)
- **Household Configuration:** City, neighborhood, family size.
- **High-Risk Flags:** Children ages, elderly members, and respiratory conditions (asthma, bronchitis, seasonal allergies).
- **Activity & Commute:** Daily outdoor activity type and primary commuting vehicle.
- **Purifier Deployment:** Count of units, covered rooms, and home ventilation airtightness.
- **Dynamic Cross-App Sync:** Seamlessly synchronizes with LocalStorage and tailors all AI responses.

### 7. 🌍 Community Clean-Air Hub (`/community`)
- **Clean-Air Challenges:** 7-Day Clean Commute Pledge, Indoor Smog Shield, and Peak Load Shaver.
- **Community Goal Tracker:** City-wide winter target to avoid 25,000 kg CO2e.
- **Neighborhood Leaderboard:** Ranks top environmental champions by verified clean air points.
- **Community Cheer Feed:** Real-time stream of peer actions with interactive cheer buttons.

### 8. ⚙️ Settings & Diagnostics (`/settings`)
- **System Health Diagnostics:** Live check against `/api/health` displaying Express backend connectivity, Open-Meteo CAMS provider status, and Gemini API key status.
- **Customizable Alerts:** Morning AQI briefing, severe smog spike alerts (>300 AQI), and evening purifier reminders.
- **AI Tone Selector:** Switch between *Scientific & Data-Driven*, *Encouraging*, and *Urgent / Protective*.
- **Data Backup & Reset:** Export household profile to JSON or reset local impact data.

---

## 📐 Indian CPCB AQI Scale

BreatheWise AI strictly adheres to the official **Central Pollution Control Board (CPCB)** air quality classification:

| AQI Range | Category | Color Code | Health Advisory |
| :--- | :--- | :--- | :--- |
| **0 – 50** | **Good** | Emerald (`#10b981`) | Minimal impact; pristine outdoor air quality. |
| **51 – 100** | **Satisfactory** | Lime (`#84cc16`) | Minor breathing discomfort to sensitive individuals. |
| **101 – 200** | **Moderate** | Amber (`#eab308`) | Breathing discomfort to people with lung/heart disease and children. |
| **201 – 300** | **Poor** | Orange (`#f97316`) | Breathing discomfort to most people on prolonged exposure. N95 advised. |
| **301 – 400** | **Very Poor** | Red (`#ef4444`) | Risk of respiratory illness. Postpone outdoor workouts; seal windows. |
| **401 – 500** | **Severe** | Maroon (`#831843`) | Emergency conditions. Serious impact on healthy adults and vulnerable groups. |

---

## 🔑 Environment Variables & API Keys

### Required for Live Gemini AI:
1. **Google Gemini API Key (`GEMINI_API_KEY`)**:
   - Free key available at [Google AI Studio](https://aistudio.google.com/).
   - Add to `.env`:
     ```env
     GEMINI_API_KEY=AIzaSy...your_actual_key_here
     ```
   - **Note:** *Never exposed to the frontend.* If omitted, the application operates in **Local Intelligent Mode** using its built-in rule-based knowledge engine, ensuring no errors or broken states.

### Real-Time AQI & Weather:
- **Zero API keys required!** Real-time multi-pollutant and weather telemetry is fetched via Open-Meteo CAMS automatically.
- Optional: `WAQI_API_KEY` can be added to `.env` if desired.

---

## 💻 Exact PowerShell Commands to Run the Project

### Command 1: Run Both Frontend & Backend Concurrently (Recommended)
```powershell
npm run dev:all
```
- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API URL:** [http://localhost:3001](http://localhost:3001) (Health check: [http://localhost:3001/api/health](http://localhost:3001/api/health))

---

### Alternative: Run in Separate PowerShell Terminals
- **Terminal 1 (Backend Express Server):**
  ```powershell
  npm run server
  ```
- **Terminal 2 (Vite Frontend):**
  ```powershell
  npm run dev
  ```

---

### Production Verification Build:
```powershell
npm run build
npm run preview
```
*`tsc -b && vite build` builds with 0 errors.*

---

## 📄 License
MIT License. Built for cleaner air and healthier families.
