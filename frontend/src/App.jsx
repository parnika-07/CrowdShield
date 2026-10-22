import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CameraView from './components/CameraView';
import ZonesView from './components/ZonesView';
import SettingsView from './components/SettingsView';
import { INITIAL_ZONES_DEMO, INITIAL_ZONES_VENUE, INITIAL_ALERTS } from './services/mockData';
import { sound } from './services/soundService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scaleMode, setScaleMode] = useState('demo'); // 'demo' (Capacity 12) | 'venue' (Capacity 20,000)
  const [zones, setZones] = useState(INITIAL_ZONES_DEMO);
  const [currentZone, setCurrentZone] = useState(INITIAL_ZONES_DEMO[0]); // Default to Zone A as shown in mockup
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const lastAlarmRiskRef = useRef(null);

  // Switch zone data when scale mode changes
  useEffect(() => {
    if (scaleMode === 'demo') {
      setZones(INITIAL_ZONES_DEMO);
      setCurrentZone(INITIAL_ZONES_DEMO[0]);
    } else {
      setZones(INITIAL_ZONES_VENUE);
      setCurrentZone(INITIAL_ZONES_VENUE[0]);
    }
  }, [scaleMode]);

  // Handler to push simulation or camera results directly to the active zone dashboard
  const handleApplyToDashboard = (zoneId, resultData, forceSound = false) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setZones(prevZones => {
      const updated = prevZones.map(z => {
        if (z.id === zoneId) {
          const newHistory = [
            ...(z.history ? z.history.slice(1) : []),
            { time: timeStr, actual: resultData.current_crowd, predicted: resultData.predicted_crowd }
          ];

          return {
            ...z,
            current_crowd: resultData.current_crowd,
            predicted_crowd: resultData.predicted_crowd,
            capacity: resultData.capacity,
            occupancy_percent: resultData.occupancy_percent || (resultData.capacity > 0 ? Math.round((resultData.predicted_crowd / resultData.capacity) * 100) : 0),
            risk: resultData.risk,
            recommended_action: resultData.recommended_action,
            last_5_counts: resultData.last_5_counts,
            history: newHistory,
          };
        }
        return z;
      });

      const updatedCurrent = updated.find(z => z.id === zoneId);
      if (updatedCurrent) {
        setCurrentZone(updatedCurrent);
      }
      return updated;
    });

    if (forceSound || ((resultData.risk === 'CRITICAL' || resultData.risk === 'WARNING') && lastAlarmRiskRef.current !== resultData.risk)) {
      sound.playCriticalAlarm();
      lastAlarmRiskRef.current = resultData.risk;
    } else if (resultData.risk === 'SAFE') {
      lastAlarmRiskRef.current = 'SAFE';
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-800 flex font-sans antialiased">
      
      {/* Left Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 px-8 flex items-center justify-end border-b border-transparent">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>System Online</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#93c5fd] text-white font-semibold flex items-center justify-center text-xs shadow-xs">
              R
            </div>
          </div>
        </header>

        {/* Dynamic View Container */}
        <main className="flex-1 px-8 pb-12 overflow-y-auto max-w-6xl w-full">
          {activeTab === 'dashboard' && (
            <DashboardView 
              currentZone={currentZone}
              setCurrentZone={setCurrentZone}
              zones={zones}
              scaleMode={scaleMode}
              onApplyToDashboard={handleApplyToDashboard}
            />
          )}

          {activeTab === 'camera' && (
            <CameraView 
              currentZone={currentZone}
              setCurrentZone={setCurrentZone}
              scaleMode={scaleMode}
              onApplyToDashboard={handleApplyToDashboard}
            />
          )}

          {activeTab === 'zones' && (
            <ZonesView 
              zones={zones}
              currentZone={currentZone}
              setCurrentZone={setCurrentZone}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              scaleMode={scaleMode}
              setScaleMode={setScaleMode}
            />
          )}
        </main>

      </div>

    </div>
  );
}
