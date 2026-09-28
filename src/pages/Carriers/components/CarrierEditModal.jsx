import React, { useState, useEffect } from 'react';
import { X, Briefcase, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import '../Carriers.css';

export default function CarrierEditModal({ isOpen, carrier, onClose, onUpdateCarrier }) {
  const [formData, setFormData] = useState({
    name: '',
    tier: 'Tier 1 Preferred',
    verificationStatus: 'Verified (KYC Active)',
    rating: 4.8,
    accountLead: '',
    accountLeadPhone: '',
    status: 'Active (Healthy)',
    placementAcceptancePct: 98.0,
    onTimeDeliveryPct: 97.5,
  });

  useEffect(() => {
    if (carrier) {
      setFormData({
        name: carrier.name || '',
        tier: carrier.tier || 'Tier 1 Preferred',
        verificationStatus: carrier.verificationStatus || 'Verified (KYC Active)',
        rating: carrier.rating || 4.8,
        accountLead: carrier.accountLead || '',
        accountLeadPhone: carrier.accountLeadPhone || '',
        status: carrier.status || 'Active (Healthy)',
        placementAcceptancePct: carrier.placementAcceptancePct || 98.0,
        onTimeDeliveryPct: carrier.onTimeDeliveryPct || 97.5,
      });
    }
  }, [carrier]);

  if (!isOpen || !carrier) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...carrier,
      name: formData.name,
      tier: formData.tier,
      verificationStatus: formData.verificationStatus,
      rating: parseFloat(formData.rating) || carrier.rating,
      accountLead: formData.accountLead,
      accountLeadPhone: formData.accountLeadPhone,
      status: formData.status,
      placementAcceptancePct: parseFloat(formData.placementAcceptancePct) || carrier.placementAcceptancePct,
      onTimeDeliveryPct: parseFloat(formData.onTimeDeliveryPct) || carrier.onTimeDeliveryPct,
    };
    onUpdateCarrier(updated);
    onClose();
  };

  return (
    <div className="carrier-modal-overlay">
      <div className="carrier-modal-container">
        <div className="carrier-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-400" />
              Edit Carrier Partner: {carrier.name}
            </h3>
            <p className="text-xs text-slate-400">Code: {carrier.code} | GSTIN: {carrier.gstin}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
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
                <option value="Tier 1 Preferred">Tier 1 Preferred (High Priority Linehaul)</option>
                <option value="Tier 2 Approved">Tier 2 Approved (Secondary Allocation)</option>
                <option value="Spot Verified">Spot Verified (Ad-Hoc)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">KYC Compliance Status</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.verificationStatus}
                onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
              >
                <option value="Verified (KYC Active)">Verified (KYC Active & Clean)</option>
                <option value="KYC Expiring Soon">KYC Expiring Soon (30 Days)</option>
                <option value="Audit Review">Audit Review / Temporary Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Account Operational Health</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active (Healthy)">Active (Healthy)</option>
                <option value="Audit Review (Pending Renewal)">Audit Review (Pending Renewal)</option>
                <option value="Suspended (Placement Failure)">Suspended (Placement Failure)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Carrier Operations Lead</label>
              <input
                type="text"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.accountLead}
                onChange={(e) => setFormData({ ...formData, accountLead: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Operations Contact Phone</label>
              <input
                type="text"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                value={formData.accountLeadPhone}
                onChange={(e) => setFormData({ ...formData, accountLeadPhone: e.target.value })}
              />
            </div>
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
              Save Partner Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
