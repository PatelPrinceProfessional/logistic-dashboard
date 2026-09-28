import React, { useState } from 'react';
import { X, DollarSign, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import '../Finance.css';

export default function RecordPaymentModal({ invoice, onClose, onRecordPayment }) {
  const [collectionAmount, setCollectionAmount] = useState(
    invoice ? invoice.financials.netReceivable.toString() : '0'
  );
  const [paymentMode, setPaymentMode] = useState('RTGS');
  const [bankRefUtr, setBankRefUtr] = useState(`HDFCR202609${Math.floor(100000 + Math.random() * 900000)}`);
  const [collectionDate, setCollectionDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!invoice) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onRecordPayment(invoice.id, {
        amount: parseFloat(collectionAmount),
        mode: `${paymentMode} (${bankRefUtr})`,
        utr: bankRefUtr,
        date: collectionDate,
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '600px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <DollarSign size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Record Customer Wire Receipt</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {invoice.customerName} • Invoice #{invoice.invoiceNumber}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="finance-modal-body">
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                Collection Amount Received (₹)
              </label>
              <input
                type="number"
                value={collectionAmount}
                onChange={(e) => setCollectionAmount(e.target.value)}
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px', fontWeight: 800, fontSize: '14px', color: '#059669' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                  Payment Mode
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '8px 12px' }}
                >
                  <option value="RTGS">RTGS Wire Transfer</option>
                  <option value="NEFT">NEFT National Clearing</option>
                  <option value="Direct Cheque">Corporate Cheque</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                  Bank UTR / Ref Number
                </label>
                <input
                  type="text"
                  value={bankRefUtr}
                  onChange={(e) => setBankRefUtr(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px', fontFamily: 'monospace' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                Receipt Date
              </label>
              <input
                type="date"
                value={collectionDate}
                onChange={(e) => setCollectionDate(e.target.value)}
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                required
              />
            </div>
          </div>

          <div className="finance-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner spinner--sm" />
                  <span>Recording Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Record & Clear Balance</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
