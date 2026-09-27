import React, { useState } from 'react';
import Layout from '../../components/Common/Layout/Layout';
import { consolidationOpportunities } from '../../utils/mockData/loadBuildingData';
import './LoadBuilding.css';

const ConsolidationManagement = () => {
  const [activeTab, setActiveTab] = useState('destination');

  const currentData = consolidationOpportunities[activeTab] || [];

  return (
    <Layout activePage="load-building-consolidation">
      <div className="consolidation-mgmt-container">
        <div className="load-building-header">
          <div className="load-building-title">
            <h1>Consolidation Management Hub</h1>
            <p>Identify, evaluate, and combine LTL shipments into high-density FTL multi-stop runs</p>
          </div>
          <div className="load-building-actions">
            <button className="lb-btn lb-btn-outline" onClick={() => alert('Exporting Consolidation Audit Report (PDF)...')}>
              Export Report
            </button>
            <button className="lb-btn lb-btn-primary" onClick={() => alert('Batch Consolidation Optimization Engine Executed!')}>
              Auto-Consolidate All
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="consolidation-stats-grid">
          <div className="c-stat-card">
            <div className="c-stat-lbl">Identified Opportunities</div>
            <div className="c-stat-val">18 Groups</div>
          </div>
          <div className="c-stat-card">
            <div className="c-stat-lbl">Potential Freight Savings</div>
            <div className="c-stat-val" style={{ color: '#10b981' }}>$14,850</div>
          </div>
          <div className="c-stat-card">
            <div className="c-stat-lbl">Average Fill Rate Gain</div>
            <div className="c-stat-val" style={{ color: '#a855f7' }}>+34.2%</div>
          </div>
          <div className="c-stat-card">
            <div className="c-stat-lbl">Carbon Emissions Saved</div>
            <div className="c-stat-val" style={{ color: '#f59e0b' }}>12.4 Tons CO₂</div>
          </div>
        </div>

        {/* Strategy Tabs */}
        <div className="strategy-tabs">
          <button
            className={`tab-btn ${activeTab === 'destination' ? 'active' : ''}`}
            onClick={() => setActiveTab('destination')}
          >
            Destination Cluster Strategy
          </button>
          <button
            className={`tab-btn ${activeTab === 'carrier' ? 'active' : ''}`}
            onClick={() => setActiveTab('carrier')}
          >
            Carrier Pooled Runs
          </button>
          <button
            className={`tab-btn ${activeTab === 'timeWindow' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeWindow')}
          >
            Time-Window Synergy
          </button>
          <button
            className={`tab-btn ${activeTab === 'lane' ? 'active' : ''}`}
            onClick={() => setActiveTab('lane')}
          >
            Backhaul & Lane Match
          </button>
        </div>

        {/* Table View */}
        <div className="consolidation-table-wrapper">
          <table className="c-table">
            <thead>
              <tr>
                <th>Opportunity ID</th>
                <th>Consolidation Parameter</th>
                <th>LTL Shipments Included</th>
                <th>Total Volume & Weight</th>
                <th>Estimated ROI Savings</th>
                <th>Fill Efficiency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 700, color: '#60a5fa' }}>{item.id}</td>
                  <td style={{ fontWeight: 600 }}>{item.cluster || item.carrier || item.deliveryWindow || item.lane}</td>
                  <td>{item.shipmentCount} Orders ({item.shipments ? item.shipments.join(', ') : item.shipmentIds.join(', ')})</td>
                  <td>{item.totalWeightKg.toLocaleString()} kg | {item.totalVolumeM3} m³</td>
                  <td style={{ color: '#10b981', fontWeight: 700 }}>${item.savings.toLocaleString()}</td>
                  <td>
                    <span className="efficiency-pill">{item.efficiency}</span>
                  </td>
                  <td>
                    <button
                      className="lb-btn lb-btn-primary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={() => alert(`Consolidating ${item.id} into dedicated load!`)}
                    >
                      Build Load
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ConsolidationManagement;
