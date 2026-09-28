import React, { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  Briefcase,
  Truck,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  FileText,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Upload,
  UserCheck,
  Send,
  Download,
  Calendar,
  Layers,
  Fuel,
  Navigation
} from 'lucide-react';
import { carriersList, carrierPortalSessions } from '../../utils/mockData/carriersData';
import LoadBidModal from './components/LoadBidModal';
import './Carriers.css';

export default function CarrierPortal() {
  const [selectedCarrierId, setSelectedCarrierId] = useState('CRR-001');
  const [activeTab, setActiveTab] = useState('loads'); // loads | dispatches | epods | payouts | fleet

  // Active Carrier & Portal Session
  const currentCarrier = carriersList.find((c) => c.id === selectedCarrierId) || carriersList[0];
  const defaultSession = carrierPortalSessions['CRR-001'];

  const [portalData, setPortalData] = useState(carrierPortalSessions);
  const currentSession = portalData[selectedCarrierId] || defaultSession;

  // Modals state
  const [biddingLoad, setBiddingLoad] = useState(null);

  const handleSubmitBid = (bidPayload) => {
    // Add to active dispatches and remove from available loads
    setPortalData((prev) => {
      const active = prev[selectedCarrierId] || defaultSession;
      const updatedAvailable = active.availableLoads.filter((l) => l.id !== bidPayload.loadId);
      const newDispatch = {
        id: `TRP-${Math.floor(9910 + Math.random() * 80)}`,
        shipmentId: `SHP-${Math.floor(88100 + Math.random() * 800)}`,
        route: bidPayload.placementTime,
        vehicleNumber: bidPayload.vehicleNumber,
        driverName: bidPayload.driverName,
        driverPhone: bidPayload.driverPhone,
        status: 'Gate Checked (Dispatched)',
        progressPct: 5,
        eta: 'In Transit',
        gpsTracking: 'Active (FastTag & Telematics)',
      };

      return {
        ...prev,
        [selectedCarrierId]: {
          ...active,
          availableLoads: updatedAvailable,
          activeDispatches: [newDispatch, ...active.activeDispatches],
        },
      };
    });
  };

  const handleSimulateEpodUpload = () => {
    const newEpod = {
      id: `EPOD-${Math.floor(4420 + Math.random() * 500)}`,
      shipmentId: `SHP-880${Math.floor(60 + Math.random() * 30)}`,
      orderId: `ORD-${Math.floor(5210 + Math.random() * 50)}`,
      consignee: 'Consignee Plant Gate',
      deliveredDate: new Date().toISOString().split('T')[0],
      status: 'Under OCR Validation',
      invoiceNumber: `INV-${currentCarrier.name.substring(0, 3).toUpperCase()}-2026-${Math.floor(910 + Math.random() * 80)}`,
      amount: 48500,
    };

    setPortalData((prev) => {
      const active = prev[selectedCarrierId] || defaultSession;
      return {
        ...prev,
        [selectedCarrierId]: {
          ...active,
          submittedEpods: [newEpod, ...active.submittedEpods],
        },
      };
    });
    alert('e-POD & Freight Invoice uploaded successfully! Transferred to 3-Way Match Audit Queue.');
  };

  return (
    <Layout
      title="Transporter & Fleet Partner Self-Service Portal"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Carriers', path: '/carriers' },
        { label: 'Carrier Portal', path: '/carriers/portal' },
      ]}
    >
      <div className="carriers-page-container">
        {/* Portal Header & Multi-Tenant Carrier Switcher */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6 rounded-2xl border border-indigo-500/30 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg">
                  {currentCarrier.name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-white tracking-tight">{currentCarrier.name}</h1>
                  <span className="carrier-tier-badge tier-preferred flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    {currentCarrier.tier} Partner
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                    Vendor Code: {currentCarrier.code}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>GSTIN: {currentCarrier.gstin}</span>
                  <span>•</span>
                  <span>KYC: <strong className="text-emerald-400">{currentCarrier.verificationStatus}</strong></span>
                  <span>•</span>
                  <span>Fleet Pool: {currentCarrier.fleetSize} Commercial Trucks</span>
                </p>
              </div>
            </div>

            {/* Carrier Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-[11px] text-slate-400 font-medium">Switch Transporter Account</div>
                <div className="text-xs text-cyan-400">Carrier Self-Service Ecosystem</div>
              </div>
              <select
                value={selectedCarrierId}
                onChange={(e) => setSelectedCarrierId(e.target.value)}
                className="bg-slate-800/90 border border-indigo-500/40 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:outline-none focus:border-cyan-400 shadow-inner cursor-pointer"
              >
                {carriersList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.tier})
                  </option>
                ))}
              </select>

              <button
                onClick={handleSimulateEpodUpload}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Signed e-POD</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Placement Acceptance Rate</span>
              <span className="text-base font-bold text-cyan-400 font-mono">
                {currentCarrier.placementAcceptancePct}%
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Exceeds 96% SLA Target</span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Transit On-Time SLA</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {currentCarrier.onTimeDeliveryPct}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Claims Ratio: {currentCarrier.claimsRatioPct}%</span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Registered Payout Bank</span>
              <span className="text-xs font-bold text-white block mt-1 truncate">
                {currentCarrier.bankDetails?.bankName || 'HDFC Bank'}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                IFSC: {currentCarrier.bankDetails?.ifsc || 'HDFC0000123'}
              </span>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Dedicated Operations Desk</span>
              <span className="text-xs font-bold text-white block mt-1 truncate">
                {currentCarrier.accountLeadPhone}
              </span>
              <span className="text-[10px] text-indigo-400 block mt-0.5">24x7 Control Tower Desk</span>
            </div>
          </div>
        </div>

        {/* Portal Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('loads')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'loads'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Open Loads & Spot RFQs ({currentSession.availableLoads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dispatches')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'dispatches'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>Assigned Dispatches & Trips ({currentSession.activeDispatches.length})</span>
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
            <span>e-PODs & Freight Invoices ({currentSession.submittedEpods.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'payouts'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Bank Settlement & TDS Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'fleet'
                ? 'bg-slate-800/60 text-cyan-400 border-cyan-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Registered Fleet & Drivers</span>
          </button>
        </div>

        {/* TAB 1: Open Loads for Bidding */}
        {activeTab === 'loads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Available Loads Open for Placement Bidding</h3>
                <p className="text-xs text-slate-400">Lock truck placements and receive immediate loading token</p>
              </div>
            </div>

            {currentSession.availableLoads.length === 0 ? (
              <div className="bg-slate-900/40 p-12 rounded-xl text-center text-slate-400 border border-slate-800">
                All open shipments have been allocated. Check back in a few minutes for new tenders.
              </div>
            ) : (
              currentSession.availableLoads.map((load) => (
                <div
                  key={load.id}
                  className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 transition-all space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-base">{load.id}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            {load.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Cargo: <strong className="text-slate-200">{load.cargo}</strong> • Required: {load.requiredVehicle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Baseline Target Freight</span>
                        <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 font-mono">
                          ₹ {load.targetRate.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => setBiddingLoad(load)}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Bid & Allocate Truck</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> Origin Pickup
                      </span>
                      <div className="text-sm font-bold text-white mt-1">{load.origin}</div>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" /> Placement SLA Cut-Off
                      </span>
                      <div className="text-sm font-bold text-amber-400 mt-1">{load.placementDeadline}</div>
                    </div>

                    <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" /> Destination Unloading
                      </span>
                      <div className="text-sm font-bold text-white mt-1">{load.destination}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Assigned Dispatches */}
        {activeTab === 'dispatches' && (
          <div className="space-y-4">
            {currentSession.activeDispatches.map((disp) => (
              <div
                key={disp.id}
                className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                      <Navigation className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-base">{disp.id}</span>
                        <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                          {disp.shipmentId}
                        </span>
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                          {disp.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Route: <strong className="text-slate-200">{disp.route}</strong> • Vehicle: {disp.vehicleNumber}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Expected ETA</span>
                      <span className="text-xs font-bold text-cyan-400 font-mono">{disp.eta}</span>
                    </div>
                    <a
                      href={`tel:${disp.driverPhone}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{disp.driverName}</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">GPS Telematics Tracking:</span>
                    <span className="font-mono text-cyan-400 font-bold">{disp.progressPct}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-sm shadow-cyan-500/50"
                      style={{ width: `${disp.progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: e-PODs & Invoices */}
        {activeTab === 'epods' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Proof of Delivery (e-POD) & Carrier Freight Bills</h3>
                <p className="text-xs text-slate-400">Direct integration with 3-Way Match Automated Audit Engine</p>
              </div>
              <button
                onClick={handleSimulateEpodUpload}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Signed e-POD</span>
              </button>
            </div>

            <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                    <th className="py-3 px-4">e-POD ID</th>
                    <th className="py-3 px-3">Shipment Ref</th>
                    <th className="py-3 px-3">Consignee Plant</th>
                    <th className="py-3 px-3">Delivered Date</th>
                    <th className="py-3 px-3">Audit Status</th>
                    <th className="py-3 px-4 text-right">Invoice Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentSession.submittedEpods.map((epod) => (
                    <tr key={epod.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-400">{epod.id}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">{epod.shipmentId}</td>
                      <td className="py-3 px-3 font-medium text-white">{epod.consignee}</td>
                      <td className="py-3 px-3 text-slate-400 font-mono">{epod.deliveredDate}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            epod.status.includes('Cleared')
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                          }`}
                        >
                          {epod.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-white">
                        ₹ {epod.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Settlement Ledger */}
        {activeTab === 'payouts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Transporter Payout Ledger & Section 194C TDS Breakdown</h3>
                <p className="text-xs text-slate-400">Direct bank NEFT/RTGS settlement with verified UTR numbers</p>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase">
                    <th className="py-3 px-4">Payment Ref</th>
                    <th className="py-3 px-3">Bank UTR Transaction</th>
                    <th className="py-3 px-3">Settlement Date</th>
                    <th className="py-3 px-3">Gross Freight</th>
                    <th className="py-3 px-3">TDS (2% u/s 194C)</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Net Disbursed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentSession.payoutLedger.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono font-bold text-white">{pay.id}</td>
                      <td className="py-3 px-3 font-mono text-cyan-400">{pay.utrNumber}</td>
                      <td className="py-3 px-3 text-slate-400 font-mono">{pay.date}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">₹ {pay.grossFreight.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 font-mono text-amber-400">-₹ {pay.tdsDeduction.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                        ₹ {pay.netDisbursed.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: Registered Fleet & Drivers */}
        {activeTab === 'fleet' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Registered Commercial Fleet & Verified Drivers</h3>
                <p className="text-xs text-slate-400">Vahan RC and Sarathi Commercial Driver License telemetry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSession.registeredDriversAndVehicles.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {item.type === 'Vehicle' ? <Truck className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{item.identifier}</h4>
                        <span className="text-[11px] text-slate-400">{item.category}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {item.vahanStatus || item.sarathiStatus}
                    </span>
                  </div>

                  {item.type === 'Vehicle' ? (
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono">
                      <div>Fitness Expiry: <strong className="text-slate-200">{item.fitnessExpiry}</strong></div>
                      <div>Insurance Expiry: <strong className="text-slate-200">{item.insuranceExpiry}</strong></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                      <div>Phone: <strong className="text-slate-200 font-mono">{item.phone}</strong></div>
                      <div>Experience: <strong className="text-slate-200">{item.experienceYears} Years Heavy Haul</strong></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Load Bid Modal */}
        <LoadBidModal
          isOpen={!!biddingLoad}
          load={biddingLoad}
          onClose={() => setBiddingLoad(null)}
          onSubmitBid={handleSubmitBid}
          carrierName={currentCarrier.name}
        />
      </div>
    </Layout>
  );
}
