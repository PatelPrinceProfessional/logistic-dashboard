import React, { useState } from 'react';
import { X, Users, Building2, ShieldCheck, DollarSign } from 'lucide-react';
import '../Customers.css';

export default function CustomerCreateModal({ isOpen, onClose, onAddCustomer }) {
  const [formData, setFormData] = useState({
    name: '',
    legalName: '',
    gstin: '',
    pan: '',
    tier: 'Platinum',
    industry: 'Automotive & Heavy Eng',
    city: 'Mumbai & Pune',
    billingAddress: '',
    accountManager: 'Vikramaditya Rao (Lead KAM)',
    creditLimit: '5000000',
    creditTerms: 'Net 30 Days',
    primaryLanes: 'Mumbai → Delhi NCR, Pune → Bangalore',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.gstin) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newCust = {
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        code: `${formData.name.substring(0, 3).toUpperCase()}-IND-01`,
        name: formData.name,
        legalName: formData.legalName || formData.name,
        gstin: formData.gstin.toUpperCase(),
        pan: formData.pan.toUpperCase() || formData.gstin.substring(2, 12).toUpperCase(),
        tier: formData.tier,
        industry: formData.industry,
        city: formData.city,
        billingAddress: formData.billingAddress || `${formData.city}, India`,
        accountManager: formData.accountManager,
        accountManagerPhone: '+91 98200 44120',
        monthlySpend: 0,
        monthlyVolumeMt: 0,
        creditLimit: parseFloat(formData.creditLimit) || 1000000,
        outstandingBalance: 0,
        creditUtilizationPct: 0,
        creditTerms: formData.creditTerms,
        onTimeSlaPct: 100,
        activeShipmentsCount: 0,
        primaryLanes: formData.primaryLanes.split(',').map((s) => s.trim()),
        contractStartDate: new Date().toISOString().split('T')[0],
        contractEndDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
        status: 'Active (Healthy)',
        contacts: [
          { name: 'Primary Logistics Lead', role: 'Head of Outbound', email: `logistics@${formData.name.toLowerCase().replace(/\s+/g, '')}.com`, phone: '+91 98000 11223' },
        ],
        rateCards: [],
      };

      setIsSubmitting(false);
      onAddCustomer(newCust);
    }, 1000);
  };

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-content" style={{ maxWidth: '780px' }}>
        <div className="customer-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary-600)' }}>
              <Building2 size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Onboard Enterprise Shipper Account</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Setup B2B client profile, credit limits, SLA tier, and billing contract.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="customer-modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Customer Trade Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tata Motors Limited"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Legal Registered Entity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tata Motors Passenger Vehicles Ltd"
                  value={formData.legalName}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>GSTIN (15 Chars)</label>
                <input
                  type="text"
                  placeholder="27AABCT3518Q1ZY"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontFamily: 'monospace' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>SLA Service Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="Platinum">Platinum (High Volume Dedicated)</option>
                  <option value="Gold">Gold (Contracted Regular)</option>
                  <option value="Silver">Silver (Standard)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Industry Vertical</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="Automotive & Heavy Eng">Automotive & Heavy Eng</option>
                  <option value="FMCG & Consumer Electronics">FMCG & Consumer Electronics</option>
                  <option value="Pharmaceuticals & Healthcare">Pharmaceuticals & Healthcare</option>
                  <option value="Electrical & Appliances">Electrical & Appliances</option>
                  <option value="Dairy & Cold-Chain">Dairy & Cold-Chain</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Approved Credit Limit (₹)</label>
                <input
                  type="number"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 700 }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Payment Terms</label>
                <select
                  value={formData.creditTerms}
                  onChange={(e) => setFormData({ ...formData, creditTerms: e.target.value })}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="Net 30 Days">Net 30 Days</option>
                  <option value="Net 15 Days">Net 15 Days</option>
                  <option value="Net 45 Days">Net 45 Days</option>
                  <option value="Immediate">Immediate / Advance</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Key Account Manager (KAM)</label>
                <select
                  value={formData.accountManager}
                  onChange={(e) => setFormData({ ...formData, accountManager: e.target.value })}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12px' }}
                >
                  <option value="Vikramaditya Rao (Lead KAM)">Vikramaditya Rao (Lead KAM)</option>
                  <option value="Ananya Sen (Senior KAM)">Ananya Sen (Senior KAM)</option>
                  <option value="Deepak Mehrotra">Deepak Mehrotra</option>
                  <option value="Dr. Ritu Varma">Dr. Ritu Varma (Cold-Chain)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Primary Freight Corridors / Lanes</label>
              <input
                type="text"
                placeholder="e.g. Pune → Pantnagar, Mumbai → Delhi NCR"
                value={formData.primaryLanes}
                onChange={(e) => setFormData({ ...formData, primaryLanes: e.target.value })}
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px' }}
              />
            </div>
          </div>

          <div className="customer-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner spinner--sm" />
                  <span>Onboarding...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
