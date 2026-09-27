import { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import { validationQueue as initialQueue } from '../../utils/mockData/ordersData';
import { AlertOctagon, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, X } from 'lucide-react';
import './Orders.css';

export default function OrderValidation() {
  const [queue, setQueue] = useState(initialQueue);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFixValidation = (orderId) => {
    setQueue(queue.filter(q => q.orderId !== orderId));
    setSelectedItem(null);
    alert(`Validation errors resolved for ${orderId}. Order promoted to Validated status.`);
  };

  return (
    <Layout
      title="Order Validation Queue"
      breadcrumbs={[
        { label: 'Orders', path: '/orders' },
        { label: 'Validation Queue', path: '/orders/validation' }
      ]}
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn--primary btn--sm" onClick={() => alert('Batch validation completed across queue.')}>
            <ShieldCheck size={14} /> Validate All Pending ({queue.length})
          </button>
        </div>
      }
    >
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <p style={{ color: 'var(--color-secondary-gray)', fontSize: 14, margin: 0 }}>
          Review, diagnose, and resolve order input errors before dispatch planning.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedItem ? '1fr 400px' : '1fr', gap: 'var(--space-lg)' }}>
        {/* Validation Queue List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {queue.length === 0 ? (
            <div className="card" style={{ padding: 48, textAlign: 'center' }}>
              <CheckCircle size={32} color="var(--color-success)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: 16, fontWeight: 700 }}>Validation Queue Clean!</div>
              <div style={{ fontSize: 13, color: 'var(--color-secondary-gray)', marginTop: 4 }}>
                All pending transportation orders have passed automated validation checks.
              </div>
            </div>
          ) : (
            queue.map((item) => (
              <div
                key={item.orderId}
                className="card"
                style={{
                  borderLeft: `4px solid ${item.severity === 'critical' ? 'var(--color-error)' : 'var(--color-warning)'}`,
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="card__header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AlertOctagon size={18} color={item.severity === 'critical' ? 'var(--color-error)' : 'var(--color-warning)'} />
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-primary-blue)' }}>{item.orderId}</span>
                    <span style={{ fontSize: 13, color: 'var(--color-secondary-gray)' }}>({item.customer})</span>
                  </div>
                  <span className={`badge badge--${item.severity === 'critical' ? 'danger' : 'warning'}`}>
                    {item.errorsCount} Error{item.errorsCount > 1 ? 's' : ''} Identified
                  </span>
                </div>

                <div className="card__body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.errorList.map((err, idx) => (
                      <div key={idx} style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'var(--color-error)', fontWeight: 700 }}>• {err.field}:</span>
                        <span>{err.message}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--color-medium-gray)', fontSize: 12, color: 'var(--color-secondary-gray)' }}>
                    <span>Reported {item.timestamp}</span>
                    <button className="btn btn--primary btn--xs" onClick={() => setSelectedItem(item)}>
                      Inspect & Fix <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Drawer Panel for Fixing Errors */}
        {selectedItem && (
          <div className="card" style={{ height: 'max-content' }}>
            <div className="card__header" style={{ background: '#FFF8F8' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-error)' }}>
                Fix Validation — {selectedItem.orderId}
              </div>
              <button className="btn btn--ghost btn--xs" onClick={() => setSelectedItem(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 13 }}>
                <strong>Customer:</strong> {selectedItem.customer}
              </div>

              {selectedItem.errorList.map((err, idx) => (
                <div key={idx} style={{ background: '#F8F9FA', padding: 12, borderRadius: 6, border: '1px solid var(--color-medium-gray)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-error)', marginBottom: 4 }}>
                    ⚠️ {err.field} Violation
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)', marginBottom: 8 }}>
                    {err.message}
                  </div>
                  <input
                    type="text"
                    className="input-text"
                    placeholder={`Correct ${err.field}...`}
                    defaultValue={err.fixType === 'address' ? '560058 — Peenya 3rd Stage, Bangalore' : '3200 kg Axle Approved'}
                    style={{ fontSize: 12 }}
                  />
                </div>
              ))}

              <button
                className="btn btn--primary btn--sm"
                onClick={() => handleFixValidation(selectedItem.orderId)}
                style={{ marginTop: 8 }}
              >
                <CheckCircle size={14} /> Save Fix & Promote Order
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
