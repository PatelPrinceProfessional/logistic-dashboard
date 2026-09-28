import React from 'react';
import { X, Download, ShieldCheck, CheckCircle2, FileText, ExternalLink, Hash, Clock, User, Layers } from 'lucide-react';
import '../Documents.css';

export default function DocumentPreviewModal({ doc, onClose, onDownload }) {
  if (!doc) return null;

  return (
    <div className="doc-modal-overlay">
      <div className="doc-modal-content" style={{ maxWidth: '800px' }}>
        <div className="doc-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className={`doc-type-icon ${doc.format.toLowerCase()}`}>
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>{doc.title}</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {doc.id} • {doc.typeLabel} • {doc.sizeKb} KB ({doc.format})
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="doc-modal-body">
          {/* Status & Integrity Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-secondary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`doc-status-pill ${doc.status === 'Verified' ? 'verified' : doc.status === 'Expiring Soon' ? 'expiring' : 'flagged'}`}>
                <CheckCircle2 size={12} />
                {doc.status}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                OCR Confidence: {doc.ocrConfidence}%
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Version: <strong>{doc.version}</strong>
            </div>
          </div>

          {/* Extracted OCR Payload Key-Value Grid */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              AI Extracted Metadata & Compliance Fields
            </h4>
            <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {doc.ocrData &&
                Object.entries(doc.ocrData).map(([key, val]) => (
                  <div key={key}>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {val}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Association & Audit Meta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Associated Entity</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary-600)', marginTop: '2px' }}>{doc.associatedEntity}</div>
            </div>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Uploaded By / Timestamp</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>{doc.uploadedBy} • {doc.uploadedAt}</div>
            </div>
          </div>

          {/* Visual Digital Stamp Simulation */}
          <div style={{ border: '2px dashed rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.03)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={28} style={{ color: '#10b981' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#065f46' }}>Tamper-Proof Cryptographic Seal Valid</div>
                <div style={{ fontSize: '11px', color: '#047857' }}>SHA-256 Hash matches cloud compliance ledger. Certified GST & RTO compliant.</div>
              </div>
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', background: '#d1fae5', color: '#065f46', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              SHA-256: OK
            </span>
          </div>
        </div>

        <div className="doc-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => onDownload(doc)}>
            <Download size={16} />
            <span>Download Original ({doc.format})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
