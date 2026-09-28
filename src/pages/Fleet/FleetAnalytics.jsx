import { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import { fleetSummaryStats, fleetAnalyticsData } from '../../utils/mockData/fleetData';
import './Fleet.css';

export default function FleetAnalytics() {
  const [dateRange, setDateRange] = useState('30D');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportBI = () => {
    showToast('Fleet Analytics BI Executive Report generated and downloaded.');
  };

  const handleScheduleTriage = (vehId, action) => {
    showToast(`Dispatched work order for ${vehId}: ${action}`);
  };

  return (
    <Layout
      title="Fleet Telematics & Analytics"
      breadcrumbs={[{ label: 'Fleet', path: '/fleet' }, { label: 'Analytics' }]}
    >
      <div className="fleet-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#1e293b',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontSize: '13px',
            fontWeight: 700,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <span>📊</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="fleet-header-bar">
        <div className="fleet-title-group">
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
            Fleet Analytics & Telematics Intelligence
          </h1>
          <span className="fleet-badge-count">
            234 Assets Tracked Live
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Date Filter */}
          <div className="fleet-filter-pills">
            {['7D', '30D', '90D', 'YTD'].map((r) => (
              <button
                key={r}
                className={`fleet-filter-pill ${dateRange === r ? 'active' : ''}`}
                onClick={() => setDateRange(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="btn btn-primary btn-sm" onClick={handleExportBI}>
            📊 Export BI Dossier
          </button>
        </div>
      </div>

      {/* Top 4 Executive KPI Cards */}
      <div className="fleet-stats-grid">
        {/* Card 1: Fleet Utilization */}
        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box purple">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div className="fleet-stat-val">{fleetSummaryStats.fleetUtilizationRate}%</div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Target: {fleetSummaryStats.fleetUtilizationTarget}%</span>
            </div>
            <div className="fleet-stat-lbl">Fleet Utilization Rate</div>
            <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${fleetSummaryStats.fleetUtilizationRate}%`, height: '100%', background: '#7c3aed', borderRadius: '3px' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Fuel Efficiency */}
        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box green">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="fleet-stat-val" style={{ color: '#059669' }}>{fleetSummaryStats.avgFuelEfficiency}</div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>km/l ({fleetSummaryStats.fuelEfficiencyTrendMoM})</span>
            </div>
            <div className="fleet-stat-lbl">Average Fleet Fuel Economy</div>
            <div style={{ fontSize: '10px', color: '#10b981', marginTop: '2px' }}>₹15.8 / km fleet energy cost</div>
          </div>
        </div>

        {/* Card 3: Fleet Age */}
        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box blue">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val">{fleetSummaryStats.avgFleetAge} yrs</div>
            <div className="fleet-stat-lbl">Average Commercial Asset Age</div>
            <div style={{ fontSize: '10px', color: '#2563eb', marginTop: '2px' }}>82% assets under 5 years</div>
          </div>
        </div>

        {/* Card 4: Breakdown Rate */}
        <div className="fleet-stat-card">
          <div className="fleet-stat-icon-box teal">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div className="fleet-stat-val" style={{ color: '#0d9488' }}>{fleetSummaryStats.breakdownRate}%</div>
            <div className="fleet-stat-lbl">Unscheduled Breakdown Rate</div>
            <div style={{ fontSize: '10px', color: '#0d9488', marginTop: '2px' }}>-0.3% vs Last Quarter</div>
          </div>
        </div>
      </div>

      {/* 2-Column Analytics Charts Grid */}
      <div className="analytics-grid-2col">
        {/* Chart 1: Utilization by Vehicle Category */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <div>
              <div className="analytics-chart-title">Fleet Utilization by Vehicle Category</div>
              <div className="analytics-chart-subtitle">Operational active hours vs available standby capacity</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary-600)' }}>
              Avg 82.5%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {fleetAnalyticsData.utilizationByType.map((item, idx) => (
              <div key={idx} className="analytics-bar-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                  <span>{item.type} ({item.fleetCount} units)</span>
                  <strong style={{ color: item.color }}>{item.utilization}%</strong>
                </div>
                <div className="analytics-bar-bg">
                  <div
                    className="analytics-bar-fill"
                    style={{ width: `${item.utilization}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Total Cost of Ownership (TCO) Breakdown */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <div>
              <div className="analytics-chart-title">Fleet Total Operating Cost of Ownership (TCO)</div>
              <div className="analytics-chart-subtitle">Monthly aggregate expense breakdown (₹1.14M Total)</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>
              ₹1.14M / Mo
            </span>
          </div>

          {/* Stacked Cost Bar */}
          <div style={{ display: 'flex', height: '18px', borderRadius: '6px', overflow: 'hidden', margin: '14px 0 8px' }}>
            {fleetAnalyticsData.costBreakdown.map((c, idx) => (
              <div
                key={idx}
                style={{ width: `${c.percentage}%`, background: c.color }}
                title={`${c.category}: ${c.percentage}% (₹${c.amount.toLocaleString()})`}
              />
            ))}
          </div>

          {/* Legend Grid */}
          <div className="analytics-legend-grid">
            {fleetAnalyticsData.costBreakdown.map((c, idx) => (
              <div key={idx} className="analytics-legend-item">
                <div className="analytics-legend-dot" style={{ background: c.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{c.category.split('(')[0]}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>
                    {c.percentage}% (₹{c.amount.toLocaleString()})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: 6-Month Fuel Efficiency & CO2 Trend */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <div>
              <div className="analytics-chart-title">Fuel Efficiency & Green Eco Footprint (6 Months)</div>
              <div className="analytics-chart-subtitle">Fleet km/l economy trend vs corporate 6.8 km/l benchmark</div>
            </div>
          </div>

          {/* Visual Trend Bars */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '140px', padding: '16px 8px' }}>
            {fleetAnalyticsData.fuelEfficiencyTrend.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>{m.avgKmL}</div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '90px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: `${(m.avgKmL / 8.0) * 100}%`,
                      background: '#10b981',
                      borderRadius: '4px 4px 0 0',
                    }}
                    title={`${m.month}: ${m.avgKmL} km/l (${m.co2Tons} Tons CO2)`}
                  />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700 }}>{m.month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            <span>🟩 Actual Fleet Avg (km/l)</span>
            <span>🌱 CO₂ Emissions Reduced by -5.4% YoY</span>
          </div>
        </div>

        {/* Chart 4: Safety Infractions by Severity */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <div>
              <div className="analytics-chart-title">Quarterly Telematics Safety Incidents</div>
              <div className="analytics-chart-subtitle">Infractions captured via edge IoT accelerometer sensors</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>
              -43% Incident Drop
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', padding: '16px 8px' }}>
            {fleetAnalyticsData.incidentTrends.map((q, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '90px' }}>
                  <div style={{ width: '16px', height: `${q.critical * 30 + 10}px`, background: '#ef4444', borderRadius: '3px 3px 0 0' }} title={`Critical: ${q.critical}`} />
                  <div style={{ width: '16px', height: `${q.high * 16 + 10}px`, background: '#f97316', borderRadius: '3px 3px 0 0' }} title={`High: ${q.high}`} />
                  <div style={{ width: '16px', height: `${q.medium * 8 + 10}px`, background: '#eab308', borderRadius: '3px 3px 0 0' }} title={`Medium: ${q.medium}`} />
                  <div style={{ width: '16px', height: `${q.low * 4 + 10}px`, background: '#3b82f6', borderRadius: '3px 3px 0 0' }} title={`Low: ${q.low}`} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700 }}>{q.month}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '11px', flexWrap: 'wrap' }}>
            <span style={{ color: '#ef4444', fontWeight: 700 }}>■ Critical</span>
            <span style={{ color: '#f97316', fontWeight: 700 }}>■ High</span>
            <span style={{ color: '#eab308', fontWeight: 700 }}>■ Medium</span>
            <span style={{ color: '#3b82f6', fontWeight: 700 }}>■ Minor</span>
          </div>
        </div>
      </div>

      {/* Dual Bottom Operational Matrices */}
      <div className="analytics-grid-2col" style={{ marginTop: '8px' }}>
        {/* Table 1: Top Peak Performers */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <div>
              <div className="analytics-chart-title">🏆 Top Peak Performing Fleet Assets</div>
              <div className="analytics-chart-subtitle">Highest reliability uptime & best cost efficiency</div>
            </div>
          </div>
          <div className="fleet-table-wrapper">
            <table className="fleet-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Fuel Economy</th>
                  <th>Cost / km</th>
                  <th>Uptime</th>
                </tr>
              </thead>
              <tbody>
                {fleetAnalyticsData.topPerformers.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span className="fleet-reg-plate" style={{ fontSize: '11px' }}>{p.registration}</span>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{p.model}</div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{p.driver}</td>
                    <td style={{ fontWeight: 800, color: '#059669' }}>{p.fuelKmL}</td>
                    <td>{p.costPerKm}</td>
                    <td>
                      <span className="fleet-status-pill active">{p.uptimePct}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Vehicles Requiring Triage & Maintenance */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-header">
            <div>
              <div className="analytics-chart-title">⚠️ Vehicles Requiring Attention & Triage</div>
              <div className="analytics-chart-subtitle">Breakdown risks, high fuel burn & overdue service</div>
            </div>
          </div>
          <div className="fleet-table-wrapper">
            <table className="fleet-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Identified Issue</th>
                  <th>Priority</th>
                  <th>Action Required</th>
                </tr>
              </thead>
              <tbody>
                {fleetAnalyticsData.triageVehicles.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <span className="fleet-reg-plate" style={{ fontSize: '11px' }}>{t.registration}</span>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{t.model}</div>
                    </td>
                    <td style={{ fontSize: '11px', color: '#1e293b' }}>{t.issue}</td>
                    <td>
                      <span className={`fleet-status-pill ${t.priority === 'CRITICAL' ? 'breakdown' : t.priority === 'HIGH' ? 'maintenance' : 'available'}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '10px', padding: '4px 8px' }}
                        onClick={() => handleScheduleTriage(t.registration, t.actionNeeded)}
                      >
                        ⚡ Dispatch Bay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
