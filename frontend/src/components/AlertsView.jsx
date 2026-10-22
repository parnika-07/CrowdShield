import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Check
} from 'lucide-react';
import { sound } from '../services/soundService';

export default function AlertsView({ alerts, setAlerts }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'WARNING' | 'ACTIVE' | 'RESOLVED'

  const handleAcknowledge = (id) => {
    sound.playActionClick();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'acknowledged' } : a));
  };

  const handleResolve = (id) => {
    sound.playActionClick();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    if (filter === 'CRITICAL') return a.severity === 'CRITICAL';
    if (filter === 'WARNING') return a.severity === 'WARNING';
    if (filter === 'ACTIVE') return a.status === 'active';
    if (filter === 'RESOLVED') return a.status === 'resolved';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Operational Safety Alerts
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated alerts dispatched to crowd management marshals when thresholds are projected to be crossed.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-1 text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          {['ALL', 'CRITICAL', 'WARNING', 'ACTIVE', 'RESOLVED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filter === f 
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No incidents found matching filter "{filter}".
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isCriticalOrWarning = alert.severity === 'CRITICAL' || alert.severity === 'WARNING';
            const isHigh = alert.severity === 'HIGH';
            const isResolved = alert.status === 'resolved';

            return (
              <div 
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all shadow-sm ${
                  isResolved 
                    ? 'bg-slate-50/80 border-slate-200 opacity-80' 
                    : isCriticalOrWarning 
                    ? 'bg-red-50/90 border-red-300' 
                    : isHigh 
                    ? 'bg-orange-50/80 border-orange-200' 
                    : 'bg-emerald-50/70 border-emerald-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left info */}
                  <div className="flex items-start space-x-3.5">
                    <div className={`p-2.5 rounded-xl mt-0.5 ${
                      isResolved ? 'bg-slate-200 text-slate-600' :
                      isCriticalOrWarning ? 'bg-red-100 text-red-700' :
                      isHigh ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {isResolved ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-700">{alert.id}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{alert.timestamp}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${
                          isCriticalOrWarning 
                            ? 'bg-red-100 text-red-800 border-red-300' 
                            : isHigh 
                            ? 'bg-orange-100 text-orange-800 border-orange-300' 
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase font-medium">
                          {alert.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base mt-1">
                        {alert.zone}
                      </h4>

                      <div className="mt-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <strong className="text-slate-500 block mb-0.5">Recommended Action:</strong>
                        <p className="font-medium text-slate-800">"{alert.recommended_action}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center space-x-2 text-xs">
                    {alert.status === 'active' && (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium shadow-sm transition-all"
                      >
                        Acknowledge
                      </button>
                    )}

                    {!isResolved ? (
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all flex items-center space-x-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolve Incident</span>
                      </button>
                    ) : (
                      <span className="text-emerald-700 text-xs font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Resolved</span>
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
