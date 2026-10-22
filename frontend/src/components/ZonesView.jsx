import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Radio, 
  Video, 
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { sound } from '../services/soundService';

export default function ZonesView({ 
  zones, 
  currentZone, 
  setCurrentZone, 
  onNavigateTab 
}) {
  const [selectedZone, setSelectedZone] = useState(currentZone || zones[0]);

  const handleSelectZone = (zone) => {
    sound.playActionClick();
    setSelectedZone(zone);
    setCurrentZone(zone);
  };

  const getRiskDetails = (risk) => {
    switch (risk) {
      case 'CRITICAL':
        return {
          badge: 'bg-red-100 text-red-800 border-red-300',
          border: 'border-red-300',
          bar: 'bg-red-600',
          dot: 'bg-red-600 animate-pulse',
        };
      case 'WARNING':
        return {
          badge: 'bg-red-100 text-red-800 border-red-300',
          border: 'border-red-300',
          bar: 'bg-red-600',
          dot: 'bg-red-600',
        };
      case 'HIGH':
        return {
          badge: 'bg-orange-100 text-orange-800 border-orange-300',
          border: 'border-orange-300',
          bar: 'bg-orange-600',
          dot: 'bg-orange-600',
        };
      case 'SAFE':
      default:
        return {
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          border: 'border-emerald-300',
          bar: 'bg-emerald-600',
          dot: 'bg-emerald-600',
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-200/60">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <span>Multi-Zone Crowd Safety Grid</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              4 Active Zones
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Click any zone card to inspect localized quantum forecasts and trigger safety interventions.
          </p>
        </div>

        {/* Risk Distribution Summary */}
        <div className="flex items-center space-x-3 text-xs bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-slate-700">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>1 Safe</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-red-700 font-semibold">1 Warning</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span>1 High</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-red-700 font-bold">1 Critical</span>
          </div>
        </div>
      </div>

      {/* 4 Zone Cards Grid with Elevated Shadows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {zones.map((z) => {
          const style = getRiskDetails(z.risk);
          const isSelected = selectedZone.id === z.id;
          const occPercent = z.capacity > 0 ? Math.round((z.predicted_crowd / z.capacity) * 100) : 100;

          return (
            <div
              key={z.id}
              onClick={() => handleSelectZone(z)}
              className={`cursor-pointer rounded-2xl p-6 transition-all bg-white border-2 shadow-md shadow-slate-300/40 hover:shadow-xl ${
                isSelected 
                  ? 'border-blue-500 ring-4 ring-blue-50 shadow-lg' 
                  : `${style.border}`
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-lg border border-slate-200">
                    {z.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{z.name}</h3>
                    <span className="text-xs text-slate-500 flex items-center space-x-1.5 mt-0.5">
                      <Radio className="w-3 h-3 text-blue-600" />
                      <span>{z.sensor_id}</span>
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${style.badge}`}>
                  <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
                  <span>{z.risk}</span>
                </span>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                <div>
                  <span className="text-[11px] text-slate-500 block uppercase font-medium">Current</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <Users className="w-4 h-4 text-blue-600 mr-1 inline" />
                    <span className="text-xl font-bold text-slate-900">{z.current_crowd.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-blue-700 block uppercase font-medium">Predicted</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <Sparkles className="w-4 h-4 text-blue-600 mr-1 inline" />
                    <span className="text-xl font-bold text-blue-700">{z.predicted_crowd.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block uppercase font-medium">Capacity</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-xl font-bold text-slate-800">{z.capacity.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">max</span>
                  </div>
                </div>
              </div>

              {/* Occupancy Progress Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Occupancy Limit:</span>
                  <span className={`font-bold ${occPercent > 100 ? 'text-red-600' : 'text-slate-800'}`}>
                    {occPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${style.bar}`}
                    style={{ width: `${Math.min(100, occPercent)}%` }}
                  ></div>
                </div>
              </div>

              {/* Recommended Action */}
              <div className={`p-3.5 rounded-xl border ${
                z.risk === 'SAFE' ? 'bg-emerald-50/70 border-emerald-200' : 'bg-red-50/70 border-red-200'
              }`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Recommended Action:
                </span>
                <p className="text-xs font-semibold text-slate-800">
                  {z.recommended_action}
                </p>
              </div>

              {/* Footer row */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span>Recent counts: [{z.last_5_counts.join(', ')}]</span>
                <span className="text-blue-600 font-medium flex items-center space-x-1">
                  <span>{isSelected ? 'Currently Selected' : 'View Details'}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Zone Deep Dive Panel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg shadow-slate-300/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Zone Telemetry Detail —
              </span>
              <span className="text-base font-bold text-slate-900">{selectedZone.name}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Live camera feed active via {selectedZone.sensor_id} • 5-value sliding Quantum Reservoir projection
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button 
              onClick={() => {
                sound.playActionClick();
                setCurrentZone(selectedZone);
                onNavigateTab('dashboard');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
            >
              Set as Primary Dashboard Zone
            </button>
            <button 
              onClick={() => {
                sound.playActionClick();
                onNavigateTab('simulation');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 shadow-sm transition-all"
            >
              Simulate Surge Here
            </button>
          </div>
        </div>

        {/* Sub-grid for selected zone */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Mini trend chart */}
          <div className="lg:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-slate-800">Recent Trend Curve</span>
              <span className="text-xs text-blue-700 font-medium">Last 5 readings → Projected</span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedZone.history}>
                  <defs>
                    <linearGradient id="zoneGradLight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="actual" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#zoneGradLight)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Direct Incident Actions */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-slate-800 block mb-3">Direct Interventions</span>
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    sound.playActionClick();
                    alert(`Public Announcement broadcast to ${selectedZone.name}: "Attention visitors, please proceed calmly toward alternative concourses."`);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium flex items-center justify-between shadow-sm"
                >
                  <span>📢 Broadcast PA Announcement</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    sound.playActionClick();
                    alert(`Relief Turnstiles #3 and #4 unlocked for ${selectedZone.name}.`);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium flex items-center justify-between shadow-sm"
                >
                  <span>🚪 Open Relief Turnstiles</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    sound.playCriticalAlarm();
                    alert(`EMERGENCY: Inflow restricted for ${selectedZone.name}. Safety team notified.`);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center justify-between shadow-sm"
                >
                  <span>🛑 Restrict Inflow Immediately</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
              Actions are logged to the venue event history
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
