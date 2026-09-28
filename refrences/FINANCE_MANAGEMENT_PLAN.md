# Enterprise Logistics Finance & Revenue Operations Architecture Plan
## Freight Audit, Carrier Invoices, Settlement, and Customer Billing

---

### 1. Executive Summary & Finance Topology

The **Finance Module** orchestrates end-to-end freight financial control, multi-party dispute resolution, automated 3-way matching, bank disbursements, and customer revenue cycles.

```
[Finance & Revenue Operations Suite]
 ├── /finance               -> Freight Audit (3-Way Matching, Tolerance Rules, Discrepancy & Dispute Engine)
 ├── /finance/invoices      -> Carrier Invoices (Invoice Intake, Line-item OCR, Approval Workflows, TDS/GST Matrix)
 ├── /finance/settlement    -> Settlement & Disbursements (Batch Payment Runs, NEFT/RTGS Banking, Escrow & Hold Release)
 └── /finance/billing       -> Customer Billing (B2B Invoicing, Index-Linked FSC, Aging Accounts Receivable Ledger)
```

---

### 2. Functional Breakdown by Sub-Section

#### 2.1 Freight Audit (`/finance`)
- **Core Purpose**: Automated financial validation of carrier bills against contractual rate cards, shipment telemetry (actual distance & weight), and pre-approved accessorial fees.
- **KPI Metrics Header**:
  - Total Audited Freight Value (e.g. ₹ 18.42 Cr)
  - Auto-Match Rate (94.2% Passed Zero Variance)
  - Disputed Overcharges Identified (₹ 24.8 Lakhs saved)
  - Pending Auditor Review (18 Invoices flagged)
- **3-Way Matching Engine**:
  - `Contract Rate Card / Tender Quote` (Agreed Base + Weight Slabs)
  - `Operational Execution Data` (GPS Odometer km, Scale Weighbridge kg, Toll FastTag Logs, Loading/Unloading Timestamps)
  - `Carrier Submitted Invoice` (Billed Base, Fuel Surcharge, Detention Hours, Tolls, Misc Accessorials)
- **Tolerance Engine & Discrepancy Categorization**:
  - Base Freight Variance (Weight discrepancy, distance mismatch)
  - Surcharge Variance (Unapproved detention hours, extra toll charges, driver loading fee)
  - Tolerance Band (e.g. ±1.5% or ₹500 auto-pass threshold)
- **Auditor Actions & Workflows**:
  - **Approve Invoice & Release for Settlement**: Automatically authorizes approved amount.
  - **Raise Dispute & Counter-Offer**: Generates formal debit note / deduction breakdown sent directly to carrier portal with proof attachments (GPS log, Weighbridge slip).
  - **Audit Tolerance Config Modal (`FreightAuditRuleModal.jsx`)**: Configure matching tolerances by carrier tier, route lane, and cargo type.

---

#### 2.2 Carrier Invoices (`/finance/invoices`)
- **Core Purpose**: Digital intake, OCR parsing, multi-tier approval matrix, and statutory tax deductions (TDS 194C @ 1% / 2%, Reverse Charge Mechanism GST).
- **KPI Metrics Header**:
  - Total Outstanding Carrier Payable (₹ 6.84 Cr)
  - Due in 7 Days (₹ 1.92 Cr)
  - Approved & Queued for Disbursement (₹ 2.45 Cr)
  - Invoices in Dispute (12 Invoices)
- **Invoice Ledger Table**:
  - Invoice Number & Carrier Details.
  - Associated Trip / Shipment ID.
  - Gross Invoice Amount, TDS Deduction (1% or 2%), RCM GST Status, Net Payable.
  - Payment Due Date & Credit Period Countdown (e.g. 15-day / 30-day terms).
  - Approval Hierarchy Status (Level 1 Dispatcher -> Level 2 Finance Lead -> Level 3 CFO).
- **Modals & Interactive Workflows**:
  - **Submit Carrier Invoice Modal (`CarrierInvoiceUploadModal.jsx`)**: Manual intake or OCR upload with automatic line-item matching.
  - **Invoice Review & Approval Modal (`CarrierInvoiceDetailModal.jsx`)**: Detailed breakdown of line items, rate comparison, and 1-click Approval / Rejection with remarks.

---

#### 2.3 Settlement & Disbursements (`/finance/settlement`)
- **Core Purpose**: Execution of batch payment runs, bank connectivity (NEFT/RTGS/IMPS/Virtual Accounts), escrow holding for damaged cargo, and payment advice generation.
- **KPI Metrics Header**:
  - Disbursed this Month (₹ 14.28 Cr across 420 Carriers)
  - Scheduled Batch Run Today (₹ 82.5 Lakhs)
  - Escrow & Detention Hold Reserves (₹ 18.2 Lakhs held pending POD / damage claims)
  - Banking Gateway Status (HDFC & ICICI Corporate API Connected)
- **Batch Disbursement Table**:
  - Batch ID & Payment Execution Date.
  - Beneficiary Carrier Name, Bank IFSC, Virtual Account Number.
  - Net Disbursed Amount (after TDS & approved freight deductions).
  - Transaction Reference UTR Number (with 1-click copy).
  - Disbursement Status (Success, Processing, Bank Rejected, On-Hold).
- **Modals & Workflows**:
  - **Create Payment Batch Modal (`PaymentBatchModal.jsx`)**: Select approved invoices, apply withholding/escrow deductions, choose bank gateway (NEFT/RTGS), and trigger batch payout.
  - **Payment Advice / Voucher Modal (`PaymentAdviceModal.jsx`)**: Official PDF-ready remittance advice showing trip deductions, TDS certificates, and UTR reference.

---

#### 2.4 Customer Billing (`/finance/billing`)
- **Core Purpose**: Outbound commercial invoicing to enterprise shippers, dynamic index-linked Fuel Surcharge (FSC) calculations, contract volume discount tiers, and Accounts Receivable (AR) aging.
- **KPI Metrics Header**:
  - Total Billed Revenue this Month (₹ 28.50 Cr)
  - Collections Realized (₹ 21.80 Cr)
  - Outstanding Receivables (₹ 6.70 Cr)
  - AR Aging Health: 0-30 Days (82%), 31-60 Days (14%), 60+ Days (4%)
- **Customer Invoices & Receivables Table**:
  - Invoice Number, Customer Name & GSTIN.
  - Contract Period & Order Volume.
  - Base Freight + Dynamic FSC (linked to national diesel index) + Accessorial Handling + GST.
  - Due Date & Days Overdue badge.
  - Payment Status (Paid, Partial, Overdue, Disputed).
- **Modals & Workflows**:
  - **Generate Customer Invoice Modal (`CustomerInvoiceGenerateModal.jsx`)**: Aggregate delivered shipments in a billing cycle (Weekly/Fortnightly/Monthly), compute diesel index adjustments, and generate official B2B invoice.
  - **Record Payment Collection Modal (`RecordPaymentModal.jsx`)**: Log customer wire receipt (NEFT/Cheque/Wire), record TDS deduction (194C @ 2%), and clear invoice balance.

---

### 3. Step-by-Step Implementation Roadmap

1. **Step 1: Dataset & Styling Foundation**
   - Create `src/utils/mockData/financeData.js` with comprehensive datasets for Freight Audit, Carrier Invoices, Settlements, and Customer Billing.
   - Create `src/pages/Finance/Finance.css` adhering to our high-polish design system with dark mode support, glassmorphic cards, currency formatting, and responsive tables.
2. **Step 2: Freight Audit Section (`/finance`)**
   - Implement `FreightAudit.jsx` with 3-way matching view, variance highlighting, auto-match filters, and dispute resolution workflows.
   - Implement `FreightAuditDetailModal.jsx` (side-by-side contract vs actual vs billed comparison).
   - Implement `FreightAuditRuleModal.jsx` (tolerance configuration).
3. **Step 3: Carrier Invoices Section (`/finance/invoices`)**
   - Implement `CarrierInvoices.jsx` with multi-tier approval statuses, TDS/GST computations, and credit terms countdowns.
   - Implement `CarrierInvoiceUploadModal.jsx` and `CarrierInvoiceDetailModal.jsx`.
4. **Step 4: Settlement & Disbursements Section (`/finance/settlement`)**
   - Implement `Settlement.jsx` with batch payout tables, banking telemetry, and escrow hold tracking.
   - Implement `PaymentBatchModal.jsx` and `PaymentAdviceModal.jsx`.
5. **Step 5: Customer Billing Section (`/finance/billing`)**
   - Implement `CustomerBilling.jsx` with AR aging analysis charts, index-linked FSC breakdowns, and invoice generation.
   - Implement `CustomerInvoiceGenerateModal.jsx` and `RecordPaymentModal.jsx`.
6. **Step 6: Route Wiring, Build Verification & Git Push**
   - Wire all 4 routes in `src/routes/AppRouter.jsx`.
   - Run `npm run build` to guarantee 0 errors.
   - Push to `origin main`.
