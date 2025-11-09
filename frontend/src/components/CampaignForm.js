import React, { useState } from "react";
import "./CampaignForm.css";

const CampaignForm = ({ onAdd }) => {
  const [campaignName, setCampaignName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!campaignName || !clientName || !startDate) return;
    onAdd({ campaignName, clientName, startDate, status });
    setCampaignName(""); setClientName(""); setStartDate(""); setStatus("Active");
  };

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <input placeholder="Campaign Name" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
      <input placeholder="Client Name" value={clientName} onChange={e => setClientName(e.target.value)} />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>Active</option>
        <option>Paused</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Campaign</button>
    </form>
  );
};

export default CampaignForm;
  