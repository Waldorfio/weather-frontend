import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';
import { GiphyImage, WeatherData } from './components/Results';
import { SkeletonTable } from './components/Skeletons';
import { UserPreferences } from './components/Preferences';

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [gifData, setGifData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [celsius, setCeslsius] = useState(false);
  console.log('cels', celsius)
  const [modalOpen, setModalOpen] = useState(false);

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

  const fetchGif = async (condition) => {
    if (!condition) {
      setError('Gif not loaded, condition not set.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/giphy', {
        query: condition
      });
      setGifData(response.data.gif.data[0]);
    } catch (error) {
      setGifData(null);
      setError('Error fetching gif data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData?.Headline?.Text) {
      fetchGif(weatherData.Headline.Text);
    }
  }, [weatherData]);

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="absolute top-0 right-0 m-4">
        <button onClick={() => setModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v4m0 0v4m0-4h4m-4 0H8m-4 4a8 8 0 018-8h0a8 8 0 018 8h0a8 8 0 01-8 8h0a8 8 0 01-8-8z" />
          </svg>
        </button>
      </div>
      <h1 className="text-2xl font-semibold mb-4 self-center">
        Weather App
      </h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchWeather={fetchWeather}
      />
      {(!loading && gifData && weatherData) && (
        <div className="flex flex-col gap-[10px] bg-white p-8 rounded-[5px] shadow-md w-96 animate-fade-in">
          <WeatherData data={weatherData} celsius={celsius} />
          <GiphyImage gifData={gifData} />
        </div>
      )}
      {(loading) && (
        <SkeletonTable />
      )}
      {modalOpen && (
        <UserPreferences
          celsius={celsius}
          setCelsius={setCeslsius}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
}

export default App;
