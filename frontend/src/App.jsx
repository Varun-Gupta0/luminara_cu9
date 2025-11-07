import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import WeatherCard from "./components/WeatherCard";
import RentTools from "./components/RentTools";
import ChatBot from "./components/ChatBot";
import SellCrops from "./components/SellCrops";
import CommunityThreads from "./components/CommunityThreads";
import Gallery from "./components/Gallery";
import BottomNav from "./components/BottomNav";
import WeatherInput from "./components/WeatherInput";
import WeatherWidget from "./components/WeatherWidget";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Initialize with hero page and set as mounted immediately
  const [page, setPage] = useState("hero"); // hero | weather | rent | chat | sell | community

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/dashboard" element={
        isLoggedIn ? (
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

                <button className="header-btn" onClick={handleLogout} title="Logout">🚪</button>

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
              {page === "community" && <CommunityThreads />}

              {/* Gallery shows on all pages */}
              <Gallery />
            </main>

            <BottomNav active={page} onChange={setPage} />
            <WeatherInput />
            <div style={{ margin: '18px 24px' }}>
              <WeatherWidget />
            </div>
          </div>
        ) : (
          <Navigate to="/" />
        )
      } />
    </Routes>
  );
}