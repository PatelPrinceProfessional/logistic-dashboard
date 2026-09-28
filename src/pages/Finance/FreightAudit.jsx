import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  Scale,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Search,
  Filter,
  FileText,
  Eye,
  Send,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { freightAuditSummaryStats, freightAuditList as initialAudits } from '../../utils/mockData/financeData';
import FreightAuditDetailModal from './components/FreightAuditDetailModal';
import FreightAuditRuleModal from './components/FreightAuditRuleModal';
import './Finance.css';

export default function FreightAudit() {
  const [audits, setAudits] = useState(initialAudits);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [inspectingAudit, setInspectingAudit] = useState(null);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Audits
  const filteredAudits = useMemo(() => {
    return audits.filter((a) => {
      const matchesSearch =
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.carrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tripId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.originCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.destCity.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'MATCHED' && a.matchStatus === 'Auto-Matched') ||
        (statusFilter === 'DISCREPANCY' && a.matchStatus === 'Discrepancy Flagged') ||
        (statusFilter === 'APPROVED' && (a.matchStatus.includes('Approved') || a.matchStatus.includes('Resolved')));

      return matchesSearch && matchesStatus;
    });
  }, [audits, searchQuery, statusFilter]);

  const handleResolveAudit = (auditId, resolutionData) => {
    setAudits((prev) =>
      prev.map((item) =>
        item.id === auditId
          ? {
              ...item,
              matchStatus: resolutionData.status,
              settlementApprovedAmount: resolutionData.approvedAmount,
              auditorRecommendation: resolutionData.note,
            }
          : item
      )
    );
    setInspectingAudit(null);
    showToast(`Audit #${auditId} resolved: ${resolutionData.status} (Authorized: ₹ ${resolutionData.approvedAmount.toLocaleString('en-IN')})`);
  };

  const handleRunAutoAudit = () => {
    showToast('⚡ AI 3-Way Matching Engine processed 48 carrier bills. 45 auto-matched, 3 flagged for review.');
  };

  const handleSaveRules = (rules) => {
    setIsRuleModalOpen(false);
    showToast(`Audit Rules updated: Tolerance band set to ±${rules.tolerancePct}% with ₹${rules.autoApproveAmountMax.toLocaleString('en-IN')} ceiling.`);
  };

  return (
    <Layout
      title="Freight Audit & 3-Way Matching"
      breadcrumbs={[{ label: 'Finance', path: '/finance' }, { label: 'Freight Audit' }]}
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
              <Scale size={14} />
              <span>Automated 3-Way Rate & Telemetry Reconciliation</span>
            </div>
            <h1 className="finance-title">Freight Audit & Overcharge Protection</h1>
            <p className="finance-subtitle">
              Continuous validation of carrier invoices against contract rate cards, GPS mileage, FastTag tolls, and weighbridge weights.
            </p>
          </div>

          <div className="finance-header-actions">
            <button className="btn btn-secondary" onClick={() => setIsRuleModalOpen(true)}>
              <Sliders size={16} />
              <span>Matching Rules</span>
            </button>
            <button className="btn btn-primary" onClick={handleRunAutoAudit}>
              <Sparkles size={16} />
              <span>Run Auto-Audit Batch</span>
            </button>
          </div>
        </div>

        {/* Stat KPI Grid */}
        <div className="finance-stats-grid">
          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Total Audited Value</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div className="stat-main-val">{freightAuditSummaryStats.totalAuditedValue}</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <ShieldCheck size={14} />
              <span>100% Invoice Coverage</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Auto-Match Pass Rate</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="stat-main-val">{freightAuditSummaryStats.autoMatchRatePct}%</div>
            <div className="stat-footer-text" style={{ color: '#059669' }}>
              <span>Zero-touch approval</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Disputed Overcharges Saved</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <Scale size={18} />
              </div>
            </div>
            <div className="stat-main-val" style={{ color: '#dc2626' }}>
              {freightAuditSummaryStats.disputedOverchargesSaved}
            </div>
            <div className="stat-footer-text" style={{ color: '#dc2626' }}>
              <span>Deducted via Debit Notes</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Pending Review</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="stat-main-val">{freightAuditSummaryStats.flaggedPendingReviewCount} Invoices</div>
            <div className="stat-footer-text" style={{ color: '#d97706' }}>
              <span>Requires Auditor Action</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="finance-filter-bar">
          <div className="filter-search-box">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search by Audit ID, Invoice #, Carrier, Trip ID, or Route..."
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
                <option value="ALL">All Audit Statuses</option>
                <option value="DISCREPANCY">Discrepancy Flagged</option>
                <option value="MATCHED">Auto-Matched (Zero Variance)</option>
                <option value="APPROVED">Approved / Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3-Way Reconciliation Ledger Table */}
        <div className="finance-table-card">
          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Audit ID & Carrier</th>
                  <th>Trip / Route</th>
                  <th>1. Contract Agreed</th>
                  <th>2. IoT Telemetry</th>
                  <th>3. Billed Invoice</th>
                  <th>Variance</th>
                  <th>Audit Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudits.map((a) => {
                  const isDiscrepant = a.varianceAmount > 0;

                  return (
                    <tr
                      key={a.id}
                      onClick={() => setInspectingAudit(a)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--color-primary-600)' }}>{a.id}</div>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{a.carrierName}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          Inv: {a.invoiceNumber}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>
                          {a.originCity} → {a.destCity}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          Trip: {a.tripId} • {a.shipmentId}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, fontSize: '13px' }}>
                          ₹ {a.contractRate.totalAgreed.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          Base: ₹{a.contractRate.baseFreight.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>
                          {a.actualTelemetry.gpsDistanceKm} km GPS
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          Tolls: ₹{a.actualTelemetry.tollFastTagActual}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 800, fontSize: '13px', color: isDiscrepant ? '#dc2626' : undefined }}>
                          ₹ {a.billedInvoice.grossBilled.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {a.invoiceDate}
                        </div>
                      </td>

                      <td>
                        {isDiscrepant ? (
                          <span className="variance-badge overcharge">
                            +₹{a.varianceAmount.toLocaleString('en-IN')} (+{a.variancePct}%)
                          </span>
                        ) : (
                          <span className="variance-badge zero">
                            ✓ ₹0.00 (Match)
                          </span>
                        )}
                      </td>

                      <td>
                        <span
                          className={`finance-status-pill ${
                            a.matchStatus === 'Auto-Matched'
                              ? 'matched'
                              : a.matchStatus === 'Discrepancy Flagged'
                              ? 'discrepancy'
                              : 'approved'
                          }`}
                        >
                          {a.matchStatus === 'Auto-Matched' ? (
                            <CheckCircle2 size={12} />
                          ) : a.matchStatus === 'Discrepancy Flagged' ? (
                            <AlertTriangle size={12} />
                          ) : (
                            <ShieldCheck size={12} />
                          )}
                          <span>{a.matchStatus}</span>
                        </span>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setInspectingAudit(a)}
                        >
                          <Eye size={14} />
                          <span>Reconcile</span>
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
        {inspectingAudit && (
          <FreightAuditDetailModal
            audit={inspectingAudit}
            onClose={() => setInspectingAudit(null)}
            onResolve={handleResolveAudit}
          />
        )}

        {isRuleModalOpen && (
          <FreightAuditRuleModal
            isOpen={isRuleModalOpen}
            onClose={() => setIsRuleModalOpen(false)}
            onSave={handleSaveRules}
          />
        )}
      </div>
    </Layout>
  );
}
