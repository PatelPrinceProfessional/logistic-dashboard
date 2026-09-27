# LogisticsHub — Routing & Optimization Architecture Plan (Section 8)

## 1. Overview & Objectives
The **Routing & Optimization** module provides automated Vehicle Routing Problem (VRP) solving, multi-stop route building, interactive spatial map visualization, constraint validation, and multi-objective algorithmic trade-off comparisons.

The module features a **pristine, high-contrast, modern clean white theme background** with crisp border styling, refined data visualizations, and full interactive control.

---

## 2. Page & Route Structure

| Route | View Component | Key Capabilities |
|---|---|---|
| `/routing` | `RouteBuilder.jsx` | Map-centric workbench, reorderable multi-stop list, depot selector, vehicle/driver assignment, interactive SVG route path generator, real-time constraint validation. |
| `/routing/optimization` | `RouteOptimization.jsx` | Multi-objective VRP solver engine, parameter & constraint configuration, solution comparison tabs (Best Cost, Fastest, Balanced, Eco), individual route dispatches. |

---

## 3. Core Features & Functional Specifications

### 3.1 Route Builder (`/routing`)
1. **Route Master Configuration**:
   - Auto-generated Route ID (`RT-2026-0891`).
   - Status toggle (Draft, Confirmed, Dispatched).
   - Origin Depot and Destination Depot selectors.
   - Vehicle allocation (specs, payload capacity, refrigerated/hazmat features).
   - Driver allocation (hours remaining, HOS compliance, certifications).
   - Route Type selector (Full Load, Milk Run, Multi-Stop Distribution).

2. **Interactive Stops Management**:
   - Sequential numbered stop cards with drag/up/down re-ordering.
   - Details per stop: Customer name, physical address, pickup/delivery type, item count, weight (kg), volume (cbm), time window (`08:00 - 10:00`), contact person.
   - Dynamic "+ Add Stop" modal with location, delivery requirements, and time window inputs.
   - Stop removal and one-click time-slot adjustment.

3. **Interactive Route Map & Visualizer**:
   - High-contrast map canvas with custom vector terrain, depot pins (green origin / red terminal), and numbered stop nodes (blue pins with pulsing hover states).
   - Dynamic SVG route path connections showing intermediate segment distances (km) and incremental ETAs.
   - Interactive pin popups showing customer details and stop summary.
   - Click-to-add stop functionality directly on coordinates.

4. **Performance & Constraint Checkers**:
   - Live KPI metrics: Total Distance (km), Estimated Duration (hours/mins), Stop count, Weight utilization (%), Volume utilization (%), Estimated Cost ($), Route Efficiency Score (0-100).
   - Regulatory & physical constraint validation (Weight limits, Volume limits, Driver HOS hours, Hazmat grouping, Time-window achievability).
   - Action bar: Clear Route, Save Draft, AI-Assisted Auto-Reorder, Cost Estimate Breakdown, Dispatch Route.

---

### 3.2 Route Optimization (`/routing/optimization`)
1. **Engine & Parameter Configuration**:
   - Engine modes: Quick Heuristic (Greedy), Standard (Clarke-Wright Savings), Advanced Meta-heuristic (Genetic / Tabu Search).
   - Objective Function: Minimize Cost, Minimize Total Distance, Minimize Total Time, Balanced Hybrid, Custom Weighted.
   - Constraints toggles: Hard Time Windows, Maximum Weight, Maximum Volume, Driver Maximum Hours, Avoid Tolls, Highway Preference.

2. **Multi-Solution Algorithmic Optimizer**:
   - Live simulated solver progress with progress bar (`Optimizing 87 shipments across 12 vehicles...`).
   - 4 Pre-computed solution archetypes:
     - **Solution 1 (Best Cost)**: Maximum vehicle consolidation, lowest operating cost ($2,145, -12.5% vs baseline).
     - **Solution 2 (Fastest Delivery)**: Prioritizes expedited delivery speeds (16h 45m, -8.3% time).
     - **Solution 3 (Balanced)**: Optimal trade-off between driving hours and fuel expenditure ($2,210).
     - **Solution 4 (Eco-Green)**: Minimizes carbon emissions with continuous highway corridors (18% CO₂ reduction).

3. **Solution Breakdown & Dispatch**:
   - Individual vehicle route listings with assigned drivers, stop counts, distance, and costs.
   - One-click solution deployment converting optimized runs into active dispatch trips.

---

## 4. Design System & Light Theme Palette
- **Background**: `#ffffff` (Pure Crisp White) and `#f8fafc` (Subtle light slate workspace).
- **Surface Cards**: `#ffffff` with `border: 1px solid #e2e8f0` and `box-shadow: 0 1px 3px rgba(0,0,0,0.05)`.
- **Primary Accent**: `#2563eb` (Royal Blue) & `#3b82f6`.
- **Success / Eco**: `#10b981` (Emerald Green).
- **Warning / Alert**: `#f59e0b` (Amber).
- **Typography**: Dark slate `#0f172a` for primary headings, `#334155` for body text, `#64748b` for secondary labels.
