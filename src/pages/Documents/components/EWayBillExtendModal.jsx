import React, { useState } from 'react';
import { X, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import '../Documents.css';

export default function EWayBillExtendModal({ ewb, onClose, onExtend }) {
  const [extensionHours, setExtensionHours] = useState('24');
  const [currentLocation, setCurrentLocation] = useState('Jaipur Highway Toll Plaza');
  const [fromState, setFromState] = useState('Rajasthan (08)');
  const [reasonCode, setReasonCode] = useState('1'); // 1: Natural Calamity, 2: Law & Order, 3: Transshipment Delay, 4: Accident, 99: Others
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ewb) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onExtend(ewb.id, {
        additionalHours: parseInt(extensionHours, 10),
        reason: reasonCode === '1' ? 'Natural Calamity' : reasonCode === '3' ? 'Transshipment Delay' : remarks || 'Transit Bottleneck',
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content" style={{ maxWidth: '600px' }}>
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <Clock size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Extend E-Way Bill Validity</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                EWB #{ewb.ewbNumber} • Remaining Time: {ewb.remainingHours} hours
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="doc-modal-body">
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <AlertTriangle size={20} style={{ color: '#dc2626' }} />
              <div style={{ fontSize: '12px', color: '#991b1b' }}>
                GST Rule 138(10): Validity can be extended within <strong>8 hours prior to</strong> or <strong>8 hours after</strong> expiry time.
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Validity Extension Duration
              </label>
              <select
                value={extensionHours}
                onChange={(e) => setExtensionHours(e.target.value)}
                className="filter-dropdown"
                style={{ width: '100%', padding: '8px 12px' }}
              >
                <option value="24">+24 Hours Extension (Calculated for remaining ~350 km)</option>
                <option value="48">+48 Hours Extension (Calculated for remaining ~700 km)</option>
                <option value="72">+72 Hours Extension (Inter-State Long Haul)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Current In-Transit Location
                </label>
                <input
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Current State
                </label>
                <select
                  value={fromState}
                  onChange={(e) => setFromState(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '8px 12px' }}
                >
                  <option value="Rajasthan">08 - Rajasthan</option>
                  <option value="Maharashtra">27 - Maharashtra</option>
                  <option value="Delhi">07 - Delhi</option>
                  <option value="Gujarat">24 - Gujarat</option>
                  <option value="Karnataka">29 - Karnataka</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                NIC Reason for Extension
              </label>
              <select
                value={reasonCode}
                onChange={(e) => setReasonCode(e.target.value)}
                className="filter-dropdown"
                style={{ width: '100%', padding: '8px 12px' }}
              >
                <option value="1">1 - Natural Calamity / Adverse Weather</option>
                <option value="2">2 - Law and Order Condition</option>
                <option value="3">3 - Transshipment / Hub Handling Delay</option>
                <option value="4">4 - Accident / Mechanical Delay</option>
                <option value="99">99 - Others (Traffic Jam / Route Diversion)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Explanation / Justification
              </label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Highway congestion due to toll server outage; delayed by 5 hours"
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
              />
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
                  <span>Extending on NIC Portal...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Confirm Validity Extension</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
