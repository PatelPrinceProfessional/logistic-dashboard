import React, { useState } from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ShieldCheck, DollarSign, Building2, Send } from 'lucide-react';
import '../Finance.css';

export default function CarrierInvoiceDetailModal({ invoice, onClose, onApprove, onReject }) {
  const [remarks, setRemarks] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!invoice) return null;

  const handleApproveAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onApprove(invoice.id, remarks || 'Approved by Finance Controller for Batch Payout.');
      setIsProcessing(false);
    }, 600);
  };

  const handleRejectAction = () => {
    const reason = remarks || prompt('Enter rejection reason for carrier invoice:');
    if (!reason) return;
    setIsProcessing(true);
    setTimeout(() => {
      onReject(invoice.id, reason);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '780px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <FileText size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Carrier Freight Invoice #{invoice.invoiceNumber}</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {invoice.carrierName} • GSTIN: {invoice.carrierGstin}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="finance-modal-body">
          {/* Header Key Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: 'var(--color-bg-secondary)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Invoice Date</div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{invoice.invoiceDate}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Due Date</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: invoice.daysUntilDue < 7 ? '#dc2626' : undefined }}>
                {invoice.dueDate} ({invoice.daysUntilDue}d left)
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Credit Terms</div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{invoice.creditTerms}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Payment Mode</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>{invoice.paymentMode}</div>
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Description / Line Item</th>
                  <th>Amount (₹)</th>
                  <th>Statutory Tax / Rule</th>
                  <th>Net Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Gross Billed Freight</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Trip: {invoice.associatedTrip}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>₹ {invoice.grossAmount.toLocaleString('en-IN')}</td>
                  <td>Base Contracted Rate</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>+ ₹ {invoice.grossAmount.toLocaleString('en-IN')}</td>
                </tr>

                {invoice.grossAmount !== invoice.auditApprovedAmount && (
                  <tr style={{ background: '#fef2f2' }}>
                    <td>
                      <strong style={{ color: '#b91c1c' }}>Freight Audit Deduction (Dispute)</strong>
                      <div style={{ fontSize: '11px', color: '#991b1b' }}>Unapproved detention & toll variance</div>
                    </td>
                    <td style={{ color: '#b91c1c' }}>- ₹ {(invoice.grossAmount - invoice.auditApprovedAmount).toLocaleString('en-IN')}</td>
                    <td>Freight Audit Overcharge Rule</td>
                    <td style={{ fontWeight: 700, color: '#b91c1c' }}>- ₹ {(invoice.grossAmount - invoice.auditApprovedAmount).toLocaleString('en-IN')}</td>
                  </tr>
                )}

                <tr>
                  <td>
                    <strong>TDS Deduction (Section 194C)</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Withholding Tax @ {invoice.tdsRatePct}%</div>
                  </td>
                  <td style={{ color: '#b91c1c' }}>- ₹ {invoice.tdsAmount.toLocaleString('en-IN')}</td>
                  <td>Income Tax Act, 1961</td>
                  <td style={{ fontWeight: 700, color: '#b91c1c' }}>- ₹ {invoice.tdsAmount.toLocaleString('en-IN')}</td>
                </tr>

                <tr style={{ background: 'rgba(37, 99, 235, 0.04)' }}>
                  <td>
                    <strong style={{ fontSize: '14px', color: '#1e3a8a' }}>NET DISBURSABLE PAYABLE</strong>
                    <div style={{ fontSize: '11px', color: '#1e40af' }}>Bank: {invoice.bankAccountMasked}</div>
                  </td>
                  <td colSpan={2}></td>
                  <td style={{ fontWeight: 900, fontSize: '16px', color: '#2563eb' }}>
                    ₹ {invoice.netPayable.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Remarks Input */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Approval / Rejection Remarks
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Approved. POD and GPS logs verified."
              className="filter-search-input"
              style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
            />
          </div>
        </div>

        <div className="finance-modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRejectAction}
            disabled={isProcessing}
            style={{ color: '#ef4444' }}
          >
            Reject Invoice
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleApproveAction}
            disabled={isProcessing}
          >
            <CheckCircle2 size={16} />
            <span>Approve & Authorize Payout (₹ {invoice.netPayable.toLocaleString('en-IN')})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
