import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  FileText,
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Printer,
  ShieldCheck,
  MapPin,
  Building2,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ArrowRightLeft,
} from 'lucide-react';
import { ewayBillsSummaryStats, ewayBillsList as initialEwbs } from '../../utils/mockData/documentsData';
import EWayBillGenerateModal from './components/EWayBillGenerateModal';
import EWayBillVehicleModal from './components/EWayBillVehicleModal';
import EWayBillExtendModal from './components/EWayBillExtendModal';
import EWayBillPrintModal from './components/EWayBillPrintModal';
import './Documents.css';

export default function EWayBillManagement() {
  const [ewbs, setEwbs] = useState(initialEwbs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEwb, setSelectedEwb] = useState(null);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [vehicleModalEwb, setVehicleModalEwb] = useState(null);
  const [extendModalEwb, setExtendModalEwb] = useState(null);
  const [printModalEwb, setPrintModalEwb] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (ewbNum, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ewbNum.replace(/\s+/g, ''));
    setCopiedId(id);
    showToast(`Copied E-Way Bill #${ewbNum} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered list
  const filteredEwbs = useMemo(() => {
    return ewbs.filter((ewb) => {
      const matchesSearch =
        ewb.ewbNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ewb.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ewb.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ewb.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ewb.documentNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'EXPIRING' && ewb.remainingHours < 8 && ewb.remainingHours > 0) ||
        (statusFilter === 'ACTIVE' && ewb.status.includes('Active')) ||
        (statusFilter === 'MULTIMODAL' && ewb.mode.includes('Rail')) ||
        (statusFilter === 'DELIVERED' && ewb.status.includes('Delivered'));

      return matchesSearch && matchesStatus;
    });
  }, [ewbs, searchQuery, statusFilter]);

  const handleGenerateSuccess = (newEwb) => {
    setEwbs((prev) => [newEwb, ...prev]);
    setIsGenerateOpen(false);
    showToast(`NIC E-Way Bill #${newEwb.ewbNumber} generated successfully!`);
  };

  const handleUpdateVehicleSuccess = (ewbId, vehicleData) => {
    setEwbs((prev) =>
      prev.map((item) =>
        item.id === ewbId
          ? {
              ...item,
              vehicleNumber: vehicleData.vehicleNumber,
              lastVehicleUpdated: `${vehicleData.time} (${vehicleData.reason})`,
            }
          : item
      )
    );
    setVehicleModalEwb(null);
    showToast(`Part-B Vehicle for EWB updated to ${vehicleData.vehicleNumber}`);
  };

  const handleExtendSuccess = (ewbId, extendData) => {
    setEwbs((prev) =>
      prev.map((item) =>
        item.id === ewbId
          ? {
              ...item,
              remainingHours: item.remainingHours + extendData.additionalHours,
              status: `Active Extended (+${extendData.additionalHours}h)`,
              urgencyClass: 'yellow',
              extensionsUsed: (item.extensionsUsed || 0) + 1,
            }
          : item
      )
    );
    setExtendModalEwb(null);
    showToast(`E-Way Bill validity extended by +${extendData.additionalHours} hours under Rule 138(10).`);
  };

  const handleCancelEwb = (ewb, e) => {
    e.stopPropagation();
    const reason = prompt('Enter NIC Reason for Cancellation (e.g., Order Cancelled, Duplicate EWB):');
    if (!reason) return;

    setEwbs((prev) =>
      prev.map((item) =>
        item.id === ewb.id
          ? {
              ...item,
              status: 'Cancelled (24h Window)',
              urgencyClass: 'gray',
              remainingHours: 0,
            }
          : item
      )
    );
    showToast(`E-Way Bill #${ewb.ewbNumber} cancelled on NIC Gateway: ${reason}`);
  };

  return (
    <Layout
      title="NIC E-Way Bill Management"
      breadcrumbs={[{ label: 'Documents', path: '/documents' }, { label: 'E-Way Bill' }]}
    >
      <div className="documents-page-container">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              background: '#1e293b',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              fontSize: '13px',
              fontWeight: 700,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <CheckCircle2 size={16} color="#10b981" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header Row */}
        <div className="documents-header-row">
          <div>
            <div className="documents-badge">
              <Truck size={14} />
              <span>National Informatics Centre (NIC) GST Gateway</span>
            </div>
            <h1 className="documents-title">E-Way Bill Automation & Part-B Lifecycle</h1>
            <p className="documents-subtitle">
              Real-time generation, Part-B vehicle transshipment updates, Rule 138(10) validity extension, and consolidated bills.
            </p>
          </div>

          <div className="documents-header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => showToast('Consolidated E-Way Bill wizard launched for 8 active trips.')}
            >
              <Layers size={16} />
              <span>Consolidate EWBs</span>
            </button>
            <button className="btn btn-primary" onClick={() => setIsGenerateOpen(true)}>
              <Plus size={16} />
              <span>Generate E-Way Bill</span>
            </button>
          </div>
        </div>

        {/* Stat KPI Grid */}
        <div className="documents-stats-grid">
          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Active E-Way Bills</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <Truck size={18} />
              </div>
            </div>
            <div className="stat-main-val">{ewayBillsSummaryStats.activeEwayBills}</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <ShieldCheck size={14} />
              <span>Total Value: {ewayBillsSummaryStats.totalFreightValueTransit}</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Expiring in &lt; 8 Hours</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-main-val" style={{ color: '#dc2626' }}>
              {ewayBillsSummaryStats.expiringInUnder8Hours}
            </div>
            <div className="stat-footer-text" style={{ color: '#dc2626' }}>
              <span>Action required: Extend Part-B</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Multimodal In-Transit</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Layers size={18} />
              </div>
            </div>
            <div className="stat-main-val">{ewayBillsSummaryStats.multimodalInTransit}</div>
            <div className="stat-footer-text" style={{ color: '#059669' }}>
              <span>Rail (CONCOR) + Road transshipment</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Consolidated EWBs</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                <FileText size={18} />
              </div>
            </div>
            <div className="stat-main-val">{ewayBillsSummaryStats.consolidatedGenerated}</div>
            <div className="stat-footer-text" style={{ color: '#8b5cf6' }}>
              <span>Multi-order single vehicle loads</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="documents-filter-bar">
          <div className="filter-search-box">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search by 12-digit EWB, Vehicle Plate, Consignor, Consignee, or Invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          <div className="filter-selects-group">
            <div className="filter-select-wrapper">
              <Filter size={14} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All E-Way Bills</option>
                <option value="EXPIRING">Expiring Soon (&lt; 8 Hours)</option>
                <option value="ACTIVE">Active In-Transit</option>
                <option value="MULTIMODAL">Multimodal (Rail/Road)</option>
                <option value="DELIVERED">Delivered & Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* E-Way Bill Table */}
        <div className="documents-table-card">
          <div className="documents-table-wrapper">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>E-Way Bill Number</th>
                  <th>Validity Countdown</th>
                  <th>Part-A: Supplier & Recipient</th>
                  <th>Part-B: Vehicle & Mode</th>
                  <th>Value (₹)</th>
                  <th>Distance / Route</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEwbs.map((ewb) => {
                  const isCopied = copiedId === ewb.id;
                  const pctRemaining = Math.min(100, Math.max(0, (ewb.remainingHours / 72) * 100));

                  return (
                    <tr
                      key={ewb.id}
                      onClick={() => setPrintModalEwb(ewb)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="ewb-pill">{ewb.ewbNumber}</span>
                          <button
                            className="btn-icon"
                            onClick={(e) => handleCopy(ewb.ewbNumber, ewb.id, e)}
                            title="Copy 12-digit EWB Number"
                          >
                            {isCopied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          Doc: {ewb.documentNo} ({ewb.documentDate})
                        </div>
                      </td>

                      <td>
                        <div className="validity-countdown-box">
                          <div className="validity-text">
                            <span>{ewb.remainingHours > 0 ? `${ewb.remainingHours}h remaining` : 'Expired'}</span>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>
                              {ewb.validUntil.substring(5, 16)}
                            </span>
                          </div>
                          <div className="validity-bar">
                            <div
                              className={`validity-fill ${ewb.urgencyClass}`}
                              style={{ width: `${pctRemaining}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>{ewb.supplierName}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          → {ewb.recipientName}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 800, color: '#2563eb', fontFamily: 'monospace' }}>
                            {ewb.vehicleNumber}
                          </span>
                          <button
                            className="btn btn-secondary btn-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVehicleModalEwb(ewb);
                            }}
                            title="Update Part-B Vehicle"
                          >
                            <ArrowRightLeft size={12} />
                            <span>Change</span>
                          </button>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          Mode: {ewb.mode}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 800, fontSize: '13px' }}>
                          ₹ {ewb.totalValue.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{ewb.calculatedDistanceKm} km</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {ewb.fromPin} → {ewb.toPin}
                        </div>
                      </td>

                      <td>
                        <span className={`doc-status-pill ${ewb.urgencyClass === 'green' ? 'verified' : ewb.urgencyClass === 'red' ? 'flagged' : 'expiring'}`}>
                          {ewb.status}
                        </span>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setPrintModalEwb(ewb)}
                            title="View / Print Official NIC E-Way Bill"
                          >
                            <Printer size={14} />
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setExtendModalEwb(ewb)}
                            title="Extend Validity under Rule 138(10)"
                          >
                            <Clock size={14} />
                            <span>Extend</span>
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => handleCancelEwb(ewb, e)}
                            title="Cancel E-Way Bill (24h Window)"
                            style={{ color: '#ef4444' }}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {isGenerateOpen && (
          <EWayBillGenerateModal
            isOpen={isGenerateOpen}
            onClose={() => setIsGenerateOpen(false)}
            onGenerate={handleGenerateSuccess}
          />
        )}

        {vehicleModalEwb && (
          <EWayBillVehicleModal
            ewb={vehicleModalEwb}
            onClose={() => setVehicleModalEwb(null)}
            onUpdateVehicle={handleUpdateVehicleSuccess}
          />
        )}

        {extendModalEwb && (
          <EWayBillExtendModal
            ewb={extendModalEwb}
            onClose={() => setExtendModalEwb(null)}
            onExtend={handleExtendSuccess}
          />
        )}

        {printModalEwb && (
          <EWayBillPrintModal
            ewb={printModalEwb}
            onClose={() => setPrintModalEwb(null)}
          />
        )}
      </div>
    </Layout>
  );
}
