import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { carrierDirectory } from '../../utils/mockData/procurementData';
import './Procurement.css';

const pendingShipmentsList = [
  { id: 'SHP-100270', origin: 'Mumbai Central', destination: 'Delhi NCR Hub', weightKg: 1850, volumeCbm: 8.2, service: 'Express', pickup: 'Tomorrow 08:00', delivery: 'Sep 29 18:00' },
  { id: 'SHP-100271', origin: 'Pune MIDC', destination: 'Bangalore Hub', weightKg: 2400, volumeCbm: 11.0, service: 'Standard', pickup: 'Tomorrow 09:30', delivery: 'Sep 30 14:00' },
  { id: 'SHP-100272', origin: 'Chennai Auto Hub', destination: 'Hyderabad Sector', weightKg: 950, volumeCbm: 4.5, service: 'Express', pickup: 'Tomorrow 07:00', delivery: 'Sep 29 12:00' },
  { id: 'SHP-100273', origin: 'Surat Textile Gate', destination: 'Kolkata Port', weightKg: 3100, volumeCbm: 14.2, service: 'Standard', pickup: 'Tomorrow 11:00', delivery: 'Oct 01 10:00' },
  { id: 'SHP-100274', origin: 'Ahmedabad Industrial', destination: 'Jaipur Logistics', weightKg: 1200, volumeCbm: 5.6, service: 'Express', pickup: 'Tomorrow 10:00', delivery: 'Sep 29 20:00' },
];

const CreateRFQ = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State: Selected Shipments
  const [selectedShipmentIds, setSelectedShipmentIds] = useState(['SHP-100270', 'SHP-100272']);

  // Step 2 State: Tender Configuration
  const [tenderType, setTenderType] = useState('spot');
  const [serviceLevel, setServiceLevel] = useState('Express');
  const [priceBasis, setPriceBasis] = useState('per_trip');
  const [targetBudget, setTargetBudget] = useState(420);
  const [responseDeadline, setResponseDeadline] = useState('2026-09-28 18:00');
  const [autoAwardBelowBudget, setAutoAwardBelowBudget] = useState(true);
  const [requireGpsTelematics, setRequireGpsTelematics] = useState(true);

  // Step 3 State: Selected Carriers
  const [selectedCarriers, setSelectedCarriers] = useState(['CAR-01', 'CAR-02', 'CAR-05']);

  const toggleShipment = (id) => {
    if (selectedShipmentIds.includes(id)) {
      setSelectedShipmentIds(selectedShipmentIds.filter(sId => sId !== id));
    } else {
      setSelectedShipmentIds([...selectedShipmentIds, id]);
    }
  };

  const toggleCarrier = (id) => {
    if (selectedCarriers.includes(id)) {
      setSelectedCarriers(selectedCarriers.filter(cId => cId !== id));
    } else {
      setSelectedCarriers([...selectedCarriers, id]);
    }
  };

  const totalSelectedWeight = pendingShipmentsList
    .filter(s => selectedShipmentIds.includes(s.id))
    .reduce((sum, s) => sum + s.weightKg, 0);

  const totalSelectedVolume = pendingShipmentsList
    .filter(s => selectedShipmentIds.includes(s.id))
    .reduce((sum, s) => sum + s.volumeCbm, 0);

  const handleBroadcastTender = () => {
    alert(`Tender RFQ-2026-099 successfully broadcast to ${selectedCarriers.length} carriers! Responses deadline set to ${responseDeadline}.`);
    navigate('/procurement');
  };

  return (
    <Layout activePage="procurement">
      <div className="procurement-container">
        {/* Header */}
        <div className="procurement-header">
          <div className="proc-title-group">
            <h1>
              <span>📝</span> Create Freight RFQ / Spot Tender Wizard
            </h1>
            <p>4-step freight rate discovery, shipment bundle configuration, and multi-carrier broadcasting</p>
          </div>

          <div className="proc-header-controls">
            <button
              className="tender-action-btn"
              style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 14px' }}
              onClick={() => navigate('/procurement')}
            >
              ← Back to Tender Board
            </button>
          </div>
        </div>

        {/* Wizard Step Progress Bar */}
        <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
            <div style={{ padding: '8px', borderRadius: '6px', background: currentStep >= 1 ? '#eff6ff' : '#f8fafc', color: currentStep >= 1 ? '#2563eb' : '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>
              1. Shipment Selection
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', background: currentStep >= 2 ? '#eff6ff' : '#f8fafc', color: currentStep >= 2 ? '#2563eb' : '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>
              2. Tender Rules & Pricing
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', background: currentStep >= 3 ? '#eff6ff' : '#f8fafc', color: currentStep >= 3 ? '#2563eb' : '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>
              3. Carrier Selection
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', background: currentStep >= 4 ? '#eff6ff' : '#f8fafc', color: currentStep >= 4 ? '#2563eb' : '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>
              4. Review & Broadcast
            </div>
          </div>
        </div>

        {/* Step 1: Shipment Selection */}
        {currentStep === 1 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>Select Shipments to Include in RFQ</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  onClick={() => setSelectedShipmentIds(pendingShipmentsList.map(s => s.id))}
                >
                  Select All
                </button>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  onClick={() => setSelectedShipmentIds([])}
                >
                  Clear All
                </button>
              </div>
            </div>

            <table className="bids-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>Select</th>
                  <th>Shipment ID</th>
                  <th>Origin → Destination</th>
                  <th>Payload (Weight / Vol)</th>
                  <th>Service Level</th>
                  <th>Pickup Window</th>
                  <th>Delivery Window</th>
                </tr>
              </thead>
              <tbody>
                {pendingShipmentsList.map((s) => (
                  <tr key={s.id} style={{ background: selectedShipmentIds.includes(s.id) ? '#eff6ff' : 'transparent' }}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedShipmentIds.includes(s.id)}
                        onChange={() => toggleShipment(s.id)}
                      />
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--proc-primary)' }}>{s.id}</td>
                    <td style={{ fontWeight: 600 }}>{s.origin} → {s.destination}</td>
                    <td>{s.weightKg} kg | {s.volumeCbm} m³</td>
                    <td>
                      <span className={`tender-service-pill ${s.service === 'Express' ? 'pill-express' : 'pill-standard'}`}>
                        {s.service}
                      </span>
                    </td>
                    <td>{s.pickup}</td>
                    <td>{s.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--proc-border)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--proc-text-muted)' }}>
                Selected: <strong>{selectedShipmentIds.length} Shipments</strong> | Total Weight: <strong>{totalSelectedWeight} kg</strong> | Volume: <strong>{totalSelectedVolume.toFixed(1)} m³</strong>
              </div>
              <button
                className="tender-action-btn btn-evaluate"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                disabled={selectedShipmentIds.length === 0}
                onClick={() => setCurrentStep(2)}
              >
                Continue to Tender Rules →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Tender Configuration & Pricing */}
        {currentStep === 2 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.05rem', color: '#0f172a' }}>Tender Configuration & Procurement Rules</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Tender Procurement Scope</label>
                <select
                  className="proc-select"
                  value={tenderType}
                  onChange={(e) => setTenderType(e.target.value)}
                >
                  <option value="spot">Point-to-Point Spot Auction</option>
                  <option value="network">Multi-Drop Regional Corridor</option>
                  <option value="contract">3-Month Dedicated Lane Contract</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Required Service Level</label>
                <select
                  className="proc-select"
                  value={serviceLevel}
                  onChange={(e) => setServiceLevel(e.target.value)}
                >
                  <option value="Express">Express Guaranteed (24h Delivery)</option>
                  <option value="Standard">Standard Surface Roadway</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Price Bidding Model</label>
                <select
                  className="proc-select"
                  value={priceBasis}
                  onChange={(e) => setPriceBasis(e.target.value)}
                >
                  <option value="per_trip">Fixed Flat Rate Per Trip ($)</option>
                  <option value="per_kg">Rate Per Kilogram ($/kg)</option>
                  <option value="per_km">Rate Per Kilometer ($/km)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Target Ceiling Budget ($)</label>
                <input
                  type="number"
                  className="proc-search-input"
                  style={{ width: '100%' }}
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px', padding: '14px', background: '#f8fafc', borderRadius: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={autoAwardBelowBudget}
                  onChange={(e) => setAutoAwardBelowBudget(e.target.checked)}
                />
                <span>Auto-Award load to lowest bidder if quoted rate is below target budget (${targetBudget})</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={requireGpsTelematics}
                  onChange={(e) => setRequireGpsTelematics(e.target.checked)}
                />
                <span>Require mandatory live GPS telematics API integration from bidding carrier</span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <button
                className="tender-action-btn"
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                onClick={() => setCurrentStep(1)}
              >
                ← Back
              </button>
              <button
                className="tender-action-btn btn-evaluate"
                style={{ padding: '8px 20px' }}
                onClick={() => setCurrentStep(3)}
              >
                Continue to Carrier Selection →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Carrier Selection */}
        {currentStep === 3 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.05rem', color: '#0f172a' }}>Select Carriers to Invite for Bidding</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {carrierDirectory.map((carrier) => {
                const isSelected = selectedCarriers.includes(carrier.id);
                return (
                  <div
                    key={carrier.id}
                    style={{
                      border: isSelected ? '2px solid #2563eb' : '1px solid var(--proc-border)',
                      borderRadius: '8px',
                      padding: '14px',
                      background: isSelected ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onClick={() => toggleCarrier(carrier.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{carrier.name}</strong>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCarrier(carrier.id)}
                      />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--proc-text-muted)', marginBottom: '8px' }}>
                      {carrier.coverage}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span>⭐ {carrier.rating} / 5.0</span>
                      <span>⏱️ {carrier.otp}% OTP</span>
                      <span>🚚 {carrier.fleetSize} Trucks</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <button
                className="tender-action-btn"
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                onClick={() => setCurrentStep(2)}
              >
                ← Back
              </button>
              <button
                className="tender-action-btn btn-evaluate"
                style={{ padding: '8px 20px' }}
                disabled={selectedCarriers.length === 0}
                onClick={() => setCurrentStep(4)}
              >
                Continue to Final Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Final Review & Broadcast */}
        {currentStep === 4 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.05rem', color: '#0f172a' }}>Review Tender Manifest & Broadcast</h3>

            <div className="cargo-spec-summary" style={{ marginBottom: '16px' }}>
              <div className="spec-item">
                <span>Shipments Included:</span>
                <strong>{selectedShipmentIds.length} Freight Orders</strong>
              </div>
              <div className="spec-item">
                <span>Total Gross Payload:</span>
                <strong>{totalSelectedWeight} kg ({totalSelectedVolume.toFixed(1)} m³)</strong>
              </div>
              <div className="spec-item">
                <span>Invited Carrier Pool:</span>
                <strong>{selectedCarriers.length} Carriers</strong>
              </div>
              <div className="spec-item">
                <span>Target Ceiling Budget:</span>
                <strong style={{ color: '#059669' }}>${targetBudget}</strong>
              </div>
            </div>

            <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--proc-border)', marginBottom: '20px', fontSize: '0.825rem', color: '#334155' }}>
              <div>📋 <strong>Selected Orders:</strong> {selectedShipmentIds.join(', ')}</div>
              <div style={{ marginTop: '4px' }}>🚚 <strong>Invited Bidders:</strong> {selectedCarriers.map(cId => carrierDirectory.find(c => c.id === cId)?.name).join(', ')}</div>
              <div style={{ marginTop: '4px' }}>⏱️ <strong>Response Deadline:</strong> {responseDeadline} (Auto-award enabled)</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="tender-action-btn"
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                onClick={() => setCurrentStep(3)}
              >
                ← Back
              </button>
              <button
                className="tender-action-btn btn-award"
                style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                onClick={handleBroadcastTender}
              >
                🚀 Broadcast RFQ Tender
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateRFQ;
