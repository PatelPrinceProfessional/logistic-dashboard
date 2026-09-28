export default function DockDetailModal({ dock, onClose }) {
  if (!dock) return null;

  return (
    <div className="fleet-modal-backdrop" onClick={onClose}>
      <div className="fleet-modal-dialog" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="fleet-modal-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>{dock.name}</h3>
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
              Status: <strong>{dock.status}</strong> • {dock.slotsBooked}
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="fleet-card-box">
            <div className="fleet-card-box-title">Dock Bay Specifications & Material Handling Assets</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Weight Capacity:</span>
                <div style={{ fontWeight: 800, color: '#059669' }}>{dock.capacityKg?.toLocaleString()} kg</div>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Current Utilization:</span>
                <div style={{ fontWeight: 800, color: '#2563eb' }}>{dock.utilizationPct}%</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Assigned Material Handling Equipment:</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{dock.equipment}</div>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-secondary)' }}>Average Turnaround Dwell:</span>
                <div style={{ fontWeight: 700 }}>{dock.avgDwellMinutes} minutes</div>
              </div>
            </div>
          </div>

          {/* Today's Schedule on this Dock */}
          <div className="fleet-card-box">
            <div className="fleet-card-box-title">Today's Sequenced Appointments ({dock.appointments?.length || 0})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {dock.appointments?.map((apt, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'var(--color-bg-secondary)', borderRadius: '6px', fontSize: '11px' }}>
                  <div>
                    <strong>{apt.startTime} - {apt.endTime}</strong> • {apt.customer} ({apt.shipmentId})
                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: '10px' }}>Type: {apt.type}</div>
                  </div>
                  <span className="fleet-status-pill active" style={{ fontSize: '10px' }}>{apt.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
