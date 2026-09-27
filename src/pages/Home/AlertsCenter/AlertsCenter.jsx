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
  };

  const handleUpdateStatus = (targetAlert, newStatus) => {
    const updated = alerts.map((a) => (a.id === targetAlert.id ? { ...a, status: newStatus } : a));
    setAlerts(updated);
    if (selectedAlert?.id === targetAlert.id) {
      setSelectedAlert({ ...selectedAlert, status: newStatus });
    }
  };

  const handleAssignToMe = (targetAlert) => {
    const updated = alerts.map((a) =>
      a.id === targetAlert.id ? { ...a, assignee: { name: 'CurrentUser (You)', avatar: 'YO' }, status: 'Investigating' } : a
    );
    setAlerts(updated);
    if (selectedAlert?.id === targetAlert.id) {
      setSelectedAlert({ ...selectedAlert, assignee: { name: 'CurrentUser (You)', avatar: 'YO' }, status: 'Investigating' });
    }
  };

  return (
    <Layout
      title="Alerts Center"
      breadcrumbs={[{ label: 'Alerts Center', path: '/alerts-center' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <button className="btn btn--secondary btn--sm">
            <RefreshCw size={14} /> Refresh Triage
          </button>
        </div>
      }
    >
      {/* ── Top Metrics Strip ── */}
      <div className="ac-metrics-strip" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="ac-metric-box">
          <div className="ac-metric-box__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val">{alertsMetrics.totalAlerts}</div>
            <div className="ac-metric-box__lbl">Total Incidents</div>
          </div>
        </div>

        <div className="ac-metric-box">
          <div className="ac-metric-box__icon" style={{ background: '#E74C3C20', color: '#E74C3C' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#E74C3C' }}>{alertsMetrics.criticalCount}</div>
            <div className="ac-metric-box__lbl">Critical Breaches</div>
          </div>
        </div>

        <div className="ac-metric-box">
          <div className="ac-metric-box__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#FF9800' }}>{alertsMetrics.highCount}</div>
            <div className="ac-metric-box__lbl">High Priority</div>
          </div>
        </div>

        <div className="ac-metric-box">
          <div className="ac-metric-box__icon" style={{ background: '#DC354520', color: '#DC3545' }}>
            <UserX size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#DC3545' }}>{alertsMetrics.unassignedCount}</div>
            <div className="ac-metric-box__lbl">Unassigned Queue</div>
          </div>
        </div>

        <div className="ac-metric-box">
          <div className="ac-metric-box__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="ac-metric-box__val" style={{ color: '#27AE60' }}>{alertsMetrics.resolvedToday}</div>
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
        />

        <AlertDetailDrawer
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onUpdateStatus={handleUpdateStatus}
          onAssignToMe={handleAssignToMe}
        />
      </div>
    </Layout>
  );
}
