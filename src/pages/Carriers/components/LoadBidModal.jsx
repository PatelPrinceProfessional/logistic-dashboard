import React, { useState } from 'react';
import { X, Send, Truck, UserCheck, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import '../Carriers.css';

export default function LoadBidModal({ isOpen, load, onClose, onSubmitBid, carrierName = 'VRL Logistics Limited' }) {
  const [formData, setFormData] = useState({
    bidRate: load?.targetRate ? String(load.targetRate) : '48000',
    vehicleNumber: 'KA-25-D-8891',
    driverName: 'Rajesh Sharma',
    driverPhone: '+91 98201 22334',
    placementTime: 'Within 2 Hours (Ready at Gate)',
    notes: 'GPS-enabled 32ft MX ready for direct loading.',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !load) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const bidPayload = {
      loadId: load.id,
      bidRate: parseFloat(formData.bidRate) || load.targetRate,
      vehicleNumber: formData.vehicleNumber,
      driverName: formData.driverName,
      driverPhone: formData.driverPhone,
      placementTime: formData.placementTime,
      carrierName,
    };
    onSubmitBid(bidPayload);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="carrier-modal-overlay">
      <div className="carrier-modal-container">
        <div className="carrier-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-400" />
              Submit Transporter Bid: {load.id}
            </h3>
            <p className="text-xs text-slate-400">Carrier: {carrierName} | Target Freight: ₹ {load.targetRate.toLocaleString('en-IN')}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Bid & Placement Allocated!</h4>
            <p className="text-xs text-slate-300">
              Trip dispatch assigned to <strong>{formData.vehicleNumber}</strong>. Gate entry token generated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-slate-800/40 p-3.5 rounded-lg border border-slate-700/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Lane Route:</span>
                <span className="font-bold text-white">{load.origin} → {load.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cargo & Vehicle:</span>
                <span className="text-cyan-400 font-medium">{load.cargo} • {load.requiredVehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Placement Deadline:</span>
                <span className="text-amber-400 font-medium">{load.placementDeadline}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Offered Freight Rate (₹ INR)</label>
                <input
                  type="number"
                  required
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  value={formData.bidRate}
                  onChange={(e) => setFormData({ ...formData, bidRate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Allocated Truck Registration</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KA-25-D-8891"
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Driver Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  value={formData.driverName}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Driver Mobile Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98201 22334"
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  value={formData.driverPhone}
                  onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Placement Time SLA</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.placementTime}
                onChange={(e) => setFormData({ ...formData, placementTime: e.target.value })}
              >
                <option value="Within 2 Hours (Ready at Gate)">Within 2 Hours (Ready at Gate)</option>
                <option value="Within 4 Hours (Standard Tier 1 SLA)">Within 4 Hours (Standard Tier 1 SLA)</option>
                <option value="Tomorrow Morning 08:00 IST">Tomorrow Morning 08:00 IST</option>
              </select>
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
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Placement Bid</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
