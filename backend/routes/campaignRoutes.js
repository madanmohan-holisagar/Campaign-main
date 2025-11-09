import express from "express";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../campaigns.json");

const readData = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

const writeData = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

router.get("/", async (req, res) => {
  const data = await readData();
  res.json(data);
});

router.post("/", async (req, res) => {
  const data = await readData();
  const newCampaign = { id: Date.now(), ...req.body };
  data.push(newCampaign);
  await writeData(data);
  res.json(newCampaign);
});

router.put("/:id", async (req, res) => {
  const data = await readData();
  const id = parseInt(req.params.id);
  const updatedData = data.map(c => c.id === id ? { ...c, status: req.body.status } : c);
  await writeData(updatedData);
  res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  const data = await readData();
  const id = parseInt(req.params.id);
  const filtered = data.filter(c => c.id !== id);
  await writeData(filtered);
  res.json({ success: true });
});

export default router;