import React, { useState } from 'react';
import { X, Calculator, Truck, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Fuel, IndianRupee } from 'lucide-react';
import { calculateSpotQuote } from '../../../utils/mockData/customersData';
import '../Customers.css';

export default function SpotBookingModal({ isOpen, onClose, onConfirmBooking, currentCustomerName = 'Tata Motors Limited' }) {
  const [originPin, setOriginPin] = useState('411018'); // Pune
  const [destPin, setDestPin] = useState('263153'); // Pantnagar
  const [cargoWeightMt, setCargoWeightMt] = useState(16);
  const [cargoType, setCargoType] = useState('Automotive Assembly Parts');
  const [vehicleType, setVehicleType] = useState('32ft Multi-Axle MX (18 MT)');
  const [quote, setQuote] = useState(() => calculateSpotQuote('411018', '263153', 16, '32ft Multi-Axle MX (18 MT)'));
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRecalculate = (newOrigin = originPin, newDest = destPin, newWeight = cargoWeightMt, newVeh = vehicleType) => {
    const freshQuote = calculateSpotQuote(newOrigin, newDest, parseFloat(newWeight) || 10, newVeh);
    setQuote(freshQuote);
  };

  const handleConfirm = () => {
    const bookingPayload = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      route: `Pincode ${originPin} → ${destPin}`,
      vehicleType: vehicleType.split('(')[0].trim(),
      status: 'Dispatched (Instant Confirmed)',
      quoteAmount: quote.totalQuoteAmount,
    };
    onConfirmBooking(bookingPayload);
    setIsBookingSuccess(true);
    setTimeout(() => {
      setIsBookingSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-container max-w-2xl">
        <div className="customer-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Instant Spot Booking & Rate Quote Engine
            </h3>
            <p className="text-xs text-slate-400">Client: {currentCustomerName} | Live Dynamic Freight Matrix</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBookingSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white">Spot Freight Booking Confirmed!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Guaranteed truck placement SLA initiated. Vehicle registration & live driver tracking link will be broadcasted to your Shipper Portal.
            </p>
            <div className="text-xs text-cyan-400 font-mono">Quotation Locked: ₹ {quote.totalQuoteAmount.toLocaleString('en-IN')} (All-inclusive GST)</div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Input Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Origin Postal Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                  value={originPin}
                  onChange={(e) => {
                    setOriginPin(e.target.value);
                    handleRecalculate(e.target.value, destPin, cargoWeightMt, vehicleType);
                  }}
                  placeholder="e.g. 411018 (Pune)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Destination Postal Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  value={destPin}
                  onChange={(e) => {
                    setDestPin(e.target.value);
                    handleRecalculate(originPin, e.target.value, cargoWeightMt, vehicleType);
                  }}
                  placeholder="e.g. 263153 (Pantnagar)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Vehicle Configuration</label>
                <select
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value);
                    handleRecalculate(originPin, destPin, cargoWeightMt, e.target.value);
                  }}
                >
                  <option value="24ft Container Truck (9 MT)">24ft Container Truck (9 MT Payload)</option>
                  <option value="32ft Multi-Axle MX (18 MT)">32ft Multi-Axle MX (18 MT Payload)</option>
                  <option value="40ft High-Cube Trailer (28 MT)">40ft High-Cube Trailer (28 MT Payload)</option>
                  <option value="32ft Reefer (+2°C to +8°C Active)">32ft Reefer (+2°C to +8°C Active Cold)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cargo Weight (Metric Tonnes)</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                  value={cargoWeightMt}
                  onChange={(e) => {
                    setCargoWeightMt(e.target.value);
                    handleRecalculate(originPin, destPin, e.target.value, vehicleType);
                  }}
                />
              </div>
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="bg-gradient-to-br from-slate-900/90 to-indigo-950/40 p-5 rounded-xl border border-indigo-500/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Estimated Linehaul Distance</h4>
                    <p className="text-xs text-slate-400">{quote.estimatedDistanceKm} km • ~{quote.estimatedTransitHours} Hours Transit SLA</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Guaranteed SLA</span>
                  <div className="text-xs font-bold text-emerald-400">{quote.guaranteedSlaDays} Business Days</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Base Linehaul Freight:</span>
                  <span className="font-mono text-white font-medium">₹ {quote.baseFreight.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5 text-amber-400" /> Fuel Surcharge (12% Dynamic FSC):</span>
                  <span className="font-mono text-white font-medium">₹ {quote.fuelSurcharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>NHAI Toll Charges & FastTag:</span>
                  <span className="font-mono text-white font-medium">₹ {quote.tollEstimate.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST (18% Reverse Charge Mechanism):</span>
                  <span className="font-mono text-white font-medium">₹ {quote.gstAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-cyan-400" /> Total All-Inclusive Quote:
                  </span>
                  <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 font-mono">
                    ₹ {quote.totalQuoteAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Includes Transit Cargo Insurance (Up to ₹50 Lakhs)</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <span>Book Spot Vehicle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
