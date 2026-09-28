import { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import { facilitiesList, dockScheduleData as initialDockData } from '../../utils/mockData/facilitiesData';
import DockDetailModal from './components/DockDetailModal';
import './Facilities.css';

export default function DockSchedule() {
  const [selectedFacilityId, setSelectedFacilityId] = useState('FAC-BHW-01');
  const [dockData, setDockData] = useState(initialDockData);
  const [selectedDock, setSelectedDock] = useState(null);
  const [viewMode, setViewMode] = useState('GANTT'); // 'GANTT' | 'LIST'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOptimizeSchedule = () => {
    showToast('🤖 AI Dock Optimization Engine re-balanced Gantt bay assignments! Dwell buffer improved by +18%.');
  };

  const handleAddEmergency = () => {
    const emergencyApt = {
      id: `APT-EMERG-${Math.floor(100 + Math.random() * 900)}`,
      shipmentId: 'SHP-PRIORITY-99',
      customer: 'Emergency Cold-Chain Express',
      type: 'Pickup',
      startTime: '10:00',
      endTime: '11:00',
      startHour: 10,
      durationHours: 1.0,
      status: 'Emergency Allocated',
      color: '#dc2626',
    };

    setDockData((prev) => ({
      ...prev,
      docks: prev.docks.map((d) =>
        d.id === 'DOCK-01'
          ? { ...d, appointments: [...d.appointments, emergencyApt], utilizationPct: 95 }
          : d
      ),
    }));
    showToast('🚨 Emergency Priority Dock Slot booked at Dock 1 for Cold-Chain Express.');
  };

  return (
    <Layout
      title="Dock Master Schedule"
      breadcrumbs={[{ label: 'Facilities', path: '/facilities' }, { label: 'Dock Schedule' }]}
    >
      <div className="facilities-page-container">
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
          <span>⚓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="facilities-header-bar">
        <div className="facilities-facility-selector">
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            Facility:
          </span>
          <select
            className="facility-dropdown"
            value={selectedFacilityId}
            onChange={(e) => {
              setSelectedFacilityId(e.target.value);
              showToast(`Switched dock view to ${e.target.selectedOptions[0].text}`);
            }}
          >
            {facilitiesList.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="fleet-filter-pills">
            <button
              className={`fleet-filter-pill ${viewMode === 'GANTT' ? 'active' : ''}`}
              onClick={() => setViewMode('GANTT')}
            >
              Timeline Gantt
            </button>
            <button
              className={`fleet-filter-pill ${viewMode === 'LIST' ? 'active' : ''}`}
              onClick={() => setViewMode('LIST')}
            >
              Queue List
            </button>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={handleAddEmergency}>
            🚨 Emergency Bay Slot
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleOptimizeSchedule}>
            🤖 AI Optimize Schedule
          </button>
        </div>
      </div>

      {/* Bottleneck Alert Banner */}
      {dockData.bottlenecks?.length > 0 && (
        <div
          style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>⚠️</span>
            <div>
              <strong style={{ color: '#92400e' }}>Bottleneck Detected at {dockData.bottlenecks[0].dock}:</strong>{' '}
              <span style={{ color: '#b45309' }}>{dockData.bottlenecks[0].issue}</span>
              <div style={{ color: '#78350f', marginTop: '2px', fontSize: '11px' }}>
                💡 Recommendation: {dockData.bottlenecks[0].recommendation}
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={handleOptimizeSchedule}>
            Re-Balance Bay Load
          </button>
        </div>
      )}

      {/* Main Gantt Timeline Container */}
      {viewMode === 'GANTT' ? (
        <div className="gantt-chart-container">
          {/* Gantt Timeline Header */}
          <div className="gantt-timeline-header">
            <div style={{ fontWeight: 800, fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Dock Bay / Asset
            </div>
            <div className="gantt-time-scale">
              {['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map((time) => (
                <span key={time}>{time}</span>
              ))}
            </div>
          </div>

          {/* Docks Gantt Lanes */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Live Time Red Vertical Marker */}
            <div
              className="gantt-current-time-marker"
              style={{ left: `calc(200px + (100% - 200px) * ${dockData.currentTimeXPercent / 100})` }}
            />

            {dockData.docks.map((dock) => (
              <div key={dock.id} className="gantt-dock-row">
                <div
                  className="gantt-dock-label"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedDock(dock)}
                >
                  <div style={{ fontWeight: 800, fontSize: '12px', color: 'var(--color-primary-600)' }}>
                    {dock.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                    {dock.slotsBooked} • <strong>{dock.utilizationPct}% utilized</strong>
                  </div>
                </div>

                {/* Horizontal Gantt Track */}
                <div className="gantt-lane-track">
                  {dock.appointments.map((apt) => {
                    // Timeline calculation: startHour (6 to 22 = 16 hours total span)
                    const leftPct = Math.max(0, ((apt.startHour - 6) / 16) * 100);
                    const widthPct = Math.max(4, (apt.durationHours / 16) * 100);

                    return (
                      <div
                        key={apt.id}
                        className="gantt-apt-block"
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                          background: apt.color,
                        }}
                        onClick={() => setSelectedDock(dock)}
                        title={`${apt.id}: ${apt.customer} (${apt.startTime} - ${apt.endTime})`}
                      >
                        <span>{apt.startTime} {apt.customer} ({apt.shipmentId})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--color-border)', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>🟦 Pickup Bay Block</span>
              <span>🟩 Delivery Bay Block</span>
              <span>🟨 Cross-Dock Transfer Block</span>
              <span>🟪 Security Weighbridge Clearance</span>
            </div>
            <span>Current Real-Time Clock: <strong>{dockData.currentTimeStr}</strong></span>
          </div>
        </div>
      ) : (
        /* List Mode Queue */
        <div className="fleet-card-box">
          <div className="fleet-card-box-title">Docks Utilization & Assigned Load Queue</div>
          <div className="fleet-table-wrapper">
            <table className="fleet-table">
              <thead>
                <tr>
                  <th>Dock Bay</th>
                  <th>Status</th>
                  <th>Capacity</th>
                  <th>Assigned Equipment</th>
                  <th>Utilization</th>
                  <th>Turnaround Dwell</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dockData.docks.map((dock) => (
                  <tr key={dock.id} className="fleet-row-clickable" onClick={() => setSelectedDock(dock)}>
                    <td style={{ fontWeight: 700 }}>{dock.name}</td>
                    <td>
                      <span className={`fleet-status-pill ${dock.status.toLowerCase().includes('avail') ? 'active' : dock.status.toLowerCase().includes('occup') ? 'maintenance' : 'available'}`}>
                        {dock.status}
                      </span>
                    </td>
                    <td>{dock.capacityKg?.toLocaleString()} kg</td>
                    <td style={{ fontSize: '11px' }}>{dock.equipment}</td>
                    <td>
                      <strong style={{ color: dock.utilizationPct > 75 ? '#d97706' : '#059669' }}>
                        {dock.utilizationPct}% ({dock.slotsBooked})
                      </strong>
                    </td>
                    <td>{dock.avgDwellMinutes}m avg</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setSelectedDock(dock)}>
                        Inspect Bay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dock Detail Modal */}
      {selectedDock && (
        <DockDetailModal
          dock={selectedDock}
          onClose={() => setSelectedDock(null)}
        />
      )}
    </div>
    </Layout>
  );
}
