import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import net from "net";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// -------- MongoDB Connection --------
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/campaignDB";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------- Mongoose Schema & Model --------
const campaignSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  clientName: String,
  startDate: String,
  status: { type: String, default: "Active" },
});


const Campaign = mongoose.model("Campaign", campaignSchema);

// -------- Helper: Find available port --------
function getAvailablePort(start = 5000, end = 5100) {
  return new Promise((resolve) => {
    const tryPort = (port) => {
      const server = net.createServer();
      server.listen(port, () => {
        server.close(() => resolve(port));
      });
      server.on("error", () => {
        if (port < end) tryPort(port + 1);
        else resolve(null);
      });
    };
    tryPort(start);
  });
}

// -------- API Routes --------
app.get("/api/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/campaigns", async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.json(newCampaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/campaigns/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!campaign) return res.status(404).send("Campaign not found");
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/campaigns/:id", async (req, res) => {
  try {
    const result = await Campaign.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Campaign not found");
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------- Serve Frontend --------
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// -------- Start Server --------
(async () => {
  const PORT = (await getAvailablePort(5000, 5100)) || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})();
