// Tiny proxy server for chat -> crop.health
// Run with Node 18+ (uses global fetch). Keep your API key in environment variables.

import express from "express";
import dotenv from "dotenv/lib/main";
import { spawn } from "child_process";
dotenv.config();

const app = express();
app.use(express.json());

// Simple request logger to help debug incoming requests and bodies
app.use((req, res, next) => {
  try {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - body: ${JSON.stringify(req.body)}`);
  } catch (e) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Basic CORS to allow local frontend access during development
import cors from "cors";
app.use(cors({ origin: true }));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => res.send("Crop.Health / HuggingFace proxy running"));

// Runner health check proxy
app.get("/api/runner-health", async (req, res) => {
  try {
    const runnerUrl = process.env.RUNNER_URL || "http://127.0.0.1:5001/internal/health";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let r;
    try {
      r = await fetch(runnerUrl, { signal: controller.signal });
    } catch (e) {
      clearTimeout(timeout);
      return res.status(502).json({ ok: false, error: String(e) });
    }
    clearTimeout(timeout);
    if (!r.ok) return res.status(502).json({ ok: false, status: r.status });
    const j = await r.json();
    return res.json({ ok: true, runner: j });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/chat
// Body: { message: "..." }
// Response: { reply: "..." }
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });

    // Preferred: call persistent Python runner service at localhost:5001
    const runnerUrl = process.env.RUNNER_URL || "http://127.0.0.1:5001/internal/chat";

    // timeout using AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    let runnerRes;
    try {
      runnerRes = await fetch(runnerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: controller.signal
      });
    } catch (fetchErr) {
      clearTimeout(timeout);
      console.error("Runner fetch failed:", fetchErr);
      return res.status(502).json({ error: "Runner service unavailable", details: String(fetchErr) });
    }

    clearTimeout(timeout);
    if (!runnerRes.ok) {
      const text = await runnerRes.text();
      console.error("Runner returned error:", text);
      return res.status(502).json({ error: "Runner returned error", details: text });
    }

    const json = await runnerRes.json();
    return res.json({ reply: json.reply });
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT}`);
});