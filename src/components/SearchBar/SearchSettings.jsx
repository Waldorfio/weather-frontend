import React, { useState, useEffect } from 'react';

const SearchSettings = ({ extended, setExtended }) => {
  const [current, setCurrent] = useState(true);

  useEffect(() => {
    if (current) { setExtended('') } // reset extended if current selected
  }, [current])

  return (
    <div className="flex gap-[15px] self-center">
      <button
        className={`py-2 px-4 rounded-md transition-all duration-150 animate-fade-in ${
          current
            ? 'bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-50'
            : 'bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-700'
        }`}
        onClick={() => setCurrent((prevState) => !prevState)}
      >
        Current
      </button>
      <button
        className={`py-2 px-4 rounded-md transition-all duration-150 animate-fade-in ${
          !current
            ? 'bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-50'
            : 'bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-700'
        }`}
        onClick={() => setCurrent((prevState) => !prevState)}
      >
        Extended
      </button>
      {(!current) && (
        <div className="animate-slide-right flex gap-[15px]">
          <button
            className={`py-2 px-4 rounded-md transition-all duration-150 ${extended === 'hourly'
              ? 'bg-orange-500 hover:bg-orange-600 text-white hover:text-gray-50'
              : 'bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-700'}`}
            onClick={() => {setExtended('hourly')}}
          >
            Hourly
          </button>
          <button
            className={`py-2 px-4 rounded-md transition-all duration-150 ${extended === 'daily'
              ? 'bg-orange-500 hover:bg-orange-600 text-white hover:text-gray-50'
              : 'bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-700'}`}
            onClick={() => {setExtended('daily')}}
          >
            Daily
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSettings;
