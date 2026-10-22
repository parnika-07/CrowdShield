export const INITIAL_ZONES_DEMO = [
  {
    id: 'A',
    name: 'Zone A',
    current_crowd: 9,
    predicted_crowd: 11,
    capacity: 12,
    occupancy_percent: 92,
    risk: 'WARNING',
    recommended_action: 'Increase monitoring and prepare crowd management teams.',
    last_5_counts: [7, 8, 9, 10, 9],
    camera_status: 'online',
    sensor_id: 'CAM-01-ENTRANCE',
    history: [
      { time: '14:20', actual: 7, predicted: 8 },
      { time: '14:22', actual: 8, predicted: 9 },
      { time: '14:24', actual: 8, predicted: 10 },
      { time: '14:26', actual: 9, predicted: 10 },
      { time: '14:28', actual: 9, predicted: 11 },
    ]
  },
  {
    id: 'B',
    name: 'Zone B',
    current_crowd: 4,
    predicted_crowd: 6,
    capacity: 12,
    occupancy_percent: 50,
    risk: 'SAFE',
    recommended_action: 'Normal monitoring. Flow within safe zone thresholds.',
    last_5_counts: [3, 4, 4, 5, 4],
    camera_status: 'online',
    sensor_id: 'CAM-02-NORTH',
    history: [
      { time: '14:20', actual: 3, predicted: 4 },
      { time: '14:22', actual: 4, predicted: 5 },
      { time: '14:24', actual: 4, predicted: 5 },
      { time: '14:26', actual: 4, predicted: 6 },
      { time: '14:28', actual: 4, predicted: 6 },
    ]
  },
  {
    id: 'C',
    name: 'Zone C',
    current_crowd: 7,
    predicted_crowd: 8,
    capacity: 12,
    occupancy_percent: 67,
    risk: 'SAFE',
    recommended_action: 'Normal monitoring. All parameters optimal.',
    last_5_counts: [5, 6, 6, 7, 7],
    camera_status: 'online',
    sensor_id: 'CAM-03-ESCALATOR',
    history: [
      { time: '14:20', actual: 5, predicted: 6 },
      { time: '14:22', actual: 6, predicted: 7 },
      { time: '14:24', actual: 6, predicted: 7 },
      { time: '14:26', actual: 7, predicted: 8 },
      { time: '14:28', actual: 7, predicted: 8 },
    ]
  },
  {
    id: 'D',
    name: 'Zone D — Grand Stage Exit',
    current_crowd: 11,
    predicted_crowd: 14,
    capacity: 12,
    occupancy_percent: 117,
    risk: 'CRITICAL',
    recommended_action: 'Restrict entry and redirect crowd. Activate emergency protocols.',
    last_5_counts: [7, 8, 9, 10, 11],
    camera_status: 'online',
    sensor_id: 'CAM-04-STAGE-EXIT',
    history: [
      { time: '14:20', actual: 7, predicted: 9 },
      { time: '14:22', actual: 8, predicted: 10 },
      { time: '14:24', actual: 9, predicted: 11 },
      { time: '14:26', actual: 10, predicted: 12 },
      { time: '14:28', actual: 11, predicted: 14 },
    ]
  }
];

export const INITIAL_ZONES_VENUE = [
  {
    id: 'A',
    name: 'Zone A — Main Concourse',
    current_crowd: 650,
    predicted_crowd: 720,
    capacity: 1200,
    occupancy_percent: 60,
    risk: 'SAFE',
    recommended_action: 'Normal monitoring.',
    last_5_counts: [520, 560, 600, 630, 650],
    camera_status: 'online',
    sensor_id: 'YOLO-CAM-01',
    history: [
      { time: '19:30', actual: 520, predicted: 540 },
      { time: '19:32', actual: 560, predicted: 590 },
      { time: '19:34', actual: 600, predicted: 640 },
      { time: '19:36', actual: 630, predicted: 670 },
      { time: '19:38', actual: 650, predicted: 720 },
    ]
  },
  {
    id: 'B',
    name: 'Zone B — North Pavilion Gate',
    current_crowd: 980,
    predicted_crowd: 1120,
    capacity: 1200,
    occupancy_percent: 93,
    risk: 'WARNING',
    recommended_action: 'Increase monitoring; prepare crowd-management teams.',
    last_5_counts: [750, 810, 890, 940, 980],
    camera_status: 'online',
    sensor_id: 'YOLO-CAM-02',
    history: [
      { time: '19:30', actual: 750, predicted: 780 },
      { time: '19:32', actual: 810, predicted: 860 },
      { time: '19:34', actual: 890, predicted: 940 },
      { time: '19:36', actual: 940, predicted: 1020 },
      { time: '19:38', actual: 980, predicted: 1120 },
    ]
  },
  {
    id: 'C',
    name: 'Zone C — Eastern Transit Corridor',
    current_crowd: 1380,
    predicted_crowd: 1540,
    capacity: 1500,
    occupancy_percent: 103,
    risk: 'HIGH',
    recommended_action: 'Control entry; deploy additional staff; prepare alternate routes.',
    last_5_counts: [1100, 1180, 1260, 1310, 1380],
    camera_status: 'online',
    sensor_id: 'YOLO-CAM-03',
    history: [
      { time: '19:30', actual: 1100, predicted: 1140 },
      { time: '19:32', actual: 1180, predicted: 1230 },
      { time: '19:34', actual: 1260, predicted: 1320 },
      { time: '19:36', actual: 1310, predicted: 1410 },
      { time: '19:38', actual: 1380, predicted: 1540 },
    ]
  },
  {
    id: 'D',
    name: 'Zone D — Main Stadium Arena',
    current_crowd: 16500,
    predicted_crowd: 21000,
    capacity: 20000,
    occupancy_percent: 105,
    risk: 'CRITICAL',
    recommended_action: 'Restrict entry, redirect incoming crowd, deploy emergency personnel, and alert authorities.',
    last_5_counts: [12000, 14000, 15000, 16000, 16500],
    camera_status: 'online',
    sensor_id: 'YOLO-CAM-04-STADIUM',
    history: [
      { time: '19:30', actual: 12000, predicted: 13500 },
      { time: '19:32', actual: 14000, predicted: 15800 },
      { time: '19:34', actual: 15000, predicted: 17200 },
      { time: '19:36', actual: 16000, predicted: 18900 },
      { time: '19:38', actual: 16500, predicted: 21000 },
    ]
  }
];

export const SIMULATION_SCENARIOS = {
  normal_growth: {
    id: 'normal_growth',
    name: 'Normal Day',
    description: 'Slow, steady crowd changes with moderate fluctuations within safe limits.',
    badge: 'Steady',
    color: 'emerald',
    demoSteps: [
      [3, 4, 4, 5, 6],
      [4, 4, 5, 6, 6],
      [4, 5, 6, 6, 7],
      [5, 6, 6, 7, 7],
      [6, 6, 7, 7, 8],
    ],
    venueSteps: [
      [420, 450, 480, 510, 540],
      [450, 480, 510, 540, 570],
      [480, 510, 540, 570, 610],
      [510, 540, 570, 610, 640],
      [540, 570, 610, 640, 670],
    ]
  },
  rapid_inflow: {
    id: 'rapid_inflow',
    name: 'Rapid Inflow / Peak Hours',
    description: 'Faster increase during busy arrival or rush periods approaching warning limits.',
    badge: 'Accelerating',
    color: 'amber',
    demoSteps: [
      [4, 5, 6, 7, 8],
      [5, 6, 7, 8, 9],
      [6, 7, 8, 9, 10],
      [7, 8, 9, 10, 11],
      [8, 9, 10, 11, 12],
    ],
    venueSteps: [
      [720, 780, 860, 930, 990],
      [780, 860, 930, 990, 1060],
      [860, 930, 990, 1060, 1140],
      [930, 990, 1060, 1140, 1230],
      [990, 1060, 1140, 1230, 1310],
    ]
  },
  festival_peak: {
    id: 'festival_peak',
    name: 'Major Festival Day',
    description: 'Large sustained crowd surge pushing density toward critical safety margins.',
    badge: 'High Surge',
    color: 'orange',
    demoSteps: [
      [6, 7, 8, 9, 10],
      [7, 8, 9, 10, 11],
      [8, 9, 10, 11, 12],
      [9, 10, 11, 12, 13],
      [10, 11, 12, 13, 14],
    ],
    venueSteps: [
      [11000, 12500, 13800, 15000, 16200],
      [12500, 13800, 15000, 16200, 17500],
      [13800, 15000, 16200, 17500, 18900],
      [15000, 16200, 17500, 18900, 20200],
      [16200, 17500, 18900, 20200, 21800],
    ]
  },
  emergency_surge: {
    id: 'emergency_surge',
    name: 'Emergency / Sudden Inflow',
    description: 'Abrupt influx into a confined corridor or gate requiring immediate restriction.',
    badge: 'Critical Spike',
    color: 'red',
    demoSteps: [
      [5, 6, 8, 10, 12],
      [6, 8, 10, 12, 14],
      [8, 10, 12, 14, 16],
      [10, 12, 14, 16, 18],
      [12, 14, 16, 18, 20],
    ],
    venueSteps: [
      [900, 1100, 1350, 1620, 1950],
      [1100, 1350, 1620, 1950, 2300],
      [1350, 1620, 1950, 2300, 2750],
      [1620, 1950, 2300, 2750, 3200],
      [1950, 2300, 2750, 3200, 3700],
    ]
  },
  dispersal: {
    id: 'dispersal',
    name: 'Dispersal & Evacuation',
    description: 'Crowd steadily decreases following preventive guidance or event completion.',
    badge: 'Clearing',
    color: 'cyan',
    demoSteps: [
      [13, 12, 10, 9, 7],
      [12, 10, 9, 7, 5],
      [10, 9, 7, 5, 4],
      [9, 7, 5, 4, 3],
      [7, 5, 4, 3, 2],
    ],
    venueSteps: [
      [1800, 1650, 1450, 1200, 980],
      [1650, 1450, 1200, 980, 810],
      [1450, 1200, 980, 810, 650],
      [1200, 980, 810, 650, 520],
      [980, 810, 650, 520, 410],
    ]
  }
};

export const QUANTUM_BENCHMARK_METRICS = [
  { metric: 'MAE (Mean Absolute Error)', classical: '66.08 people', quantum: '51.90 people', diff: '-21.5%' },
  { metric: 'MSE (Mean Squared Error)', classical: '4986.58', quantum: '3630.90', diff: '-27.2%' },
  { metric: 'RMSE (Root Mean Square Error)', classical: '70.62 people', quantum: '60.26 people', diff: '-14.7%' },
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-1092',
    timestamp: 'Just now',
    zone: 'Zone D — Main Arena',
    severity: 'CRITICAL',
    predicted_crowd: 14,
    capacity: 12,
    recommended_action: 'Restrict entry; redirect crowd; activate emergency procedures; alert authorities.',
    status: 'active'
  },
  {
    id: 'ALT-1089',
    timestamp: '4 mins ago',
    zone: 'Zone C — Food Court Escalators',
    severity: 'HIGH',
    predicted_crowd: 13,
    capacity: 12,
    recommended_action: 'Control entry; deploy additional staff; prepare alternate routes.',
    status: 'acknowledged'
  },
  {
    id: 'ALT-1084',
    timestamp: '12 mins ago',
    zone: 'Zone B — North Gate',
    severity: 'WARNING',
    predicted_crowd: 11,
    capacity: 12,
    recommended_action: 'Increase monitoring; prepare crowd-management teams.',
    status: 'resolved'
  }
];
