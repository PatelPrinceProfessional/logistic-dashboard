import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import './Tracking.css';

const trackedShipmentsList = [
  {
    id: 'SHP-100245',
    customer: 'ABC Logistics Pvt Ltd',
    origin: 'Delhi Gate North Hub',
    destination: 'Jaipur Industrial Corridor',
    status: 'In Transit (On-Time)',
    eta: 'Today 16:30',
    carrier: 'BlueDart Express Line',
    currentLocation: 'Highway NH-48 Mile 42',
    progressPct: 65,
    milestones: [
      { title: 'Order Booked & Validated', time: 'Sep 27, 08:30', completed: true },
      { title: 'Loaded & Gate Dispatched', time: 'Sep 27, 10:15', completed: true },
      { title: 'In Transit (Highway Corridor)', time: 'Sep 27, 13:45', completed: true },
      { title: 'Arrived at Destination Hub', time: 'Estimated 16:30', completed: false },
      { title: 'Final Customer Handover', time: 'Estimated 17:30', completed: false },
    ],
  },
  {
    id: 'SHP-100247',
    customer: 'Reliance Retail Supply',
    origin: 'Mumbai Nhava Sheva Port',
    destination: 'Ahmedabad S.G. Highway',
    status: 'At Risk (+15m Delay)',
    eta: 'Today 18:45',
    carrier: 'Safexpress Logistics',
    currentLocation: 'Surat Bypass Toll Plaza',
    progressPct: 45,
    milestones: [
      { title: 'Order Booked & Validated', time: 'Sep 27, 07:00', completed: true },
      { title: 'Loaded & Gate Dispatched', time: 'Sep 27, 09:00', completed: true },
      { title: 'Toll Inspection Checkpoint', time: 'Sep 27, 14:00', completed: true },
      { title: 'Arrived at Destination Hub', time: 'Estimated 18:45', completed: false },
      { title: 'Final Customer Handover', time: 'Estimated 19:30', completed: false },
    ],
  },
];

const ShipmentTracking = () => {
  const navigate = useNavigate();
  const [selectedShipment, setSelectedShipment] = useState(trackedShipmentsList[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout activePage="tracking">
      <div className="tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <div className="trk-title-group">
            <h1>
              <span>📦</span> Multi-Leg Shipment Tracking & Milestone Visibility
            </h1>
            <p>End-to-end milestone lifecycle tracking, carrier handoff status, and automated customer notifications</p>
          </div>

          <div className="disp-header-actions">
            <div className="trk-nav-tabs">
              <button className="trk-nav-tab" onClick={() => navigate('/tracking')}>
                Live Map
              </button>
              <button className="trk-nav-tab active">
                Shipment Tracking
              </button>
              <button className="trk-nav-tab" onClick={() => navigate('/tracking/eta')}>
                ETA Predictions
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Tracking Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '16px', alignItems: 'start' }}>
          {/* Left Shipment List */}
          <div className="disp-card">
            <div className="disp-card-header">
              <h3>
                <span>📋</span> Active Cargo Trackers
              </h3>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <input
                type="text"
                className="proc-search-input"
                style={{ width: '100%' }}
                placeholder="Search Shipment ID, Customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trackedShipmentsList.map((shp) => (
                <div
                  key={shp.id}
                  className={`resource-item-card ${selectedShipment.id === shp.id ? 'waiting-trip-card selected' : ''}`}
                  style={{ margin: 0 }}
                  onClick={() => setSelectedShipment(shp)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: 'var(--trk-primary)', fontSize: '0.85rem' }}>{shp.id}</strong>
                    <span className="status-pill status-ready">{shp.status}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600 }}>{shp.origin} → {shp.destination}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)', marginTop: '4px' }}>
                    Carrier: {shp.carrier} • ETA: <strong>{shp.eta}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Milestone Stepper & Details */}
          <div className="disp-card">
            <div className="disp-card-header">
              <div>
                <h3 style={{ margin: 0 }}>Milestone Trajectory: {selectedShipment.id}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                  Customer: <strong>{selectedShipment.customer}</strong> • Carrier: <strong>{selectedShipment.carrier}</strong>
                </span>
              </div>
              <button
                className="tender-action-btn btn-award"
                style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                onClick={() => alert(`Customer tracking link SMS sent for ${selectedShipment.id}!`)}
              >
                📲 Share Customer Portal Link
              </button>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '20px', padding: '14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--trk-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                <span>Execution Progress</span>
                <span style={{ color: 'var(--trk-primary)' }}>{selectedShipment.progressPct}% Complete</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${selectedShipment.progressPct}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #10b981)' }} />
              </div>
              <div style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                Current Location: <strong>{selectedShipment.currentLocation}</strong>
              </div>
            </div>

            {/* Chronological Milestone Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedShipment.milestones.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: m.completed ? '#10b981' : '#e2e8f0',
                      color: m.completed ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                    }}
                  >
                    {m.completed ? '✓' : idx + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: m.completed ? '#0f172a' : '#64748b' }}>
                      {m.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentTracking;
