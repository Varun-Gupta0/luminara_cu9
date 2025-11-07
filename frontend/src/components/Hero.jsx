import React, { useEffect, useRef } from "react";

export default function Hero({ onNavigate = () => {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero card" aria-labelledby="hero-heading" ref={ref}>
      <div className="hero-grid">
        <div className="hero-left">
          <h1 id="hero-heading" className="headline">
            Tools and insights for better harvests
          </h1>
          <p className="lead">
            Plan your season with accurate weather, rent the right equipment on demand, and
            get guidance from our crop advisor powered by crop.health.
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
                <div className="f-title">Weather</div>
                <div className="f-sub">Hourly & 7-day forecasts</div>
              </div>
            </div>

            <div className="feature">
              <div className="icon">🔧</div>
              <div>
                <div className="f-title">Rentals</div>
                <div className="f-sub">Local equipment near you</div>
              </div>
            </div>

            <div className="feature">
              <div className="icon">💬</div>
              <div>
                <div className="f-title">Advisor</div>
                <div className="f-sub">AI-backed crop health tips</div>
              </div>
            </div>

            <div className="feature">
              <div className="icon">🛒</div>
              <div>
                <div className="f-title">Marketplace</div>
                <div className="f-sub">Sell fertilizers & pesticides</div>
              </div>
            </div>

            <div className="feature">
              <div className="icon">👥</div>
              <div>
                <div className="f-title">Community</div>
                <div className="f-sub">Share disease solutions nearby</div>
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
              <div className="small-card">Buyer request: 200kg maize nearby</div>
            </div>

            <div className="floating-illustration" />
          </div>
        </div>
      </div>
    </section>
  );
}