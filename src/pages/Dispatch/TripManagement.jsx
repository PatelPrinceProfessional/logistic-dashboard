import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { activeTripsLifecycle } from '../../utils/mockData/dispatchData';
import './Dispatch.css';

const lifecycleStages = ['Created', 'Assigned', 'Accepted', 'Pickup', 'Loading', 'In Transit', 'Out for Delivery', 'Delivered'];

const TripManagement = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState(activeTripsLifecycle);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTrips = trips.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.currentStage === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout activePage="dispatch-trips">
      <div className="dispatch-container">
        {/* Header */}
        <div className="dispatch-header">
          <div className="disp-title-group">
            <h1>
              <span>📋</span> Active Trip Management & Lifecycle Registry
            </h1>
            <p>Real-time trip tracking across the 8-stage freight execution lifecycle with telemetry and ePOD compliance</p>
          </div>

          <div className="disp-header-actions">
            <div className="disp-nav-tabs">
              <button
                className="disp-nav-tab"
                onClick={() => navigate('/dispatch')}
              >
                Gantt Timeline
              </button>
              <button
                className="disp-nav-tab active"
              >
                Active Trips Registry
              </button>
            </div>

            <button
              className="tender-action-btn btn-evaluate"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => navigate('/dispatch')}
            >
              + Dispatch New Trip
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="proc-filters-bar">
          <div className="proc-filter-inputs">
            <input
              type="text"
              className="proc-search-input"
              placeholder="Search Trip ID, Driver, Route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="proc-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Lifecycle Stages</option>
              {lifecycleStages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--disp-text-muted)' }}>
            Active Fleet Runs: <strong>{filteredTrips.length} Trips in Transit</strong>
          </div>
        </div>

        {/* Trips Table Card */}
        <div style={{ background: '#ffffff', border: '1px solid var(--disp-border)', borderRadius: '10px', overflow: 'hidden', boxShadow: 'var(--disp-shadow-sm)' }}>
          <table className="bids-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Vehicle & Driver</th>
                <th>Origin → Destination</th>
                <th>Lifecycle Stage</th>
                <th>Progress (Stops)</th>
                <th>ETA</th>
                <th>Payload</th>
                <th>ePOD / Security</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip) => (
                <tr key={trip.id}>
                  <td style={{ fontWeight: 700, color: 'var(--disp-primary)' }}>{trip.id}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{trip.driver}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--disp-text-muted)' }}>{trip.vehicle}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{trip.origin} → {trip.destination}</td>
                  <td>
                    <span className="status-pill status-ontrip" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                      ● {trip.currentStage}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a' }}>
                      {trip.stopsCompleted} / {trip.stopsTotal} Completed
                    </div>
                    <div style={{ width: '80px', height: '5px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginTop: '3px' }}>
                      <div style={{ width: `${(trip.stopsCompleted / trip.stopsTotal) * 100}%`, height: '100%', background: '#2563eb' }} />
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: trip.delayMinutes > 0 ? '#ef4444' : '#0f172a' }}>{trip.eta}</strong>
                    {trip.delayMinutes > 0 && (
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#ef4444' }}>+{trip.delayMinutes}m Delay</span>
                    )}
                  </td>
                  <td>{trip.weightKg.toLocaleString()} kg ({trip.volumeCbm} m³)</td>
                  <td>
                    <div style={{ fontSize: '0.75rem' }}>
                      {trip.epodSigned ? (
                        <span style={{ color: '#059669', fontWeight: 600 }}>✓ ePOD Verified</span>
                      ) : (
                        <span style={{ color: 'var(--disp-text-muted)' }}>Pending Delivery</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Seal: {trip.sealNumber}</div>
                  </td>
                  <td>
                    <button
                      className="tender-action-btn btn-evaluate"
                      style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                      onClick={() => navigate(`/dispatch/trips/${trip.id}`)}
                    >
                      View Live Telemetry
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TripManagement;
