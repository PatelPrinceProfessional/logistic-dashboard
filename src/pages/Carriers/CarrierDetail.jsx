import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import {
  Truck,
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Fuel,
  Layers,
  Navigation
} from 'lucide-react';
import { carriersList as initialCarriers, rateCardsList, carrierPortalSessions } from '../../utils/mockData/carriersData';
import CarrierEditModal from './components/CarrierEditModal';
import './Carriers.css';

export default function CarrierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [carriers, setCarriers] = useState(initialCarriers);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Find active carrier or fallback
  const carrier = carriers.find((c) => c.id === id) || carriers[0];

  const handleUpdateCarrier = (updatedCarrier) => {
    setCarriers((prev) => prev.map((c) => (c.id === updatedCarrier.id ? updatedCarrier : c)));
  };

  // Filter rate cards for this carrier
  const carrierRateCards = rateCardsList.filter((rc) => rc.carrierId === carrier.id);

  // Active dispatches
  const portalSession = carrierPortalSessions[carrier.id] || carrierPortalSessions['CRR-001'];
  const activeDispatches = portalSession.activeDispatches || [];

  return (
    <Layout
      title={`Carrier 360°: ${carrier.name}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Carriers', path: '/carriers' },
        { label: carrier.name, path: `/carriers/${carrier.id}` },
      ]}
    >
      <div className="carriers-page-container">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate('/carriers')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Carriers Directory</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/carriers/portal')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Transporter Portal</span>
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Partner</span>
            </button>
          </div>
        </div>

        {/* Master Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-indigo-500/30 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-2xl flex-shrink-0">
                {carrier.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-black text-white">{carrier.name}</h1>
                  <span
                    className={`carrier-tier-badge ${
                      carrier.tier.includes('Tier 1') ? 'tier-preferred' : 'tier-approved'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    {carrier.tier}
                  </span>
                  <span className="carrier-rating-pill">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {carrier.rating}
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                    {carrier.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {carrier.verificationStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1">{carrier.legalName}</div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 flex-wrap font-mono">
                  <span>GSTIN: <strong className="text-slate-200">{carrier.gstin}</strong></span>
                  <span>•</span>
                  <span>PAN: <strong className="text-slate-200">{carrier.pan}</strong></span>
                  <span>•</span>
                  <span>Fleet Pool: <strong className="text-cyan-400">{carrier.fleetSize} Trucks</strong></span>
                </div>
              </div>
            </div>

            {/* Bank Credentials */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2 lg:min-w-[280px]">
              <div className="flex items-center justify-between text-slate-400">
                <span>Payout Bank:</span>
                <span className="text-white font-medium">{carrier.bankDetails?.bankName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Account Number:</span>
                <span className="text-slate-200 font-mono">{carrier.bankDetails?.accountNo}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>IFSC Code:</span>
                <span className="text-cyan-400 font-mono font-bold">{carrier.bankDetails?.ifsc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Fleet Profile & Performance Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fleet Capacity Breakdown */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                Dedicated Commercial Fleet Breakdown
              </h3>
              <span className="text-xs font-mono font-bold text-white">{carrier.fleetSize} Trucks</span>
            </div>

            <div className="space-y-3 text-xs">
              {Object.entries(carrier.fleetBreakdown || {}).map(([vehicle, count]) => {
                const pct = Math.round((count / carrier.fleetSize) * 100);
                return (
                  <div key={vehicle} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-300 font-medium">{vehicle}</span>
                      <span className="font-mono text-cyan-400 font-bold">{count} ({pct}%)</span>
                    </div>
                    <div className="carrier-progress-bg">
                      <div className="carrier-progress-fill bg-cyan-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              Operating Hubs: <span className="text-slate-200">{carrier.primaryHubs.join(', ')}</span>
            </div>
          </div>

          {/* Performance Telemetry & SLA Radar */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Service Level Agreement (SLA) Telemetry
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">Tier 1 Compliance</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Placement Acceptance SLA</span>
                <span className="text-xl font-bold text-cyan-400 font-mono mt-1 block">
                  {carrier.placementAcceptancePct}%
                </span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">Target &gt;96%</span>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Transit On-Time SLA</span>
                <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">
                  {carrier.onTimeDeliveryPct}%
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Target 98%</span>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Transit Damage / Claims</span>
                <span className="text-xl font-bold text-slate-200 font-mono mt-1 block">
                  {carrier.claimsRatioPct}%
                </span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">Zero Total Loss</span>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Active Dispatches</span>
                <span className="text-xl font-bold text-indigo-400 font-mono mt-1 block">
                  {carrier.activeTripsCount} Trips
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Telematics Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contracted Rate Cards for this Carrier */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Contracted Lanes & Locked Tariffs ({carrierRateCards.length})
              </h3>
              <p className="text-xs text-slate-400">Master contracted freight rates and fuel escalation clauses</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                  <th className="py-3 px-4">Freight Lane</th>
                  <th className="py-3 px-3">Vehicle Configuration</th>
                  <th className="py-3 px-3">Contract Base Rate</th>
                  <th className="py-3 px-3">Fuel Surcharge (FSC) Formula</th>
                  <th className="py-3 px-4 text-right">Free Detention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {carrierRateCards.length > 0 ? (
                  carrierRateCards.map((rc) => (
                    <tr key={rc.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {rc.lane}
                      </td>
                      <td className="py-3 px-3 text-slate-300">{rc.vehicleType}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                        ₹ {rc.baseRate.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-mono flex items-center gap-1">
                        <Fuel className="w-3 h-3 text-amber-400" />
                        {rc.fscFormula}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300 font-mono">
                        {rc.freeDetentionHours} Hours Free
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      No dedicated lane rate cards locked. Spot tender matrix applies.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stakeholder Contacts Directory */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" />
              Carrier Operations & Key Stakeholders
            </h3>
            <span className="text-xs text-slate-400">{carrier.contacts.length} Contacts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {carrier.contacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white">{contact.name}</div>
                  <div className="text-[11px] text-cyan-400 mt-0.5">{contact.role}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">{contact.email}</div>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-mono text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <CarrierEditModal
          isOpen={isEditOpen}
          carrier={carrier}
          onClose={() => setIsEditOpen(false)}
          onUpdateCarrier={handleUpdateCarrier}
        />
      </div>
    </Layout>
  );
}
