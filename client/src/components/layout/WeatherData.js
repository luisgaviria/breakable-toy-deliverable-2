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
      <div className="card">
        <a href="https://weather.com/es-US/tiempo/hoy/l/7.88,-76.62?par=google">
          <div className="weather-icon">
            <img src={`http:${props.current.condition.icon}`}></img>
          </div>
        </a>

        <div className="weatherInfo">
          <div className="temperature">{props.current.temp_c ? props.current.temp_c : null}°</div>
          {/* <div className="place">
            Velocidad del viento: {props.current.wind_kph ? props.current.wind_kph : null} kmph
          </div> */}

          <div className="description">
            <div className="weatherCondition">
              {props.current.condition.text ? props.current.condition.text : null}
            </div>
            <div className="place">
              {props.location.name ? props.location.name : null}, Antioquia
            </div>
          </div>

          <div className="date">{dt}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default WeatherData;
