import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar'
import { GiphyImage, WeatherData } from './components/Results'
import { SkeletonTable } from './components/Skeletons'

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [gifData, setGifData] = useState(null);
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

  const fetchGif = async (condition) => {
    if (!condition) {
      setError('Gif not loaded, condition not set.');
      return;
    }
    console.log('condition:', condition)

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/giphy', {
        query: condition
      });
      setGifData(response.data.gif.data[0]);
      // setError(null);
    } catch (error) {
      setGifData(null);
      setError('Error fetching gif data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData?.Headline?.Text) {
      fetchGif(weatherData.Headline.Text)
    }
  }, [weatherData])

  return (
    <div className="flex flex-col gap-[15px]">
      <h1 className="text-2xl font-semibold mb-4 self-center">
        Weather App
      </h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchWeather={fetchWeather}
      />
      {(!loading && gifData && weatherData) && (
        <div className="flex flex-col gap-[10px] bg-white p-8 rounded shadow-md w-96">
          <GiphyImage gifData={gifData} />
          <WeatherData data={weatherData} />
        </div>
      )}
      {(loading) && (
        <SkeletonTable />
      )}
    </div>
  );
}

export default App;
