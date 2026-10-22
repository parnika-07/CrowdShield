import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Sparkles, 
  Workflow
} from 'lucide-react';

export default function MethodologyView() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <Workflow className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            How It Works: Quantum Reservoir Computing (QRC)
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Time-series prediction model engineered for high-density crowd safety and early surge detection.
        </p>
      </div>

      {/* The Golden Rule Banner (PDF Page 7) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-sm">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white mt-0.5 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block mb-1">
              Core Architectural Principle // The Golden Rule
            </span>
            <p className="text-base font-semibold text-slate-900 leading-relaxed">
              "The quantum model does not count people. Counting/estimation is the <span className="text-blue-700 underline underline-offset-4">input layer</span> (Computer Vision / Sensors); Quantum Reservoir Computing is the <span className="text-blue-700 underline underline-offset-4">prediction layer</span>."
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End Pipeline Visualization */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Complete Data Flow Pipeline (PDF Specification)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          
          {/* 1. INPUTS */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-blue-700 font-bold uppercase">1. Flexible Inputs</span>
              <span className="text-[11px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Any Source</span>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Camera Video (YOLO Detection)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Entry/Exit Turnstile Counts</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>LiDAR & Optical Depth Sensors</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Aggregated Telecom / Mobility Data</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Manual Field Marshal Estimates</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Pre-Configured Simulation Scenarios</span>
              </li>
            </ul>
          </div>

          {/* 2. PROCESSING */}
          <div className="bg-blue-50/60 p-5 rounded-xl border border-blue-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200">
              <span className="text-blue-900 font-bold uppercase">2. Quantum Reservoir</span>
              <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">5 Qubits</span>
            </div>
            <div className="space-y-2 text-slate-700">
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-sm">
                <span className="text-slate-500 block text-[11px]">Sliding Temporal Window:</span>
                <span className="text-slate-900 font-semibold">Last 5 readings [x4, x3, x2, x1, x0]</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-sm">
                <span className="text-slate-500 block text-[11px]">Quantum State Encoding:</span>
                <span className="text-blue-700 font-semibold">RY Rotations: θi = π · x̃i</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-sm">
                <span className="text-slate-500 block text-[11px]">Non-Linear Mixing:</span>
                <span className="text-slate-900 font-semibold">RZ/RX Phase + CNOT Entanglement</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-sm">
                <span className="text-slate-500 block text-[11px]">Classical Readout:</span>
                <span className="text-emerald-700 font-semibold">Z-Expectation ⟨Zi⟩ + Ridge Regression</span>
              </div>
            </div>
          </div>

          {/* 3. OUTPUT */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-blue-700 font-bold uppercase">3. Actionable Output</span>
              <span className="text-[11px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Real-time</span>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Predicted Next-Step Crowd Level</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Automated Risk Classification</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span>Recommended Preventive Action</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>Live Dashboard Operator Directives</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Incident Dispatch Notifications</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Quantum Reservoir Circuit Layout */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-blue-600" />
          <span>5-Qubit Quantum Reservoir Circuit Layout</span>
        </h3>
        
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs overflow-x-auto">
          <div className="space-y-3 min-w-[550px]">
            {[0, 1, 2, 3, 4].map((qIdx) => (
              <div key={qIdx} className="flex items-center space-x-3">
                <span className="w-12 text-slate-600 font-bold">|q{qIdx}⟩</span>
                <span className="text-slate-400">—</span>
                <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 font-semibold">
                  RY(θ_{qIdx})
                </span>
                <span className="text-slate-400">———</span>
                <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-800 border border-purple-200">
                  RZ(φ) · RX(ψ)
                </span>
                <span className="text-slate-400">———</span>
                <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200">
                  CNOT (q{qIdx}, q{(qIdx + 1) % 5})
                </span>
                <span className="text-slate-400">———[ Measure ]———</span>
                <span className="text-emerald-700 font-bold">⟨Z_{qIdx}⟩</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          The quantum reservoir projects non-linear multi-step time dynamics into a higher-dimensional state space. Classical Ridge Regression then reads out these expectation values to deliver fast, accurate predictions.
        </p>
      </div>

      {/* Privacy Guarantee */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 mt-1">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">
              Ethical AI & Privacy by Design
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              CrowdShield operates strictly on anonymous numerical densities. No faces, biometric data, individual identities, or personal records are collected or saved.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ✓ Anonymous Bounding Box Counts
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ✓ No Facial Recognition Models
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ✓ On-Premises & Edge Inference Ready
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ✓ Zero Biometric Data Storage
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
