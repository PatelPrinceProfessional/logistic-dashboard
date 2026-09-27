import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { consolidationCandidates } from '../../utils/mockData/shipmentsData';
import { Layers, CheckCircle, ArrowRight, DollarSign, Truck, AlertCircle, Plus } from 'lucide-react';
import './Shipments.css';

export default function ShipmentConsolidation() {
  const navigate = useNavigate();
  const [selectedCandidateIds, setSelectedCandidateIds] = useState(['SHP-LTL-01', 'SHP-LTL-02', 'SHP-LTL-03']);

  const toggleCandidate = (id) => {
    if (selectedCandidateIds.includes(id)) {
      setSelectedCandidateIds(selectedCandidateIds.filter(i => i !== id));
    } else {
      setSelectedCandidateIds([...selectedCandidateIds, id]);
    }
  };

  const selectedCandidates = consolidationCandidates.filter(c => selectedCandidateIds.includes(c.id));
  const totalWeightKg = selectedCandidates.reduce((sum, c) => sum + c.weightKg, 0);
  const totalVolumeCbm = selectedCandidates.reduce((sum, c) => sum + c.volumeCbm, 0);

  // Max Truck Capacity (18 T / 12 Cbm)
  const weightUtilPct = Math.min(Math.round((totalWeightKg / 5000) * 100), 100);
  const volumeUtilPct = Math.min(Math.round((totalVolumeCbm / 12) * 100), 100);
  const estimatedSavings = selectedCandidates.length * 14200;

  const handleProcessConsolidation = () => {
    alert(`Successfully consolidated ${selectedCandidates.length} LTL shipments into FTL Shipment CON-SHP-2026-009! Estimated Savings: ₹${estimatedSavings.toLocaleString()}`);
    navigate('/shipments');
  };

  return (
    <Layout
      title="Shipment Consolidation Workbench"
      breadcrumbs={[
        { label: 'Shipments', path: '/shipments' },
        { label: 'Consolidation', path: '/shipments/consolidation' }
      ]}
      actions={
        <button className="btn btn--primary btn--sm" onClick={handleProcessConsolidation} disabled={selectedCandidates.length === 0}>
          <CheckCircle size={14} /> Process & Dispatch Consolidation
        </button>
      }
    >
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <p style={{ color: 'var(--color-secondary-gray)', fontSize: 14, margin: 0 }}>
          Merge candidate Less-than-Truckload (LTL) shipments into Full-Truckload (FTL) dispatches to maximize truck payload utilization and reduce freight costs.
        </p>
      </div>

      <div className="sm-consolidation-grid">
        {/* Available Candidate Shipments Panel */}
        <div className="card">
          <div className="card__header">
            <div>
              <div className="card__title">Candidate LTL Shipments</div>
              <div className="card__subtitle">Route: Mumbai Central WH → Delhi Hub</div>
            </div>
            <span className="badge badge--info">{consolidationCandidates.length} Candidates</span>
          </div>
          <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {consolidationCandidates.map((cand) => {
              const isSelected = selectedCandidateIds.includes(cand.id);
              return (
                <div
                  key={cand.id}
                  className={`sm-candidate-card${isSelected ? ' sm-candidate-card--selected' : ''}`}
                  onClick={() => toggleCandidate(cand.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                    />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary-blue)' }}>{cand.id}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>{cand.customer} • Ready: {cand.readyDate}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: 12 }}>
                    <div><strong>{cand.weightKg} kg</strong> ({cand.volumeCbm} Cbm)</div>
                    <div style={{ color: 'var(--color-success)', fontWeight: 600 }}>{cand.origin} → {cand.destination}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consolidated FTL Shipment Preview Panel */}
        <div className="card">
          <div className="card__header" style={{ background: '#F8F9FA' }}>
            <div>
              <div className="card__title">Consolidated FTL Preview</div>
              <div className="card__subtitle">Generated ID: CON-SHP-2026-009</div>
            </div>
            <span className="badge badge--success">Ready to Dispatch</span>
          </div>

          <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Payload Utilization Gauges */}
            <div style={{ background: '#F8F9FA', padding: 14, borderRadius: 6, border: '1px solid var(--color-medium-gray)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                <span>Truck Weight Fill Payload:</span>
                <span style={{ color: weightUtilPct > 85 ? 'var(--color-error)' : 'var(--color-success)' }}>
                  {totalWeightKg} kg ({weightUtilPct}%)
                </span>
              </div>
              <div className="sm-utilization-meter">
                <div
                  className="sm-utilization-fill"
                  style={{
                    width: `${weightUtilPct}%`,
                    background: weightUtilPct > 85 ? 'var(--color-error)' : 'var(--color-success)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginTop: 12 }}>
                <span>Truck Cube Volume Fill:</span>
                <span style={{ color: 'var(--color-primary-blue)' }}>
                  {totalVolumeCbm.toFixed(1)} Cbm ({volumeUtilPct}%)
                </span>
              </div>
              <div className="sm-utilization-meter">
                <div
                  className="sm-utilization-fill"
                  style={{
                    width: `${volumeUtilPct}%`,
                    background: 'var(--color-primary-blue)',
                  }}
                />
              </div>
            </div>

            {/* Estimated Cost Savings Box */}
            <div style={{ background: '#F0FFF4', border: '1px solid rgba(39, 174, 96, 0.3)', padding: 14, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--color-secondary-gray)' }}>Estimated Freight Cost Savings</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-success)' }}>
                  ₹{estimatedSavings.toLocaleString()}
                </div>
              </div>
              <DollarSign size={32} color="var(--color-success)" />
            </div>

            {/* Carrier & Driver Selection */}
            <div>
              <label className="label">Assigned Carrier & Vehicle</label>
              <select className="input-select" defaultValue="Express Logistics">
                <option value="Express Logistics">Express Logistics — Heavy Trailer (MH-12-AB-1234)</option>
                <option value="BlueDart Logistics">BlueDart Logistics — Container (MH-14-CD-5678)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
