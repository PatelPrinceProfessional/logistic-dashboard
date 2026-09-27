import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import CreateOrderModal from './CreateOrderModal';
import { ordersStats, ordersList as initialOrders } from '../../utils/mockData/ordersData';
import { Package, Plus, Search, ShieldCheck, CheckCircle, Clock, Truck, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import './Orders.css';

export default function OrdersList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter orders based on user inputs
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.origin.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.destination.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || o.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === orders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map(o => o.id));
    }
  };

  const toggleSelectRow = (id, e) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCreateOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
  };

  return (
    <Layout
      title="Orders Management"
      breadcrumbs={[{ label: 'Orders', path: '/orders' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <button className="btn btn--secondary btn--sm" onClick={() => navigate('/orders/validation')}>
            <ShieldCheck size={14} /> Validation Queue ({ordersStats.pendingValidation})
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} /> Create New Order
          </button>
        </div>
      }
    >
      {/* ── Metric Header Strip ── */}
      <div className="om-metrics-strip" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="om-metric-card">
          <div className="om-metric-card__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <Package size={20} />
          </div>
          <div>
            <div className="om-metric-card__val">{ordersStats.totalOrders}</div>
            <div className="om-metric-card__lbl">Total Orders</div>
          </div>
        </div>

        <div className="om-metric-card">
          <div className="om-metric-card__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="om-metric-card__val" style={{ color: '#FF9800' }}>{ordersStats.pendingValidation}</div>
            <div className="om-metric-card__lbl">Pending Validation</div>
          </div>
        </div>

        <div className="om-metric-card">
          <div className="om-metric-card__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="om-metric-card__val" style={{ color: '#27AE60' }}>{ordersStats.plannedCount}</div>
            <div className="om-metric-card__lbl">Planned & Validated</div>
          </div>
        </div>

        <div className="om-metric-card">
          <div className="om-metric-card__icon" style={{ background: '#17A2B820', color: '#17A2B8' }}>
            <Truck size={20} />
          </div>
          <div>
            <div className="om-metric-card__val" style={{ color: '#17A2B8' }}>{ordersStats.dispatchedCount}</div>
            <div className="om-metric-card__lbl">Dispatched / Transit</div>
          </div>
        </div>

        <div className="om-metric-card">
          <div className="om-metric-card__icon" style={{ background: '#2C3E5020', color: '#2C3E50' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="om-metric-card__val">{ordersStats.deliveredCount}</div>
            <div className="om-metric-card__lbl">Delivered</div>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="om-filter-bar" style={{ marginBottom: 'var(--space-md)' }}>
        <div style={{ position: 'relative', width: 280 }}>
          <input
            type="text"
            className="input-text"
            placeholder="Search order ID, customer or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 32, fontSize: 13 }}
          />
          <Search size={14} color="#9EA5B1" style={{ position: 'absolute', left: 10, top: 12 }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <select
            className="input-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ fontSize: 13, width: 170 }}
          >
            <option value="ALL">All Order Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Pending Validation">Pending Validation</option>
            <option value="Validated">Validated</option>
            <option value="Planned">Planned</option>
            <option value="Assigned">Assigned</option>
            <option value="Dispatched">Dispatched</option>
          </select>

          <select
            className="input-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{ fontSize: 13, width: 150 }}
          >
            <option value="ALL">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>

          <button className="btn btn--secondary btn--sm" onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setPriorityFilter('ALL'); }}>
            Reset
          </button>
        </div>
      </div>

      {/* ── Data Grid Table ── */}
      <div className="om-table-container">
        {selectedIds.length > 0 && (
          <div style={{
            background: '#0066CC15', borderBottom: '1px solid #0066CC30', padding: '10px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13,
          }}>
            <div><strong>{selectedIds.length} Orders Selected</strong></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--secondary btn--xs" onClick={() => alert(`Bulk updated priority for ${selectedIds.length} orders.`)}>
                Set High Priority
              </button>
              <button className="btn btn--primary btn--xs" onClick={() => alert(`Promoted ${selectedIds.length} orders to Planning.`)}>
                Promote to Planning
              </button>
            </div>
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className="table" aria-label="Orders List">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input
                    type="checkbox"
                    checked={orders.length > 0 && selectedIds.length === orders.length}
                    onChange={toggleSelectAll}
                    aria-label="Select All Orders"
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Route (Origin → Dest)</th>
                <th>Cargo Details</th>
                <th>Priority</th>
                <th>Service Level</th>
                <th>Status</th>
                <th>Expected Delivery</th>
                <th>Inspect</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: 32, color: 'var(--color-secondary-gray)' }}>
                    No transportation orders match the search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => navigate(`/orders/${o.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(o.id)}
                        onChange={(e) => toggleSelectRow(o.id, e)}
                        aria-label={`Select order ${o.id}`}
                      />
                    </td>
                    <td>
                      <strong style={{ color: 'var(--color-primary-blue)' }}>{o.id}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{o.customer}</div>
                    </td>
                    <td>
                      <div>{o.origin.city} → {o.destination.city}</div>
                    </td>
                    <td>
                      <div>{o.items.length} items ({o.totalWeight})</div>
                    </td>
                    <td>
                      <span className={`priority-pill priority-pill--${o.priority}`}>
                        {o.priority}
                      </span>
                    </td>
                    <td style={{ fontSize: 13 }}>{o.serviceLevel}</td>
                    <td>
                      <span className={`badge badge--${o.status === 'Dispatched' || o.status === 'Delivered' ? 'success' : o.status === 'Pending Validation' ? 'danger' : 'warning'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>{o.expectedDelivery}</td>
                    <td>
                      <button className="btn btn--secondary btn--xs">
                        View <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Create Order Modal ── */}
      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateOrder={handleCreateOrder}
      />
    </Layout>
  );
}
