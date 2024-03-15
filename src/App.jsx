import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar'
import { ResultsContainer} from './components/ResultsContainer'

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  console.log('weatherData', weatherData)
  const [gifData, setGifData] = useState(null);
  console.log('gifData', gifData)
  const [loading, setLoading] = useState(false);
  console.log('loading', loading)
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8 rounded shadow-md w-96">
      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchWeather={fetchWeather}
      />
      <ResultsContainer
        gifData={gifData}
        error={error}
        weatherData={weatherData}
      />
    </div>
  );
}

export default App;
