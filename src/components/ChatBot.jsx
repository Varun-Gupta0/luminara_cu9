import React, { useState } from "react";

/*
  ChatBot:
  - Simple client-side placeholder bot with canned replies for offline demo.
  - Replace sendToAI with a call to your server endpoint that proxies requests to OpenAI or similar.
  - Never place secret keys in front-end code.
*/

function cannedReply(message) {
  const m = message.toLowerCase();
  if (m.includes("pest") || m.includes("insect")) {
    return "It may be a common pest. Consider checking the leaves for holes and applying biopesticide. Send a photo for better help (feature to add).";
  }
  if (m.includes("water") || m.includes("irrig")) {
    return "Irrigation depends on crop and soil type. Aim for even moisture; avoid waterlogging. I can suggest schedules if you tell me the crop and region.";
  }
  if (m.includes("fertil") || m.includes("nitro")) {
    return "Balanced NPK fertilization helps. Soil test recommended for precise amounts. Local extension services can often help with testing.";
  }
  return "Thanks for your question. For the best guidance, share crop type, age and a photo. (This is a demo reply — connect to OpenAI or a crop expert API for richer answers.)";
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello — I'm Farmigo assistant. Ask about weather, pests, or crop care." }
  ]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!text.trim()) return;
    const userMsg = { from: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setText("");
    setLoading(true);

    // Local placeholder processing
    await new Promise((r) => setTimeout(r, 700));
    const reply = cannedReply(userMsg.text);
    setMessages((m) => [...m, { from: "bot", text: reply }]);
    setLoading(false);

    // For production: replace above with:
    // const ai = await sendToAI(userMsg.text);
    // setMessages((m) => [...m, { from: "bot", text: ai }]);
  }

  return (
    <section className="card" aria-label="AI Chat">
      <h2 style={{marginTop:0}}>AI Assistant</h2>
      <p style={{color:"var(--muted)"}}>Ask about crop care, pests, irrigation and more. (Demo)</p>

      <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{maxHeight:320,overflow:"auto",padding:8,background:"rgba(255,255,255,0.02)",borderRadius:8}}>
          {messages.map((m, i) => (
            <div key={i} style={{marginBottom:8,display:"flex",flexDirection:"column",alignItems: m.from === "user" ? "flex-end" : "flex-start"}}>
              <div style={{background: m.from === "user" ? "linear-gradient(90deg,#065f46,#10b981)" : "rgba(255,255,255,0.02)", padding:8,borderRadius:8,maxWidth:"80%"}}>
                <div style={{fontSize:14}}>{m.text}</div>
              </div>
              <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>{m.from === "user" ? "You" : "Farmigo"}</div>
            </div>
          ))}
        </div>

        <div style={{display:"flex",gap:8}}>
          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            onKeyDown={(e)=> e.key === "Enter" && handleSend()}
            placeholder="Type your question (e.g., 'How to treat aphids?')"
            style={{flex:1,padding:10,borderRadius:8,border:"1px solid rgba(255,255,255,0.04)",background:"transparent",color:"inherit"}}
          />
          <button className="btn btn-primary" onClick={handleSend} disabled={loading}>{loading ? "..." : "Send"}</button>
        </div>
      </div>

      <div style={{marginTop:12,color:"var(--muted)",fontSize:13}}>
        Integration note: Create a backend endpoint that signs requests to OpenAI or another model. Client sends user message to your backend. Backend adds authentication and forwards to model API.
      </div>
    </section>
  );
}