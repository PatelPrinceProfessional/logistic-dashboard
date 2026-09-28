import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Sliders, Calendar, Mail, Download, Sparkles } from 'lucide-react';
import '../Analytics.css';

export default function ReportBuilderModal({ isOpen, onClose, onAddReport }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Financial Analytics',
    frequency: 'Monthly (Automated)',
    format: 'CSV / Excel',
    dataset: 'Lane Cost-to-Serve & FSC',
    groupBy: 'Origin → Destination Lane',
    dateRange: 'Year to Date (2026)',
    emailRecipients: 'cfo@enterprise-logistics.io, supplychain-vp@enterprise.com',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReport = {
        id: `REP-${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title,
        category: formData.category,
        frequency: formData.frequency,
        format: formData.format,
        lastRunDate: 'Generated Just Now',
        status: 'Ready',
        sampleRowCount: 64,
        description: `Custom query on ${formData.dataset} grouped by ${formData.groupBy} (${formData.dateRange}).`,
        headers: ['Entity / Group', 'Volume (MT)', 'Freight Spend (₹)', 'Cost / Ton-KM', 'SLA Performance'],
        rows: [
          ['Mumbai → Delhi NCR Corridor', '12,400 MT', '₹ 1,18,50,000', '₹ 2.18', '98.8% OTIF'],
          ['Bangalore → Chennai Feeder', '8,200 MT', '₹ 46,20,000', '₹ 2.45', '99.4% OTIF'],
          ['Pune → Pantnagar Auto Linehaul', '7,600 MT', '₹ 74,80,000', '₹ 2.24', '99.1% OTIF'],
        ],
      };

      onAddReport(newReport);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="analytics-modal-overlay">
      <div className="analytics-modal-container">
        <div className="analytics-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Custom Business Intelligence Report Builder
            </h3>
            <p className="text-xs text-slate-400">Configure multi-dimensional data queries and recurring automated dispatches</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Report Query Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Q3 Carrier Placement SLA & Detention Cost Audit"
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Domain / Dataset</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.dataset}
                onChange={(e) => setFormData({ ...formData, dataset: e.target.value })}
              >
                <option value="Lane Cost-to-Serve & FSC">Lane Cost-to-Serve & FSC Dynamic Surcharge</option>
                <option value="Carrier SLA & Placement Penalties">Carrier SLA & Placement Penalties</option>
                <option value="Customer OTIF & Fulfillment">Customer OTIF & Fulfillment Performance</option>
                <option value="Warehouse Dock Dwell & Detention">Warehouse Dock Dwell & Detention Charges</option>
                <option value="ESG Scope 3 Emissions & Rail Conversion">ESG Scope 3 Emissions & Rail Conversion</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Grouping Dimension</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.groupBy}
                onChange={(e) => setFormData({ ...formData, groupBy: e.target.value })}
              >
                <option value="Origin → Destination Lane">Origin → Destination Lane Corridor</option>
                <option value="3PL Carrier Partner">3PL Transporter Partner</option>
                <option value="Enterprise Shipper Account">Enterprise Shipper Account</option>
                <option value="Vehicle Configuration">Vehicle Configuration (32ft, 40ft, Reefer)</option>
                <option value="Operating Hub / Facility">Operating Hub / Facility</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date Range Window</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.dateRange}
                onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Quarter to Date (Q3 2026)">Quarter to Date (Q3 2026)</option>
                <option value="Year to Date (2026)">Year to Date (2026)</option>
                <option value="Full Financial Year (FY 2025-26)">Full Financial Year (FY 2025-26)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Frequency & Schedule</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              >
                <option value="Daily (Morning 07:00 IST)">Daily (Morning 07:00 IST)</option>
                <option value="Weekly (Every Monday)">Weekly (Every Monday 08:00 IST)</option>
                <option value="Monthly (Automated on 1st)">Monthly (Automated on 1st)</option>
                <option value="On-Demand Only">On-Demand Only (Manual Run)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> Automated Email Distribution List
            </label>
            <input
              type="text"
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              value={formData.emailRecipients}
              onChange={(e) => setFormData({ ...formData, emailRecipients: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Generating Report Schema...' : 'Save & Execute BI Report'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
