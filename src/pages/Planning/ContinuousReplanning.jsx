import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { replanTriggers as initialTriggers } from '../../utils/mockData/planningData';
import { Zap, Activity, Clock, ShieldAlert, ArrowRight, Play, RefreshCw } from 'lucide-react';
import './Planning.css';

export default function ContinuousReplanning() {
  const navigate = useNavigate();
  const [triggers, setTriggers] = useState(initialTriggers);

  const handleSimulateTrigger = (trigName) => {
    alert(`Simulation executed for trigger "${trigName}". Rerouted 2 affected shipments automatically.`);
  };

  return (
    <Layout
      title="Continuous Replanning Engine"
      breadcrumbs={[
        { label: 'Planning', path: '/planning' },
        { label: 'Continuous Replanning', path: '/planning/replanning' }
      ]}
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn--secondary btn--sm" onClick={() => navigate('/planning')}>
            Planning Workbench
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => handleSimulateTrigger('Global Reschedule')}>
            <Zap size={14} /> Simulate Replan
          </button>
        </div>
      }
    >
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <p style={{ color: 'var(--color-secondary-gray)', fontSize: 14, margin: 0 }}>
          Event-driven automated replanning engine that continuously re-optimizes routes, carrier assignments, and schedules upon operational disruptions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
        {/* Active Triggers Control */}
        <div className="card">
          <div className="card__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={16} color="var(--color-warning)" />
              <div className="card__title">Active Event Triggers ({triggers.length})</div>
            </div>
            <span className="badge badge--success">Automated Monitor ON</span>
          </div>
          <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {triggers.map((trig) => (
              <div key={trig.id} style={{ background: '#F8F9FA', padding: 14, borderRadius: 6, border: '1px solid var(--color-medium-gray)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-dark-gray-text)' }}>
                    {trig.name}
                  </div>
                  <span className="badge badge--info" style={{ fontSize: 10 }}>{trig.type}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 4 }}>
                  {trig.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--color-medium-gray)', fontSize: 11, color: 'var(--color-secondary-gray)' }}>
                  <span>Last Triggered: <strong>{trig.lastTriggered}</strong></span>
                  <button className="btn btn--secondary btn--xs" onClick={() => handleSimulateTrigger(trig.name)}>
                    <Play size={11} /> Test Trigger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disruption Recovery History Stream */}
        <div className="card">
          <div className="card__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={16} color="var(--color-primary-blue)" />
              <div className="card__title">Replanning Execution Log</div>
            </div>
          </div>
          <div className="card__body">
            <div className="ac-timeline">
              <div className="ac-timeline__item">
                <div style={{ fontWeight: 700, color: 'var(--color-dark-gray-text)', fontSize: 13 }}>
                  21:48 — Vehicle Breakdown (DL-08-EF-9012)
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 2 }}>
                  Auto-rerouted 2 shipments (SHP-100247) via BlueDart Trailer Fleet. Cost Delta: +$140.
                </div>
                <span className="badge badge--success" style={{ fontSize: 10, marginTop: 4 }}>Auto-Resolved</span>
              </div>

              <div className="ac-timeline__item">
                <div style={{ fontWeight: 700, color: 'var(--color-dark-gray-text)', fontSize: 13 }}>
                  20:15 — Carrier Tender Rejection (Spot Carrier)
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 2 }}>
                  Tendered load ORD-2024-0894 to fallback carrier Express Logistics.
                </div>
                <span className="badge badge--success" style={{ fontSize: 10, marginTop: 4 }}>Auto-Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
