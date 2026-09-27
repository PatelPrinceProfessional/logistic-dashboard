import { useState } from 'react';
import { Truck, Navigation, AlertTriangle, Layers, MapPin, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function ControlTowerMap({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  layers,
  searchQuery,
}) {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Filter vehicles based on search
  const filteredVehicles = vehicles.filter(v =>
    v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ct-map-container">
      {/* Map Glass Toolbar */}
      <div className="ct-map-toolbar">
        <div className="ct-map-glass-card">
          <Navigation size={14} color="#0066CC" />
          <span>Live GIS Telemetry Mode — Active GPS Stream ({filteredVehicles.length} Vehicles Visible)</span>
        </div>

        <div className="ct-map-controls">
          <button
            className="ct-map-btn"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            className="ct-map-btn"
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            className="ct-map-btn"
            onClick={() => setZoomLevel(1)}
            title="Reset View"
            aria-label="Reset View"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      {/* GIS Tactical Canvas Grid */}
      <div
        className="ct-gis-canvas"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.3s ease' }}
      >
        {/* Simulated Route Corridors (SVG overlay) */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Mumbai → Pune Route Line */}
          <path
            d="M 220 320 Q 300 280 440 240"
            stroke="rgba(0, 102, 204, 0.4)"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
          />
          {/* Delhi → Jaipur Route Line */}
          <path
            d="M 500 120 Q 420 180 320 220"
            stroke="rgba(231, 76, 60, 0.5)"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>

        {/* Geofence Hub Outlines */}
        {layers.geofences && (
          <>
            {/* Mumbai Hub */}
            <div style={{
              position: 'absolute', top: '55%', left: '25%', width: 140, height: 140,
              borderRadius: '50%', background: 'rgba(0, 102, 204, 0.08)', border: '2px stroke rgba(0, 102, 204, 0.3)',
              transform: 'translate(-50%, -50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>MUMBAI HUB</span>
            </div>

            {/* Delhi Hub */}
            <div style={{
              position: 'absolute', top: '22%', left: '62%', width: 160, height: 160,
              borderRadius: '50%', background: 'rgba(231, 76, 60, 0.08)', border: '2px stroke rgba(231, 76, 60, 0.3)',
              transform: 'translate(-50%, -50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>DELHI GATE</span>
            </div>
          </>
        )}

        {/* Render Vehicle Markers */}
        {layers.vehicles && filteredVehicles.map((v, idx) => {
          // Calculate positional percentages based on lat/lng offsets for display
          const topPct = `${Math.min(Math.max((30 - v.lat) * 3.8 + 15, 12), 84)}%`;
          const leftPct = `${Math.min(Math.max((v.lng - 70) * 6.2 + 10, 12), 86)}%`;
          const isSelected = selectedVehicle?.id === v.id;
          const pinColor = isSelected ? '#0066CC' : v.status === 'delayed' ? '#E74C3C' : v.status === 'at-risk' ? '#FF9800' : '#27AE60';

          return (
            <div
              key={v.id}
              className={`ct-map-pin${isSelected ? ' ct-map-pin--selected' : ''}`}
              style={{ top: topPct, left: leftPct }}
              onClick={() => onSelectVehicle(v)}
              title={`${v.id} (${v.vehicleNumber}) - ${v.driverName}`}
            >
              <div className="ct-pin-marker" style={{ background: pinColor, borderColor: isSelected ? 'white' : pinColor }}>
                <Truck size={15} />
                {v.status === 'delayed' && <div className="ct-pin-pulse" style={{ color: '#E74C3C' }} />}
              </div>
              <div className="ct-pin-tag" style={{ borderLeft: `3px solid ${pinColor}` }}>
                {v.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
