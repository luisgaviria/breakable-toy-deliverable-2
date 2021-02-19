import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import WeatherData from "./WeatherData.js";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("https://i.postimg.cc/VvDMszs6/PHOTO-2021-02-11-14-19-04.jpg")`,
    height: "1000px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
  root: {
    "& > *": {
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
      width: "25ch",
    },
  },
}));

const HomePage = () => {
  const [stories, setStories] = useState({});
  const classes = useStyles();

  const getWeatherApi = async () => {
    debugger;
    try {
      const response = await fetch(`api/v1/weatherApi`);
      debugger;
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const NewsData = await response.json();
      console.log(NewsData);

      setStories(...stories, NewsData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getWeatherApi();
  }, []);

  return (
    <div className={classes.hero}>
      <WeatherData current={stories.current} location={stories.location} />
      <img id="logo-home" src="https://i.postimg.cc/C5W0VH5g/imageedit-8-5563608188.png" />
      <h1 className="title-uraba">Urabá Television</h1>
      <div id="form-id">
        {/* <div id="youtube-id">
          <ReactPlayer url="https://www.youtube.com/watch?v=s4KunkGyWvU&ab_channel=URABATELEVISION" />
        </div> */}
      </div>
      {/* <img
        src="https://codata.org/wp-content/uploads/2020/10/if_open-science.png"
        id="science-picture"
      ></img>
      <img src="https://oaklandtech.com/staff/files/2016/09/sports.jpg" id="sports-picture"></img>{" "} */}
    </div>
  );
};

export default HomePage;
