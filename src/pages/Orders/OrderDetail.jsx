import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { ordersList } from '../../utils/mockData/ordersData';
import { Package, Truck, Clock, FileText, DollarSign, History, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import './Orders.css';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const order = ordersList.find(o => o.id === id) || ordersList[0];

  return (
    <Layout
      title={`Order ${order.id}`}
      breadcrumbs={[
        { label: 'Orders', path: '/orders' },
        { label: order.id, path: `/orders/${order.id}` }
      ]}
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn--secondary btn--sm" onClick={() => navigate('/orders')}>
            <ArrowLeft size={14} /> Back to Orders
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => alert(`Created shipment from ${order.id}.`)}>
            <Truck size={14} /> Create Shipment
          </button>
        </div>
      }
    >
      {/* ── Order Header Banner ── */}
      <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="card__body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{order.id}</h2>
              <span className={`badge badge--${order.status === 'Dispatched' || order.status === 'Delivered' ? 'success' : 'warning'}`}>
                {order.status}
              </span>
              <span className={`priority-pill priority-pill--${order.priority}`}>
                {order.priority}
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-secondary-gray)', marginTop: 4 }}>
              Customer: <strong>{order.customer}</strong> ({order.customerCode}) • Value: <strong>{order.orderValue}</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--color-secondary-gray)' }}>
            <div>Created: <strong>{order.createdDate}</strong></div>
            <div>Expected Delivery: <strong>{order.expectedDelivery}</strong></div>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="om-tabs-row">
        {[
          { key: 'overview', label: 'Overview', icon: Package },
          { key: 'items', label: `Cargo Items (${order.items.length})`, icon: Package },
          { key: 'timeline', label: 'Timeline History', icon: Clock },
          { key: 'documents', label: 'Documents (2)', icon: FileText },
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
                <div className="card__title">Route & Location Details</div>
              </div>
              <div className="card__body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#F8F9FA', padding: 14, borderRadius: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary-blue)', marginBottom: 6 }}>
                    📍 PICKUP ORIGIN ({order.origin.city})
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{order.origin.locationName}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 4 }}>{order.origin.address}</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>
                    Contact: <strong>{order.origin.contactPerson}</strong> ({order.origin.phone})
                  </div>
                </div>

                <div style={{ background: '#F8F9FA', padding: 14, borderRadius: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-success)', marginBottom: 6 }}>
                    🏁 DELIVERY DESTINATION ({order.destination.city})
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{order.destination.locationName}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginTop: 4 }}>{order.destination.address}</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>
                    Contact: <strong>{order.destination.contactPerson}</strong> ({order.destination.phone})
                  </div>
                </div>
              </div>
            </div>

            {/* Cargo Metrics Card */}
            <div className="card">
              <div className="card__header">
                <div className="card__title">Cargo Metrics & Requirements</div>
              </div>
              <div className="card__body" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Total Weight</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{order.totalWeight}</div>
                </div>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Total Volume</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{order.totalVolume}</div>
                </div>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Service Level</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-primary-blue)' }}>{order.serviceLevel}</div>
                </div>
                <div style={{ background: '#F8F9FA', padding: 10, borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>Hazmat Cargo</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-success)' }}>No</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Actions & Linked Shipment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="card">
              <div className="card__header">
                <div className="card__title">Order Actions</div>
              </div>
              <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="btn btn--primary btn--sm" onClick={() => alert('Order promoted to Planning.')}>
                  <CheckCircle size={14} /> Promote to Planning
                </button>
                <button className="btn btn--secondary btn--sm" onClick={() => alert('Order put on hold.')}>
                  Hold Order
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <div className="card__title">Linked Shipment</div>
              </div>
              <div className="card__body">
                {order.relatedShipmentId ? (
                  <div style={{ background: '#EBF5FF', padding: 12, borderRadius: 6, border: '1px solid #0066CC30' }}>
                    <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>Assigned Shipment:</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-primary-blue)', marginTop: 2 }}>
                      {order.relatedShipmentId}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>
                    No shipment created yet for this order.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'items' && (
        <div className="card">
          <div className="card__body" style={{ padding: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>SKU Code</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Weight</th>
                  <th>Volume</th>
                  <th>Temperature Required</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong style={{ color: 'var(--color-primary-blue)' }}>{item.sku}</strong></td>
                    <td>{item.description}</td>
                    <td>{item.qty} {item.unit}</td>
                    <td>{item.weightKg} kg</td>
                    <td>{item.volumeCbm} Cbm</td>
                    <td>{item.tempRequired ? `${item.minTemp} to ${item.maxTemp}` : 'Ambient'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}
