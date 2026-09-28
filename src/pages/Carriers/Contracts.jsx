import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  FileText,
  Search,
  Plus,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Send
} from 'lucide-react';
import { contractsList as initialContracts } from '../../utils/mockData/carriersData';
import './Carriers.css';

export default function Contracts() {
  const [contracts, setContracts] = useState(initialContracts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const matchSearch =
        c.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.carrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.signatoryName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && c.status.includes('Active')) ||
        (statusFilter === 'RENEWAL' && c.status.includes('Renewal'));

      return matchSearch && matchStatus;
    });
  }, [contracts, searchQuery, statusFilter]);

  const handleDownloadPdf = (contractNo) => {
    alert(`Downloading Master Service Agreement (${contractNo}) legally binding PDF...`);
  };

  const handleRequestRenewal = (id) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: 'Renewal Initiated (Legal Review)', renewalAlert: 'In Legal Escrow' } : c
      )
    );
  };

  return (
    <Layout
      title="Transporter Master Service Agreements (MSAs) & Contracts"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Carriers', path: '/carriers' },
        { label: 'Contracts', path: '/carriers/contracts' },
      ]}
    >
      <div className="carriers-page-container">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <FileText className="w-7 h-7 text-indigo-400" />
                Master Service Agreements (MSAs) & SLA Governance
              </h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                {contracts.length} Master Contracts
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Legally binding transporter MSAs, performance penalty covenants, and marine cargo insurance policies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Initiating new MSA Contract generation wizard...')}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Initiate New MSA</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by MSA number, carrier name, or signatory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[
              { label: 'ALL CONTRACTS', val: 'ALL' },
              { label: 'ACTIVE & SIGNED', val: 'ACTIVE' },
              { label: 'EXPIRING / RENEWAL', val: 'RENEWAL' },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => setStatusFilter(s.val)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === s.val
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contracts List Cards */}
        <div className="space-y-4">
          {filteredContracts.map((ctr) => {
            const isExpiring = ctr.status.includes('Renewal') || ctr.renewalAlert.includes('Expiring in 2 Days');

            return (
              <div
                key={ctr.id}
                className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/40 transition-all space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-800">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-white text-base">{ctr.contractNumber}</span>
                        <span className="text-xs bg-slate-800 text-indigo-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                          {ctr.carrierName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            isExpiring
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {ctr.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-200 mt-1">{ctr.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Authorized Signatory: <strong className="text-slate-300">{ctr.signatoryName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end lg:self-center">
                    <button
                      onClick={() => handleDownloadPdf(ctr.contractNumber)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Download PDF</span>
                    </button>
                    {isExpiring && (
                      <button
                        onClick={() => handleRequestRenewal(ctr.id)}
                        className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Trigger Renewal e-Sign</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Contract Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" /> Contract Term
                    </span>
                    <div className="font-mono text-white font-bold mt-1">
                      {ctr.effectiveDate} → {ctr.expirationDate}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{ctr.renewalAlert}</div>
                  </div>

                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" /> Guaranteed SLA
                    </span>
                    <div className="font-mono text-cyan-400 font-bold mt-1">
                      {ctr.placementSlaHours} Hours Placement ({ctr.placementSlaPct}%)
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Strict Tier 1 Allocation Window</div>
                  </div>

                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> Marine Cargo Policy
                    </span>
                    <div className="text-slate-200 font-bold mt-1">{ctr.cargoInsuranceCover}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Zero Deductible Transit Cover</div>
                  </div>

                  <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" /> Penalty Covenants
                    </span>
                    <div className="text-slate-300 font-medium mt-1 truncate" title={ctr.penaltyClause}>
                      {ctr.penaltyClause}
                    </div>
                    <div className="text-[10px] text-amber-400 mt-0.5">Automated Debit on Freight Audit</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
