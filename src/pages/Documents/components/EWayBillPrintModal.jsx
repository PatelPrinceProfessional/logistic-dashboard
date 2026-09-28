import React from 'react';
import { X, Printer, Download, QrCode, ShieldCheck } from 'lucide-react';
import '../Documents.css';

export default function EWayBillPrintModal({ ewb, onClose }) {
  if (!ewb) return null;

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content" style={{ maxWidth: '780px' }}>
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} className="text-primary" />
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>National Informatics Centre (NIC) E-Way Bill</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Official Government Format • Verifiable Digital Barcode & QR Code
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="doc-modal-body" style={{ background: '#f8fafc' }}>
          {/* Printable Sheet */}
          <div className="printable-voucher-sheet">
            <div className="voucher-header-grid">
              <div>
                <div style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#1e3a8a' }}>
                  Government of India — GST E-Way Bill
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Generated on NIC Portal under Rule 138 of CGST Rules, 2017
                </div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>E-Way Bill No:</span>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', fontFamily: 'monospace' }}>
                      {ewb.ewbNumber}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Generated Date:</span>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{ewb.generatedDate}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Valid Until:</span>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#dc2626' }}>{ewb.validUntil}</div>
                  </div>
                </div>
              </div>

              {/* QR Mock */}
              <div className="voucher-qr-mock">
                <QrCode size={48} color="#0f172a" />
                <span style={{ fontSize: '9px', marginTop: '4px' }}>NIC-GST-VERIFIED</span>
              </div>
            </div>

            {/* PART A Details */}
            <div style={{ fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px', color: '#1e293b' }}>
              Part-A: Goods & Transaction Summary
            </div>
            <table className="voucher-info-table">
              <tbody>
                <tr>
                  <th style={{ width: '25%' }}>GSTIN of Supplier</th>
                  <td style={{ width: '25%' }}>{ewb.supplierGstin}</td>
                  <th style={{ width: '25%' }}>GSTIN of Recipient</th>
                  <td style={{ width: '25%' }}>{ewb.recipientGstin}</td>
                </tr>
                <tr>
                  <th>Place of Dispatch</th>
                  <td>{ewb.supplierCity}</td>
                  <th>Place of Delivery</th>
                  <td>{ewb.recipientCity}</td>
                </tr>
                <tr>
                  <th>Doc No. & Date</th>
                  <td>{ewb.documentNo} ({ewb.documentDate})</td>
                  <th>Transaction Value</th>
                  <td style={{ fontWeight: 800 }}>₹ {ewb.totalValue.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <th>HSN Code</th>
                  <td colSpan={3}>{ewb.hsnCode}</td>
                </tr>
              </tbody>
            </table>

            {/* PART B Details */}
            <div style={{ fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px', color: '#1e293b' }}>
              Part-B: Vehicle & Transporter Movement
            </div>
            <table className="voucher-info-table">
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Vehicle / Rake No.</th>
                  <th>From PIN → To PIN</th>
                  <th>Distance (km)</th>
                  <th>Entered Date / By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ewb.mode}</td>
                  <td style={{ fontWeight: 800, color: '#2563eb' }}>{ewb.vehicleNumber}</td>
                  <td>{ewb.fromPin} → {ewb.toPin}</td>
                  <td>{ewb.calculatedDistanceKm} km</td>
                  <td>{ewb.lastVehicleUpdated}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Note: In case of inspection, present this printout or show digital QR code to GST Flying Squad Officer.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                <ShieldCheck size={14} />
                <span>Digitally Signed by NIC Server</span>
              </div>
            </div>
          </div>
        </div>

        <div className="doc-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <Printer size={16} />
            <span>Print Official E-Way Bill</span>
          </button>
        </div>
      </div>
    </div>
  );
}
