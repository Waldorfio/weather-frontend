import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!query) {
      setError('Please enter a location.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/weather', {
        city: query,
        extended: 'daily'
      });
      setWeatherData(response.data.weather);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Weather App</h1>
        <div className="flex">
          <input
            type="text"
            className="border border-gray-300 rounded-l py-2 px-4 w-full"
            placeholder="Enter location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r px-4 py-2"
            onClick={fetchWeather}
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {weatherData && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Weather Forecast</h2>
            <p className="mt-2">Temperature: {weatherData.temperature}°C</p>
            <p>Weather: {weatherData.weather}</p>
            <p>Headline: {weatherData.Headline.Category}</p>
            <p>Description: {weatherData.Headline.Text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
