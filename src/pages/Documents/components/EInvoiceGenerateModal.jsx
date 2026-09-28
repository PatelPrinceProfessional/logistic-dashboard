import React, { useState } from 'react';
import { X, Receipt, ShieldCheck, Building2, Plus, Trash2 } from 'lucide-react';
import '../Documents.css';

export default function EInvoiceGenerateModal({ isOpen, onClose, onGenerate }) {
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-2026-${Math.floor(8810 + Math.random() * 90)}`);
  const [supplyType, setSupplyType] = useState('B2B (Regular)');
  const [buyerGstin, setBuyerGstin] = useState('07AAACR4091M1ZP');
  const [buyerLegalName, setBuyerLegalName] = useState('Tata Motors Limited (Pantnagar Plant)');
  const [placeOfSupply, setPlaceOfSupply] = useState('05-Uttarakhand');
  const [items, setItems] = useState([
    { hsn: '87082900', description: 'Auto Chassis Assemblies & Sub-Units', qty: 20, unit: 'NOS', unitRate: 45000, gstRate: 18 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([
      ...items,
      { hsn: '87089900', description: 'Auxiliary Sensor Wiring Harness Kit', qty: 10, unit: 'SET', unitRate: 7500, gstRate: 18 },
    ]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculations
  const taxableValue = items.reduce((acc, item) => acc + item.qty * item.unitRate, 0);
  const isInterState = !placeOfSupply.startsWith('27'); // Maharashtra is 27
  const igstAmount = isInterState ? (taxableValue * 18) / 100 : 0;
  const cgstAmount = !isInterState ? (taxableValue * 9) / 100 : 0;
  const sgstAmount = !isInterState ? (taxableValue * 9) / 100 : 0;
  const totalInvoiceValue = taxableValue + igstAmount + cgstAmount + sgstAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // 64 character cryptographic hex hash simulation
      const randomHex = () => Math.random().toString(16).substring(2, 10);
      const generatedIrn = `${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}`;

      const newEinvoice = {
        id: `EINV-${Math.floor(10 + Math.random() * 90)}`,
        invoiceNumber: invoiceNumber,
        invoiceDate: new Date().toISOString().split('T')[0],
        supplyType: supplyType,
        irnHash: generatedIrn,
        ackNumber: `112610892${Math.floor(100000 + Math.random() * 900000)}`,
        ackDate: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST',
        supplierGstin: '27AABCT3518Q1ZY',
        supplierLegalName: 'LogisticsHub Freight Solutions Pvt Ltd',
        buyerGstin: buyerGstin,
        buyerLegalName: buyerLegalName,
        buyerState: placeOfSupply,
        placeOfSupply: placeOfSupply,
        taxableValue: taxableValue,
        cgstAmount: cgstAmount,
        sgstAmount: sgstAmount,
        igstAmount: igstAmount,
        cessAmount: 0,
        totalInvoiceValue: totalInvoiceValue,
        status: 'Generated & Active',
        qrCodeScanned: 'Valid Cryptographic IRP Signature Verified',
        gstr1SyncStatus: 'Auto-Pushed to GSTR-1 Table 4A',
        associatedShipment: `SHP-${Math.floor(88100 + Math.random() * 50)}`,
        associatedEwb: `2410 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        items: items.map((it) => ({
          ...it,
          taxable: it.qty * it.unitRate,
          igst: isInterState ? (it.qty * it.unitRate * it.gstRate) / 100 : 0,
          cgst: !isInterState ? (it.qty * it.unitRate * (it.gstRate / 2)) / 100 : 0,
          sgst: !isInterState ? (it.qty * it.unitRate * (it.gstRate / 2)) / 100 : 0,
          total: it.qty * it.unitRate * (1 + it.gstRate / 100),
        })),
      };

      setIsSubmitting(false);
      onGenerate(newEinvoice);
    }, 1200);
  };

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content" style={{ maxWidth: '840px' }}>
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
              <Receipt size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Generate GST E-Invoice (IRP Portal)</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Generates 64-character Invoice Reference Number (IRN) and digitally signed QR code.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="doc-modal-body">
            {/* Invoice Header Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Supply Type</label>
                <select
                  value={supplyType}
                  onChange={(e) => setSupplyType(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="B2B (Regular)">B2B (Regular)</option>
                  <option value="SEZ Export (With Tax)">SEZ Export (With Tax)</option>
                  <option value="SEZ Export (Without Tax)">SEZ Export (Without Tax)</option>
                  <option value="Deemed Export">Deemed Export</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Place of Supply</label>
                <select
                  value={placeOfSupply}
                  onChange={(e) => setPlaceOfSupply(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="05-Uttarakhand">05 - Uttarakhand (IGST)</option>
                  <option value="27-Maharashtra">27 - Maharashtra (CGST + SGST)</option>
                  <option value="07-Delhi">07 - Delhi (IGST)</option>
                  <option value="33-Tamil Nadu">33 - Tamil Nadu (IGST)</option>
                  <option value="29-Karnataka">29 - Karnataka (IGST)</option>
                </select>
              </div>
            </div>

            {/* Buyer Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Buyer GSTIN</label>
                <input
                  type="text"
                  value={buyerGstin}
                  onChange={(e) => setBuyerGstin(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Buyer Legal Entity Name</label>
                <input
                  type="text"
                  value={buyerLegalName}
                  onChange={(e) => setBuyerLegalName(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  required
                />
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>Line Items Manifest</span>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddItem}>
                  <Plus size={12} />
                  <span>Add Line Item</span>
                </button>
              </div>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '6px', overflow: 'hidden' }}>
                <table className="documents-table" style={{ fontSize: '12px' }}>
                  <thead>
                    <tr>
                      <th>HSN</th>
                      <th>Item Description</th>
                      <th>Qty</th>
                      <th>Rate (₹)</th>
                      <th>Taxable (₹)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.hsn}</td>
                        <td>{it.description}</td>
                        <td>{it.qty} {it.unit}</td>
                        <td>₹ {it.unitRate.toLocaleString('en-IN')}</td>
                        <td style={{ fontWeight: 700 }}>₹ {(it.qty * it.unitRate).toLocaleString('en-IN')}</td>
                        <td>
                          {items.length > 1 && (
                            <button
                              type="button"
                              className="btn-icon"
                              onClick={() => handleRemoveItem(idx)}
                              style={{ color: '#ef4444' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Totals */}
            <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Tax Structure: {isInterState ? 'IGST 18%' : 'CGST 9% + SGST 9%'}</div>
                <div style={{ fontSize: '12px', fontWeight: 600 }}>Taxable: ₹ {taxableValue.toLocaleString('en-IN')} + GST: ₹ {(igstAmount + cgstAmount + sgstAmount).toLocaleString('en-IN')}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Total Invoice Amount</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-primary-600)' }}>
                  ₹ {totalInvoiceValue.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          <div className="doc-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner spinner--sm" />
                  <span>Generating IRN via IRP...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Submit & Generate IRN Hash</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
