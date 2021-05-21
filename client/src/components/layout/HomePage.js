import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";

// import Container from "@material-ui/core/Container";
import Header from "./Header.js";
import YoutubeData from "./YoutubeData.js";
import WeatherData from "./WeatherData.js";
import StoryList from "./StoryList.js";

// const useStyles = makeStyles((theme) => ({
//   hero: {
//     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("https://i.postimg.cc/VvDMszs6/PHOTO-2021-02-11-14-19-04.jpg")`,
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     position: "relative",
//     marginBottom: "0%",
//     marginTop: "0%",
//     justifyContent: "center",
//     color: "#fff",
//     fontSize: "4rem",
//     bottom: "0%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//   },
//   root: {
//     "& > *": {
//       textAlign: "center",
//       marginLeft: "auto",
//       marginRight: "auto",
//       width: "25ch",
//     },
//   },
//   playerWrapper: {
//     width: "100%",
//     position: "relative",
//   },
// }));

const HomePage = () => {
  const [stories, setStories] = useState({});
  // const [state, setState] = useState({
  //   playing: true,
  // });

  // const { playing } = state;

  const getWeatherApi = async () => {
    try {
      const response = await fetch(`api/v1/weatherApi`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const NewsData = await response.json();
      getYoutubeApi(NewsData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const getYoutubeApi = async (data) => {
    try {
      const response = await fetch(`api/v1/youtubeApi`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setStories({
        current: data.current,
        location: data.location,
        videos: body,
      });
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getWeatherApi();
  }, []);

  return (
    <div>
      <Header />
      {/* <h1 className="title-uraba">Urabá Television</h1> */}
      <div id="weather-id">
        <WeatherData current={stories.current} location={stories.location} />
      </div>
      <div className="youtube-item">
        <YoutubeData current={stories.videos} />
      </div>
      <div>
        <StoryList />
      </div>
    </div>
  );
};

export default HomePage;
