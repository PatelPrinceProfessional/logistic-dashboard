import React from 'react';
import { X, Printer, Download, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import '../Finance.css';

export default function PaymentAdviceModal({ batch, onClose }) {
  if (!batch) return null;

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '780px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} className="text-primary" />
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Payment Advice & Bank Remittance Voucher
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Batch Ref: {batch.id} • UTR: {batch.utrNumber}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="doc-modal-body" style={{ background: '#f8fafc' }}>
          {/* Printable Voucher Sheet */}
          <div className="printable-voucher-sheet">
            <div className="voucher-header-grid">
              <div>
                <div style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#1e3a8a' }}>
                  Electronic Bank Remittance Advice
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Issued by: <strong>LogisticsHub Freight Solutions Pvt Ltd</strong>
                </div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Bank Gateway:</span>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>{batch.bankGateway}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Execution Date:</span>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>{batch.executionDate}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Bank UTR No:</span>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#059669', fontFamily: 'monospace' }}>
                      {batch.utrNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                <CheckCircle2 size={32} color="#059669" />
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>CLEARED</span>
              </div>
            </div>

            {/* Beneficiaries Breakdown */}
            <table className="voucher-info-table">
              <thead>
                <tr>
                  <th>Beneficiary Carrier Name</th>
                  <th>Sub-UTR Reference</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Net Remitted (₹)</th>
                </tr>
              </thead>
              <tbody>
                {batch.beneficiaries.map((b, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{b.name}</td>
                    <td style={{ fontFamily: 'monospace' }}>{b.utr}</td>
                    <td>
                      <span className="doc-status-pill verified">{b.status}</span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800 }}>₹ {b.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #0f172a', background: '#f8fafc' }}>
                  <td colSpan={3} style={{ fontWeight: 900, textTransform: 'uppercase' }}>
                    Total Batch Net Disbursed:
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '14px', color: '#2563eb' }}>
                    ₹ {batch.totalNetDisbursed.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Automated bank advice transmitted via Host-to-Host Corporate Gateway. TDS certificates available under Form 16A.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                <ShieldCheck size={14} />
                <span>Verified by Banking API</span>
              </div>
            </div>
          </div>
        </div>

        <div className="finance-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <Printer size={16} />
            <span>Print Remittance Advice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
