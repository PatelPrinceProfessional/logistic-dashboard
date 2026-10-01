import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  Receipt,
  ShieldCheck,
  Building2,
  FileCheck,
  Search,
  Filter,
  Plus,
  Copy,
  Check,
  Printer,
  QrCode,
  Download,
  AlertTriangle,
  RotateCw,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  Square,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  FileText,
  CreditCard,
  Percent,
  Hash,
  ArrowUpRight,
  ShieldAlert,
  Eye,
} from 'lucide-react';
import { einvoicesSummaryStats, einvoicesList as initialEinvoices } from '../../utils/mockData/documentsData';
import EInvoiceGenerateModal from './components/EInvoiceGenerateModal';
import EInvoiceViewModal from './components/EInvoiceViewModal';
import './Documents.css';

export default function EInvoiceManagement() {
  const [einvoices, setEinvoices] = useState(initialEinvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [supplyTypeFilter, setSupplyTypeFilter] = useState('ALL');
  const [gstrSyncFilter, setGstrSyncFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST');
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [viewModalEinvoice, setViewModalEinvoice] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyIrn = (irn, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(irn);
    setCopiedId(id);
    showToast(`Copied 64-character IRN cryptographic hash!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Status Filter Tabs
  const statusTabs = [
    { id: 'ALL', label: 'All E-Invoices' },
    { id: 'ACTIVE', label: 'Generated & Active' },
    { id: 'CREDIT_NOTE', label: 'Credit Notes' },
    { id: 'CANCELLED', label: 'Cancelled (24h Window)' },
  ];

  // Dynamic Tab Counts
  const tabCounts = useMemo(() => {
    return {
      ALL: einvoices.length,
      ACTIVE: einvoices.filter((i) => i.status.toLowerCase().includes('active') || i.status.toLowerCase().includes('generated')).length,
      CREDIT_NOTE: einvoices.filter((i) => i.status.toLowerCase().includes('credit note')).length,
      CANCELLED: einvoices.filter((i) => i.status.toLowerCase().includes('cancelled')).length,
    };
  }, [einvoices]);

  // Filtered and Sorted list
  const filteredEinvoices = useMemo(() => {
    let result = einvoices.filter((inv) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.irnHash.toLowerCase().includes(q) ||
        inv.buyerLegalName.toLowerCase().includes(q) ||
        inv.buyerGstin.toLowerCase().includes(q) ||
        inv.ackNumber.toLowerCase().includes(q) ||
        inv.associatedShipment.toLowerCase().includes(q);

      const matchesTab =
        activeTab === 'ALL' ||
        (activeTab === 'ACTIVE' && (inv.status.toLowerCase().includes('active') || inv.status.toLowerCase().includes('generated'))) ||
        (activeTab === 'CREDIT_NOTE' && inv.status.toLowerCase().includes('credit note')) ||
        (activeTab === 'CANCELLED' && inv.status.toLowerCase().includes('cancelled'));

      const matchesSupplyType =
        supplyTypeFilter === 'ALL' ||
        (supplyTypeFilter === 'B2B' && inv.supplyType.includes('B2B')) ||
        (supplyTypeFilter === 'SEZ' && inv.supplyType.includes('SEZ')) ||
        (supplyTypeFilter === 'INTRA' && inv.supplyType.includes('Intra-State'));

      const matchesGstrSync =
        gstrSyncFilter === 'ALL' ||
        (gstrSyncFilter === 'SYNCED' && inv.gstr1SyncStatus.includes('Table 4A')) ||
        (gstrSyncFilter === 'ADJUSTED' && inv.gstr1SyncStatus.includes('Table 9B'));

      return matchesSearch && matchesTab && matchesSupplyType && matchesGstrSync;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'VALUE_DESC') {
        return b.totalInvoiceValue - a.totalInvoiceValue;
      }
      if (sortBy === 'NEWEST') {
        return new Date(b.invoiceDate || 0) - new Date(a.invoiceDate || 0);
      }
      if (sortBy === 'TAXABLE_DESC') {
        return b.taxableValue - a.taxableValue;
      }
      if (sortBy === 'INVOICE_ASC') {
        return a.invoiceNumber.localeCompare(b.invoiceNumber);
      }
      return 0;
    });

    return result;
  }, [einvoices, searchQuery, activeTab, supplyTypeFilter, gstrSyncFilter, sortBy]);

  const handleSelectAll = () => {
    if (selectedInvoiceIds.length === filteredEinvoices.length && filteredEinvoices.length > 0) {
      setSelectedInvoiceIds([]);
    } else {
      setSelectedInvoiceIds(filteredEinvoices.map((i) => i.id));
    }
  };

  const handleToggleSelect = (id, e) => {
    e.stopPropagation();
    if (selectedInvoiceIds.includes(id)) {
      setSelectedInvoiceIds(selectedInvoiceIds.filter((item) => item !== id));
    } else {
      setSelectedInvoiceIds([...selectedInvoiceIds, id]);
    }
  };

  const handleGenerateSuccess = (newEinvoice) => {
    setEinvoices((prev) => [newEinvoice, ...prev]);
    setIsGenerateOpen(false);
    showToast(`Tax E-Invoice ${newEinvoice.invoiceNumber} registered on GST IRP!`);
  };

  const handleCancelIrn = (inv, e) => {
    e.stopPropagation();
    const reason = window.prompt('Enter IRP Reason for Cancellation (e.g., Data Entry Mistake, Order Cancelled):');
    if (!reason) return;

    setEinvoices((prev) =>
      prev.map((item) =>
        item.id === inv.id
          ? {
              ...item,
              status: 'Cancelled (IRP 24h Window)',
              gstr1SyncStatus: 'Cancelled on GST Portal',
            }
          : item
      )
    );
    showToast(`IRN for Invoice #${inv.invoiceNumber} cancelled on GST Portal: ${reason}`);
  };

  const handleIssueCreditNote = (inv, e) => {
    e.stopPropagation();
    const reason = window.prompt('Enter Credit Note adjustment reason (e.g., Rate Discrepancy / Return):');
    if (!reason) return;

    setEinvoices((prev) =>
      prev.map((item) =>
        item.id === inv.id
          ? {
              ...item,
              status: 'Credit Note Issued',
              gstr1SyncStatus: 'Table 9B Adjusted',
            }
          : item
      )
    );
    showToast(`Credit Note issued against IRN #${inv.irnHash.substring(0, 12)}...`);
  };

  const exportB2BTaxLedgerCSV = () => {
    const headers = 'Invoice Number,Invoice Date,Supply Type,IRN Hash,Ack Number,Buyer Name,Buyer GSTIN,Place of Supply,Taxable Value (INR),IGST (INR),CGST (INR),SGST (INR),Total Value (INR),Status,GSTR-1 Status\n';
    const rows = filteredEinvoices
      .map(
        (i) =>
          `"${i.invoiceNumber}","${i.invoiceDate}","${i.supplyType}","${i.irnHash}","${i.ackNumber}","${i.buyerLegalName}","${i.buyerGstin}","${i.placeOfSupply}",${i.taxableValue},${i.igstAmount},${i.cgstAmount},${i.sgstAmount},${i.totalInvoiceValue},"${i.status}","${i.gstr1SyncStatus}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GST_EInvoices_Tax_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Exported B2B Tax E-Invoice ledger CSV report.');
  };

  const handleBulkPrint = () => {
    if (selectedInvoiceIds.length === 0) return;
    showToast(`Preparing official signed tax invoice batch for ${selectedInvoiceIds.length} records...`);
  };

  const handleBulkGstrSync = () => {
    if (selectedInvoiceIds.length === 0) return;
    showToast(`Syncing ${selectedInvoiceIds.length} B2B invoices to GSTR-1 Table 4A...`);
    setSelectedInvoiceIds([]);
  };

  const getStatusBadge = (inv) => {
    const status = inv.status.toLowerCase();
    if (status.includes('cancelled')) {
      return (
        <span className="doc-status-badge doc-status-badge--flagged">
          <span className="doc-status-dot doc-status-dot--flagged" />
          <span>Cancelled (24h Window)</span>
        </span>
      );
    }
    if (status.includes('credit note')) {
      return (
        <span className="doc-status-badge doc-status-badge--expiring">
          <span className="doc-status-dot doc-status-dot--expiring" />
          <span>Credit Note Issued</span>
        </span>
      );
    }
    return (
      <span className="doc-status-badge doc-status-badge--verified">
        <span className="doc-status-dot doc-status-dot--verified" />
        <span>Generated & Active</span>
      </span>
    );
  };

  const getSupplyTypeBadge = (type) => {
    if (type.includes('SEZ')) {
      return <span className="doc-category-badge doc-category-badge--gate_pass">{type}</span>;
    }
    if (type.includes('Intra')) {
      return <span className="doc-category-badge doc-category-badge--pod">{type}</span>;
    }
    return <span className="doc-category-badge doc-category-badge--e_invoice">{type}</span>;
  };

  return (
    <Layout
      title="GST E-Invoice & IRN Portal"
      breadcrumbs={[{ label: 'Documents', path: '/documents' }, { label: 'E-Invoice' }]}
    >
      <div className="documents-page-container">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="doc-toast-notification">
            <CheckCircle2 size={16} color="#10b981" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── 1. Top Header Row ── */}
        <div className="documents-header-row">
          <div className="documents-header-left">
            <div className="documents-pill-badge">
              <Receipt size={13} />
              <span>Invoice Registration Portal (IRP) Integration</span>
              <span className="documents-pill-dot" />
              <span className="documents-pill-sub">ClearTax / NIC Active</span>
            </div>
            <h1 className="documents-title">E-Invoice (IRN) & B2B Tax Ledger</h1>
            <p className="documents-subtitle">
              Automated 64-character IRN cryptographic hashing, RSA signed digital QR code verification, GSTR-1 real-time reconciliation, and credit notes.
            </p>
          </div>

          <div className="documents-header-actions">
            <button className="doc-btn doc-btn--secondary" onClick={exportB2BTaxLedgerCSV} title="Export Tax CSV">
              <FileSpreadsheet size={15} className="text-emerald-500" />
              <span>Export CSV</span>
            </button>
            <button
              className="doc-btn doc-btn--secondary"
              onClick={() => showToast('GSTR-1 Real-time Push: 12 pending B2B invoices synced to Table 4A.')}
              title="Sync GSTR-1 Table 4A"
            >
              <RotateCw size={15} />
              <span>Sync to GSTR-1</span>
            </button>
            <button className="doc-btn doc-btn--primary" onClick={() => setIsGenerateOpen(true)}>
              <Plus size={16} />
              <span>Generate E-Invoice</span>
            </button>
          </div>
        </div>

        {/* ── 2. Stat KPI Cards Grid ── */}
        <div className="documents-stats-grid">
          {/* Invoices This Month */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Invoices This Month</span>
              <div className="stat-icon-wrapper stat-icon--blue">
                <Receipt size={18} />
              </div>
            </div>
            <div className="stat-card-value">
              {einvoicesSummaryStats.totalInvoicesThisMonth} <span className="stat-card-unit">Invoices</span>
            </div>
            <div className="stat-card-footer">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="stat-footer-text text-emerald-600">
                100% IRN Validated ({einvoicesSummaryStats.irnValidatedPct}%)
              </span>
            </div>
          </div>

          {/* Taxable Freight Value */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Taxable Freight Value</span>
              <div className="stat-icon-wrapper stat-icon--emerald">
                <Building2 size={18} />
              </div>
            </div>
            <div className="stat-card-value">
              {einvoicesSummaryStats.totalTaxableValue}
            </div>
            <div className="stat-card-footer">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="stat-footer-text text-emerald-600">
                Total GST: {einvoicesSummaryStats.totalGstCollected}
              </span>
            </div>
          </div>

          {/* Credit & Debit Notes */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Credit & Debit Notes</span>
              <div className="stat-icon-wrapper stat-icon--amber">
                <Layers size={18} />
              </div>
            </div>
            <div className="stat-card-value stat-card-value--amber">
              {einvoicesSummaryStats.creditDebitNotesIssued} <span className="stat-card-unit">Issued</span>
            </div>
            <div className="stat-card-footer">
              <ShieldCheck size={14} className="text-amber-500" />
              <span className="stat-footer-text text-amber-600">
                Table 9B Reconciled
              </span>
            </div>
          </div>

          {/* Cancelled within 24h */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Cancelled within 24h</span>
              <div className="stat-icon-wrapper stat-icon--red">
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="stat-card-value stat-card-value--red">
              {einvoicesSummaryStats.cancelledWithin24h} <span className="stat-card-unit">Cancelled</span>
            </div>
            <div className="stat-card-footer">
              <AlertTriangle size={14} className="text-rose-500" />
              <span className="stat-footer-text text-rose-600">
                IRP 24-Hour Window Compliant
              </span>
            </div>
          </div>
        </div>

        {/* ── 3. Status Tabs ── */}
        <div className="doc-category-tabs-container">
          <div className="doc-category-tabs">
            {statusTabs.map((tab) => {
              const count = tabCounts[tab.id] || 0;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`doc-tab-btn ${isActive ? 'doc-tab-btn--active' : ''}`}
                >
                  <span>{tab.label}</span>
                  <span className={`doc-tab-count ${isActive ? 'doc-tab-count--active' : ''}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4. Search & Multifaceted Filter Toolbar ── */}
        <div className="doc-toolbar-card">
          <div className="doc-toolbar-left">
            <div className="doc-search-wrapper">
              <Search size={15} className="doc-search-icon" />
              <input
                type="text"
                placeholder="Search by Invoice #, 64-char IRN, Buyer GSTIN, Legal Name, or Ack No..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="doc-search-input"
              />
              {searchQuery && (
                <button className="doc-search-clear" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="doc-toolbar-right">
            {/* Supply Type */}
            <div className="doc-select-box">
              <span className="doc-select-label">Supply:</span>
              <select
                value={supplyTypeFilter}
                onChange={(e) => setSupplyTypeFilter(e.target.value)}
                className="doc-native-select"
              >
                <option value="ALL">All Supply Types</option>
                <option value="B2B">B2B (Regular)</option>
                <option value="SEZ">SEZ Export</option>
                <option value="INTRA">Intra-State</option>
              </select>
            </div>

            {/* GSTR-1 Sync Filter */}
            <div className="doc-select-box">
              <span className="doc-select-label">GSTR-1:</span>
              <select
                value={gstrSyncFilter}
                onChange={(e) => setGstrSyncFilter(e.target.value)}
                className="doc-native-select"
              >
                <option value="ALL">All Sync States</option>
                <option value="SYNCED">Table 4A Auto-Populated</option>
                <option value="ADJUSTED">Table 9B Adjusted</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="doc-select-box">
              <span className="doc-select-label">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="doc-native-select"
              >
                <option value="NEWEST">Invoice Date (Newest First)</option>
                <option value="VALUE_DESC">Total Amount (Highest First)</option>
                <option value="TAXABLE_DESC">Taxable Freight Value</option>
                <option value="INVOICE_ASC">Invoice No (A → Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── 5. Bulk Selection Floating Action Bar ── */}
        {selectedInvoiceIds.length > 0 && (
          <div className="doc-bulk-action-bar">
            <div className="doc-bulk-info">
              <span className="doc-bulk-count-badge">{selectedInvoiceIds.length}</span>
              <span className="doc-bulk-text">Tax E-Invoices Selected</span>
            </div>
            <div className="doc-bulk-buttons">
              <button className="doc-bulk-btn doc-bulk-btn--primary" onClick={handleBulkPrint}>
                <Printer size={14} />
                <span>Batch Print Official Invoices ({selectedInvoiceIds.length})</span>
              </button>
              <button className="doc-bulk-btn doc-bulk-btn--secondary" onClick={handleBulkGstrSync}>
                <RotateCw size={14} />
                <span>Push to GSTR-1 (Table 4A)</span>
              </button>
              <button className="doc-bulk-btn doc-bulk-btn--ghost" onClick={() => setSelectedInvoiceIds([])}>
                <X size={14} />
                <span>Clear Selection</span>
              </button>
            </div>
          </div>
        )}

        {/* ── 6. Master E-Invoice Table Card ── */}
        <div className="doc-table-card">
          <div className="doc-table-header-bar">
            <div className="doc-table-header-title-group">
              <h3 className="doc-table-header-title">GST Tax E-Invoice Registry</h3>
              <span className="doc-table-header-count">
                {filteredEinvoices.length} {filteredEinvoices.length === 1 ? 'invoice' : 'invoices'} registered
              </span>
            </div>
            <div className="doc-table-header-aux">
              <span className="doc-live-dot" />
              <span className="doc-live-text">IRP API Live Connected</span>
            </div>
          </div>

          <div className="doc-table-responsive-wrapper">
            <table className="doc-enterprise-table" aria-label="GST Tax E-Invoices Ledger">
              <thead>
                <tr>
                  <th className="doc-th-select">
                    <button
                      onClick={handleSelectAll}
                      className="doc-checkbox-btn"
                      title={selectedInvoiceIds.length === filteredEinvoices.length && filteredEinvoices.length > 0 ? 'Deselect All' : 'Select All'}
                    >
                      {selectedInvoiceIds.length > 0 && selectedInvoiceIds.length === filteredEinvoices.length ? (
                        <CheckSquare size={16} className="text-blue-600" />
                      ) : selectedInvoiceIds.length > 0 ? (
                        <div className="doc-checkbox-indeterminate" />
                      ) : (
                        <Square size={16} className="text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th>Invoice Number & Type</th>
                  <th>64-Bit IRN Cryptographic Hash</th>
                  <th>Buyer Legal Entity (Billed To)</th>
                  <th>Place of Supply / Shipment</th>
                  <th>Tax Breakdown</th>
                  <th>Total Invoice Value (₹)</th>
                  <th>GSTR-1 & Status</th>
                  <th className="text-right" style={{ paddingRight: 20 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEinvoices.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="doc-empty-td">
                      <div className="doc-empty-state">
                        <Receipt size={40} className="doc-empty-icon" />
                        <h4 className="doc-empty-title">No E-Invoices found</h4>
                        <p className="doc-empty-desc">
                          No registered tax e-invoices match your current search criteria.
                        </p>
                        <button
                          className="doc-btn doc-btn--secondary doc-btn--sm mt-3"
                          onClick={() => {
                            setSearchQuery('');
                            setActiveTab('ALL');
                            setSupplyTypeFilter('ALL');
                            setGstrSyncFilter('ALL');
                          }}
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEinvoices.map((inv, index) => {
                    const isSelected = selectedInvoiceIds.includes(inv.id);
                    const isCopied = copiedId === inv.id;
                    const isCancelled = inv.status.toLowerCase().includes('cancelled');
                    const isCreditNote = inv.status.toLowerCase().includes('credit note');

                    return (
                      <tr
                        key={inv.id}
                        className={`doc-row ${isSelected ? 'doc-row--selected' : ''}`}
                        style={{ '--row-index': index }}
                        onClick={() => setViewModalEinvoice(inv)}
                      >
                        {/* Checkbox */}
                        <td className="doc-td-select" onClick={(e) => handleToggleSelect(inv.id, e)}>
                          <button className="doc-checkbox-btn">
                            {isSelected ? (
                              <CheckSquare size={16} className="text-blue-600" />
                            ) : (
                              <Square size={16} className="text-slate-300" />
                            )}
                          </button>
                        </td>

                        {/* Invoice Number & Type */}
                        <td>
                          <div className="doc-primary-cell">
                            <span className={`doc-indicator-strip ${isCancelled ? 'doc-indicator-strip--flagged' : isCreditNote ? 'doc-indicator-strip--expiring' : 'doc-indicator-strip--verified'}`} />
                            <div className="doc-title-stack">
                              <div className="doc-title-row">
                                <span className="doc-id-pill" style={{ fontSize: '13px' }}>{inv.invoiceNumber}</span>
                                {getSupplyTypeBadge(inv.supplyType)}
                              </div>
                              <div className="doc-meta-row">
                                <span>{inv.invoiceDate}</span>
                                <span className="doc-bullet">•</span>
                                <span className="doc-format-tag">IRP Hash Reg</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 64-Char IRN Hash */}
                        <td onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span className="irn-hash-pill" title={inv.irnHash}>
                                {inv.irnHash.substring(0, 14)}...{inv.irnHash.substring(50)}
                              </span>
                              <button
                                className="btn-icon"
                                onClick={(e) => handleCopyIrn(inv.irnHash, inv.id, e)}
                                title="Copy full 64-character IRN Hash"
                              >
                                {isCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                              </button>
                            </div>
                            <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <QrCode size={12} />
                              <span>Ack: {inv.ackNumber}</span>
                            </div>
                          </div>
                        </td>

                        {/* Buyer (Billed To) */}
                        <td>
                          <div className="doc-entity-stack">
                            <span className="doc-entity-main">{inv.buyerLegalName}</span>
                            <div style={{ fontSize: '11px', fontFamily: 'ui-monospace, monospace', color: '#64748b' }}>
                              GSTIN: <strong>{inv.buyerGstin}</strong>
                            </div>
                          </div>
                        </td>

                        {/* Place of Supply / Shipment */}
                        <td>
                          <div className="doc-entity-stack">
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                              {inv.placeOfSupply}
                            </span>
                            <span style={{ fontSize: '11px', color: '#2563eb' }}>
                              Shipment: <strong>{inv.associatedShipment}</strong>
                            </span>
                          </div>
                        </td>

                        {/* Tax Breakdown */}
                        <td>
                          <div className="doc-size-stack">
                            <div style={{ fontSize: '12px', color: '#1e293b' }}>
                              Taxable: <strong>₹ {inv.taxableValue.toLocaleString('en-IN')}</strong>
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                              {inv.igstAmount > 0
                                ? `IGST (18%): ₹ ${inv.igstAmount.toLocaleString('en-IN')}`
                                : `CGST+SGST: ₹ ${(inv.cgstAmount * 2).toLocaleString('en-IN')}`}
                            </div>
                          </div>
                        </td>

                        {/* Total Invoice Value */}
                        <td>
                          <div className="doc-size-stack">
                            <span style={{ fontWeight: 900, fontSize: '15px', color: '#2563eb', fontVariantNumeric: 'tabular-nums' }}>
                              ₹ {inv.totalInvoiceValue.toLocaleString('en-IN')}
                            </span>
                            <span style={{ fontSize: '10px', color: '#64748b' }}>
                              Includes 18% GST
                            </span>
                          </div>
                        </td>

                        {/* GSTR-1 & Status */}
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {getStatusBadge(inv)}
                            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>
                              {inv.gstr1SyncStatus}
                            </div>
                          </div>
                        </td>

                        {/* Quick Actions */}
                        <td onClick={(e) => e.stopPropagation()} style={{ paddingRight: 20 }}>
                          <div className="doc-action-btn-group">
                            <button
                              className="doc-action-btn doc-action-btn--preview"
                              onClick={() => setViewModalEinvoice(inv)}
                              title="View / Print Tax E-Invoice with QR"
                            >
                              <Printer size={13} />
                              <span>Print</span>
                            </button>
                            <button
                              className="doc-action-btn"
                              onClick={(e) => handleIssueCreditNote(inv, e)}
                              title="Issue Credit Note against IRN"
                            >
                              <span>CDN</span>
                            </button>
                            <button
                              className="doc-action-btn"
                              onClick={(e) => handleCancelIrn(inv, e)}
                              title="Cancel IRN on IRP (24h Window)"
                              style={{ color: '#ef4444' }}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── 7. Table Footer & Pagination ── */}
          <div className="doc-table-footer">
            <div className="doc-footer-left">
              <span className="doc-footer-summary">
                Showing <strong>1–{filteredEinvoices.length}</strong> of <strong>{einvoicesSummaryStats.totalInvoicesThisMonth}</strong> registered tax e-invoices
              </span>
            </div>

            <div className="doc-footer-right">
              <div className="doc-rows-selector">
                <span className="doc-rows-label">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="doc-rows-select"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="doc-pagination-controls">
                <button
                  className="doc-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="doc-page-indicator">
                  Page <strong>{currentPage}</strong> of <strong>39</strong>
                </span>
                <button
                  className="doc-page-btn"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 8. Modals ── */}
        {isGenerateOpen && (
          <EInvoiceGenerateModal
            isOpen={isGenerateOpen}
            onClose={() => setIsGenerateOpen(false)}
            onGenerate={handleGenerateSuccess}
          />
        )}

        {viewModalEinvoice && (
          <EInvoiceViewModal
            einvoice={viewModalEinvoice}
            onClose={() => setViewModalEinvoice(null)}
          />
        )}
      </div>
    </Layout>
  );
}
