import React from 'react';
import { X, Printer, Download, QrCode, ShieldCheck, Copy, Check } from 'lucide-react';
import '../Documents.css';

export default function EInvoiceViewModal({ einvoice, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!einvoice) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(einvoice.irnHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content" style={{ maxWidth: '820px' }}>
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Tax E-Invoice with Verifiable IRN Hash</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                GST IRP Portal • Invoice #{einvoice.invoiceNumber}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="doc-modal-body" style={{ background: '#f8fafc' }}>
          {/* Printable E-Invoice Sheet */}
          <div className="printable-voucher-sheet">
            {/* Header with IRP & QR */}
            <div className="voucher-header-grid">
              <div>
                <div style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#1e3a8a' }}>
                  Tax Invoice (Rule 48(4) CGST Rules)
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Supplier: <strong>{einvoice.supplierLegalName}</strong> (GSTIN: {einvoice.supplierGstin})
                </div>

                {/* IRN Bar */}
                <div style={{ marginTop: '12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Invoice Reference Number (IRN - 64 Bit Cryptographic Hash)</span>
                    <button
                      onClick={handleCopyHash}
                      style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10px', fontWeight: 700 }}
                    >
                      {copied ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copied ? 'Copied' : 'Copy Hash'}</span>
                    </button>
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#1e293b', wordBreak: 'break-all', marginTop: '2px', fontWeight: 700 }}>
                    {einvoice.irnHash}
                  </div>
                </div>

                <div style={{ marginTop: '10px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Ack No:</span>
                    <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>{einvoice.ackNumber}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Ack Date:</span>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>{einvoice.ackDate}</div>
                  </div>
                </div>
              </div>

              {/* QR Mock */}
              <div className="voucher-qr-mock">
                <QrCode size={48} color="#0f172a" />
                <span style={{ fontSize: '8px', marginTop: '4px' }}>GST-IRP-SIGNED</span>
              </div>
            </div>

            {/* Buyer Details */}
            <table className="voucher-info-table">
              <tbody>
                <tr>
                  <th style={{ width: '25%' }}>Buyer (Billed To)</th>
                  <td style={{ width: '25%', fontWeight: 700 }}>{einvoice.buyerLegalName}</td>
                  <th style={{ width: '25%' }}>Buyer GSTIN</th>
                  <td style={{ width: '25%', fontFamily: 'monospace', fontWeight: 700 }}>{einvoice.buyerGstin}</td>
                </tr>
                <tr>
                  <th>Place of Supply</th>
                  <td>{einvoice.placeOfSupply}</td>
                  <th>Invoice Date</th>
                  <td>{einvoice.invoiceDate}</td>
                </tr>
              </tbody>
            </table>

            {/* Items Table */}
            <table className="voucher-info-table">
              <thead>
                <tr>
                  <th>HSN</th>
                  <th>Item Description</th>
                  <th>Qty</th>
                  <th>Rate (₹)</th>
                  <th>Taxable (₹)</th>
                  <th>GST %</th>
                  <th>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {einvoice.items.map((it, idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: 'monospace' }}>{it.hsn}</td>
                    <td>{it.description}</td>
                    <td>{it.qty} {it.unit}</td>
                    <td>₹ {it.unitRate.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: 700 }}>₹ {it.taxable.toLocaleString('en-IN')}</td>
                    <td>{it.gstRate}%</td>
                    <td style={{ fontWeight: 800 }}>₹ {it.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Tax Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <table style={{ width: '280px', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '4px 8px', color: '#64748b' }}>Taxable Amount:</td>
                    <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 700 }}>
                      ₹ {einvoice.taxableValue.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  {einvoice.igstAmount > 0 && (
                    <tr>
                      <td style={{ padding: '4px 8px', color: '#64748b' }}>Integrated GST (IGST 18%):</td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 700 }}>
                        ₹ {einvoice.igstAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  )}
                  {einvoice.cgstAmount > 0 && (
                    <>
                      <tr>
                        <td style={{ padding: '4px 8px', color: '#64748b' }}>Central GST (CGST 9%):</td>
                        <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 700 }}>
                          ₹ {einvoice.cgstAmount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '4px 8px', color: '#64748b' }}>State GST (SGST 9%):</td>
                        <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 700 }}>
                          ₹ {einvoice.sgstAmount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </>
                  )}
                  <tr style={{ borderTop: '2px solid #0f172a' }}>
                    <td style={{ padding: '8px 8px', fontWeight: 900, textTransform: 'uppercase' }}>Total Amount:</td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 900, fontSize: '14px', color: '#2563eb' }}>
                      ₹ {einvoice.totalInvoiceValue.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="doc-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <Printer size={16} />
            <span>Print Tax E-Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
