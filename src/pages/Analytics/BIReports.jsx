import React, { useState, useMemo } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import {
  FileText,
  Search,
  Plus,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  Filter,
  Sparkles,
  Eye,
  Mail,
  Table,
  Layers,
  ArrowRight,
  FileSpreadsheet
} from 'lucide-react';
import { biReportsCatalog as initialReports } from '../../utils/mockData/analyticsData';
import ReportBuilderModal from './components/ReportBuilderModal';
import './Analytics.css';

export default function BIReports() {
  const [reports, setReports] = useState(initialReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [expandedReportId, setExpandedReportId] = useState(reports[0]?.id || 'REP-001');

  // Modal State
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        categoryFilter === 'ALL' ||
        (categoryFilter === 'CARRIER' && r.category.includes('Carrier')) ||
        (categoryFilter === 'FINANCE' && r.category.includes('Financial')) ||
        (categoryFilter === 'CUSTOMER' && r.category.includes('Customer')) ||
        (categoryFilter === 'FACILITY' && r.category.includes('Facility'));

      return matchSearch && matchCategory;
    });
  }, [reports, searchQuery, categoryFilter]);

  const handleAddReport = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
    setExpandedReportId(newReport.id);
  };

  const handleDownloadReport = (rep, format = 'csv') => {
    const headers = rep.headers.join(',') + '\n';
    const rows = rep.rows.map((r) => r.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rep.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format === 'csv' ? 'csv' : 'csv'}`;
    a.click();
  };

  return (
    <Layout
      title="Business Intelligence Reports & Query Studio"
      breadcrumbs={[
        { label: 'Dashboard', path: '/' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'BI Reports', path: '/analytics/reports' },
      ]}
    >
      <div className="analytics-page-container">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <FileText className="w-7 h-7 text-indigo-400" />
                Enterprise BI Reports & Query Studio
              </h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                {reports.length} Pre-Built Queries
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Automated executive reporting, corridor margin contribution, carrier penalty debit notes, and audit exports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBuilderOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom BI Query</span>
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
                placeholder="Search report templates by keyword, category, or dimension..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { label: 'ALL REPORTS', val: 'ALL' },
              { label: 'CARRIER AUDIT', val: 'CARRIER' },
              { label: 'FINANCIAL & FSC', val: 'FINANCE' },
              { label: 'CUSTOMER OTIF', val: 'CUSTOMER' },
              { label: 'DOCK & DETENTION', val: 'FACILITY' },
            ].map((c) => (
              <button
                key={c.val}
                onClick={() => setCategoryFilter(c.val)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  categoryFilter === c.val
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Catalog & Interactive Previews */}
        <div className="space-y-6">
          {filteredReports.map((rep) => {
            const isExpanded = expandedReportId === rep.id;

            return (
              <div
                key={rep.id}
                className={`bg-slate-900/60 rounded-2xl border transition-all overflow-hidden ${
                  isExpanded ? 'border-indigo-500/50 shadow-xl' : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Report Card Header */}
                <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 flex-shrink-0">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-white text-base">{rep.title}</span>
                        <span className="text-[10px] bg-slate-800 text-cyan-400 font-semibold px-2 py-0.5 rounded border border-slate-700">
                          {rep.category}
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                          {rep.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{rep.description}</p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono mt-1.5 flex-wrap">
                        <span>Schedule: <strong>{rep.frequency}</strong></span>
                        <span>•</span>
                        <span>Last Executed: <strong>{rep.lastRunDate}</strong></span>
                        <span>•</span>
                        <span>Formats: <strong>{rep.format}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end lg:self-center">
                    <button
                      onClick={() => setExpandedReportId(isExpanded ? null : rep.id)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isExpanded ? 'Hide Data Grid' : 'Preview Live Grid'}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadReport(rep, 'csv')}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Live Data Grid Preview */}
                {isExpanded && (
                  <div className="border-t border-slate-800 bg-slate-950/60 p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Table className="w-4 h-4 text-indigo-400" />
                        Live Query Result Preview (Showing Top Sample Rows)
                      </span>
                      <span>Total Matched Rows: {rep.sampleRowCount} records</span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-semibold uppercase">
                            {rep.headers.map((h, idx) => (
                              <th key={idx} className="py-2.5 px-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {rep.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-800/30">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2.5 px-3 font-mono text-slate-200">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal */}
        <ReportBuilderModal
          isOpen={isBuilderOpen}
          onClose={() => setIsBuilderOpen(false)}
          onAddReport={handleAddReport}
        />
      </div>
    </Layout>
  );
}
