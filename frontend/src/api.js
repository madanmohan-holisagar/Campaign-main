import axios from "axios";

const API = "http://localhost:5000/api/campaigns";

export const getCampaigns = () => axios.get(API);
export const addCampaign = (data) => axios.post(API, data);
export const updateCampaignStatus = (id, status) => axios.put(`${API}/${id}`, { status });
export const deleteCampaign = (id) => axios.delete(`${API}/${id}`);
