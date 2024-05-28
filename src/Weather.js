// Weather.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Import your CSS file

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=537c7e3b796424b2549ed66cfbfb6b92`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return 'fas fa-sun'; // Font Awesome sun icon
      case 'Rain':
        return 'fas fa-cloud-showers-heavy'; // Font Awesome heavy rain icon
      case 'Thunderstorm':
        return 'fas fa-bolt'; // Font Awesome lightning bolt icon
      default:
        return 'fas fa-cloud'; // Font Awesome cloud icon (default)
    }
  };

  return (
    <div className="container"> {/* Apply custom styles */}
      <form onSubmit={handleSubmit} className='vt-main'>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit"><i className="fas fa-search"></i></button> {/* Font Awesome icon */}
      </form>
      {weatherData ? (
        <>
        <div className='row'>
          <div className='col-md-4'>
            <div className='section-1'>
            <div className='row'>
              <div className='col-md-12'> <h2>{weatherData.name}</h2></div>
            </div>
            <div className='row'>
            <div className='col-md-12'><p>Temperature: {weatherData.main.temp}°C</p></div>
            </div>
          </div>
          </div>
          <div className='col-md-8'>
            <div className='section-2'>
            <div className='row'>
              <div className='col-md-6'> <p><i className={getWeatherIcon(weatherData.weather[0].main)}></i> Description: {weatherData.weather[0].description}</p></div>
              <div className='col-md-6'> <p><i className="fas fa-temperature-high"></i> Feels like : {weatherData.main.feels_like}°C</p> {/* Font Awesome icon */}</div>
            </div>
            <div className='row'>
              <div className='col-md-6'>  <p><i className="fas fa-tint"></i> Humidity : {weatherData.main.humidity}%</p> {/* Font Awesome icon */}</div>
              <div className='col-md-6'> <p><i className="fas fa-wind"></i> Wind Speed : {weatherData.wind.speed}m/s</p> {/* Font Awesome icon */}</div>
            </div>
          </div>
          </div>
          </div>
         
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
