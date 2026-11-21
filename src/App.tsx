import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AirQualityProvider } from './context/AirQualityContext';
import { FamilyProfileProvider } from './context/FamilyProfileContext';
import { ImpactProvider } from './context/ImpactContext';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { AssistantPage } from './pages/AssistantPage';
import { RoutinePage } from './pages/RoutinePage';
import { IndoorPage } from './pages/IndoorPage';
import { ImpactPage } from './pages/ImpactPage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <FamilyProfileProvider>
        <AirQualityProvider>
          <ImpactProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="assistant" element={<AssistantPage />} />
                <Route path="routine" element={<RoutinePage />} />
                <Route path="indoor" element={<IndoorPage />} />
                <Route path="impact" element={<ImpactPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </ImpactProvider>
        </AirQualityProvider>
      </FamilyProfileProvider>
    </BrowserRouter>
  );
};

export default App;
