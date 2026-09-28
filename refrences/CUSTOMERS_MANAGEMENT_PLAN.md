# Customer Management & Shipper Self-Service Portal Architecture Plan
## Customer Directory, Account 360°, and Enterprise Shipper Portal

---

### 1. Architectural Scope & Module Overview

The **Customer Section** provides an end-to-end B2B client management suite:

```
[Customer Relationship & Portal Suite]
 ├── /customers               -> Customer List (Enterprise Accounts Directory, SLA Tiers, Credit Limits, Account Health)
 ├── /customers/portal        -> Customer Portal (Dedicated Shipper Self-Service Desk, Spot Booking, Live Tracking, Analytics)
 └── /customers/:id           -> Customer Detail (Account 360°, Contracted Lanes, Invoiced Ledger, Contacts & Escalation)
```

---

### 2. Detailed Functional Specifications

#### 2.1 Customer List (`/customers`)
- **KPI Summary Header**:
  - Total Active Shipper Accounts (e.g. 142 Enterprise Clients)
  - Platinum Tier Accounts (34 Accounts > ₹ 1 Cr / month)
  - On-Time Delivery SLA Performance (98.6% across accounts)
  - Total Monthly Client GMV (₹ 38.40 Cr)
  - Credit Utilization Health (68.4% of ₹ 25 Cr aggregate limit)
- **Filter & Search Bar**:
  - Search by Customer Name, GSTIN, Account Code, Account Manager, City.
  - Filter by Tier: All, Platinum, Gold, Silver, Bronze.
  - Filter by Industry: Automotive, FMCG, Electronics, Pharmaceuticals, Retail.
  - Filter by Account Health: Healthy, At-Risk SLA, Payment Overdue, In-Review.
- **Interactive Customers Ledger Table**:
  - Customer Name & Logo badge with Account Code (`CUST-TAT-01`).
  - Industry & Primary Origin-Destination Lane corridors.
  - SLA Tier badge (Platinum, Gold, Silver).
  - Monthly Freight Volume (MT) & Spend (₹).
  - Credit Limit & Current Outstanding Balance meter.
  - Assigned Key Account Manager (KAM).
  - On-Time SLA % gauge.
  - Quick Actions: "View 360° Profile", "Edit Account", "Open Client Portal View".
- **Modals & Workflows**:
  - **Onboard Customer Modal (`CustomerCreateModal.jsx`)**: Comprehensive onboarding with legal name, GSTIN, PAN, credit limit, SLA tier, payment terms (Net 15/30/45), contract dates, and contact persons.
  - **Quick Edit Account Modal (`CustomerEditModal.jsx`)**: Adjust credit limits, assigned account manager, and SLA tiers.

---

#### 2.2 Customer Portal (`/customers/portal`)
- **Core Shipper Self-Service Experience**: A dedicated client-facing interface allowing enterprise clients (e.g. Tata Motors, Reliance Retail) to manage their freight operations independently.
- **Shipper Portal Selector**: Switch client view (e.g. Tata Motors Ltd, Reliance Retail, Havells India, Sun Pharma) with instant branding adaptation.
- **Portal Interactive Tabs**:
  1. **Dashboard & Live Track**:
     - Active in-transit shipments count, on-time delivery ETA monitor, exceptions alert ticker.
     - Live shipment tracking search with instant status progress bar (Dispatched -> In-Transit -> Out for Delivery -> Delivered).
  2. **Instant Rate Quote & Spot Booking Wizard**:
     - Origin & Destination Pincode lookup.
     - Cargo type (FCL 32ft, LCL, Reefer, Flatbed) & weight (MT).
     - Live calculated spot rate with AI transit time estimate.
     - 1-click "Submit Booking Request" which feeds directly into TMS Order Validation.
  3. **e-POD & Invoices Repository**:
     - Instant search and download of digital delivery receipts (e-POD with recipient signatures) and GST tax invoices.
  4. **Sustainability & Carbon Footprint Widget**:
     - CO2 emissions saved (kg CO2e) through multimodal rail/road optimization and Green Fleet routing.
  5. **Support & Service Desk Desk**:
     - Raise instant ticket (Late Delivery, Cargo Damage, Proof of Delivery Request) with SLA response countdown.

---

#### 2.3 Customer Detail Account 360° (`/customers/:id`)
- **Deep-Dive Enterprise Profile**:
  - Header with legal entity details, GSTIN, billing address, credit rating, and contract validity.
  - Financial Health: Total Lifetime Spend, Outstanding Invoices, Average Payment DSO (Days Sales Outstanding).
  - Active Shipments Tab: Real-time list of shipments currently in-transit for this customer.
  - Contracted Rate Cards Tab: Route lane price matrix (Base/km, Fuel Surcharge formula, Detention free hours).
  - Key Contacts Directory: Primary logistics lead, warehouse dispatchers, and finance AP contact.

---

### 3. File & Component Structure
- `src/utils/mockData/customersData.js` (Rich dataset of enterprise accounts, contracted lanes, live portal sessions, spot quotes, and tickets)
- `src/pages/Customers/Customers.css` (Glassmorphic design system, SLA badges, credit utilization progress bars, portal layout)
- `src/pages/Customers/components/`:
  - `CustomerCreateModal.jsx`
  - `CustomerEditModal.jsx`
  - `SpotBookingModal.jsx`
  - `SupportTicketModal.jsx`
- `src/pages/Customers/CustomersList.jsx` (`/customers`)
- `src/pages/Customers/CustomerPortal.jsx` (`/customers/portal`)
- `src/pages/Customers/CustomerDetail.jsx` (`/customers/:id`)
