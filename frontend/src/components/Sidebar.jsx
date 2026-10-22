import React from 'react';
import { 
  Shield, 
  Home, 
  Camera, 
  BarChart2, 
  Settings 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'camera', label: 'Camera Feed', icon: Camera },
    { id: 'zones', label: 'Zones', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-100 min-h-screen flex flex-col justify-between flex-shrink-0">
      <div>
        {/* Brand Logo */}
        <div className="p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Shield className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              CrowdShield
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 py-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#edf4fc] text-blue-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Subtle bottom note */}
      <div className="p-6 pt-0 text-[11px] text-slate-400">
        <span>CrowdShield • Quantum AI</span>
      </div>
    </aside>
  );
}
