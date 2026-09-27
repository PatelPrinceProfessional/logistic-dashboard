# LOGISTICSHUB — IMPLEMENTED DASHBOARDS SUMMARY

## 1. Executive Dashboard (`/`)

### Overview
The **Executive Dashboard** acts as the high-level command center for logistics executives, fleet directors, and supply chain managers. It aggregates top-level financial metrics, shipment delivery health, carrier performance, and exception telemetry.

### Component Structure
- **File Location:** `src/pages/Home/ExecutiveDashboard/ExecutiveDashboard.jsx`
- **Data Source:** `src/utils/mockData/dashboard.js`
- **Layout Wrapper:** `src/components/Common/Layout/Layout.jsx`

### Implemented Functionality & Sections

1. **Executive KPI Header Grid (`KPICard`)**:
   - **Active Shipments Today**: Displays live count of total active shipments (`1,248`) with upward trend (`+12.4% vs last week`).
   - **Monthly Freight Spend**: High-level financial overview (`₹4,82,500`) with positive growth indicator (`+8.2% vs target`).
   - **On-Time Delivery Rate**: Percentage of shipments meeting SLA (`94.8%`).
   - **Critical Exceptions**: Active high-severity exceptions (`14`) requiring executive oversight.

2. **Freight Spend Trend Analysis Chart (`AreaChart`)**:
   - 12-Month continuous timeline chart built with **Recharts**.
   - Features custom SVG gradients (`freightGrad`) and custom tooltips with currency formatting (`₹`).

3. **Shipment Status Distribution (`PieChart`)**:
   - Donut chart breaking down fleet state percentages:
     - `In-Transit` (45%)
     - `Delivered` (35%)
     - `Pending` (12%)
     - `Delayed` (8%)

4. **Top Carriers Performance Leaderboard**:
   - Ranked leaderboard displaying carrier names, total shipment counts, and verified on-time delivery percentages.

5. **Active Exceptions Severity Breakdown**:
   - Visual progress bars mapping exceptions across severity tiers: `Critical`, `High`, `Medium`, `Low`.

6. **Recent Shipments Table**:
   - Data grid listing shipment IDs, customer details, origin-to-destination routes, carriers, ETAs, and status badges.

7. **Live Security & Operational Alerts Feed**:
   - Real-time alert feed tracking weather delays, route deviations, and document expiry flags.

---

## 2. Operations Dashboard (`/ops-dashboard`)

### Overview
The **Operations Dashboard** provides real-time, granular execution control for dispatchers, facility hub managers, and fleet operations staff. It tracks vehicle capacity fill rates, dock bay schedules, immediate action items, and 24-hour dispatch timelines.

### Component Structure
- **File Location:** `src/pages/Home/OperationsDashboard/OperationsDashboard.jsx`
- **Sub-components:**
  - `OpsKPICards.jsx`: Circular SVG gauge ring and primary metrics.
  - `FleetCapacityChart.jsx`: Stacked load fill rate bar chart.
- **Data Source:** `src/utils/mockData/operationsDashboard.js`
- **Styles:** `src/pages/Home/OperationsDashboard/OperationsDashboard.css`

### Implemented Functionality & Sections

1. **Operational KPI Header Grid (`OpsKPICards`)**:
   - **Active Shipments**: Current active count in transit (`567`) with daily delta (`+23 from yesterday`).
   - **Pending Orders**: Orders awaiting planning & load optimization (`89` orders, `12` high priority).
   - **Fleet Utilization Gauge (`GaugeChart`)**: Interactive SVG circular gauge comparing real-time fleet utilization (`82%`) against target threshold (`85%`).
   - **Pending Exceptions**: Quick alert container (`12` unassigned exceptions) with an instant `"Assign All"` trigger button.

2. **Fleet Capacity Fill Rate (`FleetCapacityChart`)**:
   - Stacked bar chart visualizing capacity tiers: `Full (100%)`, `75–99%`, `50–74%`, and `<50%`.
   - Broken down across vehicle types: Trucks, Vans, Bikes, and Trailers.

3. **Trip Execution Status Breakdown**:
   - Milestone distribution progress bars tracking active trips (`855` total):
     - `Ready to Dispatch` (45 trips)
     - `Dispatched` (120 trips)
     - `In Transit` (234 trips)
     - `Delivered` (456 trips)

4. **Dock Facility Utilization Monitor**:
   - Live loading bay occupancy bars for Gates 1–5 (`Dock 1` to `Dock 5`), tracking appointment counts, occupancy percentages, and availability alerts.

5. **Urgent Operational Actions Queue**:
   - Alert panel displaying high-priority items requiring dispatcher intervention:
     - Load assignments
     - Failed delivery reviews
     - Carrier invoice approvals
     - Overdue ETA updates

6. **Next 24 Hours Operational Timeline**:
   - Chronological event timeline covering scheduled loadings, dispatches, carrier pickups, customer deliveries, gate appointments, and vehicle maintenance.

7. **Interactive Operations Data Table**:
   - Tab switcher toggling between **Trips in Progress** and **Pending Orders**.
   - Live search input filtering rows by ID, origin, destination, driver, or vehicle.
   - Includes progress bars, status indicators (`On Time`, `At Risk`, `Delayed`), and action buttons (`Track` / `Plan Order`).
