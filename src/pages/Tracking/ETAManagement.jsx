import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { etaPredictionsList, etaModelMetrics } from '../../utils/mockData/trackingData';
import './Tracking.css';

const ETAManagement = () => {
  const navigate = useNavigate();

  // Fleet state
  const [fleetList, setFleetList] = useState(etaPredictionsList);
  const [selectedVehicleId, setSelectedVehicleId] = useState(etaPredictionsList[0].vehicleId);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | on_time | at_risk | delayed
  const [corridorFilter, setCorridorFilter] = useState('all');

  // Interactive What-If Simulation State
  const [activeScenarioKey, setActiveScenarioKey] = useState(null);

  // Modals & Feedback
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [rerouteModalOpen, setRerouteModalOpen] = useState(false);
  const [retrainModalOpen, setRetrainModalOpen] = useState(false);
  const [retrainingProgress, setRetrainingProgress] = useState(0);
  const [isRetraining, setIsRetraining] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedItem = fleetList.find((f) => f.vehicleId === selectedVehicleId) || fleetList[0];

  // Filtering
  const filteredList = fleetList.filter((item) => {
    const matchesSearch =
      item.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    let matchesCorridor = true;
    if (corridorFilter !== 'all') {
      matchesCorridor =
        item.origin.toLowerCase().includes(corridorFilter.toLowerCase()) ||
        item.destination.toLowerCase().includes(corridorFilter.toLowerCase());
    }

    return matchesSearch && matchesStatus && matchesCorridor;
  });

  // Handle Dynamic Re-route application
  const handleApplyReroute = () => {
    setFleetList((prev) =>
      prev.map((item) => {
        if (item.vehicleId === selectedItem.vehicleId) {
          return {
            ...item,
            predictedArrival: item.scheduledArrival,
            varianceMinutes: 0,
            onTimeProbability: 95,
            status: 'on_time',
            factors: {
              ...item.factors,
              traffic: 'Bypassed via Green Expressway Corridor (Recovered)',
            },
          };
        }
        return item;
      })
    );
    setRerouteModalOpen(false);
    setActiveScenarioKey(null);
    showToast(`✓ AI Dynamic Re-Route applied for ${selectedItem.registration}! SLA recovered to On-Time.`);
  };

  // Simulate ML model retrain
  const handleStartRetrain = () => {
    setIsRetraining(true);
    setRetrainingProgress(10);
    setRetrainModalOpen(true);

    const interval = setInterval(() => {
      setRetrainingProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRetraining(false);
          showToast(`🧠 ML Model retrained successfully! Precision updated to 97.4% (±6m).`);
          return 100;
        }
        return p + 25;
      });
    }, 600);
  };

  // Get dynamic simulated ETA based on active what-if scenario
  const getDisplayETA = () => {
    if (!activeScenarioKey || !selectedItem.whatIfScenarios[activeScenarioKey]) {
      return {
        eta: selectedItem.predictedArrival,
        variance: selectedItem.varianceMinutes > 0 ? `+${selectedItem.varianceMinutes}m` : 'On-Time (±0m)',
        isSimulated: false,
      };
    }
    const scen = selectedItem.whatIfScenarios[activeScenarioKey];
    return {
      eta: `Today, ${scen.newETA}`,
      variance: scen.impact,
      isSimulated: true,
      scenTitle: scen.title,
    };
  };

  const displayETA = getDisplayETA();

  return (
    <Layout activePage="tracking">
      <div className="tracking-container">
        {/* Toast Alert */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 10000,
              background: '#0f172a',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              boxShadow: 'var(--trk-shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <span>🔔</span> {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="tracking-header">
          <div className="trk-title-group">
            <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)', marginBottom: '4px' }}>
              Home &gt; Live Tracking &gt; <strong style={{ color: '#0f172a' }}>Dynamic ETA &amp; Risk Predictions</strong>
            </div>
            <h1>
              <span>🧠</span> AI-Powered Dynamic ETA Predictions &amp; Risk Mitigation
            </h1>
            <p>Machine learning predictive arrival matrices, live traffic feature weights, and automated customer SLA warnings</p>
          </div>

          <div className="disp-header-actions">
            <div className="trk-nav-tabs">
              <button className="trk-nav-tab" onClick={() => navigate('/tracking')}>
                Live Map
              </button>
              <button className="trk-nav-tab" onClick={() => navigate('/tracking/shipments')}>
                Shipment Tracking
              </button>
              <button className="trk-nav-tab active" onClick={() => navigate('/tracking/eta')}>
                ETA Predictions
              </button>
            </div>
          </div>
        </div>

        {/* 4 Top Metric KPI Cards */}
        <div className="eta-metrics-grid">
          <div className="eta-metric-card">
            <div className="eta-metric-label">Average ML Prediction Accuracy</div>
            <div className="eta-metric-value" style={{ color: '#059669' }}>
              {etaModelMetrics.averageAccuracyPct}% (±{etaModelMetrics.confidenceIntervalMin}m)
            </div>
            <div className="eta-metric-subtext">Calibrated on 48,000 multi-modal trips</div>
          </div>

          <div className="eta-metric-card">
            <div className="eta-metric-label">Active Tracked Fleet</div>
            <div className="eta-metric-value" style={{ color: 'var(--trk-primary)' }}>
              {etaModelMetrics.activeTrackedCount} Units
            </div>
            <div className="eta-metric-subtext">{etaModelMetrics.onTimeCount} running on-time SLA</div>
          </div>

          <div className="eta-metric-card">
            <div className="eta-metric-label">At-Risk &amp; Delayed Flagged</div>
            <div className="eta-metric-value" style={{ color: '#d97706' }}>
              {etaModelMetrics.atRiskCount + etaModelMetrics.delayedCount} Trips
            </div>
            <div className="eta-metric-subtext">Automatic mitigation recommendations ready</div>
          </div>

          <div className="eta-metric-card">
            <div className="eta-metric-label">SLA Breach Prevention Rate</div>
            <div className="eta-metric-value" style={{ color: '#7c3aed' }}>
              {etaModelMetrics.slaBreachPreventionRate}%
            </div>
            <div className="eta-metric-subtext">Via dynamic bypass &amp; dock prioritization</div>
          </div>
        </div>

        {/* Filter & Action Toolbar */}
        <div className="shp-top-banner" style={{ padding: '12px 18px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
            <input
              type="text"
              className="proc-search-input"
              style={{ width: '260px' }}
              placeholder="Search Vehicle, Driver, Route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Status Filter Buttons */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: `All Fleet (${fleetList.length})` },
                { id: 'on_time', label: `🟢 On-Time (${fleetList.filter((f) => f.status === 'on_time').length})` },
                { id: 'at_risk', label: `🟠 At-Risk (${fleetList.filter((f) => f.status === 'at_risk').length})` },
                { id: 'delayed', label: `🔴 Delayed (${fleetList.filter((f) => f.status === 'delayed').length})` },
              ].map((btn) => (
                <button
                  key={btn.id}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    border: '1px solid var(--trk-border)',
                    background: statusFilter === btn.id ? 'var(--trk-primary)' : '#ffffff',
                    color: statusFilter === btn.id ? '#ffffff' : '#0f172a',
                    cursor: 'pointer',
                  }}
                  onClick={() => setStatusFilter(btn.id)}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Corridor Filter */}
            <select
              className="shp-select-dropdown"
              value={corridorFilter}
              onChange={(e) => setCorridorFilter(e.target.value)}
              style={{ fontSize: '0.775rem' }}
            >
              <option value="all">All Highway Corridors</option>
              <option value="Delhi">Delhi - Jaipur Corridor</option>
              <option value="Mumbai">Mumbai - Ahmedabad Corridor</option>
              <option value="Hyderabad">Hyderabad - Nagpur Corridor</option>
              <option value="Bangalore">Bangalore - Chennai Corridor</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="tender-action-btn"
              style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '6px 12px', fontSize: '0.775rem' }}
              onClick={handleStartRetrain}
            >
              🔄 Retrain ML Engine
            </button>
            <button
              className="tender-action-btn btn-award"
              style={{ padding: '6px 14px', fontSize: '0.775rem' }}
              onClick={() => showToast(`⚡ Batch AI simulation executed across all ${fleetList.length} active routes.`)}
            >
              ⚡ Run Batch Simulation
            </button>
          </div>
        </div>

        {/* 2-Column Main Layout: Fleet Table + Right AI Inspector */}
        <div className="eta-layout-grid">
          {/* Left Column: Active Vehicles with Dynamic ETA */}
          <div className="disp-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="disp-card-header" style={{ padding: '16px' }}>
              <div>
                <h3 style={{ margin: 0 }}>Active Fleet Dynamic Arrival Matrices</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                  Showing {filteredList.length} active units with real-time GPS telematics &amp; ML ETA predictions
                </span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="eta-fleet-table">
                <thead>
                  <tr>
                    <th>Vehicle &amp; Type</th>
                    <th>Driver &amp; Contact</th>
                    <th>Geospatial Location</th>
                    <th>Corridor (Origin → Dest)</th>
                    <th>Scheduled</th>
                    <th>Predicted ETA</th>
                    <th>Variance</th>
                    <th>On-Time Prob</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item) => {
                    const isSelected = item.vehicleId === selectedItem.vehicleId;
                    const isDelayed = item.status === 'delayed';
                    const isAtRisk = item.status === 'at_risk';

                    return (
                      <tr
                        key={item.id}
                        className={`eta-fleet-row ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedVehicleId(item.vehicleId);
                          setActiveScenarioKey(null);
                        }}
                      >
                        <td>
                          <div style={{ fontWeight: 800, color: 'var(--trk-primary)', fontSize: '0.85rem' }}>
                            {item.registration}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--trk-text-muted)' }}>
                            {item.vehicleType}
                          </div>
                        </td>

                        <td>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.driver}</div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--trk-text-muted)' }}>
                            {item.driverPhone}
                          </div>
                        </td>

                        <td>
                          <div style={{ fontSize: '0.775rem', color: '#334155' }}>📍 {item.currentLocation}</div>
                        </td>

                        <td>
                          <div style={{ fontWeight: 600, fontSize: '0.775rem' }}>
                            {item.origin} → {item.destination}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)' }}>
                            {item.customer}
                          </div>
                        </td>

                        <td style={{ color: 'var(--trk-text-muted)', fontSize: '0.775rem' }}>
                          {item.scheduledArrival.split(', ')[1]}
                        </td>

                        <td style={{ fontWeight: 800, color: isDelayed ? '#ef4444' : isAtRisk ? '#f59e0b' : '#10b981' }}>
                          {item.predictedArrival.split(', ')[1]}
                        </td>

                        <td>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: isDelayed ? '#fee2e2' : isAtRisk ? '#fef3c7' : '#ecfdf5',
                              color: isDelayed ? '#b91c1c' : isAtRisk ? '#b45309' : '#047857',
                            }}
                          >
                            {item.varianceMinutes === 0 ? '±0m' : `+${item.varianceMinutes}m`}
                          </span>
                        </td>

                        <td style={{ minWidth: '100px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                            <span style={{ color: item.onTimeProbability > 80 ? '#059669' : item.onTimeProbability > 50 ? '#d97706' : '#dc2626' }}>
                              {item.onTimeProbability}%
                            </span>
                          </div>
                          <div className="eta-prob-track">
                            <div
                              className="eta-prob-fill"
                              style={{
                                width: `${item.onTimeProbability}%`,
                                background: item.onTimeProbability > 80 ? '#10b981' : item.onTimeProbability > 50 ? '#f59e0b' : '#ef4444',
                              }}
                            />
                          </div>
                        </td>

                        <td>
                          <span
                            className="status-pill"
                            style={{
                              background: isDelayed ? '#fee2e2' : isAtRisk ? '#fef3c7' : '#ecfdf5',
                              color: isDelayed ? '#b91c1c' : isAtRisk ? '#b45309' : '#047857',
                              fontSize: '0.7rem',
                            }}
                          >
                            ● {isDelayed ? 'Delayed' : isAtRisk ? 'At-Risk' : 'On-Time'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Deep AI Prediction Details Inspector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* ETA Summary Card */}
            <div className="disp-card">
              <div className="disp-card-header">
                <div>
                  <h3 style={{ margin: 0 }}>AI Prediction Inspector</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                    Unit: <strong style={{ color: 'var(--trk-primary)' }}>{selectedItem.registration}</strong> ({selectedItem.driver})
                  </span>
                </div>

                <span className="status-pill status-ready" style={{ fontSize: '0.7rem' }}>
                  {selectedItem.confidence.level} ({selectedItem.confidence.percentage}%)
                </span>
              </div>

              {/* Dynamic Arrival Status Box */}
              <div
                style={{
                  background: displayETA.isSimulated ? '#eff6ff' : selectedItem.varianceMinutes > 0 ? '#fff5f5' : '#f0fdf4',
                  border: `1px solid ${displayETA.isSimulated ? '#93c5fd' : selectedItem.varianceMinutes > 0 ? '#fecaca' : '#bbf7d0'}`,
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--trk-text-muted)' }}>
                      {displayETA.isSimulated ? `Simulated Prediction (${displayETA.scenTitle})` : 'Real-Time ML Predicted Arrival'}
                    </span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                      {displayETA.eta}
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      background: selectedItem.varianceMinutes > 0 ? '#fee2e2' : '#ecfdf5',
                      color: selectedItem.varianceMinutes > 0 ? '#b91c1c' : '#047857',
                    }}
                  >
                    Variance: {displayETA.variance}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)', marginTop: '6px' }}>
                  Scheduled Delivery SLA: <strong>{selectedItem.scheduledArrival}</strong> • Customer: <strong>{selectedItem.customer}</strong>
                </div>
              </div>

              {/* Factors Affecting ETA */}
              <div style={{ marginBottom: '14px' }}>
                <span className="trk-section-title">Telemetry Feature Weights (Gradient Boosted)</span>
                <div className="eta-factors-grid" style={{ marginTop: '6px' }}>
                  <div className="eta-factor-box">
                    <div className="eta-factor-label">🚦 Traffic Impact</div>
                    <div className="eta-factor-val">{selectedItem.factors.traffic}</div>
                  </div>
                  <div className="eta-factor-box">
                    <div className="eta-factor-label">📍 Remaining Distance</div>
                    <div className="eta-factor-val">{selectedItem.factors.distanceRemainingKm} km</div>
                  </div>
                  <div className="eta-factor-box">
                    <div className="eta-factor-label">⚡ Speed vs Baseline</div>
                    <div className="eta-factor-val">
                      {selectedItem.factors.currentSpeedKmH} km/h (Avg: {selectedItem.factors.segmentAvgSpeedKmH} km/h)
                    </div>
                  </div>
                  <div className="eta-factor-box">
                    <div className="eta-factor-label">🌦️ Weather Factor</div>
                    <div className="eta-factor-val">{selectedItem.factors.weather}</div>
                  </div>
                </div>
              </div>

              {/* ETA Breakdown Time Budget */}
              <div style={{ marginBottom: '14px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--trk-border)' }}>
                <span className="trk-section-title">Remaining Time Budget Breakdown</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center', marginTop: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: 'var(--trk-text-muted)' }}>Driving</div>
                    <strong style={{ fontSize: '0.85rem' }}>{selectedItem.breakdown.drivingTimeMin}m</strong>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: 'var(--trk-text-muted)' }}>Stop/Dock</div>
                    <strong style={{ fontSize: '0.85rem' }}>{selectedItem.breakdown.stopTimeMin}m</strong>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: 'var(--trk-text-muted)' }}>Buffer</div>
                    <strong style={{ fontSize: '0.85rem' }}>{selectedItem.breakdown.bufferMin}m</strong>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: 'var(--trk-primary)', fontWeight: 700 }}>Total</div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--trk-primary)' }}>{selectedItem.breakdown.totalRemainingMin}m</strong>
                  </div>
                </div>
              </div>

              {/* Interactive What-If Scenarios */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="trk-section-title">Interactive "What-If" Scenarios</span>
                  {activeScenarioKey && (
                    <button
                      style={{ background: 'none', border: 'none', color: 'var(--trk-primary)', fontSize: '0.75rem', cursor: 'pointer' }}
                      onClick={() => setActiveScenarioKey(null)}
                    >
                      Reset Simulator
                    </button>
                  )}
                </div>

                <div className="whatif-scenarios-container">
                  {Object.entries(selectedItem.whatIfScenarios || {}).map(([key, sc]) => {
                    const isActive = activeScenarioKey === key;
                    const isPositive = sc.impact.includes('Recovery') || sc.impact.includes('Early');

                    return (
                      <div
                        key={key}
                        className={`whatif-tile ${isActive ? 'active-sim' : ''}`}
                        onClick={() => setActiveScenarioKey(isActive ? null : key)}
                      >
                        <span className="whatif-title">{sc.title}</span>
                        <span
                          className="whatif-impact-badge"
                          style={{
                            background: isPositive ? '#ecfdf5' : '#fee2e2',
                            color: isPositive ? '#047857' : '#b91c1c',
                          }}
                        >
                          {sc.impact} (ETA: {sc.newETA})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="tender-action-btn btn-award"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.775rem' }}
                    onClick={() => setRerouteModalOpen(true)}
                  >
                    🔄 Apply Dynamic Re-Route
                  </button>
                  <button
                    className="tender-action-btn"
                    style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '8px 12px', fontSize: '0.775rem' }}
                    onClick={() => setNotifyModalOpen(true)}
                  >
                    📲 Notify Customer of ETA
                  </button>
                </div>

                <button
                  className="tender-action-btn"
                  style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '6px 12px', fontSize: '0.75rem' }}
                  onClick={() => showToast(`🏢 Receiving Dock Lead at ${selectedItem.destination} alerted for priority cross-dock.`)}
                >
                  🏢 Notify Receiving Dock Priority
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MODAL 1: NOTIFY CUSTOMER OF ETA CHANGE
           ========================================================================= */}
        {notifyModalOpen && (
          <div className="trk-modal-overlay" onClick={() => setNotifyModalOpen(false)}>
            <div className="trk-modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                  <span>📲</span> Dispatch Customer SLA Delivery Notification
                </h3>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                  onClick={() => setNotifyModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid var(--trk-border)', borderRadius: '8px', padding: '14px', marginBottom: '14px', fontSize: '0.8rem' }}>
                <div><strong>Customer:</strong> {selectedItem.customer}</div>
                <div style={{ marginTop: '4px' }}><strong>Vehicle / Driver:</strong> {selectedItem.registration} ({selectedItem.driver})</div>
                <div style={{ marginTop: '4px' }}><strong>Updated Predicted ETA:</strong> <span style={{ color: 'var(--trk-primary)', fontWeight: 800 }}>{selectedItem.predictedArrival}</span></div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--trk-text-muted)' }}>Automated SMS / Email Preview</label>
                <textarea
                  readOnly
                  rows="3"
                  className="proc-search-input"
                  style={{ width: '100%', resize: 'none', marginTop: '4px', fontSize: '0.8rem', background: '#ffffff' }}
                  value={`LogisticsHub Notification: Your shipment with carrier unit ${selectedItem.registration} is estimated to arrive at ${selectedItem.destination} by ${selectedItem.predictedArrival}. Track live at https://track.logisticshub.com/live/${selectedItem.vehicleId}`}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '8px 16px', fontSize: '0.8rem' }}
                  onClick={() => setNotifyModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="tender-action-btn btn-award"
                  style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                  onClick={() => {
                    setNotifyModalOpen(false);
                    showToast(`📱 SMS & Email notification dispatched to ${selectedItem.customerContact}!`);
                  }}
                >
                  🚀 Dispatch Customer Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 2: DYNAMIC RE-ROUTE CONFIRMATION
           ========================================================================= */}
        {rerouteModalOpen && (
          <div className="trk-modal-overlay" onClick={() => setRerouteModalOpen(false)}>
            <div className="trk-modal-box" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                  <span>🔄</span> Confirm AI Dynamic Re-Route Execution
                </h3>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                  onClick={() => setRerouteModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--trk-text-muted)', marginBottom: '14px' }}>
                The spatial routing algorithm identified a high-speed green bypass corridor around current bottlenecks for <strong>{selectedItem.registration}</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: '4px' }}>Current Bottleneck Route</div>
                  <div>Delay Impact: <strong>+{selectedItem.varianceMinutes} mins</strong></div>
                  <div>Cause: Heavy congestion / weather</div>
                </div>

                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '12px', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>Proposed Bypass Corridor</div>
                  <div>Time Saved: <strong>-{selectedItem.varianceMinutes} mins (Recovered)</strong></div>
                  <div>Mileage Variance: +12 km (Expressway)</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '8px 16px', fontSize: '0.8rem' }}
                  onClick={() => setRerouteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="tender-action-btn btn-award"
                  style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                  onClick={handleApplyReroute}
                >
                  ✓ Apply Dynamic Re-Route &amp; Push to Driver
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 3: RETRAIN ML MODEL PROGRESS
           ========================================================================= */}
        {retrainModalOpen && (
          <div className="trk-modal-overlay" onClick={() => !isRetraining && setRetrainModalOpen(false)}>
            <div className="trk-modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                  <span>🧠</span> ML Spatial-Temporal Regressor Retraining
                </h3>
                {!isRetraining && (
                  <button
                    style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                    onClick={() => setRetrainModalOpen(false)}
                  >
                    ✕
                  </button>
                )}
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--trk-text-muted)', marginBottom: '14px' }}>
                Re-calibrating gradient-boosted neural weights across 48,000 historical trips, live weather radar, and toll gate queues.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Training Neural Matrix...</span>
                  <span style={{ color: 'var(--trk-primary)' }}>{retrainingProgress}% Complete</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${retrainingProgress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #2563eb, #10b981)',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid var(--trk-border)', borderRadius: '8px', padding: '12px', fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                <div>• Loading 2.4M geospatial breadcrumb coordinates... (Done)</div>
                <div>• Ingesting national highway weather satellite radar... (Done)</div>
                <div>• Updating confidence interval bounds: ±8m → ±6m target.</div>
              </div>

              {!isRetraining && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button
                    className="tender-action-btn btn-award"
                    style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                    onClick={() => setRetrainModalOpen(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ETAManagement;
