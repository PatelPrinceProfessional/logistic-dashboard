import { useState } from 'react';

export default function AppointmentRescheduleModal({ appointment, onClose, onConfirmReschedule }) {
  const [newSlot, setNewSlot] = useState('14:00 - 14:45');
  const [newDock, setNewDock] = useState('Dock 1');
  const [reason, setReason] = useState('Driver Highway Traffic Delay');
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  if (!appointment) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirmReschedule(appointment.id, newSlot, newDock, reason, notifyCustomer);
    onClose();
  };

  return (
    <div className="fleet-modal-backdrop" onClick={onClose}>
      <div className="fleet-modal-dialog" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="fleet-modal-header">
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>📅 Reschedule Appointment {appointment.id}</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleConfirm} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: 'var(--color-bg-secondary)', padding: '10px 12px', borderRadius: '8px', fontSize: '12px' }}>
            <div>Original Window: <strong>{appointment.timeSlot || appointment.time}</strong></div>
            <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Customer: {appointment.customer} • Shipment: {appointment.shipmentId}</div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Select Available New Time Slot:
            </label>
            <select
              className="fleet-search-input"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
            >
              <option value="11:30 - 12:15">11:30 - 12:15 IST (Available)</option>
              <option value="14:00 - 14:45">14:00 - 14:45 IST (Optimal)</option>
              <option value="16:00 - 16:45">16:00 - 16:45 IST (Available)</option>
              <option value="18:30 - 19:15">18:30 - 19:15 IST (Available)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Assigned Dock Bay:
            </label>
            <select
              className="fleet-search-input"
              value={newDock}
              onChange={(e) => setNewDock(e.target.value)}
            >
              <option value="Dock 1">Dock 1 (Pallet Bay)</option>
              <option value="Dock 2">Dock 2 (Heavy Bay)</option>
              <option value="Dock 3">Dock 3 (Cross-Dock)</option>
              <option value="Dock 4">Dock 4 (Container Bay)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Reason for Reschedule:
            </label>
            <select
              className="fleet-search-input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="Driver Highway Traffic Delay">Driver Highway Traffic Delay (+30m)</option>
              <option value="Dock Congestion / Unloading Spillover">Dock Congestion / Unloading Spillover</option>
              <option value="Customer Shipment Staging Delay">Customer Shipment Staging Delay</option>
              <option value="Vehicle Mechanical Inspection">Vehicle Mechanical Inspection</option>
            </select>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', marginTop: '4px' }}>
            <input
              type="checkbox"
              checked={notifyCustomer}
              onChange={(e) => setNotifyCustomer(e.target.checked)}
            />
            <span>Send automated SMS / Email notification to consignee & carrier</span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              ✓ Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
