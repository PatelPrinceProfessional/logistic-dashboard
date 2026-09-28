import React, { useState } from 'react';
import { X, Scale, CheckCircle2, AlertTriangle, ShieldCheck, FileText, ArrowRight, DollarSign, Send } from 'lucide-react';
import '../Finance.css';

export default function FreightAuditDetailModal({ audit, onClose, onResolve }) {
  const [counterOfferAmount, setCounterOfferAmount] = useState(
    audit ? audit.contractRate.totalAgreed : 0
  );
  const [disputeNotes, setDisputeNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!audit) return null;

  const handleApproveOriginal = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onResolve(audit.id, {
        status: 'Approved',
        approvedAmount: audit.billedInvoice.grossBilled,
        note: 'Approved full billed invoice by Auditor.',
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleCounterOffer = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onResolve(audit.id, {
        status: 'Dispute Raised & Counter-Offered',
        approvedAmount: parseFloat(counterOfferAmount),
        note: disputeNotes || `Counter-offered contract rate of ₹ ${counterOfferAmount.toLocaleString('en-IN')}`,
      });
      setIsSubmitting(false);
    }, 800);
  };

  const isDiscrepant = audit.varianceAmount > 0;

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '880px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Scale size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Freight Audit 3-Way Reconciliation — {audit.id}
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {audit.carrierName} • Invoice #{audit.invoiceNumber} • Trip #{audit.tripId}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="finance-modal-body">
          {/* Top Status & Variance Overview */}
          <div
            style={{
              background: isDiscrepant ? 'rgba(239, 68, 68, 0.06)' : 'rgba(16, 185, 129, 0.06)',
              border: `1px solid ${isDiscrepant ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
              borderRadius: '8px',
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Reconciliation Result
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: isDiscrepant ? '#dc2626' : '#059669', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                {isDiscrepant ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                <span>{audit.matchStatus}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Variance (Overcharge)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: isDiscrepant ? '#dc2626' : '#059669' }}>
                {isDiscrepant ? `+ ₹ ${audit.varianceAmount.toLocaleString('en-IN')} (+${audit.variancePct}%)` : '₹ 0.00 (Zero Variance)'}
              </div>
            </div>
          </div>

          {/* 3-Way Matching Comparative Columns */}
          <div className="three-way-grid">
            {/* Column 1: Contract Rate Card */}
            <div className="three-way-column contract">
              <div className="three-way-title" style={{ color: '#2563eb' }}>
                <FileText size={14} />
                <span>1. Contract Rate</span>
              </div>
              <div className="three-way-row">
                <span>Base Linehaul:</span>
                <strong>₹ {audit.contractRate.baseFreight.toLocaleString('en-IN')}</strong>
              </div>
              <div className="three-way-row">
                <span>Fuel Surcharge:</span>
                <span>₹ {audit.contractRate.fuelSurcharge.toLocaleString('en-IN')}</span>
              </div>
              <div className="three-way-row">
                <span>Toll Estimate:</span>
                <span>₹ {audit.contractRate.tollCharges.toLocaleString('en-IN')}</span>
              </div>
              <div className="three-way-row">
                <span>Free Detention:</span>
                <span>{audit.contractRate.detentionFreeHours} hrs free</span>
              </div>
              <div className="three-way-row" style={{ borderTop: '2px solid var(--color-border)', marginTop: 'auto', paddingTop: '8px' }}>
                <span style={{ fontWeight: 800 }}>Agreed Target:</span>
                <strong style={{ color: '#2563eb', fontSize: '13px' }}>₹ {audit.contractRate.totalAgreed.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Column 2: Actual Telemetry Execution */}
            <div className="three-way-column telemetry">
              <div className="three-way-title" style={{ color: '#059669' }}>
                <ShieldCheck size={14} />
                <span>2. IoT Telemetry</span>
              </div>
              <div className="three-way-row">
                <span>GPS Odometer:</span>
                <strong>{audit.actualTelemetry.gpsDistanceKm} km</strong>
              </div>
              <div className="three-way-row">
                <span>Gross Scale Weight:</span>
                <span>{(audit.actualTelemetry.weighbridgeGrossKg / 1000).toFixed(1)} MT</span>
              </div>
              <div className="three-way-row">
                <span>FastTag NETC Toll:</span>
                <strong>₹ {audit.actualTelemetry.tollFastTagActual.toLocaleString('en-IN')}</strong>
              </div>
              <div className="three-way-row">
                <span>Unload Dwell:</span>
                <span>{audit.actualTelemetry.unloadingDwellHours} hrs total</span>
              </div>
              <div className="three-way-row" style={{ borderTop: '2px solid var(--color-border)', marginTop: 'auto', paddingTop: '8px' }}>
                <span style={{ fontWeight: 800 }}>Telemetry Status:</span>
                <strong style={{ color: '#059669', fontSize: '13px' }}>100% Verified</strong>
              </div>
            </div>

            {/* Column 3: Carrier Billed Invoice */}
            <div className="three-way-column billed">
              <div className="three-way-title" style={{ color: '#dc2626' }}>
                <DollarSign size={14} />
                <span>3. Billed Invoice</span>
              </div>
              <div className="three-way-row">
                <span>Base Linehaul:</span>
                <strong>₹ {audit.billedInvoice.baseFreight.toLocaleString('en-IN')}</strong>
              </div>
              <div className="three-way-row">
                <span>Fuel Surcharge:</span>
                <span>₹ {audit.billedInvoice.fuelSurcharge.toLocaleString('en-IN')}</span>
              </div>
              <div className="three-way-row">
                <span>Billed Tolls:</span>
                <strong style={{ color: audit.billedInvoice.tollCharges > audit.actualTelemetry.tollFastTagActual ? '#dc2626' : undefined }}>
                  ₹ {audit.billedInvoice.tollCharges.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="three-way-row">
                <span>Detention Fee:</span>
                <strong style={{ color: audit.billedInvoice.detentionCharges > 0 ? '#dc2626' : undefined }}>
                  ₹ {audit.billedInvoice.detentionCharges.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="three-way-row" style={{ borderTop: '2px solid var(--color-border)', marginTop: 'auto', paddingTop: '8px' }}>
                <span style={{ fontWeight: 800 }}>Gross Billed:</span>
                <strong style={{ color: '#dc2626', fontSize: '13px' }}>₹ {audit.billedInvoice.grossBilled.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Discrepancy Reasons & Auditor Recommendation */}
          {audit.discrepancyReasons.length > 0 && (
            <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#b91c1c', marginBottom: '6px' }}>
                Identified Discrepancies & Violations
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: 'var(--color-text-primary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {audit.discrepancyReasons.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
              <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
                <strong>Auditor Rule:</strong> {audit.auditorRecommendation}
              </div>
            </div>
          )}

          {/* Dispute / Counter-Offer Form */}
          {isDiscrepant && (
            <form onSubmit={handleCounterOffer} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                Resolve with Counter-Offer / Debit Note Deduction
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                    Authorized Payout Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={counterOfferAmount}
                    onChange={(e) => setCounterOfferAmount(e.target.value)}
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', fontWeight: 800, color: '#2563eb' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                    Dispute Reason / Deduction Note to Carrier
                  </label>
                  <input
                    type="text"
                    value={disputeNotes}
                    onChange={(e) => setDisputeNotes(e.target.value)}
                    placeholder="e.g. Unapproved detention & driver fee deducted based on GPS logs"
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="finance-modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          {isDiscrepant ? (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleApproveOriginal}
                disabled={isSubmitting}
                style={{ color: '#d97706' }}
              >
                Override & Approve Full Billed (₹ {audit.billedInvoice.grossBilled.toLocaleString('en-IN')})
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCounterOffer}
                disabled={isSubmitting}
              >
                <Send size={14} />
                <span>Issue Debit Note & Authorize ₹ {parseFloat(counterOfferAmount).toLocaleString('en-IN')}</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApproveOriginal}
              disabled={isSubmitting}
            >
              <CheckCircle2 size={16} />
              <span>Authorize & Release to Settlement</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
