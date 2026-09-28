import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Leaf,
  Layers,
  MapPin,
  Calendar,
  Download,
  RefreshCw,
  Sparkles,
  FileText,
  PieChart as PieIcon,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  analyticsSummaryKpis,
  monthlyOtifTrends,
  lanePerformanceAnalytics,
  carrierAnalyticsScatter,
} from '../../utils/mockData/analyticsData';
import './Analytics.css';

const CARRIER_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#f59e0b', '#ec4899', '#a855f7'];

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('Q3 2026');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleExportData = () => {
    alert('Exporting Executive Analytics Data Cube (CSV / Excel)...');
  };

  return (
    <Layout
      title="Enterprise Logistics Analytics & Business Intelligence"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Intelligence Dashboard', path: '/analytics' },
      ]}
    >
      <div className="analytics-page-container">
        {/* Header Title & Period Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <BarChart2 className="w-7 h-7 text-indigo-400" />
                Logistics Intelligence & Executive Analytics
              </h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                Live Telemetry Cube
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Multi-dimensional cost-to-serve analysis, On-Time In-Full (OTIF) telemetry, and corridor profitability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700/80">
              {['Last 30 Days', 'Q3 2026', 'Year to Date'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    period === p ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              className={`p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors ${
                isRefreshing ? 'animate-spin text-indigo-400' : ''
              }`}
              title="Refresh Data Cube"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/analytics/reports')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 hover:text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>BI Reports</span>
            </button>

            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Cube</span>
            </button>
          </div>
        </div>

        {/* 5 Executive KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="analytics-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Composite OTIF Score</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-white font-mono">{analyticsSummaryKpis.otifDeliveryPct}%</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" /> +1.6% vs SLA Target (95.0%)
            </div>
          </div>

          <div className="analytics-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Cost per Ton-KM</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-white font-mono">₹ {analyticsSummaryKpis.costPerTonKm}</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <TrendingDown className="w-3 h-3" /> -4.2% YoY Cost Efficiency
            </div>
          </div>

          <div className="analytics-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Monthly Freight Spend</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-white font-mono">{analyticsSummaryKpis.monthlyFreightSpend}</div>
            <div className="text-[11px] text-cyan-400 mt-1">1.8% Under Budget Allowance</div>
          </div>

          <div className="analytics-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Asset Utilization</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-white font-mono">{analyticsSummaryKpis.fleetAssetUtilizationPct}%</div>
            <div className="text-[11px] text-purple-400 mt-1">Empty Miles Reduced: 14.2%</div>
          </div>

          <div className="analytics-kpi-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Scope 3 CO₂ Saved</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Leaf className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-white font-mono">{analyticsSummaryKpis.carbonSavedMt} MT</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3" /> A+ Rating (GLEC Verified)
            </div>
          </div>
        </div>

        {/* 2-Column Primary Charts: OTIF Trend & Freight Spend vs Volume */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OTIF Composite Performance Trend */}
          <div className="analytics-chart-card">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  6-Month On-Time In-Full (OTIF) Trend
                </h3>
                <p className="text-xs text-slate-400">On-Time Linehaul vs In-Full Consignment Delivery</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">Target SLA: 95.0%</span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyOtifTrends}>
                  <defs>
                    <linearGradient id="otifGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="onTimeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis domain={[92, 100]} stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="otif" name="OTIF Composite %" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#otifGrad)" />
                  <Area type="monotone" dataKey="onTime" name="On-Time Delivery %" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#onTimeGrad)" />
                  <Area type="monotone" dataKey="target" name="Contract SLA Target" stroke="#f43f5e" strokeDasharray="4 4" strokeWidth={1.5} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Spend & Volume Growth */}
          <div className="analytics-chart-card">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  Freight Spend (₹ Cr) vs Shipped Volume (MT)
                </h3>
                <p className="text-xs text-slate-400">Monthly corridor throughput and linehaul expenditure</p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">MTD: 48.2k MT</span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOtifTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar yAxisId="left" dataKey="spendCr" name="Freight Spend (₹ Cr)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="volumeMt" name="Volume (MT)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2-Column Secondary Grid: Carrier Volume Allocation & Network Lane Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carrier Allocation Donut */}
          <div className="analytics-chart-card lg:col-span-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-indigo-400" />
                Carrier Freight Spend Share
              </h3>
              <span className="text-xs text-slate-400">Top 6 Transporters</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={carrierAnalyticsScatter}
                    dataKey="spendCr"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {carrierAnalyticsScatter.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CARRIER_COLORS[index % CARRIER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                    formatter={(value) => [`₹ ${value} Cr`, 'Spend']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 pt-2 text-xs">
              {carrierAnalyticsScatter.map((c, idx) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CARRIER_COLORS[idx] }} />
                    <span className="text-slate-300">{c.name}</span>
                  </div>
                  <span className="font-mono text-white font-medium">₹ {c.spendCr} Cr ({c.volumeShare}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* National Lane Corridor Profitability & Efficiency Table */}
          <div className="analytics-chart-card lg:col-span-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Corridor Profitability & Cost-to-Serve Benchmark
                </h3>
                <p className="text-xs text-slate-400">Linehaul cost per ton-km and OTIF compliance by lane</p>
              </div>
              <button
                onClick={() => navigate('/analytics/reports')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>View Full Matrix</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                    <th className="py-2.5 px-3">Freight Corridor</th>
                    <th className="py-2.5 px-3">Volume (MT)</th>
                    <th className="py-2.5 px-3">Monthly Spend</th>
                    <th className="py-2.5 px-3">Cost / Ton-KM</th>
                    <th className="py-2.5 px-3">OTIF %</th>
                    <th className="py-2.5 px-3 text-right">Primary Carriers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {lanePerformanceAnalytics.map((lane) => (
                    <tr key={lane.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-white">
                        {lane.lane}
                        <div className="text-[10px] text-slate-400 font-mono font-normal">{lane.distanceKm} km • ~{lane.avgTransitHours}h transit</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-200">{lane.monthlyVolumeMt} MT</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white">
                        ₹ {(lane.monthlySpend / 100000).toFixed(1)} L
                      </td>
                      <td className="py-2.5 px-3 font-mono text-cyan-400 font-bold">
                        ₹ {lane.costPerTonKm}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                        {lane.otifPct}%
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-400 text-[11px] truncate max-w-[160px]">
                        {lane.carrierShare}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
