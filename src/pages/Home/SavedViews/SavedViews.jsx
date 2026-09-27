import { useState } from 'react';
import Layout from '../../../components/Common/Layout/Layout';
import SavedViewCard from './SavedViewCard';
import CreateViewModal from './CreateViewModal';
import { savedViewsStats, savedViewsList as initialViews } from '../../../utils/mockData/savedViewsData';
import { LayoutGrid, Plus, Search, Star, Share2, Layers, RefreshCw } from 'lucide-react';
import './SavedViews.css';

export default function SavedViews() {
  const [views, setViews] = useState(initialViews);
  const [categoryTab, setCategoryTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter views based on category and search
  const filteredViews = views.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.owner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryTab === 'ALL' ||
      (categoryTab === 'FAVORITES' && v.isFavorite) ||
      (categoryTab === 'preset' && v.category === 'preset') ||
      (categoryTab === 'custom' && v.category === 'custom') ||
      (categoryTab === 'shared' && v.category === 'shared');

    return matchesSearch && matchesCategory;
  });

  const handleFavoriteToggle = (id) => {
    setViews(views.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v)));
  };

  const handleDeleteView = (id) => {
    if (confirm('Are you sure you want to delete this custom view?')) {
      setViews(views.filter((v) => v.id !== id));
    }
  };

  const handleCreateSavedView = (newView) => {
    setViews([newView, ...views]);
  };

  return (
    <Layout
      title="Saved Views"
      breadcrumbs={[{ label: 'Saved Views', path: '/saved-views' }]}
      actions={
        <button className="btn btn--primary btn--sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={15} /> Create Custom View
        </button>
      }
    >
      {/* ── Metrics Bar ── */}
      <div className="sv-metrics-strip" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="sv-metric-card">
          <div className="sv-metric-card__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <LayoutGrid size={20} />
          </div>
          <div>
            <div className="sv-metric-card__val">{views.length}</div>
            <div className="sv-metric-card__lbl">Total Saved Views</div>
          </div>
        </div>

        <div className="sv-metric-card">
          <div className="sv-metric-card__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <Layers size={20} />
          </div>
          <div>
            <div className="sv-metric-card__val" style={{ color: '#27AE60' }}>{savedViewsStats.systemPresets}</div>
            <div className="sv-metric-card__lbl">System Presets</div>
          </div>
        </div>

        <div className="sv-metric-card">
          <div className="sv-metric-card__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <Star size={20} />
          </div>
          <div>
            <div className="sv-metric-card__val" style={{ color: '#FF9800' }}>
              {views.filter((v) => v.isFavorite).length}
            </div>
            <div className="sv-metric-card__lbl">Favorite Presets</div>
          </div>
        </div>

        <div className="sv-metric-card">
          <div className="sv-metric-card__icon" style={{ background: '#17A2B820', color: '#17A2B8' }}>
            <Share2 size={20} />
          </div>
          <div>
            <div className="sv-metric-card__val">{savedViewsStats.sharedViews}</div>
            <div className="sv-metric-card__lbl">Shared With Me</div>
          </div>
        </div>
      </div>

      {/* ── Category Filter Bar ── */}
      <div className="sv-filter-bar" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="sv-tabs">
          {[
            { key: 'ALL', label: 'All Views' },
            { key: 'FAVORITES', label: '⭐ Favorites' },
            { key: 'preset', label: 'System Presets' },
            { key: 'custom', label: 'My Custom Views' },
            { key: 'shared', label: 'Shared Views' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`sv-tab-btn${categoryTab === tab.key ? ' sv-tab-btn--active' : ''}`}
              onClick={() => setCategoryTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: 260 }}>
          <input
            type="text"
            className="input-text"
            placeholder="Search saved views..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 32, fontSize: 13 }}
          />
          <Search size={14} color="#9EA5B1" style={{ position: 'absolute', left: 10, top: 12 }} />
        </div>
      </div>

      {/* ── Saved Views Card Grid ── */}
      <div className="sv-card-grid">
        {filteredViews.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, background: 'white', borderRadius: 8, border: '1px solid var(--color-medium-gray)' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-secondary-gray)' }}>
              No saved views match your search criteria.
            </div>
            <button className="btn btn--secondary btn--sm" style={{ marginTop: 12 }} onClick={() => { setSearchQuery(''); setCategoryTab('ALL'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          filteredViews.map((view) => (
            <SavedViewCard
              key={view.id}
              view={view}
              onFavoriteToggle={handleFavoriteToggle}
              onDeleteView={handleDeleteView}
            />
          ))
        )}
      </div>

      {/* ── Custom View Builder Modal ── */}
      <CreateViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSavedView={handleCreateSavedView}
      />
    </Layout>
  );
}
