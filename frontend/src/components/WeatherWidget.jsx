import React, { useState } from 'react';

const cardStyle = {
  background: 'rgba(22,22,22,0.9)',
  color: '#ddd',
  padding: 14,
  borderRadius: 12,
  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  maxWidth: 520
};

const inputStyle = {
  background: '#111',
  border: '1px solid #333',
  color: '#eee',
  padding: '8px 10px',
  borderRadius: 6,
  outline: 'none',
  width: 200
};

const buttonStyle = {
  background: '#0bb67a',
  border: 'none',
  color: '#062018',
  padding: '8px 12px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600
};

const smallText = { fontSize: 12, color: '#a9a9a9' };

const WeatherWidget = () => {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null);

  const normalize = (resp) => {
    const body = resp?.data ?? resp ?? {};
    return {
      city: body.city || body.location || body.name || q,
      temp: body.temperature ?? body.temp ?? body.current?.temp_c,
      humidity: body.humidity ?? body.current?.humidity,
      desc: body.description || body.current?.condition?.text || (body.weather?.[0]?.description) || '',
      wind: body.wind_speed ?? body.current?.wind_kph ?? body.wind?.speed,
      sunrise: body.sunrise ? new Date(body.sunrise * 1000).toLocaleTimeString() : body.sunrise,
      sunset: body.sunset ? new Date(body.sunset * 1000).toLocaleTimeString() : body.sunset
    };
  };

  const fetchWeather = async () => {
    setErr(null);
    setData(null);
    if (!q.trim()) {
      setErr('Enter a city name');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(q.trim())}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      setData(normalize(json));
    } catch (e) {
      console.error(e);
      setErr(e.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <div style={{ marginBottom: 10, display: 'flex', gap: 8 }}>
        <input
          aria-label="city"
          placeholder="Enter city name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={inputStyle}
        />
        <button onClick={fetchWeather} style={buttonStyle} disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      <div style={cardStyle}>
        {!data && !err && <div style={smallText}>No weather selected — enter a city and press Search.</div>}

        {err && <div style={{ color: '#ff6b6b' }}>{err}</div>}

        {data && (
          <>
            <div style={{ width: 88, textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#fff' }}>
                {data.temp !== undefined ? `${Math.round(data.temp)}°` : '—'}
              </div>
              <div style={smallText}>{data.city}</div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.04)', paddingLeft: 12, flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ color: '#bfeadf', fontWeight: 600 }}>{data.desc || 'Weather'}</div>
                  <div style={smallText}>Humidity: {data.humidity ?? '—'}</div>
                  <div style={smallText}>Wind: {data.wind ?? '—'}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ ...smallText }}>Sunrise</div>
                  <div style={{ color: '#c32020ff' }}>{data.sunrise ?? '—'}</div>
                  <div style={{ height: 6 }} />
                  <div style={{ ...smallText }}>Sunset</div>
                  <div style={{ color: '#ddd' }}>{data.sunset ?? '—'}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
