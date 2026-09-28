/**
 * Comprehensive Mock Data for Logistics Analytics & BI Intelligence
 * Multi-dimensional KPI cubes, lane profitability, OTIF trends, BI reports, and ESG sustainability.
 */

// ── 1. Executive Analytics Summary KPIs ──
export const analyticsSummaryKpis = {
  otifDeliveryPct: 98.4,
  costPerTonKm: 2.34,
  monthlyFreightSpend: '₹ 42.80 Cr',
  spendVsBudgetVariancePct: -1.8, // 1.8% under budget
  fleetAssetUtilizationPct: 88.6,
  emptyMilesReductionPct: 14.2,
  totalNetworkVolumeMt: 48200,
  activeLinehaulCorridors: 18,
  carbonEmissionsMt: 1420.5,
  carbonSavedMt: 312.8,
};

// ── 2. 6-Month Historical OTIF Performance Trend ──
export const monthlyOtifTrends = [
  { month: 'Apr 2026', onTime: 96.8, inFull: 98.2, otif: 95.1, target: 95.0, volumeMt: 41200, spendCr: 36.4 },
  { month: 'May 2026', onTime: 97.2, inFull: 98.6, otif: 95.8, target: 95.0, volumeMt: 43500, spendCr: 38.2 },
  { month: 'Jun 2026', onTime: 97.9, inFull: 99.0, otif: 96.9, target: 95.0, volumeMt: 44800, spendCr: 39.5 },
  { month: 'Jul 2026', onTime: 98.1, inFull: 99.2, otif: 97.3, target: 95.0, volumeMt: 46100, spendCr: 40.8 },
  { month: 'Aug 2026', onTime: 98.6, inFull: 99.4, otif: 98.0, target: 95.0, volumeMt: 47400, spendCr: 41.9 },
  { month: 'Sep 2026', onTime: 98.9, inFull: 99.5, otif: 98.4, target: 95.0, volumeMt: 48200, spendCr: 42.8 },
];

// ── 3. High-Density National Lane Performance Matrix ──
export const lanePerformanceAnalytics = [
  {
    id: 'LANE-01',
    lane: 'Mumbai (Bhiwandi) → Delhi NCR (Bilaspur)',
    distanceKm: 1420,
    monthlyVolumeMt: 8400,
    monthlySpend: 7850000,
    costPerTonKm: 2.18,
    otifPct: 98.8,
    avgTransitHours: 36,
    carrierShare: 'VRL (45%), TCI (35%), Spot (20%)',
    marginHealth: 'Optimal (High Efficiency)',
  },
  {
    id: 'LANE-02',
    lane: 'Pune (Chakan) → Pantnagar Hub',
    distanceKm: 1480,
    monthlyVolumeMt: 6200,
    monthlySpend: 6240000,
    costPerTonKm: 2.24,
    otifPct: 99.1,
    avgTransitHours: 38,
    carrierShare: 'VRL (60%), Safexpress (40%)',
    marginHealth: 'Optimal (High Efficiency)',
  },
  {
    id: 'LANE-03',
    lane: 'Jamshedpur Plant → Mumbai (JNPT Port)',
    distanceKm: 1690,
    monthlyVolumeMt: 9800,
    monthlySpend: 9450000,
    costPerTonKm: 2.12,
    otifPct: 97.6,
    avgTransitHours: 44,
    carrierShare: 'TCI Freight (70%), CJ Darcl (30%)',
    marginHealth: 'Optimal (High Efficiency)',
  },
  {
    id: 'LANE-04',
    lane: 'Bangalore (Nelamangala) → Chennai (Sriperumbudur)',
    distanceKm: 345,
    monthlyVolumeMt: 5400,
    monthlySpend: 3120000,
    costPerTonKm: 2.45,
    otifPct: 99.4,
    avgTransitHours: 8,
    carrierShare: 'Safexpress (55%), Delhivery (45%)',
    marginHealth: 'Optimal (Express Feeder)',
  },
  {
    id: 'LANE-05',
    lane: 'Kanchipuram → Delhi NCR (Active Reefer)',
    distanceKm: 2180,
    monthlyVolumeMt: 2100,
    monthlySpend: 4850000,
    costPerTonKm: 3.10,
    otifPct: 99.6,
    avgTransitHours: 52,
    carrierShare: 'CJ Darcl (50%), VRL Reefer (50%)',
    marginHealth: 'High Value Pharma Cold-Chain',
  },
  {
    id: 'LANE-06',
    lane: 'Ahmedabad (Sanand) → Delhi NCR (Farukhnagar)',
    distanceKm: 920,
    monthlyVolumeMt: 4800,
    monthlySpend: 3950000,
    costPerTonKm: 2.38,
    otifPct: 98.2,
    avgTransitHours: 24,
    carrierShare: 'Delhivery FTL (60%), Gati (40%)',
    marginHealth: 'Optimal (High Efficiency)',
  },
];

// ── 4. Carrier Allocation & Performance Scatter ──
export const carrierAnalyticsScatter = [
  { name: 'VRL Logistics', spendCr: 12.4, placementSla: 98.6, onTimeSla: 98.2, claimsRatio: 0.08, volumeShare: 28 },
  { name: 'TCI Freight', spendCr: 14.8, placementSla: 97.9, onTimeSla: 97.6, claimsRatio: 0.12, volumeShare: 34 },
  { name: 'Safexpress', spendCr: 6.8, placementSla: 99.1, onTimeSla: 98.7, claimsRatio: 0.05, volumeShare: 16 },
  { name: 'Delhivery FTL', spendCr: 4.6, placementSla: 96.4, onTimeSla: 96.9, claimsRatio: 0.14, volumeShare: 11 },
  { name: 'CJ Darcl', spendCr: 2.9, placementSla: 95.2, onTimeSla: 95.8, claimsRatio: 0.18, volumeShare: 7 },
  { name: 'Gati KWE', spendCr: 1.3, placementSla: 94.1, onTimeSla: 94.8, claimsRatio: 0.22, volumeShare: 4 },
];

// ── 5. Enterprise BI Reports Catalog & Pre-Built Queries ──
export const biReportsCatalog = [
  {
    id: 'REP-001',
    title: 'Monthly 3PL Carrier Scorecard & SLA Penalty Report',
    category: 'Carrier Performance',
    frequency: 'Monthly (Automated on 1st)',
    format: 'CSV / PDF / Excel',
    lastRunDate: '2026-09-28 08:30 IST',
    status: 'Ready',
    sampleRowCount: 218,
    description: 'Detailed analysis of carrier placement latency, transit delay penalties, and debit notes.',
    headers: ['Carrier Code', 'Transporter Name', 'Assigned Loads', 'Placement %', 'On-Time %', 'Penalty Debits (₹)', 'Net Score'],
    rows: [
      ['VRL-LOG-01', 'VRL Logistics Limited', '420 Loads', '98.6%', '98.2%', '₹ 12,000', '98.4 (A+)'],
      ['TCI-FRT-02', 'TCI Freight Supply Chain', '540 Loads', '97.9%', '97.6%', '₹ 24,500', '97.8 (A)'],
      ['SAF-EXP-03', 'Safexpress Logistics', '280 Loads', '99.1%', '98.7%', '₹ 4,000', '99.0 (A+)'],
      ['DEL-ENT-04', 'Delhivery Full-Truckload', '190 Loads', '96.4%', '96.9%', '₹ 18,000', '96.6 (B+)'],
      ['CJD-LOG-05', 'CJ Darcl Logistics', '120 Loads', '95.2%', '95.8%', '₹ 16,000', '95.5 (B)'],
    ],
  },
  {
    id: 'REP-002',
    title: 'Lane Cost-to-Serve & Fuel Surcharge (FSC) Exposure',
    category: 'Financial Analytics',
    frequency: 'Weekly (Every Monday)',
    format: 'CSV / Excel',
    lastRunDate: '2026-09-28 06:00 IST',
    status: 'Ready',
    sampleRowCount: 48,
    description: 'Corridor-level cost per ton-km, dynamic diesel escalation absorption, and toll impacts.',
    headers: ['Lane ID', 'Origin → Destination', 'Distance (KM)', 'Total Freight (₹)', 'FSC Component (₹)', 'Cost / Ton-KM'],
    rows: [
      ['LANE-01', 'Mumbai Bhiwandi → Delhi NCR Bilaspur', '1,420 km', '₹ 78,50,000', '₹ 9,42,000 (12%)', '₹ 2.18'],
      ['LANE-02', 'Pune Chakan → Pantnagar Hub', '1,480 km', '₹ 62,40,000', '₹ 7,48,800 (12%)', '₹ 2.24'],
      ['LANE-03', 'Jamshedpur Plant → Mumbai Port', '1,690 km', '₹ 94,50,000', '₹ 12,28,500 (13%)', '₹ 2.12'],
      ['LANE-04', 'Bangalore → Chennai Sriperumbudur', '345 km', '₹ 31,20,000', '₹ 3,12,000 (10%)', '₹ 2.45'],
      ['LANE-05', 'Kanchipuram → Delhi NCR (Reefer)', '2,180 km', '₹ 48,50,000', '₹ 7,27,500 (15%)', '₹ 3.10'],
    ],
  },
  {
    id: 'REP-003',
    title: 'Customer On-Time In-Full (OTIF) Fulfillment Audit',
    category: 'Customer SLA',
    frequency: 'Monthly (Automated)',
    format: 'PDF / CSV',
    lastRunDate: '2026-09-27 18:00 IST',
    status: 'Ready',
    sampleRowCount: 142,
    description: 'Enterprise B2B shipper fulfillment SLA scorecard with breach root-cause classification.',
    headers: ['Customer ID', 'Shipper Account', 'Total Orders', 'On-Time %', 'In-Full %', 'OTIF Score', 'SLA Status'],
    rows: [
      ['CUST-001', 'Tata Motors Limited', '280 Orders', '99.2%', '99.8%', '99.1%', 'Exceeds SLA (Platinum)'],
      ['CUST-002', 'Reliance Retail Ventures', '410 Orders', '98.5%', '99.5%', '98.4%', 'Exceeds SLA (Platinum)'],
      ['CUST-003', 'Havells India Limited', '195 Orders', '97.9%', '99.0%', '97.9%', 'Target Met (Gold)'],
      ['CUST-004', 'Sun Pharma Industries', '140 Orders', '99.8%', '100%', '99.8%', 'Exceeds SLA (Platinum)'],
      ['CUST-005', 'Foxconn International SEZ', '180 Orders', '99.4%', '99.8%', '99.4%', 'Exceeds SLA (Platinum)'],
    ],
  },
  {
    id: 'REP-004',
    title: 'Warehouse Dock Turnaround & Detention Charge Audit',
    category: 'Facility Operations',
    frequency: 'Daily (Morning 07:00 IST)',
    format: 'CSV / Excel',
    lastRunDate: '2026-09-28 07:00 IST',
    status: 'Ready',
    sampleRowCount: 84,
    description: 'Dwell time telemetry at origin/destination hubs and detention cost containment analysis.',
    headers: ['Facility Hub', 'Vehicles Serviced', 'Avg Dock Dwell', 'Free Hours Limit', 'Detention Incurred (₹)', 'Gate Compliance'],
    rows: [
      ['Bhiwandi Mega-Hub #1', '84 Trucks', '2.8 Hours', '4.0 Hours', '₹ 0', '98.2% on Schedule'],
      ['Nelamangala DC (Bangalore)', '62 Trucks', '3.1 Hours', '4.0 Hours', '₹ 0', '97.5% on Schedule'],
      ['Bilaspur Gateway (Delhi NCR)', '96 Trucks', '4.4 Hours', '4.0 Hours', '₹ 4,500', '91.2% on Schedule'],
      ['Chakan Auto Hub (Pune)', '45 Trucks', '2.4 Hours', '4.0 Hours', '₹ 0', '99.1% on Schedule'],
    ],
  },
];

// ── 6. ESG & Scope 3 Decarbonization Telemetry ──
export const sustainabilityAnalytics = {
  totalScope3EmissionsMt: 1420.5,
  co2SavedVsUnoptimizedRoadMt: 312.8,
  railMultimodalSplitPct: 34.8,
  greenScoreRating: 'A+ (Exceeds GLEC 2026 Standards)',
  electricFleetTransitionPct: 18.2,
  emptyKilometersSavedKm: 84200,
  modesBreakdown: [
    { mode: 'Electric DFC Rail Corridors', sharePct: 35, emissionsMtPer1000Tkm: 18.2, co2Intensity: 'Ultra-Low' },
    { mode: 'Euro-VI Clean Multi-Axle Trucks', sharePct: 45, emissionsMtPer1000Tkm: 48.5, co2Intensity: 'Medium' },
    { mode: 'CNG Medium Commercial Vehicles', sharePct: 15, emissionsMtPer1000Tkm: 38.0, co2Intensity: 'Low' },
    { mode: 'Active Insulated Reefer Linehaul', sharePct: 5, emissionsMtPer1000Tkm: 64.0, co2Intensity: 'Controlled' },
  ],
  monthlyEmissionsTrend: [
    { month: 'Apr 2026', totalCo2: 1580, savedCo2: 240, railPct: 28 },
    { month: 'May 2026', totalCo2: 1540, savedCo2: 265, railPct: 30 },
    { month: 'Jun 2026', totalCo2: 1490, savedCo2: 285, railPct: 32 },
    { month: 'Jul 2026', totalCo2: 1460, savedCo2: 298, railPct: 33 },
    { month: 'Aug 2026', totalCo2: 1435, savedCo2: 308, railPct: 34 },
    { month: 'Sep 2026', totalCo2: 1420, savedCo2: 312, railPct: 35 },
  ],
  offsetInitiatives: [
    { name: 'Western Ghats Afforestation Project (Gold Standard)', offsetMt: 500, status: 'Verified & Retired', certId: 'GS-2026-IND-881' },
    { name: 'Rajasthan Solar Micro-Grid Clean Energy Credits', offsetMt: 450, status: 'Verified & Retired', certId: 'VCS-2026-RAJ-412' },
    { name: 'National Green Corridor DFC Rail Electrification', offsetMt: 470, status: 'In Escrow (Q3 Claim)', certId: 'DFC-2026-IR-904' },
  ],
};
