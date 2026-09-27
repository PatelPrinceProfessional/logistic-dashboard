import { useState } from 'react';

export default function DriverDetailModal({ driver, onClose, onUpdateDriver }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: driver?.name || '',
    phone: driver?.phone || '',
    email: driver?.email || '',
    address: driver?.address || '',
    status: driver?.status || 'Active',
    licenseNumber: driver?.licenseNumber || '',
    licenseType: driver?.licenseType || '',
    assignedVehicle: driver?.assignedVehicle || 'Unassigned',
  });

  if (!driver) return null;

  const handleSaveProfile = () => {
    onUpdateDriver({
      ...driver,
      ...formData,
    });
    setIsEditing(false);
  };

  return (
    <div className="driver-modal-backdrop" onClick={onClose}>
      <div className="driver-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="driver-modal-header">
          <div className="driver-modal-profile-summary">
            <img src={driver.avatar} alt={driver.name} className="driver-modal-avatar-lg" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{driver.name}</h3>
                <span className={`driver-status-pill ${driver.status.toLowerCase().replace(/\s+/g, '')}`}>
                  {driver.status}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <span>ID: <strong>{driver.id}</strong></span>
                <span>•</span>
                <span>Vehicle: <strong>{driver.assignedVehicle}</strong></span>
                <span>•</span>
                <span>License: <strong>{driver.licenseNumber}</strong></span>
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

        {/* 7 Tab Navigation Bar */}
        <div className="driver-modal-nav-tabs">
          {[
            { id: 'profile', label: '1. Profile & License' },
            { id: 'documents', label: '2. Documents & Compliance' },
            { id: 'assignments', label: '3. Assignments & Trips' },
            { id: 'performance', label: '4. Performance' },
            { id: 'safety', label: '5. Safety & Telematics' },
            { id: 'availability', label: '6. Shift Schedule' },
            { id: 'earnings', label: '7. Earnings & Payroll' },
          ].map((t) => (
            <button
              key={t.id}
              className={`driver-modal-tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Body Container */}
        <div className="driver-modal-body">
          {/* ── TAB 1: Profile & License ── */}
          {activeTab === 'profile' && (
            <div className="driver-detail-2col-layout">
              {/* Left Column (30%) */}
              <div className="driver-card-box">
                <div className="driver-card-box-title">Personal Information</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '8px 0' }}>
                  <img src={driver.avatar} alt={driver.name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '8px' }} />
                  <button className="btn btn-secondary btn-sm" onClick={() => alert('Photo upload dialog opened.')}>
                    Update Photo
                  </button>
                </div>

                <div className="driver-info-meta-row">
                  <span className="driver-meta-lbl">Full Name:</span>
                  {isEditing ? (
                    <input
                      className="drivers-search-input"
                      style={{ padding: '4px 8px', width: '160px' }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <span className="driver-meta-val">{driver.name}</span>
                  )}
                </div>

                <div className="driver-info-meta-row">
                  <span className="driver-meta-lbl">Phone:</span>
                  {isEditing ? (
                    <input
                      className="drivers-search-input"
                      style={{ padding: '4px 8px', width: '160px' }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <a href={`tel:${driver.phone}`} style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                      {driver.phone}
                    </a>
                  )}
                </div>

                <div className="driver-info-meta-row">
                  <span className="driver-meta-lbl">Email:</span>
                  <span className="driver-meta-val" style={{ fontSize: '11px' }}>{driver.email}</span>
                </div>

                <div className="driver-info-meta-row">
                  <span className="driver-meta-lbl">Date of Birth:</span>
                  <span className="driver-meta-val">{driver.dob}</span>
                </div>

                <div className="driver-info-meta-row">
                  <span className="driver-meta-lbl">Gender:</span>
                  <span className="driver-meta-val">{driver.gender}</span>
                </div>

                <div className="driver-info-meta-row">
                  <span className="driver-meta-lbl">Status:</span>
                  {isEditing ? (
                    <select
                      className="drivers-search-input"
                      style={{ padding: '4px 8px', width: '140px' }}
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Available">Available</option>
                      <option value="On Trip">On Trip</option>
                      <option value="On Break">On Break</option>
                      <option value="Off-Duty">Off-Duty</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : (
                    <span className={`driver-status-pill ${driver.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {driver.status}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: '8px' }}>
                  {isEditing ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={handleSaveProfile}>
                        Save Changes
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column (70%) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Commercial License Card */}
                <div className="driver-card-box">
                  <div className="driver-card-box-title">Commercial Driving License (CDL)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="driver-info-meta-row">
                      <span className="driver-meta-lbl">License Number:</span>
                      <span className="driver-meta-val" style={{ fontFamily: 'monospace' }}>{driver.licenseNumber}</span>
                    </div>
                    <div className="driver-info-meta-row">
                      <span className="driver-meta-lbl">License Class:</span>
                      <span className="driver-meta-val">{driver.licenseType}</span>
                    </div>
                    <div className="driver-info-meta-row">
                      <span className="driver-meta-lbl">Issue Date:</span>
                      <span className="driver-meta-val">{driver.licenseIssueDate || '2012-06-10'}</span>
                    </div>
                    <div className="driver-info-meta-row">
                      <span className="driver-meta-lbl">Expiry Date:</span>
                      <span className="driver-meta-val" style={{ color: '#059669', fontWeight: 700 }}>
                        {driver.licenseExpiryDate || '2027-06-09'} (Valid)
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => alert('Viewing Scanned CDL PDF')}>
                      📄 View CDL Document
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => alert('Download CDL Copy')}>
                      ⬇ Download
                    </button>
                  </div>
                </div>

                {/* Certifications Card */}
                <div className="driver-card-box">
                  <div className="driver-card-box-title">Active Certifications & Endorsements</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {driver.certifications?.map((c, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          background: 'var(--color-bg-secondary)',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>{c.name}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          Valid until: <strong>{c.validUntil}</strong>
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', marginTop: '6px' }} onClick={() => alert('Add Certification Dialog')}>
                    + Add New Certification
                  </button>
                </div>

                {/* Assigned Vehicle Card */}
                <div className="driver-card-box">
                  <div className="driver-card-box-title">Assigned Fleet Vehicle</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{driver.assignedVehicle}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        Assigned since {driver.assignedSince || 'Jan 2023'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => alert('Vehicle reassignment modal opened.')}>
                        Reassign Vehicle
                      </button>
                      <button className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }} onClick={() => alert('Unassigned driver from vehicle.')}>
                        Unassign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: Documents & Compliance ── */}
          {activeTab === 'documents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>🛡️</span>
                  <div>
                    <div style={{ fontWeight: 800, color: '#065f46', fontSize: '13px' }}>
                      Overall Compliance Status: 100% Verified
                    </div>
                    <div style={{ fontSize: '11px', color: '#047857' }}>
                      All mandatory statutory documents, background checks, and medical certificates are up to date.
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => alert('Document upload modal opened.')}>
                  + Upload Document
                </button>
              </div>

              <div className="drivers-table-wrapper">
                <table className="drivers-table">
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Category</th>
                      <th>Upload Date</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(driver.documents || [
                      { id: 'D1', name: 'Commercial Driving License', type: 'License', uploadDate: '2023-01-10', expiryDate: '2027-06-09', status: 'Valid' },
                      { id: 'D2', name: 'Commercial Insurance Policy', type: 'Insurance', uploadDate: '2024-01-05', expiryDate: '2025-01-04', status: 'Valid' },
                      { id: 'D3', name: 'Annual Medical Fitness', type: 'Medical', uploadDate: '2024-03-12', expiryDate: '2025-03-11', status: 'Valid' },
                    ]).map((doc) => (
                      <tr key={doc.id}>
                        <td style={{ fontWeight: 600 }}>📄 {doc.name}</td>
                        <td>{doc.type}</td>
                        <td>{doc.uploadDate}</td>
                        <td style={{ fontWeight: 600 }}>{doc.expiryDate}</td>
                        <td>
                          <span className="driver-status-pill ontrip">Valid</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn btn-secondary btn-sm" onClick={() => alert(`Downloading ${doc.name}`)}>
                              ⬇
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => alert(`Upload new version for ${doc.name}`)}>
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

          {/* ── TAB 3: Assignments & Trips ── */}
          {activeTab === 'assignments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {driver.assignments?.currentTrip && (
                <div className="driver-card-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
                  <div className="driver-card-box-title" style={{ color: '#1d4ed8' }}>
                    🚚 Active Ongoing Trip — {driver.assignments.currentTrip.id}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <div className="driver-meta-lbl">Route:</div>
                      <div className="driver-meta-val">{driver.assignments.currentTrip.origin} → {driver.assignments.currentTrip.destination}</div>
                    </div>
                    <div>
                      <div className="driver-meta-lbl">Cargo Payload:</div>
                      <div className="driver-meta-val">{driver.assignments.currentTrip.cargo}</div>
                    </div>
                    <div>
                      <div className="driver-meta-lbl">Current Location / Stop:</div>
                      <div className="driver-meta-val">{driver.assignments.currentTrip.currentStop}</div>
                    </div>
                    <div>
                      <div className="driver-meta-lbl">ETA:</div>
                      <div className="driver-meta-val" style={{ color: '#2563eb' }}>{driver.assignments.currentTrip.eta}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="driver-card-box">
                <div className="driver-card-box-title">Past Completed Trips ({driver.assignments?.pastTripsCount || 284} lifetime)</div>
                <div className="drivers-table-wrapper">
                  <table className="drivers-table">
                    <thead>
                      <tr>
                        <th>Trip ID</th>
                        <th>Date</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Distance</th>
                        <th>Duration</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(driver.assignments?.pastTrips || [
                        { id: 'TRIP-93902', date: '2024-09-24', origin: 'Mumbai', destination: 'Nashik', distance: '168 km', duration: '4h 15m', status: 'Delivered On-Time' },
                        { id: 'TRIP-93811', date: '2024-09-22', origin: 'Pune', destination: 'Surat', distance: '390 km', duration: '8h 40m', status: 'Delivered On-Time' },
                      ]).map((t) => (
                        <tr key={t.id}>
                          <td style={{ fontWeight: 700, color: 'var(--color-primary-600)' }}>{t.id}</td>
                          <td>{t.date}</td>
                          <td>{t.origin}</td>
                          <td>{t.destination}</td>
                          <td>{t.distance}</td>
                          <td>{t.duration}</td>
                          <td>
                            <span className="driver-status-pill ontrip">{t.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 4: Performance ── */}
          {activeTab === 'performance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="driver-card-box" style={{ textAlign: 'center' }}>
                  <div className="driver-stat-val" style={{ color: '#059669' }}>
                    {driver.performance?.onTimeRate || 97.2}%
                  </div>
                  <div className="driver-stat-lbl">On-Time Delivery Rate</div>
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>
                    +3.0% vs Fleet Avg ({driver.performance?.companyAvgOnTime || 94.2}%)
                  </div>
                </div>

                <div className="driver-card-box" style={{ textAlign: 'center' }}>
                  <div className="driver-stat-val" style={{ color: '#2563eb' }}>
                    {driver.performance?.tripsThisMonth || 28}
                  </div>
                  <div className="driver-stat-lbl">Trips This Month</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Top 5% in Fleet</div>
                </div>

                <div className="driver-card-box" style={{ textAlign: 'center' }}>
                  <div className="driver-stat-val" style={{ color: '#d97706' }}>
                    ⭐ {driver.performance?.customerRating || 4.9}
                  </div>
                  <div className="driver-stat-lbl">Customer Satisfaction</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Based on 48 reviews</div>
                </div>

                <div className="driver-card-box" style={{ textAlign: 'center' }}>
                  <div className="driver-stat-val">
                    {driver.performance?.costPerKm || '₹28.4 / km'}
                  </div>
                  <div className="driver-stat-lbl">Operating Cost / km</div>
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>-4.2% Fuel Efficiency</div>
                </div>
              </div>

              {/* Performance Trend */}
              <div className="driver-card-box">
                <div className="driver-card-box-title">Quarterly On-Time Performance Comparison</div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', padding: '16px 0' }}>
                  {[
                    { month: 'July', driver: 96.0, avg: 93.8 },
                    { month: 'August', driver: 98.1, avg: 94.0 },
                    { month: 'September', driver: 97.2, avg: 94.5 },
                  ].map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '100px' }}>
                        <div style={{ width: '24px', height: `${m.driver}%`, background: '#2563eb', borderRadius: '4px 4px 0 0' }} title={`Driver: ${m.driver}%`} />
                        <div style={{ width: '24px', height: `${m.avg}%`, background: '#94a3b8', borderRadius: '4px 4px 0 0' }} title={`Fleet Avg: ${m.avg}%`} />
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 700 }}>{m.month}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '11px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#2563eb', borderRadius: '2px' }} />
                    <span>Driver Performance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#94a3b8', borderRadius: '2px' }} />
                    <span>Fleet Benchmark</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 5: Safety & Telematics ── */}
          {activeTab === 'safety' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div className="driver-card-box" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: '#10b981' }}>
                    {driver.safety?.safetyScore || 94}
                    <span style={{ fontSize: '18px', color: '#64748b' }}>/100</span>
                  </div>
                  <div style={{ fontWeight: 800, color: '#059669', marginTop: '4px' }}>Safety Rating: Outstanding</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                    Zero major collisions or speed limit violations in 24 months.
                  </div>
                </div>

                <div className="driver-card-box">
                  <div className="driver-card-box-title">Completed Safety Trainings</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(driver.safety?.trainingStatus || [
                      { title: 'Annual Defensive Driving & Hazard Avoidance', completedDate: '2024-04-10', status: 'Completed' },
                      { title: 'Cold-Chain IoT & Reefer Emergency Procedures', completedDate: '2024-06-18', status: 'Completed' },
                    ]).map((tr, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', background: 'var(--color-bg-secondary)', borderRadius: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>🎖 {tr.title}</span>
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>Passed ({tr.completedDate})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Incidents Log */}
              <div className="driver-card-box">
                <div className="driver-card-box-title">Telematics Events & Safety Incident Log</div>
                {driver.safety?.incidents?.length > 0 ? (
                  <div className="drivers-table-wrapper">
                    <table className="drivers-table">
                      <thead>
                        <tr>
                          <th>Event ID</th>
                          <th>Date</th>
                          <th>Event Description</th>
                          <th>Location</th>
                          <th>Speed</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {driver.safety.incidents.map((inc) => (
                          <tr key={inc.id}>
                            <td style={{ fontWeight: 700 }}>{inc.id}</td>
                            <td>{inc.date}</td>
                            <td style={{ color: '#d97706', fontWeight: 600 }}>{inc.type}</td>
                            <td>{inc.location}</td>
                            <td>{inc.speed}</td>
                            <td>
                              <span className="driver-status-pill break">{inc.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#10b981', fontWeight: 700 }}>
                    ✨ Clean Record — No safety or telematics infractions recorded!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 6: Shift Schedule ── */}
          {activeTab === 'availability' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>Weekly Shift & Duty Roster</h4>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                    Current week (23-Sep-2024 to 29-Sep-2024)
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => alert('Edit Schedule Modal opened.')}>
                    📅 Edit Schedule
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => alert('Time off request submitted.')}>
                    Request Time Off
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {(driver.availability?.schedule || [
                  { day: 'Mon', date: '23 Sep', shift: '06:00 - 18:00', status: 'Completed' },
                  { day: 'Tue', date: '24 Sep', shift: '06:00 - 18:00', status: 'Completed' },
                  { day: 'Wed', date: '25 Sep', shift: 'Off Duty', status: 'Rest' },
                  { day: 'Thu', date: '26 Sep', shift: '06:00 - 18:00', status: 'Completed' },
                  { day: 'Fri', date: '27 Sep', shift: '07:00 - 19:00', status: 'Active Shift' },
                  { day: 'Sat', date: '28 Sep', shift: '08:00 - 18:00', status: 'Scheduled' },
                  { day: 'Sun', date: '29 Sep', shift: 'Off Duty', status: 'Rest' },
                ]).map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: s.status === 'Active Shift' ? '#eff6ff' : 'var(--color-bg-secondary)',
                      border: s.status === 'Active Shift' ? '2px solid #3b82f6' : '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '10px 8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '13px' }}>{s.day}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{s.date}</div>
                    <div style={{ marginTop: '8px', fontWeight: 700, fontSize: '11px', color: s.shift === 'Off Duty' ? '#94a3b8' : '#1e293b' }}>
                      {s.shift}
                    </div>
                    <div style={{ marginTop: '6px' }}>
                      <span className={`driver-status-pill ${s.status === 'Active Shift' ? 'ontrip' : 'available'}`} style={{ fontSize: '9px' }}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 7: Earnings & Payroll ── */}
          {activeTab === 'earnings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="driver-card-box">
                  <div className="driver-stat-val">₹{driver.earnings?.monthlyBase?.toLocaleString() || '42,000'}</div>
                  <div className="driver-stat-lbl">Monthly Base Salary</div>
                </div>
                <div className="driver-card-box">
                  <div className="driver-stat-val" style={{ color: '#2563eb' }}>
                    ₹{driver.earnings?.tripIncentives?.toLocaleString() || '18,400'}
                  </div>
                  <div className="driver-stat-lbl">Trip Completion Incentives</div>
                </div>
                <div className="driver-card-box">
                  <div className="driver-stat-val" style={{ color: '#059669' }}>
                    ₹{((driver.earnings?.onTimeBonus || 4500) + (driver.earnings?.safetyBonus || 3000)).toLocaleString()}
                  </div>
                  <div className="driver-stat-lbl">Safety & On-Time Bonuses</div>
                </div>
                <div className="driver-card-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="driver-stat-val" style={{ color: '#15803d' }}>
                    ₹{driver.earnings?.totalEarned?.toLocaleString() || '67,900'}
                  </div>
                  <div className="driver-stat-lbl" style={{ color: '#166534' }}>Total Gross Earnings (Sep)</div>
                </div>
              </div>

              {/* Payment History */}
              <div className="driver-card-box">
                <div className="driver-card-box-title">Recent Payslips & Settlement History</div>
                <div className="drivers-table-wrapper">
                  <table className="drivers-table">
                    <thead>
                      <tr>
                        <th>Salary Month</th>
                        <th>Base Pay</th>
                        <th>Variable / Trips</th>
                        <th>Deductions (TDS/PF)</th>
                        <th>Net Disbursed</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                        <th>Payslip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(driver.earnings?.payslips || [
                        { month: 'August 2024', base: '₹42,000', variable: '₹24,800', deductions: '₹2,400', netPay: '₹64,400', paidDate: '2024-09-01', status: 'Paid' },
                        { month: 'July 2024', base: '₹42,000', variable: '₹26,100', deductions: '₹2,400', netPay: '₹65,700', paidDate: '2024-08-01', status: 'Paid' },
                      ]).map((p, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{p.month}</td>
                          <td>{p.base}</td>
                          <td>{p.variable}</td>
                          <td style={{ color: '#ef4444' }}>{p.deductions}</td>
                          <td style={{ fontWeight: 800, color: '#059669' }}>{p.netPay}</td>
                          <td>{p.paidDate}</td>
                          <td>
                            <span className="driver-status-pill ontrip">{p.status}</span>
                          </td>
                          <td>
                            <button className="btn btn-secondary btn-sm" onClick={() => alert(`Downloading Payslip for ${p.month}`)}>
                              ⬇ PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', background: 'var(--color-bg-secondary)', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
