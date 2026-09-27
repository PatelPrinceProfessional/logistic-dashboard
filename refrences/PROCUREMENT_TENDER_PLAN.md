# LogisticsHub — Procurement & Freight Tendering Architecture Plan (Section 9)

## 1. Executive Overview
The **Procurement & Tender Management** module automates freight rate discovery, spot market tendering, contract RFQs, carrier bid evaluation, and automated load awarding. It bridges transportation planning with carrier dispatch operations through an interactive 6-stage Kanban board and a 4-step multi-load RFQ creation wizard.

---

## 2. Page & Route Specifications

| Route | View Component | Key Functionality |
|---|---|---|
| `/procurement` | `TenderBoard.jsx` | 6-Stage Kanban Board (Draft, Sent, Responses Received, Evaluated, Awarded, Rejected), View switcher (Kanban/List), Carrier Bids Evaluation Modal, 4-factor scoring matrix. |
| `/procurement/rfq` | `CreateRFQ.jsx` | 4-Step Wizard: (1) Pending Shipment Selection, (2) Tender Rules & Pricing Model, (3) Carrier Directory & Broadcast, (4) Review & Dispatch. |

---

## 3. Detailed Functional Modules & Workflows

### 3.1 Tender Board (`/procurement`)
1. **Interactive 6-Stage Kanban Pipeline**:
   - **Column 1 — Draft (Created, awaiting send)**: Tenders generated from unplanned shipments. Quick-send to preferred carriers, edit parameters, or delete.
   - **Column 2 — Sent (Active tenders, awaiting responses)**: Live countdown timers ("Responses due in 4h 15m"), invited carrier avatar circles, live quote counter badge (e.g. `2/4 received`).
   - **Column 3 — Responses Received (Awaiting evaluation)**: Carrier quotes received, best quoted price highlight, instant one-click "Evaluate Bids" launcher.
   - **Column 4 — Evaluated (Ready to award)**: Algorithmic recommendation badge (`ABC Logistics - $245 - 92.4 Score`), side-by-side alternative bids, "Approve & Award" or "Override" buttons.
   - **Column 5 — Awarded (Assigned to carrier)**: Final contract rate, confirmation timestamp, automated trigger to Trip Dispatch queue.
   - **Column 6 — Rejected / Declined**: Log of declined tenders with reasons ("Capacity Full", "Equipment Mismatch") with instant "Re-Tender to Spot Market" button.

2. **Carrier Bids Evaluation Modal**:
   - Comprehensive cargo summary: Origin → Destination, gross weight, volume, hazardous/temp classification, pickup & delivery windows.
   - Multi-Criteria Decision Analysis (MCDA) Scoring Engine:
     - **Price Weight (40%)**: Normalized bid vs target benchmark rate.
     - **Reliability OTP Weight (30%)**: Historical carrier on-time delivery score.
     - **Capacity Fit (20%)**: Equipment match and lane volume.
     - **ESG / Sustainability (10%)**: Carbon emission index.
   - Interactive Bid Table with one-click **Award Contract** and **Decline** actions.

---

### 3.2 RFQ & Spot Tender Creation Wizard (`/procurement/rfq`)
1. **Step 1: Shipment & Load Selection**:
   - Filterable table of unassigned pending freight orders (`SHP-100245` - `SHP-100260`).
   - Multi-select checkboxes, live aggregate tally (Total shipments, total weight in kg, total volume in m³).
2. **Step 2: Tender Configuration & Pricing Model**:
   - Tender Type: Point-to-Point Spot, Multi-Stop Network Run, Dedicated Lane Contract.
   - Service Level: Economy Standard, Express 24h, Critical Same-Day.
   - Price Basis: Flat Per-Trip, Per-Kg, Per-Km, Fuel-Surcharge inclusive.
   - Automated Award Rules: Auto-award if lowest bid below target budget, single-bid auto-accept option.
3. **Step 3: Carrier Directory & Broadcast Selection**:
   - Filter carriers by region, historical OTP score, and equipment availability.
   - Selected carrier pill list with quick add/remove.
4. **Step 4: Review, Budget Simulation & Dispatch**:
   - Complete tender payload preview, cost estimation bounds, response deadline countdown selector, and one-click "Broadcast RFQ to Carriers".

---

## 4. UI/UX Design System & Layout Strategy
- **Kanban Board**: Horizontal scrollable container with responsive column widths, crisp column header badges, and interactive glassmorphic cards.
- **Color Coding**:
  - Draft: Slate Gray (`#64748b`)
  - Sent / Active: Blue (`#2563eb`)
  - Responses: Amber (`#f59e0b`)
  - Evaluated: Purple (`#7c3aed`)
  - Awarded: Emerald Green (`#10b981`)
  - Rejected: Crimson Red (`#ef4444`)
- **Theme Support**: Pristine, high-contrast light surfaces with seamless dark mode tokens.
