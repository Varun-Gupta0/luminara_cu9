import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import WeatherCard from "./components/WeatherCard";
import RentTools from "./components/RentTools";
import ChatBot from "./components/ChatBot";
import SellCrops from "./components/SellCrops";
import Gallery from "./components/Gallery";
import BottomNav from "./components/BottomNav";

export default function App() {
  // Initialize with hero page and set as mounted immediately
  const [page, setPage] = useState("hero"); // hero | weather | rent | chat | sell

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="logo">🌾</div>
          <div className="title">Farmigo</div>
        </div>

        <div className="header-controls">
          <div className="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input placeholder="Search crops, tools, tips..." />
          </div>

          <button className="header-btn" title="Notifications">🔔</button>

          <div className="avatar" title="Profile">
            <img alt="avatar" src="https://api.dicebear.com/6.x/avataaars/svg?seed=farmer" />
          </div>
        </div>
      </header>

      <main className="content">
        {/* Show Intro and Hero only on home page */}
        {page === "hero" && (
          <>
            <Intro onNavigate={setPage} />
            <Hero onNavigate={setPage} />
          </>
        )}
        
        {/* Show other pages based on navigation */}
        {page === "weather" && <WeatherCard />}
        {page === "rent" && <RentTools />}
        {page === "chat" && <ChatBot />}
        {page === "sell" && <SellCrops />}

        {/* Gallery shows on all pages */}
        <Gallery />
      </main>

      <BottomNav active={page} onChange={setPage} />
    </div>
  );
}