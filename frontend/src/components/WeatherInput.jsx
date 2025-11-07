import React, { useState } from 'react';
import axios from 'axios';

const WeatherInput = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/weather?city=${encodeURIComponent(city)}`);
      console.log('API Response:', response.data); // Log the response for debugging
      setWeatherData(response.data); // Ensure this matches the expected structure
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err); // Log the error for debugging
      setError(err.response?.data?.message || 'Failed to fetch weather data.');
      setWeatherData(null);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Weather Information</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: '10px', width: '200px', marginRight: '10px' }}
      />
      <button onClick={fetchWeather} style={{ padding: '10px' }}>
        Get Weather
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Weather in {weatherData.data.city}</h3>
          <p>Temperature: {weatherData.data.temperature}°C</p>
          <p>Humidity: {weatherData.data.humidity}%</p>
          <p>Description: {weatherData.data.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInput;