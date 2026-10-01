import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  FolderOpen,
  FileText,
  UploadCloud,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  ShieldCheck,
  RotateCw,
  Sparkles,
  Layers,
  FileCheck,
  CheckSquare,
  Square,
  FileSpreadsheet,
  HardDrive,
  Check,
  ChevronRight,
  ExternalLink,
  Tag,
  ArrowUpDown,
  MoreVertical,
  X,
  FileCode,
  Image as ImageIcon,
  Activity,
  Calendar,
  User,
  ShieldAlert,
  ChevronLeft,
} from 'lucide-react';
import { documentsSummaryStats, documentsList as initialDocs } from '../../utils/mockData/documentsData';
import DocumentUploadModal from './components/DocumentUploadModal';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import './Documents.css';

export default function DocumentsList() {
  const [docs, setDocs] = useState(initialDocs);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [formatFilter, setFormatFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST');
  const [selectedDocIds, setSelectedDocIds] = useState([]);
  const [inspectingDoc, setInspectingDoc] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Category Tabs Configuration
  const categoryTabs = [
    { id: 'ALL', label: 'All Documents' },
    { id: 'POD', label: 'e-PODs' },
    { id: 'EWAY_BILL', label: 'E-Way Bills' },
    { id: 'E_INVOICE', label: 'Tax Invoices' },
    { id: 'BOL', label: 'Bills of Lading' },
    { id: 'VEHICLE_DOC', label: 'Vehicle Compliance' },
    { id: 'DRIVER_CERT', label: 'Driver Certs' },
    { id: 'TELEMETRY_LOG', label: 'IoT Logs' },
    { id: 'GATE_PASS', label: 'Gate Passes' },
  ];

  // Count items per category
  const tabCounts = useMemo(() => {
    const counts = { ALL: docs.length };
    categoryTabs.forEach((tab) => {
      if (tab.id !== 'ALL') {
        counts[tab.id] = docs.filter((d) => d.type === tab.id).length;
      }
    });
    return counts;
  }, [docs]);

  // Filtered and Sorted Docs
  const filteredDocs = useMemo(() => {
    let result = docs.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.associatedEntity.toLowerCase().includes(q) ||
        d.uploadedBy.toLowerCase().includes(q) ||
        d.format.toLowerCase().includes(q) ||
        (d.shipmentId && d.shipmentId.toLowerCase().includes(q)) ||
        (d.orderId && d.orderId.toLowerCase().includes(q));

      const matchesTab = activeTab === 'ALL' || d.type === activeTab;
      const matchesStatus =
        statusFilter === 'ALL' ||
        d.status.toUpperCase().replace(/\s+/g, '_') === statusFilter.toUpperCase().replace(/\s+/g, '_');
      const matchesFormat = formatFilter === 'ALL' || d.format.toUpperCase() === formatFilter.toUpperCase();

      return matchesSearch && matchesTab && matchesStatus && matchesFormat;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'NEWEST') {
        return new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0);
      }
      if (sortBy === 'OCR_DESC') {
        return b.ocrConfidence - a.ocrConfidence;
      }
      if (sortBy === 'SIZE_DESC') {
        return b.sizeKb - a.sizeKb;
      }
      if (sortBy === 'TITLE_ASC') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [docs, searchQuery, activeTab, statusFilter, formatFilter, sortBy]);

  const handleSelectAll = () => {
    if (selectedDocIds.length === filteredDocs.length && filteredDocs.length > 0) {
      setSelectedDocIds([]);
    } else {
      setSelectedDocIds(filteredDocs.map((d) => d.id));
    }
  };

  const handleToggleSelect = (id, e) => {
    e.stopPropagation();
    if (selectedDocIds.includes(id)) {
      setSelectedDocIds(selectedDocIds.filter((item) => item !== id));
    } else {
      setSelectedDocIds([...selectedDocIds, id]);
    }
  };

  const handleUploadSuccess = (newDoc) => {
    setDocs((prev) => [newDoc, ...prev]);
    setIsUploadOpen(false);
    showToast(`Document ${newDoc.id} uploaded & verified via AI OCR engine!`);
  };

  const handleDownload = (doc, e) => {
    if (e) e.stopPropagation();
    showToast(`Downloading ${doc.title} (${doc.format})...`);
  };

  const handleBulkExport = () => {
    if (selectedDocIds.length === 0) {
      showToast('Please select at least one document for bulk export.');
      return;
    }
    showToast(`Exported ${selectedDocIds.length} compliance documents into encrypted ZIP archive.`);
  };

  const handleBatchVerify = () => {
    showToast(`Re-validated OCR checksums for ${selectedDocIds.length} selected documents.`);
    setSelectedDocIds([]);
  };

  const exportTableCSV = () => {
    const headers = 'Document ID,Title,Type,Format,Size (KB),Associated Entity,Uploaded By,Uploaded At,OCR Confidence %,Status\n';
    const rows = filteredDocs
      .map(
        (d) =>
          `"${d.id}","${d.title}","${d.typeLabel}","${d.format}",${d.sizeKb},"${d.associatedEntity}","${d.uploadedBy}","${d.uploadedAt}",${d.ocrConfidence}%,"${d.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Compliance_Documents_Vault_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Document registry metadata exported to CSV.');
  };

  const getFormatIcon = (format) => {
    switch (format?.toUpperCase()) {
      case 'PDF':
        return <FileText size={16} className="format-icon format-icon--pdf" />;
      case 'JPEG':
      case 'PNG':
      case 'JPG':
        return <ImageIcon size={16} className="format-icon format-icon--img" />;
      case 'JSON':
        return <FileCode size={16} className="format-icon format-icon--json" />;
      default:
        return <FileText size={16} className="format-icon" />;
    }
  };

  const getStatusBadge = (status) => {
    const normalized = (status || '').toLowerCase();
    if (normalized.includes('verified')) {
      return (
        <span className="doc-status-badge doc-status-badge--verified">
          <span className="doc-status-dot doc-status-dot--verified" />
          <span>Verified</span>
        </span>
      );
    }
    if (normalized.includes('expiring')) {
      return (
        <span className="doc-status-badge doc-status-badge--expiring">
          <span className="doc-status-dot doc-status-dot--expiring" />
          <span>Expiring Soon</span>
        </span>
      );
    }
    return (
      <span className="doc-status-badge doc-status-badge--flagged">
        <span className="doc-status-dot doc-status-dot--flagged" />
        <span>Flagged Discrepancy</span>
      </span>
    );
  };

  const getStatusClass = (status) => {
    const normalized = (status || '').toLowerCase();
    if (normalized.includes('verified')) return 'verified';
    if (normalized.includes('expiring')) return 'expiring';
    return 'flagged';
  };

  return (
    <Layout
      title="Compliance & Digital Documents Vault"
      breadcrumbs={[{ label: 'Documents', path: '/documents' }, { label: 'All Documents' }]}
    >
      <div className="documents-page-container">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="doc-toast-notification">
            <CheckCircle2 size={16} color="#10b981" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── 1. Top Header Banner ── */}
        <div className="documents-header-row">
          <div className="documents-header-left">
            <div className="documents-pill-badge">
              <FolderOpen size={13} />
              <span>Digital Compliance Ledger & OCR Engine</span>
              <span className="documents-pill-dot" />
              <span className="documents-pill-sub">SHA-256 Secured</span>
            </div>
            <h1 className="documents-title">Document Repository & Compliance Vault</h1>
            <p className="documents-subtitle">
              Centralized enterprise ledger for electronic Proof of Deliveries (e-PODs), NIC GST E-Way Bills, IRP E-Invoices, and carrier fleet certifications.
            </p>
          </div>

          <div className="documents-header-actions">
            <button className="doc-btn doc-btn--secondary" onClick={exportTableCSV} title="Export CSV Report">
              <FileSpreadsheet size={15} className="text-emerald-500" />
              <span>Export CSV</span>
            </button>
            <button className="doc-btn doc-btn--secondary" onClick={() => showToast('Syncing with NIC E-Way Bill & IRP servers...')} title="Refresh Sync">
              <RotateCw size={15} />
              <span>Sync Portal</span>
            </button>
            <button className="doc-btn doc-btn--primary" onClick={() => setIsUploadOpen(true)}>
              <UploadCloud size={16} />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* ── 2. Stat KPI Cards Grid ── */}
        <div className="documents-stats-grid">
          {/* Total Documents */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Total Documents</span>
              <div className="stat-icon-wrapper stat-icon--blue">
                <FolderOpen size={18} />
              </div>
            </div>
            <div className="stat-card-value">
              {documentsSummaryStats.totalDocuments.toLocaleString()}
            </div>
            <div className="stat-card-footer">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="stat-footer-text text-emerald-600">
                {documentsSummaryStats.storageUsedGb} GB / {documentsSummaryStats.totalStorageCapacityGb} GB used
              </span>
            </div>
          </div>

          {/* OCR Match Accuracy */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">OCR Match Accuracy</span>
              <div className="stat-icon-wrapper stat-icon--emerald">
                <Sparkles size={18} />
              </div>
            </div>
            <div className="stat-card-value">
              {documentsSummaryStats.ocrVerifiedPct}%
            </div>
            <div className="stat-card-footer">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="stat-footer-text text-emerald-600">
                1,405 docs auto-reconciled
              </span>
            </div>
          </div>

          {/* Expiring in 7 Days */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Expiring in 7 Days</span>
              <div className="stat-icon-wrapper stat-icon--amber">
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-card-value stat-card-value--amber">
              {documentsSummaryStats.expiringIn7Days} <span className="stat-card-unit">Docs</span>
            </div>
            <div className="stat-card-footer">
              <AlertTriangle size={14} className="text-amber-500" />
              <span className="stat-footer-text text-amber-600">
                Vehicle PUC & Insurance renewals
              </span>
            </div>
          </div>

          {/* Flagged Discrepancies */}
          <div className="documents-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Flagged Discrepancies</span>
              <div className="stat-icon-wrapper stat-icon--red">
                <ShieldAlert size={18} />
              </div>
            </div>
            <div className="stat-card-value stat-card-value--red">
              {documentsSummaryStats.flaggedDiscrepancies} <span className="stat-card-unit">Cases</span>
            </div>
            <div className="stat-card-footer">
              <AlertTriangle size={14} className="text-rose-500" />
              <span className="stat-footer-text text-rose-600">
                Customs & weight variations
              </span>
            </div>
          </div>
        </div>

        {/* ── 3. Category Filter Tabs ── */}
        <div className="doc-category-tabs-container">
          <div className="doc-category-tabs">
            {categoryTabs.map((tab) => {
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
                placeholder="Search by Document Title, ID, Shipment, Order, or Uploader..."
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
            {/* Status Filter */}
            <div className="doc-select-box">
              <span className="doc-select-label">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="doc-native-select"
              >
                <option value="ALL">All Statuses</option>
                <option value="VERIFIED">Verified</option>
                <option value="EXPIRING_SOON">Expiring Soon</option>
                <option value="FLAGGED_DISCREPANCY">Flagged</option>
              </select>
            </div>

            {/* Format Filter */}
            <div className="doc-select-box">
              <span className="doc-select-label">Format:</span>
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="doc-native-select"
              >
                <option value="ALL">All Formats</option>
                <option value="PDF">PDF</option>
                <option value="JPEG">JPEG</option>
                <option value="JSON">JSON</option>
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
                <option value="NEWEST">Newest Uploads</option>
                <option value="OCR_DESC">Highest OCR Accuracy</option>
                <option value="SIZE_DESC">File Size (Large → Small)</option>
                <option value="TITLE_ASC">Title (A → Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── 5. Bulk Selection Floating Action Bar ── */}
        {selectedDocIds.length > 0 && (
          <div className="doc-bulk-action-bar">
            <div className="doc-bulk-info">
              <span className="doc-bulk-count-badge">{selectedDocIds.length}</span>
              <span className="doc-bulk-text">Documents Selected</span>
            </div>
            <div className="doc-bulk-buttons">
              <button className="doc-bulk-btn doc-bulk-btn--primary" onClick={handleBulkExport}>
                <Download size={14} />
                <span>Export ZIP Archive ({selectedDocIds.length})</span>
              </button>
              <button className="doc-bulk-btn doc-bulk-btn--secondary" onClick={handleBatchVerify}>
                <ShieldCheck size={14} />
                <span>Verify OCR Hashes</span>
              </button>
              <button className="doc-bulk-btn doc-bulk-btn--ghost" onClick={() => setSelectedDocIds([])}>
                <X size={14} />
                <span>Clear Selection</span>
              </button>
            </div>
          </div>
        )}

        {/* ── 6. Master Documents Ledger Table ── */}
        <div className="doc-table-card">
          <div className="doc-table-header-bar">
            <div className="doc-table-header-title-group">
              <h3 className="doc-table-header-title">Document Ledger Registry</h3>
              <span className="doc-table-header-count">
                {filteredDocs.length} {filteredDocs.length === 1 ? 'record' : 'records'} found
              </span>
            </div>
            <div className="doc-table-header-aux">
              <span className="doc-live-dot" />
              <span className="doc-live-text">Real-time sync active</span>
            </div>
          </div>

          <div className="doc-table-responsive-wrapper">
            <table className="doc-enterprise-table" aria-label="Digital Documents Vault">
              <thead>
                <tr>
                  <th className="doc-th-select">
                    <button
                      onClick={handleSelectAll}
                      className="doc-checkbox-btn"
                      title={selectedDocIds.length === filteredDocs.length && filteredDocs.length > 0 ? 'Deselect All' : 'Select All'}
                    >
                      {selectedDocIds.length > 0 && selectedDocIds.length === filteredDocs.length ? (
                        <CheckSquare size={16} className="text-blue-600" />
                      ) : selectedDocIds.length > 0 ? (
                        <div className="doc-checkbox-indeterminate" />
                      ) : (
                        <Square size={16} className="text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th className="doc-th-doc">Document & ID</th>
                  <th className="doc-th-cat">Category</th>
                  <th className="doc-th-entity">Associated Entity</th>
                  <th className="doc-th-uploader">Uploaded By</th>
                  <th className="doc-th-ocr">AI OCR Match</th>
                  <th className="doc-th-status">Status</th>
                  <th className="doc-th-size">Size & Type</th>
                  <th className="doc-th-actions text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="doc-empty-td">
                      <div className="doc-empty-state">
                        <FolderOpen size={40} className="doc-empty-icon" />
                        <h4 className="doc-empty-title">No documents found</h4>
                        <p className="doc-empty-desc">
                          No compliance files matched your search query or selected filters. Try broadening your criteria.
                        </p>
                        <button
                          className="doc-btn doc-btn--secondary doc-btn--sm mt-3"
                          onClick={() => {
                            setSearchQuery('');
                            setActiveTab('ALL');
                            setStatusFilter('ALL');
                            setFormatFilter('ALL');
                          }}
                        >
                          Reset All Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc, index) => {
                    const isSelected = selectedDocIds.includes(doc.id);
                    const statusClass = getStatusClass(doc.status);

                    return (
                      <tr
                        key={doc.id}
                        className={`doc-row ${isSelected ? 'doc-row--selected' : ''}`}
                        style={{ '--row-index': index }}
                        onClick={() => setInspectingDoc(doc)}
                      >
                        {/* Checkbox */}
                        <td className="doc-td-select" onClick={(e) => handleToggleSelect(doc.id, e)}>
                          <button className="doc-checkbox-btn">
                            {isSelected ? (
                              <CheckSquare size={16} className="text-blue-600" />
                            ) : (
                              <Square size={16} className="text-slate-300 group-hover:text-slate-400" />
                            )}
                          </button>
                        </td>

                        {/* Document Title, ID, Format */}
                        <td className="doc-td-doc">
                          <div className="doc-primary-cell">
                            {/* Status vertical indicator */}
                            <span className={`doc-indicator-strip doc-indicator-strip--${statusClass}`} />
                            
                            {/* Format Icon Badge */}
                            <div className={`doc-format-badge doc-format-badge--${doc.format?.toLowerCase()}`}>
                              {getFormatIcon(doc.format)}
                            </div>

                            <div className="doc-title-stack">
                              <div className="doc-title-row">
                                <span className="doc-title-heading">{doc.title}</span>
                                <span className="doc-version-tag">{doc.version}</span>
                              </div>
                              <div className="doc-meta-row">
                                <span className="doc-id-pill">{doc.id}</span>
                                <span className="doc-bullet">•</span>
                                <span className="doc-format-tag">{doc.format}</span>
                                <span className="doc-bullet">•</span>
                                <span className="doc-size-text">{doc.sizeKb} KB</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="doc-td-cat">
                          <span className={`doc-category-badge doc-category-badge--${doc.type?.toLowerCase()}`}>
                            {doc.typeLabel}
                          </span>
                        </td>

                        {/* Associated Entity / Shipment */}
                        <td className="doc-td-entity">
                          <div className="doc-entity-stack">
                            <span className="doc-entity-main">{doc.associatedEntity}</span>
                            {doc.shipmentId && doc.shipmentId !== 'N/A' && (
                              <span className="doc-entity-sub">
                                Shipment: <strong>{doc.shipmentId}</strong>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Uploaded By / Date */}
                        <td className="doc-td-uploader">
                          <div className="doc-uploader-cell">
                            <div className="doc-uploader-avatar">
                              {doc.uploadedBy.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="doc-uploader-info">
                              <span className="doc-uploader-name">{doc.uploadedBy}</span>
                              <span className="doc-uploader-time">{doc.uploadedAt}</span>
                            </div>
                          </div>
                        </td>

                        {/* AI OCR Confidence */}
                        <td className="doc-td-ocr">
                          <div className="doc-ocr-cell">
                            <div className="doc-ocr-score-row">
                              <span className="doc-ocr-score-val">{doc.ocrConfidence}%</span>
                              <Sparkles size={12} className="text-emerald-500" />
                            </div>
                            <div className="doc-ocr-track">
                              <div
                                className="doc-ocr-fill"
                                style={{ width: `${Math.min(100, Math.max(0, doc.ocrConfidence))}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Status Pill */}
                        <td className="doc-td-status">
                          {getStatusBadge(doc.status)}
                        </td>

                        {/* Size & Format */}
                        <td className="doc-td-size">
                          <div className="doc-size-stack">
                            <span className="doc-size-kb">{doc.sizeKb} KB</span>
                            <span className="doc-format-label">{doc.format} file</span>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="doc-td-actions" onClick={(e) => e.stopPropagation()}>
                          <div className="doc-action-btn-group">
                            <button
                              className="doc-action-btn doc-action-btn--preview"
                              onClick={() => setInspectingDoc(doc)}
                              title="Inspect Extracted Metadata & Preview"
                            >
                              <Eye size={14} />
                              <span>Preview</span>
                            </button>
                            <button
                              className="doc-action-btn doc-action-btn--download"
                              onClick={(e) => handleDownload(doc, e)}
                              title="Download Raw File"
                            >
                              <Download size={14} />
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
                Showing <strong>1–{filteredDocs.length}</strong> of <strong>{documentsSummaryStats.totalDocuments.toLocaleString()}</strong> documents
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
                  <option value={100}>100</option>
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
                  Page <strong>{currentPage}</strong> of <strong>143</strong>
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

        {/* ── 8. Upload Modal ── */}
        {isUploadOpen && (
          <DocumentUploadModal
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            onUploadSuccess={handleUploadSuccess}
          />
        )}

        {/* ── 9. Detail & Preview Modal ── */}
        {inspectingDoc && (
          <DocumentPreviewModal
            doc={inspectingDoc}
            onClose={() => setInspectingDoc(null)}
            onDownload={(doc) => handleDownload(doc)}
          />
        )}
      </div>
    </Layout>
  );
}
