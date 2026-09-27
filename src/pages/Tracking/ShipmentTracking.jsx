import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { detailedShipmentsTracking } from '../../utils/mockData/trackingData';
import './Tracking.css';

const ShipmentTracking = () => {
  const navigate = useNavigate();

  // Selected Shipment state
  const [shipments, setShipments] = useState(detailedShipmentsTracking);
  const [selectedId, setSelectedId] = useState(detailedShipmentsTracking[0].id);
  const [activeTab, setActiveTab] = useState('overview'); // overview | map | feed | docs | exceptions
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive controls
  const [expandedMilestones, setExpandedMilestones] = useState({ 'ev-1': true, 'ev-6': true });
  const [mapZoom, setMapZoom] = useState(1);
  const [showTrafficLayer, setShowTrafficLayer] = useState(true);
  const [autoRefreshFeed, setAutoRefreshFeed] = useState(true);
  const [feedFilter, setFeedFilter] = useState('all');

  // Modals & Notifications
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [exceptionModalOpen, setExceptionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New Exception form
  const [newExcTitle, setNewExcTitle] = useState('');
  const [newExcSeverity, setNewExcSeverity] = useState('Medium');
  const [newExcImpact, setNewExcImpact] = useState('+20m Delay');
  const [newExcResolution, setNewExcResolution] = useState('');

  const currentShipment = shipments.find((s) => s.id === selectedId) || shipments[0];

  // Helper toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleMilestoneExpand = (id) => {
    setExpandedMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Simulate auto-refresh GPS ping
  useEffect(() => {
    if (!autoRefreshFeed) return;
    const timer = setInterval(() => {
      // Simulate live ping update
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newPing = {
        id: `ls-${Date.now()}`,
        time: timeStr,
        event: 'Automatic GPS Ping',
        location: `${currentShipment.currentLocationName} (Sector ${Math.floor(Math.random() * 9 + 1)})`,
        speed: `${Math.floor(Math.random() * 15 + 55)} km/h`,
        status: 'Normal Telemetry',
      };

      setShipments((prev) =>
        prev.map((s) => {
          if (s.id === currentShipment.id) {
            return {
              ...s,
              liveStream: [newPing, ...(s.liveStream || [])],
            };
          }
          return s;
        })
      );
    }, 15000);

    return () => clearInterval(timer);
  }, [autoRefreshFeed, currentShipment.id, currentShipment.currentLocationName]);

  // Handle adding live ping manually
  const handleManualPing = () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newPing = {
      id: `ls-${Date.now()}`,
      time: timeStr,
      event: 'Manual Telemetry Request',
      location: currentShipment.currentLocationName,
      speed: `${currentShipment.speedKmH} km/h`,
      status: 'Verified High-Accuracy (±3m)',
    };

    setShipments((prev) =>
      prev.map((s) => (s.id === currentShipment.id ? { ...s, liveStream: [newPing, ...(s.liveStream || [])] } : s))
    );
    showToast(`✓ Live GPS telemetry ping received for ${currentShipment.id}!`);
  };

  // Handle logging new exception
  const handleLogException = (e) => {
    e.preventDefault();
    if (!newExcTitle.trim()) return;

    const newEx = {
      id: `exc-${Date.now()}`,
      title: newExcTitle,
      severity: newExcSeverity,
      impact: newExcImpact,
      resolution: newExcResolution || 'Rerouting in progress via Central Dispatch',
    };

    setShipments((prev) =>
      prev.map((s) =>
        s.id === currentShipment.id
          ? {
              ...s,
              status: `At Risk (${newExcImpact})`,
              exceptions: [...(s.exceptions || []), newEx],
            }
          : s
      )
    );

    setNewExcTitle('');
    setNewExcResolution('');
    setExceptionModalOpen(false);
    showToast(`⚠️ Exception logged for ${currentShipment.id}. Dispatch alerted!`);
  };

  // Filtered live stream
  const filteredLiveStream = (currentShipment.liveStream || []).filter((item) => {
    if (feedFilter === 'gps') return item.event.toLowerCase().includes('gps');
    if (feedFilter === 'toll') return item.event.toLowerCase().includes('toll');
    if (feedFilter === 'speed') return item.event.toLowerCase().includes('speed');
    if (feedFilter === 'alerts') return item.status.toLowerCase().includes('alert') || item.status.toLowerCase().includes('traffic');
    return true;
  });

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
              Home &gt; Live Tracking &gt; <strong style={{ color: '#0f172a' }}>{currentShipment.id}</strong>
            </div>
            <h1>
              <span>📦</span> Multi-Leg Shipment Tracking &amp; Milestone Visibility
            </h1>
            <p>End-to-end milestone lifecycle tracking, GPS telematics stream, and customer delivery visibility</p>
          </div>

          <div className="disp-header-actions">
            <div className="trk-nav-tabs">
              <button className="trk-nav-tab" onClick={() => navigate('/tracking')}>
                Live Map
              </button>
              <button className="trk-nav-tab active" onClick={() => navigate('/tracking/shipments')}>
                Shipment Tracking
              </button>
              <button className="trk-nav-tab" onClick={() => navigate('/tracking/eta')}>
                ETA Predictions
              </button>
            </div>
          </div>
        </div>

        {/* Top Shipment Summary Banner */}
        <div className="shp-top-banner">
          <div className="shp-banner-left">
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Active Cargo Tracker
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                <select
                  className="shp-select-dropdown"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  {shipments.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id} — {s.customer} ({s.origin} → {s.destination})
                    </option>
                  ))}
                </select>

                <span
                  className="status-pill"
                  style={{
                    backgroundColor: currentShipment.status.includes('Delay') || currentShipment.status.includes('Risk')
                      ? 'var(--trk-warning-light)'
                      : 'var(--trk-success-light)',
                    color: currentShipment.status.includes('Delay') || currentShipment.status.includes('Risk')
                      ? 'var(--trk-warning)'
                      : 'var(--trk-success)',
                    border: `1px solid ${
                      currentShipment.status.includes('Delay') || currentShipment.status.includes('Risk')
                        ? '#fde68a'
                        : '#a7f3d0'
                    }`,
                    fontWeight: 700,
                  }}
                >
                  ● {currentShipment.status}
                </span>
              </div>
            </div>

            <div className="shp-meta-tags">
              <div>
                <span style={{ color: 'var(--trk-text-muted)' }}>Order ID:</span>{' '}
                <strong style={{ color: '#0f172a' }}>{currentShipment.orderId}</strong>
              </div>
              <div>•</div>
              <div>
                <span style={{ color: 'var(--trk-text-muted)' }}>Customer:</span>{' '}
                <strong style={{ color: '#0f172a' }}>{currentShipment.customer}</strong>
              </div>
              <div>•</div>
              <div>
                <span style={{ color: 'var(--trk-text-muted)' }}>Expected Delivery:</span>{' '}
                <strong style={{ color: 'var(--trk-primary)' }}>{currentShipment.expectedDelivery}</strong>
              </div>
            </div>
          </div>

          <div className="shp-banner-actions">
            <button
              className="tender-action-btn btn-award"
              style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={() => setShareModalOpen(true)}
            >
              <span>📲</span> Share Customer Portal Link
            </button>
            <button
              className="tender-action-btn"
              style={{
                background: '#ffffff',
                border: '1px solid var(--trk-border)',
                color: '#0f172a',
                padding: '8px 14px',
                fontSize: '0.8rem',
              }}
              onClick={() => showToast(`🖨️ Printing Shipment Manifest & Waybill for ${currentShipment.id}...`)}
            >
              <span>🖨️</span> Print Manifest
            </button>
            <button
              className="tender-action-btn"
              style={{
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                color: '#e11d48',
                padding: '8px 14px',
                fontSize: '0.8rem',
              }}
              onClick={() => setExceptionModalOpen(true)}
            >
              <span>⚠️</span> Report Exception
            </button>
          </div>
        </div>

        {/* 5-Tab Navigation Bar */}
        <div className="shp-tabs-bar">
          <button
            className={`shp-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span>📋</span> 1. Overview &amp; Milestones
          </button>
          <button
            className={`shp-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <span>🗺️</span> 2. Interactive Route Map
          </button>
          <button
            className={`shp-tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            <span>📡</span> 3. Live Telematics Feed{' '}
            <span className="shp-badge-count badge-count-blue">{currentShipment.liveStream?.length || 0}</span>
          </button>
          <button
            className={`shp-tab-btn ${activeTab === 'docs' ? 'active' : ''}`}
            onClick={() => setActiveTab('docs')}
          >
            <span>📑</span> 4. Documents &amp; ePOD{' '}
            <span className="shp-badge-count badge-count-blue">{currentShipment.documents?.length || 0}</span>
          </button>
          <button
            className={`shp-tab-btn ${activeTab === 'exceptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('exceptions')}
          >
            <span>⚠️</span> 5. Exceptions &amp; Delays{' '}
            {currentShipment.exceptions?.length > 0 && (
              <span className="shp-badge-count badge-count-orange">{currentShipment.exceptions.length}</span>
            )}
          </button>
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW & MILESTONES
           ========================================================================= */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', alignItems: 'start' }}>
            {/* Left Column (60%): Progress Timeline & Live Telematics Card */}
            <div>
              {/* Current Live Location Telematics Card */}
              <div className="live-telematics-kpi-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="hud-pulse-dot" />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e3a8a' }}>
                      Currently In-Transit
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                    Last GPS Ping: <strong>2 mins ago</strong> (Accuracy: ±5m)
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '8px' }}>
                  📍 Current Corridor:{' '}
                  <strong style={{ color: '#0f172a' }}>{currentShipment.currentLocationName}</strong>
                </div>

                {/* KPI Gauges */}
                <div className="telematics-gauges-row">
                  <div className="telematics-gauge-box">
                    <div className="telematics-gauge-label">Live Telematics Speed</div>
                    <div className="telematics-gauge-val" style={{ color: 'var(--trk-primary)' }}>
                      {currentShipment.speedKmH} km/h
                    </div>
                  </div>
                  <div className="telematics-gauge-box">
                    <div className="telematics-gauge-label">Distance Remaining</div>
                    <div className="telematics-gauge-val">{currentShipment.remainingDistanceKm} km</div>
                  </div>
                  <div className="telematics-gauge-box">
                    <div className="telematics-gauge-label">Completed Distance</div>
                    <div className="telematics-gauge-val" style={{ color: 'var(--trk-success)' }}>
                      {currentShipment.completedDistanceKm} / {currentShipment.totalDistanceKm} km
                    </div>
                  </div>
                  <div className="telematics-gauge-box">
                    <div className="telematics-gauge-label">Execution Progress</div>
                    <div className="telematics-gauge-val" style={{ color: '#7c3aed' }}>
                      {currentShipment.progressPct}%
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: '14px' }}>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${currentShipment.progressPct}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #2563eb, #10b981)',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Milestone Stepper */}
              <div className="disp-card">
                <div className="disp-card-header">
                  <div>
                    <h3 style={{ margin: 0 }}>Milestone Trajectory Checklist</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                      8-stage SLA checkpoint validation
                    </span>
                  </div>
                  <span style={{ fontSize: '0.775rem', color: 'var(--trk-primary)', fontWeight: 600 }}>
                    {currentShipment.eventsTimeline.filter((e) => e.completed).length} of{' '}
                    {currentShipment.eventsTimeline.length} Checkpoints Cleared
                  </span>
                </div>

                <div className="milestone-stepper" style={{ marginTop: '16px' }}>
                  {currentShipment.eventsTimeline.map((ev, idx) => {
                    const isCurrent = ev.time.includes('Current');
                    return (
                      <div
                        key={ev.id}
                        className={`milestone-step-item ${isCurrent ? 'is-current' : ''}`}
                      >
                        <div
                          className={`milestone-node-indicator ${
                            ev.completed ? 'milestone-node-completed' : isCurrent ? 'milestone-node-current' : 'milestone-node-pending'
                          }`}
                        >
                          {ev.completed ? '✓' : idx + 1}
                        </div>

                        <div className="milestone-body">
                          <div className="milestone-header-row">
                            <span className="milestone-title">{ev.title}</span>
                            <span
                              className="milestone-time"
                              style={{ color: isCurrent ? 'var(--trk-primary)' : 'var(--trk-text-muted)' }}
                            >
                              {ev.time}
                            </span>
                          </div>

                          <div className="milestone-meta-row">
                            <span>📍 {ev.location}</span>
                            <span>•</span>
                            <span>👤 Actor: <strong>{ev.actor}</strong></span>
                            <button
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--trk-primary)',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                padding: 0,
                                marginLeft: 'auto',
                              }}
                              onClick={() => toggleMilestoneExpand(ev.id)}
                            >
                              {expandedMilestones[ev.id] ? '▲ Less details' : '▼ View details'}
                            </button>
                          </div>

                          {expandedMilestones[ev.id] && (
                            <div className="milestone-details-box">
                              {ev.details}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column (40%): Shipment Specs, Carrier Details, Freight */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Shipment Details Card */}
              <div className="disp-card">
                <div className="disp-card-header">
                  <h3>
                    <span>📦</span> Shipment Specifications
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Service Level:</span>
                    <strong style={{ color: '#0f172a' }}>{currentShipment.serviceLevel}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Origin Hub:</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{currentShipment.origin}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)', textAlign: 'right', marginTop: '-6px' }}>
                    {currentShipment.originAddress}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Destination Consignee:</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{currentShipment.destination}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)', textAlign: 'right', marginTop: '-6px' }}>
                    {currentShipment.destinationAddress}
                  </div>
                </div>
              </div>

              {/* Freight Specifications */}
              <div className="disp-card">
                <div className="disp-card-header">
                  <h3>
                    <span>⚖️</span> Freight &amp; Cargo Specs
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid var(--trk-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)' }}>Total Items</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{currentShipment.itemsCount} Parcels</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid var(--trk-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)' }}>Weight</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{currentShipment.weightKg} kg</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid var(--trk-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)' }}>Volume</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{currentShipment.volumeCbm} CBM</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid var(--trk-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)' }}>Cold Chain Reefer</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: currentShipment.tempControl ? '#10b981' : '#64748b' }}>
                      {currentShipment.tempControl ? 'Active (+3.8°C)' : 'Ambient'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrier & Driver Assigned */}
              <div className="disp-card">
                <div className="disp-card-header">
                  <h3>
                    <span>🚚</span> Carrier &amp; Driver Telematics
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Carrier Partner:</span>
                    <strong style={{ color: 'var(--trk-primary)' }}>{currentShipment.carrier}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Vehicle Reg:</span>
                    <strong style={{ color: '#0f172a' }}>{currentShipment.vehicleRegistration}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Driver:</span>
                    <strong style={{ color: '#0f172a' }}>{currentShipment.driverName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Direct Contact:</span>
                    <strong style={{ color: '#0f172a' }}>{currentShipment.driverPhone}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button
                      className="tender-action-btn"
                      style={{
                        flex: 1,
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        color: '#047857',
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                      }}
                      onClick={() => showToast(`📞 Calling driver ${currentShipment.driverName} (${currentShipment.driverPhone})...`)}
                    >
                      📞 Call Driver
                    </button>
                    <button
                      className="tender-action-btn"
                      style={{
                        flex: 1,
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        color: '#1d4ed8',
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                      }}
                      onClick={() => showToast(`💬 Dispatch SMS sent to ${currentShipment.driverName}.`)}
                    >
                      💬 Dispatch SMS
                    </button>
                  </div>
                </div>
              </div>

              {/* SLA & On-Time Confidence */}
              <div className="disp-card" style={{ background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--trk-text-muted)' }}>
                    AI SLA Delivery Confidence
                  </span>
                  <span style={{ fontWeight: 800, color: '#10b981', fontSize: '0.85rem' }}>98.4% On-Time</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '98%', height: '100%', background: '#10b981' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)', marginTop: '8px' }}>
                  Machine learning model analyzes current highway density, weather conditions, and gate clearance speed.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: INTERACTIVE ROUTE MAP
           ========================================================================= */}
        {activeTab === 'map' && (
          <div>
            <div className="live-map-canvas-container" style={{ height: '540px' }}>
              {/* Floating Top Control HUD */}
              <div className="map-floating-hud">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="hud-pulse-dot" />
                  <span>Tracking: <strong>{currentShipment.id}</strong></span>
                </div>
                <div>•</div>
                <div>Carrier: <strong>{currentShipment.carrier}</strong></div>
                <div>•</div>
                <div>Vehicle: <strong>{currentShipment.vehicleRegistration}</strong></div>
                <div>•</div>
                <div>Speed: <strong style={{ color: 'var(--trk-primary)' }}>{currentShipment.speedKmH} km/h</strong></div>
              </div>

              {/* Map Canvas SVG */}
              <svg className="live-map-svg" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="shp-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                  </pattern>
                  <linearGradient id="completedRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                <rect width="100%" height="100%" fill="url(#shp-map-grid)" />

                {/* Geographic background corridors */}
                <path d="M 20 180 Q 200 240, 400 160 T 680 120" stroke="#cbd5e1" strokeWidth="12" fill="none" opacity="0.6" strokeLinecap="round" />
                <path d="M 60 360 Q 250 280, 480 200 T 660 60" stroke="#cbd5e1" strokeWidth="8" fill="none" opacity="0.4" strokeLinecap="round" />

                {/* Traffic Congestion Highlight Layer */}
                {showTrafficLayer && (
                  <>
                    <path d="M 60 180 Q 200 170, 380 150" className="map-traffic-green" />
                    <path d="M 380 150 Q 470 145, 560 140" className="map-traffic-green" />
                  </>
                )}

                {/* Completed Route Segment (Solid Emerald) */}
                <path
                  d={`M ${currentShipment.originCoords.x} ${currentShipment.originCoords.y} Q ${(currentShipment.originCoords.x + currentShipment.currentCoords.x) / 2} ${(currentShipment.originCoords.y + currentShipment.currentCoords.y) / 2 - 20}, ${currentShipment.currentCoords.x} ${currentShipment.currentCoords.y}`}
                  stroke="url(#completedRouteGrad)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Remaining Route Segment (Dashed Sapphire) */}
                <path
                  d={`M ${currentShipment.currentCoords.x} ${currentShipment.currentCoords.y} Q ${(currentShipment.currentCoords.x + currentShipment.destinationCoords.x) / 2} ${(currentShipment.currentCoords.y + currentShipment.destinationCoords.y) / 2 - 20}, ${currentShipment.destinationCoords.x} ${currentShipment.destinationCoords.y}`}
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Origin Hub Pin (Green) */}
                <g transform={`translate(${currentShipment.originCoords.x}, ${currentShipment.originCoords.y})`}>
                  <circle r="14" fill="rgba(16, 185, 129, 0.2)" />
                  <circle r="8" fill="#10b981" />
                  <text y="-18" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
                    🟢 Origin: {currentShipment.origin}
                  </text>
                </g>

                {/* Destination Hub Pin (Red) */}
                <g transform={`translate(${currentShipment.destinationCoords.x}, ${currentShipment.destinationCoords.y})`}>
                  <circle r="14" fill="rgba(239, 68, 68, 0.2)" />
                  <circle r="8" fill="#ef4444" />
                  <text y="-18" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
                    🔴 Destination: {currentShipment.destination}
                  </text>
                </g>

                {/* Current Moving Vehicle Marker */}
                <g transform={`translate(${currentShipment.currentCoords.x}, ${currentShipment.currentCoords.y})`}>
                  <circle r="22" fill="rgba(37, 99, 235, 0.15)">
                    <animate attributeName="r" values="16;26;16" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="12" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
                  <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
                    🚛
                  </text>
                  <g transform="translate(0, 24)">
                    <rect x="-65" y="0" width="130" height="22" rx="4" fill="#0f172a" opacity="0.9" />
                    <text x="0" y="14" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="600">
                      {currentShipment.vehicleRegistration} • {currentShipment.speedKmH} km/h
                    </text>
                  </g>
                </g>
              </svg>

              {/* Map Floating Right Controls */}
              <div className="map-zoom-buttons">
                <button
                  className="zoom-btn"
                  title="Toggle Traffic Layer"
                  onClick={() => setShowTrafficLayer((prev) => !prev)}
                  style={{ background: showTrafficLayer ? '#eff6ff' : '#ffffff', color: showTrafficLayer ? '#2563eb' : '#0f172a' }}
                >
                  🚦
                </button>
                <button
                  className="zoom-btn"
                  title="Center on Vehicle"
                  onClick={() => showToast(`🎯 Centered on vehicle ${currentShipment.vehicleRegistration}`)}
                >
                  🎯
                </button>
                <button className="zoom-btn" title="Zoom In" onClick={() => setMapZoom((z) => Math.min(z + 0.2, 2))}>
                  +
                </button>
                <button className="zoom-btn" title="Zoom Out" onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}>
                  −
                </button>
              </div>
            </div>

            {/* Route Summary Bar Below Map */}
            <div className="tracking-bottom-bar">
              <div className="trk-stats-pills">
                <span className="trk-stat-pill">
                  Total Route: <strong>{currentShipment.totalDistanceKm} km</strong>
                </span>
                <span className="trk-stat-pill" style={{ color: 'var(--trk-success)' }}>
                  Completed: <strong>{currentShipment.completedDistanceKm} km ({currentShipment.progressPct}%)</strong>
                </span>
                <span className="trk-stat-pill" style={{ color: 'var(--trk-primary)' }}>
                  Remaining: <strong>{currentShipment.remainingDistanceKm} km ({100 - currentShipment.progressPct}%)</strong>
                </span>
                <span className="trk-stat-pill">
                  Speed: <strong>{currentShipment.speedKmH} km/h</strong>
                </span>
                <span className="trk-stat-pill" style={{ color: '#047857' }}>
                  Predicted ETA: <strong>{currentShipment.expectedDelivery} (On-Time)</strong>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={() => showToast(`🔗 Map share URL copied to clipboard!`)}
                >
                  🔗 Share Live Map Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: LIVE TELEMATICS FEED
           ========================================================================= */}
        {activeTab === 'feed' && (
          <div className="disp-card">
            <div className="disp-card-header">
              <div>
                <h3 style={{ margin: 0 }}>Live Telematics &amp; IoT Data Stream</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                  Automated GPS telemetry pings, toll scans, and geofence events for {currentShipment.vehicleRegistration}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={autoRefreshFeed}
                    onChange={(e) => setAutoRefreshFeed(e.target.checked)}
                  />
                  Auto-Refresh (Every 15s)
                </label>
                <button
                  className="tender-action-btn btn-award"
                  style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                  onClick={handleManualPing}
                >
                  📡 Request Real-Time GPS Ping
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', margin: '14px 0', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Telemetry Events' },
                { id: 'gps', label: '🛰️ GPS Pings' },
                { id: 'toll', label: '💳 Toll Plazas' },
                { id: 'speed', label: '⚡ Speed Monitoring' },
                { id: 'alerts', label: '⚠️ Alerts & Delays' },
              ].map((f) => (
                <button
                  key={f.id}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '16px',
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    border: '1px solid var(--trk-border)',
                    background: feedFilter === f.id ? 'var(--trk-primary)' : '#ffffff',
                    color: feedFilter === f.id ? '#ffffff' : '#0f172a',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFeedFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Telematics Table */}
            <table className="telematics-feed-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Event Type</th>
                  <th>Geospatial Location / Corridor</th>
                  <th>Telematics Speed</th>
                  <th>Sensor Status</th>
                  <th>Hardware Verification</th>
                </tr>
              </thead>
              <tbody>
                {filteredLiveStream.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--trk-text-muted)' }}>
                      No events matching filter.
                    </td>
                  </tr>
                ) : (
                  filteredLiveStream.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 700, color: 'var(--trk-primary)' }}>{item.time}</td>
                      <td>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: item.event.includes('Alert') || item.event.includes('Congestion')
                              ? '#fef2f2'
                              : '#eff6ff',
                            color: item.event.includes('Alert') || item.event.includes('Congestion')
                              ? '#ef4444'
                              : '#2563eb',
                          }}
                        >
                          {item.event}
                        </span>
                      </td>
                      <td>📍 {item.location}</td>
                      <td><strong>{item.speed}</strong></td>
                      <td>
                        <span
                          style={{
                            color: item.status.includes('Normal') || item.status.includes('Safe') || item.status.includes('Cleared')
                              ? '#10b981'
                              : '#f59e0b',
                            fontWeight: 600,
                          }}
                        >
                          ● {item.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--trk-text-muted)', fontSize: '0.75rem' }}>
                        OBD-II CAN-Bus (Validated)
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================================================================
            TAB 4: DOCUMENTS & EPOD
           ========================================================================= */}
        {activeTab === 'docs' && (
          <div>
            <div className="doc-cards-grid">
              {currentShipment.documents?.map((doc) => (
                <div key={doc.id} className="doc-tile-card">
                  <div>
                    <div className="doc-tile-header">
                      <div className="doc-icon-badge">📄</div>
                      <div className="doc-tile-info">
                        <h4>{doc.title}</h4>
                        <p>Format: {doc.type} • File Size: {doc.size}</p>
                        <p style={{ marginTop: '2px' }}>Issued: {doc.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="doc-tile-actions">
                    <button
                      className="tender-action-btn"
                      style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', fontSize: '0.75rem', padding: '6px 10px' }}
                      onClick={() => {
                        setSelectedDoc(doc);
                        setDocModalOpen(true);
                      }}
                    >
                      👁️ Preview Document
                    </button>
                    <button
                      className="tender-action-btn"
                      style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', fontSize: '0.75rem', padding: '6px 10px' }}
                      onClick={() => showToast(`📥 Downloaded ${doc.title} (PDF)`)}
                    >
                      ⬇️ Download
                    </button>
                  </div>
                </div>
              ))}

              {/* ePOD (Electronic Proof of Delivery) Card */}
              <div className="doc-tile-card" style={{ border: '1px solid #bfdbfe', background: '#f8faff' }}>
                <div>
                  <div className="doc-tile-header">
                    <div className="doc-icon-badge" style={{ background: '#ecfdf5', color: '#059669' }}>
                      ✍️
                    </div>
                    <div className="doc-tile-info">
                      <h4>Electronic Proof of Delivery (ePOD)</h4>
                      <p>Recipient Sign-off &amp; GPS Location Timestamp</p>
                    </div>
                  </div>

                  <div className="epod-preview-box">
                    <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)', marginBottom: '4px' }}>
                      Consignee Digital Sign-off Preview
                    </div>
                    <div className="signature-canvas-sim">
                      R. K. Sharma
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)', marginTop: '4px' }}>
                      SHA-256 Stamp: <code style={{ color: '#0f172a' }}>8f2c01a9b4...94a</code>
                    </div>
                  </div>
                </div>

                <div className="doc-tile-actions">
                  <button
                    className="tender-action-btn btn-award"
                    style={{ flex: 1, fontSize: '0.75rem', padding: '6px 10px' }}
                    onClick={() => showToast(`✓ ePOD digital verification certificate verified!`)}
                  >
                    🔒 Verify Cryptographic Seal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: EXCEPTIONS & DELAY LOGS
           ========================================================================= */}
        {activeTab === 'exceptions' && (
          <div className="disp-card">
            <div className="disp-card-header">
              <div>
                <h3 style={{ margin: 0 }}>Route Exceptions &amp; SLA Delay Mitigations</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                  Active bottlenecks, detour approvals, and incident management logs
                </span>
              </div>

              <button
                className="tender-action-btn"
                style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', fontSize: '0.75rem', padding: '6px 14px' }}
                onClick={() => setExceptionModalOpen(true)}
              >
                ➕ Log New Route Exception
              </button>
            </div>

            {(!currentShipment.exceptions || currentShipment.exceptions.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🛡️</div>
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>Zero Active Exceptions</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--trk-text-muted)', maxWidth: '420px', margin: '0 auto' }}>
                  Shipment <strong>{currentShipment.id}</strong> is running smoothly within scheduled SLA parameters with 98.4% on-time delivery confidence.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {currentShipment.exceptions.map((ex) => (
                  <div key={ex.id} className="exception-alert-card">
                    <div className="exception-header-badge">
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#991b1b' }}>
                        ⚠️ {ex.title}
                      </span>
                      <span className="status-pill" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                        {ex.severity} Severity • {ex.impact}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '6px' }}>
                      <strong>Active Resolution / Plan:</strong> {ex.resolution}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <button
                        className="tender-action-btn btn-award"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        onClick={() => showToast(`✓ Alternate routing approved for ${currentShipment.id}!`)}
                      >
                        ✓ Approve Mitigation Route
                      </button>
                      <button
                        className="tender-action-btn"
                        style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '6px 12px', fontSize: '0.75rem' }}
                        onClick={() => showToast(`📱 Customer SMS notification sent with updated ETA ${currentShipment.expectedDelivery}.`)}
                      >
                        📲 Notify Consignee of +15m Delay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            MODAL 1: SHARE CUSTOMER TRACKING PORTAL
           ========================================================================= */}
        {shareModalOpen && (
          <div className="trk-modal-overlay" onClick={() => setShareModalOpen(false)}>
            <div className="trk-modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                  <span>📲</span> Share Live Customer Tracking Portal
                </h3>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                  onClick={() => setShareModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--trk-text-muted)', marginBottom: '16px' }}>
                Generate an authenticated, branded tracking link for <strong>{currentShipment.customer}</strong>. Customers can view live milestone checkpoints, driver ETA, and download ePOD without logging in.
              </p>

              <div style={{ background: '#f8fafc', border: '1px solid var(--trk-border)', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--trk-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Customer Public URL
                </label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="text"
                    readOnly
                    value={`https://track.logisticshub.com/live/${currentShipment.id}?token=9f8a2b3c`}
                    style={{ flex: 1, padding: '8px 10px', fontSize: '0.8rem', border: '1px solid var(--trk-border)', borderRadius: '6px', background: '#ffffff' }}
                  />
                  <button
                    className="tender-action-btn btn-award"
                    style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                    onClick={() => showToast(`📋 Link copied to clipboard!`)}
                  >
                    Copy Link
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="tender-action-btn"
                  style={{ flex: 1, background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '8px', fontSize: '0.8rem' }}
                  onClick={() => {
                    setShareModalOpen(false);
                    showToast(`📱 SMS with tracking link sent to ${currentShipment.customer}!`);
                  }}
                >
                  📱 Send SMS Notification
                </button>
                <button
                  className="tender-action-btn"
                  style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '8px', fontSize: '0.8rem' }}
                  onClick={() => {
                    setShareModalOpen(false);
                    showToast(`✉️ Email dispatched to ${currentShipment.customer} logistics team!`);
                  }}
                >
                  ✉️ Send Email Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 2: DOCUMENT PREVIEW MODAL
           ========================================================================= */}
        {docModalOpen && selectedDoc && (
          <div className="trk-modal-overlay" onClick={() => setDocModalOpen(false)}>
            <div className="trk-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                  <span>📑</span> {selectedDoc.title}
                </h3>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                  onClick={() => setDocModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid var(--trk-border)', borderRadius: '8px', padding: '20px', minHeight: '260px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>LogisticsHub Logistics Express</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>Official Digital Freight Consignment</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>Doc ID:</span>
                    <strong style={{ display: 'block', color: 'var(--trk-primary)', fontSize: '0.85rem' }}>{selectedDoc.id}</strong>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', marginBottom: '14px' }}>
                  <div>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Shipment ID:</span> <strong>{currentShipment.id}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Order Reference:</span> <strong>{currentShipment.orderId}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Carrier Unit:</span> <strong>{currentShipment.vehicleRegistration}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Driver:</span> <strong>{currentShipment.driverName}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Gross Cargo Weight:</span> <strong>{currentShipment.weightKg} kg</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--trk-text-muted)' }}>Validation Status:</span> <strong style={{ color: '#10b981' }}>e-Signed Verified</strong>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '10px', fontSize: '0.75rem', color: 'var(--trk-text-muted)' }}>
                  This document constitutes a legally binding digital freight record issued pursuant to Multi-Modal Transportation Regulations.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '8px 16px', fontSize: '0.8rem' }}
                  onClick={() => setDocModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="tender-action-btn btn-award"
                  style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                  onClick={() => {
                    setDocModalOpen(false);
                    showToast(`📥 PDF downloaded: ${selectedDoc.title}`);
                  }}
                >
                  ⬇️ Download PDF Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 3: LOG EXCEPTION MODAL
           ========================================================================= */}
        {exceptionModalOpen && (
          <div className="trk-modal-overlay" onClick={() => setExceptionModalOpen(false)}>
            <div className="trk-modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                  <span>⚠️</span> Log Route Exception &amp; Delay Alert
                </h3>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                  onClick={() => setExceptionModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleLogException}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Exception Category / Title</label>
                    <input
                      type="text"
                      className="proc-search-input"
                      style={{ width: '100%' }}
                      placeholder="e.g. Toll Plaza Clearance Bottleneck, Engine Warning..."
                      value={newExcTitle}
                      onChange={(e) => setNewExcTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Severity Level</label>
                      <select
                        className="shp-select-dropdown"
                        style={{ width: '100%' }}
                        value={newExcSeverity}
                        onChange={(e) => setNewExcSeverity(e.target.value)}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High / Critical">High / Critical</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Estimated Delay Impact</label>
                      <input
                        type="text"
                        className="proc-search-input"
                        style={{ width: '100%' }}
                        value={newExcImpact}
                        onChange={(e) => setNewExcImpact(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Mitigation Plan / Proposed Action</label>
                    <textarea
                      rows="3"
                      className="proc-search-input"
                      style={{ width: '100%', resize: 'none' }}
                      placeholder="e.g. Reroute via State Toll Ring Road, Notify Consignee..."
                      value={newExcResolution}
                      onChange={(e) => setNewExcResolution(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button
                    type="button"
                    className="tender-action-btn"
                    style={{ background: '#ffffff', border: '1px solid var(--trk-border)', color: '#0f172a', padding: '8px 16px', fontSize: '0.8rem' }}
                    onClick={() => setExceptionModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="tender-action-btn"
                    style={{ background: '#e11d48', color: '#ffffff', border: 'none', padding: '8px 18px', fontSize: '0.8rem', fontWeight: 700 }}
                  >
                    ⚠️ Submit Exception Alert
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShipmentTracking;
