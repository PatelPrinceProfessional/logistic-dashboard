import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  Building2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Printer,
  Copy,
  Check,
  Download,
  Lock,
  RotateCw,
} from 'lucide-react';
import { settlementSummaryStats, settlementBatchList as initialBatches } from '../../utils/mockData/financeData';
import PaymentBatchModal from './components/PaymentBatchModal';
import PaymentAdviceModal from './components/PaymentAdviceModal';
import './Finance.css';

export default function Settlement() {
  const [batches, setBatches] = useState(initialBatches);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [inspectingBatch, setInspectingBatch] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyUtr = (utr, id, e) => {
    e.stopPropagation();
    if (utr.includes('PENDING')) return;
    navigator.clipboard.writeText(utr);
    setCopiedId(id);
    showToast(`Copied UTR #${utr} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Batches
  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const matchesSearch =
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.utrNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.bankGateway.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'CLEARED' && b.status.includes('Cleared')) ||
        (statusFilter === 'QUEUED' && b.status.includes('Queued'));

      return matchesSearch && matchesStatus;
    });
  }, [batches, searchQuery, statusFilter]);

  const handleExecuteBatchSuccess = (newBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
    setIsBatchOpen(false);
    showToast(`Payment Run ${newBatch.id} executed successfully with UTR ${newBatch.utrNumber}!`);
  };

  return (
    <Layout
      title="Settlement & Bank Disbursements"
      breadcrumbs={[{ label: 'Finance', path: '/finance' }, { label: 'Settlement' }]}
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
              <Building2 size={14} />
              <span>Host-to-Host Corporate Banking Gateway</span>
            </div>
            <h1 className="finance-title">Settlement & Carrier Disbursements</h1>
            <p className="finance-subtitle">
              Automated batch payment runs, UTR reconciliation, escrow reserve holding, and remittance advice generation.
            </p>
          </div>

          <div className="finance-header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => showToast('Escrow Hold Reserve: ₹ 4.2L released for 3 verified POD deliveries.')}
            >
              <Lock size={16} />
              <span>Manage Escrow Holds</span>
            </button>
            <button className="btn btn-primary" onClick={() => setIsBatchOpen(true)}>
              <Plus size={16} />
              <span>Execute Payment Run</span>
            </button>
          </div>
        </div>

        {/* Stat KPI Grid */}
        <div className="finance-stats-grid">
          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Disbursed This Month</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div className="stat-main-val">{settlementSummaryStats.disbursedThisMonth}</div>
            <div className="stat-footer-text" style={{ color: '#059669' }}>
              <span>Paid to {settlementSummaryStats.totalCarriersPaid} carrier fleets</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Scheduled Batch Today</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-main-val" style={{ color: '#2563eb' }}>
              {settlementSummaryStats.scheduledBatchToday}
            </div>
            <div className="stat-footer-text" style={{ color: '#2563eb' }}>
              <span>Auto-transmission at 16:00 IST</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Escrow Hold Reserves</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <Lock size={18} />
              </div>
            </div>
            <div className="stat-main-val">{settlementSummaryStats.escrowHoldReserves}</div>
            <div className="stat-footer-text" style={{ color: '#d97706' }}>
              <span>Pending POD & damage claims</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Banking Telemetry</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className="stat-main-val">{settlementSummaryStats.successfulDisbursementPct}%</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <span>HDFC & ICICI Corporate Host-to-Host</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="finance-filter-bar">
          <div className="filter-search-box">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search by Batch ID, UTR Number, or Bank Gateway..."
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
                <option value="ALL">All Payment Batches</option>
                <option value="CLEARED">Executed & Cleared</option>
                <option value="QUEUED">Queued for Execution</option>
              </select>
            </div>
          </div>
        </div>

        {/* Batch Runs Table */}
        <div className="finance-table-card">
          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Batch ID & Date</th>
                  <th>Bank Gateway</th>
                  <th>Invoices</th>
                  <th>Gross Amount (₹)</th>
                  <th>TDS Retained</th>
                  <th>Net Disbursed (₹)</th>
                  <th>Bank UTR Ref</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.map((batch) => {
                  const isCleared = batch.status.includes('Cleared');
                  const isCopied = copiedId === batch.id;

                  return (
                    <tr
                      key={batch.id}
                      onClick={() => setInspectingBatch(batch)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--color-primary-600)' }}>{batch.id}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {batch.executionDate}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{batch.bankGateway}</div>
                      </td>

                      <td>
                        <span style={{ fontSize: '13px', fontWeight: 700 }}>
                          {batch.totalInvoicesCount} Invoices
                        </span>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, fontSize: '13px' }}>
                          ₹ {batch.totalGrossAmount.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', color: '#b91c1c', fontWeight: 600 }}>
                          - ₹ {batch.totalTdsDeducted.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 900, fontSize: '14px', color: '#059669' }}>
                          ₹ {batch.totalNetDisbursed.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>
                            {batch.utrNumber}
                          </span>
                          {!batch.utrNumber.includes('PENDING') && (
                            <button
                              className="btn-icon"
                              onClick={(e) => handleCopyUtr(batch.utrNumber, batch.id, e)}
                              title="Copy UTR"
                            >
                              {isCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                            </button>
                          )}
                        </div>
                      </td>

                      <td>
                        <span className={`finance-status-pill ${isCleared ? 'matched' : 'pending'}`}>
                          {isCleared ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          <span>{batch.status}</span>
                        </span>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setInspectingBatch(batch)}
                          title="View Payment Advice Remittance Voucher"
                        >
                          <Printer size={14} />
                          <span>Advice</span>
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
        {isBatchOpen && (
          <PaymentBatchModal
            isOpen={isBatchOpen}
            onClose={() => setIsBatchOpen(false)}
            onExecuteBatch={handleExecuteBatchSuccess}
          />
        )}

        {inspectingBatch && (
          <PaymentAdviceModal
            batch={inspectingBatch}
            onClose={() => setInspectingBatch(null)}
          />
        )}
      </div>
    </Layout>
  );
}
