import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  MapPin,
  Truck,
  Layers,
  ArrowRightLeft,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Shield,
  Activity,
  SlidersHorizontal,
  FileText,
  UserCheck,
  Building2,
  Eye,
  Info,
  ExternalLink,
  RotateCw,
} from 'lucide-react';
import { facilitiesList, yardOperationsData } from '../../utils/mockData/facilitiesData';
import YardMoveModal from './components/YardMoveModal';
import './Facilities.css';

const YardManagement = () => {
  const [selectedFacility, setSelectedFacility] = useState(facilitiesList[0].id);
  const [yardData, setYardData] = useState(yardOperationsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('ALL');
  const [selectedTrailer, setSelectedTrailer] = useState(yardOperationsData.vehiclesInYard[0]);
  const [selectedZone, setSelectedZone] = useState(yardOperationsData.zones[0]);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'list' | 'moves'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return yardData.vehiclesInYard.filter((v) => {
      const matchesSearch =
        v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.zone.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesZone =
        selectedZoneFilter === 'ALL' ||
        (selectedZoneFilter === 'ZONE-INBOUND' && v.zone.includes('Zone A')) ||
        (selectedZoneFilter === 'ZONE-OUTBOUND' && v.zone.includes('Zone B')) ||
        (selectedZoneFilter === 'ZONE-STAGING' && v.zone.includes('Zone C')) ||
        (selectedZoneFilter === 'ZONE-STORAGE' && v.zone.includes('Zone D'));

      return matchesSearch && matchesZone;
    });
  }, [yardData, searchQuery, selectedZoneFilter]);

  const handleFacilityChange = (facilityId) => {
    setSelectedFacility(facilityId);
    const facilityObj = facilitiesList.find((f) => f.id === facilityId);
    showToast(`Switched active yard map to ${facilityObj?.name}`);
  };

  const handleTrailerClick = (trailer) => {
    setSelectedTrailer(trailer);
    // Also select corresponding zone
    const matchingZone = yardData.zones.find((z) => {
      if (trailer.zone.includes('Zone A') && z.id === 'ZONE-INBOUND') return true;
      if (trailer.zone.includes('Zone B') && z.id === 'ZONE-OUTBOUND') return true;
      if (trailer.zone.includes('Zone C') && z.id === 'ZONE-STAGING') return true;
      if (trailer.zone.includes('Zone D') && z.id === 'ZONE-STORAGE') return true;
      return false;
    });
    if (matchingZone) setSelectedZone(matchingZone);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    // Find first trailer in that zone if exists
    const trailerInZone = yardData.vehiclesInYard.find((v) => {
      if (zone.id === 'ZONE-INBOUND' && v.zone.includes('Zone A')) return true;
      if (zone.id === 'ZONE-OUTBOUND' && v.zone.includes('Zone B')) return true;
      if (zone.id === 'ZONE-STAGING' && v.zone.includes('Zone C')) return true;
      if (zone.id === 'ZONE-STORAGE' && v.zone.includes('Zone D')) return true;
      return false;
    });
    if (trailerInZone) setSelectedTrailer(trailerInZone);
  };

  const handleExecuteMove = (movePayload) => {
    // Update trailer zone
    const updatedVehicles = yardData.vehiclesInYard.map((v) => {
      if (v.id === movePayload.trailerId) {
        return {
          ...v,
          zone: movePayload.toZone,
          status: 'Shunted - Repositioned',
        };
      }
      return v;
    });

    const newMoveRecord = {
      id: `MOV-${Math.floor(400 + Math.random() * 100)}`,
      trailer: `${movePayload.trailerId} (${selectedTrailer?.registration || 'Active Trailer'})`,
      fromZone: movePayload.fromZone,
      toZone: movePayload.toZone,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      operator: movePayload.shunterTug,
      reason: movePayload.reason,
    };

    setYardData((prev) => ({
      ...prev,
      vehiclesInYard: updatedVehicles,
      recentYardMoves: [newMoveRecord, ...prev.recentYardMoves],
    }));

    setIsMoveModalOpen(false);
    showToast(`Shunter Move ${newMoveRecord.id} dispatched successfully to ${movePayload.toZone}!`);
  };

  const currentFacilityObj = facilitiesList.find((f) => f.id === selectedFacility) || facilitiesList[0];

  return (
    <Layout
      title="Yard Management & Spatial Tracking"
      breadcrumbs={[{ label: 'Facilities', path: '/facilities' }, { label: 'Yard Management' }]}
    >
      <div className="facilities-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="facilities-toast">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Facility Switcher */}
      <div className="facilities-header-row">
        <div>
          <div className="facilities-badge">
            <Layers size={14} />
            <span>2D Interactive Yard Management System</span>
          </div>
          <h1 className="facilities-title">Yard Operations & Trailer Tracking</h1>
          <p className="facilities-subtitle">
            Live 2D spatial layout of marshalling yards, dock bays, shunter tug dispatches, and dwell analytics.
          </p>
        </div>

        <div className="facilities-header-actions">
          <div className="facility-selector-box">
            <Building2 size={16} className="text-secondary" />
            <select
              value={selectedFacility}
              onChange={(e) => handleFacilityChange(e.target.value)}
              className="facility-dropdown-select"
            >
              {facilitiesList.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.city})
                </option>
              ))}
            </select>
          </div>

          <button
            className="facilities-btn facilities-btn-primary"
            onClick={() => setIsMoveModalOpen(true)}
          >
            <ArrowRightLeft size={16} />
            <span>Dispatch Yard Move</span>
          </button>
        </div>
      </div>

      {/* Yard Metrics KPI Grid */}
      <div className="facilities-stats-grid">
        <div className="facilities-stat-card">
          <div className="stat-header">
            <span className="stat-label">Trailers in Yard</span>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <Truck size={18} />
            </div>
          </div>
          <div className="stat-value">{yardData.yardStats.totalTrailersInYard}</div>
          <div className="stat-footer text-success">
            <span>Live tracked via RFID Gate</span>
          </div>
        </div>

        <div className="facilities-stat-card">
          <div className="stat-header">
            <span className="stat-label">Inbound Docking</span>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Activity size={18} />
            </div>
          </div>
          <div className="stat-value">{yardData.yardStats.inboundDocking} Bays</div>
          <div className="stat-footer text-muted">
            <span>Avg Unload: 42 mins</span>
          </div>
        </div>

        <div className="facilities-stat-card">
          <div className="stat-header">
            <span className="stat-label">Outbound Loading</span>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="stat-value">{yardData.yardStats.outboundLoading} Bays</div>
          <div className="stat-footer text-warning">
            <span>High dispatch flow</span>
          </div>
        </div>

        <div className="facilities-stat-card">
          <div className="stat-header">
            <span className="stat-label">Staging Marshalling</span>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <Layers size={18} />
            </div>
          </div>
          <div className="stat-value">{yardData.yardStats.stagingMarshalling}</div>
          <div className="stat-footer text-muted">
            <span>2 Shunter Tugs active</span>
          </div>
        </div>

        <div className="facilities-stat-card">
          <div className="stat-header">
            <span className="stat-label">Avg Yard Dwell Time</span>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
              <RotateCw size={18} />
            </div>
          </div>
          <div className="stat-value">{yardData.yardStats.avgYardDwellHours} hrs</div>
          <div className="stat-footer text-success">
            <span>-18% vs weekly benchmark</span>
          </div>
        </div>
      </div>

      {/* Control Navigation & Filter Bar */}
      <div className="facilities-filter-bar">
        <div className="filter-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search trailer, plate, carrier, driver, cargo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-input"
          />
        </div>

        <div className="filter-select-group">
          <div className="filter-select-item">
            <Filter size={14} />
            <select
              value={selectedZoneFilter}
              onChange={(e) => setSelectedZoneFilter(e.target.value)}
              className="filter-dropdown"
            >
              <option value="ALL">All Yard Zones</option>
              <option value="ZONE-INBOUND">Zone A (Inbound Docks)</option>
              <option value="ZONE-OUTBOUND">Zone B (Outbound Docks)</option>
              <option value="ZONE-STAGING">Zone C (Marshalling Staging)</option>
              <option value="ZONE-STORAGE">Zone D (Empty Storage)</option>
            </select>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="facilities-tab-pills">
          <button
            className={`tab-pill ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <MapPin size={14} />
            <span>2D Yard Map</span>
          </button>
          <button
            className={`tab-pill ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <Truck size={14} />
            <span>Trailers List ({filteredVehicles.length})</span>
          </button>
          <button
            className={`tab-pill ${activeTab === 'moves' ? 'active' : ''}`}
            onClick={() => setActiveTab('moves')}
          >
            <ArrowRightLeft size={14} />
            <span>Shunter Move Log ({yardData.recentYardMoves.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 2D Interactive Yard Map */}
      {activeTab === 'map' && (
        <div className="yard-layout-grid">
          {/* Main Visual 2D Canvas Card */}
          <div className="yard-map-card">
            <div className="yard-map-header">
              <div className="yard-map-title">
                <MapPin size={18} className="text-primary" />
                <span>Spatial Yard Layout — {currentFacilityObj.name}</span>
              </div>
              <div className="yard-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#2563eb' }}></span>
                  <span>Inbound Dock</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#059669' }}></span>
                  <span>Outbound Dock</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#d97706' }}></span>
                  <span>Staging Yard</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#64748b' }}></span>
                  <span>Chassis Storage</span>
                </div>
              </div>
            </div>

            {/* 2D Canvas Area */}
            <div className="yard-canvas">
              {/* Security Gate Inbound Entry */}
              <div className="yard-gate-marker gate-inbound">
                <Shield size={14} />
                <span>Security Gate Inbound (RFID/Scale)</span>
              </div>

              {/* Security Gate Outbound Exit */}
              <div className="yard-gate-marker gate-outbound">
                <Shield size={14} />
                <span>Outbound Dispatch Gate</span>
              </div>

              {/* Zone A: Inbound Docks Floor Area */}
              <div
                className={`yard-zone-area zone-inbound ${selectedZone?.id === 'ZONE-INBOUND' ? 'selected' : ''}`}
                onClick={() => handleZoneClick(yardData.zones[0])}
              >
                <div className="zone-header">
                  <span className="zone-tag">Zone A: Inbound Docks (Bays 1-3)</span>
                  <span className="zone-capacity">3/5 Trailers (60%)</span>
                </div>
                <div className="zone-bay-slots">
                  <div className="bay-slot occupied">Bay 1 (TR-102)</div>
                  <div className="bay-slot occupied">Bay 2 (TR-108)</div>
                  <div className="bay-slot occupied">Bay 3 (TR-114)</div>
                  <div className="bay-slot empty">Bay 4 (Empty)</div>
                  <div className="bay-slot empty">Bay 5 (Empty)</div>
                </div>
              </div>

              {/* Zone B: Outbound Docks Floor Area */}
              <div
                className={`yard-zone-area zone-outbound ${selectedZone?.id === 'ZONE-OUTBOUND' ? 'selected' : ''}`}
                onClick={() => handleZoneClick(yardData.zones[1])}
              >
                <div className="zone-header">
                  <span className="zone-tag">Zone B: Outbound Docks (Bays 4-6)</span>
                  <span className="zone-capacity">2/4 Trailers (50%)</span>
                </div>
                <div className="zone-bay-slots">
                  <div className="bay-slot occupied">Bay 4 (TR-204)</div>
                  <div className="bay-slot occupied">Bay 5 (TR-209)</div>
                  <div className="bay-slot empty">Bay 6 (Empty)</div>
                  <div className="bay-slot empty">Bay 7 (Reserved)</div>
                </div>
              </div>

              {/* Zone C: Staging Marshalling Floor Area */}
              <div
                className={`yard-zone-area zone-staging ${selectedZone?.id === 'ZONE-STAGING' ? 'selected' : ''}`}
                onClick={() => handleZoneClick(yardData.zones[2])}
              >
                <div className="zone-header">
                  <span className="zone-tag">Zone C: Marshalling & Pre-Dock Staging Area</span>
                  <span className="zone-capacity">8/12 Staged (67%)</span>
                </div>
                <div className="zone-bay-slots">
                  <div className="bay-slot occupied">Slot 1 (TR-301 Reefer)</div>
                  <div className="bay-slot occupied">Slot 2 (TR-305 40ft)</div>
                  <div className="bay-slot occupied">Slot 3 (TR-308)</div>
                  <div className="bay-slot occupied">Slot 4 (TR-312)</div>
                  <div className="bay-slot occupied">Slot 5 (TR-319)</div>
                  <div className="bay-slot empty">Slot 6 (Open)</div>
                  <div className="bay-slot empty">Slot 7 (Open)</div>
                  <div className="bay-slot empty">Slot 8 (Open)</div>
                </div>
              </div>

              {/* Zone D: Empty Storage Floor Area */}
              <div
                className={`yard-zone-area zone-storage ${selectedZone?.id === 'ZONE-STORAGE' ? 'selected' : ''}`}
                onClick={() => handleZoneClick(yardData.zones[3])}
              >
                <div className="zone-header">
                  <span className="zone-tag">Zone D: Chassis & Empty Container Rack Storage</span>
                  <span className="zone-capacity">5/20 Chassis (25%)</span>
                </div>
                <div className="zone-bay-slots">
                  <div className="bay-slot occupied">Rack 01 (CH-01)</div>
                  <div className="bay-slot occupied">Rack 02 (CH-04)</div>
                  <div className="bay-slot occupied">Rack 03 (CH-09)</div>
                  <div className="bay-slot empty">Rack 04 (Available)</div>
                  <div className="bay-slot empty">Rack 05 (Available)</div>
                </div>
              </div>

              {/* Interactive Vehicle Trailer Pins */}
              {filteredVehicles.map((vehicle) => {
                const isSelected = selectedTrailer?.id === vehicle.id;
                let badgeClass = 'status-badge-blue';
                if (vehicle.statusBadge === 'ready') badgeClass = 'status-badge-green';
                if (vehicle.statusBadge === 'waiting') badgeClass = 'status-badge-yellow';
                if (vehicle.statusBadge === 'parked') badgeClass = 'status-badge-gray';

                return (
                  <div
                    key={vehicle.id}
                    className={`yard-trailer-pin ${isSelected ? 'selected' : ''} ${vehicle.statusBadge}`}
                    style={{ left: `${vehicle.x}%`, top: `${vehicle.y}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrailerClick(vehicle);
                    }}
                  >
                    <div className="pin-pulse"></div>
                    <div className="pin-body">
                      <Truck size={14} />
                      <span className="pin-label">{vehicle.id}</span>
                    </div>

                    {/* Tooltip on hover */}
                    <div className="pin-tooltip">
                      <div className="tooltip-title">{vehicle.id} — {vehicle.registration}</div>
                      <div className="tooltip-meta">{vehicle.carrier}</div>
                      <div className="tooltip-status">{vehicle.status}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Shunter Status Bar */}
            <div className="yard-shunter-bar">
              <div className="shunter-unit">
                <div className="shunter-avatar">TUG-01</div>
                <div>
                  <div className="shunter-name">Terminal Shunter Tug #1</div>
                  <div className="shunter-status">Active — Dinesh Kumar (Operating in Zone C)</div>
                </div>
              </div>
              <div className="shunter-unit">
                <div className="shunter-avatar">TUG-02</div>
                <div>
                  <div className="shunter-name">Terminal Shunter Tug #2</div>
                  <div className="shunter-status">Standby — Naveen Rao (Fueling at Station 2)</div>
                </div>
              </div>
              <button
                className="facilities-btn facilities-btn-primary"
                onClick={() => setIsMoveModalOpen(true)}
              >
                <ArrowRightLeft size={14} />
                <span>Command Shunter</span>
              </button>
            </div>
          </div>

          {/* Side Inspector Drawer Card */}
          <div className="yard-inspector-card">
            {selectedTrailer ? (
              <div className="inspector-content">
                <div className="inspector-header">
                  <div className="inspector-title-row">
                    <div className="inspector-icon">
                      <Truck size={22} />
                    </div>
                    <div>
                      <h3 className="inspector-title">{selectedTrailer.id}</h3>
                      <p className="inspector-subtitle">{selectedTrailer.registration}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${selectedTrailer.statusBadge}`}>
                    {selectedTrailer.status}
                  </span>
                </div>

                <div className="inspector-section">
                  <h4 className="section-heading">Trailer & Carrier Details</h4>
                  <div className="inspector-key-values">
                    <div className="kv-row">
                      <span className="kv-key">Carrier Fleet:</span>
                      <span className="kv-val font-semibold">{selectedTrailer.carrier}</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-key">Driver Assigned:</span>
                      <span className="kv-val">{selectedTrailer.driver}</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-key">Trailer Serial:</span>
                      <span className="kv-val font-mono">{selectedTrailer.trailerNumber}</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-key">Current Yard Zone:</span>
                      <span className="kv-val text-primary font-semibold">{selectedTrailer.zone}</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-key">Time in Yard:</span>
                      <span className="kv-val text-warning font-semibold">{selectedTrailer.timeInYard}</span>
                    </div>
                  </div>
                </div>

                <div className="inspector-section">
                  <h4 className="section-heading">Cargo Manifest</h4>
                  <div className="cargo-box">
                    <div className="cargo-title">{selectedTrailer.cargo}</div>
                    <div className="cargo-meta">Pre-verified at Security Gate RFID checkpoint. Temperature & seal integrity valid.</div>
                  </div>
                </div>

                <div className="inspector-section">
                  <h4 className="section-heading">Quick Actions</h4>
                  <div className="inspector-actions-grid">
                    <button
                      className="inspector-action-btn primary"
                      onClick={() => setIsMoveModalOpen(true)}
                    >
                      <ArrowRightLeft size={16} />
                      <span>Shunt to New Zone</span>
                    </button>
                    <button
                      className="inspector-action-btn secondary"
                      onClick={() => showToast(`Gate Pass generated for ${selectedTrailer.id}`)}
                    >
                      <FileText size={16} />
                      <span>Generate Gate Pass</span>
                    </button>
                    <button
                      className="inspector-action-btn secondary"
                      onClick={() => showToast(`Security inspection logged for ${selectedTrailer.id}`)}
                    >
                      <Shield size={16} />
                      <span>Log Inspection</span>
                    </button>
                  </div>
                </div>

                {/* Selected Zone Overview */}
                {selectedZone && (
                  <div className="inspector-section zone-summary-box">
                    <h4 className="section-heading">{selectedZone.name}</h4>
                    <div className="occupancy-progress-bar">
                      <div
                        className="occupancy-fill"
                        style={{ width: `${selectedZone.occupancyPct}%`, background: selectedZone.color }}
                      ></div>
                    </div>
                    <div className="occupancy-meta">
                      <span>Occupancy: {selectedZone.currentCount}/{selectedZone.capacityTrailers} ({selectedZone.occupancyPct}%)</span>
                      <span>Equipment: {selectedZone.equipment}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="inspector-empty">
                <Info size={36} />
                <p>Select any trailer pin or zone on the 2D map to inspect details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Trailers List Grid */}
      {activeTab === 'list' && (
        <div className="facilities-table-card">
          <div className="facilities-table-header">
            <div>
              <h3 className="table-title">Trailers & Chassis in Yard ({filteredVehicles.length})</h3>
              <p className="table-subtitle">All active mobile assets currently within {currentFacilityObj.name} geofence.</p>
            </div>
          </div>

          <div className="facilities-table-wrapper">
            <table className="facilities-table">
              <thead>
                <tr>
                  <th>Asset ID / Plate</th>
                  <th>Carrier & Driver</th>
                  <th>Current Zone</th>
                  <th>Cargo Manifest</th>
                  <th>Yard Dwell</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((v) => (
                  <tr key={v.id} onClick={() => handleTrailerClick(v)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div className="facility-cell-primary">
                        <Truck size={16} className="text-primary" />
                        <div>
                          <div className="font-semibold text-primary">{v.id}</div>
                          <div className="text-xs text-muted">{v.registration}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm font-medium">{v.carrier}</div>
                      <div className="text-xs text-muted">Driver: {v.driver}</div>
                    </td>
                    <td>
                      <span className="badge-zone">{v.zone}</span>
                    </td>
                    <td>
                      <div className="text-sm">{v.cargo}</div>
                    </td>
                    <td>
                      <div className="text-sm text-warning font-mono">{v.timeInYard}</div>
                    </td>
                    <td>
                      <span className={`status-pill ${v.statusBadge}`}>{v.status}</span>
                    </td>
                    <td>
                      <button
                        className="btn-table-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTrailer(v);
                          setIsMoveModalOpen(true);
                        }}
                      >
                        <ArrowRightLeft size={14} />
                        <span>Move</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Shunter Moves Audit Log */}
      {activeTab === 'moves' && (
        <div className="facilities-table-card">
          <div className="facilities-table-header">
            <div>
              <h3 className="table-title">Recent Yard Shunter Dispatch Log</h3>
              <p className="table-subtitle">Chronological record of terminal tractor moves, dock positioning, and chassis repositioning.</p>
            </div>
            <button
              className="facilities-btn facilities-btn-primary"
              onClick={() => setIsMoveModalOpen(true)}
            >
              <Plus size={16} />
              <span>Dispatch New Move</span>
            </button>
          </div>

          <div className="facilities-table-wrapper">
            <table className="facilities-table">
              <thead>
                <tr>
                  <th>Move ID</th>
                  <th>Trailer / Asset</th>
                  <th>Origin Zone</th>
                  <th>Destination Zone</th>
                  <th>Timestamp</th>
                  <th>Shunter Tug / Operator</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {yardData.recentYardMoves.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <span className="font-mono font-bold text-primary">{m.id}</span>
                    </td>
                    <td>
                      <div className="font-semibold text-sm">{m.trailer}</div>
                    </td>
                    <td>
                      <span className="badge-zone origin">{m.fromZone}</span>
                    </td>
                    <td>
                      <span className="badge-zone dest">{m.toZone}</span>
                    </td>
                    <td>
                      <div className="text-sm font-mono text-muted">{m.time}</div>
                    </td>
                    <td>
                      <div className="text-sm font-medium">{m.operator}</div>
                    </td>
                    <td>
                      <div className="text-sm text-secondary">{m.reason}</div>
                    </td>
                    <td>
                      <span className="status-pill ready">Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Yard Move Modal */}
      {isMoveModalOpen && (
        <YardMoveModal
          trailer={selectedTrailer}
          zones={yardData.zones}
          onClose={() => setIsMoveModalOpen(false)}
          onMove={handleExecuteMove}
        />
      )}
    </div>
    </Layout>
  );
};

export default YardManagement;
