import { Search, GripVertical, Package } from 'lucide-react';

export default function DemandQueuePanel({
  demandList,
  selectedDemand,
  onSelectDemand,
  searchQuery,
  onSearchChange,
}) {
  const filteredDemand = demandList.filter(d =>
    d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tp-panel">
      <div className="tp-panel__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Package size={16} color="var(--color-primary-blue)" />
          <span>Pending Demand Queue</span>
        </div>
        <span className="badge badge--info" style={{ fontSize: 11 }}>
          {filteredDemand.length} Ready
        </span>
      </div>

      <div className="tp-panel__body">
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="input-text"
            placeholder="Search order ID, city or customer..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: 32, fontSize: 13 }}
          />
          <Search size={14} color="#9EA5B1" style={{ position: 'absolute', left: 10, top: 12 }} />
        </div>

        {/* Demand Items Stream */}
        {filteredDemand.map((item) => {
          const isSelected = selectedDemand?.id === item.id;
          return (
            <div
              key={item.id}
              className={`tp-demand-item${isSelected ? ' tp-demand-item--selected' : ''}`}
              onClick={() => onSelectDemand(item)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <GripVertical size={14} color="#9EA5B1" style={{ cursor: 'grab' }} />
                  <strong style={{ fontSize: 13, color: 'var(--color-primary-blue)' }}>{item.orderId}</strong>
                </div>
                <span className="badge badge--warning" style={{ fontSize: 10 }}>{item.serviceLevel}</span>
              </div>

              <div style={{ fontSize: 12, fontWeight: 600 }}>{item.customer}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-secondary-gray)' }}>
                <span>📍 {item.origin} → {item.destination}</span>
                <strong>{item.weightKg} kg</strong>
              </div>

              {item.tempRequired && (
                <div style={{ fontSize: 10, color: 'var(--color-error)', fontWeight: 600, background: '#FFF5F5', padding: '2px 6px', borderRadius: 4, width: 'max-content' }}>
                  ❄️ {item.tempRequired}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
