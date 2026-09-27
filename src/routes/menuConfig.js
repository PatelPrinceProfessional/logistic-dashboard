/**
 * LOGISTICSHUB — SIDEBAR MENU CONFIGURATION
 * 25 main modules with icons, paths, and submenus
 * Source: COMPLETE_UI_DESIGN_PROMPT.md — SECTION 1 & INDEX
 */

export const MENU_CONFIG = [
  {
    id: 'home',
    label: 'Home',
    icon: 'LayoutDashboard',
    path: '/',
    submenu: [
      { id: 'exec-dashboard',    label: 'Executive Dashboard',    path: '/' },
      { id: 'ops-dashboard',     label: 'Operations Dashboard',   path: '/ops-dashboard' },
      { id: 'control-tower',     label: 'Control Tower',          path: '/control-tower' },
      { id: 'alerts-center',     label: 'Alerts Center',          path: '/alerts-center' },
      { id: 'saved-views',       label: 'Saved Views',            path: '/saved-views' },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: 'ShoppingCart',
    path: '/orders',
    submenu: [
      { id: 'all-orders',     label: 'All Orders',       path: '/orders' },
      { id: 'create-order',   label: 'Create Order',     path: '/orders/create' },
      { id: 'order-validation',label: 'Order Validation',path: '/orders/validation' },
    ],
  },
  {
    id: 'shipments',
    label: 'Shipments',
    icon: 'Package',
    path: '/shipments',
    submenu: [
      { id: 'all-shipments',  label: 'All Shipments',   path: '/shipments' },
      { id: 'consolidation',  label: 'Consolidation',   path: '/shipments/consolidation' },
    ],
  },
  {
    id: 'planning',
    label: 'Transportation Planning',
    icon: 'Map',
    path: '/planning',
    submenu: [
      { id: 'planning-workbench',    label: 'Planning Workbench',    path: '/planning' },
      { id: 'continuous-replanning', label: 'Continuous Replanning', path: '/planning/replanning' },
    ],
  },
  {
    id: 'load-building',
    label: 'Load Building',
    icon: 'Layers',
    path: '/load-building',
    submenu: [
      { id: 'load-builder',        label: 'Load Builder',           path: '/load-building' },
      { id: 'consolidation-mgmt',  label: 'Consolidation Mgmt',     path: '/load-building/consolidation' },
    ],
  },
  {
    id: 'routing',
    label: 'Routing & Optimization',
    icon: 'Navigation',
    path: '/routing',
    submenu: [
      { id: 'route-builder',     label: 'Route Builder',     path: '/routing' },
      { id: 'route-optimization',label: 'Route Optimization',path: '/routing/optimization' },
    ],
  },
  {
    id: 'procurement',
    label: 'Procurement & Tender',
    icon: 'FileText',
    path: '/procurement',
    submenu: [
      { id: 'tender-board',  label: 'Tender Board',  path: '/procurement' },
      { id: 'create-rfq',    label: 'Create RFQ',    path: '/procurement/rfq' },
    ],
  },
  {
    id: 'dispatch',
    label: 'Dispatch',
    icon: 'Send',
    path: '/dispatch',
    submenu: [
      { id: 'dispatch-board', label: 'Dispatch Board',  path: '/dispatch' },
      { id: 'trip-management',label: 'Trip Management', path: '/dispatch/trips' },
    ],
  },
  {
    id: 'tracking',
    label: 'Live Tracking',
    icon: 'MapPin',
    path: '/tracking',
    submenu: [
      { id: 'live-map',         label: 'Live Map',          path: '/tracking' },
      { id: 'shipment-tracking',label: 'Shipment Tracking', path: '/tracking/shipments' },
      { id: 'eta-management',   label: 'ETA Management',    path: '/tracking/eta' },
    ],
  },
  {
    id: 'exceptions',
    label: 'Control Tower',
    icon: 'AlertTriangle',
    path: '/exceptions',
    submenu: [
      { id: 'exceptions-dashboard',label: 'Exception Dashboard', path: '/exceptions' },
      { id: 'risk-queue',          label: 'Risk Queue',           path: '/exceptions/risks' },
    ],
  },
  {
    id: 'drivers',
    label: 'Drivers',
    icon: 'User',
    path: '/drivers',
    submenu: [
      { id: 'all-drivers', label: 'All Drivers', path: '/drivers' },
      { id: 'driver-app',  label: 'Driver App',  path: '/drivers/app' },
    ],
  },
  {
    id: 'fleet',
    label: 'Fleet',
    icon: 'Truck',
    path: '/fleet',
    submenu: [
      { id: 'vehicles',       label: 'Vehicles',        path: '/fleet' },
      { id: 'fleet-analytics',label: 'Fleet Analytics', path: '/fleet/analytics' },
    ],
  },
  {
    id: 'facilities',
    label: 'Facilities',
    icon: 'Building2',
    path: '/facilities',
    submenu: [
      { id: 'appointments',   label: 'Appointments',    path: '/facilities' },
      { id: 'dock-schedule',  label: 'Dock Schedule',   path: '/facilities/dock' },
      { id: 'yard-management',label: 'Yard Management', path: '/facilities/yard' },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: 'FolderOpen',
    path: '/documents',
    submenu: [
      { id: 'all-documents', label: 'All Documents', path: '/documents' },
      { id: 'eway-bill',     label: 'E-Way Bill',    path: '/documents/eway-bill' },
      { id: 'einvoice',      label: 'E-Invoice',     path: '/documents/einvoice' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'DollarSign',
    path: '/finance',
    submenu: [
      { id: 'freight-audit',   label: 'Freight Audit',    path: '/finance' },
      { id: 'carrier-invoices',label: 'Carrier Invoices', path: '/finance/invoices' },
      { id: 'settlement',      label: 'Settlement',       path: '/finance/settlement' },
      { id: 'customer-billing',label: 'Customer Billing', path: '/finance/billing' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'Users',
    path: '/customers',
    submenu: [
      { id: 'customer-list',  label: 'Customer List',   path: '/customers' },
      { id: 'customer-portal',label: 'Customer Portal', path: '/customers/portal' },
    ],
  },
  {
    id: 'carriers',
    label: 'Carriers',
    icon: 'Briefcase',
    path: '/carriers',
    submenu: [
      { id: 'carrier-list',  label: 'Carrier List',    path: '/carriers' },
      { id: 'rate-cards',    label: 'Rate Cards',      path: '/carriers/rates' },
      { id: 'contracts',     label: 'Contracts',       path: '/carriers/contracts' },
      { id: 'carrier-portal',label: 'Carrier Portal',  path: '/carriers/portal' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & BI',
    icon: 'BarChart2',
    path: '/analytics',
    submenu: [
      { id: 'analytics-dashboard',label: 'Analytics Dashboard', path: '/analytics' },
      { id: 'bi-reports',          label: 'BI Reports',          path: '/analytics/reports' },
      { id: 'sustainability',      label: 'Sustainability',      path: '/analytics/sustainability' },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: 'Settings',
    path: '/admin',
    submenu: [
      { id: 'users',       label: 'Users',        path: '/admin/users' },
      { id: 'roles',       label: 'Roles',        path: '/admin/roles' },
      { id: 'master-data', label: 'Master Data',  path: '/admin/master-data' },
      { id: 'audit-logs',  label: 'Audit Logs',   path: '/admin/audit-logs' },
      { id: 'configuration',label: 'Configuration',path: '/admin/configuration' },
    ],
  },
];

/** Section groups for sidebar separators */
export const MENU_SECTIONS = [
  { label: 'Command Center', ids: ['home'] },
  { label: 'Operations',     ids: ['orders', 'shipments', 'planning', 'load-building', 'routing', 'procurement'] },
  { label: 'Real-time',      ids: ['dispatch', 'tracking', 'exceptions'] },
  { label: 'Resources',      ids: ['drivers', 'fleet', 'facilities'] },
  { label: 'Business',       ids: ['documents', 'finance', 'customers', 'carriers'] },
  { label: 'Intelligence',   ids: ['analytics'] },
  { label: 'System',         ids: ['admin'] },
];
