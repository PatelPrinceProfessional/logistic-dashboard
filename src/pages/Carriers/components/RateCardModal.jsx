import React, { useState } from 'react';
import { X, Calculator, MapPin, Truck, Fuel, DollarSign, ShieldCheck } from 'lucide-react';
import '../Carriers.css';

export default function RateCardModal({ isOpen, onClose, onAddRateCard, carriers = [] }) {
  const [formData, setFormData] = useState({
    carrierId: carriers[0]?.id || 'CRR-001',
    carrierName: carriers[0]?.name || 'VRL Logistics Limited',
    originCity: 'Mumbai Bhiwandi',
    destinationCity: 'Delhi NCR Bilaspur',
    distanceKm: '1420',
    vehicleType: '32ft Multi-Axle MX (18 MT)',
    baseRate: '48500',
    rateType: 'Per Trip Fixed',
    fscFormula: 'Base Diesel ₹90/L + 1% per ₹1.50 rise',
    freeDetentionHours: '4',
    detentionRatePerDay: '1500',
    tollPolicy: 'Included in Base Contract Rate',
    validTill: '2027-03-31',
  });

  if (!isOpen) return null;

  const handleCarrierChange = (cId) => {
    const found = carriers.find((c) => c.id === cId);
    setFormData({
      ...formData,
      carrierId: cId,
      carrierName: found ? found.name : formData.carrierName,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRate = {
      id: `RC-${Math.floor(910 + Math.random() * 90)}`,
      carrierId: formData.carrierId,
      carrierName: formData.carrierName,
      contractCode: `${formData.carrierName.substring(0, 3).toUpperCase()}-MSA-2025-01`,
      lane: `${formData.originCity} → ${formData.destinationCity}`,
      originCity: formData.originCity,
      destinationCity: formData.destinationCity,
      distanceKm: parseInt(formData.distanceKm, 10) || 1000,
      vehicleType: formData.vehicleType,
      baseRate: parseFloat(formData.baseRate) || 45000,
      rateType: formData.rateType,
      fscFormula: formData.fscFormula,
      freeDetentionHours: parseInt(formData.freeDetentionHours, 10) || 4,
      detentionRatePerDay: parseFloat(formData.detentionRatePerDay) || 1500,
      tollPolicy: formData.tollPolicy,
      validTill: formData.validTill,
      status: 'Active (Locked)',
    };
    onAddRateCard(newRate);
    onClose();
  };

  return (
    <div className="carrier-modal-overlay">
      <div className="carrier-modal-container">
        <div className="carrier-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              Contracted Lane Rate Card Entry
            </h3>
            <p className="text-xs text-slate-400">Lock lane tariffs, dynamic diesel escalation, and detention policies</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Contracted Transporter</label>
            <select
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              value={formData.carrierId}
              onChange={(e) => handleCarrierChange(e.target.value)}
            >
              {carriers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code}) - {c.tier}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Origin Hub / City
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai Bhiwandi"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={formData.originCity}
                onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Destination Hub / City
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Delhi NCR Bilaspur"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                value={formData.destinationCity}
                onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Vehicle Type</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              >
                <option value="24ft Container Truck (9 MT)">24ft Container Truck (9 MT)</option>
                <option value="32ft Multi-Axle MX (18 MT)">32ft Multi-Axle MX (18 MT)</option>
                <option value="40ft High-Cube Trailer (28 MT)">40ft High-Cube Trailer (28 MT)</option>
                <option value="32ft Reefer (+2°C to +8°C Active)">32ft Reefer (+2°C to +8°C Active)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Freight (₹ INR)</label>
              <input
                type="number"
                required
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                value={formData.baseRate}
                onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Distance (KM)</label>
              <input
                type="number"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                value={formData.distanceKm}
                onChange={(e) => setFormData({ ...formData, distanceKm: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-amber-400" /> Fuel Surcharge (FSC) Formula
              </label>
              <input
                type="text"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={formData.fscFormula}
                onChange={(e) => setFormData({ ...formData, fscFormula: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Free Detention & Toll Policy</label>
              <input
                type="text"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={formData.tollPolicy}
                onChange={(e) => setFormData({ ...formData, tollPolicy: e.target.value })}
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
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
            >
              Save Rate Card Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
