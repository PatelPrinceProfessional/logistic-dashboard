import { useState } from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, Info, ChevronRight, User } from 'lucide-react';

export default function AlertsTable({
  alerts,
  selectedAlert,
  onSelectAlert,
  onBulkAssign,
  onBulkResolve,
  onBulkEscalate,
  onExportCSV,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === alerts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(alerts.map((a) => a.id));
    }
  };

  const toggleSelectRow = (id, e) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBatchAction = (actionFn) => {
    if (actionFn) actionFn(selectedIds);
    setSelectedIds([]);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="badge badge--danger" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><ShieldAlert size={12} /> Critical</span>;
      case 'high':
        return <span className="badge badge--warning" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><AlertTriangle size={12} /> High</span>;
      case 'medium':
        return <span className="badge badge--pending" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><AlertCircle size={12} /> Medium</span>;
      default:
        return <span className="badge badge--info" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Info size={12} /> Low</span>;
    }
  };

  return (
    <div className="ac-table-container">
      {/* Batch Header Bar when rows selected */}
      {selectedIds.length > 0 && (
        <div style={{
          background: '#0066CC15', borderBottom: '1px solid #0066CC30', padding: '10px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, flexWrap: 'wrap', gap: 8,
        }}>
          <div>
            <strong>{selectedIds.length} Alerts Selected</strong>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              className="btn btn--secondary btn--xs"
              onClick={() => handleBatchAction(onBulkAssign)}
            >
              Bulk Assign to Me
            </button>
            <button
              className="btn btn--primary btn--xs"
              onClick={() => handleBatchAction(onBulkResolve)}
            >
              Bulk Mark Resolved
            </button>
            <button
              className="btn btn--secondary btn--xs"
              style={{ color: '#e11d48', borderColor: '#fecdd3' }}
              onClick={() => handleBatchAction(onBulkEscalate)}
            >
              Bulk Escalate
            </button>
            <button
              className="btn btn--ghost btn--xs"
              onClick={() => handleBatchAction(onExportCSV)}
            >
              Export CSV
            </button>
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="table" aria-label="Incident Alerts List">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input
                  type="checkbox"
                  checked={alerts.length > 0 && selectedIds.length === alerts.length}
                  onChange={toggleSelectAll}
                  aria-label="Select All Alerts"
                />
              </th>
              <th>Alert ID &amp; Severity</th>
              <th>Incident Type &amp; Title</th>
              <th>Linked Entity</th>
              <th>Assigned Owner</th>
              <th>Reported</th>
              <th>Status</th>
              <th>Inspect</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: 32, color: 'var(--color-secondary-gray)' }}>
                  No operational alerts match the selected criteria.
                </td>
              </tr>
            ) : (
              alerts.map((a) => {
                const isSelected = selectedAlert?.id === a.id;
                return (
                  <tr
                    key={a.id}
                    className={`ac-row--${a.severity}${isSelected ? ' table-row--selected' : ''}`}
                    onClick={() => onSelectAlert(a)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(a.id)}
                        onChange={(e) => toggleSelectRow(a.id, e)}
                        aria-label={`Select alert ${a.id}`}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{a.id}</div>
                      <div style={{ marginTop: 2 }}>{getSeverityBadge(a.severity)}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{a.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)', marginTop: 2 }}>
                        {a.description.substring(0, 65)}...
                      </div>
                    </td>
                    <td>
                      <span className="badge badge--info" style={{ fontFamily: 'monospace', fontSize: 11 }}>
                        {a.entityType}: {a.entityId}
                      </span>
                    </td>
                    <td>
                      {a.assignee ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                          <span style={{
                            width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary-blue)',
                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700
                          }}>
                            {a.assignee.avatar}
                          </span>
                          <span>{a.assignee.name}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--color-error)', fontWeight: 600 }}>
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>{a.timestamp}</td>
                    <td>
                      <span className={`badge badge--${a.status === 'Resolved' ? 'success' : a.status === 'Unassigned' ? 'danger' : 'warning'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn--secondary btn--xs">
                        Inspect <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

