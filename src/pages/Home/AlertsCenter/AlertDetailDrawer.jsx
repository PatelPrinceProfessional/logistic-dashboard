import { X, CheckCircle, UserPlus, AlertOctagon, History, ExternalLink } from 'lucide-react';

export default function AlertDetailDrawer({ alert, onClose, onUpdateStatus, onAssignToMe }) {
  if (!alert) return null;

  return (
    <div className="ac-drawer">
      {/* Header */}
      <div className="ac-drawer__header">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary-gray)' }}>
            Incident Resolution Drawer
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
            {alert.id} — {alert.type}
          </div>
        </div>
        <button className="btn btn--ghost btn--xs" onClick={onClose} title="Close Drawer">
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="ac-drawer__body">
        {/* Severity Banner */}
        <div className="ac-drawer__section">
          <div style={{
            padding: 12, borderRadius: 6,
            background: alert.severity === 'critical' ? '#FFF5F5' : alert.severity === 'high' ? '#FFFDF5' : '#F8F9FA',
            border: `1px solid ${alert.severity === 'critical' ? 'rgba(220,53,69,0.3)' : 'var(--color-medium-gray)'}`
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: alert.severity === 'critical' ? 'var(--color-error)' : 'var(--color-dark-gray-text)' }}>
              {alert.title}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 4 }}>
              {alert.description}
            </div>
          </div>
        </div>

        {/* Root Cause Analysis */}
        <div className="ac-drawer__section">
          <div className="ac-drawer__title">Root Cause Telemetry</div>
          <div style={{ fontSize: 13, background: '#F8F9FA', padding: 10, borderRadius: 6, border: '1px solid var(--color-medium-gray)' }}>
            ⚠️ <strong>Diagnosed Cause:</strong> {alert.rootCause || 'Under investigation by telemetry agent.'}
          </div>
        </div>

        {/* Linked Entity Details */}
        <div className="ac-drawer__section">
          <div className="ac-drawer__title">Linked Logistics Entity</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
            <div style={{ background: '#F8F9FA', padding: 8, borderRadius: 4 }}>
              <span style={{ color: 'var(--color-secondary-gray)' }}>Type:</span> <strong>{alert.entityType}</strong>
            </div>
            <div style={{ background: '#F8F9FA', padding: 8, borderRadius: 4 }}>
              <span style={{ color: 'var(--color-secondary-gray)' }}>ID:</span> <strong style={{ color: 'var(--color-primary-blue)' }}>{alert.entityId}</strong>
            </div>
            <div style={{ background: '#F8F9FA', padding: 8, borderRadius: 4 }}>
              <span style={{ color: 'var(--color-secondary-gray)' }}>Driver:</span> <strong>{alert.driverName || 'N/A'}</strong>
            </div>
            <div style={{ background: '#F8F9FA', padding: 8, borderRadius: 4 }}>
              <span style={{ color: 'var(--color-secondary-gray)' }}>Vehicle:</span> <strong>{alert.vehicleId || 'N/A'}</strong>
            </div>
          </div>
        </div>

        {/* Location & Time */}
        <div className="ac-drawer__section">
          <div className="ac-drawer__title">Location & Timeline Snapshot</div>
          <div style={{ fontSize: 12, color: 'var(--color-dark-gray-text)' }}>
            📍 <strong>Location:</strong> {alert.location}
            <br />
            🕒 <strong>Reported At:</strong> {alert.createdDate} ({alert.timestamp})
          </div>
        </div>

        {/* History Audit Log */}
        <div className="ac-drawer__section">
          <div className="ac-drawer__title" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <History size={12} /> Incident Audit History
          </div>
          <div className="ac-timeline">
            {alert.historyLog?.map((h, idx) => (
              <div key={idx} className="ac-timeline__item">
                <div style={{ fontWeight: 600, color: 'var(--color-dark-gray-text)' }}>{h.action}</div>
                <div style={{ color: 'var(--color-secondary-gray)', fontSize: 11 }}>{h.time} • By {h.user}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resolution Action Footer */}
      <div style={{ padding: 16, borderTop: '1px solid var(--color-medium-gray)', background: '#F8F9FA', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {!alert.assignee && (
            <button className="btn btn--secondary btn--sm" style={{ flex: 1 }} onClick={() => onAssignToMe(alert)}>
              <UserPlus size={14} /> Assign to Me
            </button>
          )}
          <button className="btn btn--primary btn--sm" style={{ flex: 1 }} onClick={() => onUpdateStatus(alert, 'Resolved')}>
            <CheckCircle size={14} /> Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
