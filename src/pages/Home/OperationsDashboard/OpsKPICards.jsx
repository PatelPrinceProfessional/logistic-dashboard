import { Truck, ClipboardList, AlertTriangle, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { opsKPIs } from '../../../utils/mockData/operationsDashboard';

/* ─── Circular Gauge SVG ─── */
function GaugeChart({ value, target, color }) {
  const radius    = 42;
  const circumference = 2 * Math.PI * radius;
  const fillPct   = value / 100;
  const targetPct = target / 100;
  const offset    = circumference * (1 - fillPct);
  const targetOffset = circumference * (1 - targetPct);

  return (
    <div className="gauge-wrapper" style={{ width: 110, height: 110 }}>
      <svg
        className="gauge-svg"
        width="110"
        height="110"
        viewBox="0 0 110 110"
        aria-label={`Fleet utilization: ${value}%`}
      >
        {/* Track */}
        <circle
          className="gauge-track"
          cx="55" cy="55"
          r={radius}
          strokeWidth="8"
        />
        {/* Target marker */}
        <circle
          cx="55" cy="55"
          r={radius}
          strokeWidth="2"
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeDasharray={`4 ${circumference - 4}`}
          strokeDashoffset={targetOffset}
          strokeLinecap="round"
        />
        {/* Value fill */}
        <circle
          className="gauge-fill"
          cx="55" cy="55"
          r={radius}
          strokeWidth="8"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="gauge-label">
        <span className="gauge-label__value" style={{ color }}>{value}</span>
        <span className="gauge-label__unit">%</span>
      </div>
    </div>
  );
}

/* ─── Individual KPI Card ─── */
function OpsKPICard({ id, icon: Icon, iconBg, value, label, subtitle, change, changeType, children, action, onAction }) {
  return (
    <div className={`kpi-card hover-lift${label === 'Pending Exceptions' ? ' kpi-exception-card' : ''}`} id={id}>
      <div className="kpi-card__header">
        <div className="kpi-card__label">{label}</div>
        <div className="kpi-card__icon" style={{ background: iconBg + '20' }}>
          <Icon size={18} color={iconBg} />
        </div>
      </div>

      {children ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
          {children}
        </div>
      ) : (
        <div
          className="kpi-card__value"
          style={{ color: changeType === 'danger' ? 'var(--color-error)' : changeType === 'warning' ? 'var(--color-warning)' : 'var(--color-dark-gray-text)' }}
        >
          {value.toLocaleString()}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 12, color: 'var(--color-secondary-gray)', fontWeight: 500 }}>{subtitle}</span>
          <span className={`kpi-card__trend kpi-card__trend--${changeType === 'up' ? 'up' : changeType === 'down' || changeType === 'danger' ? 'down' : ''}`}
            style={{ fontSize: 11 }}>
            {changeType === 'up'   && <TrendingUp size={11} />}
            {(changeType === 'down' || changeType === 'danger') && <TrendingDown size={11} />}
            {change}
          </span>
        </div>

        {action && (
          <button
            id={`ops-kpi-${id}-action`}
            className="btn btn--danger btn--xs"
            onClick={onAction}
            title={action}
            aria-label={action}
          >
            <Zap size={12} />
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function OpsKPICards() {
  return (
    <div className="grid-4 ops-section" aria-label="Operational KPIs">
      {/* Card 1: Active Shipments */}
      <OpsKPICard
        id="ops-active-shipments"
        icon={Truck}
        iconBg="var(--color-primary-blue)"
        value={opsKPIs.activeShipments.value}
        label="Active Shipments"
        subtitle={opsKPIs.activeShipments.subtitle}
        change={opsKPIs.activeShipments.change}
        changeType="up"
      />

      {/* Card 2: Pending Orders */}
      <OpsKPICard
        id="ops-pending-orders"
        icon={ClipboardList}
        iconBg="var(--color-warning)"
        value={opsKPIs.pendingOrders.value}
        label="Pending Orders"
        subtitle={opsKPIs.pendingOrders.subtitle}
        change={opsKPIs.pendingOrders.change}
        changeType="warning"
      />

      {/* Card 3: Fleet Utilization — with gauge */}
      <OpsKPICard
        id="ops-fleet-utilization"
        icon={TrendingUp}
        iconBg="var(--color-success)"
        value={opsKPIs.fleetUtilization.value}
        label="Fleet Utilization"
        subtitle={opsKPIs.fleetUtilization.subtitle}
        change={opsKPIs.fleetUtilization.change}
        changeType="down"
      >
        <GaugeChart
          value={opsKPIs.fleetUtilization.value}
          target={opsKPIs.fleetUtilization.target}
          color="var(--color-success)"
        />
      </OpsKPICard>

      {/* Card 4: Pending Exceptions */}
      <OpsKPICard
        id="ops-pending-exceptions"
        icon={AlertTriangle}
        iconBg="var(--color-error)"
        value={opsKPIs.pendingExceptions.value}
        label="Pending Exceptions"
        subtitle={opsKPIs.pendingExceptions.subtitle}
        change={opsKPIs.pendingExceptions.change}
        changeType="danger"
        action="Assign All"
        onAction={() => window.location.href = '/exceptions'}
      />
    </div>
  );
}
