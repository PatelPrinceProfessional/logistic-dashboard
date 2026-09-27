import { useState, useMemo } from 'react';
import { driversStats, driversList as initialDrivers } from '../../utils/mockData/driversData';
import DriverDetailModal from './components/DriverDetailModal';
import DriverCreateModal from './components/DriverCreateModal';
import './Drivers.css';

export default function DriversList() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [certFilter, setCertFilter] = useState('ALL');
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [inspectingDriver, setInspectingDriver] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered drivers list
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      // Search
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.phone.includes(searchQuery) ||
        (d.assignedVehicle && d.assignedVehicle.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      let matchesStatus = true;
      if (statusFilter !== 'ALL') {
        matchesStatus = d.status.toUpperCase() === statusFilter.toUpperCase();
      }

      // Certification filter
      let matchesCert = true;
      if (certFilter === 'HAZMAT') {
        matchesCert = d.certifications?.some((c) => c.name.toLowerCase().includes('hazmat'));
      } else if (certFilter === 'REEFER') {
        matchesCert = d.certifications?.some((c) => c.name.toLowerCase().includes('temperature') || c.name.toLowerCase().includes('cold-chain') || c.name.toLowerCase().includes('reefer'));
      } else if (certFilter === 'ODC') {
        matchesCert = d.certifications?.some((c) => c.name.toLowerCase().includes('oversize') || c.name.toLowerCase().includes('odc'));
      }

      return matchesSearch && matchesStatus && matchesCert;
    });
  }, [drivers, searchQuery, statusFilter, certFilter]);

  // Bulk Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDriverIds(filteredDrivers.map((d) => d.id));
    } else {
      setSelectedDriverIds([]);
    }
  };

  const handleToggleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedDriverIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkStatus = (newStatus) => {
    setDrivers((prev) =>
      prev.map((d) =>
        selectedDriverIds.includes(d.id) ? { ...d, status: newStatus } : d
      )
    );
    showToast(`Updated ${selectedDriverIds.length} drivers to "${newStatus}"`);
    setSelectedDriverIds([]);
  };

  const handleBulkNotify = () => {
    showToast(`Broadcast dispatch SMS/Notification sent to ${selectedDriverIds.length} drivers.`);
    setSelectedDriverIds([]);
  };

  const handleBulkExport = () => {
    showToast(`Exported ${selectedDriverIds.length || filteredDrivers.length} driver compliance dossiers.`);
  };

  // Update single driver
  const handleUpdateDriver = (updatedDriver) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === updatedDriver.id ? updatedDriver : d))
    );
    setInspectingDriver(updatedDriver);
    showToast(`Driver ${updatedDriver.name} updated successfully.`);
  };

  // Add new driver
  const handleAddDriver = (newDriver) => {
    setDrivers((prev) => [newDriver, ...prev]);
    showToast(`Driver ${newDriver.name} (${newDriver.id}) onboarded!`);
  };

  return (
    <div className="drivers-page-container">
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
          <span>🚀</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="drivers-header-bar">
        <div className="drivers-title-group">
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
            Drivers Management
          </h1>
          <span className="drivers-badge-count">
            {drivers.length} Total Enrolled
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleBulkExport}>
            📥 Export Roster
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
            + Add New Driver
          </button>
        </div>
      </div>

      {/* KPI Stats Banner */}
      <div className="drivers-stats-grid">
        <div className="driver-stat-card">
          <div className="driver-stat-icon-box blue">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <div className="driver-stat-val">{driversStats.totalDrivers}</div>
            <div className="driver-stat-lbl">Active Roster</div>
          </div>
        </div>

        <div className="driver-stat-card">
          <div className="driver-stat-icon-box green">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="driver-stat-val" style={{ color: '#059669' }}>
              {drivers.filter((d) => d.status === 'On Trip').length}
            </div>
            <div className="driver-stat-lbl">Currently On Trip</div>
          </div>
        </div>

        <div className="driver-stat-card">
          <div className="driver-stat-icon-box teal">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="driver-stat-val" style={{ color: '#0284c7' }}>
              {drivers.filter((d) => d.status === 'Available').length}
            </div>
            <div className="driver-stat-lbl">Ready / Available</div>
          </div>
        </div>

        <div className="driver-stat-card">
          <div className="driver-stat-icon-box amber">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="driver-stat-val" style={{ color: '#d97706' }}>
              {drivers.filter((d) => d.status === 'On Break' || d.status === 'Off-Duty').length}
            </div>
            <div className="driver-stat-lbl">On Break / Off-Duty</div>
          </div>
        </div>

        <div className="driver-stat-card">
          <div className="driver-stat-icon-box purple">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div className="driver-stat-val">{driversStats.complianceRate}%</div>
            <div className="driver-stat-lbl">Statutory Compliance</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="drivers-toolbar-card">
        <div className="drivers-search-row">
          <div className="drivers-search-wrapper">
            <svg className="drivers-search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="drivers-search-input"
              placeholder="Search driver by name, ID, license number, phone, or truck..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter Pills */}
          <div className="drivers-filter-pills">
            {['ALL', 'AVAILABLE', 'ON TRIP', 'ON BREAK', 'OFF-DUTY', 'INACTIVE'].map((status) => (
              <button
                key={status}
                className={`driver-filter-pill ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Certification Dropdown Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Endorsement:</span>
            <select
              className="drivers-search-input"
              style={{ padding: '6px 12px', fontSize: '12px', width: '130px' }}
              value={certFilter}
              onChange={(e) => setCertFilter(e.target.value)}
            >
              <option value="ALL">All Certs</option>
              <option value="HAZMAT">Hazmat</option>
              <option value="REEFER">Cold Chain</option>
              <option value="ODC">Oversize (ODC)</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions Banner */}
        {selectedDriverIds.length > 0 && (
          <div className="drivers-bulk-bar">
            <span>{selectedDriverIds.length} drivers selected</span>
            <div className="drivers-bulk-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => handleBulkStatus('Available')}>
                Mark Available
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleBulkStatus('On Break')}>
                Set On Break
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleBulkNotify}>
                💬 Send Broadcast SMS
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleBulkExport}>
                📥 Export Dossier
              </button>
              <button
                style={{ background: 'transparent', border: 'none', color: '#1e40af', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                onClick={() => setSelectedDriverIds([])}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Driver List Table */}
      <div className="drivers-table-wrapper">
        <table className="drivers-table">
          <thead>
            <tr>
              <th style={{ width: '36px' }}>
                <input
                  type="checkbox"
                  checked={selectedDriverIds.length > 0 && selectedDriverIds.length === filteredDrivers.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Driver & ID</th>
              <th>Commercial License</th>
              <th>Duty Status</th>
              <th>Assigned Vehicle</th>
              <th>Certifications</th>
              <th>Contact & Location</th>
              <th>HOS Daily Worked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((d) => {
              const isSelected = selectedDriverIds.includes(d.id);
              const hosPercent = Math.min(100, Math.round((d.hoursWorkedToday / d.maxDailyHOS) * 100));

              return (
                <tr
                  key={d.id}
                  className="driver-row-clickable"
                  onClick={() => setInspectingDriver(d)}
                  style={{ background: isSelected ? 'var(--color-primary-50)' : undefined }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleToggleSelect(d.id, e)}
                    />
                  </td>
                  <td>
                    <div className="driver-cell-profile">
                      <div className="driver-avatar-ring">
                        <img src={d.avatar} alt={d.name} className="driver-avatar-img" />
                        <div className={`driver-status-dot-indicator ${d.status.toLowerCase().replace(/\s+/g, '')}`} />
                      </div>
                      <div>
                        <div className="driver-name-text">{d.name}</div>
                        <div className="driver-id-sub">{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12px' }}>{d.licenseNumber}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{d.licenseType}</div>
                  </td>
                  <td>
                    <span className={`driver-status-pill ${d.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12px' }}>{d.assignedVehicle}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                      Since {d.assignedSince}
                    </div>
                  </td>
                  <td>
                    <div className="driver-cert-tags-row">
                      {d.certifications?.map((c, idx) => {
                        const isHaz = c.name.toLowerCase().includes('hazmat');
                        const isRef = c.name.toLowerCase().includes('temperature') || c.name.toLowerCase().includes('cold-chain') || c.name.toLowerCase().includes('reefer');
                        const isOdc = c.name.toLowerCase().includes('oversize') || c.name.toLowerCase().includes('odc');
                        return (
                          <span
                            key={idx}
                            className={`driver-cert-tag ${isHaz ? 'hazmat' : isRef ? 'reefer' : isOdc ? 'odc' : ''}`}
                          >
                            {c.name.split('(')[0].trim()}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px' }}>
                      <a href={`tel:${d.phone}`} onClick={(e) => e.stopPropagation()} style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                        {d.phone}
                      </a>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                      📍 {d.lastLocation?.city} ({d.lastLocation?.time})
                    </div>
                  </td>
                  <td>
                    <div className="driver-hos-meter">
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700 }}>
                        <span>{d.hoursWorkedToday} hrs</span>
                        <span style={{ color: 'var(--color-text-tertiary)' }}>/ {d.maxDailyHOS}h</span>
                      </div>
                      <div className="driver-hos-bar-bg">
                        <div
                          className={`driver-hos-bar-fill ${hosPercent > 80 ? 'danger' : hosPercent > 60 ? 'warning' : 'normal'}`}
                          style={{ width: `${hosPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setInspectingDriver(d)}
                    >
                      Inspect Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 7-Tab Driver Detail Modal */}
      {inspectingDriver && (
        <DriverDetailModal
          driver={inspectingDriver}
          onClose={() => setInspectingDriver(null)}
          onUpdateDriver={handleUpdateDriver}
        />
      )}

      {/* Create Driver Modal */}
      {showCreateModal && (
        <DriverCreateModal
          onClose={() => setShowCreateModal(false)}
          onAddDriver={handleAddDriver}
        />
      )}
    </div>
  );
}
