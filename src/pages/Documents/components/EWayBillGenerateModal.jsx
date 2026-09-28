import React, { useState } from 'react';
import { X, FileCheck, Truck, ShieldCheck, MapPin, Building2, AlertCircle } from 'lucide-react';
import '../Documents.css';

export default function EWayBillGenerateModal({ isOpen, onClose, onGenerate }) {
  const [formData, setFormData] = useState({
    supplierName: 'Tata AutoComp Systems Ltd',
    supplierGstin: '27AABCT3518Q1ZY',
    supplierCity: 'Pune (Maharashtra) - 411018',
    recipientName: 'Tata Motors Assembly Plant',
    recipientGstin: '07AAACR4091M1ZP',
    recipientCity: 'Pantnagar (Uttarakhand) - 263153',
    documentType: 'Tax Invoice',
    documentNo: `INV-2026-${Math.floor(8900 + Math.random() * 100)}`,
    documentDate: new Date().toISOString().split('T')[0],
    totalValue: '1850000',
    hsnCode: '87082900',
    vehicleNumber: 'MH-04-AB-1234',
    transporterName: 'LogisticsHub Dedicated Fleet',
    transporterId: '27AABCL9901M1Z1',
    mode: 'Road',
    fromPin: '411018',
    toPin: '263153',
    calculatedDistanceKm: '1480',
    shipmentId: 'SHP-88092',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newEwb = {
        id: `EWB-${Math.floor(10 + Math.random() * 90)}`,
        ewbNumber: `2410 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        generatedDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST',
        validFrom: new Date().toISOString().replace('T', ' ').substring(0, 16),
        validUntil: new Date(Date.now() + 72 * 3600 * 1000).toISOString().replace('T', ' ').substring(0, 16),
        remainingHours: 72,
        status: 'Active In-Transit',
        urgencyClass: 'green',
        ...formData,
        totalValue: parseFloat(formData.totalValue),
        calculatedDistanceKm: parseInt(formData.calculatedDistanceKm, 10),
        extensionsUsed: 0,
        lastVehicleUpdated: 'Initial Assignment',
      };

      setIsSubmitting(false);
      onGenerate(newEwb);
    }, 1000);
  };

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content" style={{ maxWidth: '820px' }}>
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary-600)' }}>
              <FileCheck size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Generate GST E-Way Bill (NIC API)</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Direct API handshake with National Informatics Centre (NIC) GST e-Way Bill System.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="doc-modal-body">
            {/* PART-A: Transaction Details */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', background: 'var(--color-bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Building2 size={16} className="text-primary" />
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Part-A: Consignor & Consignee Transaction Details
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                    Supplier (Consignor) GSTIN & Name
                  </label>
                  <input
                    type="text"
                    value={`${formData.supplierGstin} - ${formData.supplierName}`}
                    readOnly
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                    Recipient (Consignee) GSTIN & Name
                  </label>
                  <input
                    type="text"
                    value={`${formData.recipientGstin} - ${formData.recipientName}`}
                    readOnly
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Doc No & Type</label>
                  <input
                    type="text"
                    value={`${formData.documentNo} (${formData.documentType})`}
                    readOnly
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Consignment Value (₹)</label>
                  <input
                    type="number"
                    value={formData.totalValue}
                    onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>HSN Code</label>
                  <input
                    type="text"
                    value={formData.hsnCode}
                    onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* PART-B: Transportation Details */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', background: 'var(--color-bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Truck size={16} className="text-primary" />
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Part-B: Vehicle & Transporter Movement Details
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                    Vehicle Registration Number (Format: MH04AB1234)
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                    placeholder="MH-04-AB-1234"
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                    Transport Mode
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="filter-dropdown"
                    style={{ width: '100%', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                  >
                    <option value="Road">1 - Road</option>
                    <option value="Rail">2 - Rail</option>
                    <option value="Air">3 - Air</option>
                    <option value="Ship">4 - Ship</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>From PIN Code</label>
                  <input
                    type="text"
                    value={formData.fromPin}
                    onChange={(e) => setFormData({ ...formData, fromPin: e.target.value })}
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>To PIN Code</label>
                  <input
                    type="text"
                    value={formData.toPin}
                    onChange={(e) => setFormData({ ...formData, toPin: e.target.value })}
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Approx Distance (km)</label>
                  <input
                    type="number"
                    value={formData.calculatedDistanceKm}
                    onChange={(e) => setFormData({ ...formData, calculatedDistanceKm: e.target.value })}
                    className="filter-search-input"
                    style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--color-bg-primary)' }}
                    required
                  />
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
                  <span>Submitting to NIC...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Generate 12-Digit EWB</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
