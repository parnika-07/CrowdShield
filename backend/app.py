from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from camera_service import process_video
import numpy as np
 
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector, SparsePauliOp
 
from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import Ridge
 
 
# ============================================================
# CROWD SHIELD BACKEND
# FastAPI + Quantum Reservoir Computing
# ============================================================
 
app = FastAPI(title="CrowdShield API")
 
 
# ============================================================
# CORS
# Allows React frontend to communicate with this backend
# ============================================================
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
 
# ============================================================
# REQUEST FORMAT
# ============================================================
 
class CrowdRequest(BaseModel):
    zone_id: str
    last_5_counts: list[float]
    capacity: int
class CameraRequest(BaseModel):
    zone_id: str = "A"
    video_path: str = ""
    capacity: int = 12
 
# ============================================================
# CAMERA DEMO DATA
# These are the crowd readings obtained from our YOLO video.
# ============================================================
 
camera_counts = np.array([
    5, 7, 3, 7, 6, 5, 6, 4, 7, 5,
    5, 5, 10, 13, 12, 8, 5, 10, 8, 8,
    9, 15, 8, 10, 9, 5, 8, 6, 6, 9,
    7, 9, 7, 6, 7, 10, 10, 8, 9, 11,
    10, 9, 9
])
 
 
# ============================================================
# CREATE 5-READING TIME-SERIES WINDOWS
#
# Example:
#
# [5,7,3,7,6] -> predict 5
# [7,3,7,6,5] -> predict 6
# etc.
# ============================================================
 
X_camera = []
y_camera = []
 
for i in range(len(camera_counts) - 5):
 
    X_camera.append(
        camera_counts[i:i + 5]
    )
 
    y_camera.append(
        camera_counts[i + 5]
    )
 
 
X_camera = np.array(X_camera)
y_camera = np.array(y_camera)
 
 
# ============================================================
# NORMALIZATION
# ============================================================
 
camera_scaler = MinMaxScaler()
 
 
X_camera_scaled = camera_scaler.fit_transform(
    X_camera.reshape(-1, 1)
).reshape(X_camera.shape)
 
 
y_camera_scaled = camera_scaler.transform(
    y_camera.reshape(-1, 1)
).flatten()
 
 
# ============================================================
# QUANTUM RESERVOIR
# ============================================================
 
n_qubits = 5
 
 
def quantum_reservoir_features(sequence):
 
    # Create a 5-qubit quantum circuit
    qc = QuantumCircuit(n_qubits)
 
 
    # --------------------------------------------------------
    # Encode the 5 crowd readings using RY rotations
    # --------------------------------------------------------
 
    for i, value in enumerate(sequence):
 
        qc.ry(
            value * np.pi,
            i
        )
 
 
    # --------------------------------------------------------
    # Quantum reservoir dynamics
    # --------------------------------------------------------
 
    for i in range(n_qubits):
 
        qc.rz(
            0.7,
            i
        )
 
        qc.rx(
            0.4,
            i
        )
 
 
    # --------------------------------------------------------
    # Entangle neighboring qubits
    # --------------------------------------------------------
 
    for i in range(n_qubits - 1):
 
        qc.cx(
            i,
            i + 1
        )
 
 
    # --------------------------------------------------------
    # Simulate quantum state
    # --------------------------------------------------------
 
    state = Statevector.from_instruction(qc)
 
 
    # --------------------------------------------------------
    # Extract Z expectation values
    # These become our quantum features.
    # --------------------------------------------------------
 
    features = []
 
 
    for i in range(n_qubits):
 
        pauli_string = ["I"] * n_qubits
 
        pauli_string[
            n_qubits - 1 - i
        ] = "Z"
 
 
        observable = SparsePauliOp(
            "".join(pauli_string)
        )
 
 
        expectation = np.real(
            state.expectation_value(
                observable
            )
        )
 
 
        features.append(
            expectation
        )
 
 
    return features
 
 
# ============================================================
# GENERATE QUANTUM FEATURES FOR TRAINING DATA
# ============================================================
 
camera_quantum_features = np.array([
 
    quantum_reservoir_features(
        sequence
    )
 
    for sequence in X_camera_scaled
 
])
 
 
# ============================================================
# RIDGE REGRESSION READOUT
# ============================================================
 
quantum_readout = Ridge(
    alpha=0.1
)
 
 
quantum_readout.fit(
 
    camera_quantum_features,
 
    y_camera_scaled
 
)
 
 
# ============================================================
# RISK ENGINE
# ============================================================
 
def get_risk_and_action(
    predicted_crowd,
    capacity
):
 
    # Prevent division by zero
    if capacity <= 0:
 
        return (
            "UNKNOWN",
            "Invalid capacity value."
        )
 
 
    occupancy = (
        predicted_crowd / capacity
    )
 
 
    # --------------------------------------------------------
    # SAFE
    # --------------------------------------------------------
 
    if occupancy < 0.60:
 
        risk = "SAFE"
 
        action = (
            "Normal monitoring. "
            "No immediate action required."
        )
 
 
    # --------------------------------------------------------
    # WARNING
    # --------------------------------------------------------
 
    elif occupancy < 0.80:
 
        risk = "WARNING"
 
        action = (
            "Increase monitoring and "
            "prepare crowd management teams."
        )
 
 
    # --------------------------------------------------------
    # HIGH
    # --------------------------------------------------------
 
    elif occupancy <= 1.00:
 
        risk = "HIGH"
 
        action = (
            "Control entry and "
            "prepare alternate routes."
        )
 
 
    # --------------------------------------------------------
    # CRITICAL
    # --------------------------------------------------------
 
    else:
 
        risk = "CRITICAL"
 
        action = (
            "Restrict entry, redirect the crowd, "
            "and alert authorities."
        )
 
 
    return risk, action
 
 
# ============================================================
# HOME ENDPOINT
# ============================================================
 
@app.get("/")
def home():
 
    return {
 
        "system": "CrowdShield",
 
        "status": "online",
 
        "model": "quantum_reservoir"
 
    }

 
# ============================================================
# CROWD PREDICTION HELPER
# ============================================================

def predict_crowd_risk(
    last_5_counts,
    capacity
):
    sequence = np.array(
        last_5_counts,
        dtype=float
    )

    sequence_scaled = camera_scaler.transform(
        sequence.reshape(-1, 1)
    ).flatten()

    quantum_features = np.array(
        quantum_reservoir_features(
            sequence_scaled
        )
    ).reshape(
        1,
        -1
    )

    predicted_scaled = quantum_readout.predict(
        quantum_features
    )[0]

    predicted_crowd = camera_scaler.inverse_transform(
        [[predicted_scaled]]
    )[0][0]

    predicted_crowd = max(
        0,
        round(predicted_crowd)
    )

    risk, action = get_risk_and_action(
        predicted_crowd,
        capacity
    )

    return int(predicted_crowd), risk, action


# ============================================================
# PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict(
    request: CrowdRequest
):
    if len(request.last_5_counts) != 5:
        return {
            "error": "Exactly 5 crowd readings are required."
        }

    predicted_crowd, risk, action = predict_crowd_risk(
        request.last_5_counts,
        request.capacity
    )

    if request.capacity > 0:
        occupancy_percent = round(
            (predicted_crowd / request.capacity) * 100
        )
    else:
        occupancy_percent = 0

    return {
        "zone_id": request.zone_id,
        "current_crowd": int(request.last_5_counts[-1]),
        "last_5_counts": [float(x) for x in request.last_5_counts],
        "predicted_crowd": int(predicted_crowd),
        "capacity": int(request.capacity),
        "occupancy_percent": int(occupancy_percent),
        "risk": risk,
        "recommended_action": action,
        "model": "quantum_reservoir",
        "model_status": "active"
    }


# ============================================================
# CAMERA PROCESSING ENDPOINT
# ============================================================

@app.post("/camera/process")
def process_camera(request: CameraRequest):
    counts = process_video(request.video_path)

    if len(counts) < 5:
        return {
            "error": "Not enough crowd readings for prediction."
        }

    last_5_counts = counts[-5:]

    predicted_crowd, risk, action = predict_crowd_risk(
        last_5_counts,
        request.capacity
    )

    occupancy_percent = (
        round((predicted_crowd / request.capacity) * 100)
        if request.capacity > 0
        else 0
    )

    return {
        "zone_id": request.zone_id,
        "current_crowd": int(counts[-1]),
        "counts": [int(x) for x in counts],
        "last_5_counts": [int(x) for x in last_5_counts],
        "predicted_crowd": int(predicted_crowd),
        "capacity": int(request.capacity),
        "occupancy_percent": int(occupancy_percent),
        "risk": risk,
        "recommended_action": action,
        "model": "quantum_reservoir",
        "camera_model": "YOLO"
    }