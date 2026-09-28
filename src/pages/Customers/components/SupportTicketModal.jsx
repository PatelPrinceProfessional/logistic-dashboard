import React, { useState } from 'react';
import { X, HelpCircle, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import '../Customers.css';

export default function SupportTicketModal({ isOpen, onClose, onAddTicket, customerName = 'Tata Motors Limited' }) {
  const [formData, setFormData] = useState({
    issue: '',
    category: 'Billing & Invoicing',
    priority: 'Medium',
    shipmentId: '',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.issue) return;

    const newTicket = {
      id: `TCK-${Math.floor(410 + Math.random() * 500)}`,
      issue: formData.issue,
      priority: formData.priority,
      category: formData.category,
      status: 'Open (Escalated to KAM)',
      created: 'Just now',
      responseTime: '< 15 mins SLA',
      shipmentId: formData.shipmentId || 'N/A',
    };

    onAddTicket(newTicket);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-container">
        <div className="customer-modal-header">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              Raise Shipper Support Ticket
            </h3>
            <p className="text-xs text-slate-400">Account: {customerName} | 24x7 Dedicated KAM Escalation Desk</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Support Ticket Dispatched</h4>
            <p className="text-xs text-slate-300">
              Your Key Account Manager & Control Tower Duty Officer have been notified. Priority response within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Issue Title</label>
              <input
                type="text"
                required
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g., Request for e-POD re-upload or FastTag statement"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Live Tracking & Delay">Live Tracking & Delay</option>
                  <option value="Billing & Invoicing">Billing & Invoicing</option>
                  <option value="e-POD & Proof of Delivery">e-POD & Proof of Delivery</option>
                  <option value="Dock & Gate Appointment">Dock & Gate Appointment</option>
                  <option value="Special Cargo Reefer Escort">Special Cargo Reefer Escort</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Priority Level</label>
                <select
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Low">Low (General Query)</option>
                  <option value="Medium">Medium (Standard Request)</option>
                  <option value="High">High (Linehaul ETA Critical)</option>
                  <option value="Urgent">Urgent (Breakdown / Plant Stoppage)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Associated Shipment / LR No. (Optional)</label>
              <input
                type="text"
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                placeholder="e.g., SHP-88092"
                value={formData.shipmentId}
                onChange={(e) => setFormData({ ...formData, shipmentId: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
              <textarea
                rows={3}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Provide specific notes or instructions for the customer support team..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
