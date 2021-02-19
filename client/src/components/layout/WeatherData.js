import React from "react";

const WeatherData = (props) => {
  return (
    <div>
      <p>{props.current.condition.text ? props.current.condition.text : null}</p>
      <p>{props.current.temp_c ? props.current.temp_c : null}</p>
      <p>{props.current.gust_kph ? props.current.gust_kph : null}</p>
      <p>{props.current.precip_mm ? props.current.precip_mm : null}</p>
      <p>{props.current.wind_kph ? props.current.wind_kph : null}</p>
      <p>{props.location.name ? props.location.name : null}</p>
    </div>
  );
};

export default WeatherData;
