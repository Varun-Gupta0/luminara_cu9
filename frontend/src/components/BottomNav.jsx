import React from "react";

const items = [
  { key: "hero", label: "Home", icon: (<svg viewBox="0 0 24 24"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" fill="currentColor"/></svg>) },
  { key: "weather", label: "Weather", icon: (<svg viewBox="0 0 24 24"><path d="M6 14a6 6 0 1 1 5.9 7H6a4 4 0 0 1 0-8h.1" fill="currentColor"/></svg>) },
  { key: "rent", label: "Rent", icon: (<svg viewBox="0 0 24 24"><path d="M3 7h18v10H3z" fill="currentColor"/></svg>) },
  { key: "chat", label: "Chat", icon: (<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor"/></svg>) },
  { key: "sell", label: "Sell", icon: (<svg viewBox="0 0 24 24"><path d="M12 2l3 5 5 1-4 4 1 5-5-3-5 3 1-5-4-4 5-1 3-5z" fill="currentColor"/></svg>) },
  { key: "community", label: "Community", icon: (<svg viewBox="0 0 24 24"><path d="M16 4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" fill="currentColor"/></svg>) }
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          className={`nav-item ${active === it.key ? "active" : ""}`}
          aria-current={active === it.key ? "page" : undefined}
        >
          <div className="icon-wrap">{it.icon}</div>
          <div className="label">{it.label}</div>
        </button>
      ))}
    </nav>
  );
}