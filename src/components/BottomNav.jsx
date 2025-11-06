import React from "react";

const items = [
  { key: "hero", label: "Home", icon: "🏠" },
  { key: "weather", label: "Weather", icon: "☀️" },
  { key: "rent", label: "Rent", icon: "🔧" },
  { key: "chat", label: "Chat", icon: "💬" },
  { key: "sell", label: "Sell", icon: "🛒" }
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map((it) => (
        <div
          role="button"
          tabIndex={0}
          key={it.key}
          onClick={() => onChange(it.key)}
          onKeyDown={(e) => e.key === "Enter" && onChange(it.key)}
          className={`nav-item ${active === it.key ? "active" : ""}`}
          aria-current={active === it.key ? "page" : undefined}
        >
          <div style={{ fontSize: 18 }}>{it.icon}</div>
          <div style={{ fontSize: 12 }}>{it.label}</div>
        </div>
      ))}
    </nav>
  );
}