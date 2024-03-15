import React, { useState } from 'react'


const WeatherData = ({ data }) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <p className="flex justify-between">
        <img
          src={`https://developer.accuweather.com/sites/default/files/0${data?.DailyForecasts[0].Day?.Icon}-s.png`}
          alt={data?.DailyForecasts[0].Day?.IconPhrase}
        />
        <div className="flex flex-row justify-end items-baseline">
          <span className="text-[14px] font-[200] italic">Brisbane,&nbsp;</span>
          <span className="text-[25px] font-[500]">Australia</span>
        </div>
      </p>
      <p className="">
        <span className="text-[#2c2c2c] mr-[10px] text-[32px] font-[600]">{data?.DailyForecasts[0].Temperature?.Maximum?.Value}°</span>
        <span className="text-[#808080]">{data?.DailyForecasts[0].Temperature?.Minimum?.Value}°</span>
      </p>
      <p>{data?.DailyForecasts[0].Day?.IconPhrase} during the day, and then {data?.DailyForecasts[0].Night?.IconPhrase.toLowerCase()} during the night.</p>
    </div>
  )
}

export default WeatherData
