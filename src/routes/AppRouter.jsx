import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// ── Placeholder spinner for lazy pages ──
const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
    <div className="spinner spinner--lg" />
  </div>
);

// ── Lazy-load pages ──
const ExecutiveDashboard = lazy(() => import('../pages/Home/ExecutiveDashboard/ExecutiveDashboard'));
const OperationsDashboard = lazy(() => import('../pages/Home/OperationsDashboard/OperationsDashboard'));
const ControlTower = lazy(() => import('../pages/Home/ControlTower/ControlTower'));
const AlertsCenter = lazy(() => import('../pages/Home/AlertsCenter/AlertsCenter'));
const SavedViews = lazy(() => import('../pages/Home/SavedViews/SavedViews'));

// ── Orders Module ──
const OrdersList = lazy(() => import('../pages/Orders/OrdersList'));
const OrderValidation = lazy(() => import('../pages/Orders/OrderValidation'));
const OrderDetail = lazy(() => import('../pages/Orders/OrderDetail'));

// ── Shipments Module ──
const ShipmentsList = lazy(() => import('../pages/Shipments/ShipmentsList'));
const ShipmentConsolidation = lazy(() => import('../pages/Shipments/ShipmentConsolidation'));
const ShipmentDetail = lazy(() => import('../pages/Shipments/ShipmentDetail'));

// ── Planning Module ──
const PlanningWorkbench = lazy(() => import('../pages/Planning/PlanningWorkbench'));
const ContinuousReplanning = lazy(() => import('../pages/Planning/ContinuousReplanning'));

// ── Load Building Module ──
const LoadBuilder = lazy(() => import('../pages/LoadBuilding/LoadBuilder'));
const ConsolidationManagement = lazy(() => import('../pages/LoadBuilding/ConsolidationManagement'));

// ── Routing Module ──
const RouteBuilder = lazy(() => import('../pages/Routing/RouteBuilder'));
const RouteOptimization = lazy(() => import('../pages/Routing/RouteOptimization'));



// ── Coming Soon placeholder ──
const ComingSoon = ({ title }) => (
  <div className="empty-state">
    <div className="empty-state__icon">
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </div>
    <div className="empty-state__title">{title}</div>
    <div className="empty-state__description">
      This module is being built in Phase {'>='} 2. Check back soon!
    </div>
  </div>
);

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Home / Dashboards ── */}
        <Route path="/"                       element={<ExecutiveDashboard />} />
        <Route path="/ops-dashboard"          element={<OperationsDashboard />} />
        <Route path="/control-tower"          element={<ControlTower />} />
        <Route path="/alerts-center"          element={<AlertsCenter />} />
        <Route path="/saved-views"            element={<SavedViews />} />

        {/* ── Orders ── */}
        <Route path="/orders"                 element={<OrdersList />} />
        <Route path="/orders/create"          element={<OrdersList />} />
        <Route path="/orders/validation"      element={<OrderValidation />} />
        <Route path="/orders/:id"             element={<OrderDetail />} />

        {/* ── Shipments ── */}
        <Route path="/shipments"              element={<ShipmentsList />} />
        <Route path="/shipments/consolidation"element={<ShipmentConsolidation />} />
        <Route path="/shipments/:id"          element={<ShipmentDetail />} />

        {/* ── Planning ── */}
        <Route path="/planning"               element={<PlanningWorkbench />} />
        <Route path="/planning/replanning"    element={<ContinuousReplanning />} />

        {/* ── Load Building ── */}
        <Route path="/load-building"          element={<LoadBuilder />} />
        <Route path="/load-building/consolidation" element={<ConsolidationManagement />} />

        {/* ── Routing ── */}
        <Route path="/routing"                element={<RouteBuilder />} />
        <Route path="/routing/optimization"   element={<RouteOptimization />} />

        {/* ── Procurement ── */}
        <Route path="/procurement"            element={<ComingSoon title="Tender Board" />} />
        <Route path="/procurement/rfq"        element={<ComingSoon title="Create RFQ" />} />

        {/* ── Dispatch ── */}
        <Route path="/dispatch"               element={<ComingSoon title="Dispatch Board" />} />
        <Route path="/dispatch/trips"         element={<ComingSoon title="Trip Management" />} />
        <Route path="/dispatch/trips/:id"     element={<ComingSoon title="Trip Detail" />} />

        {/* ── Live Tracking ── */}
        <Route path="/tracking"               element={<ComingSoon title="Live Map" />} />
        <Route path="/tracking/shipments"     element={<ComingSoon title="Shipment Tracking" />} />
        <Route path="/tracking/eta"           element={<ComingSoon title="ETA Management" />} />

        {/* ── Exceptions / Control Tower ── */}
        <Route path="/exceptions"             element={<ComingSoon title="Exception Dashboard" />} />
        <Route path="/exceptions/risks"       element={<ComingSoon title="Risk Queue" />} />

        {/* ── Drivers ── */}
        <Route path="/drivers"                element={<ComingSoon title="Drivers" />} />
        <Route path="/drivers/app"            element={<ComingSoon title="Driver App" />} />
        <Route path="/drivers/:id"            element={<ComingSoon title="Driver Detail" />} />

        {/* ── Fleet ── */}
        <Route path="/fleet"                  element={<ComingSoon title="Fleet — Vehicles" />} />
        <Route path="/fleet/analytics"        element={<ComingSoon title="Fleet Analytics" />} />
        <Route path="/fleet/:id"              element={<ComingSoon title="Vehicle Detail" />} />

        {/* ── Facilities ── */}
        <Route path="/facilities"             element={<ComingSoon title="Appointments" />} />
        <Route path="/facilities/dock"        element={<ComingSoon title="Dock Schedule" />} />
        <Route path="/facilities/yard"        element={<ComingSoon title="Yard Management" />} />

        {/* ── Documents ── */}
        <Route path="/documents"              element={<ComingSoon title="Documents" />} />
        <Route path="/documents/eway-bill"    element={<ComingSoon title="E-Way Bill" />} />
        <Route path="/documents/einvoice"     element={<ComingSoon title="E-Invoice" />} />

        {/* ── Finance ── */}
        <Route path="/finance"                element={<ComingSoon title="Freight Audit" />} />
        <Route path="/finance/invoices"       element={<ComingSoon title="Carrier Invoices" />} />
        <Route path="/finance/settlement"     element={<ComingSoon title="Settlement" />} />
        <Route path="/finance/billing"        element={<ComingSoon title="Customer Billing" />} />

        {/* ── Customers ── */}
        <Route path="/customers"              element={<ComingSoon title="Customers" />} />
        <Route path="/customers/portal"       element={<ComingSoon title="Customer Portal" />} />
        <Route path="/customers/:id"          element={<ComingSoon title="Customer Detail" />} />

        {/* ── Carriers ── */}
        <Route path="/carriers"               element={<ComingSoon title="Carriers" />} />
        <Route path="/carriers/rates"         element={<ComingSoon title="Rate Cards" />} />
        <Route path="/carriers/contracts"     element={<ComingSoon title="Contracts" />} />
        <Route path="/carriers/portal"        element={<ComingSoon title="Carrier Portal" />} />
        <Route path="/carriers/:id"           element={<ComingSoon title="Carrier Detail" />} />

        {/* ── Analytics ── */}
        <Route path="/analytics"              element={<ComingSoon title="Analytics Dashboard" />} />
        <Route path="/analytics/reports"      element={<ComingSoon title="BI Reports" />} />
        <Route path="/analytics/sustainability" element={<ComingSoon title="Sustainability" />} />

        {/* ── Admin ── */}
        <Route path="/admin/users"            element={<ComingSoon title="Users" />} />
        <Route path="/admin/roles"            element={<ComingSoon title="Roles" />} />
        <Route path="/admin/master-data"      element={<ComingSoon title="Master Data" />} />
        <Route path="/admin/audit-logs"       element={<ComingSoon title="Audit Logs" />} />
        <Route path="/admin/configuration"    element={<ComingSoon title="Configuration" />} />

        {/* ── 404 ── */}
        <Route path="*" element={<ComingSoon title="Page Not Found" />} />
      </Routes>
    </Suspense>
  );
}
