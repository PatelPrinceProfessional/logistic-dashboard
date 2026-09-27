import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { carrierDirectory } from '../../utils/mockData/procurementData';
import './Procurement.css';

const pendingShipmentsList = [
  { id: 'SHP-100270', origin: 'Mumbai Central Hub', destination: 'Delhi NCR Logistics Park', weightKg: 1850, volumeCbm: 8.2, items: 14, service: 'Express', pickup: 'Tomorrow 08:00 - 10:00', delivery: 'Sep 29 18:00', hazmat: false, tempControl: false },
  { id: 'SHP-100271', origin: 'Pune MIDC Sector 2', destination: 'Bangalore Electronic City', weightKg: 2400, volumeCbm: 11.0, items: 22, service: 'Standard', pickup: 'Tomorrow 09:30 - 11:30', delivery: 'Sep 30 14:00', hazmat: false, tempControl: false },
  { id: 'SHP-100272', origin: 'Chennai Auto Cluster', destination: 'Hyderabad HITEC Zone', weightKg: 950, volumeCbm: 4.5, items: 8, service: 'Express', pickup: 'Tomorrow 07:00 - 08:30', delivery: 'Sep 29 12:00', hazmat: true, tempControl: false },
  { id: 'SHP-100273', origin: 'Surat Textile Zone', destination: 'Kolkata Port Terminal', weightKg: 3100, volumeCbm: 14.2, items: 30, service: 'Standard', pickup: 'Tomorrow 11:00 - 13:00', delivery: 'Oct 01 10:00', hazmat: false, tempControl: false },
  { id: 'SHP-100274', origin: 'Ahmedabad Pharma SEZ', destination: 'Jaipur Logistics Park', weightKg: 1200, volumeCbm: 5.6, items: 16, service: 'Express', pickup: 'Tomorrow 10:00 - 12:00', delivery: 'Sep 29 20:00', hazmat: false, tempControl: true },
];

const CreateRFQ = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Selected Shipments
  const [selectedShipmentIds, setSelectedShipmentIds] = useState(['SHP-100270', 'SHP-100272']);
  const [shipmentFilter, setShipmentFilter] = useState('');

  // Step 2: Tender Details & Rules
  const [tenderType, setTenderType] = useState('spot'); // 'spot' | 'network' | 'contract'
  const [serviceLevel, setServiceLevel] = useState('Express');
  const [priceBasis, setPriceBasis] = useState('per_trip');
  const [currency, setCurrency] = useState('USD');
  const [targetBudget, setTargetBudget] = useState(420);
  const [minCarriersToInvite, setMinCarriersToInvite] = useState(3);
  const [responseDeadline, setResponseDeadline] = useState('2026-09-28 18:00');
  const [validityDays, setValidityDays] = useState(3);
  const [autoAwardRules, setAutoAwardRules] = useState({
    belowBudget: true,
    singleLowestResponse: true,
    topRatedCarrier: false,
    requireGps: true,
  });

  // Step 3: Carrier Selection
  const [carrierFilterTab, setCarrierFilterTab] = useState('all'); // 'all' | 'preferred' | 'high_otp'
  const [carrierSearch, setCarrierSearch] = useState('');
  const [selectedCarriers, setSelectedCarriers] = useState(['CAR-01', 'CAR-02', 'CAR-05']);

  // Step 4: Preview Toggle
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true);

  // Checkbox toggles
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

  const removeCarrierTag = (id) => {
    setSelectedCarriers(selectedCarriers.filter(cId => cId !== id));
  };

  // Calculations
  const selectedShipments = pendingShipmentsList.filter(s => selectedShipmentIds.includes(s.id));
  const totalWeight = selectedShipments.reduce((sum, s) => sum + s.weightKg, 0);
  const totalVolume = selectedShipments.reduce((sum, s) => sum + s.volumeCbm, 0);
  const totalItems = selectedShipments.reduce((sum, s) => sum + s.items, 0);

  // Filtered carriers
  const filteredCarriers = carrierDirectory.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(carrierSearch.toLowerCase()) ||
                          c.coverage.toLowerCase().includes(carrierSearch.toLowerCase());
    if (carrierFilterTab === 'preferred') return matchesSearch && c.preferred;
    if (carrierFilterTab === 'high_otp') return matchesSearch && c.otp >= 96.0;
    return matchesSearch;
  });

  const handleBroadcastTender = () => {
    alert(`🎉 Tender RFQ-2026-099 successfully published and broadcast to ${selectedCarriers.length} carriers!\n\nResponses deadline: ${responseDeadline}\nTarget Ceiling: ${currency === 'USD' ? '$' : '₹'}${targetBudget}`);
    navigate('/procurement');
  };

  return (
    <Layout activePage="procurement">
      <div className="procurement-container">
        {/* Header */}
        <div className="procurement-header">
          <div className="proc-title-group">
            <h1>
              <span>📝</span> Create Freight RFQ & Spot Tender
            </h1>
            <p>4-step freight rate discovery, shipment bundle configuration, multi-carrier broadcasting, and automated award rules</p>
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

        {/* Wizard Step Navigation Bar */}
        <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                background: currentStep === 1 ? '#2563eb' : currentStep > 1 ? '#eff6ff' : '#f8fafc',
                color: currentStep === 1 ? '#ffffff' : currentStep > 1 ? '#2563eb' : '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentStep(1)}
            >
              1. Shipment Selection {selectedShipmentIds.length > 0 && `(${selectedShipmentIds.length})`}
            </div>
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                background: currentStep === 2 ? '#2563eb' : currentStep > 2 ? '#eff6ff' : '#f8fafc',
                color: currentStep === 2 ? '#ffffff' : currentStep > 2 ? '#2563eb' : '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: selectedShipmentIds.length > 0 ? 'pointer' : 'not-allowed',
              }}
              onClick={() => selectedShipmentIds.length > 0 && setCurrentStep(2)}
            >
              2. Tender Rules & Pricing
            </div>
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                background: currentStep === 3 ? '#2563eb' : currentStep > 3 ? '#eff6ff' : '#f8fafc',
                color: currentStep === 3 ? '#ffffff' : currentStep > 3 ? '#2563eb' : '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: selectedShipmentIds.length > 0 ? 'pointer' : 'not-allowed',
              }}
              onClick={() => selectedShipmentIds.length > 0 && setCurrentStep(3)}
            >
              3. Carrier Selection ({selectedCarriers.length})
            </div>
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                background: currentStep === 4 ? '#2563eb' : '#f8fafc',
                color: currentStep === 4 ? '#ffffff' : '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: selectedShipmentIds.length > 0 && selectedCarriers.length > 0 ? 'pointer' : 'not-allowed',
              }}
              onClick={() => selectedShipmentIds.length > 0 && selectedCarriers.length > 0 && setCurrentStep(4)}
            >
              4. Review & Broadcast
            </div>
          </div>
        </div>

        {/* ==========================================================================
            STEP 1: SHIPMENT SELECTION
            ========================================================================== */}
        {currentStep === 1 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>Select Shipments to Include in RFQ Tender</h3>
                <span style={{ fontSize: '0.775rem', color: 'var(--proc-text-muted)' }}>
                  Bundle individual shipments into a single tender run or point-to-point spot load
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  className="proc-search-input"
                  style={{ width: '220px' }}
                  placeholder="Filter shipments..."
                  value={shipmentFilter}
                  onChange={(e) => setShipmentFilter(e.target.value)}
                />
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
                  <th>Items</th>
                  <th>Service Level</th>
                  <th>Pickup Window</th>
                  <th>Delivery Window</th>
                </tr>
              </thead>
              <tbody>
                {pendingShipmentsList
                  .filter(s => s.id.toLowerCase().includes(shipmentFilter.toLowerCase()) ||
                               s.origin.toLowerCase().includes(shipmentFilter.toLowerCase()) ||
                               s.destination.toLowerCase().includes(shipmentFilter.toLowerCase()))
                  .map((s) => (
                    <tr
                      key={s.id}
                      style={{ background: selectedShipmentIds.includes(s.id) ? '#eff6ff' : 'transparent', cursor: 'pointer' }}
                      onClick={() => toggleShipment(s.id)}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedShipmentIds.includes(s.id)}
                          onChange={() => toggleShipment(s.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--proc-primary)' }}>{s.id}</td>
                      <td style={{ fontWeight: 600 }}>{s.origin} → {s.destination}</td>
                      <td>{s.weightKg} kg | {s.volumeCbm} m³</td>
                      <td>{s.items} pkgs</td>
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
                Tender Aggregate: <strong>{selectedShipmentIds.length} Shipments</strong> | <strong>{totalWeight.toLocaleString()} kg</strong> | <strong>{totalVolume.toFixed(1)} m³</strong> | <strong>{totalItems} Packages</strong>
              </div>
              <button
                className="tender-action-btn btn-evaluate"
                style={{ padding: '8px 24px', fontSize: '0.875rem' }}
                disabled={selectedShipmentIds.length === 0}
                onClick={() => setCurrentStep(2)}
              >
                Continue to Tender Rules →
              </button>
            </div>
          </div>
        )}

        {/* ==========================================================================
            STEP 2: TENDER RULES & PRICING CONFIGURATION
            ========================================================================== */}
        {currentStep === 2 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.05rem', color: '#0f172a' }}>Tender Parameters, Deadlines & Auto-Award Criteria</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Tender Procurement Scope</label>
                <select
                  className="proc-select"
                  value={tenderType}
                  onChange={(e) => setTenderType(e.target.value)}
                >
                  <option value="spot">Point-to-Point Spot Market Auction</option>
                  <option value="network">Multi-Drop Regional Corridor Run</option>
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
                  <option value="Standard">Standard Roadway Freight</option>
                  <option value="Urgent">Urgent / Critical Same-Day</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Currency</label>
                <select
                  className="proc-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Price Bidding Basis</label>
                <select
                  className="proc-select"
                  value={priceBasis}
                  onChange={(e) => setPriceBasis(e.target.value)}
                >
                  <option value="per_trip">Fixed Flat Rate Per Trip</option>
                  <option value="per_kg">Rate Per Kilogram ($/kg)</option>
                  <option value="per_km">Rate Per Kilometer ($/km)</option>
                  <option value="combination">Dynamic Payload Weight + Mileage</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Target Ceiling Budget ({currency})</label>
                <input
                  type="number"
                  className="proc-search-input"
                  style={{ width: '100%' }}
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(Number(e.target.value))}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Min Carriers to Invite</label>
                <input
                  type="number"
                  className="proc-search-input"
                  style={{ width: '100%' }}
                  value={minCarriersToInvite}
                  onChange={(e) => setMinCarriersToInvite(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Tender Response Deadline</label>
                <input
                  type="text"
                  className="proc-search-input"
                  style={{ width: '100%' }}
                  value={responseDeadline}
                  onChange={(e) => setResponseDeadline(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--proc-text-muted)' }}>Tender Validity Window (Days)</label>
                <select
                  className="proc-select"
                  value={validityDays}
                  onChange={(e) => setValidityDays(Number(e.target.value))}
                >
                  <option value={1}>24 Hours</option>
                  <option value={3}>3 Days (Standard)</option>
                  <option value={7}>7 Days (Weekly Contract)</option>
                </select>
              </div>
            </div>

            {/* Auto-Award Rules */}
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--proc-border)', marginTop: '16px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#0f172a' }}>⚡ Automated Load Awarding Triggers</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.825rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={autoAwardRules.belowBudget}
                    onChange={(e) => setAutoAwardRules({ ...autoAwardRules, belowBudget: e.target.checked })}
                  />
                  <span>Auto-award if quote is below target budget (${targetBudget})</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={autoAwardRules.singleLowestResponse}
                    onChange={(e) => setAutoAwardRules({ ...autoAwardRules, singleLowestResponse: e.target.checked })}
                  />
                  <span>Auto-award to lowest bid when bidding deadline expires</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={autoAwardRules.topRatedCarrier}
                    onChange={(e) => setAutoAwardRules({ ...autoAwardRules, topRatedCarrier: e.target.checked })}
                  />
                  <span>Priority auto-accept if Tier-1 carrier (rating ≥ 4.8) bids</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={autoAwardRules.requireGps}
                    onChange={(e) => setAutoAwardRules({ ...autoAwardRules, requireGps: e.target.checked })}
                  />
                  <span>Mandatory GPS telematics integration required</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <button
                className="tender-action-btn"
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                onClick={() => setCurrentStep(1)}
              >
                ← Back to Shipments
              </button>
              <button
                className="tender-action-btn btn-evaluate"
                style={{ padding: '8px 24px' }}
                onClick={() => setCurrentStep(3)}
              >
                Continue to Carrier Selection →
              </button>
            </div>
          </div>
        )}

        {/* ==========================================================================
            STEP 3: CARRIER SELECTION & BROADCAST
            ========================================================================== */}
        {currentStep === 3 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>Select Carrier Pool to Invite for Bidding</h3>
                <span style={{ fontSize: '0.775rem', color: 'var(--proc-text-muted)' }}>
                  Invite qualified regional 3PL carriers and freight fleets to tender responses
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className={`proc-toggle-btn ${carrierFilterTab === 'all' ? 'active' : ''}`}
                  onClick={() => setCarrierFilterTab('all')}
                >
                  All Carriers ({carrierDirectory.length})
                </button>
                <button
                  className={`proc-toggle-btn ${carrierFilterTab === 'preferred' ? 'active' : ''}`}
                  onClick={() => setCarrierFilterTab('preferred')}
                >
                  ⭐ Preferred Only
                </button>
                <button
                  className={`proc-toggle-btn ${carrierFilterTab === 'high_otp' ? 'active' : ''}`}
                  onClick={() => setCarrierFilterTab('high_otp')}
                >
                  ⏱️ OTP ≥ 96%
                </button>
              </div>
            </div>

            {/* Carrier Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {filteredCarriers.map((carrier) => {
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
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--proc-text-muted)', marginBottom: '8px' }}>
                      {carrier.coverage} {carrier.preferred && <span style={{ color: '#d97706', fontWeight: 600 }}>• Preferred Partner</span>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span>⭐ <strong>{carrier.rating}</strong> / 5.0</span>
                      <span>⏱️ <strong>{carrier.otp}%</strong> OTP</span>
                      <span>🚚 <strong>{carrier.fleetSize}</strong> Trucks</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Carriers Tag Tray */}
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--proc-border)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--proc-text-muted)', marginBottom: '8px' }}>
                SELECTED CARRIERS ({selectedCarriers.length} Invited):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedCarriers.map(cId => {
                  const c = carrierDirectory.find(item => item.id === cId);
                  return (
                    <span
                      key={cId}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        background: '#eff6ff',
                        color: '#2563eb',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        border: '1px solid #bfdbfe',
                      }}
                    >
                      {c?.name}
                      <button
                        style={{ border: 'none', background: 'transparent', color: '#2563eb', cursor: 'pointer', fontWeight: 800, padding: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCarrierTag(cId);
                        }}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <button
                className="tender-action-btn"
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                onClick={() => setCurrentStep(2)}
              >
                ← Back to Rules
              </button>
              <button
                className="tender-action-btn btn-evaluate"
                style={{ padding: '8px 24px' }}
                disabled={selectedCarriers.length === 0}
                onClick={() => setCurrentStep(4)}
              >
                Continue to Final Review →
              </button>
            </div>
          </div>
        )}

        {/* ==========================================================================
            STEP 4: REVIEW & BROADCAST
            ========================================================================== */}
        {currentStep === 4 && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.05rem', color: '#0f172a' }}>Review Tender Manifest & Formal RFQ Specification</h3>

            {/* Top Metric Cards */}
            <div className="cargo-spec-summary" style={{ marginBottom: '20px' }}>
              <div className="spec-item">
                <span>Shipments Bundled:</span>
                <strong>{selectedShipmentIds.length} Orders</strong>
              </div>
              <div className="spec-item">
                <span>Total Gross Weight:</span>
                <strong>{totalWeight.toLocaleString()} kg</strong>
              </div>
              <div className="spec-item">
                <span>Total Volume Envelope:</span>
                <strong>{totalVolume.toFixed(1)} m³ ({totalItems} pkgs)</strong>
              </div>
              <div className="spec-item">
                <span>Invited Carrier Pool:</span>
                <strong>{selectedCarriers.length} Carriers</strong>
              </div>
            </div>

            {/* Expandable Formal Tender Preview Accordion */}
            <div style={{ border: '1px solid var(--proc-border)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
              <div
                style={{
                  padding: '12px 16px',
                  background: '#f8fafc',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: isPreviewExpanded ? '1px solid var(--proc-border)' : 'none',
                }}
                onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
              >
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>
                  📄 Formal Carrier RFQ Tender Document Preview (TEN-2026-099)
                </div>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b', fontWeight: 700 }}>
                  {isPreviewExpanded ? 'Collapse ▲' : 'Expand ▼'}
                </button>
              </div>

              {isPreviewExpanded && (
                <div style={{ padding: '16px', background: '#ffffff', fontSize: '0.825rem', color: '#334155', lineHeight: '1.6' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <strong>Tender ID:</strong> TEN-2026-099<br />
                      <strong>Scope:</strong> {tenderType.toUpperCase()} ({serviceLevel})<br />
                      <strong>Pricing Model:</strong> {priceBasis.replace('_', ' ').toUpperCase()} ({currency})<br />
                      <strong>Target Ceiling:</strong> {currency === 'USD' ? '$' : '₹'}{targetBudget}
                    </div>
                    <div>
                      <strong>Response Deadline:</strong> {responseDeadline}<br />
                      <strong>Bidding Window:</strong> {validityDays} Days<br />
                      <strong>GPS Telematics:</strong> Required<br />
                      <strong>Auto-Award:</strong> {autoAwardRules.belowBudget ? 'Enabled (< Budget)' : 'Manual Evaluation'}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '10px' }}>
                    <strong>Included Freight Shipments:</strong>
                    <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                      {selectedShipments.map(s => (
                        <li key={s.id}>
                          <strong>{s.id}</strong>: {s.origin} → {s.destination} ({s.weightKg} kg, {s.volumeCbm} m³, Pickup: {s.pickup})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '10px', marginTop: '10px' }}>
                    <strong>Invited Carriers:</strong> {selectedCarriers.map(cId => carrierDirectory.find(c => c.id === cId)?.name).join(', ')}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="tender-action-btn"
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                onClick={() => setCurrentStep(3)}
              >
                ← Back to Carrier Selection
              </button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '10px 18px' }}
                  onClick={() => alert('Draft RFQ saved to Tender Board.')}
                >
                  Save as Draft
                </button>
                <button
                  className="tender-action-btn btn-award"
                  style={{ padding: '10px 28px', fontSize: '0.9rem' }}
                  onClick={handleBroadcastTender}
                >
                  🚀 Publish & Broadcast RFQ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateRFQ;
