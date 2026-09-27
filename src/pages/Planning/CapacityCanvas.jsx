import { useState } from 'react';
import { Layers, Plus, Truck, MapPin, Calendar } from 'lucide-react';

export default function CapacityCanvas({
  carrierCapacity,
  selectedDemand,
  onAssignToCarrier,
}) {
  const [activePlanTab, setActivePlanTab] = useState('v1');
  const [canvasView, setCanvasView] = useState('capacity'); // capacity, lane, map

  return (
    <div className="tp-panel" style={{ flex: 1 }}>
      {/* Plan Tabs & Toolbar */}
      <div className="tp-panel__header" style={{ background: 'white' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className={`btn ${activePlanTab === 'v1' ? 'btn--primary' : 'btn--secondary'} btn--xs`}
            onClick={() => setActivePlanTab('v1')}
          >
            Current Plan (Active)
          </button>
          <button
            className={`btn ${activePlanTab === 'v2' ? 'btn--primary' : 'btn--secondary'} btn--xs`}
            onClick={() => setActivePlanTab('v2')}
          >
            Plan Draft v2
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          <button
            className={`btn ${canvasView === 'capacity' ? 'btn--primary' : 'btn--ghost'} btn--xs`}
            onClick={() => setCanvasView('capacity')}
          >
            <Truck size={12} /> Capacity
          </button>
          <button
            className={`btn ${canvasView === 'lane' ? 'btn--primary' : 'btn--ghost'} btn--xs`}
            onClick={() => setCanvasView('lane')}
          >
            <Layers size={12} /> Lane Matrix
          </button>
        </div>
      </div>

      <div className="tp-panel__body">
        {canvasView === 'capacity' ? (
          <>
            <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginBottom: 4 }}>
              Drag pending demand or click <strong>Assign</strong> to allocate shipment onto carrier vehicle capacity fill bars:
            </div>

            {carrierCapacity.map((c) => (
              <div key={c.carrierId} className="tp-capacity-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-dark-gray-text)' }}>
                      {c.carrierName}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>
                      {c.vehicleType} • OTP Rate: <strong style={{ color: 'var(--color-success)' }}>{c.onTimeRating}</strong>
                    </div>
                  </div>

                  <button
                    className="btn btn--primary btn--xs"
                    disabled={!selectedDemand}
                    onClick={() => onAssignToCarrier(c)}
                  >
                    + Assign Selected
                  </button>
                </div>

                {/* Weight Payload Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600 }}>
                    <span>Payload Weight Fill ({c.assignedWeightKg} / {c.maxWeightKg} kg):</span>
                    <span style={{ color: c.fillPct > 85 ? 'var(--color-error)' : 'var(--color-success)' }}>
                      {c.fillPct}%
                    </span>
                  </div>
                  <div className="tp-fill-track">
                    <div
                      className="tp-fill-bar"
                      style={{
                        width: `${c.fillPct}%`,
                        background: c.fillPct > 85 ? 'var(--color-error)' : 'var(--color-success)',
                      }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>
                  Rate: <strong>{c.ratePer100Kg} / 100kg</strong> • Transit: <strong>{c.transitDays}</strong>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--color-secondary-gray)' }}>
            <Layers size={32} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600 }}>Lane Matrix View</div>
            <div style={{ fontSize: 12 }}>Showing Mumbai → Delhi, Pune → Bangalore lane load distributions.</div>
          </div>
        )}
      </div>
    </div>
  );
}
