import Layout from '../../../components/Common/Layout/Layout';
import { Plus, Download, RefreshCw, TrendingUp, TrendingDown, Package, Truck, AlertTriangle, DollarSign } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  kpiMetrics, freightSpendData, shipmentStatusData, topCarriers,
  exceptionSeverity, recentShipments, recentAlerts
} from '../../../utils/mockData/dashboard';
import { getBadgeClass, getStatusLabel, getRowClass, formatCurrency } from '../../../utils/statusHelpers';
import './ExecutiveDashboard.css';

/* ─── KPI Card ─── */
function KPICard({ icon: Icon, iconBg, value, label, trend, trendType }) {
  return (
    <div className="kpi-card hover-lift">
      <div className="kpi-card__header">
        <div className="kpi-card__label">{label}</div>
        <div className="kpi-card__icon" style={{ background: iconBg + '20' }}>
          <Icon size={20} color={iconBg} />
        </div>
      </div>
      <div className={`kpi-card__value kpi-card__value--${trendType === 'up' ? 'blue' : trendType === 'down' ? 'red' : 'blue'}`}>
        {value}
      </div>
      <div className={`kpi-card__trend kpi-card__trend--${trendType === 'up' ? 'up' : trendType === 'down' ? 'down' : ''}`}>
        {trendType === 'up'   && <TrendingUp size={13} />}
        {trendType === 'down' && <TrendingDown size={13} />}
        <span>{trend}</span>
      </div>
    </div>
  );
}

/* ─── Custom Tooltip ─── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'white', border: '1px solid #E9ECEF', borderRadius: 6, padding: '8px 12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <strong>{typeof p.value === 'number' && p.value > 999 ? formatCurrency(p.value, '₹') : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function ExecutiveDashboard() {
  return (
    <Layout
      title="Executive Dashboard"
      breadcrumbs={[{ label: 'Executive Dashboard', path: '/' }]}
      actions={
        <>
          <button className="btn btn--ghost btn--sm" id="dashboard-refresh-btn">
            <RefreshCw size={15} /> Refresh
          </button>
          <button className="btn btn--ghost btn--sm" id="dashboard-export-btn">
            <Download size={15} /> Export
          </button>
          <button className="btn btn--primary btn--sm" id="dashboard-new-shipment-btn">
            <Plus size={15} /> New Shipment
          </button>
        </>
      }
    >
      {/* ── KPI Row ── */}
      <div className="grid-4 mb-lg">
        <KPICard
          icon={Package}
          iconBg="#0066CC"
          value={kpiMetrics.shipmentsToday.value}
          label={kpiMetrics.shipmentsToday.label}
          trend={kpiMetrics.shipmentsToday.trend}
          trendType="up"
        />
        <KPICard
          icon={DollarSign}
          iconBg="#27AE60"
          value={kpiMetrics.revenueMonth.value}
          label={kpiMetrics.revenueMonth.label}
          trend={kpiMetrics.revenueMonth.trend}
          trendType="up"
        />
        <KPICard
          icon={Truck}
          iconBg="#17A2B8"
          value={kpiMetrics.onTimeDelivery.value}
          label={kpiMetrics.onTimeDelivery.label}
          trend={kpiMetrics.onTimeDelivery.trend}
          trendType="neutral"
        />
        <KPICard
          icon={AlertTriangle}
          iconBg="#E74C3C"
          value={kpiMetrics.criticalExceptions.value}
          label={kpiMetrics.criticalExceptions.label}
          trend={kpiMetrics.criticalExceptions.trend}
          trendType="down"
        />
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, marginBottom: 16 }}>
        {/* Freight Spend Chart */}
        <div className="card">
          <div className="card__header">
            <div>
              <div className="card__title">Freight Spend</div>
              <div className="card__subtitle">Last 12 months — total logistics cost</div>
            </div>
            <button className="btn btn--ghost btn--xs">
              <Download size={13} /> Export
            </button>
          </div>
          <div className="card__body">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={freightSpendData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="freightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#0066CC" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0066CC" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6C757D' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6C757D' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v / 1000}K`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Spend"
                  stroke="#0066CC"
                  strokeWidth={2}
                  fill="url(#freightGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#0066CC' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shipment Status Pie */}
        <div className="card">
          <div className="card__header">
            <div className="card__title">Shipment Status</div>
          </div>
          <div className="card__body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={shipmentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {shipmentStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {shipmentStatusData.map((s) => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    {s.name}
                  </span>
                  <strong>{s.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Top Carriers */}
        <div className="top-carriers-card">
          <div className="top-carriers-header">
            <div className="top-carriers-title-group">
              <h3 className="top-carriers-title">Top Carriers by On-Time %</h3>
            </div>
            <span className="top-carriers-header-action">
              This Month
            </span>
          </div>
          <div className="top-carriers-divider" />
          <div className="top-carriers-list">
            {topCarriers.map((c, i) => {
              const perfClass =
                c.onTime >= 94
                  ? 'carrier-perf--excellent'
                  : c.onTime >= 90
                  ? 'carrier-perf--good'
                  : 'carrier-perf--warning';

              return (
                <div
                  key={c.name}
                  className={`top-carrier-row ${perfClass}`}
                  style={{ '--row-index': i }}
                  tabIndex={0}
                >
                  {/* Zone 1: Rank Badge */}
                  <div className={`carrier-rank-badge carrier-rank-badge--${i + 1}`}>
                    {i + 1}
                  </div>

                  {/* Zone 2: Carrier Info */}
                  <div className="carrier-info-zone">
                    <span className="carrier-name">{c.name}</span>
                    <span className="carrier-shipments">{c.count} shipments</span>
                  </div>

                  {/* Zone 3: Performance Block */}
                  <div className="carrier-perf-zone">
                    <div className="carrier-progress-wrapper">
                      <div className="carrier-progress-track">
                        <div
                          className="carrier-progress-fill"
                          style={{ width: `${c.onTime}%` }}
                        />
                      </div>
                    </div>
                    <div className="carrier-score-group">
                      <span className="carrier-score-chip">{c.onTime}%</span>
                      <span className="carrier-score-label">on-time</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exception Severity */}
        <div className="card">
          <div className="card__header">
            <div className="card__title">Active Exceptions</div>
            <button className="btn btn--primary btn--xs" id="view-all-exceptions-btn">View All</button>
          </div>
          <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {exceptionSeverity.map((e) => (
              <div key={e.level} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 64, fontSize: 12, fontWeight: 600, color: e.color }}>{e.level}</span>
                <div style={{ flex: 1, height: 8, background: '#F1F3F5', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(e.count / 127) * 100}%`, background: e.color, borderRadius: 999, transition: 'width 0.6s ease' }} />
                </div>
                <span style={{ width: 28, fontSize: 13, fontWeight: 700, textAlign: 'right', color: e.color }}>{e.count}</span>
              </div>
            ))}
            <div style={{ marginTop: 4, paddingTop: 12, borderTop: '1px solid #F1F3F5', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6C757D' }}>
              <span>Total Active</span>
              <strong style={{ color: '#2C3E50' }}>127</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Shipments Table ── */}
      <div className="recent-shipments-card">
        <div className="recent-shipments-header">
          <h3 className="recent-shipments-title">Recent Shipments</h3>
          <button className="recent-shipments-view-all" id="view-all-shipments-btn">
            View All
          </button>
        </div>
        <div className="recent-shipments-table-wrap">
          <table className="recent-shipments-table" aria-label="Recent shipments">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Customer</th>
                <th>Route</th>
                <th>Carrier</th>
                <th>ETA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentShipments.map((s, index) => {
                const [etaDate, etaTime] = (s.eta || '').split(' ');
                return (
                  <tr key={s.id} className="recent-shipments-row" style={{ '--row-index': index }}>
                    <td>
                      <div className="shipment-id-cell">
                        <span className={`shipment-status-strip shipment-status-strip--${s.status}`} />
                        <a href={`/shipments/${s.id}`} className="shipment-id-link">{s.id}</a>
                      </div>
                    </td>
                    <td>
                      <span className="shipment-customer-text">{s.customer}</span>
                    </td>
                    <td>
                      <span className="shipment-route-text">
                        {s.origin} <span className="shipment-route-arrow">→</span> {s.dest}
                      </span>
                    </td>
                    <td>
                      <span className="shipment-carrier-text">{s.carrier}</span>
                    </td>
                    <td>
                      <div className="shipment-eta-group">
                        <span className="shipment-eta-date">{etaDate}</span>
                        {etaTime && <span className="shipment-eta-time">{etaTime}</span>}
                      </div>
                    </td>
                    <td>
                      <span className={`shipment-status-pill shipment-status-pill--${s.status}`}>
                        <span className="shipment-status-dot" />
                        {getStatusLabel(s.status)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Recent Alerts ── */}
      <div className="card">
        <div className="card__header">
          <div className="card__title">Recent Alerts</div>
          <button className="btn btn--ghost btn--sm" id="view-all-alerts-btn">View All</button>
        </div>
        <div className="card__body--flush">
          {recentAlerts.map((a, i) => (
            <div
              key={a.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 20px',
                borderBottom: i < recentAlerts.length - 1 ? '1px solid #F1F3F5' : 'none',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span className={`badge ${getBadgeClass(a.severity)}`} style={{ flexShrink: 0, marginTop: 1 }}>
                {a.severity.charAt(0).toUpperCase() + a.severity.slice(1)}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.type}</div>
                <div style={{ fontSize: 12, color: '#6C757D', marginTop: 2 }}>{a.desc}</div>
              </div>
              <div style={{ fontSize: 11, color: '#6C757D', flexShrink: 0 }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
