import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import {
  Building2,
  ArrowLeft,
  ShieldCheck,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Truck,
  Sparkles,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Navigation,
  Scale,
  Fuel
} from 'lucide-react';
import { customersList as initialCustomers, customerPortalSessions } from '../../utils/mockData/customersData';
import CustomerEditModal from './components/CustomerEditModal';
import './Customers.css';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState(initialCustomers);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Find active customer or fallback
  const customer = customers.find((c) => c.id === id) || customers[0];

  const handleUpdateCustomer = (updatedCust) => {
    setCustomers((prev) => prev.map((c) => (c.id === updatedCust.id ? updatedCust : c)));
  };

  const utilPct = customer.creditUtilizationPct || 0;
  const isHighRisk = utilPct > 75;
  const isMedRisk = utilPct > 50;

  // Active shipments from portal data if available
  const portalSession = customerPortalSessions[customer.id] || customerPortalSessions['CUST-001'];
  const activeShipments = portalSession.activeShipments || [];

  return (
    <Layout
      title={`Customer 360°: ${customer.name}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Customers', path: '/customers' },
        { label: customer.name, path: `/customers/${customer.id}` },
      ]}
    >
      <div className="customers-page-container">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate('/customers')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Customers Directory</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/customers/portal')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Shipper Portal</span>
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Account & Limits</span>
            </button>
          </div>
        </div>

        {/* Account Master Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-indigo-500/30 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-2xl flex-shrink-0">
                {customer.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-black text-white">{customer.name}</h1>
                  <span
                    className={`customer-tier-badge ${
                      customer.tier === 'Platinum'
                        ? 'tier-platinum'
                        : customer.tier === 'Gold'
                        ? 'tier-gold'
                        : 'tier-silver'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    {customer.tier} Tier
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                    {customer.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      customer.status.includes('Healthy')
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1">{customer.legalName}</div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 flex-wrap font-mono">
                  <span>GSTIN: <strong className="text-slate-200">{customer.gstin}</strong></span>
                  <span>•</span>
                  <span>PAN: <strong className="text-slate-200">{customer.pan}</strong></span>
                  <span>•</span>
                  <span>Sector: <strong className="text-slate-200">{customer.industry}</strong></span>
                </div>
              </div>
            </div>

            {/* Contract Period & KAM */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2 lg:min-w-[280px]">
              <div className="flex items-center justify-between text-slate-400">
                <span>Contract Validity:</span>
                <span className="text-white font-mono font-medium">
                  {customer.contractStartDate} to {customer.contractEndDate}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Key Account Lead:</span>
                <span className="text-indigo-400 font-semibold">{customer.accountManager}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Direct Hotline:</span>
                <span className="text-slate-200 font-mono">{customer.accountManagerPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Financial Exposure & Key Stakeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Exposure & Credit Ledger */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Credit Exposure & Billing Parameters
              </h3>
              <span className="text-xs text-slate-400">{customer.creditTerms}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Approved Limit</span>
                <span className="text-base font-bold text-white font-mono mt-1 block">
                  ₹ {(customer.creditLimit / 100000).toFixed(1)} L
                </span>
              </div>
              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Outstanding Billed</span>
                <span className="text-base font-bold text-amber-400 font-mono mt-1 block">
                  ₹ {(customer.outstandingBalance / 100000).toFixed(1)} L
                </span>
              </div>
              <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Available Credit</span>
                <span className="text-base font-bold text-emerald-400 font-mono mt-1 block">
                  ₹ {((customer.creditLimit - customer.outstandingBalance) / 100000).toFixed(1)} L
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Credit Limit Utilization:</span>
                <span className={`font-bold ${isHighRisk ? 'text-rose-400' : isMedRisk ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {utilPct}%
                </span>
              </div>
              <div className="customer-progress-bg">
                <div
                  className={`customer-progress-fill ${
                    isHighRisk ? 'bg-rose-500' : isMedRisk ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, utilPct)}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-1">
              Registered Billing Address: <span className="text-slate-300">{customer.billingAddress}</span>
            </div>
          </div>

          {/* Stakeholders & Key Contacts */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Key Stakeholders & Escalation Matrix
              </h3>
              <span className="text-xs text-slate-400">{customer.contacts.length} Contacts</span>
            </div>

            <div className="space-y-3">
              {customer.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/40 p-3.5 rounded-lg border border-slate-700/50 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{contact.name}</div>
                    <div className="text-[11px] text-cyan-400">{contact.role}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{contact.email}</div>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-mono text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contracted Freight Lanes & Dynamic Rate Cards */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-indigo-400" />
                Contracted Lanes & Master Rate Cards
              </h3>
              <p className="text-xs text-slate-400">Pre-negotiated tariffs and dynamic diesel escalation formulas</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                  <th className="py-3 px-4">Freight Lane & Distance</th>
                  <th className="py-3 px-3">Vehicle Configuration</th>
                  <th className="py-3 px-3">Base Contract Rate</th>
                  <th className="py-3 px-3">Fuel Surcharge (FSC) Formula</th>
                  <th className="py-3 px-4 text-right">Free Detention SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {customer.rateCards && customer.rateCards.length > 0 ? (
                  customer.rateCards.map((rc, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {rc.lane}
                      </td>
                      <td className="py-3 px-3 text-slate-300">{rc.vehicle}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                        ₹ {rc.baseRate.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-mono flex items-center gap-1">
                        <Fuel className="w-3 h-3 text-amber-400" />
                        {rc.fscFormula}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300 font-mono">
                        {rc.freeDetentionHours} Hours
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      Standard spot matrix applies. No dedicated lane rate cards locked.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active In-Flight Shipments */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                Live In-Transit Shipments ({activeShipments.length})
              </h3>
              <p className="text-xs text-slate-400">Active linehaul consignments currently in flight</p>
            </div>
          </div>

          <div className="space-y-3">
            {activeShipments.map((shp) => (
              <div
                key={shp.id}
                className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">{shp.id}</span>
                    <span className="font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded text-[10px]">
                      {shp.orderId}
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                      {shp.status}
                    </span>
                  </div>
                  <div className="text-slate-300 mt-1">
                    Route: <strong className="text-white">{shp.origin} → {shp.destination}</strong>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Vehicle: {shp.vehicle} • Driver: {shp.driver} ({shp.driverPhone})
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Expected Delivery</span>
                  <span className="font-mono font-bold text-cyan-400">{shp.eta}</span>
                  <div className="w-28 h-1.5 bg-slate-700 rounded-full mt-1.5 overflow-hidden ml-auto">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${shp.progressPct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <CustomerEditModal
          isOpen={isEditOpen}
          customer={customer}
          onClose={() => setIsEditOpen(false)}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </div>
    </Layout>
  );
}
