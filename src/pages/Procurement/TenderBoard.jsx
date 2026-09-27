import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Common/Layout/Layout';
import { initialKanbanTenders, carrierDirectory } from '../../utils/mockData/procurementData';
import './Procurement.css';

const TenderBoard = () => {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState(initialKanbanTenders);
  const [activeView, setActiveView] = useState('kanban'); // 'kanban' | 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState('All');
  const [selectedService, setSelectedService] = useState('All');
  const [evaluationModalTender, setEvaluationModalTender] = useState(null);

  // Filter helper
  const filterTender = (tender) => {
    const matchesSearch =
      tender.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService =
      selectedService === 'All' || tender.serviceLevel === selectedService;

    return matchesSearch && matchesService;
  };

  // Quick Action: Send Draft
  const handleSendDraft = (tender) => {
    const updatedDraft = boardData.draft.filter((t) => t.id !== tender.id);
    const sentTender = {
      ...tender,
      status: 'sent',
      sentDate: 'Just now',
      deadlineHoursLeft: 6.0,
      deadlineTime: 'Today, 23:59',
      isUrgent: false,
      invitedCarriers: [
        { name: 'BlueDart Logistics', code: 'BD', avatarColor: '#2563eb' },
        { name: 'Express Freight Corp', code: 'EF', avatarColor: '#10b981' },
      ],
      responsesCount: '0 / 2 Bids Received',
    };

    setBoardData({
      ...boardData,
      draft: updatedDraft,
      sent: [sentTender, ...boardData.sent],
    });
  };

  // Action: Award Tender to Carrier
  const handleAwardTender = (tender, winningBid = null) => {
    const carrierName = winningBid ? winningBid.carrierName : tender.recommendedCarrier || tender.bestCarrier || 'Top Carrier';
    const finalPrice = winningBid ? winningBid.bidPrice : tender.recommendedPrice || tender.bestPrice || 350;

    // Remove from whichever column it was in
    const updatedResponses = boardData.responses_received.filter((t) => t.id !== tender.id);
    const updatedEvaluated = boardData.evaluated.filter((t) => t.id !== tender.id);

    const awardedTender = {
      ...tender,
      status: 'awarded',
      awardedTo: carrierName,
      awardedPrice: finalPrice,
      awardedDate: 'Just now',
      dispatchStatus: 'Confirmed & Driver Assigned',
    };

    setBoardData({
      ...boardData,
      responses_received: updatedResponses,
      evaluated: updatedEvaluated,
      awarded: [awardedTender, ...boardData.awarded],
    });

    setEvaluationModalTender(null);
    alert(`Tender ${tender.id} successfully awarded to ${carrierName} at $${finalPrice}!`);
  };

  // Action: Re-tender rejected load
  const handleRetender = (tender) => {
    const updatedRejected = boardData.rejected.filter((t) => t.id !== tender.id);
    const draftTender = {
      ...tender,
      status: 'draft',
      createdDate: 'Re-tendered Just now',
      estimatedBudget: 350,
      specialRequirements: ['Priority Spot Tendering'],
    };

    setBoardData({
      ...boardData,
      rejected: updatedRejected,
      draft: [draftTender, ...boardData.draft],
    });
    alert(`Tender ${tender.id} has been moved back to Drafts for immediate re-tendering.`);
  };

  return (
    <Layout activePage="procurement">
      <div className="procurement-container">
        {/* Header */}
        <div className="procurement-header">
          <div className="proc-title-group">
            <h1>
              <span>📋</span> Tender Board & Procurement Pipeline
            </h1>
            <p>Kanban freight tendering workflow, carrier response tracking, MCDA bid evaluation, and load awards</p>
          </div>

          <div className="proc-header-controls">
            <div className="proc-view-toggle">
              <button
                className={`proc-toggle-btn ${activeView === 'kanban' ? 'active' : ''}`}
                onClick={() => setActiveView('kanban')}
              >
                Kanban View
              </button>
              <button
                className={`proc-toggle-btn ${activeView === 'list' ? 'active' : ''}`}
                onClick={() => setActiveView('list')}
              >
                Table List View
              </button>
            </div>

            <button
              className="tender-action-btn btn-evaluate"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => navigate('/procurement/rfq')}
            >
              + Create New RFQ
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="proc-filters-bar">
          <div className="proc-filter-inputs">
            <input
              type="text"
              className="proc-search-input"
              placeholder="Search Tender ID, Shipment, Lane..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="proc-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="All">All Service Levels</option>
              <option value="Express">Express</option>
              <option value="Standard">Standard</option>
            </select>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--proc-text-muted)' }}>
            Total Pipeline Tenders: <strong>{Object.values(boardData).flat().length} Active</strong>
          </div>
        </div>

        {/* View 1: Kanban Board */}
        {activeView === 'kanban' && (
          <div className="kanban-board-container">
            {/* Column 1: DRAFT */}
            <div className="kanban-column">
              <div className="kanban-col-header draft">
                <span className="kanban-col-title">Draft Tenders</span>
                <span className="kanban-col-badge">{boardData.draft.filter(filterTender).length}</span>
              </div>

              <div className="kanban-cards-stream">
                {boardData.draft.filter(filterTender).map((item) => (
                  <div key={item.id} className="tender-card">
                    <div className="tender-card-top">
                      <span className="tender-id">{item.id}</span>
                      <span className={`tender-service-pill ${item.serviceLevel === 'Express' ? 'pill-express' : 'pill-standard'}`}>
                        {item.serviceLevel}
                      </span>
                    </div>

                    <div className="tender-lane">{item.origin} → {item.destination}</div>

                    <div className="tender-meta-row">
                      <span>📦 {item.shipmentId}</span>
                      <span>⚖️ {item.weightKg} kg</span>
                      <span>📐 {item.volumeCbm} m³</span>
                    </div>

                    <div style={{ fontSize: '0.725rem', color: 'var(--proc-text-muted)', marginBottom: '6px' }}>
                      Est. Target Budget: <strong>${item.estimatedBudget}</strong>
                    </div>

                    <div className="tender-actions-bar">
                      <button
                        className="tender-action-btn btn-evaluate"
                        onClick={() => handleSendDraft(item)}
                      >
                        🚀 Broadcast RFQ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: SENT */}
            <div className="kanban-column">
              <div className="kanban-col-header sent">
                <span className="kanban-col-title">Sent / Active</span>
                <span className="kanban-col-badge">{boardData.sent.filter(filterTender).length}</span>
              </div>

              <div className="kanban-cards-stream">
                {boardData.sent.filter(filterTender).map((item) => (
                  <div key={item.id} className="tender-card">
                    <div className="tender-card-top">
                      <span className="tender-id">{item.id}</span>
                      <span className={`tender-service-pill ${item.serviceLevel === 'Express' ? 'pill-express' : 'pill-standard'}`}>
                        {item.serviceLevel}
                      </span>
                    </div>

                    <div className="tender-lane">{item.origin} → {item.destination}</div>

                    <div className={`deadline-badge ${item.isUrgent ? 'urgent' : 'normal'}`}>
                      ⏱️ Closes in {item.deadlineHoursLeft}h ({item.deadlineTime})
                    </div>

                    <div style={{ fontSize: '0.725rem', color: 'var(--proc-text-muted)', marginBottom: '4px' }}>
                      Invited Carriers ({item.responsesCount}):
                    </div>

                    <div className="carrier-avatar-stack">
                      {item.invitedCarriers.map((c, i) => (
                        <div
                          key={i}
                          className="carrier-avatar-circle"
                          style={{ backgroundColor: c.avatarColor }}
                          title={c.name}
                        >
                          {c.code}
                        </div>
                      ))}
                    </div>

                    <div className="tender-actions-bar">
                      <button
                        className="tender-action-btn"
                        style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}
                        onClick={() => alert(`Carrier reminder notification sent for Tender ${item.id}!`)}
                      >
                        🔔 Ping Carriers
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: RESPONSES RECEIVED */}
            <div className="kanban-column">
              <div className="kanban-col-header responses">
                <span className="kanban-col-title">Bids Received</span>
                <span className="kanban-col-badge">{boardData.responses_received.filter(filterTender).length}</span>
              </div>

              <div className="kanban-cards-stream">
                {boardData.responses_received.filter(filterTender).map((item) => (
                  <div key={item.id} className="tender-card">
                    <div className="tender-card-top">
                      <span className="tender-id">{item.id}</span>
                      <span className="tender-service-pill pill-express">
                        {item.responsesCount} Bids Ready
                      </span>
                    </div>

                    <div className="tender-lane">{item.origin} → {item.destination}</div>

                    <div className="best-price-highlight">
                      Lowest Bid: <strong>${item.bestPrice}</strong> by {item.bestCarrier}
                    </div>

                    <div className="tender-actions-bar">
                      <button
                        className="tender-action-btn btn-evaluate"
                        onClick={() => setEvaluationModalTender(item)}
                      >
                        ⚖️ Evaluate Bids
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: EVALUATED */}
            <div className="kanban-column">
              <div className="kanban-col-header evaluated">
                <span className="kanban-col-title">Evaluated</span>
                <span className="kanban-col-badge">{boardData.evaluated.filter(filterTender).length}</span>
              </div>

              <div className="kanban-cards-stream">
                {boardData.evaluated.filter(filterTender).map((item) => (
                  <div key={item.id} className="tender-card">
                    <div className="tender-card-top">
                      <span className="tender-id">{item.id}</span>
                      <span className="tender-service-pill" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                        Ready to Award
                      </span>
                    </div>

                    <div className="tender-lane">{item.origin} → {item.destination}</div>

                    <div className="recommended-winner-badge">
                      <div className="winner-name">★ Rec: {item.recommendedCarrier}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                        <span>Rate: <strong>${item.recommendedPrice}</strong></span>
                        <span className="winner-score">Score: {item.overallScore}</span>
                      </div>
                    </div>

                    <div className="tender-actions-bar">
                      <button
                        className="tender-action-btn btn-award"
                        onClick={() => handleAwardTender(item)}
                      >
                        ✓ Approve & Award
                      </button>
                      <button
                        className="tender-action-btn"
                        style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}
                        onClick={() => setEvaluationModalTender(item)}
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 5: AWARDED */}
            <div className="kanban-column">
              <div className="kanban-col-header awarded">
                <span className="kanban-col-title">Awarded</span>
                <span className="kanban-col-badge">{boardData.awarded.filter(filterTender).length}</span>
              </div>

              <div className="kanban-cards-stream">
                {boardData.awarded.filter(filterTender).map((item) => (
                  <div key={item.id} className="tender-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="tender-card-top">
                      <span className="tender-id">{item.id}</span>
                      <span className="tender-service-pill" style={{ background: '#ecfdf5', color: '#059669' }}>
                        ✓ Assigned
                      </span>
                    </div>

                    <div className="tender-lane">{item.origin} → {item.destination}</div>

                    <div style={{ fontSize: '0.775rem', marginBottom: '6px' }}>
                      Carrier: <strong style={{ color: '#0f172a' }}>{item.awardedTo}</strong>
                      <br />
                      Agreed Rate: <strong style={{ color: '#059669' }}>${item.awardedPrice}</strong>
                    </div>

                    <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
                      ● {item.dispatchStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 6: REJECTED */}
            <div className="kanban-column">
              <div className="kanban-col-header rejected">
                <span className="kanban-col-title">Declined</span>
                <span className="kanban-col-badge">{boardData.rejected.filter(filterTender).length}</span>
              </div>

              <div className="kanban-cards-stream">
                {boardData.rejected.filter(filterTender).map((item) => (
                  <div key={item.id} className="tender-card" style={{ borderLeft: '4px solid #ef4444' }}>
                    <div className="tender-card-top">
                      <span className="tender-id">{item.id}</span>
                      <span className="tender-service-pill" style={{ background: '#fef2f2', color: '#dc2626' }}>
                        Declined
                      </span>
                    </div>

                    <div className="tender-lane">{item.origin} → {item.destination}</div>

                    <div style={{ fontSize: '0.725rem', color: '#dc2626', marginBottom: '6px' }}>
                      Reason: <em>"{item.reason}"</em>
                    </div>

                    <div className="tender-actions-bar">
                      <button
                        className="tender-action-btn btn-retender"
                        onClick={() => handleRetender(item)}
                      >
                        ↺ Re-Tender Spot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 2: Table List View */}
        {activeView === 'list' && (
          <div style={{ background: '#ffffff', border: '1px solid var(--proc-border)', borderRadius: '10px', overflow: 'hidden' }}>
            <table className="bids-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Tender ID</th>
                  <th>Shipment</th>
                  <th>Origin → Destination</th>
                  <th>Weight / Vol</th>
                  <th>Status</th>
                  <th>Carrier / Winner</th>
                  <th>Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(boardData)
                  .flat()
                  .filter(filterTender)
                  .map((t) => (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 700, color: 'var(--proc-primary)' }}>{t.id}</td>
                      <td>{t.shipmentId}</td>
                      <td style={{ fontWeight: 600 }}>{t.origin} → {t.destination}</td>
                      <td>{t.weightKg} kg | {t.volumeCbm} m³</td>
                      <td>
                        <span className="tender-service-pill" style={{ background: '#f1f5f9' }}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{t.awardedTo || t.recommendedCarrier || t.bestCarrier || 'Pending Quotes'}</td>
                      <td style={{ fontWeight: 700, color: '#059669' }}>
                        ${t.awardedPrice || t.recommendedPrice || t.bestPrice || t.estimatedBudget}
                      </td>
                      <td>
                        <button
                          className="tender-action-btn btn-evaluate"
                          style={{ padding: '4px 10px' }}
                          onClick={() => {
                            if (t.bids) setEvaluationModalTender(t);
                            else alert(`Tender ${t.id} details opened.`);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Carrier Bids Evaluation Modal */}
        {evaluationModalTender && (
          <div className="proc-modal-backdrop" onClick={() => setEvaluationModalTender(null)}>
            <div className="proc-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>Carrier Bid Evaluation — {evaluationModalTender.id}</h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--proc-text-muted)' }}>
                    Shipment: {evaluationModalTender.shipmentId} ({evaluationModalTender.origin} → {evaluationModalTender.destination})
                  </span>
                </div>
                <button
                  style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
                  onClick={() => setEvaluationModalTender(null)}
                >
                  ×
                </button>
              </div>

              {/* Cargo Specs Box */}
              <div className="cargo-spec-summary">
                <div className="spec-item">
                  <span>Gross Weight:</span>
                  <strong>{evaluationModalTender.weightKg} kg</strong>
                </div>
                <div className="spec-item">
                  <span>Volume Space:</span>
                  <strong>{evaluationModalTender.volumeCbm} m³</strong>
                </div>
                <div className="spec-item">
                  <span>Package Items:</span>
                  <strong>{evaluationModalTender.items || 15} Cartons</strong>
                </div>
                <div className="spec-item">
                  <span>Special Protocol:</span>
                  <strong>{evaluationModalTender.specialRequirements ? evaluationModalTender.specialRequirements.join(', ') : 'Standard'}</strong>
                </div>
              </div>

              <div style={{ marginBottom: '12px', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                Multi-Criteria Decision Matrix (Price 40%, OTP 30%, Capacity 20%, ESG 10%):
              </div>

              {/* Bids Table */}
              <table className="bids-table">
                <thead>
                  <tr>
                    <th>Carrier Name</th>
                    <th>Quoted Price</th>
                    <th>On-Time OTP</th>
                    <th>Acceptance</th>
                    <th>MCDA Score</th>
                    <th>Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {(evaluationModalTender.bids || []).map((bid, i) => (
                    <tr key={i} className={bid.recommended ? 'is-winner' : ''}>
                      <td>
                        <strong style={{ color: '#0f172a' }}>{bid.carrierName}</strong>
                        {bid.recommended && (
                          <span style={{ marginLeft: '6px', fontSize: '0.65rem', padding: '1px 5px', borderRadius: '3px', background: '#7c3aed', color: '#fff' }}>
                            ★ Recommended Winner
                          </span>
                        )}
                      </td>
                      <td style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem' }}>
                        ${bid.bidPrice}
                      </td>
                      <td>{bid.otp}%</td>
                      <td>{bid.acceptanceRate}%</td>
                      <td>
                        <span className={`mcda-score-pill ${bid.mcdaScore > 90 ? 'score-high' : 'score-med'}`}>
                          {bid.mcdaScore} / 100
                        </span>
                      </td>
                      <td>
                        <button
                          className="tender-action-btn btn-award"
                          style={{ padding: '4px 10px' }}
                          onClick={() => handleAwardTender(evaluationModalTender, bid)}
                        >
                          Award Load
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  className="tender-action-btn"
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 16px' }}
                  onClick={() => setEvaluationModalTender(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TenderBoard;
