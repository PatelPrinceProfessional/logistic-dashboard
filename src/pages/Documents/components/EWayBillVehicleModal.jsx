import React, { useState } from 'react';
import { X, Truck, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import '../Documents.css';

export default function EWayBillVehicleModal({ ewb, onClose, onUpdateVehicle }) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [fromPlace, setFromPlace] = useState('');
  const [fromState, setFromState] = useState('Maharashtra (27)');
  const [reasonCode, setReasonCode] = useState('1'); // 1: Due to Break Down, 2: Due to Transshipment, 3: Others
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ewb) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleNumber) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onUpdateVehicle(ewb.id, {
        vehicleNumber: vehicleNumber.toUpperCase(),
        reason: reasonCode === '1' ? 'Due to Breakdown' : reasonCode === '2' ? 'Transshipment Hub' : remarks || 'Operational Fleet Swap',
        time: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST',
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content" style={{ maxWidth: '600px' }}>
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Truck size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Update Part-B Vehicle Details</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                E-Way Bill #{ewb.ewbNumber} • Current Vehicle: {ewb.vehicleNumber}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="doc-modal-body">
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <AlertTriangle size={20} style={{ color: '#d97706' }} />
              <div style={{ fontSize: '12px', color: '#92400e' }}>
                Updating Part-B is required when changing linehaul trucks, during transshipment, or handling on-road breakdown.
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                New Vehicle Registration Number
              </label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                placeholder="e.g. DL-01-GH-5091 or MH-12-RN-8801"
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Current Location / Place
                </label>
                <input
                  type="text"
                  value={fromPlace}
                  onChange={(e) => setFromPlace(e.target.value)}
                  placeholder="e.g. Nashik Highway Toll"
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  State Code
                </label>
                <select
                  value={fromState}
                  onChange={(e) => setFromState(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '8px 12px' }}
                >
                  <option value="27">27 - Maharashtra</option>
                  <option value="07">07 - Delhi</option>
                  <option value="24">24 - Gujarat</option>
                  <option value="29">29 - Karnataka</option>
                  <option value="33">33 - Tamil Nadu</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Reason for Change (NIC Reason Code)
              </label>
              <select
                value={reasonCode}
                onChange={(e) => setReasonCode(e.target.value)}
                className="filter-dropdown"
                style={{ width: '100%', padding: '8px 12px' }}
              >
                <option value="1">1 - Due to Vehicle Breakdown</option>
                <option value="2">2 - Due to Transshipment Hub Transfer</option>
                <option value="3">3 - Others / Fleet Optimization</option>
                <option value="4">4 - First Time Vehicle Updation</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Remarks / Transshipment Note
              </label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Mechanical alternator issue; freight safely shifted to reserve truck"
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
                  <span>Updating NIC Part-B...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Submit Part-B Update</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
