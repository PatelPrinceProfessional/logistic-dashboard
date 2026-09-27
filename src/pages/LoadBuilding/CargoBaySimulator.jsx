import React from 'react';

const CargoBaySimulator = ({ vehicle, slots, selectedCargo, onPlaceCargo, onUnloadSlot }) => {
  const frontAxleWeight = slots
    .filter(s => s.item && (s.position.includes('Row 1') || s.position.includes('Row 2')))
    .reduce((sum, s) => sum + (s.item ? s.item.weight : 0), 0);

  const rearAxleWeight = slots
    .filter(s => s.item && (s.position.includes('Row 3') || s.position.includes('Row 4') || s.position.includes('Row 5')))
    .reduce((sum, s) => sum + (s.item ? s.item.weight : 0), 0);

  const totalLoadedWeight = slots.reduce((sum, s) => sum + (s.item ? s.item.weight : 0), 0);
  const totalWeightPct = Math.min(100, Math.round((totalLoadedWeight / vehicle.maxWeightKg) * 100));

  return (
    <div className="lb-panel cargo-bay-simulator">
      <div className="lb-panel-header">
        <h3>
          <span>🚚</span> Cargo Bay Simulator (2D Grid View)
        </h3>
        <span className="lb-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
          {slots.filter(s => s.item).length} / {slots.length} Slots Loaded
        </span>
      </div>

      <div className="vehicle-selector-bar">
        <div className="vehicle-info">
          <span className="vehicle-name">{vehicle.name} ({vehicle.id})</span>
          <span className="vehicle-specs-tag">Max Payload: {vehicle.maxWeightKg.toLocaleString()} kg | Volume: {vehicle.maxVolumeM3} m³</span>
        </div>
        <div>
          {selectedCargo && (
            <span style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600 }}>
              Ready to load: {selectedCargo.id}
            </span>
          )}
        </div>
      </div>

      <div className="simulator-2d-canvas">
        <div className="trailer-roof-indicator">▲ FRONT / CABIN DIRECTION ▲</div>

        <div className="pallet-grid-container">
          {slots.map(slot => (
            <div
              key={slot.id}
              className={`pallet-slot ${slot.item ? 'occupied' : 'empty'}`}
              style={{
                backgroundColor: slot.item ? slot.item.color : 'transparent',
                borderColor: slot.item ? '#3b82f6' : 'rgba(255, 255, 255, 0.15)'
              }}
              onClick={() => !slot.item && selectedCargo && onPlaceCargo(slot.id)}
            >
              <span className="pallet-slot-pos">{slot.position}</span>
              {slot.item ? (
                <div className="pallet-content">
                  <button
                    className="unload-btn"
                    title="Unload Item"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnloadSlot(slot.id);
                    }}
                  >
                    ×
                  </button>
                  <div className="pallet-cargo-code">{slot.item.id}</div>
                  <div className="pallet-dest">{slot.item.destination}</div>
                  <div className="pallet-weight">{slot.item.weight} kg</div>
                </div>
              ) : (
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.25)' }}>
                  {selectedCargo ? 'Click to Place' : 'Empty Slot'}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="trailer-roof-indicator" style={{ marginTop: '12px', marginBottom: 0 }}>▼ REAR DOORS ▼</div>
      </div>

      {/* Axle Weight Balance Indicators */}
      <div className="axle-weight-bar">
        <div className="axle-bar-header">
          <span>Axle Distribution & Dynamic Weight Balance</span>
          <span>Total Payload: {totalLoadedWeight.toLocaleString()} / {vehicle.maxWeightKg.toLocaleString()} kg</span>
        </div>
        <div className="axle-meters">
          <div className="axle-meter">
            <div className="meter-label">
              <span>Front Axle</span>
              <span>{frontAxleWeight} kg</span>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{
                  width: `${Math.min(100, (frontAxleWeight / (vehicle.maxWeightKg * 0.45)) * 100)}%`,
                  backgroundColor: frontAxleWeight > vehicle.maxWeightKg * 0.45 ? '#ef4444' : '#3b82f6'
                }}
              />
            </div>
          </div>

          <div className="axle-meter">
            <div className="meter-label">
              <span>Rear Axle</span>
              <span>{rearAxleWeight} kg</span>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{
                  width: `${Math.min(100, (rearAxleWeight / (vehicle.maxWeightKg * 0.55)) * 100)}%`,
                  backgroundColor: rearAxleWeight > vehicle.maxWeightKg * 0.55 ? '#ef4444' : '#10b981'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoBaySimulator;
