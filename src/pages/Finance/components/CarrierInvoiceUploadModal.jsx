import React, { useState } from 'react';
import { X, UploadCloud, FileText, ShieldCheck, Building2, DollarSign } from 'lucide-react';
import '../Finance.css';

export default function CarrierInvoiceUploadModal({ isOpen, onClose, onUpload }) {
  const [carrierName, setCarrierName] = useState('North Express Freight Ltd');
  const [carrierGstin, setCarrierGstin] = useState('03AABCN9901J1ZX');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-CARRIER-${Math.floor(1000 + Math.random() * 9000)}`);
  const [associatedTrip, setAssociatedTrip] = useState('TRIP-9901 (Mumbai → Delhi)');
  const [grossAmount, setGrossAmount] = useState('67340');
  const [tdsRate, setTdsRate] = useState('2.0');
  const [creditTerms, setCreditTerms] = useState('Net 15 Days');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const grossVal = parseFloat(grossAmount) || 0;
  const tdsVal = (grossVal * parseFloat(tdsRate)) / 100;
  const netPayable = grossVal - tdsVal;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newInvoice = {
        id: `CINV-${Math.floor(410 + Math.random() * 90)}`,
        invoiceNumber,
        carrierName,
        carrierGstin,
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        daysUntilDue: 15,
        associatedTrip,
        grossAmount: grossVal,
        auditApprovedAmount: grossVal,
        tdsRatePct: parseFloat(tdsRate),
        tdsAmount: tdsVal,
        gstRcmApplicable: true,
        gstRcmAmount: grossVal * 0.05,
        netPayable,
        approvalStatus: 'Pending Level 1',
        approvalLevel: 'Level 1 - Logistics Dispatch Lead',
        creditTerms,
        paymentMode: 'Bank Transfer (NEFT)',
        bankAccountMasked: 'HDFC Bank •••• 9921',
      };

      setIsSubmitting(false);
      onUpload(newInvoice);
    }, 1000);
  };

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '640px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <FileText size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Submit Carrier Freight Invoice</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Digital intake with automatic Section 194C TDS calculation and trip validation.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="finance-modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Carrier Partner</label>
                <select
                  value={carrierName}
                  onChange={(e) => setCarrierName(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="North Express Freight Ltd">North Express Freight Ltd</option>
                  <option value="LogisticsHub Dedicated Linehaul">LogisticsHub Dedicated Linehaul</option>
                  <option value="Western Cold-Chain Express">Western Cold-Chain Express</option>
                  <option value="Capital Haul Logistics">Capital Haul Logistics</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Carrier Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Associated Trip Manifest</label>
              <input
                type="text"
                value={associatedTrip}
                onChange={(e) => setAssociatedTrip(e.target.value)}
                placeholder="e.g. TRIP-9901 (Mumbai → Delhi)"
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Gross Amount (₹)</label>
                <input
                  type="number"
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 700 }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>TDS Section 194C (%)</label>
                <select
                  value={tdsRate}
                  onChange={(e) => setTdsRate(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="2.0">2.0% (Company / Firm)</option>
                  <option value="1.0">1.0% (Individual / Transporter)</option>
                  <option value="0.0">0.0% (Exempt / Low Deduction Cert)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Credit Terms</label>
                <select
                  value={creditTerms}
                  onChange={(e) => setCreditTerms(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="Net 15 Days">Net 15 Days</option>
                  <option value="Net 7 Days">Net 7 Days</option>
                  <option value="Net 30 Days">Net 30 Days</option>
                  <option value="Immediate">Immediate (On POD)</option>
                </select>
              </div>
            </div>

            {/* Calculated Breakdown Box */}
            <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>TDS Deduction: ₹ {tdsVal.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>GTA GST RCM: 5% Applicable on Shipper</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Net Payable to Carrier</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--color-primary-600)' }}>
                  ₹ {netPayable.toLocaleString('en-IN')}
                </div>
              </div>
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
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Submit for Level-1 Approval</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
