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

// ── Procurement Module ──
const TenderBoard = lazy(() => import('../pages/Procurement/TenderBoard'));
const CreateRFQ = lazy(() => import('../pages/Procurement/CreateRFQ'));

// ── Dispatch Module ──
const DispatchBoard = lazy(() => import('../pages/Dispatch/DispatchBoard'));
const TripManagement = lazy(() => import('../pages/Dispatch/TripManagement'));
const TripDetail = lazy(() => import('../pages/Dispatch/TripDetail'));

// ── Live Tracking Module ──
const LiveMap = lazy(() => import('../pages/Tracking/LiveMap'));
const ShipmentTracking = lazy(() => import('../pages/Tracking/ShipmentTracking'));
const ETAManagement = lazy(() => import('../pages/Tracking/ETAManagement'));

// ── Exceptions / Control Tower Module ──
const ExceptionsDashboard = lazy(() => import('../pages/Exceptions/ExceptionsDashboard'));
const RiskQueue = lazy(() => import('../pages/Exceptions/RiskQueue'));

// ── Drivers Module ──
const DriversList = lazy(() => import('../pages/Drivers/DriversList'));
const DriverApp = lazy(() => import('../pages/Drivers/DriverApp'));

// ── Fleet Module ──
const VehiclesList = lazy(() => import('../pages/Fleet/VehiclesList'));
const FleetAnalytics = lazy(() => import('../pages/Fleet/FleetAnalytics'));

// ── Facilities Module ──
const Appointments = lazy(() => import('../pages/Facilities/Appointments'));
const DockSchedule = lazy(() => import('../pages/Facilities/DockSchedule'));
const YardManagement = lazy(() => import('../pages/Facilities/YardManagement'));

// ── Documents Module ──
const DocumentsList = lazy(() => import('../pages/Documents/DocumentsList'));
const EWayBillManagement = lazy(() => import('../pages/Documents/EWayBillManagement'));
const EInvoiceManagement = lazy(() => import('../pages/Documents/EInvoiceManagement'));

// ── Finance Module ──
const FreightAudit = lazy(() => import('../pages/Finance/FreightAudit'));
const CarrierInvoices = lazy(() => import('../pages/Finance/CarrierInvoices'));
const Settlement = lazy(() => import('../pages/Finance/Settlement'));
const CustomerBilling = lazy(() => import('../pages/Finance/CustomerBilling'));

// ── Customers Module ──
const CustomersList = lazy(() => import('../pages/Customers/CustomersList'));
const CustomerPortal = lazy(() => import('../pages/Customers/CustomerPortal'));
const CustomerDetail = lazy(() => import('../pages/Customers/CustomerDetail'));

// ── Carriers Module ──
const CarriersList = lazy(() => import('../pages/Carriers/CarriersList'));
const RateCards = lazy(() => import('../pages/Carriers/RateCards'));
const Contracts = lazy(() => import('../pages/Carriers/Contracts'));
const CarrierPortal = lazy(() => import('../pages/Carriers/CarrierPortal'));
const CarrierDetail = lazy(() => import('../pages/Carriers/CarrierDetail'));

// ── Analytics & BI Module ──
const AnalyticsDashboard = lazy(() => import('../pages/Analytics/AnalyticsDashboard'));
const BIReports = lazy(() => import('../pages/Analytics/BIReports'));
const Sustainability = lazy(() => import('../pages/Analytics/Sustainability'));

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
        <Route path="/procurement"            element={<TenderBoard />} />
        <Route path="/procurement/rfq"        element={<CreateRFQ />} />

        {/* ── Dispatch ── */}
        <Route path="/dispatch"               element={<DispatchBoard />} />
        <Route path="/dispatch/trips"         element={<TripManagement />} />
        <Route path="/dispatch/trips/:id"     element={<TripDetail />} />

        {/* ── Live Tracking ── */}
        <Route path="/tracking"               element={<LiveMap />} />
        <Route path="/tracking/shipments"     element={<ShipmentTracking />} />
        <Route path="/tracking/eta"           element={<ETAManagement />} />

        {/* ── Exceptions / Control Tower ── */}
        <Route path="/exceptions"             element={<ExceptionsDashboard />} />
        <Route path="/exceptions/risks"       element={<RiskQueue />} />

        {/* ── Drivers ── */}
        <Route path="/drivers"                element={<DriversList />} />
        <Route path="/drivers/app"            element={<DriverApp />} />
        <Route path="/drivers/:id"            element={<DriversList />} />

        {/* ── Fleet ── */}
        <Route path="/fleet"                  element={<VehiclesList />} />
        <Route path="/fleet/analytics"        element={<FleetAnalytics />} />
        <Route path="/fleet/:id"              element={<VehiclesList />} />

        {/* ── Facilities ── */}
        <Route path="/facilities"             element={<Appointments />} />
        <Route path="/facilities/dock"        element={<DockSchedule />} />
        <Route path="/facilities/yard"        element={<YardManagement />} />

        {/* ── Documents ── */}
        <Route path="/documents"              element={<DocumentsList />} />
        <Route path="/documents/eway-bill"    element={<EWayBillManagement />} />
        <Route path="/documents/einvoice"     element={<EInvoiceManagement />} />

        {/* ── Finance ── */}
        <Route path="/finance"                element={<FreightAudit />} />
        <Route path="/finance/invoices"       element={<CarrierInvoices />} />
        <Route path="/finance/settlement"     element={<Settlement />} />
        <Route path="/finance/billing"        element={<CustomerBilling />} />

        {/* ── Customers ── */}
        <Route path="/customers"              element={<CustomersList />} />
        <Route path="/customers/portal"       element={<CustomerPortal />} />
        <Route path="/customers/:id"          element={<CustomerDetail />} />

        {/* ── Carriers ── */}
        <Route path="/carriers"               element={<CarriersList />} />
        <Route path="/carriers/rates"         element={<RateCards />} />
        <Route path="/carriers/contracts"     element={<Contracts />} />
        <Route path="/carriers/portal"        element={<CarrierPortal />} />
        <Route path="/carriers/:id"           element={<CarrierDetail />} />

        {/* ── Analytics ── */}
        <Route path="/analytics"              element={<AnalyticsDashboard />} />
        <Route path="/analytics/reports"      element={<BIReports />} />
        <Route path="/analytics/sustainability" element={<Sustainability />} />

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
