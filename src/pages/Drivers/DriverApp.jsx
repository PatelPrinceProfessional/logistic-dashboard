import { useState, useRef, useEffect } from 'react';
import { driverAppInitialSession } from '../../utils/mockData/driversData';
import './Drivers.css';

export default function DriverApp() {
  const [session, setSession] = useState(driverAppInitialSession);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'trips' | 'tracking' | 'profile' | 'chat'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(0);

  // Modal states
  const [showPreTripModal, setShowPreTripModal] = useState(false);
  const [showPodModal, setShowPodModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(3);
  const [sosTriggered, setSosTriggered] = useState(false);

  // Pre-Trip Checklist State
  const [checklist, setChecklist] = useState({
    vehicleCondition: true,
    tiresInspected: true,
    fuelChecked: true,
    safetyEquipment: true,
    documentsPresent: true,
    gpsFunctioning: true,
    cargoSecured: true,
  });

  // POD Signature Pad Canvas State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [podMode, setPodMode] = useState('signature'); // 'signature' | 'otp'
  const [otpCode, setOtpCode] = useState('');
  const [goodsConditionOk, setGoodsConditionOk] = useState(true);
  const [podSuccess, setPodSuccess] = useState(false);

  // Expense Form State
  const [expenseData, setExpenseData] = useState({
    type: 'Fuel / Diesel',
    amount: '',
    receiptNote: '',
  });

  // Dispatch Chat State
  const [chatMessages, setChatMessages] = useState(session.dispatcherChat);
  const [inputMsg, setInputMsg] = useState('');

  // Duty Toggle
  const handleSetDuty = (newStatus) => {
    setSession((prev) => ({
      ...prev,
      driver: { ...prev.driver, status: newStatus },
    }));
  };

  // Pre-Trip Checklist Submit
  const handleCompletePreTrip = () => {
    setSession((prev) => ({
      ...prev,
      pendingTasks: prev.pendingTasks.map((t) =>
        t.type === 'Checklist' ? { ...t, isCompleted: true, completedAt: 'Just Now' } : t
      ),
    }));
    setShowPreTripModal(false);
    alert('✅ Pre-Trip Inspection submitted to Central Safety Log!');
  };

  // Canvas Signature Drawing
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e293b';
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Complete Delivery POD
  const handleCompleteDelivery = () => {
    if (podMode === 'otp' && otpCode.length < 4) {
      alert('Please enter a 4-digit recipient verification OTP.');
      return;
    }

    setPodSuccess(true);
    setTimeout(() => {
      setSession((prev) => ({
        ...prev,
        activeTrip: {
          ...prev.activeTrip,
          completedStops: 2,
          stops: prev.activeTrip.stops.map((s) =>
            s.stopNumber === 2 ? { ...s, status: 'Completed', podSignature: 'Digital POD Captured' } : s
          ),
          nextStop: {
            ...prev.activeTrip.stops[2],
            stopNumber: 3,
            stopName: prev.activeTrip.stops[2].stopName,
            address: prev.activeTrip.stops[2].address,
            contactPerson: 'Harish Nair',
            contactPhone: '+91 98440 99120',
            etaText: 'In 45 mins (16:30 IST)',
            distanceText: '24.2 km away',
            actionType: 'Delivery & OTP Confirmation',
            shipmentId: 'SHP-88095',
            items: [{ sku: 'IND-HDW-12', name: 'Industrial Hardware Units', qty: 12, weight: '1,200 kg' }],
          },
        },
        pendingTasks: prev.pendingTasks.map((t) =>
          t.type === 'Delivery POD' ? { ...t, isCompleted: true } : t
        ),
      }));
      setPodSuccess(false);
      setShowPodModal(false);
      alert('📦 Delivery POD successfully captured & synced with Dispatch Tower!');
    }, 1200);
  };

  // Submit Expense
  const handleSubmitExpense = (e) => {
    e.preventDefault();
    if (!expenseData.amount) return;

    const newExp = {
      id: `EXP-${Math.floor(10 + Math.random() * 90)}`,
      type: expenseData.type,
      amount: parseFloat(expenseData.amount),
      date: 'Today, Just Now',
      receiptPhoto: 'receipt_uploaded.jpg',
      status: 'Pending Approval',
    };

    setSession((prev) => ({
      ...prev,
      loggedExpenses: [newExp, ...prev.loggedExpenses],
    }));
    setExpenseData({ type: 'Fuel / Diesel', amount: '', receiptNote: '' });
    setShowExpenseModal(false);
    alert(`💳 Expense of ₹${newExp.amount} submitted for reimbursement.`);
  };

  // Send Chat Message
  const handleSendChat = (text) => {
    const msgText = text || inputMsg;
    if (!msgText.trim()) return;

    const newMsg = {
      id: `MSG-${Date.now()}`,
      sender: 'driver',
      name: session.driver.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: msgText,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');

    // Simulated Auto-Reply from Dispatch after 1.5s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `MSG-${Date.now() + 1}`,
          sender: 'dispatcher',
          name: 'Alok (HQ Dispatch)',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Acknowledged, Rajesh. Logged in Control Tower.`,
        },
      ]);
    }, 1500);
  };

  // SOS Panic Trigger
  const triggerSosPanic = () => {
    setSosTriggered(true);
    setTimeout(() => {
      alert('🚨 EMERGENCY SOS SENT: Fleet Safety HQ, Local PCR, and Roadside Assist alerted with Live GPS Coordinates!');
    }, 500);
  };

  return (
    <div className="driver-app-page-wrapper">
      {/* Top Device Viewport Controls */}
      <div className="driver-app-top-controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-secondary)' }}>
            📱 Driver Mobile Companion
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsOffline(!isOffline)}
            style={{ fontSize: '11px', padding: '4px 8px' }}
          >
            {isOffline ? '🔴 Offline Mode' : '🟢 Online (5G)'}
          </button>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
          style={{ fontSize: '11px', padding: '4px 8px' }}
        >
          {isFullscreen ? '📱 Phone Bezel View' : '🖥️ Expanded View'}
        </button>
      </div>

      {/* Realistic Mobile Viewport Container */}
      <div className={`driver-app-phone-container ${isFullscreen ? 'fullscreen-mode' : ''}`}>
        {/* Device Status Bar */}
        <div className="phone-status-bar">
          <span>{session.systemStatus.currentTime}</span>
          <div className="phone-speaker-notch" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{isOffline ? 'Offline' : '5G'}</span>
            <span>📶</span>
            <span>{session.systemStatus.batteryLevel}</span>
          </div>
        </div>

        {/* Driver App Screen Body */}
        <div className="driver-app-screen-body">
          {/* ── TAB 1: HOME SCREEN ── */}
          {activeTab === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Sticky Header */}
              <div className="driver-app-header-sticky">
                <div>
                  <div className="driver-app-greeting">Good afternoon, {session.driver.name.split(' ')[0]}!</div>
                  <div className="driver-app-subgreet">Vehicle: <strong>{session.driver.vehicle.split(' ')[0]}</strong></div>
                </div>
                {/* Duty Toggle Switch */}
                <div className="driver-duty-toggle-group">
                  <button
                    className={`duty-btn ${session.driver.status === 'On Duty' ? 'active onduty' : ''}`}
                    onClick={() => handleSetDuty('On Duty')}
                  >
                    On Duty
                  </button>
                  <button
                    className={`duty-btn ${session.driver.status === 'On Break' ? 'active break' : ''}`}
                    onClick={() => handleSetDuty('On Break')}
                  >
                    Break
                  </button>
                  <button
                    className={`duty-btn ${session.driver.status === 'Off Duty' ? 'active offduty' : ''}`}
                    onClick={() => handleSetDuty('Off Duty')}
                  >
                    Off
                  </button>
                </div>
              </div>

              {/* Active Trip Card */}
              {session.activeTrip && (
                <div className="app-active-trip-card">
                  <div className="app-trip-top-row">
                    <span className="app-trip-badge">ACTIVE TRIP • {session.activeTrip.id}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700 }}>
                      Stop {session.activeTrip.completedStops + 1} of {session.activeTrip.totalStops}
                    </span>
                  </div>

                  <div className="app-next-stop-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.9 }}>
                      <span>NEXT STOP</span>
                      <span style={{ fontWeight: 800 }}>ETA {session.activeTrip.nextStop.etaText}</span>
                    </div>
                    <div className="app-stop-title">{session.activeTrip.nextStop.stopName}</div>
                    <div className="app-stop-address">📍 {session.activeTrip.nextStop.address}</div>
                    <div style={{ marginTop: '6px', fontSize: '11px', color: '#93c5fd' }}>
                      Cargo: <strong>{session.activeTrip.nextStop.items?.length || 2} items ({session.activeTrip.temperatureCurrent})</strong>
                    </div>
                  </div>

                  <div className="app-trip-actions-row">
                    <button
                      className="app-btn-nav"
                      onClick={() => setActiveTab('tracking')}
                    >
                      🗺️ Start Navigation ({session.activeTrip.distanceRemaining})
                    </button>
                    <button
                      className="app-btn-call"
                      onClick={() => alert(`Calling Customer: ${session.activeTrip.nextStop.contactPhone}`)}
                    >
                      📞 Call
                    </button>
                    <button
                      className="app-btn-call"
                      style={{ background: '#10b981', borderColor: '#059669' }}
                      onClick={() => setShowPodModal(true)}
                    >
                      ✍ POD
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Actions Row */}
              <div className="app-quick-actions-row">
                <button className="app-action-tile" onClick={() => setActiveTab('chat')}>
                  <span style={{ fontSize: '18px' }}>💬</span>
                  <span className="app-action-tile-lbl">Dispatch Chat</span>
                </button>
                <button className="app-action-tile" onClick={() => setShowExpenseModal(true)}>
                  <span style={{ fontSize: '18px' }}>💳</span>
                  <span className="app-action-tile-lbl">Log Expense</span>
                </button>
                <button className="app-action-tile sos" onClick={() => setShowSosModal(true)}>
                  <span style={{ fontSize: '18px' }}>🚨</span>
                  <span className="app-action-tile-lbl">SOS Emergency</span>
                </button>
              </div>

              {/* Tasks Checklist Section */}
              <div className="app-tasks-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="app-section-title">Today's Assigned Tasks</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>
                    {session.pendingTasks.filter((t) => t.isCompleted).length}/{session.pendingTasks.length} Done
                  </span>
                </div>

                {session.pendingTasks.map((task) => (
                  <div key={task.id} className={`app-task-card ${task.isCompleted ? 'done' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>{task.isCompleted ? '✅' : '⏳'}</span>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                          {task.title}
                        </div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>
                          {task.isCompleted ? `Completed at ${task.completedAt || 'Earlier'}` : 'Action Required'}
                        </div>
                      </div>
                    </div>
                    {!task.isCompleted && (
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '10px', padding: '4px 8px' }}
                        onClick={() => {
                          if (task.type === 'Checklist') setShowPreTripModal(true);
                          else if (task.type === 'Delivery POD') setShowPodModal(true);
                          else alert(`Action opened for ${task.title}`);
                        }}
                      >
                        Start
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Push Notifications Feed */}
              <div className="app-tasks-container" style={{ paddingBottom: '20px' }}>
                <span className="app-section-title">Dispatch Broadcasts</span>
                {session.notifications.map((n) => (
                  <div key={n.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>
                      <span>📢 {n.title}</span>
                      <span style={{ color: '#94a3b8', fontSize: '10px' }}>{n.time}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{n.body}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 2: TRIPS & MANIFEST ── */}
          {activeTab === 'trips' && (
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Trip Route & Manifest</h3>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb' }}>{session.activeTrip.id}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {session.activeTrip.stops.map((stop, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: stop.status === 'Next Stop' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: stop.status === 'Completed' ? '#10b981' : stop.status === 'Next Stop' ? '#2563eb' : '#94a3b8',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 800,
                          }}
                        >
                          {stop.stopNumber}
                        </span>
                        <span style={{ fontWeight: 800, fontSize: '13px' }}>{stop.stopName}</span>
                      </div>
                      <span
                        className={`driver-status-pill ${stop.status === 'Completed' ? 'ontrip' : stop.status === 'Next Stop' ? 'available' : 'offduty'}`}
                        style={{ fontSize: '10px' }}
                      >
                        {stop.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>📍 {stop.address}</div>
                    {stop.cargo && (
                      <div style={{ fontSize: '11px', color: '#1e293b', fontWeight: 600, marginTop: '4px' }}>
                        📦 Cargo: {stop.cargo}
                      </div>
                    )}

                    {stop.status === 'Next Stop' && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setActiveTab('tracking')}>
                          🗺️ Navigate
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setShowPodModal(true)}>
                          Capture POD
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 3: TURN-BY-TURN TRACKING SIMULATOR ── */}
          {activeTab === 'tracking' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {/* Simulated GPS Navigation View */}
              <div
                style={{
                  flex: 1,
                  background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Simulated Road Lines */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '60px',
                    borderLeft: '4px dashed #64748b',
                    borderRight: '4px dashed #64748b',
                  }}
                />

                {/* Animated Truck Position Pin */}
                <div
                  style={{
                    position: 'absolute',
                    top: '45%',
                    background: '#2563eb',
                    color: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '24px',
                    boxShadow: '0 0 20px #3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 800,
                  }}
                >
                  🚚 68 km/h • NH-48 Express
                </div>

                {/* Top Directions Banner */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    background: '#065f46',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>↰</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800 }}>In 800m, take Exit 14 for Hinjawadi Phase 1</div>
                    <div style={{ fontSize: '11px', opacity: 0.9 }}>Stay in left 2 lanes</div>
                  </div>
                </div>

                {/* Compass & Speed HUD */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '12px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div>Speed Limit: <strong>80 km/h</strong></div>
                  <div>GPS: <strong>Locked (±2m)</strong></div>
                </div>
              </div>

              {/* Bottom Navigation Overlay Card */}
              <div style={{ background: '#ffffff', padding: '14px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800 }}>Customer A — Hinjawadi DC</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Remaining: <strong>18.4 km</strong> • ETA: <strong>15:00 IST</strong></div>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowPodModal(true)}>
                    Arrived & Deliver
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 4: PROFILE & EARNINGS ── */}
          {activeTab === 'profile' && (
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <img src={session.driver.avatar} alt={session.driver.name} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{session.driver.name}</h3>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>ID: <strong>{session.driver.id}</strong></div>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, marginTop: '2px' }}>
                    ⭐ {session.driver.rating}/5.0 • Safety {session.driver.safetyScore}/100
                  </div>
                </div>
              </div>

              {/* Earnings Card */}
              <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#ffffff', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>SEPTEMBER 2024 EARNINGS</div>
                <div style={{ fontSize: '24px', fontWeight: 800, margin: '4px 0' }}>{session.driver.monthlyEarnings}</div>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>{session.driver.tripsThisMonth} trips completed • On-time: {session.driver.onTimeRate}%</div>
              </div>

              {/* Logged Expenses Summary */}
              <div style={{ background: '#ffffff', borderRadius: '12px', padding: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800 }}>Logged Road Expenses</span>
                  <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px' }} onClick={() => setShowExpenseModal(true)}>
                    + Add
                  </button>
                </div>
                {session.loggedExpenses.map((exp) => (
                  <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: '11px' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{exp.type}</div>
                      <div style={{ color: '#94a3b8', fontSize: '10px' }}>{exp.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800 }}>₹{exp.amount}</div>
                      <div style={{ color: '#059669', fontSize: '10px' }}>{exp.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 5: DISPATCH LIVE CHAT ── */}
          {activeTab === 'chat' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '10px 14px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🛡️</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800 }}>HQ Dispatch Control Tower</div>
                  <div style={{ fontSize: '10px', color: '#10b981' }}>🟢 Active Officer Online</div>
                </div>
              </div>

              {/* Messages Area */}
              <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {chatMessages.map((msg) => {
                  const isMe = msg.sender === 'driver';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        background: isMe ? '#2563eb' : '#ffffff',
                        color: isMe ? '#ffffff' : '#1e293b',
                        padding: '8px 12px',
                        borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                        border: isMe ? 'none' : '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>{msg.name} • {msg.time}</div>
                      <div style={{ fontSize: '12px' }}>{msg.text}</div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Canned Replies */}
              <div style={{ padding: '6px 12px', background: '#f8fafc', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                {['Arrived at Dock', 'Traffic Delay (+15m)', 'Temp Sensor OK', 'Unloading Now'].map((pill, idx) => (
                  <button
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '16px',
                      padding: '4px 10px',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleSendChat(pill)}
                  >
                    {pill}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat();
                }}
                style={{ padding: '8px 12px', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}
              >
                <input
                  type="text"
                  placeholder="Type message to dispatcher..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}
                >
                  ➤
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom App Navigation Bar */}
        <div className="driver-app-bottom-nav">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'trips', label: 'Trips', icon: '📋' },
            { id: 'tracking', label: 'Tracking', icon: '🗺️' },
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'chat', label: 'Chat', icon: '💬' },
          ].map((item) => (
            <button
              key={item.id}
              className={`app-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── MODAL 1: PRE-TRIP CHECKLIST MODAL ── */}
      {showPreTripModal && (
        <div className="driver-modal-backdrop" onClick={() => setShowPreTripModal(false)}>
          <div className="driver-modal-dialog" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div className="driver-modal-header">
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>📋 Pre-Trip Vehicle Inspection</h3>
              <button onClick={() => setShowPreTripModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Mandatory statutory inspection before vehicle departure.
              </div>
              {[
                { key: 'vehicleCondition', label: 'Vehicle Body & Lighting OK' },
                { key: 'tiresInspected', label: 'Tire Pressure & Tread Depth OK' },
                { key: 'fuelChecked', label: 'Fuel / EV Battery Sufficient' },
                { key: 'safetyEquipment', label: 'Fire Extinguisher & First Aid Kit Present' },
                { key: 'documentsPresent', label: 'PUC, Insurance & RC Books in Cab' },
                { key: 'gpsFunctioning', label: 'IoT GPS & Telematics Ping Active' },
                { key: 'cargoSecured', label: 'Reefer Thermostat Set (+4°C) & Locked' },
              ].map((item) => (
                <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={checklist[item.key]}
                    onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.checked })}
                  />
                  <span>{item.label}</span>
                </label>
              ))}

              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => alert('Photo proof attached.')}>
                  📷 Attach Proof Photo
                </button>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={handleCompletePreTrip}>
                  ✓ Submit Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: DIGITAL PROOF OF DELIVERY (POD) MODAL ── */}
      {showPodModal && (
        <div className="driver-modal-backdrop" onClick={() => setShowPodModal(false)}>
          <div className="driver-modal-dialog" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="driver-modal-header">
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>📦 Proof of Delivery (POD)</h3>
              <button onClick={() => setShowPodModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px' }}>Customer A — Hinjawadi Tech Park</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Shipment: <strong>SHP-88092 (4 Cold Boxes)</strong></div>
              </div>

              {/* Mode Toggle */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className={`btn btn-sm ${podMode === 'signature' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                  onClick={() => setPodMode('signature')}
                >
                  ✍ Recipient Signature
                </button>
                <button
                  className={`btn btn-sm ${podMode === 'otp' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                  onClick={() => setPodMode('otp')}
                >
                  🔢 OTP Confirmation
                </button>
              </div>

              {/* Signature Canvas Pad */}
              {podMode === 'signature' ? (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>Sign in box below:</div>
                  <div className="pod-canvas-container">
                    <canvas
                      ref={canvasRef}
                      width={380}
                      height={180}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <span className="pod-canvas-hint">Draw with finger/mouse</span>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '6px', fontSize: '10px' }}
                    onClick={clearCanvas}
                  >
                    Clear Signature
                  </button>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Enter 4-Digit Customer OTP:
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. 7821"
                    className="drivers-search-input"
                    style={{ textAlign: 'center', fontSize: '18px', fontWeight: 800, letterSpacing: '6px' }}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                  />
                </div>
              )}

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={goodsConditionOk}
                  onChange={(e) => setGoodsConditionOk(e.target.checked)}
                />
                <span>Goods received in sound & undamaged condition.</span>
              </label>

              <button
                className="btn btn-primary"
                disabled={podSuccess}
                onClick={handleCompleteDelivery}
              >
                {podSuccess ? '⏳ Syncing Proof of Delivery...' : '✓ Confirm & Complete Delivery'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: EXPENSE LOGGER MODAL ── */}
      {showExpenseModal && (
        <div className="driver-modal-backdrop" onClick={() => setShowExpenseModal(false)}>
          <div className="driver-modal-dialog" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="driver-modal-header">
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>💳 Log On-Road Expense</h3>
              <button onClick={() => setShowExpenseModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleSubmitExpense} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Expense Category
                </label>
                <select
                  className="drivers-search-input"
                  value={expenseData.type}
                  onChange={(e) => setExpenseData({ ...expenseData, type: e.target.value })}
                >
                  <option value="Fuel / Diesel">Fuel / Diesel</option>
                  <option value="Expressway Toll">Expressway Toll</option>
                  <option value="Dock Detention">Dock Detention</option>
                  <option value="Vehicle Maintenance">Minor Maintenance / Puncture</option>
                  <option value="Driver Meal Allowance">Driver Meal Allowance</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Amount (INR ₹) *
                </label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 1500"
                  className="drivers-search-input"
                  value={expenseData.amount}
                  onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Receipt / Invoice Photo
                </label>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => alert('Receipt photo attached.')}
                >
                  📷 Attach Receipt Slip
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowExpenseModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 4: EMERGENCY SOS PANIC MODAL ── */}
      {showSosModal && (
        <div className="driver-modal-backdrop" onClick={() => setShowSosModal(false)}>
          <div className="driver-modal-dialog sos-alert-modal" style={{ maxWidth: '380px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🚨</div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900 }}>EMERGENCY SOS BEACON</h2>
            <p style={{ fontSize: '12px', margin: '8px 0 16px', opacity: 0.9 }}>
              Triggering this transmits real-time GPS coordinates to Fleet Command HQ, nearest highway patrol, and medical response.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-primary"
                style={{ background: '#ffffff', color: '#b91c1c', fontWeight: 900, padding: '12px' }}
                onClick={triggerSosPanic}
              >
                🔴 BROADCAST EMERGENCY SOS NOW
              </button>
              <button
                className="btn btn-secondary"
                style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
                onClick={() => setShowSosModal(false)}
              >
                Cancel / False Alarm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
