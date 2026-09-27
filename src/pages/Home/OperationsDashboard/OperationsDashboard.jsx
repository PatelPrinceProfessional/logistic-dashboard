import { useState } from 'react';
import Layout from '../../../components/Common/Layout/Layout';
import OpsKPICards from './OpsKPICards';
import FleetCapacityChart from './FleetCapacityChart';
import {
  tripStatusData, dockUtilizationData, urgentActions, next24HoursEvents,
  tripsInProgress, pendingOrders,
} from '../../../utils/mockData/operationsDashboard';
import './OperationsDashboard.css';

export default function OperationsDashboard() {
  const [activeTab, setActiveTab] = useState('trips');
  const [timeRange, setTimeRange] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');

  // Search/Filter helper for trips in progress
  const filteredTrips = tripsInProgress.filter(t =>
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.dest.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search/Filter helper for pending orders
  const filteredOrders = pendingOrders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout
      title="Operations Dashboard"
      breadcrumbs={[{ label: 'Operations Dashboard', path: '/ops-dashboard' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <select
            className="input-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            aria-label="Select Time Range"
          >
            <option>Today</option>
            <option>Shift 1 (06:00 - 14:00)</option>
            <option>Shift 2 (14:00 - 22:00)</option>
            <option>Next 24 Hours</option>
          </select>
          <button className="btn btn--secondary btn--sm">
            Refresh Data
          </button>
        </div>
      }
    >
      {/* ── KPI Cards Section ── */}
      <OpsKPICards />

      {/* ── Main Middle Row: Fleet Capacity, Trip Status, Dock Utilization ── */}
      <div className="ops-grid-3 ops-section">
        {/* Fleet Capacity Stacked Bar Chart */}
        <FleetCapacityChart />

        {/* Trip Status Summary */}
        <div className="card">
          <div className="card__header">
            <div>
              <div className="card__title">Trip Execution Status</div>
              <div className="card__subtitle">Active trip breakdown by milestone</div>
            </div>
          </div>
          <div className="card__body trip-status-bar">
            {tripStatusData.map((item) => {
              const pct = Math.round((item.count / 855) * 100);
              return (
                <div key={item.label} className="trip-status-item">
                  <div className="trip-status-item__header">
                    <span className="trip-status-item__label">
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                      {item.label}
                    </span>
                    <div>
                      <span className="trip-status-item__count">{item.count}</span>
                      <span className="trip-status-item__pct"> ({pct}%)</span>
                    </div>
                  </div>
                  <div className="dock-bar-track">
                    <div
                      className="dock-bar-fill"
                      style={{ width: `${pct}%`, background: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dock Facility Utilization */}
        <div className="card">
          <div className="card__header">
            <div>
              <div className="card__title">Dock Facility Utilization</div>
              <div className="card__subtitle">Active loading bay occupancy</div>
            </div>
          </div>
          <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dockUtilizationData.map((facility) => (
              <div key={facility.dock} className="dock-bar-item">
                <div className="dock-bar-item__header">
                  <span className="dock-bar-item__name">{facility.dock}</span>
                  <span className="dock-bar-item__pct" style={{
                    color: facility.used > 85 ? 'var(--color-error)' : facility.used > 65 ? 'var(--color-warning)' : 'var(--color-success)'
                  }}>
                    {facility.used}%
                  </span>
                </div>
                <div className="dock-bar-track">
                  <div
                    className="dock-bar-fill"
                    style={{
                      width: `${facility.used}%`,
                      background: facility.used > 85 ? 'var(--color-error)' : facility.used > 65 ? 'var(--color-warning)' : 'var(--color-success)',
                    }}
                  />
                </div>
                <div className="dock-bar-item__sub">
                  {facility.appointments} / {facility.total} docks occupied ({facility.available}% available)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lower Row: Urgent Actions & 24H Timeline ── */}
      <div className="ops-grid-2 ops-section">
        {/* Urgent Actions Panel */}
        <div className="urgent-panel">
          <div className="urgent-panel__header">
            <div className="urgent-panel__title">
              Urgent Operational Actions
            </div>
            <span className="badge badge--danger">{urgentActions.length} Items Require Action</span>
          </div>
          <div>
            {urgentActions.map((item) => (
              <div key={item.id} className="urgent-item">
                <div className={`urgent-item__count urgent-item__count--${item.severity}`}>
                  {item.count}
                </div>
                <div className="urgent-item__body">
                  <div className="urgent-item__title">{item.title}</div>
                  <div className="urgent-item__desc">{item.description}</div>
                </div>
                <button className="btn btn--secondary btn--xs">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Next 24 Hours Operational Timeline */}
        <div className="card">
          <div className="card__header">
            <div>
              <div className="card__title">Next 24H Ops Timeline</div>
              <div className="card__subtitle">Scheduled dispatches, pickups & arrivals</div>
            </div>
          </div>
          <div className="timeline-24h">
            {next24HoursEvents.map((item, idx) => (
              <div key={idx} className={`timeline-24h__item timeline-24h__item--${item.status}`}>
                <div className="timeline-24h__time">{item.time}</div>
                <div
                  className="timeline-24h__dot"
                  style={{
                    background: item.status === 'delayed' ? 'var(--color-error)' : item.status === 'at-risk' ? 'var(--color-warning)' : 'var(--color-success)'
                  }}
                />
                <div className="timeline-24h__content">
                  <div className="timeline-24h__event">{item.event}</div>
                  <div className="timeline-24h__location">{item.location}</div>
                </div>
                <span className={`timeline-24h__type type-${item.type}`}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Operational Data Table Section ── */}
      <div className="card ops-section">
        <div className="card__header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <button
              className={`btn ${activeTab === 'trips' ? 'btn--primary' : 'btn--secondary'} btn--sm`}
              onClick={() => setActiveTab('trips')}
            >
              Trips in Progress ({tripsInProgress.length})
            </button>
            <button
              className={`btn ${activeTab === 'orders' ? 'btn--primary' : 'btn--secondary'} btn--sm`}
              onClick={() => setActiveTab('orders')}
            >
              Pending Orders ({pendingOrders.length})
            </button>
          </div>

          <div style={{ width: 260 }}>
            <input
              type="text"
              className="input-text"
              placeholder="Search trip, order or vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="card__body" style={{ padding: 0 }}>
          {activeTab === 'trips' ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Route</th>
                    <th>Driver & Vehicle</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>ETA</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <strong style={{ color: 'var(--color-primary-blue)' }}>{t.id}</strong>
                      </td>
                      <td>
                        <div>{t.origin} → {t.dest}</div>
                      </td>
                      <td>
                        <div>{t.driver}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>{t.vehicle}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-mini">
                            <div
                              className="progress-mini__fill"
                              style={{
                                width: `${t.progress}%`,
                                background: t.status === 'delayed' ? 'var(--color-error)' : t.status === 'at-risk' ? 'var(--color-warning)' : 'var(--color-primary-blue)',
                              }}
                            />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{t.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge--${t.status === 'on-time' ? 'success' : t.status === 'delayed' ? 'danger' : 'warning'}`}>
                          {t.status === 'on-time' ? 'On Time' : t.status === 'delayed' ? 'Delayed' : 'At Risk'}
                        </span>
                      </td>
                      <td style={{ fontSize: 13, fontWeight: 500 }}>{t.eta}</td>
                      <td>
                        <button className="btn btn--secondary btn--xs">
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>From / To</th>
                    <th>Cargo Details</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id}>
                      <td>
                        <strong style={{ color: 'var(--color-primary-blue)' }}>{ord.id}</strong>
                      </td>
                      <td>
                        <div>{ord.from} → {ord.to}</div>
                      </td>
                      <td>
                        <div>{ord.items} items ({ord.weight})</div>
                      </td>
                      <td>
                        <span className={`priority-icon priority-${ord.priority}`}>
                          {ord.priority[0].toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge--warning">
                          {ord.status}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>{ord.created}</td>
                      <td>
                        <button className="btn btn--primary btn--xs">
                          Plan Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
