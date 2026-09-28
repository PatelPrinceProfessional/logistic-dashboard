import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import {
  Briefcase,
  Truck,
  ShieldCheck,
  Star,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Phone,
  BarChart3,
  MapPin,
  FileSpreadsheet,
  Layers,
  FileText
} from 'lucide-react';
import { carriersSummaryStats, carriersList as initialCarriers } from '../../utils/mockData/carriersData';
import CarrierCreateModal from './components/CarrierCreateModal';
import CarrierEditModal from './components/CarrierEditModal';
import './Carriers.css';

export default function CarriersList() {
  const navigate = useNavigate();
  const [carriers, setCarriers] = useState(initialCarriers);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCarrier, setEditingCarrier] = useState(null);

  // Filtered dataset
  const filteredCarriers = useMemo(() => {
    return carriers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.accountLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primaryLanes.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchTier =
        tierFilter === 'ALL' ||
        (tierFilter === 'TIER1' && c.tier.includes('Tier 1')) ||
        (tierFilter === 'TIER2' && c.tier.includes('Tier 2')) ||
        (tierFilter === 'SPOT' && c.tier.includes('Spot'));

      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'HEALTHY' && c.status.includes('Healthy')) ||
        (statusFilter === 'REVIEW' && c.status.includes('Review')) ||
        (statusFilter === 'VERIFIED' && c.verificationStatus.includes('Verified'));

      return matchSearch && matchTier && matchStatus;
    });
  }, [carriers, searchQuery, tierFilter, statusFilter]);

  const handleAddCarrier = (newCarrier) => {
    setCarriers((prev) => [newCarrier, ...prev]);
  };

  const handleUpdateCarrier = (updatedCarrier) => {
    setCarriers((prev) => prev.map((c) => (c.id === updatedCarrier.id ? updatedCarrier : c)));
  };

  const exportDirectoryCSV = () => {
    const headers = 'ID,Code,Company Name,GSTIN,Tier,Fleet Size,Placement SLA %,OnTime SLA %,Rating,Account Lead\n';
    const rows = filteredCarriers
      .map(
        (c) =>
          `"${c.id}","${c.code}","${c.name}","${c.gstin}","${c.tier}",${c.fleetSize},${c.placementAcceptancePct}%,${c.onTimeDeliveryPct}%,${c.rating},"${c.accountLead}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Enterprise_Carriers_Directory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <Layout
      title="Commercial Carrier & 3PL Transporter Directory"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Carriers', path: '/carriers' },
        { label: 'Directory', path: '/carriers' },
      ]}
    >
      <div className="carriers-page-container">
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Truck className="w-7 h-7 text-indigo-400" />
                Carrier Network & Transporter Management
              </h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                218 Partners
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Master transporter governance, placement compliance, verified fleet capacity, and contracted rate tariffs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/carriers/rates')}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Rate Cards</span>
            </button>
            <button
              onClick={() => navigate('/carriers/portal')}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-cyan-400 hover:text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Carrier Portal</span>
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Onboard Carrier</span>
            </button>
          </div>
        </div>

        {/* 5 Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="carrier-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Registered Carriers</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white">{carriersSummaryStats.totalRegisteredCarriers} Transporters</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3" /> 100% Vahan KYC Verified
            </div>
          </div>

          <div className="carrier-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Preferred Tier 1</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white">{carriersSummaryStats.preferredTier1Count} Fleet Leaders</div>
            <div className="text-[11px] text-cyan-400 mt-1">72% Freight Volume Share</div>
          </div>

          <div className="carrier-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Aggregate Fleet Pool</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white font-mono">{carriersSummaryStats.aggregateFleetPool}</div>
            <div className="text-[11px] text-slate-400 mt-1">Multi-Axle & Trailer Fleet</div>
          </div>

          <div className="carrier-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Placement SLA Score</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white font-mono">{carriersSummaryStats.avgPlacementAcceptancePct}%</div>
            <div className="text-[11px] text-purple-400 mt-1">Avg Placement: &lt; 3.2 hrs</div>
          </div>

          <div className="carrier-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Active Dispatches</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white font-mono">{carriersSummaryStats.activeDispatchesCount} Trucks</div>
            <div className="text-[11px] text-slate-400 mt-1">On-Time SLA: {carriersSummaryStats.onTimeDeliveryPct}%</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search transporter name, GSTIN, code, hubs, or lanes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
            {/* Tier Filters */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              {[
                { label: 'ALL', val: 'ALL' },
                { label: 'TIER 1', val: 'TIER1' },
                { label: 'TIER 2', val: 'TIER2' },
                { label: 'SPOT', val: 'SPOT' },
              ].map((t) => (
                <button
                  key={t.val}
                  onClick={() => setTierFilter(t.val)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                    tierFilter === t.val ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Account Statuses</option>
              <option value="HEALTHY">Active & Healthy</option>
              <option value="VERIFIED">KYC Verified</option>
              <option value="REVIEW">Audit Review</option>
            </select>

            <button
              onClick={exportDirectoryCSV}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Export Carrier Directory"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Transporters Table */}
        <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-800/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Transporter Partner</th>
                  <th className="py-3.5 px-3">SLA Tier & Rating</th>
                  <th className="py-3.5 px-3">Fleet Capacity</th>
                  <th className="py-3.5 px-3">Primary Lane Coverage</th>
                  <th className="py-3.5 px-3">Carrier Operations Lead</th>
                  <th className="py-3.5 px-3">Placement SLA</th>
                  <th className="py-3.5 px-3">On-Time SLA</th>
                  <th className="py-3.5 px-3">Compliance Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs">
                {filteredCarriers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500 text-sm">
                      No commercial carriers found matching current query or filters.
                    </td>
                  </tr>
                ) : (
                  filteredCarriers.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/carriers/${c.id}`)}
                    >
                      {/* Name & Code */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs flex-shrink-0">
                            {c.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                              {c.name}
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                {c.code}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                              <span>GSTIN: {c.gstin}</span>
                              <span>•</span>
                              <span>{c.activeTripsCount} active trips</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tier & Star Rating */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`carrier-tier-badge ${
                              c.tier.includes('Tier 1') ? 'tier-preferred' : 'tier-approved'
                            }`}
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            {c.tier}
                          </span>
                          <span className="carrier-rating-pill">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            {c.rating}
                          </span>
                        </div>
                      </td>

                      {/* Fleet Capacity */}
                      <td className="py-3.5 px-3">
                        <div className="text-white font-bold font-mono">{c.fleetSize} Trucks Pool</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[140px]">
                          32ft MX ({c.fleetBreakdown['32ft Multi-Axle MX'] || '—'}) • Trailers ({c.fleetBreakdown['40ft High-Cube Trailer'] || '—'})
                        </div>
                      </td>

                      {/* Lanes */}
                      <td className="py-3.5 px-3 max-w-[180px]">
                        <div className="text-slate-200 font-medium truncate">{c.primaryLanes[0]}</div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          + {c.primaryLanes.length - 1} more regular linehauls
                        </div>
                      </td>

                      {/* Account Lead */}
                      <td className="py-3.5 px-3">
                        <div className="text-slate-200 font-medium">{c.accountLead.split('(')[0]}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {c.accountLeadPhone}
                        </div>
                      </td>

                      {/* Placement SLA */}
                      <td className="py-3.5 px-3 font-mono">
                        <span className="text-cyan-400 font-bold">{c.placementAcceptancePct}%</span>
                        <div className="text-[10px] text-slate-400">Target &gt;96%</div>
                      </td>

                      {/* On-Time SLA */}
                      <td className="py-3.5 px-3 font-mono">
                        <span className="text-emerald-400 font-bold">{c.onTimeDeliveryPct}%</span>
                        <div className="text-[10px] text-slate-400">Claims: {c.claimsRatioPct}%</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            c.status.includes('Healthy')
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {c.verificationStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingCarrier(c)}
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Partner"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => navigate(`/carriers/${c.id}`)}
                            className="p-1.5 text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-medium"
                            title="Carrier 360°"
                          >
                            <span>360°</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        <CarrierCreateModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onAddCarrier={handleAddCarrier}
        />

        <CarrierEditModal
          isOpen={!!editingCarrier}
          carrier={editingCarrier}
          onClose={() => setEditingCarrier(null)}
          onUpdateCarrier={handleUpdateCarrier}
        />
      </div>
    </Layout>
  );
}
