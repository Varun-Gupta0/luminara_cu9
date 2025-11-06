import React from "react";

export default function Hero({ onNavigate = () => {} }) {
  return (
    <section className="hero card" aria-labelledby="hero-heading">
      <div className="blob one" />
      <div className="blob two" />

      <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div className="left">
          <h1 id="hero-heading" className="headline">Farmigo — Smart, simple tools for farmers</h1>
          <p className="lead">
            Weather updates, rent tools, AI helper and crop marketplace — all in one friendly dashboard built for field use.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => onNavigate("sell")}>Sell your crops</button>
            <button className="btn btn-ghost" onClick={() => onNavigate("rent")}>Rent tools</button>
            <button className="btn btn-ghost" onClick={() => onNavigate("chat")}>Ask AI</button>
          </div>

          <div className="features" aria-hidden>
            <div className="feature-card">
              <div style={{fontSize:20}}>☁️</div>
              <div style={{fontWeight:700}}>Weather</div>
              <div style={{color:"var(--muted)",fontSize:13}}>Get quick forecasts for planning</div>
            </div>

            <div className="feature-card">
              <div style={{fontSize:20}}>🔧</div>
              <div style={{fontWeight:700}}>Rent tools</div>
              <div style={{color:"var(--muted)",fontSize:13}}>Find equipment near you</div>
            </div>

            <div className="feature-card">
              <div style={{fontSize:20}}>💬</div>
              <div style={{fontWeight:700}}>AI helper</div>
              <div style={{color:"var(--muted)",fontSize:13}}>Ask about pests, crops, or care</div>
            </div>

            <div className="feature-card">
              <div style={{fontSize:20}}>🛒</div>
              <div style={{fontWeight:700}}>Sell crops</div>
              <div style={{color:"var(--muted)",fontSize:13}}>Create listings for buyers</div>
            </div>
          </div>
        </div>

        <div style={{minWidth:260}} aria-hidden>
          <div style={{background:"linear-gradient(180deg, rgba(255,255,255,0.02), transparent)", padding:14, borderRadius:10}}>
            <div style={{fontWeight:700,fontSize:16}}>Quick actions</div>
            <div style={{marginTop:12,display:"grid",gap:8}}>
              <button className="btn btn-ghost" onClick={() => onNavigate("weather")}>Check weather</button>
              <button className="btn btn-ghost" onClick={() => onNavigate("rent")}>Find tools to rent</button>
              <button className="btn btn-ghost" onClick={() => onNavigate("chat")}>Talk to Farm assistant</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}