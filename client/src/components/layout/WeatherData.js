import React, { useState, useEffect } from "react";

const WeatherData = (props) => {
  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  if (props.current && props.location) {
    return (
      <div className="container">
        <div className="widget">
          <div className="left">
            <h4 className="h4-text">{dt}</h4>
            <div className="weather-icon">
              <img src={`http:${props.current.condition.icon}`}></img>
            </div>

            <h4 className="homepage-weather-text">
              {props.location.name ? props.location.name : null}, Antioquia
            </h4>
            <h4 className="homepage-weather-text">
              Forecast: {props.current.condition.text ? props.current.condition.text : null}
            </h4>
            <h4 className="homepage-weather-text">
              Temperature: {props.current.temp_c ? props.current.temp_c : null}° celsius
            </h4>
            <h4 className="homepage-weather-text">
              wind-speed: {props.current.wind_kph ? props.current.wind_kph : null} kmph
            </h4>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default WeatherData;
