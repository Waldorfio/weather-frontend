import React, { useState } from 'react'


const SearchBar = ({ query, setQuery, fetchWeather }) => {
  return (
     <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">
          Weather App
        </h1>
        <div className="flex search-bar">
            <input
              type="search"
              name="search"
              pattern=".*\S.*"
              placeholder="Enter location..."
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="search-btn"
              onClick={fetchWeather}
            >
              <span>
                Search
              </span>
            </button>
        </div>
      </div>
    )
}

export default SearchBar
