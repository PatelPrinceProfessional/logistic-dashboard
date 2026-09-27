import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { initialRouteData, availableVehicles, availableDrivers, availableDepots, routeComplianceRules } from '../../utils/mockData/routingData';
import './Routing.css';

const RouteBuilder = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState(initialRouteData);
  const [stops, setStops] = useState(initialRouteData.stops);
  const [hoveredStop, setHoveredStop] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Stop Form State
  const [newStop, setNewStop] = useState({
    name: '',
    address: '',
    type: 'delivery',
    items: 2,
    weightKg: 250,
    volumeCbm: 1.1,
    timeWindow: '11:00 - 12:30',
    contact: '',
    phone: '',
  });

  const handleMoveStop = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex <= 0 || targetIndex >= stops.length - 1) return; // Keep start/end depots locked

    const updated = [...stops];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate order numbers
    const reordered = updated.map((s, idx) => ({ ...s, order: idx + 1 }));
    setStops(reordered);
  };

  const handleRemoveStop = (id) => {
    const filtered = stops.filter(s => s.id !== id);
    const reordered = filtered.map((s, idx) => ({ ...s, order: idx + 1 }));
    setStops(reordered);
    if (selectedPin?.id === id) setSelectedPin(null);
  };

  const handleAddStopSubmit = (e) => {
    e.preventDefault();
    if (!newStop.name || !newStop.address) return;

    // Insert before the last stop (which is the End Depot)
    const insertIndex = Math.max(1, stops.length - 1);
    const stopObj = {
      id: `ST-0${stops.length + 1}`,
      order: insertIndex + 1,
      type: newStop.type,
      name: newStop.name,
      address: newStop.address,
      items: Number(newStop.items) || 1,
      weightKg: Number(newStop.weightKg) || 100,
      volumeCbm: Number(newStop.volumeCbm) || 0.5,
      timeWindow: newStop.timeWindow,
      contact: newStop.contact || 'Dock Supervisor',
      phone: newStop.phone || '+1 (555) 000-0000',
      status: 'Confirmed',
      x: Math.floor(Math.random() * 400) + 120,
      y: Math.floor(Math.random() * 260) + 60,
    };

    const updated = [...stops];
    updated.splice(insertIndex, 0, stopObj);
    const reordered = updated.map((s, idx) => ({ ...s, order: idx + 1 }));
    setStops(reordered);
    setIsAddModalOpen(false);

    // Reset form
    setNewStop({
      name: '',
      address: '',
      type: 'delivery',
      items: 2,
      weightKg: 250,
      volumeCbm: 1.1,
      timeWindow: '11:00 - 12:30',
      contact: '',
      phone: '',
    });
  };

  const handleAutoReorderAI = () => {
    // Reorder delivery stops by geographical coordinate proximity
    const startDepot = stops[0];
    const endDepot = stops[stops.length - 1];
    const intermediate = stops.slice(1, stops.length - 1);

    intermediate.sort((a, b) => (a.x + a.y) - (b.x + b.y));

    const reordered = [startDepot, ...intermediate, endDepot].map((s, idx) => ({
      ...s,
      order: idx + 1,
    }));

    setStops(reordered);
    setRoute(prev => ({
      ...prev,
      totalDistanceKm: Math.round(prev.totalDistanceKm * 0.88),
      estimatedDuration: '7h 35m',
      estimatedCost: Math.round(prev.estimatedCost * 0.9),
      efficiencyScore: 94,
    }));
  };

  // Generate SVG path string from stops
  const pathD = stops.reduce((acc, stop, i) => {
    return i === 0 ? `M ${stop.x} ${stop.y}` : `${acc} L ${stop.x} ${stop.y}`;
  }, '');

  return (
    <Layout activePage="routing">
      <div className="routing-container">
        {/* Header */}
        <div className="routing-header">
          <div className="routing-title-group">
            <h1>
              <span>🗺️</span> Route Builder Workbench
            </h1>
            <p>Interactive spatial route sequencing, map visualizer, vehicle assignment, and regulatory compliance</p>
          </div>

          <div className="routing-header-actions">
            <div className="routing-nav-tabs">
              <button className="routing-nav-tab active">Route Builder</button>
              <button className="routing-nav-tab" onClick={() => navigate('/routing/optimization')}>
                Route Optimization Engine
              </button>
            </div>
            <button className="rt-btn rt-btn-outline" onClick={() => navigate('/routing/optimization')}>
              ⚡ Launch Optimizer
            </button>
          </div>
        </div>

        {/* 2-Column Route Builder Workspace */}
        <div className="route-builder-layout">
          {/* Left Sidebar: Route Details & Stops Sequence */}
          <div className="route-sidebar-scroll">
            {/* Route Master Details Card */}
            <div className="rt-card">
              <div className="rt-card-header">
                <h3>
                  <span>📋</span> Route Parameters
                </h3>
                <span className="stops-counter-badge">{route.status}</span>
              </div>

              <div className="form-group-grid">
                <div className="form-field">
                  <label>Route ID</label>
                  <input type="text" value={route.routeId} readOnly />
                </div>
                <div className="form-field">
                  <label>Start Time</label>
                  <input
                    type="text"
                    value={route.startTime}
                    onChange={(e) => setRoute({ ...route, startTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field" style={{ marginTop: '10px' }}>
                <label>Origin Depot / Facility</label>
                <select
                  value={route.startDepot}
                  onChange={(e) => setRoute({ ...route, startDepot: e.target.value })}
                >
                  {availableDepots.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-field" style={{ marginTop: '10px' }}>
                <label>Assigned Vehicle</label>
                <select
                  value={route.assignedVehicle}
                  onChange={(e) => setRoute({ ...route, assignedVehicle: e.target.value })}
                >
                  {availableVehicles.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-field" style={{ marginTop: '10px' }}>
                <label>Assigned Driver</label>
                <select
                  value={route.assignedDriver}
                  onChange={(e) => setRoute({ ...route, assignedDriver: e.target.value })}
                >
                  {availableDrivers.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stops Sequence Card */}
            <div className="rt-card">
              <div className="stops-sequence-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Stops on this Route</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--rt-text-muted)' }}>
                    {stops.length} Total Waypoints
                  </span>
                </div>
                <button
                  className="rt-btn rt-btn-primary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  + Add Stop
                </button>
              </div>

              <div className="stops-list" style={{ marginTop: '12px' }}>
                {stops.map((stop, idx) => {
                  const isDepot = stop.type.includes('depot');
                  return (
                    <div
                      key={stop.id}
                      className={`stop-item-card ${
                        isDepot
                          ? 'is-depot'
                          : stop.type === 'pickup'
                          ? 'is-pickup'
                          : 'is-delivery'
                      }`}
                      onMouseEnter={() => setHoveredStop(stop)}
                      onMouseLeave={() => setHoveredStop(null)}
                      onClick={() => setSelectedPin(stop)}
                    >
                      <div className="stop-card-top">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="stop-index-pill">{stop.order}</span>
                          <div>
                            <div className="stop-name">{stop.name}</div>
                            <div className="stop-address">{stop.address}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className={`stop-type-tag ${
                            isDepot ? 'tag-depot' : stop.type === 'pickup' ? 'tag-pickup' : 'tag-delivery'
                          }`}>
                            {stop.type.replace('_', ' ')}
                          </span>

                          {!isDepot && (
                            <div className="stop-actions">
                              <button
                                className="stop-action-btn"
                                title="Move Up"
                                disabled={idx === 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStop(idx, -1);
                                }}
                              >
                                ▲
                              </button>
                              <button
                                className="stop-action-btn"
                                title="Move Down"
                                disabled={idx === stops.length - 2}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStop(idx, 1);
                                }}
                              >
                                ▼
                              </button>
                              <button
                                className="stop-action-btn delete"
                                title="Remove Stop"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveStop(stop.id);
                                }}
                              >
                                ×
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="stop-meta-chips">
                        <span className="stop-chip">🕒 Window: {stop.timeWindow}</span>
                        {stop.items > 0 && <span className="stop-chip">📦 {stop.items} Items</span>}
                        {stop.weightKg > 0 && <span className="stop-chip">⚖️ {stop.weightKg} kg</span>}
                        {stop.volumeCbm > 0 && <span className="stop-chip">📐 {stop.volumeCbm} m³</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Section: Interactive SVG Route Map & Performance Matrix */}
          <div className="map-visualizer-container">
            {/* Interactive Vector Map Canvas */}
            <div className="interactive-map-canvas">
              <svg className="map-svg-layer" viewBox="0 0 620 380" preserveAspectRatio="none">
                {/* Background Grid Roads */}
                <line x1="0" y1="90" x2="620" y2="90" className="map-road-grid" />
                <line x1="0" y1="180" x2="620" y2="180" className="map-road-grid" />
                <line x1="0" y1="270" x2="620" y2="270" className="map-road-grid" />
                <line x1="160" y1="0" x2="160" y2="380" className="map-road-grid" />
                <line x1="320" y1="0" x2="320" y2="380" className="map-road-grid" />
                <line x1="480" y1="0" x2="480" y2="380" className="map-road-grid" />

                {/* Major Highways */}
                <path d="M 0 140 Q 280 20 620 180" className="map-highway" />
                <path d="M 80 380 Q 300 240 560 0" className="map-highway" />

                {/* Active Connected Route Line */}
                <path d={pathD} className="map-route-line" />

                {/* Render Stop Nodes */}
                {stops.map((stop, i) => {
                  const isDepot = stop.type.includes('depot');
                  const isSelected = selectedPin?.id === stop.id || hoveredStop?.id === stop.id;
                  const pinColor = stop.type === 'depot_start' ? '#10b981' : stop.type === 'depot_end' ? '#ef4444' : '#2563eb';

                  return (
                    <g
                      key={stop.id}
                      className="map-pin"
                      onClick={() => setSelectedPin(stop)}
                    >
                      {/* Pulse effect if selected */}
                      {isSelected && (
                        <circle
                          cx={stop.x}
                          cy={stop.y}
                          r="18"
                          fill={pinColor}
                          opacity="0.25"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={isDepot ? 14 : 11}
                        fill={pinColor}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                      />

                      {/* Label in circle */}
                      <text
                        x={stop.x}
                        y={stop.y + 4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={isDepot ? '10px' : '9px'}
                        fontWeight="700"
                      >
                        {isDepot ? (stop.type === 'depot_start' ? 'D' : 'E') : stop.order}
                      </text>

                      {/* Distance / ETA pill along path */}
                      {i < stops.length - 1 && (
                        <g>
                          <rect
                            x={(stop.x + stops[i + 1].x) / 2 - 24}
                            y={(stop.y + stops[i + 1].y) / 2 - 9}
                            width="48"
                            height="18"
                            rx="4"
                            fill="#ffffff"
                            stroke="#cbd5e1"
                            strokeWidth="1"
                          />
                          <text
                            x={(stop.x + stops[i + 1].x) / 2}
                            y={(stop.y + stops[i + 1].y) / 2 + 4}
                            textAnchor="middle"
                            fill="#334155"
                            fontSize="8px"
                            fontWeight="600"
                          >
                            {Math.round(28 + i * 8)} km
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* HUD Overlay */}
              <div className="map-overlay-hud">
                <div className="hud-item">
                  <span className="hud-dot" style={{ background: '#10b981' }} />
                  <span>Start: Origin Depot</span>
                </div>
                <div className="hud-item">
                  <span className="hud-dot" style={{ background: '#2563eb' }} />
                  <span>Intermediate Multi-Stops</span>
                </div>
                <div className="hud-item">
                  <span className="hud-dot" style={{ background: '#ef4444' }} />
                  <span>End: Return Depot</span>
                </div>
              </div>

              {/* Stop Popup Card */}
              {selectedPin && (
                <div className="map-stop-popup">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#0f172a' }}>Stop #{selectedPin.order}: {selectedPin.name}</strong>
                    <button
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: '#94a3b8' }}
                      onClick={() => setSelectedPin(null)}
                    >
                      ×
                    </button>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '6px' }}>{selectedPin.address}</div>
                  <div style={{ fontSize: '0.75rem', color: '#334155' }}>
                    <div>🕒 <strong>Window:</strong> {selectedPin.timeWindow}</div>
                    <div>👤 <strong>Contact:</strong> {selectedPin.contact} ({selectedPin.phone})</div>
                    <div>📦 <strong>Payload:</strong> {selectedPin.weightKg} kg | {selectedPin.volumeCbm} m³</div>
                  </div>
                </div>
              )}
            </div>

            {/* Route Summary KPI Matrix */}
            <div className="route-kpi-matrix">
              <div className="kpi-tile">
                <div className="kpi-tile-lbl">Total Distance</div>
                <div className="kpi-tile-val">{route.totalDistanceKm} km</div>
                <div className="kpi-tile-sub">✓ Highway Optimized</div>
              </div>

              <div className="kpi-tile">
                <div className="kpi-tile-lbl">Est. Duration</div>
                <div className="kpi-tile-val">{route.estimatedDuration}</div>
                <div className="kpi-tile-sub">Traffic Buffer Included</div>
              </div>

              <div className="kpi-tile">
                <div className="kpi-tile-lbl">Stops Count</div>
                <div className="kpi-tile-val">{stops.length} Stops</div>
                <div className="kpi-tile-sub">{stops.filter(s => s.type === 'delivery').length} Deliveries</div>
              </div>

              <div className="kpi-tile">
                <div className="kpi-tile-lbl">Weight Utilization</div>
                <div className="kpi-tile-val" style={{ color: '#2563eb' }}>{route.weightUtilizationPct}%</div>
                <div className="kpi-tile-sub">2,810 / 5,000 kg</div>
              </div>

              <div className="kpi-tile">
                <div className="kpi-tile-lbl">Estimated Cost</div>
                <div className="kpi-tile-val" style={{ color: '#059669' }}>${route.estimatedCost}</div>
                <div className="kpi-tile-sub">Fuel & Tolls Calculated</div>
              </div>

              <div className="kpi-tile">
                <div className="kpi-tile-lbl">Efficiency Score</div>
                <div className="kpi-tile-val" style={{ color: '#7c3aed' }}>{route.efficiencyScore} / 100</div>
                <div className="kpi-tile-sub">Top Tier Rating</div>
              </div>
            </div>

            {/* Constraints & Compliance Checkers */}
            <div className="rt-card">
              <div className="rt-card-header">
                <h3>
                  <span>🛡️</span> Regulatory & Route Feasibility Checklist
                </h3>
                <span className="stops-counter-badge" style={{ background: '#ecfdf5', color: '#059669' }}>
                  All 6 Constraints Validated
                </span>
              </div>

              <div className="compliance-checklist">
                {routeComplianceRules.map((rule) => (
                  <div key={rule.id} className="compliance-item">
                    <span className="check-icon">✓</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{rule.label}</div>
                      <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{rule.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="rt-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="rt-btn rt-btn-secondary"
                  onClick={() => setStops(initialRouteData.stops)}
                >
                  Reset Sequence
                </button>
                <button
                  className="rt-btn rt-btn-outline"
                  onClick={handleAutoReorderAI}
                >
                  ⚡ AI Route Auto-Sequence
                </button>
                <button
                  className="rt-btn rt-btn-secondary"
                  onClick={() => alert(`Cost Breakdown for ${route.routeId}:\n- Base Haul: $120\n- Fuel Surcharge: $45\n- Toll Passes: $24\nTotal: $${route.estimatedCost}`)}
                >
                  💵 Cost Breakdown
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="rt-btn rt-btn-secondary"
                  onClick={() => alert('Printing Manifest & Driver Turn-by-Turn Waybill...')}
                >
                  🖨️ Export Turn-by-Turn
                </button>
                <button
                  className="rt-btn rt-btn-primary"
                  onClick={() => {
                    setRoute(prev => ({ ...prev, status: 'Active Dispatched' }));
                    alert(`Route ${route.routeId} successfully dispatched to driver ${route.assignedDriver}!`);
                  }}
                >
                  🚀 Dispatch to Driver
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Stop Modal Dialog */}
        {isAddModalOpen && (
          <div className="rt-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
            <div className="rt-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Add New Stop</h3>
                <button
                  style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddStopSubmit}>
                <div className="form-field" style={{ marginBottom: '12px' }}>
                  <label>Customer / Facility Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Metro Distribution Hub"
                    value={newStop.name}
                    onChange={(e) => setNewStop({ ...newStop, name: e.target.value })}
                  />
                </div>

                <div className="form-field" style={{ marginBottom: '12px' }}>
                  <label>Full Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 450 Logistics Park, Gate 4"
                    value={newStop.address}
                    onChange={(e) => setNewStop({ ...newStop, address: e.target.value })}
                  />
                </div>

                <div className="form-group-grid" style={{ marginBottom: '12px' }}>
                  <div className="form-field">
                    <label>Stop Type</label>
                    <select
                      value={newStop.type}
                      onChange={(e) => setNewStop({ ...newStop, type: e.target.value })}
                    >
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Time Window</label>
                    <input
                      type="text"
                      value={newStop.timeWindow}
                      onChange={(e) => setNewStop({ ...newStop, timeWindow: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-grid" style={{ marginBottom: '12px' }}>
                  <div className="form-field">
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      value={newStop.weightKg}
                      onChange={(e) => setNewStop({ ...newStop, weightKg: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Volume (m³)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newStop.volumeCbm}
                      onChange={(e) => setNewStop({ ...newStop, volumeCbm: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-grid" style={{ marginBottom: '16px' }}>
                  <div className="form-field">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Green"
                      value={newStop.contact}
                      onChange={(e) => setNewStop({ ...newStop, contact: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Contact Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. +1 (555) 123-4567"
                      value={newStop.phone}
                      onChange={(e) => setNewStop({ ...newStop, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    type="button"
                    className="rt-btn rt-btn-secondary"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="rt-btn rt-btn-primary">
                    Confirm & Insert Stop
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RouteBuilder;
