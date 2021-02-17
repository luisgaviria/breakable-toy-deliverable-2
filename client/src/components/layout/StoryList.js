import React, { useState, useEffect } from "react";
import StoryTile from "./StoryTile.js";
import { withRouter } from "react-router";
// import ReactPlayer from "react-player";

const StoryList = (props) => {
  const [stories, setStories] = useState([]);

  const getStories = async () => {
    try {
      const response = await fetch("/api/v1/stories");

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setStories(body.stories);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    getNewsApiStories();
  }, []);

  const postNewsApiStories = async (newStories) => {
    try {
      const response = await fetch(`/api/v1/stories/NewsApi`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newStories),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        // getStories();
        return;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const getNewsApiStories = async () => {
    try {
      const response = await fetch(`api/v1/NewsApi`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const NewsData = await response.json();
      NewsData.map((data) => {
        data.userId = 2;
      });

      setStories(...stories, NewsData);

      postNewsApiStories(NewsData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const storyListItems = stories.map((storyItem) => {
    if (storyItem.id) {
      return <StoryTile key={storyItem.id} storyData={storyItem} user={props.user} />;
    } else {
      return <StoryTile key={storyItem.apiId} storyData={storyItem} user={props.user} />;
    }
  });

  return (
    <div>
      <div className="top-section">
        <form className="search-form">
          <img id="logo-img" src="https://i.postimg.cc/kG2pxwLT/imageedit-17-5936691456.png" />
          <h2 className="search-title"> Main News </h2>
        </form>
      </div>
      <div>
        <div id="each-park-tile">
          <div id="card-holder"> {storyListItems} </div>
        </div>
      </div>
      <footer>
        <a href="https://github.com/luisgaviria" target="_blank">
          Github link
        </a>
      </footer>
    </div>
  );
};

export default withRouter(StoryList);
