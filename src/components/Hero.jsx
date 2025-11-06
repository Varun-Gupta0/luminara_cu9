import React from "react";

export default function Hero({ onNavigate = () => {} }) {
  return (
    <section className="hero card" aria-labelledby="hero-heading">
      <div className="hero-grid">
        <div className="hero-left">
          <h1 id="hero-heading" className="headline">
            Farmigo — Smart tools for modern farmers
          </h1>
          <p className="lead">
            Local weather, tool rentals, AI crop advice and a simple marketplace — all in one mobile-first dashboard.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => onNavigate("sell")}>Sell your crops</button>
            <button className="btn btn-outline" onClick={() => onNavigate("rent")}>Rent tools</button>
            <button className="btn btn-ghost" onClick={() => onNavigate("chat")}>Ask AI</button>
          </div>

          <div className="features">
            <div className="feature">
              <div className="icon">☀️</div>
              <div>
                <div className="f-title">Reliable Weather</div>
                <div className="f-sub">Hourly forecasts to plan field work</div>
              </div>
            </div>

            <div className="feature">
              <div className="icon">🔧</div>
              <div>
                <div className="f-title">Rent Tools</div>
                <div className="f-sub">Nearby equipment at fair prices</div>
              </div>
            </div>

            <div className="feature">
              <div className="icon">💬</div>
              <div>
                <div className="f-title">Crop Advisor</div>
                <div className="f-sub">AI & expert tips for pests and care</div>
              </div>
            </div>

            <div className="feature">
              <div className="icon">🛒</div>
              <div>
                <div className="f-title">Market</div>
                <div className="f-sub">List and sell produce locally</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right" aria-hidden>
          <div className="panel-visual">
            <div className="stat">
              <div className="stat-value">24°C</div>
              <div className="stat-label">Nairobi — Clear</div>
            </div>

            <div className="panel-cards">
              <div className="small-card">Rent: Rotary Tiller • $30/day</div>
              <div className="small-card">Fresh buyer requests nearby</div>
            </div>

            <div className="floating-illustration" />
          </div>
        </div>
      </div>

      <div className="hero-decor">
        <div className="blob one" />
        <div className="blob two" />
      </div>
    </section>
  );
}