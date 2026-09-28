import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  DollarSign,
  Receipt,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Fuel,
  CreditCard,
  Layers,
} from 'lucide-react';
import { customerBillingSummaryStats, customerInvoicesList as initialInvoices } from '../../utils/mockData/financeData';
import CustomerInvoiceGenerateModal from './components/CustomerInvoiceGenerateModal';
import RecordPaymentModal from './components/RecordPaymentModal';
import './Finance.css';

export default function CustomerBilling() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [recordingInvoice, setRecordingInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered customer invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.billingCycle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'OVERDUE' && inv.agingStatus.includes('Overdue')) ||
        (statusFilter === 'CURRENT' && inv.agingStatus.includes('Current')) ||
        (statusFilter === 'PARTIAL' && inv.paymentStatus.includes('Partially'));

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const handleGenerateSuccess = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
    setIsGenerateOpen(false);
    showToast(`Customer Bill #${newInvoice.invoiceNumber} generated for ${newInvoice.customerName}!`);
  };

  const handleRecordPaymentSuccess = (invoiceId, paymentData) => {
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoiceId
          ? {
              ...item,
              paymentStatus: 'Paid in Full (Wire Cleared)',
              collectionHistory: [
                ...item.collectionHistory,
                { date: paymentData.date, amount: paymentData.amount, mode: paymentData.mode, utr: paymentData.utr },
              ],
            }
          : item
      )
    );
    setRecordingInvoice(null);
    showToast(`Payment of ₹ ${paymentData.amount.toLocaleString('en-IN')} recorded for Invoice #${invoiceId}.`);
  };

  return (
    <Layout
      title="Customer Billing & Accounts Receivable"
      breadcrumbs={[{ label: 'Finance', path: '/finance' }, { label: 'Customer Billing' }]}
    >
      <div className="finance-page-container">
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
        <div className="finance-header-row">
          <div>
            <div className="finance-badge">
              <DollarSign size={14} />
              <span>Accounts Receivable & Fuel Surcharge Ledger</span>
            </div>
            <h1 className="finance-title">Customer Billing & Invoicing Operations</h1>
            <p className="finance-subtitle">
              Consolidated cycle billing, dynamic index-linked diesel surcharge formulas, and cash collections tracking.
            </p>
          </div>

          <div className="finance-header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => showToast('Executive AR Aging Report exported in PDF/Excel format.')}
            >
              <Download size={16} />
              <span>Export AR Report</span>
            </button>
            <button className="btn btn-primary" onClick={() => setIsGenerateOpen(true)}>
              <Plus size={16} />
              <span>Generate Customer Bill</span>
            </button>
          </div>
        </div>

        {/* Stat KPI Grid */}
        <div className="finance-stats-grid">
          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Billed This Month</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <Receipt size={18} />
              </div>
            </div>
            <div className="stat-main-val">{customerBillingSummaryStats.totalBilledThisMonth}</div>
            <div className="stat-footer-text" style={{ color: '#10b981' }}>
              <span>Gross B2B Freight Revenue</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Collections Realized</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="stat-main-val" style={{ color: '#059669' }}>
              {customerBillingSummaryStats.collectionsRealized}
            </div>
            <div className="stat-footer-text" style={{ color: '#059669' }}>
              <span>76.5% Collection Velocity</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">Outstanding Receivables</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <Clock size={18} />
              </div>
            </div>
            <div className="stat-main-val">{customerBillingSummaryStats.outstandingReceivables}</div>
            <div className="stat-footer-text" style={{ color: '#d97706' }}>
              <span>Within agreed credit limits</span>
            </div>
          </div>

          <div className="finance-stat-card">
            <div className="stat-header-row">
              <span className="stat-label">AR Aging Health</span>
              <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <Layers size={18} />
              </div>
            </div>
            <div className="stat-main-val">93.6%</div>
            <div className="aging-progress-bar">
              <div className="aging-segment current" style={{ width: '80%' }} title="0-30 Days: 80%"></div>
              <div className="aging-segment warning" style={{ width: '14.4%' }} title="31-60 Days: 14.4%"></div>
              <div className="aging-segment danger" style={{ width: '5.6%' }} title="60+ Days: 5.6%"></div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="finance-filter-bar">
          <div className="filter-search-box">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              placeholder="Search by Bill #, Customer Name, or Billing Cycle..."
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
                <option value="ALL">All Receivables</option>
                <option value="CURRENT">Current (0-30 Days)</option>
                <option value="OVERDUE">Overdue (31-60 Days)</option>
                <option value="PARTIAL">Partially Paid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer Invoices Table */}
        <div className="finance-table-card">
          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Bill # & Date</th>
                  <th>Customer Enterprise</th>
                  <th>Cycle & Shipments</th>
                  <th>Base Freight (₹)</th>
                  <th>Fuel Surcharge (FSC)</th>
                  <th>Total Billed (₹)</th>
                  <th>Due Date / Aging</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => {
                  const isOverdue = inv.agingStatus.includes('Overdue');

                  return (
                    <tr key={inv.id}>
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--color-primary-600)' }}>
                          {inv.invoiceNumber}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {inv.invoiceDate}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '13px', fontWeight: 700 }}>{inv.customerName}</div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                          GSTIN: {inv.customerGstin}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{inv.billingCycle}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {inv.totalShipmentsCount} Shipments Delivered
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, fontSize: '13px' }}>
                          ₹ {inv.financials.baseFreight.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: 700 }}>
                          + ₹ {inv.financials.fuelSurchargeIndex.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                          Index-Linked FSC
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 900, fontSize: '14px', color: '#0f172a' }}>
                          ₹ {inv.financials.totalBilledAmount.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                          Net: ₹ {inv.financials.netReceivable.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: isOverdue ? '#dc2626' : undefined }}>
                          {inv.dueDate}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                          {inv.agingStatus}
                        </div>
                      </td>

                      <td>
                        <span className={`finance-status-pill ${inv.paymentStatus.includes('Paid') ? 'matched' : isOverdue ? 'discrepancy' : 'pending'}`}>
                          {inv.paymentStatus.includes('Paid') ? <CheckCircle2 size={12} /> : isOverdue ? <AlertTriangle size={12} /> : <Clock size={12} />}
                          <span>{inv.paymentStatus}</span>
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setRecordingInvoice(inv)}
                          title="Record Wire / Payment Receipt"
                        >
                          <CreditCard size={14} />
                          <span>Collect</span>
                        </button>
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
          <CustomerInvoiceGenerateModal
            isOpen={isGenerateOpen}
            onClose={() => setIsGenerateOpen(false)}
            onGenerate={handleGenerateSuccess}
          />
        )}

        {recordingInvoice && (
          <RecordPaymentModal
            invoice={recordingInvoice}
            onClose={() => setRecordingInvoice(null)}
            onRecordPayment={handleRecordPaymentSuccess}
          />
        )}
      </div>
    </Layout>
  );
}
