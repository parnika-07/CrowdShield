import React from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  Cpu, 
  AlertCircle, 
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { QUANTUM_BENCHMARK_METRICS } from '../services/mockData';

export default function AnalyticsView({ zones }) {
  const chartData = [
    { name: 'MAE (Error in people)', Classical: 66.08, Quantum: 51.90 },
    { name: 'RMSE (Error in people)', Classical: 70.62, Quantum: 60.26 },
  ];

  const mseData = [
    { name: 'MSE (Variance)', Classical: 4986.58, Quantum: 3630.90 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Quantum Reservoir Computing Benchmark
            </h2>
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Model Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empirical accuracy evaluation comparing Classical Reservoir Computing against 5-Qubit Quantum Reservoir Computing.
          </p>
        </div>

        {/* Highlight badge */}
        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs shadow-sm">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-700 font-medium">RMSE Error Reduction:</span>
          <span className="text-emerald-700 font-extrabold text-sm">~14.7%</span>
        </div>
      </div>

      {/* Mandatory Presentation Note Banner (PDF Section 7) */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3.5 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-900 block uppercase tracking-wide mb-1">
            Presentation Wording & Methodology Disclosure:
          </span>
          <p className="text-slate-700 leading-relaxed text-xs">
            "These are experimental results from the current simulated dataset/prototype. They are not proof that quantum models always outperform classical models."
          </p>
        </div>
      </div>

      {/* Benchmark Metrics Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-blue-600" />
          <span>Comparative Error Performance (5-Value Temporal Window)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
                <th className="pb-3 px-4">Metric</th>
                <th className="pb-3 px-4">Classical RC</th>
                <th className="pb-3 px-4">Quantum RC (5 Qubits)</th>
                <th className="pb-3 px-4 text-right">Error Reduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {QUANTUM_BENCHMARK_METRICS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.metric}</td>
                  <td className="py-3 px-4 text-slate-600">{row.classical}</td>
                  <td className="py-3 px-4 font-bold text-blue-700">{row.quantum}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600">{row.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphical Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* MAE & RMSE Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-900 text-sm">Error Metrics (MAE & RMSE in People)</h4>
            <span className="text-xs text-slate-500">Lower is better</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Classical" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Classical RC" />
                <Bar dataKey="Quantum" fill="#0284c7" radius={[6, 6, 0, 0]} name="Quantum RC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mean Squared Error Comparison */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-900 text-sm">Mean Squared Error (MSE Variance)</h4>
            <span className="text-xs text-emerald-700 font-semibold">-27.2% Variance Drop</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mseData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Classical" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Classical RC (4986.58)" />
                <Bar dataKey="Quantum" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Quantum RC (3630.90)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Zone Comparison Summary Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Active Monitored Zones — Current vs Quantum Projected Delta</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold text-[11px]">
                <th className="pb-3 px-4">Zone</th>
                <th className="pb-3 px-4">Current</th>
                <th className="pb-3 px-4">Predicted</th>
                <th className="pb-3 px-4">Capacity</th>
                <th className="pb-3 px-4">Occupancy</th>
                <th className="pb-3 px-4">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {zones.map((z) => (
                <tr key={z.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-semibold text-slate-900">{z.name}</td>
                  <td className="py-3 px-4 text-slate-700">{z.current_crowd}</td>
                  <td className="py-3 px-4 font-bold text-blue-700">{z.predicted_crowd}</td>
                  <td className="py-3 px-4 text-slate-600">{z.capacity}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {Math.round((z.predicted_crowd / z.capacity) * 100)}%
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      z.risk === 'CRITICAL' || z.risk === 'WARNING' 
                        ? 'bg-red-100 text-red-800 border-red-300' 
                        : z.risk === 'HIGH' 
                        ? 'bg-orange-100 text-orange-800 border-orange-300' 
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      {z.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
