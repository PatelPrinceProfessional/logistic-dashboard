import React, { useState } from 'react';
import { X, DollarSign, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import '../Finance.css';

export default function PaymentBatchModal({ isOpen, onClose, onExecuteBatch }) {
  const [bankGateway, setBankGateway] = useState('HDFC Corporate Host-to-Host (API-RTGS)');
  const [totalInvoices, setTotalInvoices] = useState('12');
  const [totalAmount, setTotalAmount] = useState('745000');
  const [paymentMode, setPaymentMode] = useState('RTGS');
  const [isExecuting, setIsExecuting] = useState(false);

  if (!isOpen) return null;

  const totalGross = parseFloat(totalAmount) || 0;
  const totalTds = totalGross * 0.02;
  const totalNet = totalGross - totalTds;

  const handleExecute = (e) => {
    e.preventDefault();
    setIsExecuting(true);

    setTimeout(() => {
      const newBatch = {
        id: `BATCH-${new Date().toISOString().split('T')[0]}-${Math.floor(100 + Math.random() * 900)}`,
        executionDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST',
        bankGateway,
        totalInvoicesCount: parseInt(totalInvoices, 10),
        totalGrossAmount: totalGross,
        totalTdsDeducted: totalTds,
        totalNetDisbursed: totalNet,
        status: 'Executed / Cleared',
        utrNumber: `HDFCR5${Date.now().toString().substring(4)}`,
        beneficiaries: [
          { name: 'LogisticsHub Dedicated Linehaul', amount: 44312.4, utr: `UTR-${Math.floor(1000 + Math.random() * 9000)}`, status: 'Success' },
          { name: 'Western Cold-Chain Express', amount: 54880.0, utr: `UTR-${Math.floor(1000 + Math.random() * 9000)}`, status: 'Success' },
          { name: 'North Express Freight (Resolved)', amount: 61779.2, utr: `UTR-${Math.floor(1000 + Math.random() * 9000)}`, status: 'Success' },
        ],
      };

      setIsExecuting(false);
      onExecuteBatch(newBatch);
    }, 1200);
  };

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '640px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Building2 size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Execute Carrier Disbursement Run</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Host-to-Host Corporate Bank API handshake with instant UTR reconciliation.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleExecute}>
          <div className="finance-modal-body">
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                Corporate Banking Host-to-Host Gateway
              </label>
              <select
                value={bankGateway}
                onChange={(e) => setBankGateway(e.target.value)}
                className="filter-dropdown"
                style={{ width: '100%', padding: '8px 12px' }}
              >
                <option value="HDFC Corporate Host-to-Host (API-RTGS)">HDFC Corporate Host-to-Host (API-RTGS)</option>
                <option value="ICICI E-Collection Virtual Settlement">ICICI E-Collection Virtual Settlement</option>
                <option value="Axis Bank Corporate Direct Link">Axis Bank Corporate Direct Link</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                  Total Invoices in Batch
                </label>
                <input
                  type="number"
                  value={totalInvoices}
                  onChange={(e) => setTotalInvoices(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                  Transfer Mode
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '8px 12px' }}
                >
                  <option value="RTGS">RTGS (Instant High-Value)</option>
                  <option value="NEFT">NEFT (Batch Hourly)</option>
                  <option value="IMPS">IMPS 24x7</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                Total Gross Disbursement Amount (₹)
              </label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px', fontWeight: 800, fontSize: '14px' }}
                required
              />
            </div>

            {/* Calculated Breakdown Box */}
            <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>TDS Retained: ₹ {totalTds.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Bank Encrypted 256-bit API Handshake</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Total Bank Wire Outflow</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#10b981' }}>
                  ₹ {totalNet.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          <div className="finance-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isExecuting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isExecuting}>
              {isExecuting ? (
                <>
                  <span className="spinner spinner--sm" />
                  <span>Transmitting to Bank...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Execute Bank Payment Run</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
