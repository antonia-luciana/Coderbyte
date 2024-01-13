import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [prevCities, setPrevCities] = useState([]);
  //const [, setPrevCities] = useState([]);
  // instead of requesting data from an API, use this mock data
  let temperature, humidity, windSpeed;

  const mockWeatherData = {
    'New York': { 
      temperature: '22Â°C', 
      humidity: '56%', 
      windSpeed: '15 km/h'
    },
    'Los Angeles': {
      temperature: '27Â°C',
      humidity: '45%',
      windSpeed: '10 km/h',
    },
    'London': { 
      temperature: '15Â°C', 
      humidity: '70%', 
      windSpeed: '20 km/h' 
    },
  };

  const search = (city) => {
    const data = mockWeatherData[city];
    console.log(data, city);
    if (!data) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setPrevCities(prevCities => {
          if (prevCities.indexOf(city) === -1) {
            return [...prevCities, city]
          } else {
            return prevCities;
          }
        });
    }
    setWeather(data);
  }
  
  return (
    <div>
      <input type="text" id="citySearch" placeholder="Search for a city..."
      onChange={(e) => setCity(e.target.value)} />
      <button id="searchButton" onClick={() => search(city)}>Search</button>
      <div id="weatherData">
        {
          notFound ? <div>City not found.</div> : <>
            <div>Temperature: {weather ? weather.temperature : ''}</div>
            <div>Humidity: {weather ? weather.humidity : ''}</div>
            <div>Wind Speed: {weather ? weather.windSpeed : ''}</div>
          </>
        }
      </div>
      <div id="previousSearches">
        {prevCities ? prevCities.map(city => <span>
        <button onClick={() => search(city)}
        >{city}</button>
        </span>) : ''}
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeatherDashboard />);