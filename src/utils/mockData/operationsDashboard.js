/**
 * LOGISTICSHUB — MOCK DATA: Operations Dashboard
 * Source: COMPLETE_UI_DESIGN_PROMPT.md — SECTION 3 (Operations Dashboard)
 */

/* ─── TOP ROW KPIs ─── */
export const opsKPIs = {
  activeShipments: {
    value: 567,
    subtitle: 'In Transit',
    change: '+23 from yesterday',
    changeType: 'up',
  },
  pendingOrders: {
    value: 89,
    subtitle: 'Awaiting Planning',
    change: '12 high priority',
    changeType: 'warning',
  },
  fleetUtilization: {
    value: 82,
    target: 85,
    subtitle: 'Target: 85%',
    change: '-3% vs target',
    changeType: 'down',
  },
  pendingExceptions: {
    value: 12,
    subtitle: 'Unassigned',
    change: '3 critical',
    changeType: 'danger',
  },
};

/* ─── FLEET CAPACITY (stacked bar) ─── */
export const fleetCapacityData = [
  { type: 'Trucks',   full: 45, high: 38, medium: 22, low: 15 },
  { type: 'Vans',     full: 28, high: 24, medium: 18, low: 10 },
  { type: 'Bikes',    full: 12, high: 10, medium: 8,  low: 5  },
  { type: 'Trailers', full: 8,  high: 6,  medium: 4,  low: 2  },
];

export const fleetCapacityColors = {
  full:   '#27AE60',  // Full (100%)
  high:   '#3498DB',  // 75–99%
  medium: '#FF9800',  // 50–74%
  low:    '#E74C3C',  // <50%
};

/* ─── TRIP STATUS DISTRIBUTION ─── */
export const tripStatusData = [
  { label: 'Ready to Dispatch', count: 45,  color: '#0066CC', icon: 'Clock' },
  { label: 'Dispatched',        count: 120, color: '#17A2B8', icon: 'Send' },
  { label: 'In Transit',        count: 234, color: '#2C3E50', icon: 'Truck' },
  { label: 'Delivered',         count: 456, color: '#27AE60', icon: 'CheckCircle' },
];
export const tripStatusTotal = tripStatusData.reduce((s, t) => s + t.count, 0); // 855

/* ─── DOCK UTILIZATION ─── */
export const dockUtilizationData = [
  { dock: 'Dock 1 — Gate A', used: 80, available: 20, appointments: 8,  total: 10 },
  { dock: 'Dock 2 — Gate B', used: 70, available: 30, appointments: 7,  total: 10 },
  { dock: 'Dock 3 — Gate C', used: 60, available: 40, appointments: 6,  total: 10 },
  { dock: 'Dock 4 — Gate D', used: 40, available: 60, appointments: 4,  total: 10 },
  { dock: 'Dock 5 — Gate E', used: 90, available: 10, appointments: 9,  total: 10 },
];

/* ─── URGENT ACTIONS ─── */
export const urgentActions = [
  {
    id: 'ua-1',
    title: 'Assign 5 pending loads',
    description: '5 shipments awaiting vehicle & driver assignment',
    severity: 'high',
    count: 5,
    action: 'Assign Now',
    path: '/planning',
  },
  {
    id: 'ua-2',
    title: 'Review 3 failed deliveries',
    description: 'Delivery attempts failed — customer re-scheduling required',
    severity: 'critical',
    count: 3,
    action: 'Review',
    path: '/shipments',
  },
  {
    id: 'ua-3',
    title: 'Approve 2 pending invoices',
    description: 'Carrier invoices awaiting your approval for payment',
    severity: 'medium',
    count: 2,
    action: 'Approve',
    path: '/finance/invoices',
  },
  {
    id: 'ua-4',
    title: 'Update 4 overdue ETAs',
    description: 'Customer notifications not yet sent for delayed shipments',
    severity: 'high',
    count: 4,
    action: 'Update',
    path: '/tracking/eta',
  },
];

/* ─── NEXT 24 HOURS TIMELINE ─── */
export const next24HoursEvents = [
  { time: '08:00', event: 'Dock Loading — TRP-0012', location: 'Mumbai WH — Dock 1',  type: 'loading',  status: 'upcoming'  },
  { time: '08:45', event: 'Dispatch — TRIP-0045',    location: 'Mumbai → Pune',        type: 'dispatch', status: 'upcoming'  },
  { time: '09:30', event: 'Carrier Pickup — SHP-12349', location: 'Surat Facility',   type: 'pickup',   status: 'upcoming'  },
  { time: '10:00', event: 'Customer Delivery — SHP-12345', location: 'ABC Corp, Delhi', type: 'delivery', status: 'on-time'  },
  { time: '11:15', event: 'Gate Appointment — APT-0098', location: 'Gate B — Dock 2', type: 'appointment', status: 'upcoming' },
  { time: '13:00', event: 'Maintenance — VEH-0234',   location: 'Workshop Bay 2',      type: 'maintenance', status: 'upcoming' },
  { time: '14:30', event: 'Delivery — SHP-12346',     location: 'XYZ Ltd, Bangalore', type: 'delivery', status: 'at-risk'   },
  { time: '16:00', event: 'Night Shift Handover',     location: 'Operations Center',   type: 'internal', status: 'upcoming'  },
  { time: '18:45', event: 'Final Delivery — SHP-12347', location: 'Chennai Port',     type: 'delivery', status: 'delayed'   },
  { time: '20:00', event: 'Loading — TRP-0067',       location: 'Kolkata WH — Dock 3', type: 'loading', status: 'upcoming'  },
];

/* ─── TRIPS IN PROGRESS ─── */
export const tripsInProgress = [
  { id: 'TRP-0045', driver: 'Ramesh Kumar',    vehicle: 'MH-12-AB-1234', origin: 'Mumbai',  dest: 'Pune',      eta: '28-Sep 14:00', status: 'on-time',  progress: 72 },
  { id: 'TRP-0046', driver: 'Suresh Sharma',   vehicle: 'MH-14-CD-5678', origin: 'Pune',    dest: 'Bangalore', eta: '28-Sep 18:30', status: 'at-risk',  progress: 45 },
  { id: 'TRP-0047', driver: 'Anil Patel',      vehicle: 'DL-08-EF-9012', origin: 'Delhi',   dest: 'Jaipur',    eta: '29-Sep 09:00', status: 'delayed',  progress: 30 },
  { id: 'TRP-0048', driver: 'Vijay Singh',     vehicle: 'KA-05-GH-3456', origin: 'Kolkata', dest: 'Hyderabad', eta: '28-Sep 20:00', status: 'on-time',  progress: 85 },
  { id: 'TRP-0049', driver: 'Manoj Verma',     vehicle: 'GJ-01-IJ-7890', origin: 'Surat',   dest: 'Mumbai',    eta: '28-Sep 15:30', status: 'on-time',  progress: 90 },
  { id: 'TRP-0050', driver: 'Deepak Tiwari',   vehicle: 'TN-10-KL-2345', origin: 'Chennai', dest: 'Coimbatore',eta: '29-Sep 08:00', status: 'delayed',  progress: 20 },
  { id: 'TRP-0051', driver: 'Arvind Yadav',    vehicle: 'RJ-14-MN-6789', origin: 'Jaipur',  dest: 'Ahmedabad', eta: '28-Sep 16:45', status: 'on-time',  progress: 60 },
];

/* ─── PENDING ORDERS ─── */
export const pendingOrders = [
  { id: 'ORD-2024-0891', from: 'Mumbai',   to: 'Delhi',      items: 12, weight: '840 kg', priority: 'high',   status: 'Awaiting Planning', created: '27-Sep 09:00' },
  { id: 'ORD-2024-0892', from: 'Pune',     to: 'Bangalore',  items: 5,  weight: '320 kg', priority: 'medium', status: 'Awaiting Planning', created: '27-Sep 10:30' },
  { id: 'ORD-2024-0893', from: 'Delhi',    to: 'Chennai',    items: 22, weight: '1.2 T',  priority: 'high',   status: 'Validation Pending', created: '27-Sep 11:00' },
  { id: 'ORD-2024-0894', from: 'Kolkata',  to: 'Hyderabad',  items: 8,  weight: '560 kg', priority: 'low',    status: 'Awaiting Planning', created: '27-Sep 12:15' },
  { id: 'ORD-2024-0895', from: 'Surat',    to: 'Mumbai',     items: 3,  weight: '180 kg', priority: 'urgent', status: 'Awaiting Planning', created: '27-Sep 12:45' },
  { id: 'ORD-2024-0896', from: 'Chennai',  to: 'Coimbatore', items: 18, weight: '920 kg', priority: 'medium', status: 'Awaiting Planning', created: '27-Sep 13:00' },
];
