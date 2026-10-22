import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Volume2, 
  VolumeX, 
  Clock, 
  Layers, 
  PlayCircle, 
  Camera, 
  BarChart3, 
  Bell, 
  HelpCircle,
  SlidersHorizontal
} from 'lucide-react';
import { sound } from '../services/soundService';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  scaleMode, 
  setScaleMode, 
  unresolvedAlertCount = 0 
}) {
  const [time, setTime] = useState(new Date());
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMute = () => {
    const newMute = !muted;
    setMuted(newMute);
    sound.setMuted(newMute);
    if (!newMute) {
      sound.playActionClick();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: Activity },
    { id: 'zones', label: 'Zone Monitor', icon: Layers },
    { id: 'simulation', label: 'Simulation Lab', icon: PlayCircle },
    { id: 'camera', label: 'Live Camera & YOLO', icon: Camera },
    { id: 'analytics', label: 'Model Benchmark', icon: BarChart3 },
    { id: 'alerts', label: 'Safety Alerts', icon: Bell, badge: unresolvedAlertCount },
    { id: 'methodology', label: 'How It Works', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm text-slate-800">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  CrowdShield
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5"></span>
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Predict the crowd before the crowd becomes a disaster
              </p>
            </div>
          </div>

          {/* Telemetry Status in Light Theme */}
          <div className="hidden lg:flex items-center space-x-4 text-xs">
            {/* System Status */}
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-500">System:</span>
              <span className="font-semibold text-emerald-700">Active</span>
            </div>

            {/* Quantum Reservoir Status */}
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200/80 text-blue-900">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-blue-700">Quantum Reservoir:</span>
              <span className="font-bold text-blue-900">Active</span>
            </div>

            {/* Live Clock */}
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5">
            {/* Scale Switcher Toggle */}
            <button
              onClick={() => {
                sound.playActionClick();
                setScaleMode(scaleMode === 'demo' ? 'venue' : 'demo');
              }}
              title="Switch between Demo room scale (Capacity: 12) and Festival venue scale (Capacity: 20,000)"
              className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden md:inline text-slate-500">Mode:</span>
              <span className="font-semibold text-blue-700">
                {scaleMode === 'demo' ? 'Demo Scale (Cap: 12)' : 'Venue Scale (Cap: 20k)'}
              </span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              title={muted ? 'Unmute safety chime' : 'Mute safety chime'}
              className={`p-2 rounded-lg border transition-colors ${
                muted 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
              }`}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="bg-slate-100/90 border-t border-slate-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 py-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playActionClick();
                  setActiveTab(item.id);
                }}
                className={`group flex items-center space-x-2.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 font-bold' 
                    : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-blue-100 hover:text-blue-800 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <Icon className={`w-4 h-4 transition-all duration-200 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-700 group-hover:scale-110'}`} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold shadow-sm transition-colors ${
                    isActive ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
