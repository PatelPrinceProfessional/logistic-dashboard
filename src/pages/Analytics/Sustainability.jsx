import React, { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  Leaf,
  ShieldCheck,
  Award,
  Sparkles,
  Download,
  Plus,
  TrendingDown,
  TrendingUp,
  Truck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { sustainabilityAnalytics } from '../../utils/mockData/analyticsData';
import CarbonOffsetModal from './components/CarbonOffsetModal';
import './Analytics.css';

export default function Sustainability() {
  const [sustainabilityData, setSustainabilityData] = useState(sustainabilityAnalytics);
  const [isOffsetModalOpen, setIsOffsetModalOpen] = useState(false);

  const handleAddOffset = (newOffset) => {
    setSustainabilityData((prev) => ({
      ...prev,
      offsetInitiatives: [newOffset, ...prev.offsetInitiatives],
      co2SavedVsUnoptimizedRoadMt: prev.co2SavedVsUnoptimizedRoadMt + newOffset.offsetMt,
    }));
  };

  const handleGenerateCertificatePdf = () => {
    alert('Generating ISO 14064 & GLEC Framework Certified ESG Scope 3 Audit Certificate PDF...');
  };

  return (
    <Layout
      title="ESG Sustainability & Scope 3 Freight Decarbonization"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Sustainability', path: '/analytics/sustainability' },
      ]}
    >
      <div className="analytics-page-container">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Leaf className="w-7 h-7 text-emerald-400" />
                ESG Sustainability & Scope 3 Carbon Accounting
              </h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30">
                GLEC & ISO 14064 Compliant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Multi-modal rail electrification, empty-miles reduction telemetry, and certified carbon offset retirements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateCertificatePdf}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>ESG Audit Certificate (PDF)</span>
            </button>
            <button
              onClick={() => setIsOffsetModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Retire Carbon Offsets</span>
            </button>
          </div>
        </div>

        {/* Carbon Accounting Hero Card */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-2xl flex-shrink-0">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-black text-white">Freight Decarbonization Scorecard</h2>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {sustainabilityData.greenScoreRating}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Scope 3 Category 4 (Upstream Transportation & Distribution) Greenhouse Gas Protocol Standards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-right">
                <span className="text-xs text-slate-400 block">Total Carbon Neutralized</span>
                <span className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5 block">
                  {sustainabilityData.co2SavedVsUnoptimizedRoadMt} MT CO₂e
                </span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">-18.4% Net Emissions Reduction</span>
              </div>
            </div>
          </div>

          {/* 4 ESG Metric Strips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Total Scope 3 Footprint</span>
              <span className="text-base font-bold text-white font-mono mt-0.5 block">
                {sustainabilityData.totalScope3EmissionsMt} MT CO₂e
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">FY 2025-26 Q3 to Date</span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Rail Multimodal Shift</span>
              <span className="text-base font-bold text-cyan-400 font-mono mt-0.5 block">
                {sustainabilityData.railMultimodalSplitPct}%
              </span>
              <span className="text-[10px] text-cyan-400 block mt-0.5">Dedicated Freight Corridors</span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Clean Fleet Transition</span>
              <span className="text-base font-bold text-emerald-400 font-mono mt-0.5 block">
                {sustainabilityData.electricFleetTransitionPct}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">EV & CNG Commercial Fleet</span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Empty KM Avoided</span>
              <span className="text-base font-bold text-purple-400 font-mono mt-0.5 block">
                {(sustainabilityData.emptyKilometersSavedKm / 1000).toFixed(1)}k KM
              </span>
              <span className="text-[10px] text-purple-400 block mt-0.5">Backhaul Load Matching</span>
            </div>
          </div>
        </div>

        {/* 2-Column Charts: Monthly Emissions & Mode Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Decarbonization Trend */}
          <div className="analytics-chart-card">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  Monthly CO₂ Emissions vs Avoided Carbon
                </h3>
                <p className="text-xs text-slate-400">Total emissions reduction trajectory (Metric Tonnes)</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">Target: Net Zero 2030</span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sustainabilityData.monthlyEmissionsTrend}>
                  <defs>
                    <linearGradient id="totalCo2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="savedCo2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="totalCo2" name="Total Gross Emissions (MT)" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#totalCo2Grad)" />
                  <Area type="monotone" dataKey="savedCo2" name="Carbon Avoided / Saved (MT)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#savedCo2Grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transport Mode Fuel & Energy Breakdown */}
          <div className="analytics-chart-card">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Transport Mode Share & Carbon Intensity
                </h3>
                <p className="text-xs text-slate-400">Corridor split by electric rail vs clean Euro-VI</p>
              </div>
            </div>

            <div className="space-y-4 pt-2 text-xs">
              {sustainabilityData.modesBreakdown.map((item) => (
                <div key={item.mode} className="space-y-1.5 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.mode}</span>
                    <span className="font-mono font-bold text-cyan-400">{item.sharePct}% Modal Share</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                      style={{ width: `${item.sharePct * 2}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>Intensity: {item.emissionsMtPer1000Tkm} kg CO₂ / 1,000 Ton-KM</span>
                    <span className="text-emerald-400 font-semibold">{item.co2Intensity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verified Carbon Offsets & Retirement Registry */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Verified Carbon Credit Retirements & Offsetting Registry
              </h3>
              <p className="text-xs text-slate-400">UNFCCC, Gold Standard, and Verified Carbon Standard (VCS) Registry</p>
            </div>
            <button
              onClick={() => setIsOffsetModalOpen(true)}
              className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Retire Credits</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                  <th className="py-3 px-4">Accredited Project Name</th>
                  <th className="py-3 px-3">Carbon Retired (MT CO₂e)</th>
                  <th className="py-3 px-3">Registry Certificate ID</th>
                  <th className="py-3 px-4 text-right">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {sustainabilityData.offsetInitiatives.map((off, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      {off.name}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                      {off.offsetMt} MT CO₂e
                    </td>
                    <td className="py-3 px-3 font-mono text-cyan-400">{off.certId}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {off.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <CarbonOffsetModal
          isOpen={isOffsetModalOpen}
          onClose={() => setIsOffsetModalOpen(false)}
          onAddOffset={handleAddOffset}
        />
      </div>
    </Layout>
  );
}
