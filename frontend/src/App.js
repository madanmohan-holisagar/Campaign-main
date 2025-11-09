import React, { useEffect, useState } from "react";
import { getCampaigns, addCampaign, updateCampaignStatus, deleteCampaign } from "./api";
import CampaignForm from "./components/CampaignForm";
import CampaignCardList from "./components/CampaignCardList";
import "./App.css";

const App = () => {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    try {
      const res = await getCampaigns();
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  useEffect(() => { fetchCampaigns(); }, []);

  const handleAdd = async (data) => { await addCampaign(data); fetchCampaigns(); };
  const handleUpdate = async (id, status) => { await updateCampaignStatus(id, status); fetchCampaigns(); };
  const handleDelete = async (id) => { await deleteCampaign(id); fetchCampaigns(); };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 Next-Gen Campaign Tracker</h1>
        <p>Manage all your campaigns in one place with style.</p>
      </header>

      <CampaignForm onAdd={handleAdd} />

      <div className="refresh-container">
        <button className="refresh-btn" onClick={fetchCampaigns}>🔄 Refresh Campaigns</button>
      </div>

      <CampaignCardList campaigns={campaigns} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default App;
