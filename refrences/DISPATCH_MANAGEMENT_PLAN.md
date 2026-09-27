# LogisticsHub — Real-Time Dispatch & Trip Management Architecture Plan (Section 10)

## 1. Executive Summary
The **Real-Time Dispatch & Trip Management** module operates as the mission-control bridge between transportation planning, freight tendering, and live fleet execution. It provides a multi-resource Gantt scheduling timeline, drag-and-drop vehicle-to-trip assignments, driver certification compliance checks, and real-time trip lifecycle tracking.

---

## 2. Page & Route Specifications

| Route | View Component | Core Functionality |
|---|---|---|
| `/dispatch` | `DispatchBoard.jsx` | 3-Panel Gantt Chart workspace, Left Resource Sidebar (Vehicles, Drivers, Waiting Trips), Center 24h Timeline Gantt, Right Trip Inspector, and Bottom Bulk Dispatch Bar. |
| `/dispatch/trips` | `TripManagement.jsx` | Active trip registry with 8-stage lifecycle tracker (`Created` → `Assigned` → `Accepted` → `Pickup` → `Loading` → `In Transit` → `Out for Delivery` → `Delivered`), search, and status filters. |
| `/dispatch/trips/:id` | `TripDetail.jsx` | Deep-dive telemetry, stop-by-stop waybill, ePOD signatures, seal verification, temperature sensor log, and driver communication feed. |

---

## 3. Detailed Functional Modules & Specifications

### 3.1 Dispatch Board (`/dispatch`)
1. **Left Sidebar — Resource & Queue Hub (20% Width)**:
   - **Vehicles Ready**: Filterable fleet list with registration numbers (`VEH-3042`), capacity (`5,000 kg / 20 cbm`), live GPS location, and status badges (*Ready*, *On Trip*, *On Break*, *Off-Duty*).
   - **Drivers Ready**: Expandable list with CDL license verification, available HOS driving hours, and qualification badges (*Hazmat*, *Reefer Cold Chain*, *ODC Heavy*).
   - **Trips Awaiting Assignment**: Queue of 8 ready-to-dispatch freight bundles (`TRIP-901` - `TRIP-908`) with payload weight, stops count, and urgency indicators. Click/drag to assign to vehicle.

2. **Center Section — Multi-Resource Gantt Timeline (60% Width)**:
   - **Time X-Axis**: Full daylight & shift hours (`06:00`, `08:00`, `10:00`, `12:00`, `14:00`, `16:00`, `18:00`, `20:00`, `22:00`).
   - **Vehicle/Driver Y-Axis**: Individual timeline rows for each active fleet unit with driver avatar and vehicle specs.
   - **Color-Coded Status Blocks**:
     - 🔘 *Off-Duty*: Gray (`#64748b`)
     - 🟡 *Rest / Meal Break*: Amber (`#f59e0b`)
     - 🔵 *Pre-Trip & Yard Inspection*: Sky Blue (`#0284c7`)
     - 🟢 *Active Trip & Highway Transit*: Emerald Green (`#10b981`)
     - 🟣 *Return to Depot / De-docking*: Cyan / Teal (`#06b6d4`)
   - **Interactive Hover & Click**: Hovering any trip block displays payload details, driver info, and SLA margins. Clicking loads full data into the Right Inspector.
   - **Shift Filter**: Instant toggle between *Morning Shift (06:00 - 14:00)*, *Afternoon Shift (14:00 - 22:00)*, *Night Shift (22:00 - 06:00)*, and *Full 24-Hour View*.

3. **Right Panel — Trip Inspector & Dispatch Action (20% Width)**:
   - Selected Trip payload manifest (Shipment IDs, origin, destination, cargo classification, total weight kg, volume cbm).
   - Driver & Vehicle verification badge (validates certifications against cargo constraints like hazmat or cold chain).
   - Cost, Mileage & Margin: Estimated duration (`6h 15m`), distance (`234 km`), total operational cost (`$245`), revenue, and net margin (`+$65`).
   - Action buttons: **"🚀 Dispatch Trip Now"**, **"🗺️ Preview Route on Map"**, **"🖨️ Print Manifest Trip Sheet"**, **"✏️ Re-Assign"**.

4. **Bottom Bar — Fleet Metrics & Bulk Actions**:
   - High-visibility metrics: *Dispatched Today (24)*, *Awaiting Dispatch (8)*, *Active Fleet Trips (45)*, *Fleet Utilization (87.4%)*.
   - Bulk Execution: **"⚡ Dispatch All Ready Trips"**, **"🔄 AI Gantt Schedule Re-Balance"**, **"⏸️ Pause Dispatch Stream"**.

---

### 3.2 Trip Management & Trip Detail (`/dispatch/trips`)
- **8-Stage Lifecycle Stepper**: Visual milestone tracker from `Created` through `Delivered`.
- **Live Status Feed**: Real-time delay alerts, temperature compliance alarms, and electronic proof of delivery (ePOD) receiver signature verification.
- **Driver Communication Channel**: In-app dispatch notes and gate entry pass codes.

---

## 4. UI/UX Design System & Theme Alignment
- **Workspace Architecture**: 3-panel fluid horizontal flex layout with responsive horizontal timeline scrolling.
- **Color Palette**: High-contrast, clean professional surfaces (`#ffffff` / `#f8fafc`), crisp borders (`#e2e8f0`), vibrant Gantt status blocks, and accessible typography.
