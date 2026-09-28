import { useState } from 'react';

export default function VehicleDetailModal({ vehicle, onClose, onUpdateVehicle }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    registration: vehicle?.registration || '',
    type: vehicle?.type || '',
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    status: vehicle?.status || 'Active',
    ownership: vehicle?.ownership || 'Company Owned',
    assignedDriverName: vehicle?.assignedDriver?.name || 'Unassigned',
  });

  if (!vehicle) return null;

  const handleSaveOverview = () => {
    onUpdateVehicle({
      ...vehicle,
      ...formData,
    });
    setIsEditing(false);
  };

  return (
    <div className="fleet-modal-backdrop" onClick={onClose}>
      <div className="fleet-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="fleet-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="fleet-reg-plate" style={{ fontSize: '15px' }}>{vehicle.registration}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>{vehicle.make} {vehicle.model}</h3>
                <span className={`fleet-status-pill ${vehicle.status.toLowerCase().replace(/\s+/g, '')}`}>
                  {vehicle.status}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>({vehicle.type})</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                VIN: <strong style={{ fontFamily: 'monospace' }}>{vehicle.vin || 'MAT612089N1A29014'}</strong> • Driver: <strong>{vehicle.assignedDriver?.name || 'Unassigned'}</strong>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: 'var(--color-text-tertiary)',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </div>

        {/* 8 Tab Navigation Bar */}
        <div className="fleet-modal-nav-tabs">
          {[
            { id: 'overview', label: '1. Overview & Specs' },
            { id: 'maintenance', label: '2. Maintenance & Service' },
            { id: 'documents', label: '3. Compliance & Docs' },
            { id: 'telematics', label: '4. Live Telematics & GPS' },
            { id: 'fuel', label: '5. Fuel & Energy' },
            { id: 'incidents', label: '6. Safety Incidents' },
            { id: 'costs', label: '7. TCO Operating Costs' },
            { id: 'audit', label: '8. Change Audit Log' },
          ].map((t) => (
            <button
              key={t.id}
              className={`fleet-modal-tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="fleet-modal-body">
          {/* ── TAB 1: OVERVIEW & SPECS ── */}
          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px' }}>
              {/* Left Column (35%) */}
              <div className="fleet-card-box">
                <div className="fleet-card-box-title">Vehicle Identity & Status</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Registration:</span>
                    <strong style={{ fontFamily: 'monospace' }}>{vehicle.registration}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Manufacturer:</span>
                    <strong>{vehicle.make}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Model / Trim:</span>
                    <strong>{vehicle.model}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Year of Manufacture:</span>
                    <strong>{vehicle.year}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Exterior Color:</span>
                    <strong>{vehicle.color}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Odometer Reading:</span>
                    <strong style={{ color: 'var(--color-primary-600)' }}>{vehicle.telematics?.odometerKm?.toLocaleString() || 184520} km</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Fleet Status:</span>
                    {isEditing ? (
                      <select
                        className="fleet-search-input"
                        style={{ width: '130px', padding: '4px 8px' }}
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Available">Available</option>
                        <option value="Breakdown">Breakdown</option>
                        <option value="Retired">Retired</option>
                      </select>
                    ) : (
                      <span className={`fleet-status-pill ${vehicle.status.toLowerCase().replace(/\s+/g, '')}`}>
                        {vehicle.status}
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={handleSaveOverview}>
                          Save Changes
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => setIsEditing(true)}>
                        Edit Vehicle Specs
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column (65%) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Capacity & Mechanical Specs Card */}
                <div className="fleet-card-box">
                  <div className="fleet-card-box-title">Payload Capacity & Engineering Specs</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '12px' }}>
                    <div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>Payload Capacity:</div>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#059669' }}>
                        {vehicle.specs?.payloadCapacityKg?.toLocaleString()} kg ({((vehicle.specs?.payloadCapacityKg || 7500) / 1000).toFixed(1)} MT)
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>Cargo Box Volume:</div>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#2563eb' }}>
                        {vehicle.specs?.volumeCapacityCbm} CBM
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>Exterior Dimensions:</div>
                      <div style={{ fontWeight: 700 }}>{vehicle.specs?.dimensions || '6.2m × 2.4m × 2.5m'}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>Axle Configuration:</div>
                      <div style={{ fontWeight: 700 }}>{vehicle.specs?.axles} Axles (GVW {vehicle.specs?.grossVehicleWeightKg?.toLocaleString()} kg)</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>Fuel / Powertrain:</div>
                      <div style={{ fontWeight: 700 }}>{vehicle.specs?.fuelType}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>Fuel Tank Capacity:</div>
                      <div style={{ fontWeight: 700 }}>{vehicle.specs?.fuelTankCapacityLiters} Liters</div>
                    </div>
                  </div>
                </div>

                {/* Driver Assignment & Ownership Card */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="fleet-card-box">
                    <div className="fleet-card-box-title">Active Driver Assignment</div>
                    {vehicle.assignedDriver ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                        <div style={{ fontWeight: 800, fontSize: '13px' }}>{vehicle.assignedDriver.name}</div>
                        <div style={{ color: 'var(--color-text-secondary)' }}>ID: {vehicle.assignedDriver.id} • Phone: {vehicle.assignedDriver.phone}</div>
                        <div style={{ color: 'var(--color-text-tertiary)', fontSize: '11px' }}>Assigned since {vehicle.assignedDriver.assignedSince}</div>
                        <button className="btn btn-secondary btn-sm" style={{ marginTop: '4px', alignSelf: 'flex-start' }} onClick={() => alert('Reassign driver modal opened.')}>
                          Reassign Driver
                        </button>
                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                        No driver assigned currently.
                        <button className="btn btn-primary btn-sm" style={{ display: 'block', marginTop: '6px' }} onClick={() => alert('Assign driver dialog.')}>
                          + Assign Driver
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="fleet-card-box">
                    <div className="fleet-card-box-title">Ownership & Lease Terms</div>
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontWeight: 700 }}>Ownership: {vehicle.ownership}</div>
                      {vehicle.leaseDetails ? (
                        <>
                          <div style={{ color: 'var(--color-text-secondary)' }}>Vendor: {vehicle.leaseDetails.leasedFrom}</div>
                          <div style={{ color: 'var(--color-text-secondary)' }}>Lease Period: {vehicle.leaseDetails.leaseStart} to {vehicle.leaseDetails.leaseEnd}</div>
                          <div style={{ fontWeight: 800, color: '#059669' }}>Monthly Payment: {vehicle.leaseDetails.monthlyPayment}</div>
                        </>
                      ) : (
                        <div style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                          Company asset fully depreciating under primary fleet ledger.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: MAINTENANCE & SERVICING ── */}
          {activeTab === 'maintenance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Upcoming Service Card */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div className="fleet-card-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e40af' }}>NEXT SCHEDULED PREVENTIVE SERVICE</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#1d4ed8', margin: '4px 0' }}>
                    {vehicle.service?.nextServiceDate || '2024-11-15'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#3b82f6' }}>
                    Target Odometer: <strong>{vehicle.service?.nextServiceDueKm?.toLocaleString()} km</strong> ({vehicle.service?.daysRemaining} days remaining)
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '8px' }} onClick={() => alert('Service appointment scheduler opened.')}>
                    📅 Schedule Workshop Bay
                  </button>
                </div>

                <div className="fleet-card-box">
                  <div className="fleet-card-box-title">Active Health & Wear Alerts</div>
                  {vehicle.service?.maintenanceAlerts?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {vehicle.service.maintenanceAlerts.map((alt, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '4px 8px', background: 'var(--color-bg-secondary)', borderRadius: '6px' }}>
                          <span>🔧 {alt.type}</span>
                          <strong style={{ color: alt.severity === 'Urgent' ? '#ef4444' : '#d97706' }}>{alt.dueIn}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>
                      ✨ All systems within green tolerance limits.
                    </div>
                  )}
                </div>
              </div>

              {/* Service History Ledger */}
              <div className="fleet-card-box">
                <div className="fleet-card-box-title">Historical Service & Maintenance Ledger</div>
                <div className="fleet-table-wrapper">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>Job ID</th>
                        <th>Date</th>
                        <th>Service Description</th>
                        <th>Workshop / Vendor</th>
                        <th>Cost</th>
                        <th>Odometer</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(vehicle.maintenanceHistory || [
                        { id: 'SRV-891', date: '2024-08-15', type: 'Preventive Major Service', vendor: 'Tata Authorized Service', cost: '₹14,500', odometer: '175,000 km', notes: 'Oil flush & filters.' },
                      ]).map((srv) => (
                        <tr key={srv.id}>
                          <td style={{ fontWeight: 700, color: 'var(--color-primary-600)' }}>{srv.id}</td>
                          <td>{srv.date}</td>
                          <td style={{ fontWeight: 600 }}>{srv.type}</td>
                          <td>{srv.vendor}</td>
                          <td style={{ fontWeight: 800, color: '#059669' }}>{srv.cost}</td>
                          <td>{srv.odometer}</td>
                          <td style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{srv.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: COMPLIANCE & DOCS ── */}
          {activeTab === 'documents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>Statutory Transport Documents & Permits</h4>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                    Regulatory compliance verified against National VAHAN & Sarathi databases.
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => alert('Document upload modal opened.')}>
                  + Upload Document
                </button>
              </div>

              <div className="fleet-table-wrapper">
                <table className="fleet-table">
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>Valid Until</th>
                      <th>Upload Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(vehicle.documents || [
                      { id: 'D1', name: 'Vehicle Registration Certificate (RC)', validUntil: '2036-04-12', status: 'Valid', uploadDate: '2021-04-12' },
                      { id: 'D2', name: 'Commercial Fleet Comprehensive Insurance', validUntil: '2025-04-11', status: 'Valid', uploadDate: '2024-04-05' },
                      { id: 'D3', name: 'Pollution Under Control (PUC)', validUntil: '2025-02-28', status: 'Valid', uploadDate: '2024-08-20' },
                      { id: 'D4', name: 'Statutory Fitness Certificate', validUntil: '2025-06-30', status: 'Valid', uploadDate: '2023-06-25' },
                    ]).map((doc) => (
                      <tr key={doc.id}>
                        <td style={{ fontWeight: 600 }}>📄 {doc.name}</td>
                        <td style={{ fontWeight: 700 }}>{doc.validUntil}</td>
                        <td>{doc.uploadDate}</td>
                        <td>
                          <span className="fleet-status-pill active">Valid</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn btn-secondary btn-sm" onClick={() => alert(`Downloading ${doc.name}`)}>
                              ⬇ PDF
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => alert(`Upload new renewal for ${doc.name}`)}>
                              Update
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 4: LIVE TELEMATICS & GPS ── */}
          {activeTab === 'telematics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="fleet-card-box" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: vehicle.telematics?.currentSpeedKmH > 0 ? '#2563eb' : '#64748b' }}>
                    {vehicle.telematics?.currentSpeedKmH || 0}
                    <span style={{ fontSize: '14px', color: '#64748b' }}> km/h</span>
                  </div>
                  <div className="fleet-stat-lbl">Real-Time GPS Speed</div>
                  <div style={{ fontSize: '10px', color: '#10b981', marginTop: '2px' }}>Heading {vehicle.telematics?.heading || 'North'}</div>
                </div>

                <div className="fleet-card-box" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#059669' }}>
                    {vehicle.telematics?.fuelLevelPct || 78}%
                  </div>
                  <div className="fleet-stat-lbl">Fuel / Battery Level</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Tank Capacity 160L</div>
                </div>

                <div className="fleet-card-box" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '8px', color: '#1e293b' }}>
                    {vehicle.telematics?.engineStatus || 'Running'}
                  </div>
                  <div className="fleet-stat-lbl">Ignition & Engine Status</div>
                  <div style={{ fontSize: '10px', color: '#10b981', marginTop: '2px' }}>Battery Health {vehicle.telematics?.batteryHealthPct || 96}%</div>
                </div>

                <div className="fleet-card-box" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '10px', color: 'var(--color-primary-600)' }}>
                    {vehicle.telematics?.deviceId || 'GPS-TRK-99012'}
                  </div>
                  <div className="fleet-stat-lbl">IoT Telematics Node</div>
                  <div style={{ fontSize: '10px', color: '#10b981', marginTop: '2px' }}>Ping {vehicle.telematics?.lastSignal || '1 min ago'}</div>
                </div>
              </div>

              {/* Telematics Location & Route */}
              <div className="fleet-card-box" style={{ background: '#f8fafc' }}>
                <div className="fleet-card-box-title">Current Geolocation & Active Route Telemetry</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                  📍 {vehicle.telematics?.currentLocation || 'Mumbai-Pune Expressway'}
                </div>
                {vehicle.telematics?.currentTrip && (
                  <div style={{ marginTop: '8px', padding: '10px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <div>
                      <span>Active Trip: <strong>{vehicle.telematics.currentTrip.id}</strong></span>
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        {vehicle.telematics.currentTrip.origin} → {vehicle.telematics.currentTrip.destination}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: '#2563eb', fontWeight: 800 }}>ETA {vehicle.telematics.currentTrip.eta}</span>
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        Remaining: {vehicle.telematics.currentTrip.distanceRemainingKm} km
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 5: FUEL & ENERGY ── */}
          {activeTab === 'fuel' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="fleet-card-box">
                  <div className="fleet-stat-val" style={{ color: '#059669' }}>
                    {vehicle.fuelLogs?.avgFuelEfficiencyKmL || 6.9} km/l
                  </div>
                  <div className="fleet-stat-lbl">Average Fuel Economy</div>
                </div>
                <div className="fleet-card-box">
                  <div className="fleet-stat-val">
                    {vehicle.fuelLogs?.last30DaysLiters || 580} L
                  </div>
                  <div className="fleet-stat-lbl">Fuel Consumed (30 Days)</div>
                </div>
                <div className="fleet-card-box">
                  <div className="fleet-stat-val" style={{ color: '#2563eb' }}>
                    {vehicle.fuelLogs?.costLast30Days || '₹55,100'}
                  </div>
                  <div className="fleet-stat-lbl">Fuel Expenditure (30 Days)</div>
                </div>
              </div>

              {/* Fuel Refueling Log */}
              <div className="fleet-card-box">
                <div className="fleet-card-box-title">Recent Refueling Events</div>
                <div className="fleet-table-wrapper">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                        <th>Odometer</th>
                        <th>Fuel Station / Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(vehicle.fuelLogs?.recentFillups || [
                        { date: '2024-09-26', quantityLiters: 110, cost: '₹10,450', odometerKm: 184100, fuelStation: 'Indian Oil Highway Hub, Panvel' },
                        { date: '2024-09-22', quantityLiters: 125, cost: '₹11,875', odometerKm: 183250, fuelStation: 'HP Auto Care, Pune Bypass' },
                      ]).map((f, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{f.date}</td>
                          <td>{f.quantityLiters} Liters</td>
                          <td style={{ fontWeight: 800, color: '#059669' }}>{f.cost}</td>
                          <td>{f.odometerKm?.toLocaleString()} km</td>
                          <td style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{f.fuelStation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 6: SAFETY INCIDENTS ── */}
          {activeTab === 'incidents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="fleet-card-box">
                <div className="fleet-card-box-title">Telematics Safety Events & Sensor Trigger Log</div>
                {vehicle.incidents?.length > 0 ? (
                  <div className="fleet-table-wrapper">
                    <table className="fleet-table">
                      <thead>
                        <tr>
                          <th>Event ID</th>
                          <th>Date</th>
                          <th>Incident Type</th>
                          <th>Location</th>
                          <th>Vehicle Speed</th>
                          <th>Severity</th>
                          <th>Resolution</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicle.incidents.map((inc) => (
                          <tr key={inc.id}>
                            <td style={{ fontWeight: 700 }}>{inc.id}</td>
                            <td>{inc.date}</td>
                            <td style={{ fontWeight: 600, color: '#d97706' }}>{inc.type}</td>
                            <td>{inc.location}</td>
                            <td>{inc.speed}</td>
                            <td>
                              <span className={`fleet-status-pill ${inc.severity.toLowerCase() === 'critical' ? 'breakdown' : 'maintenance'}`}>
                                {inc.severity}
                              </span>
                            </td>
                            <td style={{ fontSize: '11px' }}>{inc.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#10b981', fontWeight: 700 }}>
                    ✨ Clean Telematics Record — Zero harsh braking, over-speeding, or collision alerts in 90 days.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 7: TCO OPERATING COSTS ── */}
          {activeTab === 'costs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="fleet-card-box">
                  <div className="fleet-stat-val">₹{vehicle.costs?.monthlyFuel?.toLocaleString() || '55,100'}</div>
                  <div className="fleet-stat-lbl">Monthly Fuel Energy</div>
                </div>
                <div className="fleet-card-box">
                  <div className="fleet-stat-val">₹{vehicle.costs?.monthlyMaintenance?.toLocaleString() || '4,800'}</div>
                  <div className="fleet-stat-lbl">Monthly Maintenance</div>
                </div>
                <div className="fleet-card-box">
                  <div className="fleet-stat-val">₹{vehicle.costs?.monthlyDriverAlloc?.toLocaleString() || '42,000'}</div>
                  <div className="fleet-stat-lbl">Driver Allocation</div>
                </div>
                <div className="fleet-card-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="fleet-stat-val" style={{ color: '#15803d' }}>
                    ₹{vehicle.costs?.totalMonthlyTCO?.toLocaleString() || '113,600'}
                  </div>
                  <div className="fleet-stat-lbl" style={{ color: '#166534' }}>Total Monthly TCO ({vehicle.costs?.costPerKm || '₹28.4/km'})</div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 8: AUDIT TRAIL ── */}
          {activeTab === 'audit' && (
            <div className="fleet-card-box">
              <div className="fleet-card-box-title">Lifecycle & Operational Audit Trail</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(vehicle.auditTrail || [
                  { date: '2024-09-15', action: 'Route Assigned', user: 'Dispatch System (Auto)', details: 'Assigned to TRIP-94021' },
                  { date: '2024-08-15', action: 'Preventive Service Logged', user: 'Maintenance Officer', details: 'Completed 175,000 km Service' },
                  { date: '2023-01-15', action: 'Driver Assigned', user: 'Fleet Manager', details: 'Assigned Rajesh Sharma (DR-88201)' },
                ]).map((log, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', background: 'var(--color-bg-secondary)', borderRadius: '6px', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong>{log.action}</strong>: {log.details}
                      <div style={{ color: 'var(--color-text-tertiary)', marginTop: '2px' }}>By {log.user}</div>
                    </div>
                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 700 }}>{log.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', background: 'var(--color-bg-secondary)' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
