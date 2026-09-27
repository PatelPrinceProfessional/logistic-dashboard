import { useState } from 'react';
import Layout from '../../../components/Common/Layout/Layout';
import ControlTowerMap from './ControlTowerMap';
import TelemetryFilterSidebar from './TelemetryFilterSidebar';
import ExceptionsStackSidebar from './ExceptionsStackSidebar';
import VehicleTelemetryHUD from './VehicleTelemetryHUD';
import {
  controlTowerStats, trackedVehicles, activeExceptions, geofences
} from '../../../utils/mockData/controlTowerData';
import { Shield, Radio, Activity, Truck, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import './ControlTower.css';

export default function ControlTower() {
  const [selectedVehicle, setSelectedVehicle] = useState(trackedVehicles[2]); // Default highlight delayed vehicle DL-08-EF-9012
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
    traffic: false,
  });

  const handleToggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleSelectException = (exception) => {
    const matchingVeh = trackedVehicles.find(v => v.id === exception.vehicleId);
    if (matchingVeh) {
      setSelectedVehicle(matchingVeh);
    }
  };

  const handleResolveAction = (vehicle) => {
    alert(`Incident resolution protocol launched for Vehicle ${vehicle.id} (${vehicle.vehicleNumber}). Telemetry team notified.`);
  };

  return (
    <Layout
      title="Control Tower"
      breadcrumbs={[{ label: 'Control Tower', path: '/control-tower' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <span className="badge badge--success" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Radio size={12} className="ct-pin-pulse" /> Live Signal: 5s
          </span>
          <button className="btn btn--secondary btn--sm">
            <RefreshCw size={14} /> Refresh GIS
          </button>
        </div>
      }
    >
      {/* ── Top Command Metrics Bar ── */}
      <div className="ct-metrics-bar">
        <div className="ct-metric-card">
          <div className="ct-metric-card__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <Truck size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val">{controlTowerStats.totalTracked}</div>
            <div className="ct-metric-card__lbl">Tracked Vehicles</div>
          </div>
        </div>

        <div className="ct-metric-card">
          <div className="ct-metric-card__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val" style={{ color: '#27AE60' }}>{controlTowerStats.onTime}</div>
            <div className="ct-metric-card__lbl">On-Time Execution</div>
          </div>
        </div>

        <div className="ct-metric-card">
          <div className="ct-metric-card__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val" style={{ color: '#FF9800' }}>{controlTowerStats.atRisk}</div>
            <div className="ct-metric-card__lbl">At-Risk Buffer</div>
          </div>
        </div>

        <div className="ct-metric-card">
          <div className="ct-metric-card__icon" style={{ background: '#E74C3C20', color: '#E74C3C' }}>
            <Shield size={20} />
          </div>
          <div>
            <div className="ct-metric-card__val" style={{ color: '#E74C3C' }}>{controlTowerStats.delayed}</div>
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
            vehicles={trackedVehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
            layers={layers}
            searchQuery={searchQuery}
          />

          {/* Floating Telemetry HUD */}
          <VehicleTelemetryHUD
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
            onResolveAction={handleResolveAction}
          />
        </div>

        {/* Right Sidebar: Live Active Exceptions Queue */}
        <ExceptionsStackSidebar
          exceptions={activeExceptions}
          onSelectException={handleSelectException}
        />
      </div>
    </Layout>
  );
}
