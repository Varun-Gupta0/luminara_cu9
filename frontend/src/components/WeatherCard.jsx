import React, { useState } from "react";

/*
  WeatherCard:
  - Uses OpenWeatherMap Current Weather API if VITE_OWM_KEY is set.
  - If no key is provided it shows a mock response.
  - To enable real data:
    1. Create .env at project root with: VITE_OWM_KEY=your_api_key
    2. Restart the dev server.
*/

const MOCK = {
  name: "Local Farm",
  main: { temp: 298.15 },
  weather: [{ main: "Clear", description: "clear sky" }]
};

function kelvinToC(k) { return Math.round(k - 273.15); }

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function fetchWeather(q) {
    setError("");
    setLoading(true);
    setData(null);
    const key = import.meta.env.VITE_OWM_KEY;
    try {
      if (!key) {
        // return mock
        await new Promise((r) => setTimeout(r, 700));
        setData(MOCK);
        setLoading(false);
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${key}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found or API error");
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2 style={{marginTop:0}}>Weather</h2>
      <p style={{color:"var(--muted)"}}>Enter town/village to check current weather.</p>

      <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
        <input
          placeholder="City or town (e.g., Nairobi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{padding:8,borderRadius:8,border:"1px solid rgba(255,255,255,0.04)",background:"transparent",color:"inherit",minWidth:220}}
        />
        <button className="btn btn-primary" onClick={() => fetchWeather(city || "Nairobi")}>Check</button>
        <button className="btn btn-ghost" onClick={() => { setCity(""); setData(null); setError(""); }}>Clear</button>
      </div>

      <div style={{marginTop:12}}>
        {loading && <div style={{color:"var(--muted)"}}>Loading...</div>}
        {error && <div style={{color:"#ffb4b4"}}>{error}</div>}
        {data && (
          <div style={{marginTop:12,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:40}}>{data.weather?.[0]?.main === "Rain" ? "🌧️" : "☀️"}</div>
            <div>
              <div style={{fontWeight:700,fontSize:18}}>{data.name}</div>
              <div style={{color:"var(--muted)"}}>
                {data.weather?.[0]?.description} • {kelvinToC(data.main.temp)} °C
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{marginTop:12,color:"var(--muted)",fontSize:13}}>
        Tip: For production, store your OpenWeatherMap API key on the server or use environment variables (VITE_OWM_KEY).
      </div>
    </section>
  );
}