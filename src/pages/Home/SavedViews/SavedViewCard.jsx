import { useNavigate } from 'react';
import { Play, Star, Share2, MoreVertical, Sun, Briefcase, Moon, Award, Thermometer, Anchor, User } from 'lucide-react';

export default function SavedViewCard({ view, onFavoriteToggle, onDeleteView }) {
  const navigate = useNavigate();

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Sun': return <Sun size={20} />;
      case 'Briefcase': return <Briefcase size={20} />;
      case 'Moon': return <Moon size={20} />;
      case 'Award': return <Award size={20} />;
      case 'Thermometer': return <Thermometer size={20} />;
      case 'Anchor': return <Anchor size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  return (
    <div className="sv-card">
      <div className="sv-card__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="sv-card__icon-badge" style={{ background: view.color }}>
            {getIconComponent(view.icon)}
          </div>
          <div>
            <div className="sv-card__title">{view.title}</div>
            <span className={`badge badge--${view.category === 'preset' ? 'info' : view.category === 'shared' ? 'pending' : 'success'}`} style={{ fontSize: 10 }}>
              {view.category === 'preset' ? 'System Preset' : view.category === 'shared' ? 'Shared View' : 'Custom View'}
            </span>
          </div>
        </div>

        <button
          className="btn btn--ghost btn--xs"
          onClick={() => onFavoriteToggle(view.id)}
          title={view.isFavorite ? 'Remove Favorite' : 'Mark Favorite'}
          style={{ color: view.isFavorite ? '#FF9800' : 'var(--color-secondary-gray)' }}
        >
          <Star size={16} fill={view.isFavorite ? '#FF9800' : 'none'} />
        </button>
      </div>

      <div className="sv-card__body">
        <div className="sv-card__desc">{view.description}</div>

        <div className="sv-card__meta-grid">
          <div>👤 <strong>Owner:</strong> {view.owner}</div>
          <div>🔄 <strong>Refresh:</strong> {view.refreshRate}</div>
          <div>🧩 <strong>Widgets:</strong> {view.widgetsCount} configured</div>
          <div>👥 <strong>Shared:</strong> {view.sharedUsersCount} users</div>
        </div>
      </div>

      <div className="sv-card__footer">
        <button
          className="btn btn--primary btn--sm"
          onClick={() => navigate(view.targetPath)}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Play size={14} /> Launch View
        </button>

        <div style={{ display: 'flex', gap: 4 }}>
          {view.category === 'custom' && (
            <button
              className="btn btn--ghost btn--xs"
              onClick={() => onDeleteView(view.id)}
              style={{ color: 'var(--color-error)' }}
              title="Delete Custom View"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
