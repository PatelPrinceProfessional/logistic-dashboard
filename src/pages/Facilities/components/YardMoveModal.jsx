import { useState } from 'react';

export default function YardMoveModal({ trailer, onClose, onConfirmMove }) {
  const [targetZone, setTargetZone] = useState('Zone A: Inbound Docks (Bay 1-3)');
  const [operator, setOperator] = useState('Dinesh Kumar (TUG-01 Shunter)');
  const [reason, setReason] = useState('Dock Unloading Ready');

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirmMove({
      trailer: trailer?.id || 'TR-108',
      registration: trailer?.registration || 'HR-26-EQ-9921',
      fromZone: trailer?.zone || 'Zone C: Marshalling Staging',
      toZone: targetZone,
      operator,
      reason,
      time: 'Just Now',
    });
    onClose();
  };

  return (
    <div className="fleet-modal-backdrop" onClick={onClose}>
      <div className="fleet-modal-dialog" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="fleet-modal-header">
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>🚜 Dispatch Yard Tractor Shunting Move</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleConfirm} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'var(--color-bg-secondary)', padding: '10px 12px', borderRadius: '8px', fontSize: '12px' }}>
            <div>Trailer: <strong>{trailer?.id || 'TR-108'} ({trailer?.registration || 'HR-26-EQ-9921'})</strong></div>
            <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Current Location: {trailer?.zone || 'Zone C: Marshalling Staging Area'}</div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Target Destination Zone:
            </label>
            <select
              className="fleet-search-input"
              value={targetZone}
              onChange={(e) => setTargetZone(e.target.value)}
            >
              <option value="Zone A: Inbound Docks (Bay 1-3)">Zone A: Inbound Docks (Bay 1-3)</option>
              <option value="Zone B: Outbound Docks (Bay 4-6)">Zone B: Outbound Docks (Bay 4-6)</option>
              <option value="Zone C: Marshalling & Pre-Dock Staging">Zone C: Marshalling & Pre-Dock Staging</option>
              <option value="Zone D: Long-Term Storage & Empty Racks">Zone D: Long-Term Storage & Empty Racks</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Assigned Yard Tractor / Operator:
            </label>
            <select
              className="fleet-search-input"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value="Dinesh Kumar (TUG-01 Shunter)">Dinesh Kumar (Terminal Tractor TUG-01)</option>
              <option value="Naveen Rao (TUG-02 Shunter)">Naveen Rao (Terminal Tractor TUG-02)</option>
              <option value="Mahesh Patil (Yard Supervisor)">Mahesh Patil (Emergency Shunter)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Operational Reason:
            </label>
            <select
              className="fleet-search-input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="Dock Unloading Ready">Dock Unloading Ready</option>
              <option value="Outbound Loading Priority">Outbound Loading Priority</option>
              <option value="Yard Congestion Relief">Yard Congestion Relief</option>
              <option value="Post-Unload Shift to Storage">Post-Unload Shift to Storage</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              ✓ Dispatch Shunting Move
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
