import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { shipmentsList } from '../../utils/mockData/shipmentsData';
import { Truck, Navigation, Clock, FileText, DollarSign, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import './Shipments.css';

export default function ShipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const shipment = shipmentsList.find(s => s.id === id) || shipmentsList[0];

  return (
    <Layout
      title={`Shipment ${shipment.id}`}
      breadcrumbs={[
        { label: 'Shipments', path: '/shipments' },
        { label: shipment.id, path: `/shipments/${shipment.id}` }
      ]}
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn--secondary btn--sm" onClick={() => navigate('/shipments')}>
            <ArrowLeft size={14} /> Back to Shipments
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => navigate('/control-tower')}>
            <Navigation size={14} /> View on GIS Map
          </button>
        </div>
      }
    >
      {/* ── Shipment Header Banner ── */}
      <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="card__body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{shipment.id}</h2>
              <span className={`badge badge--${shipment.status === 'In Transit' ? 'info' : shipment.status === 'At Risk' ? 'warning' : 'success'}`}>
                {shipment.status}
              </span>
              <span className="badge badge--info" style={{ fontFamily: 'monospace' }}>
                Order: {shipment.orderId}
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-secondary-gray)', marginTop: 4 }}>
              Customer: <strong>{shipment.customer}</strong> • Carrier: <strong>{shipment.carrier}</strong> ({shipment.vehicleNumber})
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--color-secondary-gray)' }}>
            <div>Current GPS Location: <strong style={{ color: 'var(--color-primary-blue)' }}>📍 {shipment.gpsLocation}</strong></div>
            <div>Expected ETA: <strong>{shipment.eta}</strong></div>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="om-tabs-row">
        {[
          { key: 'overview', label: 'Overview', icon: Truck },
          { key: 'legs', label: 'Route & Multi-Legs', icon: Navigation },
          { key: 'documents', label: 'Documents (3)', icon: FileText },
          { key: 'costs', label: 'Freight Costs', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <div
              key={tab.key}
              className={`om-tab-item${activeTab === tab.key ? ' om-tab-item--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <Icon size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              {tab.label}
            </div>
          );
        })}
      </div>

      {/* ── Tab Content Workspace ── */}
      {activeTab === 'overview' && (
        <div className="om-detail-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {/* Origin & Destination Card */}
            <div className="card">
              <div className="card__header">
                <div className="card__title">Freight Route & Corridor</div>
              </div>
              <div className="card__body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#F8F9FA', padding: 14, borderRadius: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary-blue)', marginBottom: 6 }}>
                    📍 PICKUP ORIGIN ({shipment.origin.city})
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{shipment.origin.address}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 4 }}>
                    Pickup Time: {shipment.origin.pickupTime}
                  </div>
                </div>

                <div style={{ background: '#F8F9FA', padding: 14, borderRadius: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-success)', marginBottom: 6 }}>
                    🏁 DELIVERY DESTINATION ({shipment.destination.city})
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{shipment.destination.address}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 4 }}>
                    Delivery Time: {shipment.destination.deliveryTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Carrier & Vehicle Telemetry Card */}
            <div className="card">
              <div className="card__header">
                <div className="card__title">Carrier & Vehicle Telemetry</div>
              </div>
              <div className="card__body" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Carrier Name</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-blue)' }}>{shipment.carrier}</div>
                </div>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Vehicle Reg</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{shipment.vehicleNumber}</div>
                </div>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Driver Name</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{shipment.driverName}</div>
                </div>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Payload Weight</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{shipment.weight} ({shipment.volume})</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Actions & Milestone Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="card">
              <div className="card__header">
                <div className="card__title">Shipment Progress Milestone</div>
              </div>
              <div className="card__body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-success)', fontWeight: 600 }}>
                    <CheckCircle size={16} /> 1. Shipment Created
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-success)', fontWeight: 600 }}>
                    <CheckCircle size={16} /> 2. Carrier Assigned & Picked Up
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary-blue)', fontWeight: 700 }}>
                    <Truck size={16} /> 3. In Transit (Active GPS Telemetry)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-secondary-gray)' }}>
                    <Clock size={16} /> 4. Arrival at Destination
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
