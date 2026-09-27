import { useState } from 'react';
import { X, Plus, Trash2, Shield, Package, MapPin } from 'lucide-react';

export default function CreateOrderModal({ isOpen, onClose, onCreateOrder }) {
  const [customer, setCustomer] = useState('ABC Logistics Pvt Ltd');
  const [priority, setPriority] = useState('urgent');
  const [serviceLevel, setServiceLevel] = useState('Express');
  const [originCity, setOriginCity] = useState('Mumbai');
  const [originAddress, setOriginAddress] = useState('Plot 42, MIDC Industrial Area, Andheri East, Mumbai');
  const [destCity, setDestCity] = useState('Delhi');
  const [destAddress, setDestAddress] = useState('Sector 18, Transport Nagar, GT Road, Delhi');
  const [items, setItems] = useState([
    { sku: 'SKU-PHARM-01', description: 'Cold Chain Vaccine Boxes', qty: 10, unit: 'Boxes', weightKg: 500, volumeCbm: 2.4, hazmat: false, tempRequired: true, minTemp: '+2°C', maxTemp: '+8°C' }
  ]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([
      ...items,
      { sku: `SKU-GEN-${items.length + 1}`, description: 'General Cargo', qty: 1, unit: 'Cartons', weightKg: 50, volumeCbm: 0.5, hazmat: false, tempRequired: false }
    ]);
  };

  const handleRemoveItem = (idx) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalWeightKg = items.reduce((sum, item) => sum + (item.weightKg || 0), 0);
    const totalVolumeCbm = items.reduce((sum, item) => sum + (item.volumeCbm || 0), 0);

    const newOrder = {
      id: `ORD-2024-0${Math.floor(100 + Math.random() * 900)}`,
      customer,
      customerCode: 'CUST-NEW',
      origin: {
        locationName: `${originCity} Facility`,
        city: originCity,
        address: originAddress,
        pickupTime: 'Tomorrow 09:00',
        contactPerson: 'Operations Supervisor',
        phone: '+91 98200 99887',
      },
      destination: {
        locationName: `${destCity} Hub`,
        city: destCity,
        address: destAddress,
        deliveryTime: '2 Days 18:00',
        contactPerson: 'Receiving Manager',
        phone: '+91 98100 88776',
      },
      items,
      totalWeight: `${totalWeightKg} kg`,
      totalVolume: `${totalVolumeCbm.toFixed(1)} Cbm`,
      priority,
      serviceLevel,
      status: 'Pending Validation',
      createdDate: 'Just Now',
      expectedDelivery: 'In 2 Days',
      relatedShipmentId: null,
      orderValue: '₹3,50,000',
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="om-modal-overlay" onClick={onClose}>
      <div className="om-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="om-modal-card__header">
          <div style={{ fontSize: 16, fontWeight: 700 }}>Create Transportation Order</div>
          <button className="btn btn--ghost btn--xs" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="om-modal-card__body">
            {/* Section 1: Customer & Service Level */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary-blue)', marginBottom: 8, textTransform: 'uppercase' }}>
                1. Order Header Information
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label className="label">Customer Name *</label>
                  <select
                    className="input-select"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  >
                    <option value="ABC Logistics Pvt Ltd">ABC Logistics Pvt Ltd</option>
                    <option value="Tata Steel Infrastructure">Tata Steel Infrastructure</option>
                    <option value="Reliance Retail Ventures">Reliance Retail Ventures</option>
                    <option value="Cipla Pharma Ltd">Cipla Pharma Ltd</option>
                  </select>
                </div>

                <div>
                  <label className="label">Order Priority</label>
                  <select
                    className="input-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority</option>
                  </select>
                </div>

                <div>
                  <label className="label">Service Level SLA</label>
                  <select
                    className="input-select"
                    value={serviceLevel}
                    onChange={(e) => setServiceLevel(e.target.value)}
                  >
                    <option value="Standard">Standard (3-4 Days)</option>
                    <option value="Express">Express (48 Hours)</option>
                    <option value="Same-Day">Same-Day Transit</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Origin & Destination */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary-blue)', marginBottom: 8, textTransform: 'uppercase' }}>
                2. Route Pickup & Delivery Addresses
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#F8F9FA', padding: 12, borderRadius: 6, border: '1px solid var(--color-medium-gray)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>📍 Pickup Origin ({originCity})</div>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Origin Address"
                    value={originAddress}
                    onChange={(e) => setOriginAddress(e.target.value)}
                    style={{ fontSize: 12 }}
                  />
                </div>

                <div style={{ background: '#F8F9FA', padding: 12, borderRadius: 6, border: '1px solid var(--color-medium-gray)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>🏁 Destination Delivery ({destCity})</div>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Destination Address"
                    value={destAddress}
                    onChange={(e) => setDestAddress(e.target.value)}
                    style={{ fontSize: 12 }}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Cargo Items Breakdown */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary-blue)', textTransform: 'uppercase', margin: 0 }}>
                  3. Cargo Item SKU Breakdown ({items.length} Items)
                </h4>
                <button type="button" className="btn btn--secondary btn--xs" onClick={handleAddItem}>
                  + Add Item Row
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 100px 40px', gap: 8, alignItems: 'center', background: '#F8F9FA', padding: 8, borderRadius: 6 }}>
                    <input
                      type="text"
                      className="input-text"
                      placeholder="SKU"
                      value={item.sku}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].sku = e.target.value;
                        setItems(updated);
                      }}
                      style={{ fontSize: 12 }}
                    />
                    <input
                      type="text"
                      className="input-text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].description = e.target.value;
                        setItems(updated);
                      }}
                      style={{ fontSize: 12 }}
                    />
                    <input
                      type="number"
                      className="input-text"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].qty = parseInt(e.target.value) || 0;
                        setItems(updated);
                      }}
                      style={{ fontSize: 12 }}
                    />
                    <input
                      type="number"
                      className="input-text"
                      placeholder="Weight (kg)"
                      value={item.weightKg}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].weightKg = parseInt(e.target.value) || 0;
                        setItems(updated);
                      }}
                      style={{ fontSize: 12 }}
                    />
                    <button type="button" className="btn btn--ghost btn--xs" onClick={() => handleRemoveItem(idx)} style={{ color: 'var(--color-error)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="om-modal-card__footer">
            <button type="button" className="btn btn--secondary btn--sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary btn--sm">
              <Plus size={14} /> Validate & Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
