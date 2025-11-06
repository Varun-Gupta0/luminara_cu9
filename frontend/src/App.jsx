import React, { useState } from "react";
import Hero from "./components/Hero";
import WeatherCard from "./components/WeatherCard";
import RentTools from "./components/RentTools";
import ChatBot from "./components/ChatBot";
import SellCrops from "./components/SellCrops";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [page, setPage] = useState("hero"); // hero | weather | rent | chat | sell

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="logo">🌾</div>
          <div className="title">Farmigo</div>
        </div>
      </header>

      <main className="content">
        {page === "hero" && <Hero onNavigate={setPage} />}
        {page === "weather" && <WeatherCard />}
        {page === "rent" && <RentTools />}
        {page === "chat" && <ChatBot />}
        {page === "sell" && <SellCrops />}
      </main>

      <BottomNav active={page} onChange={setPage} />
    </div>
  );
}