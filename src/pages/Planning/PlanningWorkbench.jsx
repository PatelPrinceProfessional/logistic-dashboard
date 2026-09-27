import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import DemandQueuePanel from './DemandQueuePanel';
import CapacityCanvas from './CapacityCanvas';
import PlanningAssistantPanel from './PlanningAssistantPanel';
import {
  planningStats, unallocatedDemand as initialDemand, carrierCapacityList as initialCapacities
} from '../../utils/mockData/planningData';
import { Package, Truck, Sparkles, DollarSign, Layers, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import './Planning.css';

export default function PlanningWorkbench() {
  const navigate = useNavigate();
  const [demandList, setDemandList] = useState(initialDemand);
  const [carrierCapacity, setCarrierCapacity] = useState(initialCapacities);
  const [selectedDemand, setSelectedDemand] = useState(initialDemand[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAssignToCarrier = (carrier) => {
    if (!selectedDemand) return;
    alert(`Assigned ${selectedDemand.orderId} (${selectedDemand.weightKg} kg) to ${carrier.carrierName}.`);
    
    // Remove assigned demand from queue
    setDemandList(demandList.filter(d => d.id !== selectedDemand.id));
    setSelectedDemand(null);
  };

  return (
    <Layout
      title="Transportation Planning Workbench"
      breadcrumbs={[{ label: 'Planning', path: '/planning' }]}
      actions={
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <button className="btn btn--secondary btn--sm" onClick={() => navigate('/planning/replanning')}>
            <Zap size={14} /> Continuous Replanning
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => alert('Automated AI Optimization Plan generated!')}>
            <Sparkles size={14} /> Auto-Plan (AI)
          </button>
        </div>
      }
    >
      {/* ── Top Metrics Bar ── */}
      <div className="tp-metrics-strip" style={{ marginBottom: 'var(--space-md)' }}>
        <div className="tp-metric-card">
          <div className="tp-metric-card__icon" style={{ background: '#0066CC20', color: '#0066CC' }}>
            <Package size={20} />
          </div>
          <div>
            <div className="tp-metric-card__val">{planningStats.totalDemandKg}</div>
            <div className="tp-metric-card__lbl">Demand Awaiting</div>
          </div>
        </div>

        <div className="tp-metric-card">
          <div className="tp-metric-card__icon" style={{ background: '#27AE6020', color: '#27AE60' }}>
            <Truck size={20} />
          </div>
          <div>
            <div className="tp-metric-card__val" style={{ color: '#27AE60' }}>{planningStats.weightUtilPct}%</div>
            <div className="tp-metric-card__lbl">Payload Capacity Fill</div>
          </div>
        </div>

        <div className="tp-metric-card">
          <div className="tp-metric-card__icon" style={{ background: '#17A2B820', color: '#17A2B8' }}>
            <DollarSign size={20} />
          </div>
          <div>
            <div className="tp-metric-card__val">{planningStats.estimatedCost}</div>
            <div className="tp-metric-card__lbl">Estimated Plan Cost</div>
          </div>
        </div>

        <div className="tp-metric-card">
          <div className="tp-metric-card__icon" style={{ background: '#FF980020', color: '#FF9800' }}>
            <Layers size={20} />
          </div>
          <div>
            <div className="tp-metric-card__val" style={{ color: '#FF9800' }}>{planningStats.backhaulOppsCount}</div>
            <div className="tp-metric-card__lbl">Backhaul Opportunities</div>
          </div>
        </div>

        <div className="tp-metric-card">
          <div className="tp-metric-card__icon" style={{ background: '#6C348320', color: '#6C3483' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div className="tp-metric-card__val" style={{ color: '#6C3483' }}>{demandList.length}</div>
            <div className="tp-metric-card__lbl">Unallocated Demand</div>
          </div>
        </div>
      </div>

      {/* ── 3-Column Planning Workspace ── */}
      <div className="tp-workspace">
        {/* Left 30%: Demand Queue */}
        <DemandQueuePanel
          demandList={demandList}
          selectedDemand={selectedDemand}
          onSelectDemand={setSelectedDemand}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Center 40%: Carrier Capacity Canvas */}
        <CapacityCanvas
          carrierCapacity={carrierCapacity}
          selectedDemand={selectedDemand}
          onAssignToCarrier={handleAssignToCarrier}
        />

        {/* Right 30%: AI Planning Assistant & Constraints */}
        <PlanningAssistantPanel
          selectedDemand={selectedDemand}
          carrierCapacity={carrierCapacity}
          onAutoAssign={handleAssignToCarrier}
        />
      </div>
    </Layout>
  );
}
