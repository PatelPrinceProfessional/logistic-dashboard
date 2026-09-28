import React, { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  Building2,
  Truck,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  Calculator,
  FileText,
  Download,
  CheckCircle2,
  Leaf,
  MessageSquare,
  Plus,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  ThermometerSnowflake,
  Fuel,
  Share2
} from 'lucide-react';
import {
  customersList,
  customerPortalSessions,
} from '../../utils/mockData/customersData';
import SpotBookingModal from './components/SpotBookingModal';
import SupportTicketModal from './components/SupportTicketModal';
import './Customers.css';

export default function CustomerPortal() {
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST-001');
  const [activeTab, setActiveTab] = useState('tracking'); // tracking | bookings | epods | esg | support

  // Active Customer & Portal Session
  const currentCustomer = customersList.find((c) => c.id === selectedCustomerId) || customersList[0];
  const defaultSession = customerPortalSessions['CUST-001'];
  const portalSession = customerPortalSessions[selectedCustomerId] || defaultSession;

  const [portalData, setPortalData] = useState(customerPortalSessions);
  const currentSession = portalData[selectedCustomerId] || defaultSession;

  // Modals
  const [isSpotBookingOpen, setIsSpotBookingOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleConfirmSpotBooking = (bookingPayload) => {
    setPortalData((prev) => {
      const active = prev[selectedCustomerId] || defaultSession;
      return {
        ...prev,
        [selectedCustomerId]: {
          ...active,
          recentBookings: [bookingPayload, ...active.recentBookings],
        },
      };
    });
  };

  const handleAddSupportTicket = (newTicket) => {
    setPortalData((prev) => {
      const active = prev[selectedCustomerId] || defaultSession;
      return {
        ...prev,
        [selectedCustomerId]: {
          ...active,
          supportTickets: [newTicket, ...active.supportTickets],
        },
      };
    });
  };

  return (
    <Layout
      title="Shipper Self-Service Customer Portal"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Customers', path: '/customers' },
        { label: 'Shipper Portal', path: '/customers/portal' },
      ]}
    >
      <div className="customers-page-container">
        {/* Shipper Header & Client Switcher */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6 rounded-2xl border border-indigo-500/30 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg">
                  {currentCustomer.name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-white tracking-tight">{currentCustomer.name}</h1>
                  <span className="customer-tier-badge tier-platinum flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    {currentCustomer.tier} Shipper
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                    GSTIN: {currentCustomer.gstin}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>Code: {currentCustomer.code}</span>
                  <span>•</span>
                  <span>Assigned KAM: {currentCustomer.accountManager}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{currentCustomer.status}</span>
                </p>
              </div>
            </div>

            {/* Client Account Switcher (Interactive Demo) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-[11px] text-slate-400 font-medium">Switch Shipper Account</div>
                <div className="text-xs text-cyan-400">Enterprise Multi-Tenant Portal</div>
              </div>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="bg-slate-800/90 border border-indigo-500/40 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:outline-none focus:border-cyan-400 shadow-inner cursor-pointer"
              >
                {customersList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.tier})
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsSpotBookingOpen(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Instant Spot Quote</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Approved Credit Limit</span>
              <span className="text-base font-bold text-white font-mono">
                ₹ {(currentCustomer.creditLimit / 100000).toFixed(1)} Lakhs
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{currentCustomer.creditTerms}</span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Available Credit Balance</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                ₹ {((currentCustomer.creditLimit - currentCustomer.outstandingBalance) / 100000).toFixed(1)} Lakhs
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {currentCustomer.creditUtilizationPct}% Utilized
              </span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Contract On-Time SLA</span>
              <span className="text-base font-bold text-cyan-400 font-mono">
                {currentCustomer.onTimeSlaPct}%
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Exceeds 98% SLA target</span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">24x7 KAM Priority Desk</span>
              <span className="text-xs font-bold text-white block mt-1 truncate">
                {currentCustomer.accountManagerPhone}
              </span>
              <span className="text-[10px] text-indigo-400 block mt-0.5">Response: &lt; 15 mins</span>
            </div>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'tracking'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Live In-Transit Shipments ({currentSession.activeShipments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'bookings'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Spot Bookings & Quotes ({currentSession.recentBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('epods')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'epods'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>e-PODs & GST Invoices</span>
          </button>

          <button
            onClick={() => setActiveTab('esg')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'esg'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>ESG & Carbon Emissions</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'support'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Support Desk & KAM</span>
          </button>
        </div>

        {/* TAB 1: Live In-Transit Shipments */}
        {activeTab === 'tracking' && (
          <div className="space-y-4">
            {currentSession.activeShipments.length === 0 ? (
              <div className="bg-slate-900/40 p-12 rounded-xl text-center text-slate-400 border border-slate-800">
                No shipments currently in transit for this shipper.
              </div>
            ) : (
              currentSession.activeShipments.map((shp) => (
                <div
                  key={shp.id}
                  className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/40 transition-all space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-white">{shp.id}</span>
                          <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                            {shp.orderId}
                          </span>
                          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                            {shp.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Cargo: <strong className="text-slate-200">{shp.cargo}</strong> • Vehicle: {shp.vehicle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Expected Delivery ETA</span>
                        <span className="text-xs font-bold text-cyan-400 font-mono">{shp.eta}</span>
                      </div>
                      <a
                        href={`tel:${shp.driverPhone}`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Call Driver</span>
                      </a>
                    </div>
                  </div>

                  {/* Origin to Destination Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-center">
                    <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> Origin Facility
                      </div>
                      <div className="text-sm font-bold text-white mt-1">{shp.origin}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Dispatched & Gate Checked</div>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" /> Live Telemetry
                      </div>
                      <div className="text-sm font-bold text-cyan-300 mt-1">{shp.currentLocation}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        e-Way Bill: <span className="font-mono text-slate-300">{shp.ewbNumber}</span>
                      </div>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" /> Destination Facility
                      </div>
                      <div className="text-sm font-bold text-white mt-1">{shp.destination}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Dock Slot #3 Reserved</div>
                    </div>
                  </div>

                  {/* Progress Milestone Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Linehaul Route Completion:</span>
                      <span className="font-mono text-cyan-400 font-bold">{shp.progressPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-sm shadow-cyan-500/50 transition-all duration-500"
                        style={{ width: `${shp.progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Spot Bookings & Quotes */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Recent Spot Freight Quotes & Orders</h3>
                <p className="text-xs text-slate-400">Guaranteed rate lock with dynamic fuel surcharge formulas</p>
              </div>
              <button
                onClick={() => setIsSpotBookingOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Calculate New Spot Quote</span>
              </button>
            </div>

            <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Lane & Route</th>
                    <th className="py-3 px-3">Vehicle Configuration</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Locked Quote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentSession.recentBookings.map((bkg) => (
                    <tr key={bkg.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono font-bold text-white">{bkg.id}</td>
                      <td className="py-3 px-3 text-slate-300 font-mono">{bkg.date}</td>
                      <td className="py-3 px-3 font-medium text-slate-200">{bkg.route}</td>
                      <td className="py-3 px-3 text-slate-400">{bkg.vehicleType}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {bkg.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-white">
                        ₹ {bkg.quoteAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: e-PODs & Invoices */}
        {activeTab === 'epods' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Digital Proof of Delivery (e-POD) & Tax Invoices</h3>
                <p className="text-xs text-slate-400">IRP-certified E-Invoices and consignee geo-stamped e-POD signatures</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">INV-2026-9041</span>
                    <h4 className="text-sm font-bold text-white">Consolidated Linehaul Bill - Sept (Part 1)</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Paid (Bank UTR)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Billed:</span>
                  <span className="font-bold text-white font-mono">₹ 14,80,000</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Attached e-PODs:</span>
                  <span className="text-cyan-400 font-semibold">12 Consignment Receipts</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => alert('Downloading IRP-Compliant GST Tax Invoice PDF...')}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download GST Invoice PDF</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">INV-2026-9182</span>
                    <h4 className="text-sm font-bold text-white">Mid-Month Freight Statement - Sept (Part 2)</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    Due in 14 Days (Net 30)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Billed:</span>
                  <span className="font-bold text-white font-mono">₹ 18,79,932</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Attached e-PODs:</span>
                  <span className="text-cyan-400 font-semibold">14 Consignment Receipts</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => alert('Downloading Signed e-POD ZIP Archive...')}
                    className="w-full py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download e-POD Archive (ZIP)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ESG & Sustainability */}
        {activeTab === 'esg' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-6 rounded-xl border border-emerald-500/30 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Scope 3 Freight Carbon Footprint</h3>
                    <p className="text-xs text-slate-300">ISO 14064 & GLEC Framework Certified Reporting</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {currentSession.sustainability.greenScore}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Total Freight CO₂ Emissions</span>
                  <span className="text-2xl font-black text-white font-mono mt-1 block">
                    {currentSession.sustainability.totalCo2EmissionsMt} MT
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">Period: Current Financial Quarter</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">CO₂ Saved via Route Optimization</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
                    {currentSession.sustainability.co2SavedVsStandardRoadMt} MT
                  </span>
                  <span className="text-[11px] text-emerald-400 mt-1 block">-18.4% vs unoptimized road transit</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Rail Multimodal Share</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">
                    {currentSession.sustainability.railMultimodalPct}%
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">Electric DFC rail corridor conversion</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Support Desk & KAM */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Dedicated Key Account Management & Support Desk</h3>
                <p className="text-xs text-slate-400">Direct escalation channel with &lt; 15 min response time SLA</p>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Raise Support Ticket</span>
              </button>
            </div>

            <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-3">Subject / Issue</th>
                    <th className="py-3 px-3">Priority</th>
                    <th className="py-3 px-3">Created</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Response SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentSession.supportTickets.map((tck) => (
                    <tr key={tck.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-400">{tck.id}</td>
                      <td className="py-3 px-3 font-semibold text-white">{tck.issue}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            tck.priority === 'High'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                          }`}
                        >
                          {tck.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{tck.created}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            tck.status.includes('Resolved')
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {tck.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-cyan-400 font-medium">
                        {tck.responseTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modals */}
        <SpotBookingModal
          isOpen={isSpotBookingOpen}
          onClose={() => setIsSpotBookingOpen(false)}
          onConfirmBooking={handleConfirmSpotBooking}
          currentCustomerName={currentCustomer.name}
        />

        <SupportTicketModal
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
          onAddTicket={handleAddSupportTicket}
          customerName={currentCustomer.name}
        />
      </div>
    </Layout>
  );
}
