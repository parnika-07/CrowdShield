import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { SIMULATION_SCENARIOS } from '../services/mockData';
import { predictWithBackendOrFallback } from "../services/quantumEngine";
import { sound } from '../services/soundService';

export default function SimulationView({
  scaleMode,
  currentZone,
  setCurrentZone,
  onApplyToDashboard
}) {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('rapid_inflow');
  const [selectedZoneId, setSelectedZoneId] = useState(currentZone?.id || 'B');
  const [capacity, setCapacity] = useState(scaleMode === 'demo' ? 12 : 1200);
 
  // Manual 5-value inputs
  const [manualCounts, setManualCounts] = useState(
    scaleMode === 'demo' ? '8, 9, 10, 11, 13' : '850, 920, 990, 1080, 1190'
  );
  const [manualResult, setManualResult] = useState(null);

  // Simulation execution state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 2x, 4x
  const [simulationResult, setSimulationResult] = useState(null);
  const timerRef = useRef(null);

  const scenario = SIMULATION_SCENARIOS[selectedScenarioKey];
  const steps = scaleMode === 'demo' ? scenario.demoSteps : scenario.venueSteps;

  // Run initial prediction for step 0
  useEffect(() => {
    let cancelled = false;

    const runPrediction = async () => {
      const counts = steps[currentStepIndex] || steps[0];

      try {
        const res = await predictWithBackendOrFallback(
          selectedZoneId,
          counts,
          capacity,
          scaleMode
        );

        if (!cancelled) {
          setSimulationResult(res);
        }
      } catch (error) {
        console.error('CrowdShield prediction failed:', error);
      }
    };

    runPrediction();

    return () => {
      cancelled = true;
    };
  }, [selectedScenarioKey, scaleMode, capacity, currentStepIndex, selectedZoneId]);

  // Adjust default capacity and manual counts when scaleMode changes
  useEffect(() => {
    if (scaleMode === 'demo') {
      setCapacity(12);
      setManualCounts('8, 9, 10, 11, 13');
    } else {
      setCapacity(1200);
      setManualCounts('850, 920, 990, 1080, 1190');
    }
  }, [scaleMode]);

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 2500 / playbackSpeed;
      timerRef.current = setInterval(async () => {
        const next = (currentStepIndex + 1) % steps.length;
        const nextCounts = steps[next];

        setCurrentStepIndex(next);

        try {
          const res = await predictWithBackendOrFallback(
            selectedZoneId,
            nextCounts,
            capacity,
            scaleMode
          );

          setSimulationResult(res);

          if (res.risk === 'CRITICAL' || res.risk === 'WARNING') {
            sound.playCriticalAlarm();
          } else {
            sound.playActionClick();
          }
        } catch (error) {
          console.error('CrowdShield playback prediction failed:', error);
        }
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps, capacity, scaleMode, selectedZoneId, currentStepIndex]);

  // Handle Scenario Change
  const handleScenarioSelect = (key) => {
    sound.playActionClick();
    setSelectedScenarioKey(key);
    setCurrentStepIndex(0);
    const newSteps = scaleMode === 'demo' ? SIMULATION_SCENARIOS[key].demoSteps : SIMULATION_SCENARIOS[key].venueSteps;
    predictWithBackendOrFallback(
      selectedZoneId,
      newSteps[0],
      capacity,
      scaleMode
    ).then(setSimulationResult).catch((error) => {
      console.error('CrowdShield scenario prediction failed:', error);
    });
  };

  // Handle Manual 5-counts prediction
  const handleRunManualPrediction = () => {
    sound.playActionClick();
    const parsed = manualCounts
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length !== 5) {
      alert('Please enter exactly 5 comma-separated crowd numbers (for example: 8, 9, 10, 11, 13)');
      return;
    }

    predictWithBackendOrFallback(
      selectedZoneId,
      parsed,
      capacity,
      scaleMode
    ).then((res) => {
      setManualResult(res);

      if (res.risk === 'CRITICAL' || res.risk === 'WARNING') {
        sound.playCriticalAlarm();
      }
    }).catch((error) => {
      console.error('CrowdShield manual prediction failed:', error);
    });
  };

  // Apply simulated state to global dashboard
  const handlePushToDashboard = (resToApply) => {
    sound.playActionClick();
    onApplyToDashboard(selectedZoneId, resToApply);
    alert(`Simulation telemetry applied to Zone ${selectedZoneId}! Check the Overview Dashboard tab.`);
  };

  const currentResult = simulationResult || {
    current_crowd: steps[0]?.[steps[0].length - 1] ?? 0,
    predicted_crowd: '—',
    capacity,
    risk: 'SAFE',
    recommended_action: 'Waiting for quantum prediction...',
    z_expectations: [],
    latency_ms: '—'
  };

  return (
    <div className="space-y-6">
     
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Interactive Simulation Mode
            </h2>
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Demo Guarantee
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Test crowd growth patterns and verify quantum predictions without needing live camera hardware.
          </p>
        </div>

        {/* Quick parameters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700">
            <span className="text-slate-500 font-medium">Target Zone:</span>
            <select
              value={selectedZoneId}
              onChange={(e) => setSelectedZoneId(e.target.value)}
              className="bg-white text-blue-700 font-semibold border border-slate-200 rounded-lg px-2 py-1 outline-none cursor-pointer"
            >
              <option value="A">Zone A (Main Concourse)</option>
              <option value="B">Zone B (North Gate)</option>
              <option value="C">Zone C (Escalators)</option>
              <option value="D">Zone D (Arena / Exit)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700">
            <span className="text-slate-500 font-medium">Capacity:</span>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Math.max(1, parseInt(e.target.value) || 12))}
              className="w-16 bg-white text-slate-800 font-bold px-2 py-1 rounded-lg border border-slate-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Scenario Selector Cards */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
          Select Simulation Scenario
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {Object.entries(SIMULATION_SCENARIOS).map(([key, sc]) => {
            const isSelected = selectedScenarioKey === key;
            return (
              <button
                key={key}
                onClick={() => handleScenarioSelect(key)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-100 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900">{sc.name}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    sc.color === 'red' ? 'bg-red-100 text-red-700' :
                    sc.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    sc.color === 'amber' ? 'bg-red-100 text-red-700' : // Red for warning/amber
                    sc.color === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {sc.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {sc.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Scenario Simulation Runner & Output Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
        {/* Left: Simulation Timeline Controls */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs text-blue-600 block font-semibold">
                Scenario Timeline
              </span>
              <h3 className="font-bold text-slate-900 text-base">{scenario.name}</h3>
            </div>
            <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full text-slate-600 font-medium">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>

          {/* Timeline Step Visualizer */}
          <div className="space-y-2">
            <span className="text-xs text-slate-500 block font-medium">
              5-Reading Sampling Window [t-4 to t0]:
            </span>
            <div className="grid grid-cols-5 gap-2">
              {steps[currentStepIndex].map((val, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    idx === 4
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold ring-2 ring-blue-100'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 block font-normal">t{idx - 4 === 0 ? ' (now)' : idx - 4}</span>
                  <span className="text-base font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => {
                  sound.playActionClick();
                  setIsPlaying(!isPlaying);
                }}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                  isPlaying
                    ? 'bg-slate-800 hover:bg-slate-900 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause Simulation' : 'Run Crowd Simulation'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playActionClick();
                  setIsPlaying(false);
                  setCurrentStepIndex(0);
                  predictWithBackendOrFallback(
                    selectedZoneId,
                    steps[0],
                    capacity,
                    scaleMode
                  ).then(setSimulationResult).catch((error) => {
                    console.error('CrowdShield reset prediction failed:', error);
                  });
                }}
                title="Reset to step 1"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-600 font-medium">Speed:</span>
              <div className="flex space-x-1.5">
                {[1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      playbackSpeed === spd
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Push to Dashboard Button */}
          <button
            onClick={() => handlePushToDashboard(currentResult)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-blue-700 border border-blue-200 transition-all shadow-sm"
          >
            <span>Push Current Step to Zone {selectedZoneId} Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Quantum Simulation Output (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
         
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Quantum Prediction Output
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                currentResult.risk === 'CRITICAL' || currentResult.risk === 'WARNING'
                  ? 'bg-red-100 text-red-800 border-red-300'
                  : currentResult.risk === 'HIGH'
                  ? 'bg-orange-100 text-orange-800 border-orange-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                Risk: {currentResult.risk}
              </span>
            </div>

            {/* Prompt's exact 3-box requirement */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block uppercase font-medium">Current</span>
                <span className="text-3xl font-extrabold text-slate-900 block mt-1">
                  {currentResult.current_crowd}
                </span>
                <span className="text-xs text-slate-400">people</span>
              </div>

              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-center">
                <span className="text-xs text-blue-700 block uppercase font-medium">Predicted</span>
                <span className="text-3xl font-extrabold text-blue-700 block mt-1">
                  {currentResult.predicted_crowd}
                </span>
                <span className="text-xs text-blue-500">quantum forecast</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block uppercase font-medium">Capacity</span>
                <span className="text-3xl font-extrabold text-slate-800 block mt-1">
                  {currentResult.capacity}
                </span>
                <span className="text-xs text-slate-400">safe limit</span>
              </div>
            </div>

            {/* WARNING / CRITICAL block is in RED as specifically requested! */}
            <div className={`p-4 rounded-xl border mb-4 ${
              currentResult.risk === 'CRITICAL' || currentResult.risk === 'WARNING'
                ? 'bg-red-50 border-red-300 text-red-900'
                : currentResult.risk === 'HIGH'
                ? 'bg-orange-50 border-orange-300 text-orange-900'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}>
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  {currentResult.risk === 'CRITICAL' ? 'Critical Crowd Risk' :
                   currentResult.risk === 'WARNING' ? 'Warning: Elevated Density' :
                   currentResult.risk === 'HIGH' ? 'High Density Alert' : 'Safe Operating Limits'}
                </span>
              </div>
              <p className="text-base font-bold tracking-tight mt-1">
                Action: {currentResult.recommended_action}
              </p>
            </div>

            {/* Quantum Feature Inspection: 5 Qubits Z-Expectations */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-600 font-medium">
                <span>5-Qubit Reservoir Z-Expectation Features:</span>
                <span className="text-blue-600 font-semibold">RY Rotations + CNOT Coupling</span>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                {currentResult.z_expectations?.map((z, idx) => (
                  <div key={idx} className="bg-white py-2 px-1 rounded-lg border border-slate-200 shadow-sm">
                    <span className="text-slate-400 block text-[10px]">Qubit {idx}</span>
                    <span className="text-blue-700 font-bold">{z}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex justify-between items-center pt-3 border-t border-slate-100">
            <span>Model: Quantum Reservoir Computing + Ridge Readout</span>
            <span>Response Time: {currentResult.latency_ms} ms</span>
          </div>

        </div>

      </div>

      {/* Manual 5-Value Input Panel for Judges */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <span>Judge's Live Input Tester (Manual 5-Count Test)</span>
              <span className="text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter any 5 sequential crowd estimates to test immediate quantum non-linear prediction and preventive action.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Sequential 5-reading buffer (comma-separated):
            </label>
            <input
              type="text"
              value={manualCounts}
              onChange={(e) => setManualCounts(e.target.value)}
              placeholder="e.g. 8, 9, 10, 11, 13"
              className="w-full bg-slate-50 text-slate-900 text-base px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:bg-white outline-none"
            />
          </div>

          <div>
            <button
              onClick={handleRunManualPrediction}
              className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Quantum Prediction</span>
            </button>
          </div>
        </div>

        {/* Manual Result display if run */}
        {manualResult && (
          <div className={`mt-5 p-5 rounded-2xl border space-y-3 ${
            manualResult.risk === 'CRITICAL' || manualResult.risk === 'WARNING'
              ? 'bg-red-50/70 border-red-200'
              : 'bg-blue-50/70 border-blue-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Manual Test Prediction Results
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                manualResult.risk === 'CRITICAL' || manualResult.risk === 'WARNING'
                  ? 'bg-red-100 text-red-800 border-red-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {manualResult.risk}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 block text-[11px]">Current:</span>
                <span className="text-xl font-bold text-slate-900">{manualResult.current_crowd}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-blue-700 block text-[11px]">Predicted:</span>
                <span className="text-xl font-bold text-blue-700">{manualResult.predicted_crowd}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 block text-[11px]">Capacity:</span>
                <span className="text-xl font-bold text-slate-800">{manualResult.capacity}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 block text-[11px]">Occupancy:</span>
                <span className={`text-xl font-bold ${manualResult.occupancy_percent > 100 ? 'text-red-600' : 'text-slate-800'}`}>
                  {manualResult.occupancy_percent}%
                </span>
              </div>
            </div>

            <div className="text-xs p-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-sm">
              <span className="text-slate-500 font-bold block mb-1">Recommended Action:</span>
              <p className="font-semibold text-slate-900">"{manualResult.recommended_action}"</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}