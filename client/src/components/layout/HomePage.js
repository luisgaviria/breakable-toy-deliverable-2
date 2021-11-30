import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

import Header from "./Header.js";
import YoutubeData from "./YoutubeData.js";
import WeatherData from "./WeatherData.js";
import StoryList from "./StoryList.js";

const HomePage = () => {
  const [stories, setStories] = useState({});

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
