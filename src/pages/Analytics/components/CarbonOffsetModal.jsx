import React, { useState } from 'react';
import { X, Leaf, ShieldCheck, CheckCircle2, Award, Download, ArrowRight, DollarSign } from 'lucide-react';
import '../Analytics.css';

export default function CarbonOffsetModal({ isOpen, onClose, onAddOffset }) {
  const [offsetMt, setOffsetMt] = useState(250);
  const [project, setProject] = useState('Western Ghats Certified Rainforest Afforestation (Gold Standard)');
  const [pricePerMt] = useState(650); // ₹ 650 per metric tonne
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalCost = offsetMt * pricePerMt;

  const handleConfirm = (e) => {
    e.preventDefault();
    const newOffset = {
      name: project,
      offsetMt: parseInt(offsetMt, 10),
      status: 'Verified & Retired',
      certId: `GS-2026-IND-${Math.floor(800 + Math.random() * 190)}`,
    };
    onAddOffset(newOffset);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="analytics-modal-overlay">
      <div className="analytics-modal-container">
        <div className="analytics-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              Retire Verified Carbon Offsets (Scope 3 Decarbonization)
            </h3>
            <p className="text-xs text-slate-400">UNFCCC & Gold Standard Accredited Carbon Credits</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Carbon Credits Successfully Retired!</h4>
            <p className="text-xs text-slate-300">
              {offsetMt} MT of Scope 3 Freight CO₂ officially retired on the global registry. ESG Compliance Certificate issued.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Verified Carbon Offset Project</label>
              <select
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              >
                <option value="Western Ghats Certified Rainforest Afforestation (Gold Standard)">
                  Western Ghats Certified Rainforest Afforestation (Gold Standard)
                </option>
                <option value="Rajasthan Thar Solar Micro-Grid Clean Energy Credits (VCS)">
                  Rajasthan Thar Solar Micro-Grid Clean Energy Credits (VCS)
                </option>
                <option value="National Dedicated Freight Corridor (DFC) Rail Electrification">
                  National Dedicated Freight Corridor (DFC) Rail Electrification
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity to Offset (Metric Tonnes CO₂e)</label>
              <input
                type="number"
                min="10"
                max="5000"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                value={offsetMt}
                onChange={(e) => setOffsetMt(e.target.value)}
              />
            </div>

            <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/30 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Credit Unit Price:</span>
                <span className="font-mono text-white font-semibold">₹ {pricePerMt} / MT CO₂e</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Scope 3 Carbon Neutralized:</span>
                <span className="font-mono text-emerald-400 font-bold">{offsetMt} Metric Tonnes</span>
              </div>
              <div className="pt-2 border-t border-emerald-500/20 flex justify-between items-center">
                <span className="font-bold text-white">Total Disbursal Amount:</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  ₹ {totalCost.toLocaleString('en-IN')}
                </span>
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
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Confirm & Retire Offsets</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
