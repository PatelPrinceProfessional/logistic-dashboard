# LogisticsHub — Live Tracking & Visibility Architecture Plan (Section 13)

## 1. Executive Overview
The **Live Tracking & Visibility** module provides real-time geospatial telematics, GPS vehicle tracking, geofence monitoring, traffic layer analysis, machine learning ETA predictions, and dynamic delay mitigation.

---

## 2. Page & Route Specifications

| Route | View Component | Core Functionality |
|---|---|---|
| `/tracking` | `LiveMap.jsx` | Full-screen interactive map workspace, vehicle pins with live GPS breadcrumbs, geofence polygons, traffic congestion overlay, left filter controls, and right vehicle inspector. |
| `/tracking/shipments` | `ShipmentTracking.jsx` | Shipment-centric tracking view with multi-leg milestone progress, carrier handoffs, and customer delivery portal preview. |
| `/tracking/eta` | `ETAManagement.jsx` | AI-powered dynamic ETA prediction matrix, delay risk queue, weather/congestion impact simulators, and automated customer SMS/Email alerts. |

---

## 3. Detailed Functional Architecture

### 3.1 Live Map (`/tracking`)
1. **Map-Centric Full-Screen Canvas**:
   - **Vector Spatial Grid**: Interactive highway networks, industrial hubs, and metropolitan corridors.
   - **Vehicle Pins**:
     - 🟢 **On-Time** (`#10b981`): Vehicles running within SLA schedule ($\le 5\text{m}$ variance).
     - 🟠 **At-Risk** (`#f59e0b`): Vehicles facing minor congestion ($5\text{m} - 25\text{m}$ delay).
     - 🔴 **Delayed** (`#ef4444`): Critical delay ($>25\text{m}$ behind appointment window).
     - ⚪ **Offline / Idle** (`#64748b`): Stationed in depot or maintenance bay.
   - **Pin Interactivity**: Hover displays fast HUD tooltip; clicking centers the vehicle and opens the Right Details Inspector.
   - **Geofence Polygons**: Interactive territorial zones (*Port Terminals*, *SEZ Logistics Parks*, *Metro Downtown Clearances*) with entry/exit alert flags.
   - **Traffic Layer Overlay**: Real-time highway congestion colorization (Free flow Green, Moderate Orange, Heavy Congestion Red).

2. **Left Control Sidebar (280px)**:
   - **Search Bar**: Autocomplete search by vehicle registration (`MH-12-AB-3042`), driver name (`John Smith`), or shipment ID.
   - **Filter Section**: Checkboxes for Vehicle Types (*Heavy Trailer*, *Box Truck*, *Courier Van*), Status (*On-Time*, *At-Risk*, *Delayed*, *Offline*).
   - **Layer Controls**: Toggles for *Vehicles*, *Geofences*, *Traffic Flow*, *Density Heatmap*, and *GPS Breadcrumbs Trail*.
   - **Resource Counters**: Online count (`212 / 234`), active in-transit (`145`), idle (`67`), and maintenance (`22`).

3. **Right Inspector Panel (320px)**:
   - Live telemetry: Speed (`64 km/h`), heading (`North-East`), fuel gauge (`78%`), cargo temperature sensor (`+4.2°C`).
   - Active Trip & Route: Next destination stop, remaining distance (`142 km`), updated ETA (`16:45`), driver contact buttons (**"📞 Call Driver"**, **"💬 Dispatch Text"**, **"📋 View Waybill"**).

4. **Bottom Telemetry Status Bar**:
   - KPI metrics: Tracked vehicles (`212`), On-Time (`145`), At-Risk (`34`), Delayed (`22`), Offline (`22`).
   - Refresh interval selector (*30s*, *1 min*, *5 min*), live connection heartbeat indicator, and Incident Report logger.

---

## 4. Design System Alignment
- Clean modern glassmorphic card overlays, high-contrast vector map elements, accessible status badges, and fluid spatial balance.
