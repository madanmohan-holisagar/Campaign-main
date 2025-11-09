import React from "react";
import "./CampaignList.css";

const CampaignCardList = ({ campaigns, onUpdate, onDelete }) => {
  return (
    <div className="card-container">
      {campaigns.map(c => (
        <div key={c.id} className="campaign-card">
          <div className="card-header">
            <h3>{c.campaignName}</h3>
            <button className="delete-btn" onClick={() => onDelete(c.id)}>🗑️</button>
          </div>
          <p><strong>Client:</strong> {c.clientName}</p>
          <p><strong>Start Date:</strong> {c.startDate}</p>
          <p>
            <strong>Status:</strong>
            <select value={c.status} onChange={e => onUpdate(c.id, e.target.value)}>
              <option>Active</option>
              <option>Paused</option>
              <option>Completed</option>
            </select>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CampaignCardList;
