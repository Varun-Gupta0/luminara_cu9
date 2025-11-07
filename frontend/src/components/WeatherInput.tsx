import React, { useState } from 'react';
import axios from 'axios';

interface WeatherDataShape {
  data?: {
    city: string;
    temperature: number;
    humidity: number;
    description: string;
  };
  message?: string;
}

const WeatherInput: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherDataShape | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setError(null);
    setLoading(true);
    setWeatherData(null);

    try {
      const res = await axios.get<WeatherDataShape>(`http://localhost:4000/api/weather?city=${encodeURIComponent(city)}`);
      console.log('API Response:', res.data);
      setWeatherData(res.data);
    } catch (err: any) {
      console.error('Error fetching weather:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '12px', display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={{ padding: 8, borderRadius: 6, border: '1px solid #444' }}
      />
      <button onClick={fetchWeather} style={{ padding: '8px 12px', borderRadius: 6 }}>
        {loading ? 'Loading…' : 'Get'}
      </button>

      {error && <div style={{ color: 'crimson', marginLeft: 12 }}>{error}</div>}

      {weatherData?.data && (
        <div style={{ marginLeft: 16 }}>
          <div><strong>{weatherData.data.city}</strong></div>
          <div>Temp: {weatherData.data.temperature}°C</div>
          <div>Humidity: {weatherData.data.humidity}%</div>
          <div>{weatherData.data.description}</div>
        </div>
      )}
    </div>
  );
};

export default WeatherInput;