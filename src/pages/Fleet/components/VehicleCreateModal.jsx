import { useState } from 'react';

export default function VehicleCreateModal({ onClose, onAddVehicle }) {
  const [formData, setFormData] = useState({
    registration: '',
    make: 'Tata Motors',
    model: 'LPT 1613 Turbo',
    type: '20ft Box Truck',
    category: 'Truck',
    year: 2023,
    color: 'Industrial White',
    vin: '',
    ownership: 'Company Owned',
    payloadCapacityKg: 7500,
    volumeCapacityCbm: 24,
    fuelType: 'Diesel (Euro VI)',
    assignedDriverName: 'Unassigned',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.registration || !formData.model) {
      alert('Please fill in Registration and Model.');
      return;
    }

    const newVehicle = {
      id: `VEH-${Math.floor(100 + Math.random() * 900)}`,
      registration: formData.registration.toUpperCase(),
      type: formData.type,
      category: formData.category,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year, 10),
      color: formData.color,
      vin: formData.vin || `MAT${Math.floor(100000 + Math.random() * 900000)}N24`,
      status: 'Available',
      ownership: formData.ownership,
      leaseDetails: null,
      assignedDriver: formData.assignedDriverName !== 'Unassigned' ? {
        id: 'DR-AUTO',
        name: formData.assignedDriverName,
        phone: '+91 98000 00000',
        assignedSince: 'Today',
      } : null,
      specs: {
        payloadCapacityKg: parseInt(formData.payloadCapacityKg, 10),
        volumeCapacityCbm: parseFloat(formData.volumeCapacityCbm),
        dimensions: '6.0m × 2.4m × 2.4m',
        axles: 2,
        grossVehicleWeightKg: parseInt(formData.payloadCapacityKg, 10) + 4000,
        wheelbaseMm: 4200,
        fuelType: formData.fuelType,
        fuelTankCapacityLiters: 160,
      },
      telematics: {
        gpsConnected: true,
        deviceId: `GPS-TRK-${Math.floor(10000 + Math.random() * 90000)}`,
        lastSignal: 'Just now',
        currentLocation: 'Central Depot Bay 1',
        coordinates: { lat: 19.076, lng: 72.8777 },
        currentSpeedKmH: 0,
        heading: 'North',
        engineStatus: 'Standby / Ready',
        fuelLevelPct: 100,
        odometerKm: 120,
        batteryHealthPct: 100,
        currentTrip: null,
      },
      certifications: [
        { name: 'Statutory Goods Carriage Permit', validUntil: '2026-12-31', status: 'Valid' },
      ],
      service: {
        lastServiceDate: 'Pre-Delivery Inspection (PDI)',
        lastServiceOdometerKm: 0,
        nextServiceDate: '2025-03-31',
        nextServiceDueKm: 15000,
        daysRemaining: 180,
        status: 'Brand New (Optimal)',
        maintenanceAlerts: [],
      },
      maintenanceHistory: [],
      documents: [
        { id: 'DOC-NEW', name: 'Temporary Registration Certificate', validUntil: '2025-09-30', status: 'Valid', uploadDate: '2024-09-28' },
      ],
      fuelLogs: {
        last30DaysLiters: 60,
        avgFuelEfficiencyKmL: 7.2,
        costLast30Days: '₹5,700',
        costPerKm: '₹13.5 / km',
        recentFillups: [],
      },
      incidents: [],
      costs: {
        monthlyFuel: 5700,
        monthlyMaintenance: 0,
        monthlyInsurance: 3000,
        monthlyDriverAlloc: 0,
        monthlyDepreciation: 8000,
        totalMonthlyTCO: 16700,
        costPerKm: '₹22.0 / km',
      },
      auditTrail: [
        { date: '2024-09-28', action: 'Vehicle Onboarded', user: 'Fleet Manager (Portal)', details: 'Initial Entry Created' },
      ],
    };

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fleet-modal-backdrop" onClick={onClose}>
      <div className="fleet-modal-dialog" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="fleet-modal-header">
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>➕ Onboard New Fleet Vehicle</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Vehicle Registration Plate *
              </label>
              <input
                required
                className="fleet-search-input"
                style={{ padding: '8px 12px', fontFamily: 'monospace' }}
                placeholder="e.g. MH-04-AZ-8899"
                value={formData.registration}
                onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Vehicle Category / Body Type
              </label>
              <select
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.type}
                onChange={(e) => {
                  const val = e.target.value;
                  let cat = 'Truck';
                  if (val.includes('Trailer')) cat = 'Trailer';
                  else if (val.includes('Van')) cat = 'Van';
                  else if (val.includes('Reefer')) cat = 'Reefer';
                  setFormData({ ...formData, type: val, category: cat });
                }}
              >
                <option value="20ft Box Truck">20ft Box Truck</option>
                <option value="24ft Container Truck">24ft Container Truck</option>
                <option value="32ft Multi-Axle Trailer">32ft Multi-Axle Trailer</option>
                <option value="Refrigerated Reefer Semi-Trailer">Refrigerated Reefer Semi-Trailer</option>
                <option value="Urban Electric Delivery Van">Urban Electric Delivery Van</option>
                <option value="40ft Port Container Drayage Tractor">40ft Port Container Drayage Tractor</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Manufacturer / Make
              </label>
              <select
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              >
                <option value="Tata Motors">Tata Motors</option>
                <option value="Ashok Leyland">Ashok Leyland</option>
                <option value="BharatBenz">BharatBenz</option>
                <option value="Eicher Motors">Eicher Motors</option>
                <option value="Force Motors">Force Motors</option>
                <option value="Mahindra Truck & Bus">Mahindra Truck & Bus</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Model & Spec
              </label>
              <input
                required
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                placeholder="e.g. Signa 2823.K / LPT 1613"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Year
              </label>
              <input
                type="number"
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Payload Cap (kg)
              </label>
              <input
                type="number"
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.payloadCapacityKg}
                onChange={(e) => setFormData({ ...formData, payloadCapacityKg: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Volume (CBM)
              </label>
              <input
                type="number"
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.volumeCapacityCbm}
                onChange={(e) => setFormData({ ...formData, volumeCapacityCbm: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Ownership Type
              </label>
              <select
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.ownership}
                onChange={(e) => setFormData({ ...formData, ownership: e.target.value })}
              >
                <option value="Company Owned">Company Owned Asset</option>
                <option value="Leased">Leased Commercial Asset</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                Fuel / Powertrain
              </label>
              <select
                className="fleet-search-input"
                style={{ padding: '8px 12px' }}
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
              >
                <option value="Diesel (Euro VI / BS-VI)">Diesel (Euro VI / BS-VI)</option>
                <option value="CNG Compressed Natural Gas">CNG Compressed Natural Gas</option>
                <option value="100% Battery Electric (EV)">100% Battery Electric (EV)</option>
                <option value="Diesel + Reefer Genset">Diesel + Reefer Genset</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              ✓ Onboard Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
