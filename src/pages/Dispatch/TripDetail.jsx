import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { activeTripsLifecycle } from '../../utils/mockData/dispatchData';
import './Dispatch.css';

const lifecycleStages = ['Created', 'Assigned', 'Accepted', 'Pickup', 'Loading', 'In Transit', 'Out for Delivery', 'Delivered'];

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const trip = activeTripsLifecycle.find(t => t.id === id) || activeTripsLifecycle[0];

  return (
    <Layout activePage="dispatch-trips">
      <div className="dispatch-container">
        {/* Header */}
        <div className="dispatch-header">
          <div className="disp-title-group">
            <h1>
              <span>📍</span> Trip Telemetry & Live Waybill: {trip.id}
            </h1>
            <p>Live driver tracking, stop-by-stop execution, temperature sensors, and digital proof of delivery</p>
          </div>

          <div className="disp-header-actions">
            <button
              className="tender-action-btn"
              style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 14px' }}
              onClick={() => navigate('/dispatch/trips')}
            >
              ← Back to Active Trips
            </button>
            <button
              className="tender-action-btn btn-award"
              style={{ padding: '8px 16px' }}
              onClick={() => alert(`Simulated ePOD delivery sign-off submitted for ${trip.id}!`)}
            >
              ✓ Complete Delivery ePOD
            </button>
          </div>
        </div>

        {/* 8-Stage Lifecycle Progress Stepper */}
        <div style={{ background: '#ffffff', border: '1px solid var(--disp-border)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px', textAlign: 'center' }}>
            {lifecycleStages.map((stage, i) => {
              const isPassed = i <= trip.stageIndex;
              const isCurrent = i === trip.stageIndex;
              return (
                <div
                  key={stage}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '6px',
                    background: isCurrent ? '#2563eb' : isPassed ? '#ecfdf5' : '#f8fafc',
                    color: isCurrent ? '#ffffff' : isPassed ? '#059669' : '#64748b',
                    fontWeight: 700,
                    fontSize: '0.725rem',
                    border: isPassed ? '1px solid #a7f3d0' : '1px solid transparent',
                  }}
                >
                  {isPassed && !isCurrent ? '✓ ' : ''}{stage}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Telemetry & Waybill Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '16px' }}>
          {/* Left Column: Live Waybill Stops & Sensor Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Live Telemetry Map Placeholder / Stops Waybill */}
            <div className="disp-card">
              <div className="disp-card-header">
                <h3>
                  <span>🗺️</span> Waybill Stop Sequence & Execution
                </h3>
                <span className="disp-badge-counter">{trip.stopsCompleted} / {trip.stopsTotal} Done</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px', background: '#ecfdf5', borderRadius: '6px', borderLeft: '4px solid #10b981' }}>
                  <span style={{ fontWeight: 800, color: '#059669' }}>1</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{trip.origin} (Origin Depot)</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--disp-text-muted)' }}>Status: Departed at 07:30 • Seal Locked</div>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700 }}>COMPLETED</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px', background: '#eff6ff', borderRadius: '6px', borderLeft: '4px solid #2563eb' }}>
                  <span style={{ fontWeight: 800, color: '#2563eb' }}>2</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>Transit Checkpoint: Highway Corridor Gate 4</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--disp-text-muted)' }}>Speed: 64 km/h • GPS Ping 2 mins ago • Temp: {trip.tempC}</div>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: '#2563eb', fontWeight: 700 }}>IN PROGRESS</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px', background: '#f8fafc', borderRadius: '6px', borderLeft: '4px solid #cbd5e1' }}>
                  <span style={{ fontWeight: 800, color: '#64748b' }}>3</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{trip.destination} (Customer Receiving Dock)</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--disp-text-muted)' }}>Target ETA: {trip.eta} • Recipient: Dock Logistics Lead</div>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 700 }}>SCHEDULED</span>
                </div>
              </div>
            </div>

            {/* IoT Telemetry Sensors */}
            <div className="disp-card">
              <div className="disp-card-header">
                <h3>
                  <span>📡</span> Live IoT Telematics & Vehicle Sensors
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--disp-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Cargo Chamber Temp</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{trip.tempC}</div>
                </div>

                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--disp-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>GPS Telematics Ping</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb', marginTop: '2px' }}>Live (3s ago)</div>
                </div>

                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--disp-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Security Seal Status</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>Intact ✓</div>
                </div>

                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--disp-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--disp-text-muted)' }}>Fuel Level</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>78% Full</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Driver & Security Pass Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="disp-card">
              <div className="disp-card-header">
                <h3>
                  <span>👤</span> Assigned Driver & Unit
                </h3>
              </div>

              <div style={{ fontSize: '0.825rem', lineHeight: '1.6', color: '#0f172a' }}>
                <div>Driver: <strong>{trip.driver}</strong></div>
                <div>Vehicle: <strong>{trip.vehicle}</strong></div>
                <div>Digital Seal: <strong>{trip.sealNumber}</strong></div>
                <div>Gross Payload: <strong>{trip.weightKg.toLocaleString()} kg ({trip.volumeCbm} m³)</strong></div>
                <div>Shipments: <strong>{trip.shipments.join(', ')}</strong></div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--disp-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                  onClick={() => alert(`Direct dispatch radio call triggered with driver ${trip.driver}...`)}
                >
                  📞 Direct Driver Radio
                </button>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}
                  onClick={() => alert(`Gate Security Inbound QR Pass generated for ${trip.id}.`)}
                >
                  🎟️ Gate Pass & QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TripDetail;
