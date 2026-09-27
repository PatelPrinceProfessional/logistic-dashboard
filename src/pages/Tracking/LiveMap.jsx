import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { liveTrackedVehicles, geofenceZones, trackingGlobalStats } from '../../utils/mockData/trackingData';
import './Tracking.css';

const LiveMap = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState(liveTrackedVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(liveTrackedVehicles[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Layer Toggles
  const [layers, setLayers] = useState({
    vehicles: true,
    geofences: true,
    traffic: true,
    breadcrumbs: true,
  });

  // Status Filters
  const [statusFilters, setStatusFilters] = useState({
    on_time: true,
    at_risk: true,
    delayed: true,
    offline: true,
  });

  // Vehicle Type Filters
  const [typeFilters, setTypeFilters] = useState({
    truck: true,
    trailer: true,
    van: true,
  });

  const toggleLayer = (layerKey) => {
    setLayers({ ...layers, [layerKey]: !layers[layerKey] });
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilters[v.status];
    return matchesSearch && matchesStatus;
  });

  const getPinColor = (status) => {
    switch (status) {
      case 'on_time': return '#10b981';
      case 'at_risk': return '#f59e0b';
      case 'delayed': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <Layout activePage="tracking">
      <div className="tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <div className="trk-title-group">
            <h1>
              <span>🛰️</span> Live Fleet Tracking & Geospatial Visibility
            </h1>
            <p>Real-time telematics map, GPS breadcrumbs trail, geofence boundary alerts, and dynamic ETA tracking</p>
          </div>

          <div className="disp-header-actions">
            <div className="trk-nav-tabs">
              <button className="trk-nav-tab active">Live Map</button>
              <button className="trk-nav-tab" onClick={() => navigate('/tracking/shipments')}>
                Shipment Tracking
              </button>
              <button className="trk-nav-tab" onClick={() => navigate('/tracking/eta')}>
                ETA Predictions
              </button>
            </div>

            <button
              className="tender-action-btn btn-evaluate"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => alert('Dispatching emergency roadside assistance vehicle...')}
            >
              ⚠️ Report Incident
            </button>
          </div>
        </div>

        {/* 3-Panel Main Layout */}
        <div className="tracking-map-layout">
          {/* ==========================================================================
              LEFT SIDEBAR: CONTROLS & FILTERS (280px)
              ========================================================================== */}
          <div className="trk-sidebar-controls">
            {/* Search */}
            <div>
              <div className="trk-section-title">Search Telematics</div>
              <input
                type="text"
                className="proc-search-input"
                style={{ width: '100%' }}
                placeholder="Search Vehicle, Driver, Hub..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Layer Toggles */}
            <div style={{ borderTop: '1px solid var(--trk-border)', paddingTop: '12px' }}>
              <div className="trk-section-title">Map Layers</div>
              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={layers.vehicles}
                  onChange={() => toggleLayer('vehicles')}
                />
                <span>Vehicle GPS Markers</span>
              </label>

              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={layers.geofences}
                  onChange={() => toggleLayer('geofences')}
                />
                <span>Geofence Boundaries</span>
              </label>

              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={layers.traffic}
                  onChange={() => toggleLayer('traffic')}
                />
                <span>Live Traffic Congestion</span>
              </label>

              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={layers.breadcrumbs}
                  onChange={() => toggleLayer('breadcrumbs')}
                />
                <span>GPS Breadcrumbs Trail</span>
              </label>
            </div>

            {/* Status Filter */}
            <div style={{ borderTop: '1px solid var(--trk-border)', paddingTop: '12px' }}>
              <div className="trk-section-title">Status Filter</div>
              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={statusFilters.on_time}
                  onChange={() => setStatusFilters({ ...statusFilters, on_time: !statusFilters.on_time })}
                />
                <span style={{ color: '#059669', fontWeight: 600 }}>● On-Time ({trackingGlobalStats.onTime})</span>
              </label>

              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={statusFilters.at_risk}
                  onChange={() => setStatusFilters({ ...statusFilters, at_risk: !statusFilters.at_risk })}
                />
                <span style={{ color: '#d97706', fontWeight: 600 }}>● At-Risk ({trackingGlobalStats.atRisk})</span>
              </label>

              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={statusFilters.delayed}
                  onChange={() => setStatusFilters({ ...statusFilters, delayed: !statusFilters.delayed })}
                />
                <span style={{ color: '#dc2626', fontWeight: 600 }}>● Delayed ({trackingGlobalStats.delayed})</span>
              </label>

              <label className="trk-checkbox-label">
                <input
                  type="checkbox"
                  checked={statusFilters.offline}
                  onChange={() => setStatusFilters({ ...statusFilters, offline: !statusFilters.offline })}
                />
                <span style={{ color: '#64748b' }}>● Offline / Idle ({trackingGlobalStats.offline})</span>
              </label>
            </div>

            {/* Fleet Telemetry Resource Counter */}
            <div style={{ borderTop: '1px solid var(--trk-border)', paddingTop: '12px', fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
              <div>Total Fleet Units: <strong>{trackingGlobalStats.totalVehicles}</strong></div>
              <div style={{ marginTop: '3px' }}>Online Active: <strong style={{ color: '#059669' }}>{trackingGlobalStats.onlineTracked} (90.5%)</strong></div>
              <div style={{ marginTop: '3px' }}>Fleet Utilization: <strong style={{ color: '#2563eb' }}>{trackingGlobalStats.fleetUtilizationPct}%</strong></div>
            </div>
          </div>

          {/* ==========================================================================
              CENTER SECTION: INTERACTIVE VECTOR LIVE MAP CANVAS
              ========================================================================== */}
          <div className="live-map-canvas-container">
            {/* SVG Live Map */}
            <svg
              className="live-map-svg"
              viewBox="0 0 640 400"
              preserveAspectRatio="none"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}
            >
              {/* Background Grid Roads */}
              <line x1="0" y1="90" x2="640" y2="90" className="map-road-grid-line" />
              <line x1="0" y1="180" x2="640" y2="180" className="map-road-grid-line" />
              <line x1="0" y1="270" x2="640" y2="270" className="map-road-grid-line" />
              <line x1="160" y1="0" x2="160" y2="400" className="map-road-grid-line" />
              <line x1="320" y1="0" x2="320" y2="400" className="map-road-grid-line" />
              <line x1="480" y1="0" x2="480" y2="400" className="map-road-grid-line" />

              {/* Major Highway Corridors */}
              <path d="M 0 140 Q 300 40 640 180" className="map-highway-corridor" />
              <path d="M 80 400 Q 320 220 580 0" className="map-highway-corridor" />

              {/* Optional Traffic Congestion Layer */}
              {layers.traffic && (
                <g>
                  <path d="M 0 140 Q 150 90 300 40" className="map-traffic-green" />
                  <path d="M 300 40 Q 470 110 640 180" className="map-traffic-orange" />
                  <path d="M 240 280 L 380 180" className="map-traffic-red" />
                </g>
              )}

              {/* Optional Geofence Polygon Zones */}
              {layers.geofences && (
                <g>
                  {geofenceZones.map((zone) => (
                    <g key={zone.id}>
                      <polygon
                        points={zone.points}
                        fill={zone.color}
                        stroke={zone.border}
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    </g>
                  ))}
                </g>
              )}

              {/* Optional GPS Breadcrumbs */}
              {layers.breadcrumbs && (
                <g>
                  {filteredVehicles.map((v) => {
                    if (!v.breadcrumbs || v.breadcrumbs.length === 0) return null;
                    const pathString = v.breadcrumbs.reduce((acc, p, i) => {
                      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
                    }, '');
                    return (
                      <path
                        key={`crumb-${v.id}`}
                        d={pathString}
                        className="trk-breadcrumb-path"
                        stroke={getPinColor(v.status)}
                      />
                    );
                  })}
                </g>
              )}

              {/* Vehicle Markers */}
              {layers.vehicles && (
                <g>
                  {filteredVehicles.map((v) => {
                    const isSelected = selectedVehicle?.id === v.id;
                    const pinColor = getPinColor(v.status);
                    return (
                      <g
                        key={v.id}
                        className="trk-vehicle-marker"
                        onClick={() => setSelectedVehicle(v)}
                      >
                        {/* Selected Pulsing Ring */}
                        {isSelected && (
                          <circle
                            cx={v.x}
                            cy={v.y}
                            r="18"
                            fill={pinColor}
                            opacity="0.25"
                          />
                        )}

                        {/* Outer Pin Circle */}
                        <circle
                          cx={v.x}
                          cy={v.y}
                          r={isSelected ? 13 : 10}
                          fill={pinColor}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
                        />

                        {/* Truck Icon Character */}
                        <text
                          x={v.x}
                          y={v.y + 3.5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9px"
                          fontWeight="800"
                        >
                          🚚
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>

            {/* Floating Live Telemetry HUD */}
            <div className="map-floating-hud">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="hud-pulse-dot" />
                <span>Live GPS Telematics Stream</span>
              </div>
              <div style={{ color: 'var(--trk-text-muted)', borderLeft: '1px solid #cbd5e1', paddingLeft: '10px' }}>
                Active Pings: {filteredVehicles.length} Units
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="map-zoom-buttons">
              <button className="zoom-btn" onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.2))}>+</button>
              <button className="zoom-btn" onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))}>−</button>
              <button className="zoom-btn" style={{ fontSize: '0.8rem' }} onClick={() => setZoomLevel(1)}>⟲</button>
            </div>
          </div>

          {/* ==========================================================================
              RIGHT PANEL: VEHICLE DETAILS & SENSORS (320px)
              ========================================================================== */}
          <div className="trk-inspector-panel">
            <div className="disp-card-header">
              <h3>
                <span>🚚</span> Vehicle Telematics
              </h3>
              <span className={`status-pill ${
                selectedVehicle?.status === 'on_time' ? 'status-ready' : selectedVehicle?.status === 'at_risk' ? 'status-break' : selectedVehicle?.status === 'delayed' ? 'status-offduty' : 'status-offduty'
              }`}>
                {selectedVehicle?.status.replace('_', ' ')}
              </span>
            </div>

            {selectedVehicle ? (
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                    {selectedVehicle.registration}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                    Driver: <strong>{selectedVehicle.driver}</strong> ({selectedVehicle.vehicleType})
                  </div>
                </div>

                {/* Live Sensors Matrix */}
                <div className="telemetry-sensors-grid" style={{ marginBottom: '12px' }}>
                  <div className="sensor-tile">
                    <span>Speed</span>
                    <strong style={{ color: '#0f172a' }}>{selectedVehicle.speedKmH} km/h</strong>
                  </div>
                  <div className="sensor-tile">
                    <span>Heading</span>
                    <strong style={{ color: '#2563eb' }}>{selectedVehicle.heading}</strong>
                  </div>
                  <div className="sensor-tile">
                    <span>Fuel Level</span>
                    <strong style={{ color: '#059669' }}>{selectedVehicle.fuelPct}%</strong>
                  </div>
                  <div className="sensor-tile">
                    <span>Reefer Temp</span>
                    <strong style={{ color: '#7c3aed' }}>{selectedVehicle.tempC}</strong>
                  </div>
                </div>

                {/* Current Trip Specs */}
                <div style={{ fontSize: '0.8rem', lineHeight: '1.6', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--trk-border)', marginBottom: '14px' }}>
                  <div>Trip ID: <strong style={{ color: 'var(--trk-primary)' }}>{selectedVehicle.currentTripId || 'Standby'}</strong></div>
                  <div>Next Stop: <strong>{selectedVehicle.nextStop}</strong></div>
                  <div>Remaining: <strong>{selectedVehicle.distanceRemainingKm} km</strong></div>
                  <div>Target ETA: <strong style={{ color: selectedVehicle.delayMinutes > 0 ? '#dc2626' : '#059669' }}>{selectedVehicle.eta}</strong> {selectedVehicle.delayMinutes > 0 && `(+${selectedVehicle.delayMinutes}m)`}</div>
                  <div>Geofence: <span style={{ color: '#2563eb', fontWeight: 600 }}>{selectedVehicle.geofenceInside}</span></div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    className="tender-action-btn btn-award"
                    style={{ padding: '8px' }}
                    onClick={() => alert(`Connecting voice call to driver ${selectedVehicle.driver} (${selectedVehicle.driverPhone})...`)}
                  >
                    📞 Call Driver Direct
                  </button>
                  <button
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                    onClick={() => alert(`Dispatch message sent to in-cab terminal of ${selectedVehicle.registration}.`)}
                  >
                    💬 Dispatch In-Cab Message
                  </button>
                  <button
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                    onClick={() => navigate('/routing')}
                  >
                    🗺️ View Complete Planned Route
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--trk-text-muted)', padding: '24px 0', fontSize: '0.85rem' }}>
                Select a vehicle pin to view live telemetry.
              </div>
            )}
          </div>
        </div>

        {/* ==========================================================================
            BOTTOM BAR: STATUS SUMMARY & REFRESH INTERVAL
            ========================================================================== */}
        <div className="tracking-bottom-bar">
          <div className="trk-stats-pills">
            <div className="trk-stat-pill" style={{ color: '#059669', background: '#ecfdf5', borderColor: '#a7f3d0' }}>
              ● {trackingGlobalStats.onTime} On-Time
            </div>
            <div className="trk-stat-pill" style={{ color: '#d97706', background: '#fffbeb', borderColor: '#fde68a' }}>
              ● {trackingGlobalStats.atRisk} At-Risk
            </div>
            <div className="trk-stat-pill" style={{ color: '#dc2626', background: '#fef2f2', borderColor: '#fca5a5' }}>
              ● {trackingGlobalStats.delayed} Delayed
            </div>
            <div className="trk-stat-pill" style={{ color: '#64748b' }}>
              ● {trackingGlobalStats.offline} Offline
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--trk-text-muted)' }}>
            <span>Telemetry Ping Interval:</span>
            <select className="proc-select" defaultValue="30s">
              <option value="15s">15 Seconds (High Precision)</option>
              <option value="30s">30 Seconds</option>
              <option value="60s">1 Minute</option>
            </select>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveMap;
