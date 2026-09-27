import { Sparkles, CheckCircle, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export default function PlanningAssistantPanel({
  selectedDemand,
  carrierCapacity,
  onAutoAssign,
}) {
  return (
    <div className="tp-panel">
      <div className="tp-panel__header" style={{ background: '#F0FFF4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-success)' }}>
          <Sparkles size={16} />
          <span>AI Planning Assistant</span>
        </div>
        <span className="badge badge--success" style={{ fontSize: 10 }}>
          Optimization Active
        </span>
      </div>

      <div className="tp-panel__body">
        {selectedDemand ? (
          <>
            {/* Selected Demand Header */}
            <div style={{ background: '#EBF5FF', padding: 12, borderRadius: 6, border: '1px solid #0066CC30' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-blue)' }}>
                Target Demand Inspection
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{selectedDemand.orderId}</div>
              <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 2 }}>
                {selectedDemand.customer} • {selectedDemand.origin} → {selectedDemand.destination} ({selectedDemand.weightKg} kg)
              </div>
            </div>

            {/* Constraint Checker Section */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary-gray)', marginBottom: 6 }}>
                Constraint Rules Checklist
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-success)' }}>
                  <CheckCircle size={14} /> Weight Payload within limit
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-success)' }}>
                  <CheckCircle size={14} /> Delivery SLA window valid
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: selectedDemand.tempRequired ? 'var(--color-success)' : 'var(--color-secondary-gray)' }}>
                  <CheckCircle size={14} /> Cold Chain Temp Requirement ({selectedDemand.tempRequired || 'N/A'})
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-medium-gray)', margin: '4px 0' }} />

            {/* Ranked Suitable Carriers */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary-gray)', marginBottom: 6 }}>
                Ranked AI Carrier Suggestions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {carrierCapacity.map((c, idx) => (
                  <div key={c.carrierId} className="tp-carrier-rank-item" onClick={() => onAutoAssign(c)}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-dark-gray-text)' }}>
                        #{idx + 1} {c.carrierName}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>
                        OTP: {c.onTimeRating} • {c.ratePer100Kg}
                      </div>
                    </div>
                    <button className="btn btn--primary btn--xs">
                      Assign <ArrowRight size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-secondary-gray)' }}>
            <Sparkles size={28} color="var(--color-primary-blue)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600, fontSize: 13 }}>Select a Demand Item</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              Click any pending order from the left queue to view AI carrier recommendations & constraint validations.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
