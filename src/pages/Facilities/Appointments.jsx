import { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  facilitiesList,
  facilityAppointmentsStats,
  appointmentsWeeklySchedule as initialSchedule,
  todayAppointmentsList as initialTodayList,
} from '../../utils/mockData/facilitiesData';
import AppointmentDetailModal from './components/AppointmentDetailModal';
import AppointmentCreateModal from './components/AppointmentCreateModal';
import AppointmentRescheduleModal from './components/AppointmentRescheduleModal';
import './Facilities.css';

export default function Appointments() {
  const [selectedFacilityId, setSelectedFacilityId] = useState('FAC-BHW-01');
  const [schedule, setSchedule] = useState(initialSchedule);
  const [todayList, setTodayList] = useState(initialTodayList);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [inspectingApt, setInspectingApt] = useState(null);
  const [reschedulingApt, setReschedulingApt] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedFacility = facilitiesList.find((f) => f.id === selectedFacilityId) || facilitiesList[0];

  // Filter today's list
  const filteredTodayList = todayList.filter((apt) => {
    if (typeFilter === 'ALL') return true;
    return apt.type.toUpperCase() === typeFilter.toUpperCase();
  });

  // Check-In Action
  const handleCheckIn = (aptId) => {
    setTodayList((prev) =>
      prev.map((a) =>
        a.id === aptId ? { ...a, status: 'In Progress', arrivedAt: 'Just Now' } : a
      )
    );
    showToast(`Vehicle checked in at dock bay for ${aptId}. Unloading started.`);
    if (inspectingApt && inspectingApt.id === aptId) {
      setInspectingApt((prev) => ({ ...prev, status: 'In Progress', arrivedAt: 'Just Now' }));
    }
  };

  // Complete Action
  const handleComplete = (aptId) => {
    setTodayList((prev) =>
      prev.map((a) =>
        a.id === aptId ? { ...a, status: 'Completed', completedAt: 'Just Now' } : a
      )
    );
    showToast(`Appointment ${aptId} completed. Gate exit pass issued.`);
    if (inspectingApt && inspectingApt.id === aptId) {
      setInspectingApt((prev) => ({ ...prev, status: 'Completed', completedAt: 'Just Now' }));
    }
  };

  // Reschedule Confirmation
  const handleConfirmReschedule = (aptId, newSlot, newDock, reason, notifyCustomer) => {
    setTodayList((prev) =>
      prev.map((a) =>
        a.id === aptId ? { ...a, timeSlot: newSlot, dockAssigned: newDock, status: 'Rescheduled' } : a
      )
    );
    showToast(`Appointment ${aptId} rescheduled to ${newSlot} at ${newDock}.${notifyCustomer ? ' Carrier & Consignee notified via SMS/Email.' : ''}`);
  };

  // Add Appointment
  const handleAddAppointment = (newApt) => {
    setTodayList((prev) => [newApt, ...prev]);
    showToast(`Appointment ${newApt.id} scheduled for ${newApt.customer}!`);
  };

  return (
    <Layout
      title="Facility Appointments & Capacity"
      breadcrumbs={[{ label: 'Facilities', path: '/facilities' }, { label: 'Appointments' }]}
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
          <span>🏢</span>
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
              showToast(`Switched active hub to ${e.target.selectedOptions[0].text}`);
            }}
          >
            {facilitiesList.map((f) => (
              <option key={f.id} value={f.id}>{f.name} ({f.city})</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Weekly dock appointment schedule exported to CSV/PDF.')}>
            📥 Export Schedule
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
            + Book Appointment
          </button>
        </div>
      </div>

      {/* KPI Stats Banner */}
      <div className="facilities-stats-grid">
        <div className="facility-stat-card">
          <div className="facility-stat-icon-box blue">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="facility-stat-val">{facilityAppointmentsStats.totalMonthAppointments}</div>
            <div className="facility-stat-lbl">Appointments This Month</div>
          </div>
        </div>

        <div className="facility-stat-card">
          <div className="facility-stat-icon-box green">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="facility-stat-val" style={{ color: '#059669' }}>
              {todayList.filter((a) => a.status === 'Completed').length + 76}
            </div>
            <div className="facility-stat-lbl">Turnarounds Completed</div>
          </div>
        </div>

        <div className="facility-stat-card">
          <div className="facility-stat-icon-box amber">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="facility-stat-val" style={{ color: '#d97706' }}>
              {todayList.filter((a) => a.status === 'In Progress' || a.status === 'Arrived (Gate)').length}
            </div>
            <div className="facility-stat-lbl">Vehicles In Dock / Gate</div>
          </div>
        </div>

        <div className="facility-stat-card">
          <div className="facility-stat-icon-box purple">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="facility-stat-val">{facilityAppointmentsStats.avgTurnaroundDwellMinutes}m</div>
            <div className="facility-stat-lbl">Average Dwell Time</div>
          </div>
        </div>

        <div className="facility-stat-card">
          <div className="facility-stat-icon-box teal">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div className="facility-stat-val" style={{ color: '#0d9488' }}>{facilityAppointmentsStats.onTimeDockArrivalPct}%</div>
            <div className="facility-stat-lbl">On-Time Dock Arrivals</div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Calendar Grid + Dock Capacity Sidebar */}
      <div className="appointments-main-layout">
        {/* Left Column: 7-Day Matrix */}
        <div className="calendar-matrix-card">
          <div className="calendar-header-row">
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Weekly Dock Appointment Master Calendar</h3>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Operational time slots 06:00 to 22:00 IST across all available facility bays
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 700 }}>
              <span style={{ color: '#2563eb' }}>■ Pickup (Outbound)</span>
              <span style={{ color: '#059669' }}>■ Delivery (Inbound)</span>
              <span style={{ color: '#d97706' }}>■ Cross-Dock</span>
            </div>
          </div>

          <div className="calendar-grid-7days">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
              const isToday = day === 'Fri';
              const dayAppointments = schedule.filter((a) => a.day === day);

              return (
                <div key={day} className="calendar-day-col">
                  <div className={`calendar-day-title ${isToday ? 'today' : ''}`}>
                    {day} {isToday ? '• TODAY' : ''}
                  </div>

                  {dayAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={`calendar-apt-pill ${apt.type.toLowerCase().replace('-', '')}`}
                      onClick={() => setInspectingApt(apt)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                        <span>{apt.time} ({apt.duration})</span>
                        <span style={{ fontSize: '9px', opacity: 0.9 }}>{apt.dock}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '11px' }}>{apt.customer}</div>
                      <div style={{ fontSize: '10px', opacity: 0.9 }}>{apt.shipmentId}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dock & Gate Slot Meters */}
        <div className="dock-capacity-sidebar">
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>Real-Time Dock Bay Load</h3>
          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            Active capacity & booked slots at {selectedFacility.code}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            {[
              { name: 'Dock 1 (Pallet Bay)', booked: '4/5 Booked', pct: 80, color: '#2563eb' },
              { name: 'Dock 2 (Heavy Freight)', booked: '3/4 Booked', pct: 75, color: '#059669' },
              { name: 'Dock 3 (Cross-Dock)', booked: '3/5 Booked', pct: 60, color: '#d97706' },
              { name: 'Dock 4 (Container Chassis)', booked: '2/5 Booked', pct: 40, color: '#0d9488' },
              { name: 'Reefer Dedicated Bay', booked: '2/3 Booked', pct: 67, color: '#7c3aed' },
              { name: 'Main Security Gate & Scale', booked: 'Continuous Flow', pct: 90, color: '#6366f1' },
            ].map((d, idx) => (
              <div key={idx} className="dock-meter-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700 }}>
                  <span>{d.name}</span>
                  <span style={{ color: d.color }}>{d.booked} ({d.pct}%)</span>
                </div>
                <div className="dock-meter-bar-bg">
                  <div
                    className="dock-meter-bar-fill"
                    style={{ width: `${d.pct}%`, background: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '10px', padding: '10px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', fontSize: '11px', color: '#92400e' }}>
            ⚡ <strong>AI Recommendation:</strong> Shift 14:00 Cross-Dock appointment from Dock 3 to Dock 4 to maintain optimal dwell margins.
          </div>
        </div>
      </div>

      {/* Today's Appointments Operations Queue */}
      <div className="fleet-card-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Today's Live Check-In & Dock Operations Queue</h3>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Real-time driver gate arrivals, weighbridge inspection, and loading completion
            </div>
          </div>
          <div className="fleet-filter-pills">
            {['ALL', 'PICKUP', 'DELIVERY', 'CROSS-DOCK'].map((t) => (
              <button
                key={t}
                className={`fleet-filter-pill ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setTypeFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="fleet-table-wrapper">
          <table className="fleet-table">
            <thead>
              <tr>
                <th>Time Window</th>
                <th>Appointment ID</th>
                <th>Shipment & Cargo</th>
                <th>Customer / Consignee</th>
                <th>Type</th>
                <th>Assigned Dock</th>
                <th>Truck & Driver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodayList.map((apt) => (
                <tr
                  key={apt.id}
                  className="fleet-row-clickable"
                  onClick={() => setInspectingApt(apt)}
                >
                  <td style={{ fontWeight: 700, fontSize: '12px' }}>{apt.timeSlot}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary-600)' }}>{apt.id}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12px' }}>{apt.shipmentId}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{apt.cargoItems}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>{apt.customer}</td>
                  <td>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: apt.type === 'Pickup' ? '#eff6ff' : apt.type === 'Delivery' ? '#ecfdf5' : '#fffbeb',
                        color: apt.type === 'Pickup' ? '#1d4ed8' : apt.type === 'Delivery' ? '#047857' : '#b45309',
                      }}
                    >
                      {apt.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '12px' }}>{apt.dockAssigned}</td>
                  <td>
                    <span className="fleet-reg-plate" style={{ fontSize: '11px' }}>{apt.vehicleReg}</span>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{apt.driverName}</div>
                  </td>
                  <td>
                    <span className={`fleet-status-pill ${apt.status.toLowerCase().includes('complete') ? 'active' : apt.status.toLowerCase().includes('progress') ? 'maintenance' : 'available'}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {apt.status === 'Confirmed' || apt.status === 'Arrived (Gate)' ? (
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '10px', padding: '4px 8px' }}
                          onClick={() => handleCheckIn(apt.id)}
                        >
                          Check-In
                        </button>
                      ) : apt.status === 'In Progress' ? (
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ background: '#059669', borderColor: '#047857', fontSize: '10px', padding: '4px 8px' }}
                          onClick={() => handleComplete(apt.id)}
                        >
                          Complete
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '10px', padding: '4px 8px' }}
                          onClick={() => setInspectingApt(apt)}
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {inspectingApt && (
        <AppointmentDetailModal
          appointment={inspectingApt}
          onClose={() => setInspectingApt(null)}
          onCheckIn={handleCheckIn}
          onComplete={handleComplete}
          onOpenReschedule={(apt) => {
            setInspectingApt(null);
            setReschedulingApt(apt);
          }}
        />
      )}

      {showCreateModal && (
        <AppointmentCreateModal
          onClose={() => setShowCreateModal(false)}
          onAddAppointment={handleAddAppointment}
        />
      )}

      {reschedulingApt && (
        <AppointmentRescheduleModal
          appointment={reschedulingApt}
          onClose={() => setReschedulingApt(null)}
          onConfirmReschedule={handleConfirmReschedule}
        />
      )}
    </div>
    </Layout>
  );
}
