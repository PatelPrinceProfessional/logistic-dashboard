import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { exceptionDashboardStats, exceptionsQueue as initialExceptions } from '../../utils/mockData/exceptionsData';
import './Exceptions.css';

const ExceptionsDashboard = () => {
  const navigate = useNavigate();

  // State
  const [exceptions, setExceptions] = useState(initialExceptions);
  const [selectedId, setSelectedId] = useState(initialExceptions[0].id);
  const [activeTab, setActiveTab] = useState('summary'); // summary | shipments | mitigation | audit
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Interactive inputs
  const [noteText, setNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [newModalOpen, setNewModalOpen] = useState(false);

  // New Exception form
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Delivery Delay');
  const [newSeverity, setNewSeverity] = useState('high');
  const [newShipmentId, setNewShipmentId] = useState('SHP-100245');
  const [newRootCause, setNewRootCause] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedException = exceptions.find((e) => e.id === selectedId) || exceptions[0];

  // Filtered queue
  const filteredQueue = exceptions.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driverName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'all' || item.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;

    return matchesSearch && matchesSeverity && matchesStatus && matchesType;
  });

  // Handle adding investigation note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLog = {
      time: timeStr,
      user: 'CurrentUser (You)',
      action: `Investigation Note: "${noteText}"`,
    };

    setExceptions((prev) =>
      prev.map((item) =>
        item.id === selectedException.id
          ? { ...item, historyLog: [newLog, ...(item.historyLog || [])] }
          : item
      )
    );

    setNoteText('');
    showToast(`📝 Note recorded for ${selectedException.id}.`);
  };

  // Handle mitigation trigger
  const handleTriggerMitigation = (mitigationTitle) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLog = {
      time: timeStr,
      user: 'CurrentUser (You)',
      action: `Mitigation Executed: ${mitigationTitle}`,
    };

    setExceptions((prev) =>
      prev.map((item) =>
        item.id === selectedException.id
          ? {
              ...item,
              status: 'Resolved',
              historyLog: [newLog, ...(item.historyLog || [])],
            }
          : item
      )
    );

    showToast(`✓ Mitigation '${mitigationTitle}' executed! ${selectedException.id} marked as Resolved.`);
  };

  // Handle status update
  const handleUpdateStatus = (newStatus) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLog = {
      time: timeStr,
      user: 'CurrentUser (You)',
      action: `Status changed to ${newStatus}`,
    };

    setExceptions((prev) =>
      prev.map((item) =>
        item.id === selectedException.id
          ? {
              ...item,
              status: newStatus,
              historyLog: [newLog, ...(item.historyLog || [])],
            }
          : item
      )
    );

    showToast(`Status updated to '${newStatus}' for ${selectedException.id}.`);
  };

  // Handle creating new exception
  const handleCreateNewException = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEx = {
      id: `EXC-2024-${Math.floor(100000 + Math.random() * 900000)}`,
      title: newTitle,
      type: newType,
      severity: newSeverity,
      status: 'Unassigned',
      createdTime: 'Just now',
      elapsedTime: '0m',
      dueTime: '2h 00m remaining',
      isOverdue: false,
      shipmentId: newShipmentId,
      orderId: 'ORD-90812',
      customer: 'ABC Logistics Pvt Ltd',
      carrier: 'BlueDart Express Line',
      vehicleId: 'VEH-3042',
      driverName: 'John Smith',
      driverPhone: '+1 (555) 234-5678',
      origin: 'Delhi Gate North Hub',
      destination: 'Jaipur Industrial Corridor',
      location: 'Highway NH-48 Corridor Mile 42',
      estimatedImpact: 'SLA delay pending investigation',
      rootCause: newRootCause || 'Under investigation by telemetry dispatcher.',
      assignee: null,
      cargoSummary: {
        itemsCount: 3,
        weightKg: 250,
        cargoValue: '$18,000',
        serviceLevel: 'Express Guaranteed',
      },
      historyLog: [
        { time: 'Just now', user: 'CurrentUser (You)', action: 'Incident reported manually from Control Tower' },
      ],
    };

    setExceptions([newEx, ...exceptions]);
    setSelectedId(newEx.id);
    setNewModalOpen(false);
    setNewTitle('');
    setNewRootCause('');
    showToast(`⚠️ Exception ${newEx.id} logged into active queue!`);
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
              Home &gt; Control Tower &gt; <strong style={{ color: '#0f172a' }}>Exceptions Management</strong>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>🚨</span> Control Tower Exception Management &amp; Triage
            </h1>
            <p style={{ fontSize: '0.825rem', color: 'var(--exc-text-muted)', margin: '4px 0 0 0' }}>
              Real-time bottleneck resolution, cold-chain temperature triage, vehicle breakdown interventions, and SLA penalty mitigation
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div className="exc-nav-tabs">
              <button className="exc-nav-tab active" onClick={() => navigate('/exceptions')}>
                Exceptions Dashboard
              </button>
              <button className="exc-nav-tab" onClick={() => navigate('/exceptions/risks')}>
                Proactive Risk Queue
              </button>
              <button className="exc-nav-tab" onClick={() => navigate('/control-tower')}>
                Live GIS Map
              </button>
            </div>

            <button
              className="tender-action-btn btn-award"
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              onClick={() => setNewModalOpen(true)}
            >
              ➕ Log New Exception
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="exc-metrics-grid">
          <div
            className="exc-metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSeverityFilter('all');
              setStatusFilter('all');
            }}
          >
            <div className="exc-metric-label">Active Exceptions in Queue</div>
            <div className="exc-metric-value" style={{ color: '#0066cc' }}>
              {exceptions.length} Active
            </div>
            <div className="exc-metric-subtext">{exceptionDashboardStats.resolvedToday} resolved today</div>
          </div>

          <div
            className="exc-metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setSeverityFilter('critical')}
          >
            <div className="exc-metric-label">Critical SLA Breaches</div>
            <div className="exc-metric-value" style={{ color: '#ef4444' }}>
              {exceptions.filter((e) => e.severity === 'critical').length} Critical
            </div>
            <div className="exc-metric-subtext">Requires immediate dispatcher intervention</div>
          </div>

          <div className="exc-metric-card">
            <div className="exc-metric-label">Financial Cargo Exposure</div>
            <div className="exc-metric-value" style={{ color: '#d97706' }}>
              {exceptionDashboardStats.financialExposure}
            </div>
            <div className="exc-metric-subtext">Guarded via active mitigation protocols</div>
          </div>

          <div className="exc-metric-card">
            <div className="exc-metric-label">Avg Resolution Time (MTTR)</div>
            <div className="exc-metric-value" style={{ color: '#10b981' }}>
              {exceptionDashboardStats.avgResolutionTime}
            </div>
            <div className="exc-metric-subtext">96.2% on-time SLA protection rate</div>
          </div>
        </div>

        {/* Master-Detail Split Layout (Left 30% Queue + Right 70% Detail) */}
        <div className="exc-split-layout">
          {/* Left Panel: Exception Queue */}
          <div className="exc-queue-panel">
            <div className="exc-queue-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Active Exception Stack</strong>
                <span className="badge badge--danger" style={{ fontSize: '0.725rem' }}>
                  {filteredQueue.length} Incidents
                </span>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                className="proc-search-input"
                style={{ width: '100%', fontSize: '0.8rem', marginBottom: '8px' }}
                placeholder="Search ID, Shipment, Driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Severity Pill Selector */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'critical', label: '🔴 Critical' },
                  { id: 'high', label: '🟠 High' },
                  { id: 'medium', label: '🟡 Med' },
                ].map((p) => (
                  <button
                    key={p.id}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      border: '1px solid var(--exc-border)',
                      background: severityFilter === p.id ? 'var(--exc-primary)' : '#ffffff',
                      color: severityFilter === p.id ? '#ffffff' : '#0f172a',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSeverityFilter(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable List */}
            <div className="exc-queue-list">
              {filteredQueue.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--exc-text-muted)', fontSize: '0.8rem' }}>
                  No exceptions matching filter.
                </div>
              ) : (
                filteredQueue.map((item) => {
                  const isSelected = item.id === selectedException.id;
                  const isCritical = item.severity === 'critical';
                  const isHigh = item.severity === 'high';

                  return (
                    <div
                      key={item.id}
                      className={`exc-queue-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <div className="exc-queue-item-header">
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            color: isCritical ? '#b91c1c' : isHigh ? '#b45309' : '#1d4ed8',
                          }}
                        >
                          ● {item.severity} • {item.type}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: item.isOverdue ? '#ef4444' : 'var(--exc-text-muted)',
                          }}
                        >
                          {item.dueTime}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#0f172a' }}>
                        {item.title}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)' }}>
                        Shipment: <strong>{item.shipmentId}</strong> • Driver: {item.driverName}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '0.725rem' }}>
                        <span style={{ color: 'var(--exc-text-muted)' }}>📍 {item.location}</span>
                        <span className={`badge badge--${item.status === 'Resolved' ? 'success' : item.status === 'Unassigned' ? 'danger' : 'warning'}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Deep Detail Workspace */}
          <div className="exc-detail-panel">
            {/* Top Severity Alert Banner */}
            <div className={`exc-banner-alert ${selectedException.severity}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--exc-text-muted)' }}>
                    {selectedException.id} • Reported {selectedException.createdTime} ({selectedException.elapsedTime} ago)
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0 0', color: '#0f172a' }}>
                    {selectedException.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <select
                    className="shp-select-dropdown"
                    value={selectedException.status}
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                    style={{ fontSize: '0.8rem' }}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Action Required">Action Required</option>
                    <option value="Escalated">Escalated</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <button
                    className="tender-action-btn btn-award"
                    style={{ padding: '6px 12px', fontSize: '0.775rem' }}
                    onClick={() => handleUpdateStatus('Resolved')}
                  >
                    ✓ Mark Resolved
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#334155', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '8px', marginTop: '4px' }}>
                <strong>Estimated SLA Impact:</strong> {selectedException.estimatedImpact}
              </div>
            </div>

            {/* 4 Detail Tabs */}
            <div className="shp-tabs-bar" style={{ margin: 0 }}>
              <button
                className={`shp-tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                <span>📋</span> 1. Incident Summary
              </button>
              <button
                className={`shp-tab-btn ${activeTab === 'shipments' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipments')}
              >
                <span>📦</span> 2. Impacted Cargo &amp; Route
              </button>
              <button
                className={`shp-tab-btn ${activeTab === 'mitigation' ? 'active' : ''}`}
                onClick={() => setActiveTab('mitigation')}
              >
                <span>⚡</span> 3. Mitigation Actions
              </button>
              <button
                className={`shp-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
                onClick={() => setActiveTab('audit')}
              >
                <span>📜</span> 4. History Audit Log ({selectedException.historyLog?.length || 0})
              </button>
            </div>

            {/* Tab 1: Summary */}
            {activeTab === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid var(--exc-border)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--exc-text-muted)' }}>
                    Diagnosed Root Cause Telemetry
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>
                    ⚠️ {selectedException.rootCause}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ border: '1px solid var(--exc-border)', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)', fontWeight: 700 }}>VEHICLE TELEMATICS</div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--exc-primary)', marginTop: '2px' }}>
                      {selectedException.vehicleId} ({selectedException.carrier})
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: '4px' }}>
                      Driver: <strong>{selectedException.driverName}</strong> ({selectedException.driverPhone})
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--exc-border)', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)', fontWeight: 700 }}>GEOSPATIAL LOCATION</div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginTop: '2px' }}>
                      📍 {selectedException.location}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: '4px' }}>
                      Route: {selectedException.origin} → {selectedException.destination}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Impacted Cargo */}
            {activeTab === 'shipments' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--exc-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>Shipment ID</div>
                    <div style={{ fontWeight: 800, color: 'var(--exc-primary)' }}>{selectedException.shipmentId}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--exc-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>Customer</div>
                    <div style={{ fontWeight: 800 }}>{selectedException.customer}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--exc-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>Cargo Weight</div>
                    <div style={{ fontWeight: 800 }}>{selectedException.cargoSummary.weightKg} kg</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--exc-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--exc-text-muted)' }}>Declared Value</div>
                    <div style={{ fontWeight: 800, color: '#059669' }}>{selectedException.cargoSummary.cargoValue}</div>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--exc-border)', borderRadius: '8px', padding: '14px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Service Level Agreement</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--exc-text-muted)', margin: 0 }}>
                    Governed by <strong>{selectedException.cargoSummary.serviceLevel}</strong>. Penalty clause triggers after 60-minute variance past delivery appointment window.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Mitigation Actions */}
            {activeTab === 'mitigation' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span className="exc-metric-label">Recommended Mitigation Strategies</span>

                <div className="mitigation-tiles-grid">
                  <div className="mitigation-tile">
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>🗺️ Reroute via State Toll Ring Road</strong>
                      <p style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)', margin: '4px 0 10px 0' }}>
                        Bypasses current bottleneck (+14 km, saves 45 mins of transit delay).
                      </p>
                    </div>
                    <button
                      className="tender-action-btn btn-award"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => handleTriggerMitigation('State Toll Ring Road Detour')}
                    >
                      ✓ Execute Detour Route
                    </button>
                  </div>

                  <div className="mitigation-tile">
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>🚛 Emergency Tractor Unit Swap</strong>
                      <p style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)', margin: '4px 0 10px 0' }}>
                        Dispatches backup tractor from nearby hub to tow stranded freight trailer.
                      </p>
                    </div>
                    <button
                      className="tender-action-btn btn-award"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => handleTriggerMitigation('Emergency Tractor Swap')}
                    >
                      ✓ Dispatch Tow &amp; Swap
                    </button>
                  </div>

                  <div className="mitigation-tile">
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>❄️ Mobile Cold Chain Reefer Deploy</strong>
                      <p style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)', margin: '4px 0 10px 0' }}>
                        Connects auxiliary cooling generator to safeguard temperature-sensitive cargo.
                      </p>
                    </div>
                    <button
                      className="tender-action-btn btn-award"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => handleTriggerMitigation('Mobile Cold Chain Reefer Deploy')}
                    >
                      ✓ Connect Auxiliary Reefer
                    </button>
                  </div>
                </div>

                {/* Append Note Form */}
                <div style={{ borderTop: '1px solid var(--exc-border)', paddingTop: '14px' }}>
                  <span className="exc-metric-label">Append Investigation Findings</span>
                  <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <input
                      type="text"
                      className="proc-search-input"
                      placeholder="Type investigation update, phone confirmation, or consignee notes..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <button type="submit" className="tender-action-btn btn-award" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                      Add Note
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Tab 4: Audit Trail */}
            {activeTab === 'audit' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(selectedException.historyLog || []).map((h, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '10px 14px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid var(--exc-border)',
                    }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--exc-primary)', fontSize: '0.8rem' }}>
                      {h.time}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#0f172a' }}>{h.action}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--exc-text-muted)' }}>Recorded by {h.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal: Log New Exception */}
        {newModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
            onClick={() => setNewModalOpen(false)}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '540px',
                padding: '24px',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                  <span>➕</span> Report New Control Tower Exception
                </h3>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  onClick={() => setNewModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateNewException}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Incident Title / Category</label>
                    <input
                      type="text"
                      className="proc-search-input"
                      style={{ width: '100%' }}
                      placeholder="e.g. Highway Waterlogging Delay, Toll Inspection Hold..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Incident Type</label>
                      <select
                        className="shp-select-dropdown"
                        style={{ width: '100%' }}
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                      >
                        <option value="Delivery Delay">Delivery Delay</option>
                        <option value="Vehicle Breakdown">Vehicle Breakdown</option>
                        <option value="Temperature Breach">Temperature Breach</option>
                        <option value="Route Deviation">Route Deviation</option>
                        <option value="Document Expiry">Document Expiry</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Severity Level</label>
                      <select
                        className="shp-select-dropdown"
                        style={{ width: '100%' }}
                        value={newSeverity}
                        onChange={(e) => setNewSeverity(e.target.value)}
                      >
                        <option value="critical">Critical (Immediate)</option>
                        <option value="high">High (Action Required)</option>
                        <option value="medium">Medium (Investigating)</option>
                        <option value="low">Low (Monitoring)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Impacted Shipment ID</label>
                    <input
                      type="text"
                      className="proc-search-input"
                      style={{ width: '100%' }}
                      value={newShipmentId}
                      onChange={(e) => setNewShipmentId(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Root Cause Diagnosis</label>
                    <textarea
                      rows="3"
                      className="proc-search-input"
                      style={{ width: '100%', resize: 'none' }}
                      placeholder="Details on telemetry, highway blockage, weather conditions..."
                      value={newRootCause}
                      onChange={(e) => setNewRootCause(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button
                    type="button"
                    className="tender-action-btn"
                    style={{ background: '#ffffff', border: '1px solid var(--exc-border)', color: '#0f172a', padding: '8px 16px', fontSize: '0.8rem' }}
                    onClick={() => setNewModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="tender-action-btn btn-award"
                    style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                  >
                    Submit Exception Alert
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

export default ExceptionsDashboard;
