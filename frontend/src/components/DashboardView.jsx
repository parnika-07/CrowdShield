import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Camera, 
  BarChart2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Loader2, 
  Sparkles,
  Play,
  Pause,
  Clock
} from 'lucide-react';
import { runQuantumPrediction } from '../services/quantumEngine';
import { sound } from '../services/soundService';

export default function DashboardView({ 
  currentZone, 
  setCurrentZone, 
  zones, 
  onApplyToDashboard 
}) {
  const activeZone = currentZone || zones[0];
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLiveSampling, setIsLiveSampling] = useState(true);
  const sampleIndexRef = useRef(0);

  // Sequence of crowd readings extracted by YOLO across surveillance video frames
  const [videoReadings, setVideoReadings] = useState([
    3, 9, 5, 6, 6, 8, 7, 2, 6, 7, 5, 4, 7, 11, 6, 7, 9, 9, 6, 8, 8, 9, 8, 11, 5, 6, 7, 8, 8, 7, 4, 7, 9, 10, 6, 7, 8, 7, 9, 8, 9, 7, 5
  ]);

  const videoReadingsRef = useRef(videoReadings);
  videoReadingsRef.current = videoReadings;

  const activeZoneRef = useRef(activeZone);
  activeZoneRef.current = activeZone;

  const onApplyToDashboardRef = useRef(onApplyToDashboard);
  onApplyToDashboardRef.current = onApplyToDashboard;

  // Periodic 3-second live sampling loop from the video frames
  useEffect(() => {
    if (!isLiveSampling) return;

    const timer = setInterval(() => {
      const readings = videoReadingsRef.current;
      if (!readings || readings.length === 0) return;

      sampleIndexRef.current = (sampleIndexRef.current + 1) % readings.length;
      const nextCount = readings[sampleIndexRef.current];

      const currentZone = activeZoneRef.current;
      const currentHistory = (currentZone && currentZone.last_5_counts && currentZone.last_5_counts.length === 5)
        ? currentZone.last_5_counts
        : [7, 8, 9, 10, 9];
      const next5 = [...currentHistory.slice(1), nextCount];

      const cap = (currentZone && currentZone.capacity) || 12;
      const qrc = runQuantumPrediction(next5, cap, 'demo');

      if (onApplyToDashboardRef.current && currentZone) {
        onApplyToDashboardRef.current(currentZone.id, {
          zone_id: currentZone.id,
          current_crowd: nextCount,
          last_5_counts: next5,
          predicted_crowd: qrc.predicted_crowd,
          capacity: cap,
          occupancy_percent: qrc.occupancy_percent,
          risk: qrc.risk,
          recommended_action: qrc.recommended_action,
          model: 'quantum_reservoir',
          camera_model: 'YOLOv11',
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isLiveSampling]);

  // Backend video process trigger
  const handleRunBackendAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      sound.playActionClick();

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const response = await fetch("http://127.0.0.1:8000/camera/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zone_id: activeZone.id || "A",
          video_path: "vdo.mp4",
          capacity: activeZone.capacity || 12,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      console.log("CrowdShield Dashboard Camera Result:", data);

      if (data.counts && data.counts.length >= 5) {
        setVideoReadings(data.counts);
      }

      if (onApplyToDashboard) {
        onApplyToDashboard(activeZone.id, data);
      }

      if (data.risk === 'CRITICAL' || data.risk === 'WARNING') {
        sound.playCriticalAlarm();
      }
    } catch (error) {
      console.error("Dashboard backend analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isSafeOverall = !zones.some(z => z.risk === 'CRITICAL' || z.risk === 'HIGH');

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome to CrowdShield
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time crowd monitoring and risk prediction
        </p>
      </div>

      {/* Overall Status Banner */}
      <div className="bg-[#edf9f3] border border-[#d1f2e1] rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#34d399] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          <Shield className="w-6 h-6 fill-white stroke-white" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
            Overall Status
          </span>
          <span className="text-2xl font-bold text-[#059669] block -mt-0.5">
            {isSafeOverall ? 'Safe' : 'Warning'}
          </span>
          <span className="text-xs text-slate-600 mt-0.5 block">
            {isSafeOverall ? 'All zones are operating normally.' : 'Elevated crowd density detected in one or more zones.'}
          </span>
        </div>
      </div>

      {/* Middle Grid: Live Camera Feed & Prediction & Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Live Camera Feed */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">Live Camera Feed</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-500 flex items-center space-x-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                  <span className={`w-1.5 h-1.5 rounded-full ${isLiveSampling ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                  <span>{isLiveSampling ? 'Sampling 3s' : 'Paused'}</span>
                </span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Zone {activeZone.id}
                </span>
              </div>
            </div>

            {/* Video Stage */}
            <div className="relative aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden mt-4 shadow-inner">
              <video 
                src="/vdo.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Live</span>
              </div>

              {/* People Count Badge Overlay on Video */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-medium leading-none">Counted</span>
                <span className="text-lg font-extrabold text-slate-900 leading-none">{activeZone.current_crowd}</span>
              </div>
            </div>
          </div>

          {/* Quick Controls Bar below video */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLiveSampling(!isLiveSampling)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 transition-colors"
              >
                {isLiveSampling ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-slate-600" />
                    <span>Pause 3s Feed</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Resume 3s Feed</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleRunBackendAnalysis}
              disabled={isAnalyzing}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all flex items-center space-x-1.5 shadow-xs"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Analyze with YOLO + QRC</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Prediction & Risk */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Prediction & Risk</h3>
            </div>

            {/* 3 Metric Mini-Cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              
              {/* Current Crowd */}
              <div className="bg-[#f0f6fc] border border-[#e1edf9] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs font-medium leading-none">Current Crowd</span>
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-bold text-slate-900">
                    {activeZone.current_crowd}
                  </span>
                  <span className="text-xs text-slate-400 ml-1 font-normal">
                    people
                  </span>
                </div>
              </div>

              {/* Predicted Crowd */}
              <div className="bg-[#f0f6fc] border border-[#e1edf9] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs font-medium leading-none">Predicted Crowd</span>
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-bold text-slate-900">
                    {activeZone.predicted_crowd}
                  </span>
                  <span className="text-xs text-slate-400 ml-1 font-normal">
                    people
                  </span>
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-[#f0f6fc] border border-[#e1edf9] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs font-medium leading-none">Capacity</span>
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-bold text-slate-900">
                    {activeZone.capacity}
                  </span>
                  <span className="text-xs text-slate-400 ml-1 font-normal">
                    people
                  </span>
                </div>
              </div>

            </div>

            {/* Risk & Action Box */}
            <div className="bg-[#fef9ee] border border-[#faecd2] rounded-xl p-4 mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-800">Risk Level</span>
                </div>
                <span className={`text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider ${
                  activeZone.risk === 'WARNING' 
                    ? 'bg-[#fcecc7] text-[#9c6204]' 
                    : activeZone.risk === 'CRITICAL' || activeZone.risk === 'HIGH'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-[#def7ec] text-[#03543f]'
                }`}>
                  {activeZone.risk}
                </span>
              </div>

              <div className="flex items-start space-x-2 pt-1 border-t border-amber-100/60">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Recommended Action
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {activeZone.recommended_action}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Engine: Qiskit Quantum Reservoir</span>
            <span>Occupancy: {activeZone.occupancy_percent || Math.round((activeZone.predicted_crowd / activeZone.capacity) * 100)}%</span>
          </div>
        </div>

      </div>

      {/* Bottom Card: Recent Zones */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">Recent Zones</h3>
        </div>

        {/* Table Header */}
        <div className="bg-[#f8fafc] text-xs font-semibold text-slate-500 rounded-lg px-4 py-2.5 grid grid-cols-4">
          <span>Zone</span>
          <span>Current Crowd</span>
          <span>Predicted Crowd</span>
          <span>Risk Level</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-50">
          {zones.slice(0, 3).map((z) => {
            const isSelected = z.id === activeZone.id;
            return (
              <div 
                key={z.id}
                onClick={() => setCurrentZone(z)}
                className={`px-4 py-3.5 grid grid-cols-4 items-center text-sm cursor-pointer rounded-lg transition-colors ${
                  isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'
                }`}
              >
                <span className="font-semibold text-slate-900">{z.id}</span>
                <span className="text-slate-700">{z.current_crowd}</span>
                <span className="text-slate-700">{z.predicted_crowd}</span>
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
                    z.risk === 'WARNING'
                      ? 'bg-[#fcecc7] text-[#9c6204]'
                      : z.risk === 'CRITICAL' || z.risk === 'HIGH'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-[#def7ec] text-[#03543f]'
                  }`}>
                    {z.risk}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
