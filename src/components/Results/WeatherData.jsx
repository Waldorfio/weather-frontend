import React, { useState } from 'react'


const WeatherData = ({ data }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">
        Weather Forecast
      </h2>
      <p className="mt-2">
        Temperature: {data?.temperature}°C
      </p>
      <p>Weather: {data?.weather}</p>
      <p>Headline: {data?.Headline?.Category}</p>
      <p>Description: {data?.Headline?.Text}</p>
    </div>
  )
}

export default WeatherData
