# Documents Management Architecture & Implementation Plan
## All Documents, E-Way Bill (NIC / GST), and E-Invoice (IRN / IRP)

---

### 1. Architectural Scope & Functional Overview

The Documents module serves as the central digital compliance vault, GST e-Way Bill automation engine, and IRP E-Invoice lifecycle manager for enterprise logistics operations.

```
[Documents Suite]
 ├── /documents               -> All Documents (Digital Vault, OCR Extraction, Multi-Type Document Ledger)
 ├── /documents/eway-bill     -> E-Way Bill Management (Part-A/B Generation, Live Validity Tracker, Vehicle Update, Extension)
 └── /documents/einvoice      -> E-Invoice (IRN) Management (IRP Sync, Signed QR Code, Tax Breakdown, Cancel & Credit Notes)
```

---

### 2. Module Specifications

#### 2.1 All Documents (`/documents`)
- **KPI Summary Cards**:
  - Total Active Documents (e.g. 1,428)
  - OCR Verified & Matched (98.4%)
  - Expiring in 7 Days (Vehicle PUC / Insurance / Permits)
  - Pending Review / Flagged Discrepancies
- **Filter & Search Bar**:
  - Search by Document ID, Shipment ID, Order ID, Vehicle Plate, Customer/Carrier.
  - Filter by Category: All, E-Way Bill, Tax Invoice, Proof of Delivery (POD), Bill of Lading (BOL), Gate Pass, Insurance/Permits.
  - Filter by Status: Verified, Pending OCR, Expiring Soon, Expired, Rejected.
- **Interactive Document Ledger Table**:
  - Checkbox multi-select for batch download / zip export.
  - Document Title & Type icon badge.
  - Associated Entity (Shipment / Order / Vehicle).
  - File Size & Format (PDF, JPEG, XML, JSON).
  - OCR Confidence Score & Uploaded Timestamp.
  - Compliance Status Pill.
  - Quick Actions: "View / Preview", "Download", "Verify", "Re-run OCR".
- **Upload Modal (`DocumentUploadModal.jsx`)**:
  - Drag-and-drop zone with auto-detection of document type.
  - Entity tagging (link to Shipment, Order, or Vehicle).
  - Instant OCR text & field extraction simulation.
- **Document Preview & Inspection Modal (`DocumentPreviewModal.jsx`)**:
  - Full-screen / side drawer preview of document rendering (e-POD with signature & geo-stamp, BOL, Tax Invoice).
  - Metadata inspector, OCR extracted fields, version history, audit logs.

---

#### 2.2 E-Way Bill Management (`/documents/eway-bill`)
- **NIC Portal Live Status & KPI Bar**:
  - Active E-Way Bills (e.g. 248)
  - Expiring in < 8 Hours (Urgent Validity Extension needed)
  - Multimodal In-Transit (Road, Rail, Air)
  - Consolidated E-Way Bills Generated
- **Part-A / Part-B Status Matrix**:
  - Part-A: Consignor/Consignee GSTIN, Invoice Number, Value, HSN Codes.
  - Part-B: Vehicle Number, Transporter ID, From/To Pin Code, Distance (km).
- **Interactive E-Way Bill Data Table**:
  - EWB Number (12-digit format, e.g. `2410 8892 0192`) with 1-click copy.
  - Validity Countdown Bar (Color-coded: Green > 24h, Yellow 8-24h, Red < 8h).
  - Vehicle Plate (`MH-04-AB-1234`) with "Update Vehicle (Part-B)" action.
  - Associated Shipment & Transporter Name.
  - Origin & Destination Pin Codes with auto-calculated distance.
- **E-Way Bill Actions**:
  - **Generate E-Way Bill Modal (`EWayBillGenerateModal.jsx`)**: Instant generation from Order / Shipment manifest with GSTIN validation.
  - **Update Vehicle (Part-B) Modal (`EWayBillVehicleModal.jsx`)**: Update vehicle during transshipment or breakdown with reason code.
  - **Extend Validity Modal (`EWayBillExtendModal.jsx`)**: Extend validity within 8 hours before/after expiry with transit delay reasons.
  - **Cancel E-Way Bill Modal (`EWayBillCancelModal.jsx`)**: 24-hour cancellation window compliance with reason log.
  - **Printable E-Way Bill Document Modal (`EWayBillPrintModal.jsx`)**: Official NIC-style E-Way Bill format with verifiable QR Code and barcode.

---

#### 2.3 E-Invoice (IRN) Management (`/documents/einvoice`)
- **IRP Portal Sync & Financial KPI Summary**:
  - Total E-Invoices Generated this Month (₹4.82 Cr Total Value)
  - Active IRN Hashes (64-char cryptographic identifiers)
  - B2B vs B2G vs Export Tax Breakdown (CGST, SGST, IGST)
  - Cancelled Invoices (within 24 hours of generation)
- **Interactive E-Invoice Data Table**:
  - Invoice Number & Date.
  - 64-char IRN Hash (truncated with copy & verify tooltip).
  - Recipient GSTIN & Legal Entity Name.
  - Taxable Value, CGST, SGST, IGST, and Total Invoice Amount.
  - Signed QR Code status & Digital Signature verification.
  - Status: Generated, Sent to Customer, Cancelled, Credit Note Issued.
- **E-Invoice Actions**:
  - **Generate E-Invoice Modal (`EInvoiceGenerateModal.jsx`)**: Create B2B tax invoice with itemized HSN codes, tax rates, buyer GSTIN lookup.
  - **Signed QR Code & Invoice Viewer Modal (`EInvoiceViewModal.jsx`)**: Official GST IRP format showing B2B invoice layout, tax calculation matrix, and scanned QR code payload.
  - **Issue Credit / Debit Note Modal (`EInvoiceCreditNoteModal.jsx`)**: Formal adjustment with original IRN reference and GST reason codes.
  - **Cancel IRN Modal (`EInvoiceCancelModal.jsx`)**: NIC 24-hour cancellation with reason (Data Entry Mistake, Order Cancelled, Duplicate).

---

### 3. File & Component Structure
- `src/utils/mockData/documentsData.js` (Rich dataset of documents, E-Way bills, E-invoices, and tax rates)
- `src/pages/Documents/Documents.css` (Glassmorphic document vaults, barcode/QR styles, countdown meters)
- `src/pages/Documents/components/`:
  - `DocumentUploadModal.jsx`
  - `DocumentPreviewModal.jsx`
  - `EWayBillGenerateModal.jsx`
  - `EWayBillVehicleModal.jsx`
  - `EWayBillExtendModal.jsx`
  - `EWayBillCancelModal.jsx`
  - `EWayBillPrintModal.jsx`
  - `EInvoiceGenerateModal.jsx`
  - `EInvoiceViewModal.jsx`
  - `EInvoiceCreditNoteModal.jsx`
  - `EInvoiceCancelModal.jsx`
- `src/pages/Documents/DocumentsList.jsx` (`/documents`)
- `src/pages/Documents/EWayBillManagement.jsx` (`/documents/eway-bill`)
- `src/pages/Documents/EInvoiceManagement.jsx` (`/documents/einvoice`)
