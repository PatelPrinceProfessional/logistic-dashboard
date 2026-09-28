import React, { useState } from 'react';
import { X, Receipt, Building2, ShieldCheck, DollarSign, Fuel } from 'lucide-react';
import '../Finance.css';

export default function CustomerInvoiceGenerateModal({ isOpen, onClose, onGenerate }) {
  const [customerName, setCustomerName] = useState('Tata Motors Limited');
  const [customerGstin, setCustomerGstin] = useState('07AAACR4091M1ZP');
  const [billingCycle, setBillingCycle] = useState('Monthly Consolidated (Sept 2026)');
  const [baseFreight, setBaseFreight] = useState('2480000');
  const [dieselBaseIndexRate, setDieselBaseIndexRate] = useState('90.40');
  const [shipmentsCount, setShipmentsCount] = useState('48');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const baseVal = parseFloat(baseFreight) || 0;
  // Dynamic Index-linked Fuel Surcharge Formula: Base Freight * 13%
  const fscAmount = baseVal * 0.13;
  const gstAmount = (baseVal + fscAmount) * 0.18;
  const totalBilled = baseVal + fscAmount + gstAmount;
  const tdsExpected = totalBilled * 0.02;
  const netReceivable = totalBilled - tdsExpected;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newInvoice = {
        id: `CUST-INV-${Math.floor(8810 + Math.random() * 90)}`,
        invoiceNumber: `BILL-2026-${customerName.substring(0, 4).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
        customerName,
        customerGstin,
        billingCycle,
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        daysAging: 0,
        agingStatus: 'Current (0-30 Days)',
        totalShipmentsCount: parseInt(shipmentsCount, 10),
        financials: {
          baseFreight: baseVal,
          fuelSurchargeIndex: fscAmount,
          detentionLoadingFee: 0,
          gstAmount,
          totalBilledAmount: totalBilled,
          tdsExpectedDeduction: tdsExpected,
          netReceivable,
        },
        paymentStatus: 'Unpaid / Sent to Customer',
        collectionHistory: [],
      };

      setIsSubmitting(false);
      onGenerate(newInvoice);
    }, 1000);
  };

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '680px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary-600)' }}>
              <Receipt size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Generate Consolidated Customer Bill</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Index-linked Fuel Surcharge (FSC) adjustment and GST invoice generation.
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
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Customer Enterprise</label>
                <select
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="Tata Motors Limited">Tata Motors Limited</option>
                  <option value="Reliance Retail Ventures">Reliance Retail Ventures</option>
                  <option value="Havells India Limited">Havells India Limited</option>
                  <option value="Sun Pharma Industries">Sun Pharma Industries</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Billing Cycle</label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="Monthly Consolidated (Sept 2026)">Monthly Consolidated (Sept 2026)</option>
                  <option value="Fortnightly Cycle #2">Fortnightly Cycle #2</option>
                  <option value="Weekly Run">Weekly Run</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Base Freight (₹)</label>
                <input
                  type="number"
                  value={baseFreight}
                  onChange={(e) => setBaseFreight(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 700 }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Diesel Base Benchmark (₹/L)</label>
                <input
                  type="number"
                  step="0.01"
                  value={dieselBaseIndexRate}
                  onChange={(e) => setDieselBaseIndexRate(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Delivered Shipments</label>
                <input
                  type="number"
                  value={shipmentsCount}
                  onChange={(e) => setShipmentsCount(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  required
                />
              </div>
            </div>

            {/* Calculated Breakdown Box */}
            <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  Fuel Surcharge Index (13%): ₹ {fscAmount.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>
                  GST (18%): ₹ {gstAmount.toLocaleString('en-IN')} • Expected TDS (2%): ₹ {tdsExpected.toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Total Invoice Billed</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#2563eb' }}>
                  ₹ {totalBilled.toLocaleString('en-IN')}
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
                  <span>Generating Bill...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Generate Customer Invoice</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
