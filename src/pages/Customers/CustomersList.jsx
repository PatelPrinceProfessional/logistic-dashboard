import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import {
  Users,
  Building2,
  ShieldCheck,
  DollarSign,
  TrendingUp,
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
  Layers,
  MapPin,
  FileSpreadsheet
} from 'lucide-react';
import { customersSummaryStats, customersList as initialCustomers } from '../../utils/mockData/customersData';
import CustomerCreateModal from './components/CustomerCreateModal';
import CustomerEditModal from './components/CustomerEditModal';
import './Customers.css';

export default function CustomersList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Filtered dataset
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.accountManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTier = tierFilter === 'ALL' || c.tier.toUpperCase() === tierFilter;
      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'HEALTHY' && c.status.includes('Healthy')) ||
        (statusFilter === 'REVIEW' && c.status.includes('Review')) ||
        (statusFilter === 'LOCKED' && c.status.includes('Locked'));

      return matchSearch && matchTier && matchStatus;
    });
  }, [customers, searchQuery, tierFilter, statusFilter]);

  const handleAddCustomer = (newCust) => {
    setCustomers((prev) => [newCust, ...prev]);
  };

  const handleUpdateCustomer = (updatedCust) => {
    setCustomers((prev) => prev.map((c) => (c.id === updatedCust.id ? updatedCust : c)));
  };

  const exportDirectoryCSV = () => {
    const headers = 'ID,Code,Company Name,GSTIN,Tier,Industry,Credit Limit,Outstanding,Utilization %,SLA %,Account Manager\n';
    const rows = filteredCustomers
      .map(
        (c) =>
          `"${c.id}","${c.code}","${c.name}","${c.gstin}","${c.tier}","${c.industry}",${c.creditLimit},${c.outstandingBalance},${c.creditUtilizationPct}%,${c.onTimeSlaPct}%,"${c.accountManager}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Enterprise_Customers_Directory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <Layout
      title="Customer Accounts & Shipper Management"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Customers', path: '/customers' },
        { label: 'Directory', path: '/customers' },
      ]}
    >
      <div className="customers-page-container">
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Building2 className="w-7 h-7 text-indigo-400" />
                Enterprise B2B Customer Directory
              </h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                142 Shippers
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Comprehensive account 360°, contracted freight lanes, credit limit exposure, and SLA performance telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/customers/portal')}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-cyan-400 hover:text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Shipper Portal</span>
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Onboard B2B Account</span>
            </button>
          </div>
        </div>

        {/* 5 Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="customer-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Active Accounts</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white">{customersSummaryStats.totalActiveAccounts} Shippers</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" /> +12% YoY Volume Growth
            </div>
          </div>

          <div className="customer-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Platinum SLA Tier</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white">{customersSummaryStats.platinumTierCount} High-Priority</div>
            <div className="text-[11px] text-cyan-400 mt-1">24% of Account Base</div>
          </div>

          <div className="customer-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Monthly Shipper GMV</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white font-mono">{customersSummaryStats.monthlyShipperGmv}</div>
            <div className="text-[11px] text-emerald-400 mt-1">99.4% Collection Health</div>
          </div>

          <div className="customer-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">On-Time SLA Delivery</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white font-mono">{customersSummaryStats.onTimeSlaPct}%</div>
            <div className="text-[11px] text-purple-400 mt-1">Target SLA: 98.0%</div>
          </div>

          <div className="customer-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Credit Utilization</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold text-white font-mono">{customersSummaryStats.creditUtilizationPct}%</div>
            <div className="text-[11px] text-slate-400 mt-1">Limit: {customersSummaryStats.aggregateCreditLimit}</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by company name, code, GSTIN, KAM, or sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
            {/* SLA Tier Filter */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              {['ALL', 'PLATINUM', 'GOLD', 'SILVER'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                    tierFilter === tier
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tier}
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
              <option value="REVIEW">Payment Overdue</option>
              <option value="LOCKED">Credit Locked</option>
            </select>

            <button
              onClick={exportDirectoryCSV}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Export to CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* B2B Customers Accounts Table */}
        <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-800/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer Account</th>
                  <th className="py-3.5 px-3">SLA Tier</th>
                  <th className="py-3.5 px-3">Industry & Base</th>
                  <th className="py-3.5 px-3">Account Lead (KAM)</th>
                  <th className="py-3.5 px-3">Monthly Volume</th>
                  <th className="py-3.5 px-4">Credit Utilization</th>
                  <th className="py-3.5 px-3">On-Time SLA</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500 text-sm">
                      No customer accounts found matching current query or filters.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => {
                    const utilPct = cust.creditUtilizationPct || 0;
                    const isHighRisk = utilPct > 75;
                    const isMedRisk = utilPct > 50;

                    return (
                      <tr
                        key={cust.id}
                        className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                        onClick={() => navigate(`/customers/${cust.id}`)}
                      >
                        {/* Company Code & Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs flex-shrink-0">
                              {cust.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-white flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                                {cust.name}
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                  {cust.code}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                                <span>GSTIN: {cust.gstin}</span>
                                <span>•</span>
                                <span>{cust.activeShipmentsCount || 0} active loads</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* SLA Tier Badge */}
                        <td className="py-3.5 px-3">
                          <span
                            className={`customer-tier-badge ${
                              cust.tier === 'Platinum'
                                ? 'tier-platinum'
                                : cust.tier === 'Gold'
                                ? 'tier-gold'
                                : 'tier-silver'
                            }`}
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            {cust.tier}
                          </span>
                        </td>

                        {/* Industry & Location */}
                        <td className="py-3.5 px-3">
                          <div className="text-slate-200 font-medium">{cust.industry}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {cust.city}
                          </div>
                        </td>

                        {/* KAM */}
                        <td className="py-3.5 px-3">
                          <div className="text-slate-200 font-medium">{cust.accountManager}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {cust.accountManagerPhone || '+91 98200 44120'}
                          </div>
                        </td>

                        {/* Spend & Freight MT */}
                        <td className="py-3.5 px-3">
                          <div className="text-white font-bold font-mono">
                            ₹ {(cust.monthlySpend / 100000).toFixed(1)} L / mo
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {cust.monthlyVolumeMt} MT Volume
                          </div>
                        </td>

                        {/* Credit Utilization Bar */}
                        <td className="py-3.5 px-4 min-w-[160px]">
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="text-slate-300">
                              ₹ {(cust.outstandingBalance / 100000).toFixed(1)}L / {(cust.creditLimit / 100000).toFixed(1)}L
                            </span>
                            <span
                              className={`font-bold ${
                                isHighRisk ? 'text-rose-400' : isMedRisk ? 'text-amber-400' : 'text-emerald-400'
                              }`}
                            >
                              {utilPct}%
                            </span>
                          </div>
                          <div className="customer-progress-bg">
                            <div
                              className={`customer-progress-fill ${
                                isHighRisk
                                  ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                                  : isMedRisk
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, utilPct)}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1">{cust.creditTerms}</div>
                        </td>

                        {/* On-Time SLA Gauge */}
                        <td className="py-3.5 px-3 font-mono">
                          <span className="text-emerald-400 font-bold">{cust.onTimeSlaPct}%</span>
                          <div className="text-[10px] text-slate-400">Target 98.0%</div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              cust.status.includes('Healthy')
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : cust.status.includes('Review')
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            }`}
                          >
                            {cust.status}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingCustomer(cust)}
                              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                              title="Edit Credit Limits & KAM"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => navigate(`/customers/${cust.id}`)}
                              className="p-1.5 text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-medium"
                              title="Account 360°"
                            >
                              <span>360°</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        <CustomerCreateModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onAddCustomer={handleAddCustomer}
        />

        <CustomerEditModal
          isOpen={!!editingCustomer}
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </div>
    </Layout>
  );
}
