import { Search, Filter, RefreshCw, Download } from 'lucide-react';

export default function AlertFilterBar({
  searchQuery,
  onSearchChange,
  severityFilter,
  onSeverityFilterChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onResetFilters,
}) {
  return (
    <div className="ac-filter-bar">
      {/* Left: Search Bar & Severity Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
        <div style={{ position: 'relative', width: 260 }}>
          <input
            type="text"
            className="input-text"
            placeholder="Search alerts, entity ID or owner..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: 32, fontSize: 13 }}
          />
          <Search size={14} color="#9EA5B1" style={{ position: 'absolute', left: 10, top: 12 }} />
        </div>

        {/* Severity Pill Selector */}
        <div className="ac-filter-pills">
          {[
            { key: 'ALL', label: 'All Severities' },
            { key: 'critical', label: '🔴 Critical (14)' },
            { key: 'high', label: '🟠 High (42)' },
            { key: 'medium', label: '🟡 Medium (85)' },
            { key: 'low', label: '🔵 Low (126)' },
          ].map((pill) => (
            <button
              key={pill.key}
              className={`ac-pill-btn${severityFilter === pill.key ? ' ac-pill-btn--active' : ''}`}
              onClick={() => onSeverityFilterChange(pill.key)}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Status Dropdown & Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <select
          className="input-select"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          style={{ fontSize: 13, width: 150 }}
        >
          <option value="ALL">All Statuses</option>
          <option value="Unassigned">Unassigned</option>
          <option value="Investigating">Investigating</option>
          <option value="Action Required">Action Required</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          className="input-select"
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          style={{ fontSize: 13, width: 170 }}
        >
          <option value="ALL">All Incident Types</option>
          <option value="Temperature Breach">Temperature Breach</option>
          <option value="Vehicle Breakdown">Vehicle Breakdown</option>
          <option value="Delivery Delay">Delivery Delay</option>
          <option value="Geofence Exit Delay">Geofence Exit</option>
          <option value="Document Expiry">Document Expiry</option>
        </select>

        <button className="btn btn--secondary btn--sm" onClick={onResetFilters} title="Reset All Filters">
          Reset
        </button>
      </div>
    </div>
  );
}
