import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  FileText,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Clock,
  Building2,
  Eye,
  Send,
  Download,
} from 'lucide-react';
import { carrierInvoicesSummaryStats, carrierInvoicesList as initialInvoices } from '../../utils/mockData/financeData';
import CarrierInvoiceUploadModal from './components/CarrierInvoiceUploadModal';
import CarrierInvoiceDetailModal from './components/CarrierInvoiceDetailModal';
import './Finance.css';

export default function CarrierInvoices() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [inspectingInvoice, setInspectingInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.carrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.associatedTrip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.bankAccountMasked.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'APPROVED' && inv.approvalStatus.includes('Approved')) ||
        (statusFilter === 'PENDING' && inv.approvalStatus.includes('Pending')) ||
        (statusFilter === 'DISPUTE' && inv.approvalStatus.includes('Dispute'));

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const handleUploadSuccess = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
    setIsUploadOpen(false);
    showToast(`Carrier Invoice #${newInvoice.invoiceNumber} submitted for approval.`);
  };

  const handleApproveInvoice = (invoiceId, remarks) => {
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoiceId
          ? {
              ...item,
              approvalStatus: 'Approved & Queued',
              approvalLevel: 'Approved for Batch Run',
            }
          : item
      )
    );
    setInspectingInvoice(null);
    showToast(`Invoice #${invoiceId} approved! Queued for bank disbursement batch.`);
  };

  const handleRejectInvoice = (invoiceId, reason) => {
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoiceId
          ? {
              ...item,
              approvalStatus: 'In Dispute Review',
              approvalLevel: 'Returned to Carrier',
            }
          : item
      )
    );
    setInspectingInvoice(null);
    showToast(`Invoice #${invoiceId} rejected: ${reason}`);
  };

  return (
    <Layout
      title="Carrier Freight Invoices & Approvals"
      breadcrumbs={[{ label: 'Finance', path: '/finance' }, { label: 'Carrier Invoices' }]}
    >
      <div className="finance-page-container">
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
        <div className="finance-header-row">
          <div>
            <div className="finance-badge">
              <FileText size={14} />
              <span>Accounts Payable & Section 194C TDS Matrix</span>
            </div>
            <h1 className="finance-title">Carrier Invoices & Multi-Tier Approvals</h1>
            <p className="finance-subtitle">
              Intake parsing, withholding tax (TDS) calculations, credit terms monitoring, and payment authorizations.
            </p>
          </div>

          <div className="finance-header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => showToast('Batch Approved 8 eligible invoices within tolerance.')}
            >
              <CheckCircle2 size={16} />
              <span>Auto-Approve Queued</span>
            </button>
            <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
              <Plus size={16} />
              <span>Upload Carrier Invoice</span>
            </button>
          </div>
        </div>

        {/* Stat KPI Grid */}
        <div className="finance-stats-grid">
          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Outstanding Payables</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div className="stat-main-val">{carrierInvoicesSummaryStats.totalOutstandingPayables}</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <span>TDS Deducted: {carrierInvoicesSummaryStats.tdsDeductedThisMonth}</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Due in 7 Days</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-main-val" style={{ color: '#dc2626' }}>
              {carrierInvoicesSummaryStats.dueIn7Days}
            </div>
            <div className="stat-footer-text" style={{ color: '#dc2626' }}>
              <span>Upcoming payment runs</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Approved & Queued</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="stat-main-val">{carrierInvoicesSummaryStats.approvedQueuedDisbursement}</div>
            <div className="stat-footer-text" style={{ color: '#059669' }}>
              <span>Ready for settlement batch</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Invoices in Dispute</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="stat-main-val">{carrierInvoicesSummaryStats.invoicesInDisputeCount} Cases</div>
            <div className="stat-footer-text" style={{ color: '#d97706' }}>
              <span>Awaiting carrier acknowledgement</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="finance-filter-bar">
          <div className="filter-search-box">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search by Invoice #, Carrier Name, Trip, or Account..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          <div className="filter-selects-group">
            <div className="filter-select-wrapper">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Invoices</option>
                <option value="APPROVED">Approved & Queued</option>
                <option value="PENDING">Pending Level 1</option>
                <option value="DISPUTE">In Dispute Review</option>
              </select>
            </div>
          </div>
        </div>

        {/* Carrier Invoices Ledger Table */}
        <div className="finance-table-card">
          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Invoice # & Date</th>
                  <th>Carrier Partner</th>
                  <th>Associated Trip</th>
                  <th>Gross Billed (₹)</th>
                  <th>TDS Deduction</th>
                  <th>Net Disbursable (₹)</th>
                  <th>Due Date / Terms</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => {
                  const isApproved = inv.approvalStatus.includes('Approved');
                  const isDispute = inv.approvalStatus.includes('Dispute');

                  return (
                    <tr
                      key={inv.id}
                      onClick={() => setInspectingInvoice(inv)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--color-primary-600)' }}>
                          {inv.invoiceNumber}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {inv.invoiceDate}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>{inv.carrierName}</div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                          GSTIN: {inv.carrierGstin}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{inv.associatedTrip}</div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, fontSize: '13px' }}>
                          ₹ {inv.grossAmount.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', color: '#b91c1c', fontWeight: 600 }}>
                          - ₹ {inv.tdsAmount.toLocaleString('en-IN')} ({inv.tdsRatePct}%)
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                          194C Compliant
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 900, fontSize: '14px', color: '#2563eb' }}>
                          ₹ {inv.netPayable.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                          {inv.bankAccountMasked}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: inv.daysUntilDue < 7 ? '#dc2626' : undefined }}>
                          {inv.dueDate}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {inv.creditTerms} ({inv.daysUntilDue}d left)
                        </div>
                      </td>

                      <td>
                        <span
                          className={`finance-status-pill ${
                            isApproved ? 'approved' : isDispute ? 'discrepancy' : 'pending'
                          }`}
                        >
                          {isApproved ? <CheckCircle2 size={12} /> : isDispute ? <AlertTriangle size={12} /> : <Clock size={12} />}
                          <span>{inv.approvalStatus}</span>
                        </span>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setInspectingInvoice(inv)}
                        >
                          <Eye size={14} />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {isUploadOpen && (
          <CarrierInvoiceUploadModal
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            onUpload={handleUploadSuccess}
          />
        )}

        {inspectingInvoice && (
          <CarrierInvoiceDetailModal
            invoice={inspectingInvoice}
            onClose={() => setInspectingInvoice(null)}
            onApprove={handleApproveInvoice}
            onReject={handleRejectInvoice}
          />
        )}
      </div>
    </Layout>
  );
}
