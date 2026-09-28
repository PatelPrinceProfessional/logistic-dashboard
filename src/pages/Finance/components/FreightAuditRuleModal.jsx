import React, { useState } from 'react';
import { X, Sliders, ShieldCheck, CheckCircle2 } from 'lucide-react';
import '../Finance.css';

export default function FreightAuditRuleModal({ isOpen, onClose, onSave }) {
  const [tolerancePct, setTolerancePct] = useState(1.5);
  const [autoApproveAmountMax, setAutoApproveAmountMax] = useState(100000);
  const [allowTollVarianceMax, setAllowTollVarianceMax] = useState(250);
  const [requirePodSignature, setRequirePodSignature] = useState(true);
  const [requireFastTagCrossCheck, setRequireFastTagCrossCheck] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      tolerancePct: parseFloat(tolerancePct),
      autoApproveAmountMax: parseInt(autoApproveAmountMax, 10),
      allowTollVarianceMax: parseInt(allowTollVarianceMax, 10),
      requirePodSignature,
      requireFastTagCrossCheck,
    });
  };

  return (
    <div className="finance-modal-overlay">
      <div className="finance-modal-content" style={{ maxWidth: '620px' }}>
        <div className="finance-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Sliders size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                Freight Audit Matching Engine Rules
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Configure automated 3-way matching tolerance bands and approval thresholds.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="finance-modal-body">
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Base Freight Tolerance Band (± %)
              </label>
              <input
                type="number"
                step="0.1"
                value={tolerancePct}
                onChange={(e) => setTolerancePct(e.target.value)}
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                required
              />
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Invoices with variance within ±{tolerancePct}% are auto-passed without blocking settlement.
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Max Auto-Approval Invoice Ceiling (₹)
              </label>
              <input
                type="number"
                value={autoApproveAmountMax}
                onChange={(e) => setAutoApproveAmountMax(e.target.value)}
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Allowable Toll Variance Cushion (₹)
              </label>
              <input
                type="number"
                value={allowTollVarianceMax}
                onChange={(e) => setAllowTollVarianceMax(e.target.value)}
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={requirePodSignature}
                  onChange={(e) => setRequirePodSignature(e.target.checked)}
                />
                <span style={{ fontWeight: 600 }}>Require digital e-POD signature match prior to audit pass</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={requireFastTagCrossCheck}
                  onChange={(e) => setRequireFastTagCrossCheck(e.target.checked)}
                />
                <span style={{ fontWeight: 600 }}>Cross-verify billed tolls against NETC FastTag API telemetry</span>
              </label>
            </div>
          </div>

          <div className="finance-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} />
              <span>Save & Apply Audit Rules</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
