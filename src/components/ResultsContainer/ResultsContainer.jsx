import React, { useState } from 'react'


const ResultsContainer = ({ gifData, error, weatherData }) => {
  return (
    <div>
      <img
        src={gifData?.images?.original?.url} // Extracting URL from the object
        alt={gifData?.title} // Using the title as alt text
      />
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
  )
}

export default ResultsContainer
