import React, { useState, useRef, useEffect } from "react";

/*
  Frontend ChatBot that calls the backend proxy at /api/chat.
  Backend forwards to crop.health using a server-side API key.
*/

export default function ChatBot() {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.classList.add("visible"); }, []);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello — I'm Farmigo assistant. Ask about pests, irrigation, or crop health." }
  ]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setError("");
    const userMsg = { from: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed })
      });

      // Try to parse JSON, but handle empty or non-JSON responses gracefully
      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch (e) {
          // invalid JSON body
          const text = await res.text();
          const msg = text || "Empty response from server";
          setMessages((m) => [...m, { from: "bot", text: `Error: ${msg}` }]);
          setError(msg);
          return;
        }
      } else {
        // not JSON — try to read text
        const text = await res.text();
        if (!res.ok) {
          const msg = text || `Server returned ${res.status}`;
          setMessages((m) => [...m, { from: "bot", text: `Error: ${msg}` }]);
          setError(msg);
          return;
        }
        // successful non-JSON reply — treat as plain text reply
        setMessages((m) => [...m, { from: "bot", text: text || "No response" }]);
        return;
      }

      if (!res.ok) {
        const msg = data?.error || "Unknown error from server";
        setMessages((m) => [...m, { from: "bot", text: `Error: ${msg}` }]);
        setError(msg);
      } else {
        const reply = data?.reply || "No response from server";
        setMessages((m) => [...m, { from: "bot", text: reply }]);
      }
    } catch (err) {
      setError(err.message);
      setMessages((m) => [...m, { from: "bot", text: `Network error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card" aria-label="AI Chat" ref={ref}>
      <h2 style={{ marginTop: 0 }}>AI Assistant</h2>
      <p style={{ color: "var(--muted)" }}>Ask about crop care, pests, irrigation and more.</p>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="chat-window">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-row ${m.from === "user" ? "chat-user" : "chat-bot"}`}
            >
              <div className="chat-bubble">{m.text}</div>
              <div className="chat-label">{m.from === "user" ? "You" : "Farmigo"}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question (e.g., 'How to treat aphids?')"
            style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #d1d5db" }}
          />
          <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>

        {error && <div style={{ color: "#b91c1c" }}>Error: {error}</div>}

        <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
          Integration note: the key is stored on the server (server/.env or secret), not in the browser.
        </div>
      </div>
    </section>
  );
}