import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { fleetVehicles, fleetDrivers, waitingTripsQueue, initialGanttSchedule } from '../../utils/mockData/dispatchData';
import './Dispatch.css';

const timeSlots = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

const DispatchBoard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gantt'); // 'gantt' | 'list' | 'map'
  const [activeShift, setActiveShift] = useState('full'); // 'morning' | 'afternoon' | 'full'
  const [resourceTab, setResourceTab] = useState('trips'); // 'trips' | 'vehicles' | 'drivers'
  const [ganttSchedule, setGanttSchedule] = useState(initialGanttSchedule);
  const [waitingTrips, setWaitingTrips] = useState(waitingTripsQueue);
  const [selectedTrip, setSelectedTrip] = useState(waitingTripsQueue[0]);
  const [hoveredBlock, setHoveredBlock] = useState(null);

  // Quick Dispatch single trip
  const handleDispatchTrip = (trip) => {
    // Remove from waiting queue
    setWaitingTrips(waitingTrips.filter(t => t.id !== trip.id));

    // Add to first available vehicle in Gantt
    const updatedGantt = [...ganttSchedule];
    const targetVehicle = updatedGantt[0];
    const newBlock = {
      id: `b-${Date.now()}`,
      type: 'trip',
      title: `${trip.id}: ${trip.destination}`,
      startHour: 14.0,
      durationHours: 4.0,
      startStr: '14:00',
      endStr: '18:00',
      tripId: trip.id,
      stops: trip.stops,
      weight: `${trip.weightKg} kg`,
      color: '#10b981',
    };
    targetVehicle.blocks.push(newBlock);
    setGanttSchedule(updatedGantt);

    alert(`🚀 Trip ${trip.id} dispatched successfully to ${targetVehicle.driver} (${targetVehicle.registration})!`);
  };

  // Bulk Dispatch all ready trips
  const handleBulkDispatchAll = () => {
    if (waitingTrips.length === 0) {
      alert('All pending trips have already been scheduled and dispatched!');
      return;
    }
    alert(`⚡ Successfully auto-scheduled and dispatched all ${waitingTrips.length} waiting trips across available fleet!`);
    setWaitingTrips([]);
  };

  return (
    <Layout activePage="dispatch">
      <div className="dispatch-container">
        {/* Header */}
        <div className="dispatch-header">
          <div className="disp-title-group">
            <h1>
              <span>🚚</span> Real-Time Dispatch Board
            </h1>
            <p>Interactive multi-vehicle Gantt scheduling, driver certification compliance, and real-time trip dispatch control</p>
          </div>

          <div className="disp-header-actions">
            <div className="disp-nav-tabs">
              <button
                className={`disp-nav-tab ${activeTab === 'gantt' ? 'active' : ''}`}
                onClick={() => setActiveTab('gantt')}
              >
                Gantt Timeline
              </button>
              <button
                className={`disp-nav-tab ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => navigate('/dispatch/trips')}
              >
                Active Trips Registry
              </button>
            </div>

            <button
              className="tender-action-btn btn-award"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={handleBulkDispatchAll}
            >
              ⚡ Dispatch All Ready
            </button>
          </div>
        </div>

        {/* 3-Panel Main Layout */}
        <div className="dispatch-workbench-layout">
          {/* ==========================================================================
              LEFT SIDEBAR: RESOURCES & READY QUEUE
              ========================================================================== */}
          <div className="disp-card resource-sidebar">
            <div className="disp-card-header">
              <h3>
                <span>📦</span> Resource Queue
              </h3>
              <span className="disp-badge-counter">
                {resourceTab === 'trips' ? `${waitingTrips.length} Trips` : resourceTab === 'vehicles' ? `${fleetVehicles.length} Trucks` : `${fleetDrivers.length} Drivers`}
              </span>
            </div>

            <div className="resource-tab-buttons">
              <button
                className={`resource-tab-btn ${resourceTab === 'trips' ? 'active' : ''}`}
                onClick={() => setResourceTab('trips')}
              >
                Ready Trips ({waitingTrips.length})
              </button>
              <button
                className={`resource-tab-btn ${resourceTab === 'vehicles' ? 'active' : ''}`}
                onClick={() => setResourceTab('vehicles')}
              >
                Vehicles ({fleetVehicles.length})
              </button>
              <button
                className={`resource-tab-btn ${resourceTab === 'drivers' ? 'active' : ''}`}
                onClick={() => setResourceTab('drivers')}
              >
                Drivers ({fleetDrivers.length})
              </button>
            </div>

            {/* Tab 1: Trips Awaiting Assignment */}
            {resourceTab === 'trips' && (
              <div>
                {waitingTrips.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--disp-text-muted)', padding: '24px 0', fontSize: '0.85rem' }}>
                    ✓ No unassigned trips in queue.
                  </div>
                ) : (
                  waitingTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className={`waiting-trip-card ${selectedTrip?.id === trip.id ? 'selected' : ''}`}
                      onClick={() => setSelectedTrip(trip)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--disp-primary)' }}>{trip.id}</span>
                        <span className={`status-pill ${trip.urgency === 'Urgent' ? 'status-break' : 'status-ready'}`}>
                          {trip.urgency}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                        {trip.origin} → {trip.destination}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--disp-text-muted)' }}>
                        <span>📍 {trip.stops} Stops</span>
                        <span>⚖️ {trip.weightKg} kg</span>
                        <span>⏱️ {trip.estDuration}</span>
                      </div>

                      <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700 }}>Margin: +${trip.profitMargin}</span>
                        <button
                          className="tender-action-btn btn-award"
                          style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDispatchTrip(trip);
                          }}
                        >
                          + Assign
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Fleet Vehicles */}
            {resourceTab === 'vehicles' && (
              <div>
                {fleetVehicles.map((v) => (
                  <div key={v.id} className="resource-item-card">
                    <div className="resource-item-top">
                      <span className="vehicle-reg-code">{v.registration}</span>
                      <span className={`status-pill ${
                        v.status === 'Ready' ? 'status-ready' : v.status === 'On Trip' ? 'status-ontrip' : v.status === 'On Break' ? 'status-break' : 'status-offduty'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                    <div className="resource-meta-text">
                      Type: <strong>{v.type}</strong> | Driver: <strong>{v.driver}</strong>
                    </div>
                    <div className="resource-meta-text" style={{ marginTop: '2px' }}>
                      Cap: {v.capacityKg.toLocaleString()} kg | Last: {v.lastLocation}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Drivers */}
            {resourceTab === 'drivers' && (
              <div>
                {fleetDrivers.map((d) => (
                  <div key={d.id} className="resource-item-card">
                    <div className="resource-item-top">
                      <span className="vehicle-reg-code">{d.name}</span>
                      <span className={`status-pill ${d.status === 'On Duty' || d.status === 'Available' ? 'status-ready' : 'status-break'}`}>
                        {d.status}
                      </span>
                    </div>
                    <div className="resource-meta-text">
                      Vehicle: <strong>{d.assignedVehicle}</strong> | HOS Left: <strong>{d.hoursLeft}</strong>
                    </div>
                    <div className="resource-meta-text" style={{ marginTop: '2px' }}>
                      Certs: {d.certs.join(', ')} | ⭐ {d.rating}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ==========================================================================
              CENTER SECTION: GANTT TIMELINE SCHEDULE (60%)
              ========================================================================== */}
          <div className="gantt-section-container">
            {/* Timeline Controls & Legend Bar */}
            <div className="gantt-controls-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Shift View:</span>
                <div className="shift-selector-pills">
                  <button
                    className={`shift-pill-btn ${activeShift === 'morning' ? 'active' : ''}`}
                    onClick={() => setActiveShift('morning')}
                  >
                    Morning (06:00 - 14:00)
                  </button>
                  <button
                    className={`shift-pill-btn ${activeShift === 'afternoon' ? 'active' : ''}`}
                    onClick={() => setActiveShift('afternoon')}
                  >
                    Afternoon (14:00 - 22:00)
                  </button>
                  <button
                    className={`shift-pill-btn ${activeShift === 'full' ? 'active' : ''}`}
                    onClick={() => setActiveShift('full')}
                  >
                    Full 24h Shift
                  </button>
                </div>
              </div>

              <div className="gantt-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#0284c7' }} />
                  <span>Pre-Trip Check</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#10b981' }} />
                  <span>Active Transit</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }} />
                  <span>Rest Break</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#06b6d4' }} />
                  <span>Depot Return</span>
                </div>
              </div>
            </div>

            {/* Gantt Timeline Chart Matrix */}
            <div className="gantt-chart-wrapper">
              {/* Header Hours Grid */}
              <div className="gantt-timeline-header">
                <div style={{ paddingLeft: '14px', textAlign: 'left' }}>Fleet Vehicle / Unit</div>
                {timeSlots.map((slot) => (
                  <div key={slot}>{slot}</div>
                ))}
              </div>

              {/* Rows per Vehicle */}
              {ganttSchedule.map((row) => (
                <div key={row.vehicleId} className="gantt-vehicle-row">
                  {/* Left Column: Vehicle & Driver info */}
                  <div className="gantt-row-vehicle-info">
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{row.registration}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--disp-text-muted)' }}>
                      👤 {row.driver} ({row.vehicleType})
                    </div>
                  </div>

                  {/* Right Track: Timeline Blocks */}
                  <div className="gantt-row-timeline-track">
                    {row.blocks.map((block) => {
                      // Calculate horizontal positioning relative to 06:00 (hour 6.0) to 22:00 (16 hour total window)
                      const leftPct = Math.max(0, ((block.startHour - 6.0) / 16.0) * 100);
                      const widthPct = Math.min(100 - leftPct, (block.durationHours / 16.0) * 100);

                      return (
                        <div
                          key={block.id}
                          className="gantt-block-bar"
                          style={{
                            left: `${leftPct}%`,
                            width: `${widthPct}%`,
                            backgroundColor: block.color,
                          }}
                          onMouseEnter={() => setHoveredBlock(block)}
                          onMouseLeave={() => setHoveredBlock(null)}
                          onClick={() => {
                            if (block.tripId) {
                              const found = waitingTripsQueue.find(t => t.id === block.tripId) || {
                                id: block.tripId,
                                shipmentsCount: 3,
                                weightKg: 3200,
                                volumeCbm: 14.0,
                                stops: block.stops || 4,
                                origin: 'Central Hub Depot #1',
                                destination: 'Metro North Plaza',
                                estDuration: `${block.durationHours}h`,
                                estCost: 245,
                                revenue: 310,
                                profitMargin: 65,
                                distanceKm: 165,
                                specialRequirements: ['On-Time SLA Guaranteed'],
                              };
                              setSelectedTrip(found);
                            }
                          }}
                        >
                          <span>{block.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==========================================================================
              RIGHT PANEL: TRIP INSPECTOR & DISPATCH ACTIONS (20%)
              ========================================================================== */}
          <div className="disp-card trip-inspector-container">
            <div className="disp-card-header">
              <h3>
                <span>🔍</span> Trip Inspector
              </h3>
              <span className="disp-badge-counter">{selectedTrip?.id || 'Select Trip'}</span>
            </div>

            {selectedTrip ? (
              <div>
                <div className="inspector-field-group">
                  <div className="inspector-lbl">Routing Corridor</div>
                  <div className="inspector-val">{selectedTrip.origin} → {selectedTrip.destination}</div>
                </div>

                <div className="inspector-field-group">
                  <div className="inspector-lbl">Payload Specifications</div>
                  <div style={{ fontSize: '0.8rem', color: '#0f172a' }}>
                    📦 <strong>{selectedTrip.shipmentsCount} Shipments</strong> | ⚖️ <strong>{selectedTrip.weightKg.toLocaleString()} kg</strong> | 📍 <strong>{selectedTrip.stops} Stops</strong>
                  </div>
                </div>

                <div className="inspector-field-group">
                  <div className="inspector-lbl">Compliance & Endorsements</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', background: '#ecfdf5', padding: '6px 8px', borderRadius: '4px', marginTop: '2px' }}>
                    ✓ Driver CDL-A Validated<br />
                    ✓ {selectedTrip.specialRequirements ? selectedTrip.specialRequirements.join(', ') : 'Standard Freight Clear'}
                  </div>
                </div>

                {/* Financial Metrics Box */}
                <div className="financial-metric-box">
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Est. Duration</span>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{selectedTrip.estDuration}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Route Distance</span>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{selectedTrip.distanceKm} km</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Operating Cost</span>
                    <div style={{ fontWeight: 800, color: '#ef4444' }}>${selectedTrip.estCost}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Net Margin</span>
                    <div style={{ fontWeight: 800, color: '#059669' }}>+${selectedTrip.profitMargin}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                  <button
                    className="tender-action-btn btn-award"
                    style={{ padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => handleDispatchTrip(selectedTrip)}
                  >
                    🚀 Dispatch Trip Now
                  </button>
                  <button
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                    onClick={() => navigate('/routing')}
                  >
                    🗺️ Preview Route on Map
                  </button>
                  <button
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                    onClick={() => alert(`Printing Driver Trip Sheet & ePOD Waybill for ${selectedTrip.id}...`)}
                  >
                    🖨️ Print Manifest Sheet
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--disp-text-muted)', padding: '24px 0', fontSize: '0.85rem' }}>
                Select a trip or Gantt block to inspect details.
              </div>
            )}
          </div>
        </div>

        {/* ==========================================================================
            BOTTOM BAR: FLEET KPI METRICS & BULK DISPATCH CONTROLS
            ========================================================================== */}
        <div className="dispatch-bottom-bar">
          <div className="bottom-kpi-stats">
            <div className="bottom-kpi-item">
              <span>Dispatched Today: </span>
              <strong>24 Trips</strong>
            </div>
            <div className="bottom-kpi-item">
              <span>Awaiting Dispatch: </span>
              <strong style={{ color: 'var(--disp-warning)' }}>{waitingTrips.length} Trips</strong>
            </div>
            <div className="bottom-kpi-item">
              <span>Active Fleet Trips: </span>
              <strong style={{ color: 'var(--disp-primary)' }}>45 Active</strong>
            </div>
            <div className="bottom-kpi-item">
              <span>Fleet Utilization: </span>
              <strong style={{ color: '#059669' }}>87.4%</strong>
            </div>
          </div>

          <div className="bottom-bulk-actions">
            <button
              className="tender-action-btn"
              style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 14px' }}
              onClick={() => alert('AI Scheduling Engine re-balanced Gantt timeline across available drivers.')}
            >
              🔄 AI Re-Balance Schedule
            </button>
            <button
              className="tender-action-btn btn-award"
              style={{ padding: '8px 18px' }}
              onClick={handleBulkDispatchAll}
            >
              ⚡ Dispatch All Ready Trips
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DispatchBoard;
