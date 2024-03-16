import React, { useState } from 'react';

const SearchSettings = () => {
  const [showCurrentWeather, setShowCurrentWeather] = useState(true);

  const toggleWeatherView = () => {
    setShowCurrentWeather((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className={`mr-4 py-2 px-4 rounded-md transition-all duration-150 ${
          showCurrentWeather
            ? 'bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-50'
            : 'bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-700'
        }`}
        onClick={toggleWeatherView}
      >
        Current
      </button>
      <button
        className={`py-2 px-4 rounded-md transition-all duration-150 ${
          !showCurrentWeather
            ? 'bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-50'
            : 'bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-700'
        }`}
        onClick={toggleWeatherView}
      >
        Extended
      </button>
    </div>
  );
};

export default SearchSettings;
