import React, { useState, useEffect } from 'react';

interface WeatherData {
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  description?: string;
}

const WeatherCard: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');

  const fetchWeather = async (searchCity: string) => {
    if (!searchCity.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/weather?city=${encodeURIComponent(searchCity)}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const weatherData: WeatherData = await response.json();
      setData(weatherData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="weather-card">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {data && (
        <div className="weather-data">
          {data.temperature !== undefined && (
            <div className="temperature">
              Temperature: {data.temperature}°C
            </div>
          )}
          {data.humidity !== undefined && (
            <div className="humidity">
              Humidity: {data.humidity}%
            </div>
          )}
          {data.windSpeed !== undefined && (
            <div className="wind">
              Wind Speed: {data.windSpeed} m/s
            </div>
          )}
          {data.description && (
            <div className="description">
              {data.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
