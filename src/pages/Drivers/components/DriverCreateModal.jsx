import { useState } from 'react';

export default function DriverCreateModal({ onClose, onAddDriver }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    dob: '',
    gender: 'Male',
    licenseNumber: '',
    licenseType: 'HCV (Heavy Commercial Vehicle)',
    licenseExpiryDate: '2029-12-31',
    assignedVehicle: 'Truck-001 (MH-04-AB-1234)',
    hasHazmat: false,
    hasReefer: false,
    hasODC: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.licenseNumber || !formData.phone) {
      alert('Please fill in Name, Phone, and License Number.');
      return;
    }

    const newDriver = {
      id: `DR-${Math.floor(88200 + Math.random() * 800)}`,
      name: formData.name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@logisticshub.com`,
      address: formData.address || 'Central Terminal, Mumbai',
      dob: formData.dob || '1990-01-01',
      gender: formData.gender,
      licenseNumber: formData.licenseNumber,
      licenseType: formData.licenseType,
      licenseExpiryDate: formData.licenseExpiryDate,
      licenseStatus: 'Valid',
      status: 'Available',
      assignedVehicle: formData.assignedVehicle,
      assignedSince: 'Just Now',
      certifications: [
        ...(formData.hasHazmat ? [{ name: 'Hazmat (Class 3 & 8)', validUntil: '2026-12-31', status: 'Valid' }] : []),
        ...(formData.hasReefer ? [{ name: 'Cold-Chain Temperature Control', validUntil: '2026-12-31', status: 'Valid' }] : []),
        ...(formData.hasODC ? [{ name: 'Oversize / Heavy Haul Permit (ODC)', validUntil: '2026-12-31', status: 'Valid' }] : []),
      ],
      lastLocation: { city: 'Mumbai Central Depot', time: 'Just now', lat: 19.076, lng: 72.8777 },
      hoursWorkedToday: 0.0,
      weeklyHours: 0.0,
      maxDailyHOS: 10.0,
      documents: [
        { id: 'DOC-NEW1', name: 'Commercial Driving License (HCV)', type: 'License', status: 'Valid', uploadDate: '2024-09-28', expiryDate: formData.licenseExpiryDate, size: '2.1 MB' },
      ],
      assignments: {
        currentTrip: null,
        pastTripsCount: 0,
        pastTrips: [],
      },
      performance: {
        tripsThisMonth: 0,
        onTimeRate: 100.0,
        companyAvgOnTime: 94.2,
        incidentCount: 0,
        customerRating: 5.0,
        costPerKm: '₹28.0 / km',
        onTimeTrend: [],
      },
      safety: {
        safetyScore: 100,
        status: 'Outstanding',
        incidents: [],
        trainingStatus: [],
      },
      availability: { schedule: [] },
      earnings: {
        monthlyBase: 42000,
        tripIncentives: 0,
        onTimeBonus: 0,
        safetyBonus: 0,
        totalEarned: 42000,
        payslips: [],
      },
    };

    onAddDriver(newDriver);
    onClose();
  };

  return (
    <div className="driver-modal-backdrop" onClick={onClose}>
      <div className="driver-modal-dialog" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="driver-modal-header">
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>➕ Onboard New Commercial Driver</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Full Legal Name *
              </label>
              <input
                required
                className="drivers-search-input"
                style={{ padding: '8px 12px' }}
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Contact Phone (+91) *
              </label>
              <input
                required
                className="drivers-search-input"
                style={{ padding: '8px 12px' }}
                placeholder="+91 98XXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Commercial License Number (CDL) *
              </label>
              <input
                required
                className="drivers-search-input"
                style={{ padding: '8px 12px' }}
                placeholder="e.g. MH-04-201800921"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                License Class / Vehicle Type
              </label>
              <select
                className="drivers-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.licenseType}
                onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
              >
                <option value="HCV (Heavy Commercial Vehicle)">HCV (Heavy Commercial Vehicle)</option>
                <option value="LCV (Light Commercial Vehicle)">LCV (Light Commercial Vehicle)</option>
                <option value="Multi-Axle Articulated Semi-Trailer">Multi-Axle Articulated Semi-Trailer</option>
                <option value="Electric Commercial Van">Electric Commercial Van</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                License Expiry Date
              </label>
              <input
                type="date"
                className="drivers-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.licenseExpiryDate}
                onChange={(e) => setFormData({ ...formData, licenseExpiryDate: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Initial Vehicle Assignment
              </label>
              <select
                className="drivers-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.assignedVehicle}
                onChange={(e) => setFormData({ ...formData, assignedVehicle: e.target.value })}
              >
                <option value="Truck-001 (MH-04-AB-1234)">Truck-001 (MH-04-AB-1234)</option>
                <option value="Truck-004 (HR-26-EQ-9921)">Truck-004 (HR-26-EQ-9921)</option>
                <option value="EV-Van-02 (KA-01-EV-4412)">EV-Van-02 (KA-01-EV-4412)</option>
                <option value="Reefer-003 (MH-12-RN-8801)">Reefer-003 (MH-12-RN-8801)</option>
                <option value="Unassigned">Standby / Unassigned</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px' }}>
              Endorsements & Certifications
            </label>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.hasHazmat}
                  onChange={(e) => setFormData({ ...formData, hasHazmat: e.target.checked })}
                />
                Hazmat (Class 3/8)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.hasReefer}
                  onChange={(e) => setFormData({ ...formData, hasReefer: e.target.checked })}
                />
                Cold-Chain Reefer
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.hasODC}
                  onChange={(e) => setFormData({ ...formData, hasODC: e.target.checked })}
                />
                Oversize / ODC
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              ✓ Onboard Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
