# 📊 ANALYTICS & BI SUITE ARCHITECTURE PLAN

## 1. Executive Summary
The **Analytics & Business Intelligence (BI)** Suite delivers enterprise-level decision intelligence for logistics leaders, supply chain vice-presidents, and operations heads. It aggregates telemetry across Orders, Planning, Dispatch, IoT Telematics, Freight Audit, Carrier MSAs, and ESG reporting into high-frequency visual intelligence and customizable executive reports.

---

## 2. Route Topology & Page Architecture

```
/analytics (AnalyticsDashboard.jsx)
 ├── /analytics/reports (BIReports.jsx)
 └── /analytics/sustainability (Sustainability.jsx)
```

| Route Path | View / Component | Core Business Functionality |
|---|---|---|
| `/analytics` | `AnalyticsDashboard.jsx` | Executive Multi-KPI Dashboard: On-Time In-Full (OTIF), Cost per Ton-KM, Network Lane Heatmap, Carrier Performance Scatter, Freight Spend vs Budget, Forecast vs Actual Volume. |
| `/analytics/reports` | `BIReports.jsx` | Self-Service BI Report Generator: Pre-built templates (Carrier Scorecard, Lane Profitability, Cost-to-Serve, SLA Breaches), Custom Query Builder, CSV/Excel/PDF Export, Automated Scheduled Delivery. |
| `/analytics/sustainability` | `Sustainability.jsx` | ESG & Scope 3 Decarbonization Hub: GLEC & ISO 14064 certified CO₂ emissions calculator, Multimodal rail-electric transition, Empty-miles reduction, Carbon Offset certificate generator. |

---

## 3. Detailed View Specifications

### 3.1 Analytics Dashboard (`AnalyticsDashboard.jsx`)
- **Executive Metric Strip**:
  - **OTIF (On-Time In-Full) Delivery %**: 98.4% (vs 95.0% SLA target)
  - **Average Cost per Ton-KM**: ₹ 2.34 (Down 4.2% YoY)
  - **Monthly Freight Spend**: ₹ 42.80 Cr (Within 1.8% budget tolerance)
  - **Fleet Asset Utilization**: 88.6% (12.4% empty miles reduced)
  - **Total Network Volume**: 48,200 MT (Across 14 national corridors)
- **Interactive Multi-Chart Layouts**:
  1. **Network Lane Volume & Freight Spend Matrix**: Interactive lane comparison with volume MT and cost per ton-km.
  2. **Carrier SLA Performance vs Spend Bubble Scatter**: Compares Carriers by Placement SLA %, On-Time Delivery %, and Monthly GMV allocation.
  3. **OTIF Trend Line Chart (Last 6 Months)**: On-Time vs Delayed vs Damaged linehaul consignments.
  4. **Dynamic Period Switcher**: MTD, QTD, YTD, Last 30 Days, Custom Range.

---

### 3.2 BI Reports & Self-Service Query Engine (`BIReports.jsx`)
- **Report Catalog & Templates**:
  - *Monthly Carrier Scorecard & Placement Compliance*
  - *Cost-to-Serve & Lane Margin Contribution Analysis*
  - *SLA Penalty & Freight Audit Exception Audit Trail*
  - *Detention & Plant Gate Dwell Time Diagnostic*
  - *Consolidated GST & TDS E-Way Bill Reconciliation*
- **Report Actions**:
  - Instant CSV / PDF / Excel generation.
  - Interactive drill-down table with sorting and filtering.
  - "Custom Report Builder Modal" allowing selection of dimensions, metrics, date filters, and email schedule.

---

### 3.3 ESG & Scope 3 Sustainability (`Sustainability.jsx`)
- **Carbon Accounting (ISO 14064 / GLEC Framework)**:
  - Total Scope 3 Linehaul CO₂ Emissions (e.g. 1,420 MT CO₂e)
  - CO₂ Avoided via Route Optimization (e.g. 312 MT CO₂e)
  - Dedicated Freight Multimodal Rail Conversion Share (e.g. 34.8%)
  - Green Score Rating: `A+ (Exceeds ESG 2026 Mandate)`
- **Emissions by Transport Mode & Fuel Type**:
  - Electric Dedicated Freight Corridor (DFC) vs Euro-VI Heavy Haul vs CNG Fleets.
- **Offset & Compliance Generator**:
  - "Generate ESG Audit Certificate (PDF)" for regulatory filing.
  - "Purchase Verified Carbon Offsets" simulated modal.

---

## 4. UI/UX Standards & Layout
- 100% wrapped in `<Layout title="..." breadcrumbs={[...]}>` for sticky top Navbar and left Sidebar.
- Clean Recharts-powered data visualizations, glassmorphic cards, Oklch/Display-P3 vibrant color tokens, zero placeholders.
