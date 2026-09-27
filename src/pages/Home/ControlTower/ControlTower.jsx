import { useState, useEffect } from 'react';
import Layout from '../../../components/Common/Layout/Layout';
import ControlTowerMap from './ControlTowerMap';
import TelemetryFilterSidebar from './TelemetryFilterSidebar';
import ExceptionsStackSidebar from './ExceptionsStackSidebar';
import VehicleTelemetryHUD from './VehicleTelemetryHUD';
import {
  controlTowerStats, trackedVehicles as initialVehicles, activeExceptions as initialExceptions, geofences
} from '../../../utils/mockData/controlTowerData';
import { Shield, Radio, Activity, Truck, AlertTriangle, CheckCircle, RefreshCw, X, Zap } from 'lucide-react';
import './ControlTower.css';

export default function ControlTower() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [exceptions, setExceptions] = useState(initialExceptions);
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicles[2]); // Highlight delayed vehicle DL-08-EF-9012 by default
  const [searchQuery, setSearchQuery] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState({
    onTime: true,
    atRisk: true,
    delayed: true,
  });
  const [layers, setLayers] = useState({
    vehicles: true,
    geofences: true,
    traffic: true,
  });

  // Dynamic Live Heartbeat & Ping
  const [livePingCount, setLivePingCount] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Incident Resolution Modal State
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [targetVehicleForResolve, setTargetVehicleForResolve] = useState(null);
  const [selectedMitigation, setSelectedMitigation] = useState('reroute');
  const [resolutionNote, setResolutionNote] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Live GIS Heartbeat Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePingCount((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleLayer = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleSelectException = (exception) => {
    const matchingVeh = vehicles.find((v) => v.id === exception.vehicleId);
    if (matchingVeh) {
      setSelectedVehicle(matchingVeh);
      showToast(`🎯 Centered on ${matchingVeh.id} (${matchingVeh.vehicleNumber}) - ${exception.title}`);
    }
  };

  const handleOpenResolveModal = (vehicle) => {
    setTargetVehicleForResolve(vehicle || selectedVehicle);
    setResolveModalOpen(true);
  };

  const handleExecuteResolution = (e) => {
    e.preventDefault();
    if (!targetVehicleForResolve) return;

    // Update vehicle status to on-time and reset speed / delay
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === targetVehicleForResolve.id) {
          return {
            ...v,
            status: 'on-time',
            speed: v.speed === 0 ? 58 : v.speed,
            delayMinutes: 0,
            temp: v.cargo.includes('Cold') ? '+3.8°C (Normal)' : v.temp,
          };
        }
        return v;
      })
    );

    // Update selected vehicle HUD if matches
    if (selectedVehicle?.id === targetVehicleForResolve.id) {
      setSelectedVehicle({
        ...selectedVehicle,
        status: 'on-time',
        speed: selectedVehicle.speed === 0 ? 58 : selectedVehicle.speed,
        delayMinutes: 0,
        temp: selectedVehicle.cargo.includes('Cold') ? '+3.8°C (Normal)' : selectedVehicle.temp,
      });
    }

    // Remove exception from active stack
    setExceptions((prev) => prev.filter((ex) => ex.vehicleId !== targetVehicleForResolve.id));

    setResolveModalOpen(false);
    setResolutionNote('');
    showToast(`✓ Incident mitigation executed for ${targetVehicleForResolve.id}! Telematics restored to Green.`);
  };

  const handleManualRefreshGIS = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast(`🛰️ Live GIS coordinates refreshed across all ${vehicles.length} fleet units.`);
    }, 600);
  };

  // Filtered vehicles based on search, status, and carrier
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      (v.status === 'on-time' && statusFilter.onTime) ||
      (v.status === 'at-risk' && statusFilter.atRisk) ||
      (v.status === 'delayed' && statusFilter.delayed);

    const matchesCarrier = carrierFilter === 'ALL' || v.carrier === carrierFilter;

    return matchesSearch && matchesStatus && matchesCarrier;
  });

  const onTimeCount = vehicles.filter((v) => v.status === 'on-time').length;
  const atRiskCount = vehicles.filter((v) => v.status === 'at-risk').length;
  const delayedCount = vehicles.filter((v) => v.status === 'delayed').length;

  return (
    <Layout
      title="Control Tower"
      breadcrumbs={[{ label: 'Control Tower', path: '/control-tower' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <span className="badge badge--success" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}>
            <Radio size={14} className="ct-pin-pulse" /> Live Telematics Stream (Ping #{livePingCount})
          </span>
          <button
            className="btn btn--secondary btn--sm"
            onClick={handleManualRefreshGIS}
            disabled={isRefreshing}
          >
            <RefreshCw size={14} className={isRefreshing ? 'ct-pin-pulse' : ''} />
            {isRefreshing ? 'Refreshing GIS...' : 'Refresh GIS'}
          </button>
        </div>
      }
    >
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

      {/* ── Top Command Metrics Bar ── */}
      <div className="ct-metrics-bar">
        <div className="ct-metric-card" style={{ cursor: 'pointer' }} onClick={() => setStatusFilter({ onTime: true, atRisk: true, delayed: true })}>
          <div className="ct-metric-card__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <Truck size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val">{vehicles.length}</div>
            <div className="ct-metric-card__lbl">Tracked Vehicles</div>
          </div>
        </div>

        <div className="ct-metric-card" style={{ cursor: 'pointer' }} onClick={() => setStatusFilter({ onTime: true, atRisk: false, delayed: false })}>
          <div className="ct-metric-card__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val" style={{ color: '#27AE60' }}>{onTimeCount}</div>
            <div className="ct-metric-card__lbl">On-Time Execution</div>
          </div>
        </div>

        <div className="ct-metric-card" style={{ cursor: 'pointer' }} onClick={() => setStatusFilter({ onTime: false, atRisk: true, delayed: false })}>
          <div className="ct-metric-card__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val" style={{ color: '#FF9800' }}>{atRiskCount}</div>
            <div className="ct-metric-card__lbl">At-Risk Buffer</div>
          </div>
        </div>

        <div className="ct-metric-card" style={{ cursor: 'pointer' }} onClick={() => setStatusFilter({ onTime: false, atRisk: false, delayed: true })}>
          <div className="ct-metric-card__icon" style={{ background: '#E74C3C20', color: '#E74C3C' }}>
            <Shield size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val" style={{ color: '#E74C3C' }}>{delayedCount}</div>
            <div className="ct-metric-card__lbl">Delayed / Exception</div>
          </div>
        </div>

        <div className="ct-metric-card">
          <div className="ct-metric-card__icon" style={{ background: '#17A2B820', color: '#17A2B8' }}>
            <Activity size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val">{controlTowerStats.avgSpeed}</div>
            <div className="ct-metric-card__lbl">Fleet Avg Speed</div>
          </div>
        </div>

        <div className="ct-metric-card">
          <div className="ct-metric-card__icon" style={{ background: '#6C348320', color: '#6C3483' }}>
            <Radio size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val">{controlTowerStats.geofenceEvents}</div>
            <div className="ct-metric-card__lbl">Geofence Nodes</div>
          </div>
        </div>
      </div>

      {/* ── Main GIS Telemetry Workspace ── */}
      <div className="ct-workspace">
        {/* Left Sidebar: Search, Status Filters & Layers */}
        <TelemetryFilterSidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          layers={layers}
          onToggleLayer={handleToggleLayer}
          carrierFilter={carrierFilter}
          onCarrierFilterChange={setCarrierFilter}
        />

        {/* Center Canvas: Interactive Tactical Map */}
        <div style={{ position: 'relative', minHeight: 520 }}>
          <ControlTowerMap
            vehicles={filteredVehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
            layers={layers}
            searchQuery={searchQuery}
          />

          {/* Floating Telemetry HUD */}
          <VehicleTelemetryHUD
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
            onResolveAction={handleOpenResolveModal}
          />
        </div>

        {/* Right Sidebar: Live Active Exceptions Stack */}
        <ExceptionsStackSidebar
          exceptions={exceptions}
          onSelectException={handleSelectException}
        />
      </div>

      {/* ── Incident Resolution & Mitigation Modal ── */}
      {resolveModalOpen && targetVehicleForResolve && (
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
          onClick={() => setResolveModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '560px',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap size={18} color="#0066CC" /> Incident Resolution Protocol: {targetVehicleForResolve.id}
              </h3>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setResolveModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '0.825rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>Vehicle:</strong> {targetVehicleForResolve.vehicleNumber} ({targetVehicleForResolve.carrier})</span>
                <span style={{ color: '#e11d48', fontWeight: 700 }}>● {targetVehicleForResolve.status.toUpperCase()}</span>
              </div>
              <div style={{ marginTop: '4px' }}><strong>Driver:</strong> {targetVehicleForResolve.driverName} ({targetVehicleForResolve.driverPhone})</div>
              <div style={{ marginTop: '4px' }}><strong>Cargo:</strong> {targetVehicleForResolve.cargo} • <strong>Temp:</strong> {targetVehicleForResolve.temp}</div>
              <div style={{ marginTop: '4px' }}><strong>Route:</strong> {targetVehicleForResolve.origin} → {targetVehicleForResolve.destination}</div>
            </div>

            <form onSubmit={handleExecuteResolution}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Select Dynamic Mitigation Strategy
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'reroute', title: '🗺️ Reroute via State Toll Ring Road', desc: 'Bypasses NH-48 monsoon bottleneck (+14 km, saves 45 mins)' },
                    { id: 'tractor', title: '🚛 Dispatch Emergency Replacement Tractor', desc: 'Dispatches nearby unit VEH-0198 from Surat Hub to hook trailer' },
                    { id: 'dock', title: '🏢 Notify Destination Dock for Priority Unloading', desc: 'Alerts Jaipur Dock Lead to expedite cargo devanning immediately upon arrival' },
                    { id: 'coldchain', title: '❄️ Mobile Cold Chain Reefer Transfer', desc: 'Deploys auxiliary mobile cooling unit to prevent pharmaceutical spoilage' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${selectedMitigation === opt.id ? '#0066CC' : '#e2e8f0'}`,
                        background: selectedMitigation === opt.id ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="radio"
                        name="mitigation"
                        checked={selectedMitigation === opt.id}
                        onChange={() => setSelectedMitigation(opt.id)}
                        style={{ marginTop: '3px' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#0f172a' }}>{opt.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Dispatcher Action Notes
                </label>
                <input
                  type="text"
                  className="input-text"
                  placeholder="e.g. Driver contacted, tow truck dispatched, consignee updated..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  style={{ width: '100%', fontSize: '0.8rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  onClick={() => setResolveModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn--primary btn--sm"
                  style={{ background: '#0066CC', color: '#ffffff', fontWeight: 700 }}
                >
                  ⚡ Execute Incident Mitigation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}


