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
} from 'lucide-react';
import { documentsSummaryStats, documentsList as initialDocs } from '../../utils/mockData/documentsData';
import DocumentUploadModal from './components/DocumentUploadModal';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import './Documents.css';

export default function DocumentsList() {
  const [docs, setDocs] = useState(initialDocs);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedDocIds, setSelectedDocIds] = useState([]);
  const [inspectingDoc, setInspectingDoc] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Docs
  const filteredDocs = useMemo(() => {
    return docs.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.associatedEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'ALL' || d.type === typeFilter;
      const matchesStatus = statusFilter === 'ALL' || d.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [docs, searchQuery, typeFilter, statusFilter]);

  const handleSelectAll = () => {
    if (selectedDocIds.length === filteredDocs.length) {
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

  const handleDownload = (doc) => {
    showToast(`Downloading ${doc.title} (${doc.format})...`);
  };

  const handleBulkExport = () => {
    if (selectedDocIds.length === 0) {
      showToast('Please select at least one document for bulk export.');
      return;
    }
    showToast(`Exported ${selectedDocIds.length} compliance documents into encrypted ZIP archive.`);
  };

  return (
    <Layout
      title="Compliance & Digital Documents Vault"
      breadcrumbs={[{ label: 'Documents', path: '/documents' }, { label: 'All Documents' }]}
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
              <FolderOpen size={14} />
              <span>Enterprise Digital Vault & OCR Pipeline</span>
            </div>
            <h1 className="documents-title">Document Repository & Compliance Ledger</h1>
            <p className="documents-subtitle">
              Centralized repository for e-PODs, Bill of Ladings, Customs Gate Passes, and Vehicle Compliance Certifications.
            </p>
          </div>

          <div className="documents-header-actions">
            {selectedDocIds.length > 0 && (
              <button className="btn btn-secondary" onClick={handleBulkExport}>
                <Download size={16} />
                <span>Export Selected ({selectedDocIds.length})</span>
              </button>
            )}
            <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
              <UploadCloud size={16} />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Stat KPI Grid */}
        <div className="documents-stats-grid">
          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Total Documents</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <FolderOpen size={18} />
              </div>
            </div>
            <div className="stat-main-val">{documentsSummaryStats.totalDocuments}</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <ShieldCheck size={14} />
              <span>All encrypted with SHA-256</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">OCR Match Accuracy</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Sparkles size={18} />
              </div>
            </div>
            <div className="stat-main-val">{documentsSummaryStats.ocrVerifiedPct}%</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <span>Auto-extracted manifest fields</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Expiring in 7 Days</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-main-val">{documentsSummaryStats.expiringIn7Days} Docs</div>
            <div className="stat-footer-text" style={{ color: '#d97706' }}>
              <span>Vehicle PUC & Insurance renewals</span>
            </div>
          </div>

          <div className="documents-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Flagged Discrepancies</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="stat-main-val">{documentsSummaryStats.flaggedDiscrepancies} Cases</div>
            <div className="stat-footer-text" style={{ color: '#dc2626' }}>
              <span>Customs weight variations</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="documents-filter-bar">
          <div className="filter-search-box">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search document title, ID, shipment, vehicle, or uploader..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          <div className="filter-selects-group">
            <div className="filter-select-wrapper">
              <Filter size={14} />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Categories</option>
                <option value="POD">Proof of Delivery (e-POD)</option>
                <option value="EWAY_BILL">E-Way Bill</option>
                <option value="E_INVOICE">Tax E-Invoice</option>
                <option value="BOL">Bill of Lading</option>
                <option value="VEHICLE_DOC">Vehicle PUC / Fitness</option>
                <option value="DRIVER_CERT">Driver License / Hazmat</option>
                <option value="GATE_PASS">Customs Gate Pass</option>
              </select>
            </div>

            <div className="filter-select-wrapper">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Statuses</option>
                <option value="VERIFIED">Verified</option>
                <option value="EXPIRING SOON">Expiring Soon</option>
                <option value="FLAGGED DISCREPANCY">Flagged</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Ledger Table */}
        <div className="documents-table-card">
          <div className="documents-table-wrapper">
            <table className="documents-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <button
                      onClick={handleSelectAll}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex' }}
                    >
                      {selectedDocIds.length > 0 && selectedDocIds.length === filteredDocs.length ? (
                        <CheckSquare size={16} color="var(--color-primary-600)" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                  </th>
                  <th>Document ID & Name</th>
                  <th>Category</th>
                  <th>Associated Entity</th>
                  <th>Uploaded By / Date</th>
                  <th>OCR Match</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => {
                  const isSelected = selectedDocIds.includes(doc.id);
                  let statusClass = 'verified';
                  if (doc.status === 'Expiring Soon') statusClass = 'expiring';
                  if (doc.status === 'Flagged Discrepancy') statusClass = 'flagged';

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => setInspectingDoc(doc)}
                      style={{ cursor: 'pointer', background: isSelected ? 'rgba(37, 99, 235, 0.05)' : undefined }}
                    >
                      <td onClick={(e) => handleToggleSelect(doc.id, e)}>
                        {isSelected ? (
                          <CheckSquare size={16} color="var(--color-primary-600)" />
                        ) : (
                          <Square size={16} color="var(--color-text-secondary)" />
                        )}
                      </td>
                      <td>
                        <div className="doc-cell-primary">
                          <div className={`doc-type-icon ${doc.format.toLowerCase()}`}>
                            <FileText size={18} />
                          </div>
                          <div>
                            <div className="doc-title-text">{doc.title}</div>
                            <div className="doc-meta-text">
                              {doc.id} • {doc.sizeKb} KB ({doc.format}) • {doc.version}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {doc.typeLabel}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary-600)' }}>
                          {doc.associatedEntity}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{doc.uploadedBy}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{doc.uploadedAt}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669' }}>
                            {doc.ocrConfidence}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`doc-status-pill ${statusClass}`}>
                          <CheckCircle2 size={12} />
                          <span>{doc.status}</span>
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setInspectingDoc(doc)}
                          >
                            <Eye size={14} />
                            <span>Preview</span>
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleDownload(doc)}
                          >
                            <Download size={14} />
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
        {isUploadOpen && (
          <DocumentUploadModal
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            onUploadSuccess={handleUploadSuccess}
          />
        )}

        {inspectingDoc && (
          <DocumentPreviewModal
            doc={inspectingDoc}
            onClose={() => setInspectingDoc(null)}
            onDownload={handleDownload}
          />
        )}
      </div>
    </Layout>
  );
}
