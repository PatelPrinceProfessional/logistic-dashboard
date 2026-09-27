# Drivers Management & Driver App Architecture Plan

## 1. Overview & Objectives
Build a dual-suite Driver ecosystem:
1. **Enterprise Driver Management (`/drivers`)**: Fleet manager console for monitoring 487+ commercial drivers, verifying compliance/licensing, managing shifts, tracking telematics safety scores, analyzing performance KPIs, and handling payroll/earnings.
2. **Mobile-First Driver App (`/drivers/app`)**: Interactive digital driver companion featuring Pre-Trip Checklists, Active Manifest Navigation, Barcode Pickup Scans, Digital Proof of Delivery (POD Signature Pad & OTP), Expense Logging, Dispatcher Live Chat, and SOS Emergency Panic alerts.

---

## 2. Technical Architecture & File Structure

```
src/
├── pages/
│   └── Drivers/
│       ├── Drivers.css                  # Enterprise Web & Mobile App styles
│       ├── DriversList.jsx              # Web driver list, filters, bulk actions & 7-tab detail drawer/modal
│       ├── DriverApp.jsx                # Mobile-first driver companion with 5 tabs and task workflows
│       ├── components/
│       │   ├── DriverDetailModal.jsx    # 7-tab inspector: Profile, Documents, Assignments, Performance, Safety, Availability, Payroll
│       │   ├── DriverCreateModal.jsx    # New driver onboarding wizard
│       │   ├── PreTripChecklistModal.jsx# Driver vehicle inspection flow
│       │   ├── DeliveryPodModal.jsx     # Digital Signature canvas & OTP verification
│       │   ├── ExpenseLoggerModal.jsx   # On-road expense reporting
│       │   └── DispatchChatDrawer.jsx   # Live dispatcher messaging
└── utils/
    └── mockData/
        └── driversData.js               # Comprehensive driver records, compliance docs, shift schedules, and trip manifests
```

---

## 3. Key Feature Specifications

### Suite A: Driver Management Console (`/drivers`)
- **KPI Metrics Bar**: Total Drivers, Active On Duty, Available, Inactive/On Break, Compliance Rate (98.4%), Fleet Safety Avg (91/100).
- **Driver Table**: Real-time status indicators, avatar, license number & class, vehicle assignment, active certifications (Hazmat, Reefer, ODC), current geolocation, and HOS hours worked today.
- **Bulk Operations**: Bulk status updates, vehicle reassignment, SMS broadcast dispatch, and CSV/Excel export.
- **7-Tab Driver Detail View**:
  1. *Profile & License*: Personal info, commercial license status, valid certifications, assigned truck.
  2. *Documents & Compliance*: Regulatory document checklist (License, Insurance, Medical, Police verification) with expiry warnings.
  3. *Assignments & History*: Current vehicle and past trip history logs.
  4. *Performance Analytics*: On-time delivery rate, monthly completed trips, customer feedback score, and 3-month performance charts.
  5. *Safety & Telematics*: Safety score, harsh braking / speeding events log, defensive driving training status.
  6. *Availability & Schedule*: 7-day shift calendar matrix with shift assignment and time-off handling.
  7. *Payroll & Earnings*: Monthly earnings breakdown (Base, Trip Incentives, Bonuses) and payslips.

### Suite B: Mobile Driver App (`/drivers/app`)
- **Device Viewport Simulation**: Toggle between Realistic Phone Bezel Mode and Fluid Full-Screen Mode.
- **Bottom Navigation**:
  1. *Home*: Greeting, On-Duty switch, Active Trip HUD, Next Stop countdown, Quick Actions.
  2. *Trips*: Active & pending trips with detailed stops sequence.
  3. *Tracking & Nav*: Live map path, speed HUD, turn-by-turn guidance, and call customer triggers.
  4. *Profile & Earnings*: Digital ID badge, performance stats, and monthly earnings summary.
  5. *Support Chat*: Instant messaging with fleet dispatcher.
- **Interactive Modals**:
  - *Pre-Trip Checklist*: 7 safety verification points with vehicle status confirmation.
  - *Pickup & Barcode Scan*: Cargo inspection, quantity validation, and photo attachment.
  - *Delivery POD*: Interactive signature drawing canvas, OTP entry, goods condition checklist, and delivery note.
  - *Expense Logging*: Fuel, Toll, Detention, and Meal receipts.
  - *SOS Emergency Panic*: 3-second hold trigger with sirens, GPS broadcast, and emergency contact drawer.

---

## 4. Implementation Steps
1. **Mock Data**: Create `src/utils/mockData/driversData.js` with rich data for 10+ commercial drivers and full driver app manifests.
2. **Styles**: Implement `src/pages/Drivers/Drivers.css` with responsive layout, glassmorphic UI, signature canvas styling, and mobile bezel aesthetics.
3. **Driver Management Components**:
   - `DriversList.jsx`
   - `DriverDetailModal.jsx`
   - `DriverCreateModal.jsx`
4. **Driver App Suite**:
   - `DriverApp.jsx` with modals for Pre-Trip, Delivery POD (Canvas), Expenses, and Dispatch Chat.
5. **Routing & Navigation**: Wire `/drivers`, `/drivers/app`, and `/drivers/:id` in `AppRouter.jsx`.
6. **Validation & Verification**: Run `npm run build`, test in browser with `browser_subagent`, and commit/push to Git.
