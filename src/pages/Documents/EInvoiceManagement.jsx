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
} from 'lucide-react';
import { einvoicesSummaryStats, einvoicesList as initialEinvoices } from '../../utils/mockData/documentsData';
import EInvoiceGenerateModal from './components/EInvoiceGenerateModal';
import EInvoiceViewModal from './components/EInvoiceViewModal';
import './Documents.css';

export default function EInvoiceManagement() {
  const [einvoices, setEinvoices] = useState(initialEinvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [viewModalEinvoice, setViewModalEinvoice] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

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

  // Filtered E-Invoices
  const filteredEinvoices = useMemo(() => {
    return einvoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.irnHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.buyerLegalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.buyerGstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.associatedShipment.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'ALL' || inv.supplyType.includes(typeFilter);
      const matchesStatus = statusFilter === 'ALL' || inv.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [einvoices, searchQuery, typeFilter, statusFilter]);

  const handleGenerateSuccess = (newEinvoice) => {
    setEinvoices((prev) => [newEinvoice, ...prev]);
    setIsGenerateOpen(false);
    showToast(`Tax E-Invoice ${newEinvoice.invoiceNumber} generated with IRN on GST IRP!`);
  };

  const handleCancelIrn = (inv, e) => {
    e.stopPropagation();
    const reason = prompt('Enter IRP Reason for Cancellation (e.g., Data Entry Mistake, Order Cancelled):');
    if (!reason) return;

    setEinvoices((prev) =>
      prev.map((item) =>
        item.id === inv.id
          ? {
              ...item,
              status: 'Cancelled (IRP 24h Window)',
            }
          : item
      )
    );
    showToast(`IRN for Invoice #${inv.invoiceNumber} cancelled on GST Portal: ${reason}`);
  };

  const handleIssueCreditNote = (inv, e) => {
    e.stopPropagation();
    const reason = prompt('Enter Credit Note adjustment reason (e.g., Rate Discrepancy / Return):');
    if (!reason) return;

    setEinvoices((prev) =>
      prev.map((item) =>
        item.id === inv.id
          ? {
              ...item,
              status: 'Credit Note Issued',
            }
          : item
      )
    );
    showToast(`Credit Note issued against IRN #${inv.irnHash.substring(0, 12)}...`);
  };

  return (
    <Layout
      title="GST E-Invoice & IRN Portal"
      breadcrumbs={[{ label: 'Documents', path: '/documents' }, { label: 'E-Invoice' }]}
    >
      <div className="documents-page-container">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              background: '#1e293b',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              fontSize: '13px',
              fontWeight: 700,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <CheckCircle2 size={16} color="#10b981" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header Row */}
        <div className="documents-header-row">
          <div>
            <div className="documents-badge">
              <Receipt size={14} />
              <span>Invoice Registration Portal (IRP) Integration</span>
            </div>
            <h1 className="documents-title">E-Invoice (IRN) & B2B Tax Ledger</h1>
            <p className="documents-subtitle">
              Automated 64-char IRN hashing, signed digital QR verification, GSTR-1 real-time reconciliation, and credit notes.
            </p>
          </div>

          <div className="documents-header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => showToast('GSTR-1 Real-time Push: 12 pending B2B invoices synced to Table 4A.')}
            >
              <RotateCw size={16} />
              <span>Sync to GSTR-1</span>
            </button>
            <button className="btn btn-primary" onClick={() => setIsGenerateOpen(true)}>
              <Plus size={16} />
              <span>Generate E-Invoice</span>
            </button>
          </div>
        </div>

        {/* Stat KPI Grid */}
        <div className="documents-stats-grid">
          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Invoices This Month</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <Receipt size={18} />
              </div>
            </div>
            <div className="stat-main-val">{einvoicesSummaryStats.totalInvoicesThisMonth}</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <ShieldCheck size={14} />
              <span>IRN Validated: {einvoicesSummaryStats.irnValidatedPct}%</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Taxable Freight Value</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <Building2 size={18} />
              </div>
            </div>
            <div className="stat-main-val">{einvoicesSummaryStats.totalTaxableValue}</div>
            <div className="stat-footer-text" style={{ color: '#3b82f6' }}>
              <span>Total GST: {einvoicesSummaryStats.totalGstCollected}</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Credit & Debit Notes</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <Layers size={18} />
              </div>
            </div>
            <div className="stat-main-val">{einvoicesSummaryStats.creditDebitNotesIssued} Issued</div>
            <div className="stat-footer-text" style={{ color: '#d97706' }}>
              <span>Table 9B Reconciled</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Cancelled within 24h</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="stat-main-val">{einvoicesSummaryStats.cancelledWithin24h}</div>
            <div className="stat-footer-text" style={{ color: '#dc2626' }}>
              <span>IRP window compliant</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="documents-filter-bar">
          <div className="filter-search-box">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search by Invoice #, 64-char IRN, Buyer GSTIN, or Legal Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          <div className="filter-selects-group">
            <div className="filter-select-wrapper">
              <Filter size={14} />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Supply Types</option>
                <option value="B2B">B2B Regular</option>
                <option value="SEZ">SEZ Export</option>
                <option value="Intra-State">Intra-State (CGST+SGST)</option>
              </select>
            </div>

            <div className="filter-select-wrapper">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Statuses</option>
                <option value="GENERATED & ACTIVE">Generated & Active</option>
                <option value="CREDIT NOTE ISSUED">Credit Note Issued</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* E-Invoice Table */}
        <div className="documents-table-card">
          <div className="documents-table-wrapper">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>Invoice Number & Date</th>
                  <th>64-Char IRN Hash</th>
                  <th>Buyer (Billed To)</th>
                  <th>Place of Supply</th>
                  <th>Tax Breakdown</th>
                  <th>Total Invoice Amount</th>
                  <th>GSTR-1 Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEinvoices.map((inv) => {
                  const isCopied = copiedId === inv.id;

                  return (
                    <tr
                      key={inv.id}
                      onClick={() => setViewModalEinvoice(inv)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--color-primary-600)', fontSize: '13px' }}>
                          {inv.invoiceNumber}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {inv.invoiceDate} • {inv.supplyType}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="irn-hash-pill" title={inv.irnHash}>
                            {inv.irnHash.substring(0, 16)}...{inv.irnHash.substring(48)}
                          </span>
                          <button
                            className="btn-icon"
                            onClick={(e) => handleCopyIrn(inv.irnHash, inv.id, e)}
                            title="Copy full 64-char IRN Hash"
                          >
                            {isCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                          </button>
                        </div>
                        <div style={{ fontSize: '10px', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                          Ack: {inv.ackNumber}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>{inv.buyerLegalName}</div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                          GSTIN: {inv.buyerGstin}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{inv.placeOfSupply}</div>
                      </td>

                      <td>
                        <div style={{ fontSize: '11px' }}>
                          Taxable: <strong>₹ {inv.taxableValue.toLocaleString('en-IN')}</strong>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {inv.igstAmount > 0
                            ? `IGST: ₹ ${inv.igstAmount.toLocaleString('en-IN')}`
                            : `CGST+SGST: ₹ ${(inv.cgstAmount * 2).toLocaleString('en-IN')}`}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 900, fontSize: '14px', color: '#2563eb' }}>
                          ₹ {inv.totalInvoiceValue.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <span className="doc-status-pill verified">
                          <CheckCircle2 size={12} />
                          <span>{inv.status}</span>
                        </span>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          {inv.gstr1SyncStatus}
                        </div>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setViewModalEinvoice(inv)}
                            title="View / Print Tax E-Invoice"
                          >
                            <Printer size={14} />
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => handleIssueCreditNote(inv, e)}
                            title="Issue Credit Note"
                          >
                            <span>Credit Note</span>
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => handleCancelIrn(inv, e)}
                            title="Cancel IRN (24h Window)"
                            style={{ color: '#ef4444' }}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
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
