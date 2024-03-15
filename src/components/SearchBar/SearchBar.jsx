import React, { useState } from 'react'


const SearchBar = ({ query, setQuery, fetchWeather }) => {
  return (
    <div className="flex search-bar">
      <input
        type="search"
        name="search"
        pattern=".*\S.*"
        required
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white"
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
  )
}

export default SearchBar
