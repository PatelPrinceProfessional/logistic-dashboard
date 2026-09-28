# Fleet Operations & Fleet Analytics Architecture Plan

## 1. Overview & Objectives
Build an enterprise-grade Fleet Management & Analytics suite according to Section 12 of `COMPLETE_UI_DESIGN_PROMPT.md`:
1. **Fleet Vehicles Management (`/fleet`)**: Fleet operations hub for managing 234+ commercial vehicles (trucks, trailers, reefers, electric vans), tracking real-time telematics, preventive maintenance schedules, regulatory document renewals, driver assignments, and vehicle detail inspector (8 tabs).
2. **Fleet Analytics Dashboard (`/fleet/analytics`)**: Executive intelligence hub analyzing Fleet Utilization (82.5%), Fuel Economy (6.8 km/l), Operating Cost of Ownership (TCO), Vehicle Age Distribution, Preventive Maintenance vs. Breakdown Rates, and Top Performers vs. At-Risk Vehicles.

---

## 2. Technical Architecture & File Structure

```
src/
├── pages/
│   └── Fleet/
│       ├── Fleet.css                    # Fleet management & analytics design system
│       ├── VehiclesList.jsx             # Vehicles list table, filters, bulk actions & 8-tab inspector modal
│       ├── FleetAnalytics.jsx           # Fleet BI analytics dashboard (KPIs, charts, cost breakdown, triage)
│       └── components/
│           ├── VehicleDetailModal.jsx   # 8-tab inspector: Overview, Maintenance, Documents, Telematics, Fuel, Incidents, Costs, Audit
│           └── VehicleCreateModal.jsx   # Onboard new fleet vehicle wizard
└── utils/
    └── mockData/
        └── fleetData.js                 # 12+ rich vehicle entries, telematics logs, service schedules & analytics metrics
```

---

## 3. Detailed Specifications

### Suite A: Fleet Vehicles Console (`/fleet`)
- **Metric Banners**: Total Fleet (234), Active On Road (168), Under Maintenance (18), Ready/Available (38), Critical Breakdown (10), Telematics Connected Rate (97.4%).
- **Advanced Filters**: Search by registration, VIN, driver name, vehicle model; Filter pills (`ALL`, `ACTIVE`, `AVAILABLE`, `MAINTENANCE`, `BREAKDOWN`, `LEASED`); Dropdown for vehicle types (`Box Truck`, `Reefer Semi-Trailer`, `Multi-Axle Flatbed`, `Electric Van`).
- **Bulk Action Toolbar**: Select all/multiple vehicles -> Mark Active/Inactive, Schedule Preventive Service, Reassign Driver, Export Fleet CSV.
- **Data Table**: Status indicator dot, registration plate, vehicle model & year, payload & volume capacity, assigned driver, fuel type & level meter, GPS telematics connectivity status, next service due countdown warning, and action menu.
- **8-Tab Vehicle Detail Inspector**:
  1. *Overview & Specs*: Dimensions, gross vehicle weight (GVW), wheelbase, ownership & lease contract, current location & trip.
  2. *Maintenance & Servicing*: Service history ledger, upcoming preventive maintenance alerts (Oil change, brakes, tires), and 1-click service scheduler.
  3. *Documents & Compliance*: Registration Certificate (RC), Comprehensive Insurance, Pollution Control (PUC), Fitness Certificate, Road Tax, National Permit with validity badges.
  4. *Live Telematics & GPS*: Speedometer HUD (km/h), fuel tank level, engine status, battery health, current trip ETA, and breadcrumb path.
  5. *Fuel & Efficiency*: 30-day fuel consumption log, km/l fuel efficiency gauge, fuel cost per km.
  6. *Safety & Incidents*: Telematics safety infractions (harsh braking, over-speeding, engine over-revving).
  7. *Operating Costs (TCO)*: Fuel, maintenance, insurance, depreciation, and driver cost allocation.
  8. *Audit Trail*: Complete historical log of status and assignment changes.

### Suite B: Fleet Analytics Dashboard (`/fleet/analytics`)
- **Executive Metric Cards**:
  - Fleet Utilization (82.5% vs 85% target with pie distribution).
  - Fuel Efficiency (6.8 km/l, +2.3% MoM, $0.29/km).
  - Average Fleet Age (3.2 years with age group tiering).
  - Breakdown Rate (2.1% with preventive maintenance save rate).
- **Interactive Visualizations**:
  - Utilization Rate by Vehicle Category (Truck, Trailer, Reefer, Van, EV).
  - Fleet Operating Cost Breakdown (Fuel, Maintenance, Driver, Insurance, Depreciation).
  - 6-Month Fuel Efficiency & Eco/Carbon Footprint Trend Line Chart.
  - Telematics Safety Incident Distribution Stacked Bars (Critical, High, Medium, Low).
- **Bottom Operational Matrices**:
  - *Top 5 Peak Performers*: Most fuel-efficient and highest uptime vehicles.
  - *Vehicles Requiring Maintenance & Triage*: Low MPG, overdue for oil/tire inspection, telematics offline.

---

## 4. Implementation Steps
1. **Mock Data**: Create `src/utils/mockData/fleetData.js`.
2. **Styles**: Create `src/pages/Fleet/Fleet.css`.
3. **Components**:
   - `VehicleDetailModal.jsx` (8 tabs)
   - `VehicleCreateModal.jsx`
   - `VehiclesList.jsx`
   - `FleetAnalytics.jsx`
4. **Router Configuration**: Wire `/fleet`, `/fleet/analytics`, and `/fleet/:id` in `AppRouter.jsx`.
5. **Testing & Verification**: Execute `npm run build`, test in browser via `browser_subagent`, and commit/push to Git.
