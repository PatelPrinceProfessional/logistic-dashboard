import { Search, Filter, Layers, RefreshCw } from 'lucide-react';

export default function TelemetryFilterSidebar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  layers,
  onToggleLayer,
  carrierFilter,
  onCarrierFilterChange,
}) {
  return (
    <div className="ct-panel">
      <div className="ct-panel__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Filter size={16} color="var(--color-primary-blue)" />
          <span>Filters & Map Layers</span>
        </div>
        <button
          className="btn btn--ghost btn--xs"
          onClick={() => {
            onSearchChange('');
            onStatusFilterChange({ onTime: true, atRisk: true, delayed: true });
          }}
          title="Reset Filters"
        >
          Reset
        </button>
      </div>

      <div className="ct-panel__body">
        {/* Search Field */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="input-text"
            placeholder="Search vehicle, driver or route..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: 32, fontSize: 13 }}
          />
          <Search size={14} color="#9EA5B1" style={{ position: 'absolute', left: 10, top: 12 }} />
        </div>

        {/* Status Checkboxes */}
        <div className="ct-filter-group">
          <div className="ct-filter-group__title">Vehicle Status</div>
          <label className="ct-checkbox-label">
            <input
              type="checkbox"
              checked={statusFilter.onTime}
              onChange={(e) => onStatusFilterChange({ ...statusFilter, onTime: e.target.checked })}
            />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }} />
            On-Time Vehicles (189)
          </label>
          <label className="ct-checkbox-label">
            <input
              type="checkbox"
              checked={statusFilter.atRisk}
              onChange={(e) => onStatusFilterChange({ ...statusFilter, atRisk: e.target.checked })}
            />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-warning)' }} />
            At-Risk Vehicles (34)
          </label>
          <label className="ct-checkbox-label">
            <input
              type="checkbox"
              checked={statusFilter.delayed}
              onChange={(e) => onStatusFilterChange({ ...statusFilter, delayed: e.target.checked })}
            />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-error)' }} />
            Delayed / Exception (22)
          </label>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-medium-gray)', margin: '4px 0' }} />

        {/* GIS Map Layers */}
        <div className="ct-filter-group">
          <div className="ct-filter-group__title" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Layers size={12} /> Map Canvas Layers
          </div>
          <div className="ct-toggle-row">
            <span>Show Vehicles Pins</span>
            <input
              type="checkbox"
              checked={layers.vehicles}
              onChange={() => onToggleLayer('vehicles')}
            />
          </div>
          <div className="ct-toggle-row">
            <span>Show Geofence Hubs</span>
            <input
              type="checkbox"
              checked={layers.geofences}
              onChange={() => onToggleLayer('geofences')}
            />
          </div>
          <div className="ct-toggle-row">
            <span>Traffic Overlay</span>
            <input
              type="checkbox"
              checked={layers.traffic}
              onChange={() => onToggleLayer('traffic')}
            />
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-medium-gray)', margin: '4px 0' }} />

        {/* Carrier Select Filter */}
        <div className="ct-filter-group">
          <div className="ct-filter-group__title">Logistics Carrier</div>
          <select
            className="input-select"
            value={carrierFilter}
            onChange={(e) => onCarrierFilterChange(e.target.value)}
            style={{ fontSize: 13 }}
          >
            <option value="ALL">All Logistics Carriers</option>
            <option value="Express Logistics">Express Logistics</option>
            <option value="BlueDart Logistics">BlueDart Logistics</option>
            <option value="Spot Carrier Services">Spot Carrier Services</option>
            <option value="QuickTrans India">QuickTrans India</option>
          </select>
        </div>
      </div>
    </div>
  );
}
