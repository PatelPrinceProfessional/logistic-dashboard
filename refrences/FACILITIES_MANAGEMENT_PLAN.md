# Facilities Operations Architecture Plan (Appointments, Dock Schedule & Yard Management)

## 1. Overview & Objectives
Build an enterprise-grade Facilities Management suite according to Section 15 of `COMPLETE_UI_DESIGN_PROMPT.md`:
1. **Appointments Management (`/facilities`)**: Hub for scheduling, checking-in, and monitoring 456+ monthly inbound/outbound warehouse appointments across 4 major national distribution facilities. Includes 7-Day interactive time matrix, dock capacity sidebar, live check-in queue, and appointment rescheduling engine.
2. **Dock Schedule (`/facilities/dock`)**: Gantt timeline visualizer tracking real-time dock bay utilization (Docks 1-4 + Gate), dwell time countdowns, bottleneck detection, AI schedule rebalancing, and equipment asset tracking (forklifts, weighbridges).
3. **Yard Operations & Floor Plan (`/facilities/yard`)**: Visual 2D interactive yard floor plan mapping Inbound, Outbound, Staging, and Storage zones. Supports trailer tracking, yard tractor shunting moves, zone congestion alerts, and real-time movement history.

---

## 2. Technical Architecture & File Structure

```
src/
├── pages/
│   └── Facilities/
│       ├── Facilities.css                 # Comprehensive facilities styling (Gantt, Yard 2D map, Calendar)
│       ├── Appointments.jsx               # Appointments calendar, check-in queue, reschedule modal
│       ├── DockSchedule.jsx               # Horizontal Gantt chart, dock utilization meters, AI optimizer
│       ├── YardManagement.jsx             # Visual 2D Yard map, trailer pins, zone inspector, move shunter form
│       └── components/
│           ├── AppointmentDetailModal.jsx # Full appointment inspector & timeline
│           ├── AppointmentCreateModal.jsx # New dock appointment booking wizard
│           ├── AppointmentRescheduleModal.jsx # Slot rebooking & notification trigger
│           ├── DockDetailModal.jsx        # Dock bay specifications & equipment inspector
│           └── YardMoveModal.jsx          # Tractor shunting / yard move dispatcher
└── utils/
    └── mockData/
        └── facilitiesData.js              # Comprehensive facility records, docks, appointments, yard zones & trailers
```

---

## 3. Detailed Component Specifications

### Suite A: Appointments Management (`/facilities`)
- **Facility Switcher**: Mumbai Mega Hub (Bhiwandi), Delhi NCR Gateway (Gurugram), Bengaluru Whitefield FC, Chennai Port Hub.
- **KPI Summary**: Total Appointments (456), Confirmed (284), Checked-In / In-Bay (82), Completed (76), Pending Reschedule (14).
- **Calendar & Matrix**:
  - 7-Day matrix view (06:00 - 22:00) with color-coded appointment pills (Blue = Pickup, Green = Delivery, Orange = Cross-dock).
  - Dock / Gate slot occupancy indicator meters in the sidebar.
- **Live Check-In Table**: Real-time queue for today's vehicles with `Check-In` and `Complete` buttons.
- **Modals**:
  - *Appointment Detail Modal*: Full shipment manifest, cargo volume, customer contact, and status timeline.
  - *Booking Wizard Modal*: Create new slot with truck registration, customer, cargo type, and dock assignment.
  - *Rescheduling Modal*: Pick new slot, select reason, and trigger automated SMS/Email notifications.

### Suite B: Dock Schedule (`/facilities/dock`)
- **Gantt Chart Timeline**:
  - Y-Axis: Docks 1–4, Reefer Bay, and Main Security Gate.
  - X-Axis: Hourly slots from 06:00 to 22:00 with visual current time indicator (08:15 IST).
  - Interactive appointment blocks with dwell time progress meters.
- **Right Sidebar Utilization Gauges**:
  - Docks 1–4 utilization bars (80%, 60%, 70%, 40%, 20%).
  - Bottleneck Alert banners with suggested actions.
- **Appointment Queue & AI Optimization**:
  - Sequence of upcoming appointments with countdown timers.
  - 1-Click "Optimize Dock Schedule" button to automatically balance dock loads.

### Suite C: Yard Operations & Visual 2D Map (`/facilities/yard`)
- **Interactive 2D Yard Map**:
  - Zones: **Inbound Docks (5 bays)**, **Outbound Docks (4 bays)**, **Marshalling & Staging Yard (12 slots)**, **Chassis & Long-Term Storage (20 slots)**, **Gate & Inspection**.
  - Color-coded vehicle & trailer pins (Ready = Green, Loading = Blue, Waiting = Orange, Parked = Gray).
  - Interactive zoom, pan, and click to inspect zone or trailer.
- **Zone Details Drawer**:
  - Occupancy % gauge, available weight & volume capacity, assigned material handling equipment (forklifts, pallet jacks), and congestion warning.
- **Yard Move Shunting Operations**:
  - Form: Move trailer from Zone A to Zone B, reason, tractor shunter operator assignment.
  - Real-time audit history of yard movements.

---

## 4. Implementation Steps
1. **Mock Data**: Create `src/utils/mockData/facilitiesData.js`.
2. **Styles**: Implement `src/pages/Facilities/Facilities.css`.
3. **Components**:
   - `Appointments.jsx` + modals (`AppointmentDetailModal.jsx`, `AppointmentCreateModal.jsx`, `AppointmentRescheduleModal.jsx`)
   - `DockSchedule.jsx` + `DockDetailModal.jsx`
   - `YardManagement.jsx` + `YardMoveModal.jsx`
4. **Router Configuration**: Wire `/facilities`, `/facilities/dock`, and `/facilities/yard` in `AppRouter.jsx`.
5. **Testing & Verification**: Run `npm run build`, verify in browser via `browser_subagent`, and commit/push to Git.
