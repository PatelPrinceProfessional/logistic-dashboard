import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { fleetCapacityData, fleetCapacityColors } from '../../../utils/mockData/operationsDashboard';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + p.value, 0);
  return (
    <div style={{
      background: 'white', border: '1px solid #E9ECEF', borderRadius: 6,
      padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: p.fill, flexShrink: 0 }} />
          <span style={{ color: '#6C757D' }}>{p.name}:</span>
          <strong style={{ color: p.fill }}>{p.value} vehicles</strong>
        </div>
      ))}
      <div style={{ borderTop: '1px solid #E9ECEF', marginTop: 6, paddingTop: 6, fontWeight: 600 }}>
        Total: {total} vehicles
      </div>
    </div>
  );
};

export default function FleetCapacityChart() {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card__header">
        <div>
          <div className="card__title">Current Fleet Capacity</div>
          <div className="card__subtitle">Load fill rate by vehicle type</div>
        </div>
      </div>
      <div className="card__body">
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          {[
            { key: 'full',   label: 'Full (100%)', color: fleetCapacityColors.full   },
            { key: 'high',   label: '75–99%',      color: fleetCapacityColors.high   },
            { key: 'medium', label: '50–74%',      color: fleetCapacityColors.medium },
            { key: 'low',    label: '<50%',        color: fleetCapacityColors.low    },
          ].map((l) => (
            <div key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, flexShrink: 0 }} />
              <span style={{ color: '#6C757D' }}>{l.label}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={fleetCapacityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" vertical={false} />
            <XAxis
              dataKey="type"
              tick={{ fontSize: 12, fill: '#6C757D' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6C757D' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
            <Bar dataKey="full"   name="Full (100%)" stackId="a" fill={fleetCapacityColors.full}   radius={[0,0,0,0]} />
            <Bar dataKey="high"   name="75–99%"      stackId="a" fill={fleetCapacityColors.high}   />
            <Bar dataKey="medium" name="50–74%"      stackId="a" fill={fleetCapacityColors.medium} />
            <Bar dataKey="low"    name="<50%"        stackId="a" fill={fleetCapacityColors.low}    radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
