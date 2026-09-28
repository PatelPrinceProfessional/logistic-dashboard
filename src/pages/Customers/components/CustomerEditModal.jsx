import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, DollarSign, UserCheck, AlertCircle } from 'lucide-react';
import '../Customers.css';

export default function CustomerEditModal({ isOpen, customer, onClose, onUpdateCustomer }) {
  const [formData, setFormData] = useState({
    name: '',
    tier: 'Platinum',
    industry: '',
    creditLimit: '',
    creditTerms: 'Net 30 Days',
    accountManager: '',
    accountManagerPhone: '',
    status: 'Active (Healthy)',
    onTimeSlaPct: 98.5,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        tier: customer.tier || 'Platinum',
        industry: customer.industry || '',
        creditLimit: customer.creditLimit ? String(customer.creditLimit) : '5000000',
        creditTerms: customer.creditTerms || 'Net 30 Days',
        accountManager: customer.accountManager || 'Vikramaditya Rao (Lead KAM)',
        accountManagerPhone: customer.accountManagerPhone || '+91 98200 44120',
        status: customer.status || 'Active (Healthy)',
        onTimeSlaPct: customer.onTimeSlaPct || 98.5,
      });
    }
  }, [customer]);

  if (!isOpen || !customer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...customer,
      name: formData.name,
      tier: formData.tier,
      industry: formData.industry,
      creditLimit: parseFloat(formData.creditLimit) || customer.creditLimit,
      creditTerms: formData.creditTerms,
      accountManager: formData.accountManager,
      accountManagerPhone: formData.accountManagerPhone,
      status: formData.status,
      onTimeSlaPct: parseFloat(formData.onTimeSlaPct) || customer.onTimeSlaPct,
      creditUtilizationPct: Math.min(100, Math.round(((customer.outstandingBalance || 0) / (parseFloat(formData.creditLimit) || customer.creditLimit)) * 100 * 10) / 10),
    };
    onUpdateCustomer(updated);
    onClose();
  };

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-container">
        <div className="customer-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-400" />
              Edit Account: {customer.name}
            </h3>
            <p className="text-xs text-slate-400">Account Code: {customer.code} | GSTIN: {customer.gstin}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Trade Name</label>
              <input
                type="text"
                required
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SLA Tier</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
              >
                <option value="Platinum">Platinum (Dedicated KAM & Priority Linehaul)</option>
                <option value="Gold">Gold (Standard 24h SLA)</option>
                <option value="Silver">Silver (Economy Dispatch)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Approved Credit Limit (INR ₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                <input
                  type="number"
                  required
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Credit Terms</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.creditTerms}
                onChange={(e) => setFormData({ ...formData, creditTerms: e.target.value })}
              >
                <option value="Net 7 Days">Net 7 Days</option>
                <option value="Net 15 Days">Net 15 Days</option>
                <option value="Net 30 Days">Net 30 Days</option>
                <option value="Net 45 Days">Net 45 Days</option>
                <option value="Advance COD">Advance COD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Key Account Manager (KAM)</label>
              <input
                type="text"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.accountManager}
                onChange={(e) => setFormData({ ...formData, accountManager: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Account Health Status</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active (Healthy)">Active (Healthy)</option>
                <option value="Payment Overdue (Review)">Payment Overdue (Review)</option>
                <option value="Credit Limit Locked">Credit Limit Locked</option>
                <option value="Contract Expiring Soon">Contract Expiring Soon</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-300">
              Modifications to Credit Limits and Payment Terms will automatically synchronize across the Freight Audit and Customer Billing modules.
            </p>
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
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-lg shadow-lg shadow-indigo-500/20 transition-all"
            >
              Save Account Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
