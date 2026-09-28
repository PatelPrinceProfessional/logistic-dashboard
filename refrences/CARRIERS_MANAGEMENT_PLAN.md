# 🚛 CARRIER MANAGEMENT & 3PL TRANSPORTER ECOSYSTEM PLAN

## 1. Executive Overview & Architecture
The **Carrier Management Suite** enables end-to-end management of 3PL logistics service providers, fleet owners, contracted linehaul transporters, and broker networks. It bridges automated rate contract compliance, dynamic load tendering, driver/vehicle compliance verification, freight audit integration, and carrier self-service.

---

## 2. Information Architecture & Route Topology

```
/carriers (CarriersList.jsx)
 ├── /carriers/rates (RateCards.jsx)
 ├── /carriers/contracts (Contracts.jsx)
 ├── /carriers/portal (CarrierPortal.jsx)
 └── /carriers/:id (CarrierDetail.jsx)
```

| Route Path | View / Component | Core Business Functionality |
|---|---|---|
| `/carriers` | `CarriersList.jsx` | Transporter directory, fleet capacity, safety ratings, KYC/GSTIN verification, placement SLA score, active loads, onboarding modal. |
| `/carriers/rates` | `RateCards.jsx` | Master tariff matrix by lane & vehicle type, dynamic fuel surcharge link, detention charges, minimum guarantee weights. |
| `/carriers/contracts` | `Contracts.jsx` | Master Service Agreements (MSAs), SLA penalty tiers, contract validity dates, digital signature status, automated expiry alerts. |
| `/carriers/portal` | `CarrierPortal.jsx` | Transporter self-service desk: Load tender acceptance, driver & vehicle allocation, e-POD submission, freight bill upload, payment UTR ledger. |
| `/carriers/:id` | `CarrierDetail.jsx` | Transporter 360° deep-dive: Fleet breakdown, compliance audit, rate cards, active trips, performance scorecards, and operational contacts. |

---

## 3. Detailed View Specifications

### 3.1 Carrier Directory (`CarriersList.jsx`)
- **KPI Metrics Strip**:
  - Total Registered Carriers (e.g. 218 Transporters)
  - Preferred Tier 1 Network (e.g. 48 Carriers, 72% Volume)
  - Fleet Capacity Pool (e.g. 4,850+ Commercial Trucks)
  - Average Placement Acceptance Rate (e.g. 96.8%)
  - Active Dispatches on Road (e.g. 184 Vehicles)
- **Filters & Search**:
  - Search by Transporter Name, GSTIN, Vendor Code, Operational Lanes, or Vehicle Types.
  - Filter by Carrier Tier: All / Tier 1 Preferred / Tier 2 Approved / Spot Only.
  - Filter by Verification Status: Verified / KYC Expiring / Blacklisted.
- **Transporter Table**:
  - Transporter Code & Legal Name
  - Verification & Safety Badges (ISO, Vahan KYC Verified)
  - Dedicated Fleet Size & Vehicle Configurations
  - Primary Lanes Coverage
  - Placement Acceptance SLA % & Transit On-Time SLA %
  - Performance Rating (1 to 5 Stars)
  - Quick Actions: "View 360°", "Edit Rates", "Launch Portal", "Export CSV"

---

### 3.2 Master Rate Cards (`RateCards.jsx`)
- **Dynamic Tariff Engine**:
  - Lane (Origin Hub → Destination Hub, Distance KM)
  - Carrier Name & Contract Code
  - Vehicle Type (24ft Container, 32ft MX, 40ft Trailer, 32ft Reefer)
  - Base Freight Rate (₹ per Trip or ₹ per Ton-Km)
  - Fuel Surcharge (FSC) Formula (e.g. Base Diesel ₹90/L + 1% per ₹1.50 rise)
  - Loading / Unloading Free Detention SLA (e.g. 4 hours free, ₹1,200/day detention)
  - Toll & State Permit Inclusion Policy
  - Create / Edit Rate Card Modal with instant margin simulator

---

### 3.3 Transporter Contracts & MSAs (`Contracts.jsx`)
- **Contract Governance**:
  - Master Service Agreement (MSA) Reference Number & Title
  - Carrier Legal Entity & Signatory
  - Validity Range (Effective Date to Expiration Date)
  - SLA Performance Guarantees (98% Placement within 4 hours)
  - Penalty Schedules (Delayed placement ₹2,000/day, In-transit temperature breach 100% cargo claim)
  - Contract Status: Active / In Renewal / Expired / Draft
  - Action: Download MSA Document, Request Renewal, Trigger e-Sign

---

### 3.4 Transporter Self-Service Portal (`CarrierPortal.jsx`)
- **Multi-Tenant Carrier Switcher**:
  - Switch between top carriers (VRL Logistics, TCI Freight, Safexpress, Delhivery Enterprise, CJ Darcl Logistics, Gati KWE).
- **Tabbed Portal Interface**:
  1. **Tab 1: Available Loads & Spot RFQs**: View pending open shipments, review target rate, submit bidding offer with truck registration and estimated placement time.
  2. **Tab 2: Active Dispatches & Trips**: Allocated shipments in transit, update milestone check-in, assign/swap driver and vehicle.
  3. **Tab 3: e-POD & Invoice Submission**: Upload scanned/mobile consignee signed e-POD, generate invoice for automated Freight Audit.
  4. **Tab 4: Settlement & UTR Ledger**: Track verified freight payouts, advance fuel card disbursals, TDS deductions, and bank transaction reference numbers.
  5. **Tab 5: Fleet & Driver Onboarding**: Register new trucks and drivers with instant simulated Vahan RC and DL verification.

---

### 3.5 Transporter 360° Deep Dive (`CarrierDetail.jsx`)
- **Summary Header**: Carrier name, tier badge, vendor code, registered address, GSTIN, PAN, Bank IFSC, and Account Lead.
- **Performance Radar**: Placement SLA, On-Time Delivery, Low-Damage Score, Electronic Tracking Compliance.
- **Sub-Panels**:
  - Fleet Breakdown by vehicle category.
  - Active Rate Cards with negotiated lanes.
  - Active Trips in flight.
  - Contact Matrix (Operations GM, Fleet Dispatcher, Billing Lead).

---

## 4. UI/UX & Design System Alignment
- **Styling Architecture**: Glassmorphism cards with `backdrop-blur-md`, vibrant cyan/amber/emerald badges, crisp typography with Google Fonts `Inter`, and smooth micro-interactions.
- **Layout Compliance**: Every view is wrapped in `<Layout title="..." breadcrumbs={[...]}>` to guarantee permanent visibility of the global Navbar and Sidebar.
