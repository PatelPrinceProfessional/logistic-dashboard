/**
 * LOGISTICSHUB — MOCK DASHBOARD DATA
 * Source: COMPLETE_UI_DESIGN_PROMPT.md — SECTION 3
 */

export const kpiMetrics = {
  shipmentsToday: { value: '1,247', trend: '+12%', trendType: 'up', label: 'Shipments Today', sub: 'vs yesterday' },
  revenueMonth:   { value: '$2.4M', trend: '+8%',  trendType: 'up', label: 'Revenue (This Month)', sub: 'vs last month' },
  onTimeDelivery: { value: '94.2%', trend: 'Target: 95%', trendType: 'neutral', label: 'On-Time Delivery', sub: '' },
  criticalExceptions: { value: '23', trend: 'Requires attention', trendType: 'down', label: 'Critical Exceptions', sub: '' },
};

export const freightSpendData = [
  { month: 'Oct', amount: 180000 }, { month: 'Nov', amount: 220000 },
  { month: 'Dec', amount: 195000 }, { month: 'Jan', amount: 240000 },
  { month: 'Feb', amount: 210000 }, { month: 'Mar', amount: 260000 },
  { month: 'Apr', amount: 245000 }, { month: 'May', amount: 280000 },
  { month: 'Jun', amount: 265000 }, { month: 'Jul', amount: 290000 },
  { month: 'Aug', amount: 310000 }, { month: 'Sep', amount: 295000 },
];

export const shipmentStatusData = [
  { name: 'On-Time',  value: 45, color: '#27AE60' },
  { name: 'At-Risk',  value: 30, color: '#FF9800' },
  { name: 'Delayed',  value: 15, color: '#E74C3C' },
  { name: 'Pending',  value: 10, color: '#F39C12' },
];

export const topCarriers = [
  { name: 'ABC Transport',   onTime: 96.2, count: 245, color: '#27AE60' },
  { name: 'XYZ Logistics',   onTime: 94.8, count: 189, color: '#27AE60' },
  { name: 'Quick Haul',      onTime: 91.3, count: 134, color: '#3498DB' },
  { name: 'FastMove Inc',    onTime: 88.7, count: 98,  color: '#FF9800' },
  { name: 'NorthStar Cargo', onTime: 85.1, count: 67,  color: '#FF9800' },
];

export const exceptionSeverity = [
  { level: 'Critical', count: 3,  color: '#E74C3C' },
  { level: 'High',     count: 12, color: '#FF9800' },
  { level: 'Medium',   count: 34, color: '#F39C12' },
  { level: 'Low',      count: 78, color: '#3498DB' },
];

export const recentShipments = [
  { id: 'SHP-12345', customer: 'ABC Corporation', origin: 'Mumbai', dest: 'Delhi',     status: 'on-time',  eta: '28-Sep 14:00', carrier: 'ABC Transport' },
  { id: 'SHP-12346', customer: 'XYZ Logistics',   origin: 'Pune',   dest: 'Bangalore', status: 'at-risk',  eta: '28-Sep 16:30', carrier: 'XYZ Logistics' },
  { id: 'SHP-12347', customer: 'Global Freight',   origin: 'Delhi',  dest: 'Chennai',   status: 'delayed',  eta: '29-Sep 10:00', carrier: 'Quick Haul' },
  { id: 'SHP-12348', customer: 'FastMove Corp',    origin: 'Kolkata',dest: 'Hyderabad', status: 'on-time',  eta: '28-Sep 18:00', carrier: 'FastMove Inc' },
  { id: 'SHP-12349', customer: 'Reliable Co',      origin: 'Surat',  dest: 'Mumbai',    status: 'pending',  eta: '29-Sep 09:00', carrier: 'NorthStar Cargo' },
];

export const recentAlerts = [
  { id: 'ALT-001', type: 'Delivery Delay',  desc: 'SHP-12345 running 2 hours late', time: '2 min ago',  severity: 'high' },
  { id: 'ALT-002', type: 'Vehicle Breakdown',desc: 'VEH-456 broken down on Route 12', time: '15 min ago', severity: 'critical' },
  { id: 'ALT-003', type: 'Late Pickup',      desc: 'SHP-12346 pickup delayed by 1hr', time: '32 min ago', severity: 'medium' },
  { id: 'ALT-004', type: 'Temperature Alert',desc: 'Cold chain temp breach on SHP-12350', time: '1 hr ago',  severity: 'high' },
  { id: 'ALT-005', type: 'ETA Update',       desc: 'SHP-12348 ETA updated to 18:45', time: '1.5 hr ago', severity: 'low' },
];
