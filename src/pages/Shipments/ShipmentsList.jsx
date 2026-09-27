import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { shipmentsStats, shipmentsList as initialShipments } from '../../utils/mockData/shipmentsData';
import { Truck, Navigation, CheckCircle, AlertTriangle, Layers, Search, List, Map, Clock, ChevronRight } from 'lucide-react';
import './Shipments.css';

export default function ShipmentsList() {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState(initialShipments);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'map', 'timeline'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter shipments based on search and status
  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.carrier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === shipments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(shipments.map(s => s.id));
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

  return (
    <Layout
      title="Shipments Management"
      breadcrumbs={[{ label: 'Shipments', path: '/shipments' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <button className="btn btn--secondary btn--sm" onClick={() => navigate('/shipments/consolidation')}>
            <Layers size={14} /> Cargo Consolidation ({shipmentsStats.consolidationCandidatesCount})
          </button>
        </div>
      }
    >
      {/* ── Metric Header Strip ── */}
      <div className="sm-metrics-strip" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="sm-metric-card">
          <div className="sm-metric-card__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <Truck size={20} />
          </div>
          <div>
            <div className="sm-metric-card__val">{shipmentsStats.totalShipments}</div>
            <div className="sm-metric-card__lbl">Total Freight Shipments</div>
          </div>
        </div>

        <div className="sm-metric-card">
          <div className="sm-metric-card__icon" style={{ background: '#17A2B820', color: '#17A2B8' }}>
            <Navigation size={20} />
          </div>
          <div>
            <div className="sm-metric-card__val" style={{ color: '#17A2B8' }}>{shipmentsStats.inTransitCount}</div>
            <div className="sm-metric-card__lbl">Active In-Transit</div>
          </div>
        </div>

        <div className="sm-metric-card">
          <div className="sm-metric-card__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="sm-metric-card__val" style={{ color: '#FF9800' }}>{shipmentsStats.atRiskCount}</div>
            <div className="sm-metric-card__lbl">At-Risk Buffer</div>
          </div>
        </div>

        <div className="sm-metric-card">
          <div className="sm-metric-card__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="sm-metric-card__val" style={{ color: '#27AE60' }}>{shipmentsStats.deliveredCount}</div>
            <div className="sm-metric-card__lbl">Delivered</div>
          </div>
        </div>

        <div className="sm-metric-card">
          <div className="sm-metric-card__icon" style={{ background: '#6C348320', color: '#6C3483' }}>
            <Layers size={20} />
          </div>
          <div>
            <div className="sm-metric-card__val" style={{ color: '#6C3483' }}>{shipmentsStats.consolidationCandidatesCount}</div>
            <div className="sm-metric-card__lbl">LTL Candidates</div>
          </div>
        </div>
      </div>

      {/* ── Filter Bar & View Mode Switcher ── */}
      <div className="sm-filter-bar" style={{ marginBottom: 'var(--space-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: 280 }}>
            <input
              type="text"
              className="input-text"
              placeholder="Search shipment ID, order or carrier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 32, fontSize: 13 }}
            />
            <Search size={14} color="#9EA5B1" style={{ position: 'absolute', left: 10, top: 12 }} />
          </div>

          <select
            className="input-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ fontSize: 13, width: 170 }}
          >
            <option value="ALL">All Freight Statuses</option>
            <option value="Planned">Planned</option>
            <option value="In Transit">In Transit</option>
            <option value="At Risk">At Risk</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* View Mode Toggle Switcher */}
        <div className="sm-view-toggle">
          <button
            className={`sm-view-btn${viewMode === 'list' ? ' sm-view-btn--active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={14} /> Data Grid
          </button>
          <button
            className={`sm-view-btn${viewMode === 'map' ? ' sm-view-btn--active' : ''}`}
            onClick={() => navigate('/control-tower')}
          >
            <Map size={14} /> Live GIS Map
          </button>
        </div>
      </div>

      {/* ── Data Grid Table Workspace ── */}
      <div className="sm-table-container">
        {selectedIds.length > 0 && (
          <div style={{
            background: '#0066CC15', borderBottom: '1px solid #0066CC30', padding: '10px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13,
          }}>
            <div><strong>{selectedIds.length} Shipments Selected</strong></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--secondary btn--xs" onClick={() => alert(`Reassigned carrier for ${selectedIds.length} shipments.`)}>
                Reassign Carrier
              </button>
              <button className="btn btn--primary btn--xs" onClick={() => navigate('/shipments/consolidation')}>
                Consolidate Selected
              </button>
            </div>
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className="table" aria-label="Shipments List">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input
                    type="checkbox"
                    checked={shipments.length > 0 && selectedIds.length === shipments.length}
                    onChange={toggleSelectAll}
                    aria-label="Select All Shipments"
                  />
                </th>
                <th>Shipment ID</th>
                <th>Linked Order</th>
                <th>Customer</th>
                <th>Route (Origin → Dest)</th>
                <th>Carrier / Vehicle</th>
                <th>Live GPS Location</th>
                <th>ETA</th>
                <th>Status</th>
                <th>Inspect</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: 32, color: 'var(--color-secondary-gray)' }}>
                    No freight shipments match the search criteria.
                  </td>
                </tr>
              ) : (
                filteredShipments.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => navigate(`/shipments/${s.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(s.id)}
                        onChange={(e) => toggleSelectRow(s.id, e)}
                        aria-label={`Select shipment ${s.id}`}
                      />
                    </td>
                    <td>
                      <strong style={{ color: 'var(--color-primary-blue)' }}>{s.id}</strong>
                    </td>
                    <td>
                      <span className="badge badge--info" style={{ fontFamily: 'monospace', fontSize: 11 }}>
                        {s.orderId}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{s.customer}</div>
                    </td>
                    <td>
                      <div>{s.origin.city} → {s.destination.city}</div>
                    </td>
                    <td>
                      <div>{s.carrier}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>{s.driverName} ({s.vehicleNumber})</div>
                    </td>
                    <td style={{ fontSize: 12 }}>
                      📍 {s.gpsLocation}
                    </td>
                    <td style={{ fontSize: 12, fontWeight: 500 }}>{s.eta}</td>
                    <td>
                      <span className={`badge badge--${s.status === 'In Transit' ? 'info' : s.status === 'At Risk' ? 'warning' : 'success'}`}>
                        {s.status}
                      </span>
                    </td>
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
    </Layout>
  );
}
