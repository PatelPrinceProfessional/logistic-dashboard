export default function AppointmentDetailModal({ appointment, onClose, onCheckIn, onComplete, onOpenReschedule }) {
  if (!appointment) return null;

  return (
    <div className="fleet-modal-backdrop" onClick={onClose}>
      <div className="fleet-modal-dialog" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fleet-modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Appointment {appointment.id}</h3>
              <span className={`fleet-status-pill ${appointment.status.toLowerCase().includes('complete') ? 'active' : appointment.status.toLowerCase().includes('progress') ? 'maintenance' : 'available'}`}>
                {appointment.status}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Shipment: <strong>{appointment.shipmentId}</strong> • Slot: <strong>{appointment.timeSlot || appointment.time}</strong>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          {/* Customer & Cargo Specs */}
          <div className="fleet-card-box">
            <div className="fleet-card-box-title">Consignee & Cargo Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Customer / Consignee:</span>
                <div style={{ fontWeight: 700 }}>{appointment.customer}</div>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Contact Phone:</span>
                <div><a href={`tel:${appointment.contactPhone}`} style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>{appointment.contactPhone || '+91 98201 11204'}</a></div>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Appointment Type:</span>
                <div style={{ fontWeight: 700, color: appointment.type === 'Pickup' ? '#2563eb' : appointment.type === 'Delivery' ? '#059669' : '#d97706' }}>
                  {appointment.type}
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Assigned Dock / Bay:</span>
                <div style={{ fontWeight: 700 }}>{appointment.dockAssigned || appointment.dock || 'Dock 1'}</div>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Vehicle & Driver:</span>
                <div style={{ fontWeight: 700 }}>{appointment.vehicleReg || 'MH-04-AB-1234'} ({appointment.driverName || 'Rajesh Sharma'})</div>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Cargo Weight & Volume:</span>
                <div style={{ fontWeight: 700 }}>{appointment.weightKg?.toLocaleString() || '4,500'} kg • {appointment.volumeCbm || '16.5'} CBM</div>
              </div>
            </div>
          </div>

          {/* Dwell & Status Timeline */}
          <div className="fleet-card-box">
            <div className="fleet-card-box-title">Check-in & Dwell Timeline</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--color-bg-secondary)', borderRadius: '6px' }}>
                <span>Scheduled Appointment Window:</span>
                <strong>{appointment.date || 'Today'} ({appointment.timeSlot || appointment.time})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--color-bg-secondary)', borderRadius: '6px' }}>
                <span>Gate Check-In & Security Weighbridge:</span>
                <strong style={{ color: '#059669' }}>{appointment.arrivedAt || '07:50 IST (On-Time)'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--color-bg-secondary)', borderRadius: '6px' }}>
                <span>Turnaround Dwell Duration:</span>
                <strong>{appointment.dwellMinutes || 45} minutes</strong>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '6px' }}>
            {appointment.status !== 'Completed' && (
              <>
                <button className="btn btn-secondary btn-sm" onClick={() => onOpenReschedule(appointment)}>
                  📅 Reschedule
                </button>
                {appointment.status !== 'In Progress' && (
                  <button className="btn btn-primary btn-sm" onClick={() => onCheckIn(appointment.id)}>
                    ✓ Check-In at Dock
                  </button>
                )}
                <button className="btn btn-primary btn-sm" style={{ background: '#059669', borderColor: '#047857' }} onClick={() => onComplete(appointment.id)}>
                  ✓ Complete & Depart
                </button>
              </>
            )}
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
