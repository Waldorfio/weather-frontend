import React from 'react'


const WeatherData = ({ data, city, country, celsius, extended }) => {
  return (
    <>
      {(extended.length === 0) ? (
        <div className="flex flex-col gap-[12px]">
          <p className="flex justify-between">
            <img
              src={`https://developer.accuweather.com/sites/default/files/${data?.WeatherIcon < 10 ? '0' + data?.WeatherIcon : data?.WeatherIcon}-s.png`}
              alt={data?.WeatherText}
            />
            <span className="flex flex-row justify-end items-baseline">
              <span className="text-[16px] font-[400] italic">{city},&nbsp;&nbsp;</span>
              <span className="text-[25px] font-[500]">{country}</span>
            </span>
          </p>
          <p className="flex justify-between">
            <span>
              <span className="text-[#2c2c2c] mr-[10px] text-[32px] font-[600]">{data?.TemperatureSummary?.Past24HourRange?.Maximum[celsius ? 'Metric' : 'Imperial'].Value}°</span>
              <span className="text-[#808080]">{data?.TemperatureSummary?.Past24HourRange?.Minimum[celsius ? 'Metric' : 'Imperial'].Value}°</span>
              <span className="text-[#808080] text-[14px]">{celsius ? 'C' : 'F'}</span>
            </span>
            <span className="flex flex-col text-[14px]">
              <span className="text-[#808080]">Humidity: {data?.RelativeHumidity}%</span>
              <span className="text-[#808080]">Wind: {data?.Wind?.Speed?.Metric?.Value}km/h</span>
            </span>
          </p>
          <p>{`In ${city}, the current weather is characterized by ${data?.WeatherText?.toLowerCase()}, with a temperature of ${data?.Temperature[celsius ? 'Metric' : 'Imperial'].Value}°${celsius ? 'C' : 'F'} and a relative humidity of ${data?.RelativeHumidity}%.`}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-[12px]">
          {data?.DailyForecasts ? (
            data.DailyForecasts.map((forecast) => (
              <div key={forecast.EpochDate} className="flex flex-col gap-[12px] pt-[20px] border-t-[1px] border-[#dbdbdb] border-solid">
                <p className="flex justify-between">
                  <img
                    src={`https://developer.accuweather.com/sites/default/files/${
                      forecast.Day.Icon < 10 ? '0' + forecast.Day.Icon : forecast.Day.Icon
                    }-s.png`}
                    alt={forecast.Day.IconPhrase}
                  />
                  <span className="flex flex-row justify-end items-baseline">
                    <span className="text-[16px] font-[400] italic">{city},&nbsp;&nbsp;</span>
                    <span className="text-[25px] font-[500]">{country}</span>
                  </span>
                </p>
                <p className="text-[14px] font-[400] italic text-[#808080] absolute">{new Date(forecast?.Date).toLocaleDateString('en-US', { day: '2-digit', month: 'numeric' })}</p>
                <p className="flex justify-between">
                  <span>
                    <span className="text-[#2c2c2c] mr-[10px] text-[32px] font-[600]">
                      {forecast.Temperature.Maximum.Value}
                      °
                    </span>
                    <span className="text-[#808080]">
                      {forecast.Temperature.Minimum.Value}
                      °
                    </span>
                    <span className="text-[#808080] text-[14px]">{celsius ? 'C' : 'F'}</span>
                  </span>
                  <span className="flex flex-col text-[14px]">
                    <span className="text-[#808080]">Humidity: {forecast.Day.RelativeHumidity.Average}%</span>
                    <span className="text-[#808080]">Wind: {forecast.Day.Wind.Speed.Value}km/h</span>
                  </span>
                </p>
                <p>{forecast.Day.IconPhrase}</p>
              </div>
            ))
          ) : null}
        </div>
      )}
    </>
  )
}

export default WeatherData
