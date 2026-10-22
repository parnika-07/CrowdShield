# CROWDSHIELD — Quantum Crowd Risk Command Center

> **Tagline**: *Predict the crowd before the crowd becomes a disaster.*

CrowdShield is a public-safety command center dashboard that accepts crowd estimates from cameras (YOLO), sensors, or simulations, predicts the next crowd level using **Quantum Reservoir Computing (QRC)**, classifies operational risk, and recommends preventive actions before dangerous stampedes or bottlenecks occur.

---

## 🎯 Architecture Principle: Golden Rule
> **The frontend must not imply that the quantum model counts people.**
> - **Input Layer**: Camera / YOLO Person Detection / LiDAR / Turnstiles / Mobility Data / Synthetic Simulation.
> - **Prediction Layer**: Quantum Reservoir Computing (5-qubit dynamical reservoir with RY state encoding, RZ/RX mixing, nearest-neighbor CNOT entanglement, and Ridge Regression readout).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🖥️ Screen & Feature Walkthrough

### 1. 🖥️ Executive Command Center (Dashboard)
- **Top Bar**: Live system telemetry, real-time clock, `■ Quantum Reservoir: ACTIVE` status indicator, Audio alert toggle, and Scale switcher (`Camera Demo Scale` vs `Venue Scale`).
- **4 Operational Metric Cards**:
  - **Current Crowd**: Live pedestrian count sampled from YOLO.
  - **Predicted Crowd**: Next-step non-linear forecast calculated via QRC.
  - **Risk Level**: Automated classification (`🟢 SAFE`, `🟡 WARNING`, `🟠 HIGH`, `🔴 CRITICAL`) with live occupancy bar.
  - **Zone Capacity**: Threshold safety limits.
- **Actual vs Predicted Trend Chart**: Powered by Recharts with confidence curves.
- **Recommended Operator Action**: High-priority alert banner detailing instant field actions (*"Increase monitoring; prepare crowd-management teams"* or *"Restrict entry; redirect crowd"*).

### 2. 🗺️ Multi-Zone Safety Grid
- Complete overview of **Zone A (🟢 SAFE)**, **Zone B (🟡 WARNING)**, **Zone C (🟠 HIGH)**, and **Zone D (🔴 CRITICAL)**.
- Click any zone card to inspect localized telemetry, historical trend lines, and trigger direct intervention controls (Broadcast PA, Unlock Relief Turnstiles, Halt Inflow).

### 3. 🎮 Quantum Simulation Lab (Hackathon Demo Center)
Guarantees a flawless live demo even if the webcam or video feed is unavailable:
- **5 Realistic Scenarios**:
  1. *Normal Day*: Steady, moderate crowd dynamics.
  2. *Rapid Inflow / Peak Hours*: Fast arrival surge approaching warning limits.
  3. *Major Festival Day*: Large sustained surge reaching critical capacity.
  4. *Emergency / Sudden Inflow*: Sudden spike in a confined corridor.
  5. *Dispersal & Evacuation*: Rapid outflow post-incident.
- **Interactive Controls**: Play, Pause, Reset, and Speed multiplier (1x, 2x, 4x).
- **Manual 5-Count Injection for Judges**: Type any 5 numbers (e.g. `8, 9, 10, 11, 13`) and click **"Run Quantum Prediction"** to observe real-time quantum Z-expectation transformations and risk classification.
- **Push to Dashboard**: Apply any simulated state directly to the active command center.

### 4. 📹 Live Camera & YOLO Feed
- **Triple Video Inputs**:
  - Synthetic High-Tech CCTV feed with moving pedestrian dots, bounding boxes, and confidence scores (`person 0.94`).
  - Real-time webcam integration (`navigator.mediaDevices.getUserMedia`).
  - Crowd video file uploader (.mp4, .webm).
- **3-Second Sampling Pipeline**: Captures crowd counts every 3 seconds to form the sliding 5-reading temporal buffer (`t-4 → t-3 → t-2 → t-1 → t0`).
- **Privacy Guarantee**: Operates strictly on anonymous bounding boxes. Zero facial recognition or biometric retention.

### 5. 📊 QRC Benchmark & Scientific Analytics
- Side-by-side comparison table between Classical RC and 5-Qubit Quantum RC:
  - **MAE**: 66.08 people (Classical) vs **51.90 people (Quantum)**
  - **MSE**: 4986.58 (Classical) vs **3630.90 (Quantum)**
  - **RMSE**: 70.62 people (Classical) vs **60.26 people (Quantum)**
  - **RMSE Reduction**: **~14.7% vs baseline**
- Includes required presentation disclaimer: *"These are experimental results from the current simulated dataset/prototype. They are not proof that quantum models always outperform classical models."*

### 6. 🚨 Operational Alerts & Incident Response
- Live incident queue with severity filters (`ALL`, `CRITICAL`, `ACTIVE`, `RESOLVED`).
- Operator workflows: Acknowledge alert, Dispatch marshals, Resolve incident.
- Web Audio API synthesizer for critical alarm beeps.

### 7. ℹ️ Methodology & Quantum Circuit Architecture
- Full diagram of the 5-qubit quantum reservoir circuit with $RY(\theta_i)$ rotations, $RZ/RX$ mixing, and nearest-neighbor $CNOT$ entanglement.
- Mathematical explanation of non-linear projection and Ridge Regression readout.

---

## 🔌 Optional Python Backend Integration
CrowdShield runs completely standalone with its embedded in-browser QRC mathematical simulator. When a Python backend is running locally at `http://localhost:8000`, the frontend automatically detects and utilizes the following endpoints:
- `POST /predict` — receives `zone_id` and `last_5_counts`, returns `predicted_crowd`, `risk`, and `recommended_action`.
- `GET /zones` — returns list of active zones and sensor statuses.
- `POST /simulate` — triggers remote scenario generation.
