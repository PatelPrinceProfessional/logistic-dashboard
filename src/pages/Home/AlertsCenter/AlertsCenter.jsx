import { useState } from 'react';
import Layout from '../../../components/Common/Layout/Layout';
import AlertFilterBar from './AlertFilterBar';
import AlertsTable from './AlertsTable';
import AlertDetailDrawer from './AlertDetailDrawer';
import { alertsMetrics, alertsList as initialAlerts } from '../../../utils/mockData/alertsCenterData';
import { ShieldAlert, AlertTriangle, UserX, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import './AlertsCenter.css';

export default function AlertsCenter() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(initialAlerts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter alerts based on user selections
  const filteredAlerts = alerts.filter((a) => {
    const matchesSearch =
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.entityId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.assignee && a.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSeverity = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || a.type === typeFilter;

    return matchesSearch && matchesSeverity && matchesStatus && matchesType;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSeverityFilter('ALL');
    setStatusFilter('ALL');
    setTypeFilter('ALL');
    showToast('Filters reset to show all operational alerts.');
  };

  const handleUpdateStatus = (targetAlert, newStatus) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newHistoryItem = {
      time: timeStr,
      user: 'CurrentUser (You)',
      action: `Status updated to ${newStatus}`,
    };

    const updated = alerts.map((a) =>
      a.id === targetAlert.id
        ? {
            ...a,
            status: newStatus,
            historyLog: [newHistoryItem, ...(a.historyLog || [])],
          }
        : a
    );
    setAlerts(updated);
    if (selectedAlert?.id === targetAlert.id) {
      setSelectedAlert({
        ...selectedAlert,
        status: newStatus,
        historyLog: [newHistoryItem, ...(selectedAlert.historyLog || [])],
      });
    }
    showToast(`✓ Alert ${targetAlert.id} status updated to '${newStatus}'!`);
  };

  const handleAssignToMe = (targetAlert) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newHistoryItem = {
      time: timeStr,
      user: 'CurrentUser (You)',
      action: 'Assigned incident to self & began investigation',
    };

    const updated = alerts.map((a) =>
      a.id === targetAlert.id
        ? {
            ...a,
            assignee: { name: 'CurrentUser (You)', avatar: 'YO' },
            status: 'Investigating',
            historyLog: [newHistoryItem, ...(a.historyLog || [])],
          }
        : a
    );
    setAlerts(updated);
    if (selectedAlert?.id === targetAlert.id) {
      setSelectedAlert({
        ...selectedAlert,
        assignee: { name: 'CurrentUser (You)', avatar: 'YO' },
        status: 'Investigating',
        historyLog: [newHistoryItem, ...(selectedAlert.historyLog || [])],
      });
    }
    showToast(`👤 Assigned ${targetAlert.id} to CurrentUser (You).`);
  };

  const handleAddNote = (targetAlert, noteText) => {
    if (!noteText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newHistoryItem = {
      time: timeStr,
      user: 'CurrentUser (You)',
      action: `Investigation Note: "${noteText}"`,
    };

    const updated = alerts.map((a) =>
      a.id === targetAlert.id
        ? {
            ...a,
            historyLog: [newHistoryItem, ...(a.historyLog || [])],
          }
        : a
    );
    setAlerts(updated);
    if (selectedAlert?.id === targetAlert.id) {
      setSelectedAlert({
        ...selectedAlert,
        historyLog: [newHistoryItem, ...(selectedAlert.historyLog || [])],
      });
    }
    showToast(`📝 Investigation note appended to ${targetAlert.id}.`);
  };

  const handleTriggerMitigation = (targetAlert, mitigationLabel) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newHistoryItem = {
      time: timeStr,
      user: 'CurrentUser (You)',
      action: `Executed mitigation protocol: ${mitigationLabel}`,
    };

    const updated = alerts.map((a) =>
      a.id === targetAlert.id
        ? {
            ...a,
            status: 'Resolved',
            historyLog: [newHistoryItem, ...(a.historyLog || [])],
          }
        : a
    );
    setAlerts(updated);
    if (selectedAlert?.id === targetAlert.id) {
      setSelectedAlert({
        ...selectedAlert,
        status: 'Resolved',
        historyLog: [newHistoryItem, ...(selectedAlert.historyLog || [])],
      });
    }
    showToast(`⚡ ${mitigationLabel} dispatched! ${targetAlert.id} marked as Resolved.`);
  };

  // Bulk Handlers
  const handleBulkAssign = (selectedIds) => {
    const updated = alerts.map((a) =>
      selectedIds.includes(a.id)
        ? { ...a, assignee: { name: 'CurrentUser (You)', avatar: 'YO' }, status: 'Investigating' }
        : a
    );
    setAlerts(updated);
    showToast(`👤 Successfully assigned ${selectedIds.length} incidents to you.`);
  };

  const handleBulkResolve = (selectedIds) => {
    const updated = alerts.map((a) =>
      selectedIds.includes(a.id) ? { ...a, status: 'Resolved' } : a
    );
    setAlerts(updated);
    showToast(`✓ Marked ${selectedIds.length} incidents as Resolved.`);
  };

  const handleBulkEscalate = (selectedIds) => {
    const updated = alerts.map((a) =>
      selectedIds.includes(a.id) ? { ...a, status: 'Action Required', severity: 'critical' } : a
    );
    setAlerts(updated);
    showToast(`⚠️ Escalated ${selectedIds.length} incidents to Operations Leadership.`);
  };

  const handleExportCSV = (selectedIds) => {
    showToast(`📥 Exported ${selectedIds.length > 0 ? selectedIds.length : alerts.length} incident records to CSV format.`);
  };

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const highCount = alerts.filter((a) => a.severity === 'high').length;
  const unassignedCount = alerts.filter((a) => !a.assignee || a.status === 'Unassigned').length;
  const resolvedCount = alerts.filter((a) => a.status === 'Resolved').length;

  return (
    <Layout
      title="Alerts Center"
      breadcrumbs={[{ label: 'Alerts Center', path: '/alerts-center' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <button
            className="btn btn--secondary btn--sm"
            onClick={() => showToast('🛰️ Triage queue re-synchronized with live IoT telemetry stream.')}
          >
            <RefreshCw size={14} /> Refresh Triage
          </button>
        </div>
      }
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 10000,
            background: '#0f172a',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          <span>🔔</span> {toastMessage}
        </div>
      )}

      {/* ── Top Metrics Strip ── */}
      <div className="ac-metrics-strip" style={{ marginBottom: 'var(--space-md)' }}>
        <div
          className="ac-metric-box"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSeverityFilter('ALL');
            setStatusFilter('ALL');
          }}
        >
          <div className="ac-metric-box__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val">{alerts.length}</div>
            <div className="ac-metric-box__lbl">Total Incidents</div>
          </div>
        </div>

        <div
          className="ac-metric-box"
          style={{ cursor: 'pointer' }}
          onClick={() => setSeverityFilter('critical')}
        >
          <div className="ac-metric-box__icon" style={{ background: '#E74C3C20', color: '#E74C3C' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#E74C3C' }}>{criticalCount}</div>
            <div className="ac-metric-box__lbl">Critical Breaches</div>
          </div>
        </div>

        <div
          className="ac-metric-box"
          style={{ cursor: 'pointer' }}
          onClick={() => setSeverityFilter('high')}
        >
          <div className="ac-metric-box__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#FF9800' }}>{highCount}</div>
            <div className="ac-metric-box__lbl">High Priority</div>
          </div>
        </div>

        <div
          className="ac-metric-box"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('Unassigned')}
        >
          <div className="ac-metric-box__icon" style={{ background: '#DC354520', color: '#DC3545' }}>
            <UserX size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#DC3545' }}>{unassignedCount}</div>
            <div className="ac-metric-box__lbl">Unassigned Queue</div>
          </div>
        </div>

        <div
          className="ac-metric-box"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('Resolved')}
        >
          <div className="ac-metric-box__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#27AE60' }}>{resolvedCount}</div>
            <div className="ac-metric-box__lbl">Resolved Today</div>
          </div>
        </div>

        <div className="ac-metric-box">
          <div className="ac-metric-box__icon" style={{ background: '#17A2B820', color: '#17A2B8' }}>
            <Clock size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val">{alertsMetrics.avgMTTR}</div>
            <div className="ac-metric-box__lbl">Avg MTTR (Resolve)</div>
          </div>
        </div>
      </div>

      {/* ── Multi-Filter Controls ── */}
      <AlertFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        severityFilter={severityFilter}
        onSeverityFilterChange={setSeverityFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onResetFilters={handleResetFilters}
      />

      {/* ── Main Triage Data Table & Slide-Out Workspace ── */}
      <div className="ac-workspace" style={{ marginTop: 'var(--space-md)' }}>
        <AlertsTable
          alerts={filteredAlerts}
          selectedAlert={selectedAlert}
          onSelectAlert={setSelectedAlert}
          onBulkAssign={handleBulkAssign}
          onBulkResolve={handleBulkResolve}
          onBulkEscalate={handleBulkEscalate}
          onExportCSV={handleExportCSV}
        />

        <AlertDetailDrawer
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onUpdateStatus={handleUpdateStatus}
          onAssignToMe={handleAssignToMe}
          onAddNote={handleAddNote}
          onTriggerMitigation={handleTriggerMitigation}
        />
      </div>
    </Layout>
  );
}

