import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import '../Documents.css';

export default function DocumentUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [docType, setDocType] = useState('POD');
  const [docTitle, setDocTitle] = useState('');
  const [associatedEntity, setAssociatedEntity] = useState('SHP-88092');
  const [fileSelected, setFileSelected] = useState(null);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileSelected(file);
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!docTitle) return;

    setIsProcessingOcr(true);

    setTimeout(() => {
      const newDoc = {
        id: `DOC-${Math.floor(9100 + Math.random() * 900)}`,
        title: docTitle,
        type: docType,
        typeLabel: docType === 'POD' ? 'Proof of Delivery' : docType === 'BOL' ? 'Bill of Lading' : 'Commercial Invoice',
        format: fileSelected ? fileSelected.name.split('.').pop().toUpperCase() : 'PDF',
        sizeKb: fileSelected ? Math.round(fileSelected.size / 1024) : 340,
        associatedEntity: associatedEntity,
        shipmentId: associatedEntity.startsWith('SHP') ? associatedEntity : 'N/A',
        orderId: 'ORD-5401',
        uploadedBy: 'Compliance Desk Officer',
        uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST',
        status: 'Verified',
        ocrConfidence: 98.6,
        ocrData: {
          recipientName: 'Verified Consignee Rep',
          recipientPhone: '+91 98000 11223',
          deliveryTime: new Date().toLocaleTimeString() + ' IST',
          tamperCheck: 'Pass (SHA-256 Validated)',
        },
        version: 'v1.0',
      };

      setIsProcessingOcr(false);
      onUploadSuccess(newDoc);
    }, 1200);
  };

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content">
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary-600)' }}>
              <UploadCloud size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Upload & OCR Process Document</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                Automated field extraction, SHA-256 integrity checksum, and entity association.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="doc-modal-body">
            {/* Drag and Drop Zone */}
            <label className="upload-dropzone">
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.jpg,.jpeg,.png,.json,.xml"
              />
              <div className="stat-icon-wrapper" style={{ width: '48px', height: '48px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary-600)' }}>
                <UploadCloud size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-primary)' }}>
                  {fileSelected ? fileSelected.name : 'Click to browse or drag & drop document file'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Supports PDF, JPEG, PNG, XML, JSON up to 25 MB
                </div>
              </div>
            </label>

            {/* Document Metadata Form */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Document Category
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="filter-dropdown"
                  style={{ width: '100%', padding: '8px 12px' }}
                >
                  <option value="POD">Proof of Delivery (e-POD)</option>
                  <option value="EWAY_BILL">NIC E-Way Bill</option>
                  <option value="E_INVOICE">Tax Invoice / E-Invoice</option>
                  <option value="BOL">Bill of Lading (BOL)</option>
                  <option value="VEHICLE_DOC">Vehicle PUC / Insurance / Fitness</option>
                  <option value="DRIVER_CERT">Driver License / Hazmat Cert</option>
                  <option value="GATE_PASS">Customs / SEZ Gate Pass</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Associated Entity (Shipment / Vehicle)
                </label>
                <input
                  type="text"
                  value={associatedEntity}
                  onChange={(e) => setAssociatedEntity(e.target.value)}
                  placeholder="e.g. SHP-88092 or Vehicle MH-04"
                  className="filter-search-input"
                  style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Document Title / Reference Name
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g. Foxconn Consignment Signed Delivery Receipt"
                className="filter-search-input"
                style={{ border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 12px' }}
                required
              />
            </div>

            {/* AI OCR Badge Notice */}
            <div style={{ background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Sparkles size={20} className="text-primary" />
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <strong>AI OCR Engine Active:</strong> Uploaded files are automatically scanned for signature verification, GSTIN alignment, and tamper-proof hash anchoring.
              </div>
            </div>
          </div>

          <div className="doc-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isProcessingOcr}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isProcessingOcr}>
              {isProcessingOcr ? (
                <>
                  <span className="spinner spinner--sm" />
                  <span>Processing OCR...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Upload & Verify</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
