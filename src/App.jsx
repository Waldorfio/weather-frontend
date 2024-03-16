import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar, SearchSettings } from './components/SearchBar';
import { GiphyImage, WeatherData } from './components/Results';
import { SkeletonTable } from './components/Skeletons';
import { UserPreferences, SettingsButton } from './components/Preferences';
import { ErrorMessage, WarningMessage } from './components/Messages';

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [gifData, setGifData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [celsius, setCeslsius] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [extended, setExtended] = useState('');
  console.log('extended', extended)

  const fetchWeather = async () => {
    if (!query) return // prevent query from running on initial React renders, saving queries
    console.log('WEATHER RUN!')
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/weather', {
        city: query,
        extended: extended
      });
      setWeatherData(response.data.weather);
      setError(null);
    } catch (error) {
      setWeatherData([]);
      setError(`Error fetching Weather: ${error.response.statusText}`);
    }
  };

  const fetchGif = async (condition) => {
    if (!condition) {
      setError('Could not find a Gif for the given weather.');
      return;
    }
    console.log('GIF RUN!')
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/giphy', {
        query: condition
      });
      setGifData(response.data.gif.data[0]);
    } catch (error) {
      console.error(error)
      setGifData([]);
      setError(`Error fetching Gif: ${error.response.statusText}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData?.Headline?.Category) {
      fetchGif(`funny ${weatherData.Headline.Category}`);
    }
  }, [weatherData]);

  // If temp unit changes, refetch weather
  useEffect(() => {
    fetchWeather()
  }, [celsius])

  return (
    <div className="flex flex-col gap-[15px]">
      <SettingsButton setModalOpen={setModalOpen} />
      <h1 className="text-2xl font-semibold mb-4 self-center animate-fade-in">
        Weather App
      </h1>
      <SearchSettings
        extended={extended}
        setExtended={setExtended}
      />
      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchWeather={fetchWeather}
      />
      {(!loading && weatherData) && (
        <div className="flex flex-col gap-[10px] bg-white p-8 rounded-[5px] shadow-md w-96 animate-fade-in">
          <WeatherData data={weatherData} celsius={celsius} />
          <GiphyImage gifData={gifData} />
          {error && <ErrorMessage msg={error} />}
          {warning && <WarningMessage msg={warning} />}
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
