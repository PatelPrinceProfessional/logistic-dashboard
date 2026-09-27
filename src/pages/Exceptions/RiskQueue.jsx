import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { riskQueueList as initialRisks } from '../../utils/mockData/exceptionsData';
import './Exceptions.css';

const RiskQueue = () => {
  const navigate = useNavigate();

  // State
  const [risks, setRisks] = useState(initialRisks);
  const [selectedId, setSelectedId] = useState(initialRisks[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all'); // all | critical | high | medium | low
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedRisk = risks.find((r) => r.id === selectedId) || risks[0];

  // Filtered risks
  const filteredRisks = risks.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driverName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = levelFilter === 'all' || item.riskLevel === levelFilter;

    return matchesSearch && matchesLevel;
  });

  // Handle Apply Mitigation Option
  const handleApplyMitigation = (option) => {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === selectedRisk.id
          ? {
              ...r,
              status: 'Mitigated',
              predictedETA: option.newETA,
              riskScore: Math.max(r.riskScore - 45, 20),
              riskLevel: 'low',
            }
          : r
      )
    );

    showToast(`✓ Mitigation '${option.title}' activated! SLA delay averted for ${selectedRisk.shipmentId}.`);
  };

  return (
    <Layout activePage="exceptions">
      <div className="exc-container">
        {/* Toast Notification */}
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
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
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
        <div className="exc-header">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)', marginBottom: '4px' }}>
              Home &gt; Control Tower &gt; <strong style={{ color: '#0f172a' }}>Proactive Risk Queue</strong>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>🧠</span> Proactive Risk Queue &amp; Predictive SLA Protection
            </h1>
            <p style={{ fontSize: '0.825rem', color: 'var(--exc-text-muted)', margin: '4px 0 0 0' }}>
              AI Predictive early-warning algorithm: Risk Score = Probability × Delay Impact. Mitigate bottlenecks before they breach SLA.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div className="exc-nav-tabs">
              <button className="exc-nav-tab" onClick={() => navigate('/exceptions')}>
                Exceptions Dashboard
              </button>
              <button className="exc-nav-tab active" onClick={() => navigate('/exceptions/risks')}>
                Proactive Risk Queue
              </button>
              <button className="exc-nav-tab" onClick={() => navigate('/control-tower')}>
                Live GIS Map
              </button>
            </div>

            <button
              className="tender-action-btn btn-award"
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              onClick={() => showToast('⚡ AI risk forecast matrix auto-recalculated across all in-transit corridors.')}
            >
              ⚡ Recalculate Risk Scores
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="exc-metrics-grid">
          <div
            className="exc-metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setLevelFilter('all')}
          >
            <div className="exc-metric-label">Active Predictive Risks</div>
            <div className="exc-metric-value" style={{ color: '#0066cc' }}>
              {risks.length} Forecasted
            </div>
            <div className="exc-metric-subtext">Monitored in real-time via telematics</div>
          </div>

          <div
            className="exc-metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setLevelFilter('critical')}
          >
            <div className="exc-metric-label">Critical Risk Score (80+)</div>
            <div className="exc-metric-value" style={{ color: '#ef4444' }}>
              {risks.filter((r) => r.riskLevel === 'critical').length} Critical
            </div>
            <div className="exc-metric-subtext">Immediate mitigation action recommended</div>
          </div>

          <div
            className="exc-metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setLevelFilter('high')}
          >
            <div className="exc-metric-label">High Risk Score (60–79)</div>
            <div className="exc-metric-value" style={{ color: '#d97706' }}>
              {risks.filter((r) => r.riskLevel === 'high').length} High
            </div>
            <div className="exc-metric-subtext">SLA breach probability &gt; 60%</div>
          </div>

          <div className="exc-metric-card">
            <div className="exc-metric-label">Predicted SLA Saves Today</div>
            <div className="exc-metric-value" style={{ color: '#10b981' }}>
              14 Shipments
            </div>
            <div className="exc-metric-subtext">$68,500 in penalty fees averted</div>
          </div>
        </div>

        {/* Master-Detail Split Layout */}
        <div className="exc-split-layout">
          {/* Left Panel: Risk Queue List */}
          <div className="exc-queue-panel">
            <div className="exc-queue-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Predictive Risk Stack</strong>
                <span className="badge badge--warning" style={{ fontSize: '0.725rem' }}>
                  {filteredRisks.length} Forecasts
                </span>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                className="proc-search-input"
                style={{ width: '100%', fontSize: '0.8rem', marginBottom: '8px' }}
                placeholder="Search Shipment, Customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Risk Level Pills */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'critical', label: '🔴 Score 80+' },
                  { id: 'high', label: '🟠 Score 60-79' },
                  { id: 'medium', label: '🟡 Score 40-59' },
                ].map((p) => (
                  <button
                    key={p.id}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      border: '1px solid var(--exc-border)',
                      background: levelFilter === p.id ? 'var(--exc-primary)' : '#ffffff',
                      color: levelFilter === p.id ? '#ffffff' : '#0f172a',
                      cursor: 'pointer',
                    }}
                    onClick={() => setLevelFilter(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Risk List */}
            <div className="exc-queue-list">
              {filteredRisks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--exc-text-muted)', fontSize: '0.8rem' }}>
                  No risk items matching filter.
                </div>
              ) : (
                filteredRisks.map((item) => {
                  const isSelected = item.id === selectedRisk.id;
                  const isCritical = item.riskLevel === 'critical';
                  const isHigh = item.riskLevel === 'high';

                  return (
                    <div
                      key={item.id}
                      className={`exc-queue-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <div className="exc-queue-item-header">
                        <span
                          className={`risk-score-badge ${
                            isCritical ? 'risk-score-critical' : isHigh ? 'risk-score-high' : 'risk-score-medium'
                          }`}
                        >
                          ⚡ Risk Score: {item.riskScore}/100
                        </span>

                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: isCritical ? '#ef4444' : 'var(--exc-text-muted)',
                          }}
                        >
                          ⏳ {item.timeUntilBreach}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#0f172a' }}>
                        {item.title}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)' }}>
                        Shipment: <strong>{item.shipmentId}</strong> • Customer: {item.customer}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '0.725rem' }}>
                        <span style={{ color: '#0f172a', fontWeight: 600 }}>
                          Probability: <strong style={{ color: isCritical ? '#ef4444' : '#d97706' }}>{item.probabilityPct}%</strong> ({item.impactHours}h delay)
                        </span>
                        <span className={`badge badge--${item.status === 'Mitigated' ? 'success' : 'warning'}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Deep Risk Detail & Mitigation Simulator */}
          <div className="exc-detail-panel">
            {/* Top Risk Score Header Box */}
            <div className={`exc-banner-alert ${selectedRisk.riskLevel}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--exc-text-muted)' }}>
                    {selectedRisk.id} • Proactive SLA Risk Monitor
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0 0', color: '#0f172a' }}>
                    {selectedRisk.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    className={`risk-score-badge ${
                      selectedRisk.riskLevel === 'critical'
                        ? 'risk-score-critical'
                        : selectedRisk.riskLevel === 'high'
                        ? 'risk-score-high'
                        : 'risk-score-medium'
                    }`}
                    style={{ fontSize: '0.9rem', padding: '6px 14px' }}
                  >
                    Risk Score: {selectedRisk.riskScore} / 100
                  </span>

                  <span className={`badge badge--${selectedRisk.status === 'Mitigated' ? 'success' : 'warning'}`}>
                    ● {selectedRisk.status}
                  </span>
                </div>
              </div>

              {/* ETA Variance & Breach Countdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '8px' }}>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid var(--exc-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>Scheduled Delivery SLA</div>
                  <strong style={{ fontSize: '0.95rem' }}>{selectedRisk.scheduledETA}</strong>
                </div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid var(--exc-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>AI Predicted Arrival</div>
                  <strong style={{ fontSize: '0.95rem', color: '#ef4444' }}>{selectedRisk.predictedETA}</strong>
                </div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid var(--exc-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>Breach Probability</div>
                  <strong style={{ fontSize: '0.95rem', color: '#d97706' }}>{selectedRisk.probabilityPct}%</strong>
                </div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid var(--exc-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>Time Until Breach</div>
                  <strong style={{ fontSize: '0.95rem', color: '#b91c1c' }}>{selectedRisk.timeUntilBreach}</strong>
                </div>
              </div>
            </div>

            {/* Telematics Snapshot */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--exc-border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)', fontWeight: 700 }}>LIVE CORRIDOR STATUS</div>
                <div style={{ marginTop: '4px' }}>📍 <strong>Location:</strong> {selectedRisk.currentLocation}</div>
                <div style={{ marginTop: '2px' }}>⚡ <strong>Speed:</strong> {selectedRisk.currentSpeed}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--exc-border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)', fontWeight: 700 }}>CARRIER &amp; DRIVER</div>
                <div style={{ marginTop: '4px' }}>🚚 <strong>Carrier:</strong> {selectedRisk.carrier} ({selectedRisk.vehicleId})</div>
                <div style={{ marginTop: '2px' }}>👤 <strong>Driver:</strong> {selectedRisk.driverName} ({selectedRisk.driverPhone})</div>
              </div>
            </div>

            {/* Probability Factor Breakdown */}
            <div>
              <span className="exc-metric-label">AI Risk Probability Contribution Breakdown</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {selectedRisk.probabilityFactors.map((f, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--exc-border)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', fontWeight: 600, marginBottom: '4px' }}>
                      <span>{f.name}</span>
                      <span style={{ color: 'var(--exc-text-muted)' }}>
                        {f.impact} • <strong>{f.chance}% weight</strong>
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${f.chance}%`,
                          height: '100%',
                          background: f.chance > 70 ? '#ef4444' : f.chance > 40 ? '#f59e0b' : '#3b82f6',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigation Strategy Simulator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="exc-metric-label">Pre-Calculated Dynamic Mitigation Strategies</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)' }}>
                  Click to execute &amp; notify driver/customer
                </span>
              </div>

              <div className="mitigation-tiles-grid">
                {selectedRisk.mitigationOptions.map((opt) => (
                  <div key={opt.id} className="mitigation-tile">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{opt.title}</strong>
                        <span style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700 }}>
                          Success: {opt.successProb}
                        </span>
                      </div>

                      <div style={{ margin: '8px 0', fontSize: '0.775rem' }}>
                        <div>⏱️ <strong>New Predicted ETA:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{opt.newETA}</span></div>
                        <div style={{ marginTop: '2px' }}>💰 <strong>Implementation Cost:</strong> {opt.cost}</div>
                      </div>

                      <p style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)', margin: '4px 0 12px 0' }}>
                        {opt.desc}
                      </p>
                    </div>

                    <button
                      className="tender-action-btn btn-award"
                      style={{ padding: '8px 14px', fontSize: '0.775rem' }}
                      onClick={() => handleApplyMitigation(opt)}
                    >
                      ⚡ Apply This Mitigation Strategy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RiskQueue;
