// Tiny proxy server for chat -> crop.health
// Run with Node 18+ (uses global fetch). Keep your API key in environment variables.

import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Basic CORS to allow local frontend access during development
import cors from "cors";
app.use(cors({
  origin: true
}));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => res.send("Crop.Health proxy running"));

// POST /api/chat
// Body: { message: "..." }
// Response: { reply: "..." }
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });

    const API_KEY = process.env.CROP_HEALTH_API_KEY;
    if (!API_KEY) return res.status(500).json({ error: "Server missing API key" });

    // TODO: Replace the URL and body shape below with the exact crop.health endpoint and request fields.
    // Example (assumes a POST to https://api.crop.health/v1/chat that accepts { prompt } and returns { reply }):
    const apiUrl = "https://api.crop.health/v1/chat"; // <-- update per crop.health docs

    const payloadForCropHealth = {
      // adapt to crop.health docs. This is a common pattern:
      prompt: message
    };

    const apiRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payloadForCropHealth)
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return res.status(apiRes.status).json({ error: "Crop.Health API error", details: text });
    }

    const apiJson = await apiRes.json();

    // adapt this extraction to the actual shape returned by crop.health
    const reply = apiJson.reply || apiJson.output?.text || apiJson.text || JSON.stringify(apiJson);

    return res.json({ reply });
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Crop.Health proxy listening on http://localhost:${PORT}`);
});