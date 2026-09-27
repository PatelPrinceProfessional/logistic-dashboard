import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { fleetVehicles, fleetDrivers, waitingTripsQueue, initialGanttSchedule } from '../../utils/mockData/dispatchData';
import './Dispatch.css';

const allTimeSlots = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
const morningSlots = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
const afternoonSlots = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

const DispatchBoard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gantt'); // 'gantt' | 'list'
  const [activeShift, setActiveShift] = useState('full'); // 'morning' | 'afternoon' | 'full'
  const [resourceTab, setResourceTab] = useState('trips'); // 'trips' | 'vehicles' | 'drivers'
  const [ganttSchedule, setGanttSchedule] = useState(initialGanttSchedule);
  const [waitingTrips, setWaitingTrips] = useState(waitingTripsQueue);
  const [selectedTrip, setSelectedTrip] = useState(waitingTripsQueue[0]);
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState('All');

  // Modals
  const [assignModalTrip, setAssignModalTrip] = useState(null);
  const [targetVehicleId, setTargetVehicleId] = useState(fleetVehicles[0].id);
  const [scheduledStartTime, setScheduledStartTime] = useState('14:00');
  const [clickedBlock, setClickedBlock] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Determine active time slots based on shift
  const currentSlots = activeShift === 'morning' ? morningSlots : activeShift === 'afternoon' ? afternoonSlots : allTimeSlots;
  const shiftStartHour = activeShift === 'morning' ? 6.0 : activeShift === 'afternoon' ? 14.0 : 6.0;
  const shiftTotalHours = activeShift === 'full' ? 16.0 : 8.0;

  // Filter Gantt rows by vehicle type
  const filteredGanttRows = ganttSchedule.filter(row => {
    if (selectedVehicleFilter === 'All') return true;
    return row.vehicleType.toLowerCase().includes(selectedVehicleFilter.toLowerCase());
  });

  // Open Assign Modal
  const openAssignModal = (trip) => {
    setAssignModalTrip(trip);
    setTargetVehicleId(fleetVehicles[0].id);
    setScheduledStartTime('14:00');
  };

  // Confirm Manual Schedule Assignment
  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    if (!assignModalTrip) return;

    const startH = parseFloat(scheduledStartTime.replace(':', '.')) || 14.0;
    const durationH = parseFloat(assignModalTrip.estDuration) || 4.5;

    // Create new block
    const newBlock = {
      id: `b-${Date.now()}`,
      type: 'trip',
      title: `${assignModalTrip.id}: ${assignModalTrip.destination}`,
      startHour: startH,
      durationHours: durationH,
      startStr: scheduledStartTime,
      endStr: `${Math.floor(startH + durationH)}:00`,
      tripId: assignModalTrip.id,
      stops: assignModalTrip.stops,
      weight: `${assignModalTrip.weightKg.toLocaleString()} kg`,
      color: '#10b981',
    };

    // Add block to target vehicle
    const updated = ganttSchedule.map(row => {
      if (row.vehicleId === targetVehicleId) {
        return {
          ...row,
          blocks: [...row.blocks, newBlock],
        };
      }
      return row;
    });

    setGanttSchedule(updated);
    setWaitingTrips(waitingTrips.filter(t => t.id !== assignModalTrip.id));
    setAssignModalTrip(null);

    alert(`🎉 Trip ${assignModalTrip.id} scheduled onto vehicle ${targetVehicleId} starting at ${scheduledStartTime}!`);
  };

  // Remove / Cancel a scheduled block
  const handleRemoveBlock = (block, vehicleRow) => {
    const updated = ganttSchedule.map(row => {
      if (row.vehicleId === vehicleRow.vehicleId) {
        return {
          ...row,
          blocks: row.blocks.filter(b => b.id !== block.id),
        };
      }
      return row;
    });

    setGanttSchedule(updated);
    setClickedBlock(null);

    // If it was a trip, return to waiting queue
    if (block.tripId) {
      const restored = {
        id: block.tripId,
        shipmentsCount: 3,
        shipmentIds: ['SHP-100299'],
        weightKg: parseInt(block.weight) || 2500,
        volumeCbm: 10.0,
        stops: block.stops || 3,
        origin: 'Central Hub Depot #1',
        destination: block.title.split(': ')[1] || 'Metro Zone',
        serviceType: 'Standard Distribution',
        urgency: 'Medium',
        estDuration: `${block.durationHours}h`,
        estCost: 210,
        revenue: 330,
        profitMargin: 120,
        distanceKm: 160,
        specialRequirements: ['General Cargo'],
      };
      setWaitingTrips([restored, ...waitingTrips]);
      alert(`Trip ${block.tripId} unassigned from ${vehicleRow.registration} and returned to the waiting queue.`);
    }
  };

  // Bulk Dispatch
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
              <span>🚚</span> Real-Time Dispatch Board & Fleet Control
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
              LEFT SIDEBAR: RESOURCES & READY QUEUE (20%)
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
                Waiting Trips ({waitingTrips.length})
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
                    ✓ All trips have been assigned.
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
                            openAssignModal(trip);
                          }}
                        >
                          + Schedule
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
                      Cap: {v.capacityKg.toLocaleString()} kg | Fuel: {v.fuelPct}%
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
                      Unit: <strong>{d.assignedVehicle}</strong> | HOS: <strong>{d.hoursLeft}</strong>
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
            {/* Timeline Controls Bar */}
            <div className="gantt-controls-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Shift:</span>
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
                    Full 24h
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                  className="proc-select"
                  value={selectedVehicleFilter}
                  onChange={(e) => setSelectedVehicleFilter(e.target.value)}
                >
                  <option value="All">All Vehicle Types</option>
                  <option value="Box Truck">Box Trucks</option>
                  <option value="Multi-Axle">Multi-Axle Trailers</option>
                  <option value="Van">Sprinter Vans</option>
                </select>

                <div className="gantt-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#0284c7' }} />
                    <span>Inspection</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#10b981' }} />
                    <span>In Transit</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }} />
                    <span>Break</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#06b6d4' }} />
                    <span>Return</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gantt Timeline Chart Matrix */}
            <div className="gantt-chart-wrapper">
              {/* Header Hours Grid */}
              <div className="gantt-timeline-header">
                <div style={{ paddingLeft: '14px', textAlign: 'left' }}>Fleet Vehicle / Driver</div>
                {currentSlots.map((slot) => (
                  <div key={slot}>{slot}</div>
                ))}
              </div>

              {/* Rows per Vehicle */}
              {filteredGanttRows.map((row) => (
                <div key={row.vehicleId} className="gantt-vehicle-row">
                  {/* Left Column: Vehicle & Driver info */}
                  <div className="gantt-row-vehicle-info">
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{row.registration}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--disp-text-muted)' }}>
                      👤 {row.driver} ({row.vehicleType})
                    </div>
                  </div>

                  {/* Right Track: Timeline Blocks */}
                  <div
                    className="gantt-row-timeline-track"
                    title="Click on empty track to schedule a trip"
                    onClick={() => {
                      if (waitingTrips.length > 0) {
                        setAssignModalTrip(waitingTrips[0]);
                        setTargetVehicleId(row.vehicleId);
                      }
                    }}
                  >
                    {row.blocks.map((block) => {
                      // Calculate position based on active shift window
                      const leftPct = Math.max(0, ((block.startHour - shiftStartHour) / shiftTotalHours) * 100);
                      const widthPct = Math.min(100 - leftPct, (block.durationHours / shiftTotalHours) * 100);

                      if (block.startHour + block.durationHours < shiftStartHour || block.startHour > shiftStartHour + shiftTotalHours) {
                        return null; // Outside shift window
                      }

                      return (
                        <div
                          key={block.id}
                          className="gantt-block-bar"
                          style={{
                            left: `${leftPct}%`,
                            width: `${widthPct}%`,
                            backgroundColor: block.color,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setClickedBlock({ block, vehicleRow: row });
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
                    onClick={() => openAssignModal(selectedTrip)}
                  >
                    🚀 Schedule & Dispatch Trip
                  </button>
                  <button
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                    onClick={() => setIsMapModalOpen(true)}
                  >
                    🗺️ Preview Route on Map
                  </button>
                  <button
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                    onClick={() => setIsPrintModalOpen(true)}
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

        {/* ==========================================================================
            MODAL 1: SCHEDULE ASSIGNMENT DIALOG
            ========================================================================== */}
        {assignModalTrip && (
          <div className="disp-modal-backdrop" onClick={() => setAssignModalTrip(null)}>
            <div className="disp-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  Assign & Dispatch Trip: {assignModalTrip.id}
                </h3>
                <button
                  style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
                  onClick={() => setAssignModalTrip(null)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleConfirmSchedule}>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--disp-border)', marginBottom: '16px', fontSize: '0.825rem' }}>
                  <div>📍 <strong>Route:</strong> {assignModalTrip.origin} → {assignModalTrip.destination}</div>
                  <div>📦 <strong>Payload:</strong> {assignModalTrip.weightKg.toLocaleString()} kg | {assignModalTrip.stops} Stops</div>
                  <div>💵 <strong>Est. Margin:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>+${assignModalTrip.profitMargin}</span></div>
                </div>

                <div className="form-field" style={{ marginBottom: '12px' }}>
                  <label>Assign to Vehicle & Driver</label>
                  <select
                    className="proc-select"
                    value={targetVehicleId}
                    onChange={(e) => setTargetVehicleId(e.target.value)}
                  >
                    {fleetVehicles.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.registration} ({v.type}) — Driver: {v.driver} [{v.status}]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field" style={{ marginBottom: '16px' }}>
                  <label>Scheduled Departure Time</label>
                  <select
                    className="proc-select"
                    value={scheduledStartTime}
                    onChange={(e) => setScheduledStartTime(e.target.value)}
                  >
                    <option value="08:00">08:00 (Morning Run)</option>
                    <option value="10:30">10:30 (Mid-Day Run)</option>
                    <option value="14:00">14:00 (Afternoon Run)</option>
                    <option value="16:30">16:30 (Evening Express)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                    onClick={() => setAssignModalTrip(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="tender-action-btn btn-award" style={{ padding: '8px 20px' }}>
                    Confirm & Add to Gantt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==========================================================================
            MODAL 2: GANTT BLOCK INSPECTOR & REMOVAL
            ========================================================================== */}
        {clickedBlock && (
          <div className="disp-modal-backdrop" onClick={() => setClickedBlock(null)}>
            <div className="disp-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  Gantt Schedule Block Details
                </h3>
                <button
                  style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
                  onClick={() => setClickedBlock(null)}
                >
                  ×
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px' }}>
                <div><strong>Activity:</strong> {clickedBlock.block.title}</div>
                <div><strong>Vehicle:</strong> {clickedBlock.vehicleRow.registration} ({clickedBlock.vehicleRow.vehicleType})</div>
                <div><strong>Driver:</strong> {clickedBlock.vehicleRow.driver}</div>
                <div><strong>Time Window:</strong> {clickedBlock.block.startStr} - {clickedBlock.block.endStr} ({clickedBlock.block.durationHours} Hours)</div>
                {clickedBlock.block.weight && <div><strong>Payload Weight:</strong> {clickedBlock.block.weight}</div>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {clickedBlock.block.tripId ? (
                  <button
                    className="tender-action-btn btn-retender"
                    style={{ padding: '8px 14px' }}
                    onClick={() => handleRemoveBlock(clickedBlock.block, clickedBlock.vehicleRow)}
                  >
                    Unassign & Return to Queue
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="tender-action-btn"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 14px' }}
                    onClick={() => setClickedBlock(null)}
                  >
                    Close
                  </button>
                  {clickedBlock.block.tripId && (
                    <button
                      className="tender-action-btn btn-evaluate"
                      style={{ padding: '8px 16px' }}
                      onClick={() => navigate(`/dispatch/trips/${clickedBlock.block.tripId}`)}
                    >
                      View Live Telemetry
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================================================
            MODAL 3: PRINTABLE MANIFEST SHEET
            ========================================================================== */}
        {isPrintModalOpen && selectedTrip && (
          <div className="disp-modal-backdrop" onClick={() => setIsPrintModalOpen(false)}>
            <div className="disp-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--disp-border)', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  Driver Dispatch Manifest: {selectedTrip.id}
                </h3>
                <button
                  style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
                  onClick={() => setIsPrintModalOpen(false)}
                >
                  ×
                </button>
              </div>

              <div style={{ padding: '16px', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#ffffff', fontSize: '0.825rem', lineHeight: '1.6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px', marginBottom: '10px' }}>
                  <div>
                    <strong>LogisticsHub Fleet Dispatch Operations</strong><br />
                    <span>Gate Terminal Inbound / Outbound</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>BARCODE: ||||||| |||| |||||</strong><br />
                    <span>ID: {selectedTrip.id}</span>
                  </div>
                </div>

                <div><strong>Route Corridor:</strong> {selectedTrip.origin} → {selectedTrip.destination}</div>
                <div><strong>Stops Total:</strong> {selectedTrip.stops} Delivery Waypoints</div>
                <div><strong>Gross Payload:</strong> {selectedTrip.weightKg.toLocaleString()} kg ({selectedTrip.volumeCbm} m³)</div>
                <div><strong>Special Protocols:</strong> {selectedTrip.specialRequirements.join(', ')}</div>

                <div style={{ marginTop: '20px', borderTop: '1px solid #0f172a', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Driver Signature: _______________________</span>
                  <span>Dispatcher Seal: ✓ APPROVED</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                  onClick={() => setIsPrintModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="tender-action-btn btn-award"
                  style={{ padding: '8px 20px' }}
                  onClick={() => {
                    alert('Print command sent to warehouse dock printer.');
                    setIsPrintModalOpen(false);
                  }}
                >
                  🖨️ Send to Dock Printer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================================================
            MODAL 4: ROUTE MAP PREVIEW
            ========================================================================== */}
        {isMapModalOpen && selectedTrip && (
          <div className="disp-modal-backdrop" onClick={() => setIsMapModalOpen(false)}>
            <div className="disp-modal-dialog" style={{ width: '700px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  Route Map Corridor: {selectedTrip.origin} → {selectedTrip.destination}
                </h3>
                <button
                  style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
                  onClick={() => setIsMapModalOpen(false)}
                >
                  ×
                </button>
              </div>

              <div style={{ height: '320px', background: '#f8fafc', border: '1px solid var(--disp-border)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 300">
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#e2e8f0" strokeWidth="1" />
                  <path d="M 50 150 Q 250 50 450 180" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="6 3" />
                  <circle cx="50" cy="150" r="12" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <text x="50" y="154" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="700">D</text>
                  <circle cx="240" cy="100" r="10" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                  <text x="240" y="104" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="700">1</text>
                  <circle cx="360" cy="140" r="10" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                  <text x="360" y="144" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="700">2</text>
                  <circle cx="450" cy="180" r="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text x="450" y="184" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="700">E</text>
                </svg>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                  onClick={() => setIsMapModalOpen(false)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DispatchBoard;
