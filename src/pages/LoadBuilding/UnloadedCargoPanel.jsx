import React, { useState } from 'react';

const UnloadedCargoPanel = ({ cargoItems, selectedCargo, onSelectCargo, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Hazmat', 'Fragile', 'Refrigerated', 'High Density'];

  const filteredCargo = cargoItems.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Hazmat') return matchesSearch && item.isHazmat;
    if (activeFilter === 'Fragile') return matchesSearch && item.isFragile;
    if (activeFilter === 'Refrigerated') return matchesSearch && item.isRefrigerated;
    if (activeFilter === 'High Density') return matchesSearch && (item.weight / item.volume > 300);

    return matchesSearch;
  });

  return (
    <div className="lb-panel unloaded-cargo-panel">
      <div className="lb-panel-header">
        <h3>
          <span>📦</span> Pending Cargo Queue
        </h3>
        <span className="lb-badge">{cargoItems.filter(c => !c.loaded).length} Items</span>
      </div>

      <div className="cargo-search-bar">
        <input 
          type="text" 
          placeholder="Filter by Order, Dest, or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="cargo-filter-chips">
        {categories.map(cat => (
          <button
            key={cat}
            className={`chip ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="cargo-stream-list">
        {filteredCargo.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px', fontSize: '0.85rem' }}>
            No matching cargo items found.
          </div>
        ) : (
          filteredCargo.map(item => (
            <div
              key={item.id}
              className={`cargo-card ${selectedCargo?.id === item.id ? 'selected' : ''} ${item.loaded ? 'loaded' : ''}`}
              onClick={() => !item.loaded && onSelectCargo(item)}
            >
              <div className="cargo-card-top">
                <span className="cargo-id">{item.id}</span>
                <span className="cargo-dest">{item.destination}</span>
              </div>
              <div className="cargo-desc">{item.description}</div>
              <div className="cargo-meta-grid">
                <div className="cargo-meta-item">
                  <span>Wt:</span> <strong>{item.weight} kg</strong>
                </div>
                <div className="cargo-meta-item">
                  <span>Vol:</span> <strong>{item.volume} m³</strong>
                </div>
                <div className="cargo-meta-item">
                  <span>Pallets:</span> <strong>{item.palletCount}</strong>
                </div>
              </div>
              <div>
                <span className="stack-tag">Stackable: {item.stackable ? 'Yes' : 'No'}</span>
                {item.isHazmat && <span className="stack-tag" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', marginLeft: '4px' }}>Hazmat</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UnloadedCargoPanel;
