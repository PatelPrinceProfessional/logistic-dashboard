import { useState } from 'react';

export default function AppointmentCreateModal({ onClose, onAddAppointment }) {
  const [formData, setFormData] = useState({
    customer: '',
    contactPhone: '',
    shipmentId: '',
    type: 'Pickup',
    dockAssigned: 'Dock 1 (Pallet & Reefer Bay)',
    timeSlot: '09:00 - 09:45',
    vehicleReg: '',
    driverName: '',
    weightKg: 5000,
    volumeCbm: 20,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.shipmentId || !formData.vehicleReg) {
      alert('Please fill in Customer, Shipment ID, and Vehicle Registration.');
      return;
    }

    const newApt = {
      id: `APT-2024-${Math.floor(10000 + Math.random() * 90000)}`,
      timeSlot: formData.timeSlot,
      date: 'Today',
      shipmentId: formData.shipmentId.toUpperCase(),
      customer: formData.customer,
      contactPhone: formData.contactPhone || '+91 98200 00000',
      type: formData.type,
      dockAssigned: formData.dockAssigned,
      vehicleReg: formData.vehicleReg.toUpperCase(),
      driverName: formData.driverName || 'Designated Carrier Driver',
      cargoItems: 'General Palletized Freight',
      weightKg: parseInt(formData.weightKg, 10),
      volumeCbm: parseFloat(formData.volumeCbm),
      status: 'Confirmed',
      arrivedAt: null,
      completedAt: null,
      dwellMinutes: 0,
    };

    onAddAppointment(newApt);
    onClose();
  };

  return (
    <div className="fleet-modal-backdrop" onClick={onClose}>
      <div className="fleet-modal-dialog" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
        <div className="fleet-modal-header">
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>➕ Book New Warehouse Dock Appointment</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Customer / Consignee *
              </label>
              <input
                required
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                placeholder="e.g. Abbott Healthcare Ltd"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Shipment / Order ID *
              </label>
              <input
                required
                className="fleet-search-input"
                style={{ padding: '8px 12px', fontFamily: 'monospace' }}
                placeholder="e.g. SHP-99214"
                value={formData.shipmentId}
                onChange={(e) => setFormData({ ...formData, shipmentId: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Appointment Type
              </label>
              <select
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Pickup">Pickup (Outbound Load)</option>
                <option value="Delivery">Delivery (Inbound Unload)</option>
                <option value="Cross-dock">Cross-Dock (Direct Transfer)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Assigned Dock Bay
              </label>
              <select
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.dockAssigned}
                onChange={(e) => setFormData({ ...formData, dockAssigned: e.target.value })}
              >
                <option value="Dock 1 (Pallet & Reefer Bay)">Dock 1 (Pallet & Reefer Bay)</option>
                <option value="Dock 2 (Heavy Freight Inbound)">Dock 2 (Heavy Freight Inbound)</option>
                <option value="Dock 3 (Rapid Sort Cross-Dock)">Dock 3 (Rapid Sort Cross-Dock)</option>
                <option value="Dock 4 (Container Drayage)">Dock 4 (Container Drayage)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Vehicle Registration Plate *
              </label>
              <input
                required
                className="fleet-search-input"
                style={{ padding: '8px 12px', fontFamily: 'monospace' }}
                placeholder="e.g. MH-04-AB-1234"
                value={formData.vehicleReg}
                onChange={(e) => setFormData({ ...formData, vehicleReg: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Time Slot Window
              </label>
              <select
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
              >
                <option value="08:00 - 08:45">08:00 - 08:45 IST</option>
                <option value="09:00 - 09:45">09:00 - 09:45 IST</option>
                <option value="10:00 - 11:00">10:00 - 11:00 IST</option>
                <option value="11:30 - 12:15">11:30 - 12:15 IST</option>
                <option value="14:00 - 15:00">14:00 - 15:00 IST</option>
                <option value="16:00 - 17:00">16:00 - 17:00 IST</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Payload Weight (kg)
              </label>
              <input
                type="number"
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.weightKg}
                onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Driver Contact Phone
              </label>
              <input
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                placeholder="+91 98XXX XXXXX"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              ✓ Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
