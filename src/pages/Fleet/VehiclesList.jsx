import { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import { fleetSummaryStats, fleetVehiclesList as initialVehicles } from '../../utils/mockData/fleetData';
import VehicleDetailModal from './components/VehicleDetailModal';
import VehicleCreateModal from './components/VehicleCreateModal';
import './Fleet.css';

export default function VehiclesList() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [ownershipFilter, setOwnershipFilter] = useState('ALL');
  const [selectedVehicleIds, setSelectedVehicleIds] = useState([]);
  const [inspectingVehicle, setInspectingVehicle] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered vehicle list
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Search
      const matchesSearch =
        v.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.assignedDriver && v.assignedDriver.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      let matchesStatus = true;
      if (statusFilter !== 'ALL') {
        matchesStatus = v.status.toUpperCase() === statusFilter.toUpperCase();
      }

      // Type filter
      let matchesType = true;
      if (typeFilter !== 'ALL') {
        matchesType = v.category.toUpperCase() === typeFilter.toUpperCase();
      }

      // Ownership filter
      let matchesOwnership = true;
      if (ownershipFilter !== 'ALL') {
        matchesOwnership = v.ownership.toUpperCase() === ownershipFilter.toUpperCase();
      }

      return matchesSearch && matchesStatus && matchesType && matchesOwnership;
    });
  }, [vehicles, searchQuery, statusFilter, typeFilter, ownershipFilter]);

  // Bulk Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedVehicleIds(filteredVehicles.map((v) => v.id));
    } else {
      setSelectedVehicleIds([]);
    }
  };

  const handleToggleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedVehicleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkStatus = (newStatus) => {
    setVehicles((prev) =>
      prev.map((v) =>
        selectedVehicleIds.includes(v.id) ? { ...v, status: newStatus } : v
      )
    );
    showToast(`Updated ${selectedVehicleIds.length} vehicles to "${newStatus}"`);
    setSelectedVehicleIds([]);
  };

  const handleBulkMaintenance = () => {
    setVehicles((prev) =>
      prev.map((v) =>
        selectedVehicleIds.includes(v.id) ? { ...v, status: 'Under Maintenance' } : v
      )
    );
    showToast(`Scheduled maintenance bays for ${selectedVehicleIds.length} vehicles.`);
    setSelectedVehicleIds([]);
  };

  const handleBulkExport = () => {
    showToast(`Exported ${selectedVehicleIds.length || filteredVehicles.length} vehicle manifests to CSV.`);
  };

  // Update single vehicle
  const handleUpdateVehicle = (updated) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === updated.id ? updated : v))
    );
    setInspectingVehicle(updated);
    showToast(`Vehicle ${updated.registration} updated successfully.`);
  };

  // Add new vehicle
  const handleAddVehicle = (newVeh) => {
    setVehicles((prev) => [newVeh, ...prev]);
    showToast(`Vehicle ${newVeh.registration} onboarded into Fleet!`);
  };

  return (
    <Layout
      title="Fleet Management & Assets"
      breadcrumbs={[{ label: 'Fleet', path: '/fleet' }, { label: 'Vehicles' }]}
    >
      <div className="fleet-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#1e293b',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontSize: '13px',
            fontWeight: 700,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <span>🚛</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="fleet-header-bar">
        <div className="fleet-title-group">
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
            Fleet Vehicles Management
          </h1>
          <span className="fleet-badge-count">
            {vehicles.length} Vehicles In Asset Pool
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleBulkExport}>
            📥 Export Fleet CSV
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
            + Add New Vehicle
          </button>
        </div>
      </div>

      {/* KPI Stats Banner */}
      <div className="fleet-stats-grid">
        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box blue">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val">{fleetSummaryStats.totalVehicles}</div>
            <div className="fleet-stat-lbl">Total Commercial Fleet</div>
          </div>
        </div>

        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box green">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val" style={{ color: '#059669' }}>
              {vehicles.filter((v) => v.status === 'Active').length}
            </div>
            <div className="fleet-stat-lbl">Active On Highway</div>
          </div>
        </div>

        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box teal">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val" style={{ color: '#0284c7' }}>
              {vehicles.filter((v) => v.status === 'Available').length}
            </div>
            <div className="fleet-stat-lbl">Available / In Yard</div>
          </div>
        </div>

        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box amber">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val" style={{ color: '#d97706' }}>
              {vehicles.filter((v) => v.status === 'Under Maintenance').length}
            </div>
            <div className="fleet-stat-lbl">In Maintenance Bay</div>
          </div>
        </div>

        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box red">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val" style={{ color: '#dc2626' }}>
              {vehicles.filter((v) => v.status === 'Breakdown').length}
            </div>
            <div className="fleet-stat-lbl">Breakdown Triage</div>
          </div>
        </div>

        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box purple">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val">{fleetSummaryStats.fleetUtilizationRate}%</div>
            <div className="fleet-stat-lbl">Fleet Utilization</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="fleet-toolbar-card">
        <div className="fleet-search-row">
          <div className="fleet-search-wrapper">
            <svg className="fleet-search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="fleet-search-input"
              placeholder="Search by license plate, VIN, model, make, or assigned driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter Pills */}
          <div className="fleet-filter-pills">
            {['ALL', 'ACTIVE', 'AVAILABLE', 'MAINTENANCE', 'BREAKDOWN'].map((st) => (
              <button
                key={st}
                className={`fleet-filter-pill ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Category Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Type:</span>
            <select
              className="fleet-search-input"
              style={{ padding: '6px 12px', fontSize: '12px', width: '130px' }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="TRUCK">Trucks</option>
              <option value="TRAILER">Trailers</option>
              <option value="REEFER">Reefers</option>
              <option value="ELECTRIC VAN">Electric Vans</option>
              <option value="VAN">Sprinters / Vans</option>
            </select>
          </div>

          {/* Ownership Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Ownership:</span>
            <select
              className="fleet-search-input"
              style={{ padding: '6px 12px', fontSize: '12px', width: '130px' }}
              value={ownershipFilter}
              onChange={(e) => setOwnershipFilter(e.target.value)}
            >
              <option value="ALL">All Ownership</option>
              <option value="COMPANY OWNED">Company Owned</option>
              <option value="LEASED">Leased Asset</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Toolbar */}
        {selectedVehicleIds.length > 0 && (
          <div className="fleet-bulk-bar">
            <span>{selectedVehicleIds.length} vehicles selected</span>
            <div className="fleet-bulk-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => handleBulkStatus('Active')}>
                Mark Active
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleBulkStatus('Available')}>
                Mark Available (Yard)
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleBulkMaintenance}>
                🔧 Send to Maintenance
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleBulkExport}>
                📥 Export Manifest
              </button>
              <button
                style={{ background: 'transparent', border: 'none', color: '#1e40af', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                onClick={() => setSelectedVehicleIds([])}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Vehicles Table */}
      <div className="fleet-table-wrapper">
        <table className="fleet-table">
          <thead>
            <tr>
              <th style={{ width: '36px' }}>
                <input
                  type="checkbox"
                  checked={selectedVehicleIds.length > 0 && selectedVehicleIds.length === filteredVehicles.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Registration Plate</th>
              <th>Type / Model</th>
              <th>Status</th>
              <th>Capacity (Payload & Volume)</th>
              <th>Assigned Driver</th>
              <th>Fuel Level / Powertrain</th>
              <th>GPS & Telematics</th>
              <th>Next Service Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((v) => {
              const isSelected = selectedVehicleIds.includes(v.id);
              const fuelPct = v.telematics?.fuelLevelPct || 70;

              return (
                <tr
                  key={v.id}
                  className="fleet-row-clickable"
                  onClick={() => setInspectingVehicle(v)}
                  style={{ background: isSelected ? 'var(--color-primary-50)' : undefined }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleToggleSelect(v.id, e)}
                    />
                  </td>
                  <td>
                    <span className="fleet-reg-plate">{v.registration}</span>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                      {v.id} • {v.ownership}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '12px' }}>{v.make} {v.model}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{v.type} ({v.year})</div>
                  </td>
                  <td>
                    <span className={`fleet-status-pill ${v.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12px' }}>
                      {v.specs?.payloadCapacityKg?.toLocaleString()} kg
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      {v.specs?.volumeCapacityCbm} CBM ({v.specs?.axles} Axles)
                    </div>
                  </td>
                  <td>
                    {v.assignedDriver ? (
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--color-primary-600)' }}>
                          {v.assignedDriver.name}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                          {v.assignedDriver.id}
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                        Unassigned Pool
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '85px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700 }}>
                        <span>{fuelPct}%</span>
                        <span style={{ color: 'var(--color-text-tertiary)' }}>{v.specs?.fuelType?.includes('Electric') ? 'EV SOC' : 'Diesel'}</span>
                      </div>
                      <div className="driver-hos-bar-bg">
                        <div
                          className={`driver-hos-bar-fill ${fuelPct < 25 ? 'danger' : fuelPct < 50 ? 'warning' : 'normal'}`}
                          style={{ width: `${fuelPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`telematics-tag ${v.telematics?.gpsConnected ? 'connected' : 'disconnected'}`}>
                      <div className={`telematics-pulse-dot ${v.telematics?.gpsConnected ? 'online' : 'offline'}`} />
                      <span>{v.telematics?.gpsConnected ? `${v.telematics?.currentSpeedKmH || 0} km/h` : 'Disconnected'}</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                      📍 {v.telematics?.currentLocation?.split('(')[0]?.trim()}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '11px', color: v.service?.daysRemaining < 0 ? '#dc2626' : v.service?.daysRemaining < 30 ? '#d97706' : '#059669' }}>
                      {v.service?.nextServiceDate}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                      {v.service?.daysRemaining < 0 ? `Overdue by ${Math.abs(v.service.daysRemaining)}d` : `In ${v.service?.daysRemaining} days`}
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setInspectingVehicle(v)}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 8-Tab Vehicle Detail Modal */}
      {inspectingVehicle && (
        <VehicleDetailModal
          vehicle={inspectingVehicle}
          onClose={() => setInspectingVehicle(null)}
          onUpdateVehicle={handleUpdateVehicle}
        />
      )}

      {/* Create Vehicle Modal */}
      {showCreateModal && (
        <VehicleCreateModal
          onClose={() => setShowCreateModal(false)}
          onAddVehicle={handleAddVehicle}
        />
      )}
    </div>
    </Layout>
  );
}
