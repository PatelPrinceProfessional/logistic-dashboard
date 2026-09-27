import React from 'react';

const LoadOptimizationPanel = ({ vehicle, slots, rules, onAutoOptimize }) => {
  const loadedWeight = slots.reduce((sum, s) => sum + (s.item ? s.item.weight : 0), 0);
  const loadedVolume = slots.reduce((sum, s) => sum + (s.item ? s.item.volume : 0), 0);

  const weightUtilization = Math.min(100, Math.round((loadedWeight / vehicle.maxWeightKg) * 100));
  const volumeUtilization = Math.min(100, Math.round((loadedVolume / vehicle.maxVolumeM3) * 100));

  // Estimate cost savings based on load density
  const estimatedSavings = Math.round((weightUtilization / 100) * 480);

  return (
    <div className="lb-panel optimization-panel">
      <div className="lb-panel-header">
        <h3>
          <span>⚡</span> Optimization & Rules
        </h3>
        <button className="lb-btn lb-btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={onAutoOptimize}>
          Auto-Pack
        </button>
      </div>

      <div className="kpi-gauge-box">
        <div className="gauge-row">
          <div className="gauge-title">
            <span>Weight Capacity Utilization</span>
            <span className="gauge-val">{weightUtilization}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${weightUtilization}%` }} />
          </div>
        </div>

        <div className="gauge-row" style={{ marginTop: '12px' }}>
          <div className="gauge-title">
            <span>Volume Space Utilization</span>
            <span className="gauge-val" style={{ color: '#a855f7' }}>{volumeUtilization}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${volumeUtilization}%`,
                background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)'
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '10px' }}>Constraint Checkers</h4>
        <div className="constraint-rules-list">
          {rules.map(rule => (
            <div key={rule.id} className={`rule-item ${rule.status}`}>
              <div className="rule-status-icon" />
              <div style={{ flexGrow: 1 }}>
                <div style={{ color: '#f3f4f6', fontWeight: 600 }}>{rule.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{rule.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cost-savings-summary">
        <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Consolidation ROI & Fuel Savings</div>
        <div className="savings-amount">${estimatedSavings.toLocaleString()}</div>
        <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>
          ✓ Optimized LTL to FTL Conversion
        </div>
      </div>
    </div>
  );
};

export default LoadOptimizationPanel;
