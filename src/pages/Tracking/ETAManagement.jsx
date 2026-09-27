import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import './Tracking.css';

const etaRiskQueue = [
  {
    id: 'ETA-901',
    shipmentId: 'SHP-100247',
    vehicle: 'VEH-8190 (Elena Rostova)',
    origin: 'Mumbai Nhava Sheva',
    destination: 'Ahmedabad S.G. Highway',
    promisedSLA: 'Today 17:00',
    predictedETA: 'Today 18:45',
    varianceMinutes: +105,
    riskLevel: 'High Risk',
    rootCause: 'Heavy Monsoon Waterlogging on NH-48 Corridor Mile 42',
    mitigationStrategy: 'Reroute via State Expressway Toll Corridor (+22 km, -45m ETA)',
  },
  {
    id: 'ETA-902',
    shipmentId: 'SHP-100255',
    vehicle: 'VEH-5091 (David Kim)',
    origin: 'Hyderabad MedTech Hub',
    destination: 'Nagpur Central Hub',
    promisedSLA: 'Today 13:00',
    predictedETA: 'Today 13:45',
    varianceMinutes: +45,
    riskLevel: 'Medium Risk',
    rootCause: 'Dock Gate Inbound Congestion at Toll Sector 4',
    mitigationStrategy: 'Notify Destination Gate for Priority Dock Assignment',
  },
];

const ETAManagement = () => {
  const navigate = useNavigate();
  const [risks, setRisks] = useState(etaRiskQueue);

  const handleApplyReroute = (riskId) => {
    alert(`Dynamic ML re-routing applied for ${riskId}! Telematics updated and ETA adjusted.`);
    setRisks(risks.filter(r => r.id !== riskId));
  };

  return (
    <Layout activePage="tracking">
      <div className="tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <div className="trk-title-group">
            <h1>
              <span>🧠</span> AI-Powered Dynamic ETA Predictions & Risk Mitigation
            </h1>
            <p>Machine learning predictive arrival matrices, traffic congestion simulations, and automated customer SLA warnings</p>
          </div>

          <div className="disp-header-actions">
            <div className="trk-nav-tabs">
              <button className="trk-nav-tab" onClick={() => navigate('/tracking')}>
                Live Map
              </button>
              <button className="trk-nav-tab" onClick={() => navigate('/tracking/shipments')}>
                Shipment Tracking
              </button>
              <button className="trk-nav-tab active">
                ETA Predictions
              </button>
            </div>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
          <div className="disp-card" style={{ padding: '14px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>Average ETA Prediction Accuracy</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>96.8% (±8m)</div>
          </div>
          <div className="disp-card" style={{ padding: '14px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>At-Risk Shipments Flagged</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>{risks.length} Shipments</div>
          </div>
          <div className="disp-card" style={{ padding: '14px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>Auto-Mitigated Runs Today</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>18 Runs</div>
          </div>
          <div className="disp-card" style={{ padding: '14px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>SLA Breach Prevention Rate</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#7c3aed', marginTop: '4px' }}>92.4%</div>
          </div>
        </div>

        {/* Risk Queue Table Card */}
        <div style={{ background: '#ffffff', border: '1px solid var(--trk-border)', borderRadius: '10px', padding: '16px', boxShadow: 'var(--trk-shadow-sm)' }}>
          <div className="disp-card-header">
            <h3>
              <span>⚠️</span> Active Delay Risk & Dynamic Mitigation Queue
            </h3>
          </div>

          <table className="bids-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Shipment & Vehicle</th>
                <th>Promised SLA</th>
                <th>AI Predicted ETA</th>
                <th>Variance</th>
                <th>Identified Root Cause</th>
                <th>Recommended Mitigation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 700, color: 'var(--trk-primary)' }}>{r.id}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{r.shipmentId}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--trk-text-muted)' }}>{r.vehicle}</div>
                  </td>
                  <td>{r.promisedSLA}</td>
                  <td style={{ fontWeight: 700, color: '#dc2626' }}>{r.predictedETA}</td>
                  <td>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', background: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: '0.75rem' }}>
                      +{r.varianceMinutes}m
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.rootCause}</td>
                  <td style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>{r.mitigationStrategy}</td>
                  <td>
                    <button
                      className="tender-action-btn btn-award"
                      style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                      onClick={() => handleApplyReroute(r.id)}
                    >
                      Apply Re-Route
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

export default ETAManagement;
