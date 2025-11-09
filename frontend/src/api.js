import axios from "axios";

// Use environment variable in production, fallback to localhost for dev
const API_BASE = process.env.REACT_APP_API_URL;
const API = `${API_BASE}/api/campaigns`;

export const getCampaigns = () => axios.get(API);
export const addCampaign = (data) => axios.post(API, data);
export const updateCampaignStatus = (id, status) => axios.put(`${API}/${id}`, { status });
export const deleteCampaign = (id) => axios.delete(`${API}/${id}`);
