/**
 * LOGISTICSHUB — MOCK DATA: Load Building & Consolidation
 * Source: COMPLETE_UI_DESIGN_PROMPT.md — SECTION 7 (Load Building & Consolidation)
 */

export const loadBuilderStats = {
  totalReadyItems: 45,
  totalWeightKg: '4,200 kg',
  totalVolumeCbm: '15.2 Cbm',
  weightUtilPct: 84.0,
  volumeUtilPct: 76.0,
  palletCount: 12,
  maxPallets: 14,
  estimatedSavings: '₹34,500',
  frontAxlePct: 44,
  rearAxlePct: 56,
};

export const defaultCargoItems = [
  {
    id: 'CRG-101',
    shipmentId: 'SHP-100245',
    customer: 'ABC Logistics',
    destination: 'Delhi Hub',
    description: 'Electronics & Spare Parts',
    weight: 420,
    volume: 2.1,
    palletCount: 2,
    stackable: true,
    isHazmat: false,
    isFragile: true,
    isRefrigerated: false,
    loaded: false,
    color: '#3b82f6'
  },
  {
    id: 'CRG-102',
    shipmentId: 'SHP-100246',
    customer: 'Tata Steel',
    destination: 'Bangalore Hub',
    description: 'Industrial Fasteners & Hardware',
    weight: 1200,
    volume: 4.8,
    palletCount: 4,
    stackable: true,
    isHazmat: false,
    isFragile: false,
    isRefrigerated: false,
    loaded: false,
    color: '#10b981'
  },
  {
    id: 'CRG-103',
    shipmentId: 'SHP-100247',
    customer: 'Reliance Retail',
    destination: 'Delhi Hub',
    description: 'Apparel & Garment Boxes',
    weight: 580,
    volume: 3.4,
    palletCount: 3,
    stackable: true,
    isHazmat: false,
    isFragile: false,
    isRefrigerated: false,
    loaded: false,
    color: '#f59e0b'
  },
  {
    id: 'CRG-104',
    shipmentId: 'SHP-100248',
    customer: 'Kolkata Heavy Eng',
    destination: 'Hyderabad Hub',
    description: 'Chemical Drums & Solvents',
    weight: 560,
    volume: 3.2,
    palletCount: 2,
    stackable: false,
    isHazmat: true,
    isFragile: true,
    isRefrigerated: false,
    loaded: false,
    color: '#ef4444'
  },
  {
    id: 'CRG-105',
    shipmentId: 'SHP-100249',
    customer: 'Surat Textile Mills',
    destination: 'Mumbai Nhava Sheva',
    description: 'High-Density Yarn Rolls',
    weight: 780,
    volume: 1.8,
    palletCount: 2,
    stackable: true,
    isHazmat: false,
    isFragile: false,
    isRefrigerated: false,
    loaded: false,
    color: '#8b5cf6'
  },
  {
    id: 'CRG-106',
    shipmentId: 'SHP-100250',
    customer: 'Apollo Pharma',
    destination: 'Delhi Hub',
    description: 'Vaccines & Cold Storage Meds',
    weight: 340,
    volume: 1.5,
    palletCount: 1,
    stackable: false,
    isHazmat: false,
    isFragile: true,
    isRefrigerated: true,
    loaded: false,
    color: '#06b6d4'
  }
];

export const readyCargoList = defaultCargoItems;

export const defaultVehicleSpecs = {
  id: 'VEH-0045',
  name: 'Multi-Axle Container (32ft)',
  maxWeightKg: 12000,
  maxVolumeM3: 40.0,
  totalSlots: 10,
  lengthMeters: 9.75,
  widthMeters: 2.44,
  heightMeters: 2.59
};

export const availableVehicles = [
  defaultVehicleSpecs,
  {
    id: 'VEH-0089',
    name: 'Heavy Truck (20ft Container)',
    maxWeightKg: 6000,
    maxVolumeM3: 20.0,
    totalSlots: 6,
    lengthMeters: 6.1,
    widthMeters: 2.44,
    heightMeters: 2.59
  }
];

export const initialPalletSlots = [
  { id: 'slot-1', position: 'Row 1 Left (Front)', item: null },
  { id: 'slot-2', position: 'Row 1 Right (Front)', item: null },
  { id: 'slot-3', position: 'Row 2 Left', item: null },
  { id: 'slot-4', position: 'Row 2 Right', item: null },
  { id: 'slot-5', position: 'Row 3 Left (Mid)', item: null },
  { id: 'slot-6', position: 'Row 3 Right (Mid)', item: null },
  { id: 'slot-7', position: 'Row 4 Left', item: null },
  { id: 'slot-8', position: 'Row 4 Right', item: null },
  { id: 'slot-9', position: 'Row 5 Left (Rear)', item: null },
  { id: 'slot-10', position: 'Row 5 Right (Rear)', item: null }
];

export const constraintRules = [
  { id: 'r1', name: 'Axle Weight Limit (Max 55% Rear)', detail: 'Front/Rear balance safe', status: 'pass' },
  { id: 'r2', name: 'Hazmat Segregation Rule', detail: 'Class 3 & Class 8 separated by 2m', status: 'pass' },
  { id: 'r3', name: 'LIFO Discharge Priority', detail: 'Delhi Hub loaded near rear doors', status: 'pass' },
  { id: 'r4', name: 'Center of Gravity Height', detail: 'Vertical CoG within safety threshold', status: 'pass' },
  { id: 'r5', name: 'Maximum Stack Height (2.2m)', detail: 'Heavy items positioned at bottom level', status: 'pass' }
];

export const consolidationOpportunities = {
  destination: [
    { id: 'OPP-101', cluster: 'Delhi NCR Hub (North Zone)', shipmentCount: 4, shipments: ['SHP-100245', 'SHP-100247', 'SHP-100250'], totalWeightKg: 4250, totalVolumeM3: 18.2, savings: 4850, efficiency: '94% Full' },
    { id: 'OPP-102', cluster: 'Bangalore Industrial Corridor', shipmentCount: 3, shipments: ['SHP-100246', 'SHP-100252'], totalWeightKg: 3800, totalVolumeM3: 14.5, savings: 3200, efficiency: '88% Full' },
    { id: 'OPP-103', cluster: 'Nhava Sheva Port Zone', shipmentCount: 5, shipments: ['SHP-100249', 'SHP-100255'], totalWeightKg: 5100, totalVolumeM3: 22.0, savings: 6800, efficiency: '97% Full' }
  ],
  carrier: [
    { id: 'OPP-201', carrier: 'Express Freight Line Pool', shipmentCount: 6, shipmentIds: ['SHP-100245', 'SHP-100246'], totalWeightKg: 6200, totalVolumeM3: 25.0, savings: 5400, efficiency: '91% Full' },
    { id: 'OPP-202', carrier: 'BlueDart Logistics Consolidated Run', shipmentCount: 4, shipmentIds: ['SHP-100247', 'SHP-100249'], totalWeightKg: 4100, totalVolumeM3: 16.8, savings: 3900, efficiency: '85% Full' }
  ],
  timeWindow: [
    { id: 'OPP-301', deliveryWindow: 'Morning Dispatch Window (06:00 - 12:00)', shipmentCount: 8, shipmentIds: ['SHP-100245', 'SHP-100247', 'SHP-100250'], totalWeightKg: 7800, totalVolumeM3: 31.0, savings: 7200, efficiency: '95% Full' },
    { id: 'OPP-302', deliveryWindow: 'Evening Multi-Drop Run (16:00 - 22:00)', shipmentCount: 5, shipmentIds: ['SHP-100246', 'SHP-100248'], totalWeightKg: 4900, totalVolumeM3: 19.5, savings: 4100, efficiency: '89% Full' }
  ],
  lane: [
    { id: 'OPP-401', lane: 'Mumbai NH8 → Delhi Industrial Trunk', shipmentCount: 9, shipmentIds: ['SHP-100245', 'SHP-100247', 'SHP-100250'], totalWeightKg: 9400, totalVolumeM3: 38.0, savings: 8900, efficiency: '98% Full' },
    { id: 'OPP-402', lane: 'Pune MIDC → Bangalore Electronic City', shipmentCount: 4, shipmentIds: ['SHP-100246', 'SHP-100252'], totalWeightKg: 4200, totalVolumeM3: 17.2, savings: 3600, efficiency: '86% Full' }
  ]
};
