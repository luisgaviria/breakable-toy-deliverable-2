import React, { useState, useEffect } from "react";
import StoryTile from "./StoryTile.js";
import { withRouter } from "react-router";

const SportsList = (props) => {
  const [stories, setStories] = useState([]);

  const getSportsApiStories = async () => {
    try {
      const response = await fetch(`api/v1/NewsApi/sports`);
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
    getSportsApiStories();
  }, []);

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
          <h2 className="search-title"> Sports News </h2>
        </form>
      </div>
      <div>
        <div id="each-story-tile">
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

export default withRouter(SportsList);
