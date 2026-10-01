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
  FileSpreadsheet,
  Square,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  QrCode,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Eye,
  Calendar,
  Compass,
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
  const [activeTab, setActiveTab] = useState('ALL');
  const [modeFilter, setModeFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('EXPIRY_ASC');
  const [selectedEwbIds, setSelectedEwbIds] = useState([]);
  const [selectedEwb, setSelectedEwb] = useState(null);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [vehicleModalEwb, setVehicleModalEwb] = useState(null);
  const [extendModalEwb, setExtendModalEwb] = useState(null);
  const [printModalEwb, setPrintModalEwb] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (ewbNum, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ewbNum.replace(/\s+/g, ''));
    setCopiedId(id);
    showToast(`Copied 12-digit EWB #${ewbNum} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Status Filter Tabs
  const statusTabs = [
    { id: 'ALL', label: 'All E-Way Bills' },
    { id: 'EXPIRING', label: 'Expiring Soon (< 8h)' },
    { id: 'ACTIVE', label: 'Active In-Transit' },
    { id: 'MULTIMODAL', label: 'Multimodal (Rail/Road)' },
    { id: 'DELIVERED', label: 'Delivered & Closed' },
  ];

  // Dynamic Tab Counts
  const tabCounts = useMemo(() => {
    return {
      ALL: ewbs.length,
      EXPIRING: ewbs.filter((e) => e.remainingHours < 8 && e.remainingHours > 0).length,
      ACTIVE: ewbs.filter((e) => e.status.includes('Active')).length,
      MULTIMODAL: ewbs.filter((e) => e.mode.includes('Rail') || e.mode.includes('Multimodal')).length,
      DELIVERED: ewbs.filter((e) => e.status.includes('Delivered')).length,
    };
  }, [ewbs]);

  // Filtered and Sorted list
  const filteredEwbs = useMemo(() => {
    let result = ewbs.filter((ewb) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ewb.ewbNumber.toLowerCase().includes(q) ||
        ewb.vehicleNumber.toLowerCase().includes(q) ||
        ewb.supplierName.toLowerCase().includes(q) ||
        ewb.recipientName.toLowerCase().includes(q) ||
        ewb.supplierGstin.toLowerCase().includes(q) ||
        ewb.recipientGstin.toLowerCase().includes(q) ||
        ewb.documentNo.toLowerCase().includes(q) ||
        (ewb.shipmentId && ewb.shipmentId.toLowerCase().includes(q));

      const matchesTab =
        activeTab === 'ALL' ||
        (activeTab === 'EXPIRING' && ewb.remainingHours < 8 && ewb.remainingHours > 0) ||
        (activeTab === 'ACTIVE' && ewb.status.includes('Active')) ||
        (activeTab === 'MULTIMODAL' && (ewb.mode.includes('Rail') || ewb.mode.includes('Multimodal'))) ||
        (activeTab === 'DELIVERED' && ewb.status.includes('Delivered'));

      const matchesMode =
        modeFilter === 'ALL' ||
        (modeFilter === 'ROAD' && ewb.mode === 'Road') ||
        (modeFilter === 'RAIL' && (ewb.mode.includes('Rail') || ewb.mode.includes('Multimodal'))) ||
        (modeFilter === 'AIR' && ewb.mode.includes('Air'));

      const matchesUrgency =
        urgencyFilter === 'ALL' ||
        (urgencyFilter === 'CRITICAL' && ewb.remainingHours < 8 && ewb.remainingHours > 0) ||
        (urgencyFilter === 'WARNING' && ewb.remainingHours >= 8 && ewb.remainingHours <= 24) ||
        (urgencyFilter === 'HEALTHY' && ewb.remainingHours > 24);

      return matchesSearch && matchesTab && matchesMode && matchesUrgency;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'EXPIRY_ASC') {
        return a.remainingHours - b.remainingHours;
      }
      if (sortBy === 'VALUE_DESC') {
        return b.totalValue - a.totalValue;
      }
      if (sortBy === 'NEWEST') {
        return new Date(b.generatedDate || 0) - new Date(a.generatedDate || 0);
      }
      if (sortBy === 'DISTANCE_DESC') {
        return b.calculatedDistanceKm - a.calculatedDistanceKm;
      }
      return 0;
    });

    return result;
  }, [ewbs, searchQuery, activeTab, modeFilter, urgencyFilter, sortBy]);

  const handleSelectAll = () => {
    if (selectedEwbIds.length === filteredEwbs.length && filteredEwbs.length > 0) {
      setSelectedEwbIds([]);
    } else {
      setSelectedEwbIds(filteredEwbs.map((e) => e.id));
    }
  };

  const handleToggleSelect = (id, e) => {
    e.stopPropagation();
    if (selectedEwbIds.includes(id)) {
      setSelectedEwbIds(selectedEwbIds.filter((item) => item !== id));
    } else {
      setSelectedEwbIds([...selectedEwbIds, id]);
    }
  };

  const handleGenerateSuccess = (newEwb) => {
    setEwbs((prev) => [newEwb, ...prev]);
    setIsGenerateOpen(false);
    showToast(`NIC E-Way Bill #${newEwb.ewbNumber} generated & registered on GST Portal!`);
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
    const reason = window.prompt('Enter NIC Reason for Cancellation (e.g., Order Cancelled, Duplicate EWB):');
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

  const exportEwbLedgerCSV = () => {
    const headers = 'EWB Number,Doc No,Doc Date,Supplier,Supplier GSTIN,Recipient,Recipient GSTIN,Vehicle No,Mode,Total Value (INR),Distance (KM),Valid Until,Status\n';
    const rows = filteredEwbs
      .map(
        (e) =>
          `"${e.ewbNumber}","${e.documentNo}","${e.documentDate}","${e.supplierName}","${e.supplierGstin}","${e.recipientName}","${e.recipientGstin}","${e.vehicleNumber}","${e.mode}",${e.totalValue},${e.calculatedDistanceKm},"${e.validUntil}","${e.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NIC_EWay_Bills_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Exported E-Way Bill registry CSV report.');
  };

  const handleBulkPrint = () => {
    if (selectedEwbIds.length === 0) return;
    showToast(`Preparing print batch for ${selectedEwbIds.length} official NIC E-Way Bills...`);
  };

  const handleBulkExtend = () => {
    if (selectedEwbIds.length === 0) return;
    showToast(`Bulk extension requested for ${selectedEwbIds.length} E-Way Bills.`);
  };

  const getStatusBadge = (ewb) => {
    const status = ewb.status.toLowerCase();
    if (status.includes('cancelled')) {
      return (
        <span className="doc-status-badge doc-status-badge--flagged">
          <span className="doc-status-dot doc-status-dot--flagged" />
          <span>Cancelled</span>
        </span>
      );
    }
    if (status.includes('delivered')) {
      return (
        <span className="doc-status-badge doc-status-badge--verified">
          <span className="doc-status-dot doc-status-dot--verified" />
          <span>Delivered</span>
        </span>
      );
    }
    if (status.includes('extended')) {
      return (
        <span className="doc-status-badge doc-status-badge--expiring">
          <span className="doc-status-dot doc-status-dot--expiring" />
          <span>Extended (+{ewb.extensionsUsed || 1})</span>
        </span>
      );
    }
    if (ewb.remainingHours < 8 && ewb.remainingHours > 0) {
      return (
        <span className="doc-status-badge doc-status-badge--flagged">
          <span className="doc-status-dot doc-status-dot--flagged" />
          <span>Expiring Soon</span>
        </span>
      );
    }
    return (
      <span className="doc-status-badge doc-status-badge--verified">
        <span className="doc-status-dot doc-status-dot--verified" />
        <span>Active In-Transit</span>
      </span>
    );
  };

  const getUrgencyIndicator = (ewb) => {
    if (ewb.remainingHours === 0 || ewb.status.toLowerCase().includes('cancelled')) {
      return 'flagged';
    }
    if (ewb.remainingHours < 8) {
      return 'flagged';
    }
    if (ewb.remainingHours <= 24) {
      return 'expiring';
    }
    return 'verified';
  };

  return (
    <Layout
      title="NIC E-Way Bill Management"
      breadcrumbs={[{ label: 'Documents', path: '/documents' }, { label: 'E-Way Bill' }]}
    >
      <div className="documents-page-container">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="doc-toast-notification">
            <CheckCircle2 size={16} color="#10b981" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── 1. Top Header Row ── */}
        <div className="documents-header-row">
          <div className="documents-header-left">
            <div className="documents-pill-badge">
              <Truck size={13} />
              <span>National Informatics Centre (NIC) GST Gateway</span>
              <span className="documents-pill-dot" />
              <span className="documents-pill-sub">v1.03 API Live</span>
            </div>
            <h1 className="documents-title">E-Way Bill Automation & Part-B Lifecycle</h1>
            <p className="documents-subtitle">
              Automated NIC generation, Part-B multi-modal vehicle transshipment, Rule 138(10) dynamic validity extension, and consolidated trip manifests.
            </p>
          </div>

          <div className="documents-header-actions">
            <button className="doc-btn doc-btn--secondary" onClick={exportEwbLedgerCSV} title="Export EWB CSV">
              <FileSpreadsheet size={15} className="text-emerald-500" />
              <span>Export CSV</span>
            </button>
            <button
              className="doc-btn doc-btn--secondary"
              onClick={() => showToast('Consolidated E-Way Bill wizard launched for active vehicle trips.')}
              title="Consolidate Multiple Orders"
            >
              <Layers size={15} />
              <span>Consolidate EWBs</span>
            </button>
            <button
              className="doc-btn doc-btn--secondary"
              onClick={() => showToast('Synced latest Part-B status with NIC portal.')}
              title="Refresh Sync"
            >
              <RefreshCw size={15} />
              <span>Sync Portal</span>
            </button>
            <button className="doc-btn doc-btn--primary" onClick={() => setIsGenerateOpen(true)}>
              <Plus size={16} />
              <span>Generate E-Way Bill</span>
            </button>
          </div>
        </div>

        {/* ── 2. Stat KPI Cards Grid ── */}
        <div className="documents-stats-grid">
          {/* Active E-Way Bills */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Active E-Way Bills</span>
              <div className="stat-icon-wrapper stat-icon--blue">
                <Truck size={18} />
              </div>
            </div>
            <div className="stat-card-value">
              {ewayBillsSummaryStats.activeEwayBills.toLocaleString()}
            </div>
            <div className="stat-card-footer">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="stat-footer-text text-emerald-600">
                In-Transit: {ewayBillsSummaryStats.totalFreightValueTransit}
              </span>
            </div>
          </div>

          {/* Expiring in < 8 Hours */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Expiring in &lt; 8 Hours</span>
              <div className="stat-icon-wrapper stat-icon--red">
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-card-value stat-card-value--red">
              {ewayBillsSummaryStats.expiringInUnder8Hours} <span className="stat-card-unit">EWBs</span>
            </div>
            <div className="stat-card-footer">
              <AlertTriangle size={14} className="text-rose-500" />
              <span className="stat-footer-text text-rose-600">
                Action: Extend under Rule 138(10)
              </span>
            </div>
          </div>

          {/* Multimodal In-Transit */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Multimodal In-Transit</span>
              <div className="stat-icon-wrapper stat-icon--emerald">
                <Layers size={18} />
              </div>
            </div>
            <div className="stat-card-value">
              {ewayBillsSummaryStats.multimodalInTransit} <span className="stat-card-unit">Trips</span>
            </div>
            <div className="stat-card-footer">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="stat-footer-text text-emerald-600">
                CONCOR Rail + Dedicated Road
              </span>
            </div>
          </div>

          {/* Consolidated Master EWBs */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Consolidated Master</span>
              <div className="stat-icon-wrapper stat-icon--amber">
                <FileText size={18} />
              </div>
            </div>
            <div className="stat-card-value stat-card-value--amber">
              {ewayBillsSummaryStats.consolidatedGenerated} <span className="stat-card-unit">Loads</span>
            </div>
            <div className="stat-card-footer">
              <ShieldCheck size={14} className="text-amber-500" />
              <span className="stat-footer-text text-amber-600">
                Multi-order single vehicle loads
              </span>
            </div>
          </div>
        </div>

        {/* ── 3. Category / Status Tabs ── */}
        <div className="doc-category-tabs-container">
          <div className="doc-category-tabs">
            {statusTabs.map((tab) => {
              const count = tabCounts[tab.id] || 0;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`doc-tab-btn ${isActive ? 'doc-tab-btn--active' : ''}`}
                >
                  <span>{tab.label}</span>
                  <span className={`doc-tab-count ${isActive ? 'doc-tab-count--active' : ''}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4. Search & Multifaceted Filter Toolbar ── */}
        <div className="doc-toolbar-card">
          <div className="doc-toolbar-left">
            <div className="doc-search-wrapper">
              <Search size={15} className="doc-search-icon" />
              <input
                type="text"
                placeholder="Search by 12-digit EWB, Vehicle Plate, Supplier, Recipient, GSTIN, or Invoice..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="doc-search-input"
              />
              {searchQuery && (
                <button className="doc-search-clear" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="doc-toolbar-right">
            {/* Transport Mode */}
            <div className="doc-select-box">
              <span className="doc-select-label">Mode:</span>
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="doc-native-select"
              >
                <option value="ALL">All Modes</option>
                <option value="ROAD">Road Transport</option>
                <option value="RAIL">Rail / Multimodal</option>
                <option value="AIR">Air Cargo</option>
              </select>
            </div>

            {/* Urgency Filter */}
            <div className="doc-select-box">
              <span className="doc-select-label">Validity:</span>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="doc-native-select"
              >
                <option value="ALL">All Validity Windows</option>
                <option value="CRITICAL">Critical (&lt; 8 Hours)</option>
                <option value="WARNING">Warning (8–24 Hours)</option>
                <option value="HEALTHY">Healthy (&gt; 24 Hours)</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="doc-select-box">
              <span className="doc-select-label">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="doc-native-select"
              >
                <option value="EXPIRY_ASC">Validity Remaining (Lowest First)</option>
                <option value="VALUE_DESC">Consignment Value (High → Low)</option>
                <option value="NEWEST">Generation Date (Newest First)</option>
                <option value="DISTANCE_DESC">Distance (Longest First)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── 5. Bulk Selection Floating Action Bar ── */}
        {selectedEwbIds.length > 0 && (
          <div className="doc-bulk-action-bar">
            <div className="doc-bulk-info">
              <span className="doc-bulk-count-badge">{selectedEwbIds.length}</span>
              <span className="doc-bulk-text">E-Way Bills Selected</span>
            </div>
            <div className="doc-bulk-buttons">
              <button className="doc-bulk-btn doc-bulk-btn--primary" onClick={handleBulkPrint}>
                <Printer size={14} />
                <span>Batch Print Official PDFs ({selectedEwbIds.length})</span>
              </button>
              <button className="doc-bulk-btn doc-bulk-btn--secondary" onClick={handleBulkExtend}>
                <Clock size={14} />
                <span>Bulk Extend (+24h)</span>
              </button>
              <button className="doc-bulk-btn doc-bulk-btn--ghost" onClick={() => setSelectedEwbIds([])}>
                <X size={14} />
                <span>Clear Selection</span>
              </button>
            </div>
          </div>
        )}

        {/* ── 6. Master E-Way Bill Table Card ── */}
        <div className="doc-table-card">
          <div className="doc-table-header-bar">
            <div className="doc-table-header-title-group">
              <h3 className="doc-table-header-title">E-Way Bill Ledger & Part-B Manifest</h3>
              <span className="doc-table-header-count">
                {filteredEwbs.length} {filteredEwbs.length === 1 ? 'EWB' : 'EWBs'} in registry
              </span>
            </div>
            <div className="doc-table-header-aux">
              <span className="doc-live-dot" />
              <span className="doc-live-text">NIC Live Sync Active</span>
            </div>
          </div>

          <div className="doc-table-responsive-wrapper">
            <table className="doc-enterprise-table" aria-label="NIC E-Way Bills Ledger">
              <thead>
                <tr>
                  <th className="doc-th-select">
                    <button
                      onClick={handleSelectAll}
                      className="doc-checkbox-btn"
                      title={selectedEwbIds.length === filteredEwbs.length && filteredEwbs.length > 0 ? 'Deselect All' : 'Select All'}
                    >
                      {selectedEwbIds.length > 0 && selectedEwbIds.length === filteredEwbs.length ? (
                        <CheckSquare size={16} className="text-blue-600" />
                      ) : selectedEwbIds.length > 0 ? (
                        <div className="doc-checkbox-indeterminate" />
                      ) : (
                        <Square size={16} className="text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th>E-Way Bill & Invoice</th>
                  <th>Validity Countdown</th>
                  <th>Part-A: Consignor → Consignee</th>
                  <th>Part-B: Vehicle & Mode</th>
                  <th>Consignment Value (₹)</th>
                  <th>Distance / Route</th>
                  <th>Status</th>
                  <th className="text-right" style={{ paddingRight: 20 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEwbs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="doc-empty-td">
                      <div className="doc-empty-state">
                        <Truck size={40} className="doc-empty-icon" />
                        <h4 className="doc-empty-title">No E-Way Bills found</h4>
                        <p className="doc-empty-desc">
                          No active or in-transit E-Way Bills match your current filters.
                        </p>
                        <button
                          className="doc-btn doc-btn--secondary doc-btn--sm mt-3"
                          onClick={() => {
                            setSearchQuery('');
                            setActiveTab('ALL');
                            setModeFilter('ALL');
                            setUrgencyFilter('ALL');
                          }}
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEwbs.map((ewb, index) => {
                    const isSelected = selectedEwbIds.includes(ewb.id);
                    const isCopied = copiedId === ewb.id;
                    const pctRemaining = Math.min(100, Math.max(0, (ewb.remainingHours / 72) * 100));
                    const urgencyClass = getUrgencyIndicator(ewb);

                    return (
                      <tr
                        key={ewb.id}
                        className={`doc-row ${isSelected ? 'doc-row--selected' : ''}`}
                        style={{ '--row-index': index }}
                        onClick={() => setPrintModalEwb(ewb)}
                      >
                        {/* Checkbox */}
                        <td className="doc-td-select" onClick={(e) => handleToggleSelect(ewb.id, e)}>
                          <button className="doc-checkbox-btn">
                            {isSelected ? (
                              <CheckSquare size={16} className="text-blue-600" />
                            ) : (
                              <Square size={16} className="text-slate-300" />
                            )}
                          </button>
                        </td>

                        {/* EWB Number & Document */}
                        <td>
                          <div className="doc-primary-cell">
                            <span className={`doc-indicator-strip doc-indicator-strip--${urgencyClass}`} />
                            <div className="doc-title-stack">
                              <div className="doc-title-row">
                                <span className="ewb-pill">{ewb.ewbNumber}</span>
                                <button
                                  className="btn-icon"
                                  onClick={(e) => handleCopy(ewb.ewbNumber, ewb.id, e)}
                                  title="Copy EWB Number"
                                >
                                  {isCopied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                                </button>
                              </div>
                              <div className="doc-meta-row">
                                <span className="doc-format-tag">Doc: {ewb.documentNo}</span>
                                <span className="doc-bullet">•</span>
                                <span>{ewb.documentDate}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Validity Countdown */}
                        <td>
                          <div className="validity-countdown-box">
                            <div className="validity-text">
                              <span style={{ fontWeight: 700, color: ewb.remainingHours < 8 ? '#dc2626' : ewb.remainingHours <= 24 ? '#d97706' : '#059669' }}>
                                {ewb.remainingHours > 0 ? `${ewb.remainingHours}h remaining` : 'Expired'}
                              </span>
                              <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace' }}>
                                {ewb.validUntil.substring(5, 16)}
                              </span>
                            </div>
                            <div className="validity-bar">
                              <div
                                className={`validity-fill ${ewb.urgencyClass}`}
                                style={{ width: `${pctRemaining}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Part-A: Consignor → Consignee */}
                        <td>
                          <div className="doc-entity-stack">
                            <span className="doc-entity-main">{ewb.supplierName}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
                              <span>→ {ewb.recipientName}</span>
                            </div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>
                              GSTIN: {ewb.supplierGstin.substring(0, 10)}... → {ewb.recipientGstin.substring(0, 10)}...
                            </div>
                          </div>
                        </td>

                        {/* Part-B: Vehicle & Mode */}
                        <td onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '150px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontWeight: 800, color: '#2563eb', fontFamily: 'ui-monospace, monospace', fontSize: '13px' }}>
                                {ewb.vehicleNumber}
                              </span>
                              <button
                                className="doc-action-btn doc-action-btn--preview"
                                style={{ height: '24px', padding: '0 6px', fontSize: '11px' }}
                                onClick={() => setVehicleModalEwb(ewb)}
                                title="Update Part-B Vehicle Transshipment"
                              >
                                <ArrowRightLeft size={11} />
                                <span>Change</span>
                              </button>
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>Mode: <strong>{ewb.mode}</strong></span>
                            </div>
                          </div>
                        </td>

                        {/* Consignment Value & HSN */}
                        <td>
                          <div className="doc-size-stack">
                            <span style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
                              ₹ {ewb.totalValue.toLocaleString('en-IN')}
                            </span>
                            <span className="doc-format-label">HSN: {ewb.hsnCode}</span>
                          </div>
                        </td>

                        {/* Distance / Route */}
                        <td>
                          <div className="doc-entity-stack">
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                              {ewb.calculatedDistanceKm.toLocaleString()} km
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>
                              PIN: {ewb.fromPin} → {ewb.toPin}
                            </span>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td>
                          {getStatusBadge(ewb)}
                        </td>

                        {/* Quick Actions */}
                        <td onClick={(e) => e.stopPropagation()} style={{ paddingRight: 20 }}>
                          <div className="doc-action-btn-group">
                            <button
                              className="doc-action-btn doc-action-btn--preview"
                              onClick={() => setPrintModalEwb(ewb)}
                              title="View & Print Official NIC Document"
                            >
                              <Printer size={13} />
                              <span>Print</span>
                            </button>
                            <button
                              className="doc-action-btn"
                              onClick={() => setExtendModalEwb(ewb)}
                              title="Extend Validity under Rule 138(10)"
                            >
                              <Clock size={13} />
                              <span>Extend</span>
                            </button>
                            <button
                              className="doc-action-btn"
                              onClick={(e) => handleCancelEwb(ewb, e)}
                              title="Cancel EWB (24h Portal Window)"
                              style={{ color: '#ef4444' }}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── 7. Table Footer & Pagination ── */}
          <div className="doc-table-footer">
            <div className="doc-footer-left">
              <span className="doc-footer-summary">
                Showing <strong>1–{filteredEwbs.length}</strong> of <strong>{ewayBillsSummaryStats.activeEwayBills.toLocaleString()}</strong> active E-Way Bills
              </span>
            </div>

            <div className="doc-footer-right">
              <div className="doc-rows-selector">
                <span className="doc-rows-label">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="doc-rows-select"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="doc-pagination-controls">
                <button
                  className="doc-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="doc-page-indicator">
                  Page <strong>{currentPage}</strong> of <strong>85</strong>
                </span>
                <button
                  className="doc-page-btn"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 8. Modals ── */}
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
