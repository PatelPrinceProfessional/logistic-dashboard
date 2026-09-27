import { useState } from 'react';
import { X, Plus, Layers, ShieldCheck, Check } from 'lucide-react';
import { availableWidgets } from '../../../utils/mockData/savedViewsData';

export default function CreateViewModal({ isOpen, onClose, onCreateSavedView }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetPath, setTargetPath] = useState('/ops-dashboard');
  const [refreshRate, setRefreshRate] = useState('Every 30s');
  const [selectedWidgets, setSelectedWidgets] = useState(['w-kpi', 'w-capacity']);

  if (!isOpen) return null;

  const toggleWidget = (widgetId) => {
    if (selectedWidgets.includes(widgetId)) {
      setSelectedWidgets(selectedWidgets.filter(w => w !== widgetId));
    } else {
      setSelectedWidgets([...selectedWidgets, widgetId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert('Please enter a View Title');

    const newView = {
      id: `view-${Date.now()}`,
      title,
      description: description || 'Custom configured user workspace dashboard view.',
      category: 'custom',
      owner: 'Ramesh Patel (You)',
      lastModified: 'Just Now',
      refreshRate,
      widgetsCount: selectedWidgets.length,
      sharedUsersCount: 0,
      isFavorite: false,
      color: '#0066CC',
      icon: 'Briefcase',
      targetPath,
    };

    onCreateSavedView(newView);
    onClose();
  };

  return (
    <div className="sv-modal-overlay" onClick={onClose}>
      <div className="sv-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="sv-modal-card__header">
          <div style={{ fontSize: 16, fontWeight: 700 }}>Build New Custom Saved View</div>
          <button className="btn btn--ghost btn--xs" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="sv-modal-card__body">
            <div>
              <label className="label">View Title *</label>
              <input
                type="text"
                className="input-text"
                placeholder="e.g. Region 2 Cold Chain Telemetry"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Description / Purpose</label>
              <textarea
                className="input-text"
                placeholder="Describe the operational focus for this dashboard view..."
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="label">Target Base Page</label>
                <select
                  className="input-select"
                  value={targetPath}
                  onChange={(e) => setTargetPath(e.target.value)}
                >
                  <option value="/ops-dashboard">Operations Dashboard</option>
                  <option value="/">Executive Dashboard</option>
                  <option value="/control-tower">Control Tower</option>
                  <option value="/alerts-center">Alerts Center</option>
                </select>
              </div>

              <div>
                <label className="label">Auto-Refresh Frequency</label>
                <select
                  className="input-select"
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(e.target.value)}
                >
                  <option value="Real-time (5s)">Real-time (5s)</option>
                  <option value="Every 30s">Every 30s</option>
                  <option value="Every 5m">Every 5m</option>
                  <option value="Manual">Manual Refresh</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Select Widgets to Display ({selectedWidgets.length} Selected)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 180, overflowY: 'auto', border: '1px solid var(--color-medium-gray)', borderRadius: 6, padding: 8 }}>
                {availableWidgets.map((w) => {
                  const isChecked = selectedWidgets.includes(w.id);
                  return (
                    <label key={w.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: 4 }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleWidget(w.id)}
                      />
                      <span style={{ fontWeight: 600 }}>{w.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--color-secondary-gray)' }}>— {w.category}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="sv-modal-card__footer">
            <button type="button" className="btn btn--secondary btn--sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary btn--sm">
              <Plus size={14} /> Create Saved View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
