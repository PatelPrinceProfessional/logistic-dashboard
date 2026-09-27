import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { optimizationSolutions, availableDepots } from '../../utils/mockData/routingData';
import './Routing.css';

const RouteOptimization = () => {
  const navigate = useNavigate();
  const [engineMode, setEngineMode] = useState('advanced');
  const [selectedObjective, setSelectedObjective] = useState('cost');
  const [isSolving, setIsSolving] = useState(false);
  const [solveProgress, setSolveProgress] = useState(100);
  const [activeSolutionKey, setActiveSolutionKey] = useState('solution1');

  // Constraints Configuration State
  const [constraints, setConstraints] = useState({
    timeWindows: true,
    weightLimits: true,
    volumeLimits: true,
    driverHours: true,
    avoidTolls: false,
    preferHighways: true,
    weekendService: false,
  });

  const [selectedDepot, setSelectedDepot] = useState(availableDepots[0]);

  const activeSolution = optimizationSolutions[activeSolutionKey];

  const handleRunOptimizer = () => {
    setIsSolving(true);
    setSolveProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setSolveProgress(100);
        setIsSolving(false);
      } else {
        setSolveProgress(current);
      }
    }, 120);
  };

  const handleApplySolution = () => {
    alert(`Solution ${activeSolution.id} (${activeSolution.title}) successfully applied!\n${activeSolution.routes.length} new production routes dispatched to fleet queue.`);
  };

  return (
    <Layout activePage="routing-optimization">
      <div className="routing-container">
        {/* Header */}
        <div className="routing-header">
          <div className="routing-title-group">
            <h1>
              <span>⚡</span> Route Optimization Engine (VRP Solver)
            </h1>
            <p>Multi-objective algorithmic vehicle routing problem solver with capacity, HOS, and SLA constraints</p>
          </div>

          <div className="routing-header-actions">
            <div className="routing-nav-tabs">
              <button className="routing-nav-tab" onClick={() => navigate('/routing')}>
                Route Builder
              </button>
              <button className="routing-nav-tab active">
                Route Optimization Engine
              </button>
            </div>
            <button className="rt-btn rt-btn-primary" onClick={handleRunOptimizer} disabled={isSolving}>
              {isSolving ? 'Solving VRP Matrix...' : '▶ Run Optimization'}
            </button>
          </div>
        </div>

        {/* Engine Selector Bar */}
        <div className="engine-selector-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Solver Algorithm Mode:</span>
            <div className="engine-mode-pills">
              <button
                className={`engine-mode-btn ${engineMode === 'quick' ? 'active' : ''}`}
                onClick={() => setEngineMode('quick')}
              >
                ⚡ Quick (Greedy Heuristic)
              </button>
              <button
                className={`engine-mode-btn ${engineMode === 'standard' ? 'active' : ''}`}
                onClick={() => setEngineMode('standard')}
              >
                ⚖️ Standard (Clarke-Wright Savings)
              </button>
              <button
                className={`engine-mode-btn ${engineMode === 'advanced' ? 'active' : ''}`}
                onClick={() => setEngineMode('advanced')}
              >
                🧠 Advanced (Genetic Metaheuristic)
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--rt-text-muted)' }}>
            Dataset: <strong>87 Shipments across 12 Fleet Units</strong>
          </div>
        </div>

        {/* Solver Progress Banner if running */}
        {isSolving && (
          <div className="solver-progress-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
              <span style={{ color: '#2563eb' }}>Calculating optimal routing matrices across {selectedDepot}...</span>
              <span>{solveProgress}%</span>
            </div>
            <div className="solver-progress-track">
              <div className="solver-progress-bar" style={{ width: `${solveProgress}%` }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Evaluating 14,200 permutations against driver time windows and vehicle weight distributions...
            </div>
          </div>
        )}

        {/* Main Workbench 2-Column Grid */}
        <div className="optimization-workbench-layout">
          {/* Left Panel: Parameters & Constraints */}
          <div className="rt-card">
            <div className="rt-card-header">
              <h3>
                <span>🎯</span> Optimization Objectives
              </h3>
            </div>

            <div className="objective-cards-list">
              <label
                className={`objective-radio-card ${selectedObjective === 'cost' ? 'active' : ''}`}
                onClick={() => setSelectedObjective('cost')}
              >
                <input
                  type="radio"
                  name="objective"
                  checked={selectedObjective === 'cost'}
                  onChange={() => setSelectedObjective('cost')}
                />
                <div className="objective-info">
                  <span className="objective-title">Minimize Total Cost</span>
                  <span className="objective-desc">Maximizes payload consolidation and cuts fuel expenses</span>
                </div>
              </label>

              <label
                className={`objective-radio-card ${selectedObjective === 'distance' ? 'active' : ''}`}
                onClick={() => setSelectedObjective('distance')}
              >
                <input
                  type="radio"
                  name="objective"
                  checked={selectedObjective === 'distance'}
                  onChange={() => setSelectedObjective('distance')}
                />
                <div className="objective-info">
                  <span className="objective-title">Minimize Total Distance</span>
                  <span className="objective-desc">Shortest geographical highway path routing</span>
                </div>
              </label>

              <label
                className={`objective-radio-card ${selectedObjective === 'time' ? 'active' : ''}`}
                onClick={() => setSelectedObjective('time')}
              >
                <input
                  type="radio"
                  name="objective"
                  checked={selectedObjective === 'time'}
                  onChange={() => setSelectedObjective('time')}
                />
                <div className="objective-info">
                  <span className="objective-title">Minimize Transit Time (Express)</span>
                  <span className="objective-desc">Prioritizes high-speed corridors & early SLA arrival</span>
                </div>
              </label>

              <label
                className={`objective-radio-card ${selectedObjective === 'balanced' ? 'active' : ''}`}
                onClick={() => setSelectedObjective('balanced')}
              >
                <input
                  type="radio"
                  name="objective"
                  checked={selectedObjective === 'balanced'}
                  onChange={() => setSelectedObjective('balanced')}
                />
                <div className="objective-info">
                  <span className="objective-title">Balanced Hybrid Mode</span>
                  <span className="objective-desc">50% cost weighting + 50% SLA delivery timeliness</span>
                </div>
              </label>
            </div>

            {/* Active Constraints */}
            <div className="rt-card-header" style={{ marginTop: '16px' }}>
              <h3>
                <span>🔒</span> Mandatory Constraints
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={constraints.timeWindows}
                  onChange={(e) => setConstraints({ ...constraints, timeWindows: e.target.checked })}
                />
                <span>Strict Customer Time Windows</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={constraints.weightLimits}
                  onChange={(e) => setConstraints({ ...constraints, weightLimits: e.target.checked })}
                />
                <span>Vehicle Weight & Axle Limits</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={constraints.volumeLimits}
                  onChange={(e) => setConstraints({ ...constraints, volumeLimits: e.target.checked })}
                />
                <span>Volume Space Capacity (CBM)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={constraints.driverHours}
                  onChange={(e) => setConstraints({ ...constraints, driverHours: e.target.checked })}
                />
                <span>Driver Maximum HOS (11.0h limit)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={constraints.preferHighways}
                  onChange={(e) => setConstraints({ ...constraints, preferHighways: e.target.checked })}
                />
                <span>Prefer Major Highway Corridors</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={constraints.avoidTolls}
                  onChange={(e) => setConstraints({ ...constraints, avoidTolls: e.target.checked })}
                />
                <span>Avoid High-Cost Toll Roads</span>
              </label>
            </div>

            <div className="form-field" style={{ marginTop: '16px' }}>
              <label>Depot Allocation</label>
              <select
                value={selectedDepot}
                onChange={(e) => setSelectedDepot(e.target.value)}
              >
                {availableDepots.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Area: Optimization Solutions Tabs & Route Dispatches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Multi-Solution Tabs */}
            <div className="solution-tabs-grid">
              {Object.entries(optimizationSolutions).map(([key, sol]) => (
                <div
                  key={key}
                  className={`solution-tab-card ${activeSolutionKey === key ? 'active' : ''}`}
                  onClick={() => setActiveSolutionKey(key)}
                >
                  <span className="sol-badge" style={{ backgroundColor: sol.tagColor }}>
                    {sol.badge}
                  </span>
                  <div className="sol-title">{sol.title}</div>
                  <div className="sol-cost">${sol.cost.toLocaleString()}</div>
                  <div className="sol-diff-gain">
                    -{sol.costSavingsPct}% Cost vs Baseline
                  </div>
                  <div className="sol-metrics-grid">
                    <div>📏 {sol.distanceKm} km</div>
                    <div>⏱️ {sol.duration}</div>
                    <div>🚚 {sol.vehiclesUsed}</div>
                    <div>⚖️ {sol.weightUtilization}% Util</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Solution Route Breakdown */}
            <div className="rt-card">
              <div className="rt-card-header">
                <div>
                  <h3 style={{ margin: 0 }}>{activeSolution.title} — Active Dispatch Manifest</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--rt-text-muted)' }}>
                    {activeSolution.routes.length} Optimized Truckload Routes | Feasibility: {activeSolution.feasibility}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="rt-btn rt-btn-outline" onClick={() => alert('Exporting VRP Solution Summary (CSV/PDF)...')}>
                    📄 Export Manifest
                  </button>
                  <button className="rt-btn rt-btn-primary" onClick={handleApplySolution}>
                    ✓ Apply & Dispatch Solution
                  </button>
                </div>
              </div>

              {/* Summary KPIs for selected solution */}
              <div className="route-kpi-matrix" style={{ marginBottom: '16px' }}>
                <div className="kpi-tile">
                  <div className="kpi-tile-lbl">Total Net Cost</div>
                  <div className="kpi-tile-val" style={{ color: '#059669' }}>${activeSolution.cost}</div>
                  <div className="kpi-tile-sub">Saved ${Math.round(activeSolution.cost * 0.125)}</div>
                </div>
                <div className="kpi-tile">
                  <div className="kpi-tile-lbl">Total Distance</div>
                  <div className="kpi-tile-val">{activeSolution.distanceKm} km</div>
                  <div className="kpi-tile-sub">Fleet Wide</div>
                </div>
                <div className="kpi-tile">
                  <div className="kpi-tile-lbl">Operating Hours</div>
                  <div className="kpi-tile-val">{activeSolution.duration}</div>
                  <div className="kpi-tile-sub">All Drivers</div>
                </div>
                <div className="kpi-tile">
                  <div className="kpi-tile-lbl">Fleet Utilization</div>
                  <div className="kpi-tile-val" style={{ color: '#2563eb' }}>{activeSolution.weightUtilization}%</div>
                  <div className="kpi-tile-sub">High Efficiency</div>
                </div>
                <div className="kpi-tile">
                  <div className="kpi-tile-lbl">CO₂ Emissions Saved</div>
                  <div className="kpi-tile-val" style={{ color: '#16a34a' }}>{activeSolution.co2ReductionKg} kg</div>
                  <div className="kpi-tile-sub">Green Metric</div>
                </div>
                <div className="kpi-tile">
                  <div className="kpi-tile-lbl">Unassigned Orders</div>
                  <div className="kpi-tile-val" style={{ color: '#0f172a' }}>{activeSolution.unassignedShipments}</div>
                  <div className="kpi-tile-sub">100% Coverage</div>
                </div>
              </div>

              {/* Individual Route Rows */}
              <div className="optimized-routes-list">
                {activeSolution.routes.map((rt) => (
                  <div key={rt.id} className="opt-route-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span className="opt-route-id">{rt.id}</span>
                      <div>
                        <div className="opt-route-vehicle">{rt.vehicle}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Driver: {rt.driver}</div>
                      </div>
                    </div>

                    <div className="opt-route-meta">
                      <span>📍 <strong>{rt.stops}</strong> Stops</span>
                      <span>📏 <strong>{rt.distanceKm}</strong> km</span>
                      <span>⏱️ <strong>{rt.time}</strong></span>
                      <span>⚖️ Fill: <strong style={{ color: '#2563eb' }}>{rt.fillRate}</strong></span>
                      <span>💵 <strong style={{ color: '#059669' }}>${rt.cost}</strong></span>
                    </div>

                    <div>
                      <button
                        className="rt-btn rt-btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        onClick={() => navigate('/routing')}
                      >
                        Inspect on Map
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="rt-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Optimization benchmarked against baseline LTL direct routing. Total cost improvement: <strong>-${Math.round(activeSolution.cost * (activeSolution.costSavingsPct / 100))}</strong>.
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="rt-btn rt-btn-secondary"
                  onClick={() => alert('Comparison view with baseline routes loaded.')}
                >
                  Compare with Baseline Plan
                </button>
                <button
                  className="rt-btn rt-btn-primary"
                  onClick={handleApplySolution}
                >
                  🚀 Apply Solution & Deploy Fleet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RouteOptimization;
