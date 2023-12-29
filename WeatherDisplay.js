import React from "react";
const WeatherDisplay = ({weatherData}) => {
    if(weatherData) {
      return(
        <div>
          <h1>WeatherDisplay</h1>
          <p>Feels like: {weatherData.feels_like}</p>
          <p>humidity: {weatherData.humidity}</p>
          <p>pressure: {weatherData.pressure}</p>
          <p>temp: {weatherData.temp}</p>
          <p>temp_max: {weatherData.temp_max}</p>
          <p>temp_min: {weatherData.temp_min}</p>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
      
    }

}

export default WeatherDisplay;
