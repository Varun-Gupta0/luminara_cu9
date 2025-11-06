import React, { useEffect, useRef } from "react";

/*
  Intro component shown at the beginning.
  - Big welcoming headline
  - Short mission statement and CTA
  - Decorative photo and subtle entrance animation
  - Uses IntersectionObserver to add 'visible' class for animation
*/

export default function Intro({ onNavigate = () => {} }) {
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
    <section className="intro card" ref={ref} aria-labelledby="intro-heading">
      <div className="intro-grid">
        <div className="intro-text">
          <h2 id="intro-heading" className="intro-title">Welcome to Farmigo</h2>
          <p className="intro-lead">
            We help small and medium farms succeed — real-time weather, affordable tool rentals,
            trusted crop advice and a marketplace built for farmers. Simple, offline-friendly and
            designed for quick decisions out in the field.
          </p>

          <div className="intro-ctas">
            <button className="btn btn-primary" onClick={() => onNavigate("sell")}>Create a listing</button>
            <button className="btn btn-outline" onClick={() => onNavigate("chat")}>Ask the Crop Advisor</button>
            <a className="learn-link" href="#gallery" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}>
              Explore photos →
            </a>
          </div>

          <ul className="intro-bullets">
            <li>Offline-friendly UI and local caching</li>
            <li>Secure API proxy for crop.health & 3rd-party services</li>
            <li>Mobile-first bottom navigation and large tap targets</li>
          </ul>
        </div>

        <div className="intro-visual" aria-hidden>
          <div className="photo-frame">
            <img
              alt="Farm field with sunrise"
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f6b2f5a7af2a1f3cbb3c8e9b2f7b2d9"
              loading="lazy"
            />
            <div className="photo-caption">Sunrise on a local farm</div>
          </div>
        </div>
      </div>
    </section>
  );
}