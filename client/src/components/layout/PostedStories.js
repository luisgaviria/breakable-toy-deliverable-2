import React, { useState, useEffect } from "react";
import StoryTile from "./StoryTile.js";
import { withRouter } from "react-router";

const PostedList = (props) => {
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
      console.log(body);
      setStories(body.stories);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  const storyListItems = stories.map((storyItem) => {
    if (storyItem.urlToImage !== null) {
      if (storyItem.id) {
        return <StoryTile key={storyItem.id} storyData={storyItem} user={props.user} />;
      } else {
        return <StoryTile key={storyItem.apiId} storyData={storyItem} user={props.user} />;
      }
    }
  });

  return (
    <div>
      <div className="top-section">
        <form className="search-form">
          <h2 className="search-title"> All the News </h2>
        </form>
      </div>
      <div>
        <div className="list-container"> {storyListItems} </div>
      </div>
    </div>
  );
};

export default withRouter(PostedList);
