import React, { useState, useEffect } from "react";
function WeatherComponent({ cityCode }) {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch(
          `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`
        );
        const data = await response.json();
        setWeatherData(data);
        console.log("Weather Data:", data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchData();
  }, [cityCode]);
  return (
    <div className="weather-container">
      {weatherData && (
        <>
          <p>Date: {weatherData[0].reportDatetime}</p>
          {weatherData[0].timeSeries[0].areas.map((area) => (
            <div className="weather-area" key={area.area.name}>
              <h2>{area.area.name}</h2>
              <div className="weather-info">
                <p>Weathers</p>
                <p>{area.weathers}</p>
              </div>
              <div className="weather-info">
                <p>Winds</p>
                <p>{area.winds}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default WeatherComponent;
