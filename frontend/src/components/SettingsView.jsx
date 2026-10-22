import React, { useState } from 'react';
import { Settings, Server, Volume2, Cpu, ShieldCheck } from 'lucide-react';
import { sound } from '../services/soundService';

export default function SettingsView({ scaleMode, setScaleMode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          System Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure backend connection, alert behavior, and quantum model parameters
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
        {/* Backend API Configuration */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">FastAPI Backend Server</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Local inference pipeline connecting YOLOv11 and Qiskit Quantum Reservoir
              </p>
              <div className="mt-2 inline-flex items-center space-x-2 text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-slate-700">http://127.0.0.1:8000</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Online
          </span>
        </div>

        {/* Capacity / Scale Mode */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Scale Mode</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Switch between Demo scale (Capacity 12) and Venue scale (Capacity 20,000)
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setScaleMode && setScaleMode('demo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scaleMode === 'demo'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Demo (Cap: 12)
            </button>
            <button
              onClick={() => setScaleMode && setScaleMode('venue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scaleMode === 'venue'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Venue (Cap: 20k)
            </button>
          </div>
        </div>

        {/* Audio Alerts */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Audio Alarm Sounds</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Play auditory alerts when risk reaches WARNING or CRITICAL levels
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sound.playActionClick();
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              soundEnabled
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            {soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Privacy & Model Guarantee */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center space-x-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>
            <strong>Anonymous Crowd Counting:</strong> No facial recognition or personal identifiable information is recorded or transmitted.
          </span>
        </div>
      </div>
    </div>
  );
}
