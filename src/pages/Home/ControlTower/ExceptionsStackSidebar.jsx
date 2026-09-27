import { AlertTriangle, ShieldAlert, ArrowRight, UserCheck, AlertOctagon } from 'lucide-react';

export default function ExceptionsStackSidebar({ exceptions, onSelectException }) {
  return (
    <div className="ct-panel">
      <div className="ct-panel__header" style={{ background: '#FFF5F5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-error)' }}>
          <ShieldAlert size={16} />
          <span>Active Exceptions Stack</span>
        </div>
        <span className="badge badge--danger" style={{ fontSize: 11 }}>
          {exceptions.length} Active
        </span>
      </div>

      <div className="ct-panel__body">
        {exceptions.map((ex) => (
          <div
            key={ex.id}
            className={`ct-exception-card ct-exception-card--${ex.severity}`}
            onClick={() => onSelectException(ex)}
          >
            <div className="ct-exception-card__header">
              <span style={{
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4,
                color: ex.severity === 'critical' ? 'var(--color-error)' : ex.severity === 'high' ? 'var(--color-warning)' : 'var(--color-pending)'
              }}>
                {ex.severity} • {ex.type}
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>{ex.timestamp}</span>
            </div>

            <div className="ct-exception-card__title">{ex.title}</div>
            <div className="ct-exception-card__desc">{ex.description}</div>

            <div className="ct-exception-card__footer">
              <span>📍 {ex.location}</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary-blue)' }}>
                Inspect <ArrowRight size={11} style={{ verticalAlign: 'middle' }} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
