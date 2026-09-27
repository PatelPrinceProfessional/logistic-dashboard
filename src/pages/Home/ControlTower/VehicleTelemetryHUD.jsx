import { X, Phone, AlertCircle, Navigation, Shield, User, Zap } from 'lucide-react';

export default function VehicleTelemetryHUD({ vehicle, onClose, onResolveAction }) {
  if (!vehicle) return null;

  return (
    <div className="ct-telemetry-hud">
      <div className="ct-hud__header">
        <div className="ct-hud__title">
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: vehicle.status === 'delayed' ? 'var(--color-error)' : vehicle.status === 'at-risk' ? 'var(--color-warning)' : 'var(--color-success)'
          }} />
          {vehicle.id} — {vehicle.vehicleNumber}
          <span style={{ fontSize: 12, fontWeight: 500, color: '#9EA5B1', marginLeft: 6 }}>
            ({vehicle.type} • {vehicle.carrier})
          </span>
        </div>
        <button
          className="ct-map-btn"
          onClick={onClose}
          style={{ width: 24, height: 24, background: 'transparent', border: 'none' }}
          title="Close HUD"
        >
          <X size={16} />
        </button>
      </div>

      <div className="ct-hud__grid">
        <div className="ct-hud__metric">
          <div className="ct-hud__lbl">Speed Telemetry</div>
          <div className="ct-hud__val" style={{ color: vehicle.speed === 0 ? 'var(--color-error)' : 'white' }}>
            {vehicle.speed} km/h
          </div>
        </div>
        <div className="ct-hud__metric">
          <div className="ct-hud__lbl">Fuel Reserve</div>
          <div className="ct-hud__val">{vehicle.fuel}%</div>
        </div>
        <div className="ct-hud__metric">
          <div className="ct-hud__lbl">Cold Chain Temp</div>
          <div className="ct-hud__val" style={{ color: parseFloat(vehicle.temp) > 8 ? 'var(--color-error)' : 'white' }}>
            {vehicle.temp}
          </div>
        </div>
        <div className="ct-hud__metric">
          <div className="ct-hud__lbl">Driver Profile</div>
          <div className="ct-hud__val" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            <User size={13} color="var(--color-primary-blue)" /> {vehicle.driverName} ({vehicle.driverRating}★)
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 12, color: '#9EA5B1' }}>
          📍 <strong style={{ color: 'white' }}>Route:</strong> {vehicle.origin} → {vehicle.destination} | <strong style={{ color: 'white' }}>ETA:</strong> {vehicle.eta}
          {vehicle.delayMinutes > 0 && (
            <span style={{ color: 'var(--color-error)', marginLeft: 8, fontWeight: 600 }}>
              (Delayed +{vehicle.delayMinutes}m)
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <a
            href={`tel:${vehicle.driverPhone}`}
            className="btn btn--secondary btn--xs"
            style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            <Phone size={12} /> Call Driver
          </a>
          <button
            className="btn btn--primary btn--xs"
            onClick={() => onResolveAction(vehicle)}
          >
            <Zap size={12} /> Reassign / Resolve
          </button>
        </div>
      </div>
    </div>
  );
}
