import React, { useState } from 'react';
import { X, Briefcase, ShieldCheck, Truck, Building2, CheckCircle2 } from 'lucide-react';
import '../Carriers.css';

export default function CarrierCreateModal({ isOpen, onClose, onAddCarrier }) {
  const [formData, setFormData] = useState({
    name: '',
    legalName: '',
    gstin: '',
    pan: '',
    tier: 'Tier 1 Preferred',
    fleetSize: '150',
    primaryHubs: 'Mumbai Bhiwandi, Delhi NCR Bilaspur',
    primaryLanes: 'Mumbai → Bangalore, Delhi NCR → Kolkata',
    accountLead: 'Rameshwar Patil (Carrier Ops Head)',
    accountLeadPhone: '+91 98201 55670',
    bankName: 'HDFC Bank Ltd',
    accountNo: '50200012345678',
    ifsc: 'HDFC0000123',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.gstin) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newCarrier = {
        id: `CRR-${Math.floor(100 + Math.random() * 900)}`,
        code: `${formData.name.substring(0, 3).toUpperCase()}-LOG-01`,
        name: formData.name,
        legalName: formData.legalName || formData.name,
        gstin: formData.gstin.toUpperCase(),
        pan: formData.pan.toUpperCase() || formData.gstin.substring(2, 12).toUpperCase(),
        tier: formData.tier,
        verificationStatus: 'Verified (KYC Active)',
        rating: 4.8,
        fleetSize: parseInt(formData.fleetSize, 10) || 100,
        fleetBreakdown: {
          '32ft Multi-Axle MX': Math.round((parseInt(formData.fleetSize, 10) || 100) * 0.5),
          '24ft Container Truck': Math.round((parseInt(formData.fleetSize, 10) || 100) * 0.3),
          '40ft High-Cube Trailer': Math.round((parseInt(formData.fleetSize, 10) || 100) * 0.2),
        },
        primaryHubs: formData.primaryHubs.split(',').map((s) => s.trim()),
        primaryLanes: formData.primaryLanes.split(',').map((s) => s.trim()),
        placementAcceptancePct: 98.0,
        onTimeDeliveryPct: 97.5,
        claimsRatioPct: 0.1,
        activeTripsCount: 0,
        monthlyVolumeMt: 1200,
        annualFreightGmv: 15000000,
        accountLead: formData.accountLead,
        accountLeadPhone: formData.accountLeadPhone,
        contacts: [
          {
            name: 'Primary Placement Officer',
            role: 'Head of Dispatch Operations',
            email: `dispatch@${formData.name.toLowerCase().replace(/\s+/g, '')}.in`,
            phone: formData.accountLeadPhone,
          },
        ],
        bankDetails: {
          bankName: formData.bankName,
          accountNo: formData.accountNo,
          ifsc: formData.ifsc.toUpperCase(),
          branch: 'Main Commercial Branch',
        },
        status: 'Active (Healthy)',
      };

      onAddCarrier(newCarrier);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="carrier-modal-overlay">
      <div className="carrier-modal-container">
        <div className="carrier-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-400" />
              Onboard Commercial Carrier / Transporter
            </h3>
            <p className="text-xs text-slate-400">Master Fleet Partner & Transporter Service Agreement Setup</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Transporter Trade Name</label>
              <input
                type="text"
                required
                placeholder="e.g. VRL Logistics Limited"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Partner SLA Tier</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
              >
                <option value="Tier 1 Preferred">Tier 1 Preferred (Guaranteed Volume & 4h Placement)</option>
                <option value="Tier 2 Approved">Tier 2 Approved (Secondary Linehaul)</option>
                <option value="Spot Verified">Spot Verified (Ad-Hoc Market Bidding)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GSTIN Number (15-Digit)</label>
              <input
                type="text"
                required
                maxLength={15}
                placeholder="29AAACV2450M1Z6"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total Dedicated Fleet Size</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 250"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                value={formData.fleetSize}
                onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Operating Hubs</label>
              <input
                type="text"
                placeholder="e.g. Mumbai Bhiwandi, Delhi NCR"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.primaryHubs}
                onChange={(e) => setFormData({ ...formData, primaryHubs: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Key Contracted Lanes</label>
              <input
                type="text"
                placeholder="e.g. Mumbai → Bangalore, Pune → Delhi"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.primaryLanes}
                onChange={(e) => setFormData({ ...formData, primaryLanes: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-slate-800/40 p-3.5 rounded-lg border border-slate-700/50 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Bank Payout & Settlement Credentials
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Bank Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Account Number</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white font-mono"
                  value={formData.accountNo}
                  onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">IFSC Code</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white font-mono uppercase"
                  value={formData.ifsc}
                  onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                />
              </div>
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
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying with Vahan...' : 'Complete Carrier Onboarding'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
