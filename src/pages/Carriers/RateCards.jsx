import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  Calculator,
  Search,
  Plus,
  Truck,
  MapPin,
  Fuel,
  DollarSign,
  Clock,
  ShieldCheck,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { rateCardsList as initialRateCards, carriersList } from '../../utils/mockData/carriersData';
import RateCardModal from './components/RateCardModal';
import './Carriers.css';

export default function RateCards() {
  const [rateCards, setRateCards] = useState(initialRateCards);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Dynamic Diesel Simulator State
  const [dieselPriceDelta, setDieselPriceDelta] = useState(3.0); // ₹ increase

  const filteredRateCards = useMemo(() => {
    return rateCards.filter((rc) => {
      const matchSearch =
        rc.lane.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rc.carrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rc.contractCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchVehicle =
        vehicleFilter === 'ALL' ||
        (vehicleFilter === '32FT' && rc.vehicleType.includes('32ft')) ||
        (vehicleFilter === '40FT' && rc.vehicleType.includes('40ft')) ||
        (vehicleFilter === '24FT' && rc.vehicleType.includes('24ft')) ||
        (vehicleFilter === 'REEFER' && rc.vehicleType.includes('Reefer'));

      return matchSearch && matchVehicle;
    });
  }, [rateCards, searchQuery, vehicleFilter]);

  const handleAddRateCard = (newRate) => {
    setRateCards((prev) => [newRate, ...prev]);
  };

  return (
    <Layout
      title="Contracted Freight Rate Cards & Tariff Matrix"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Carriers', path: '/carriers' },
        { label: 'Rate Cards', path: '/carriers/rates' },
      ]}
    >
      <div className="carriers-page-container">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Calculator className="w-7 h-7 text-cyan-400" />
                Master Carrier Rate Cards & Tariffs
              </h1>
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded-full font-semibold border border-cyan-500/30">
                {rateCards.length} Contracted Lanes
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Locked lane freight contracts, dynamic diesel escalation indexes, and loading detention SLAs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Rate Card Contract</span>
            </button>
          </div>
        </div>

        {/* Diesel Escalation Live Simulator Card */}
        <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 p-5 rounded-xl border border-amber-500/30 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Fuel className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Dynamic Fuel Surcharge (FSC) Index Simulator</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                    Baseline Diesel: ₹90.00 / L
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Simulate dynamic freight escalation when market diesel price fluctuates across national corridors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Simulated Diesel Delta:</span>
              <div className="flex items-center gap-2">
                {[1.5, 3.0, 4.5, 6.0].map((delta) => (
                  <button
                    key={delta}
                    onClick={() => setDieselPriceDelta(delta)}
                    className={`px-2.5 py-1 rounded font-mono text-xs font-bold transition-all ${
                      dieselPriceDelta === delta
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    +₹{delta.toFixed(1)}/L
                  </button>
                ))}
              </div>
              <div className="pl-3 border-l border-slate-700 text-right font-mono">
                <span className="text-[10px] text-slate-400 block">Avg FSC Escalation</span>
                <span className="text-xs font-bold text-amber-400">
                  +{((dieselPriceDelta / 1.5) * 1.0).toFixed(1)}% on Base Freight
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by lane, origin city, destination, carrier, or MSA code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { label: 'ALL VEHICLES', val: 'ALL' },
              { label: '32FT MULTI-AXLE', val: '32FT' },
              { label: '40FT TRAILER', val: '40FT' },
              { label: '24FT CONTAINER', val: '24FT' },
              { label: 'ACTIVE REEFER', val: 'REEFER' },
            ].map((v) => (
              <button
                key={v.val}
                onClick={() => setVehicleFilter(v.val)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  vehicleFilter === v.val
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rate Cards Grid Table */}
        <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Freight Lane & Corridors</th>
                  <th className="py-3.5 px-3">Transporter Partner</th>
                  <th className="py-3.5 px-3">Vehicle Configuration</th>
                  <th className="py-3.5 px-3">Contract Base Rate</th>
                  <th className="py-3.5 px-3">Simulated Total (+FSC)</th>
                  <th className="py-3.5 px-3">Free Detention SLA</th>
                  <th className="py-3.5 px-3">Toll & Permits</th>
                  <th className="py-3.5 px-4 text-right">Validity Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredRateCards.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500 text-sm">
                      No contracted rate cards found matching current search.
                    </td>
                  </tr>
                ) : (
                  filteredRateCards.map((rc) => {
                    const fscMultiplier = 1 + (dieselPriceDelta / 1.5) * 0.01;
                    const simulatedTotal = Math.round(rc.baseRate * fscMultiplier);

                    return (
                      <tr key={rc.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Lane */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            {rc.lane}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                            <span>{rc.distanceKm} KM</span>
                            <span>•</span>
                            <span>Rate ID: {rc.id}</span>
                          </div>
                        </td>

                        {/* Carrier Name */}
                        <td className="py-3.5 px-3">
                          <div className="font-medium text-slate-200">{rc.carrierName}</div>
                          <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{rc.contractCode}</div>
                        </td>

                        {/* Vehicle Type */}
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-medium border border-slate-700">
                            {rc.vehicleType}
                          </span>
                        </td>

                        {/* Base Rate */}
                        <td className="py-3.5 px-3 font-mono font-bold text-white">
                          ₹ {rc.baseRate.toLocaleString('en-IN')}
                          <div className="text-[10px] text-slate-400 font-normal">
                            ₹ {(rc.baseRate / rc.distanceKm).toFixed(1)} / km
                          </div>
                        </td>

                        {/* Simulated Rate with Delta */}
                        <td className="py-3.5 px-3 font-mono">
                          <div className="text-amber-400 font-bold">
                            ₹ {simulatedTotal.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            +₹ {(simulatedTotal - rc.baseRate).toLocaleString('en-IN')} FSC
                          </div>
                        </td>

                        {/* Detention */}
                        <td className="py-3.5 px-3">
                          <div className="text-slate-200 font-medium">{rc.freeDetentionHours} Hours Free</div>
                          <div className="text-[10px] text-slate-400 font-mono">₹{rc.detentionRatePerDay}/day thereafter</div>
                        </td>

                        {/* Toll Policy */}
                        <td className="py-3.5 px-3">
                          <span className="text-slate-300 text-[11px]">{rc.tollPolicy}</span>
                        </td>

                        {/* Validity & Status */}
                        <td className="py-3.5 px-4 text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {rc.status}
                          </span>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">Till {rc.validTill}</div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Modal */}
        <RateCardModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onAddRateCard={handleAddRateCard}
          carriers={carriersList}
        />
      </div>
    </Layout>
  );
}
