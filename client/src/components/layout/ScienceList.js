import React, { useState, useEffect } from "react";
import StoryTile from "./StoryTile.js";
import { withRouter } from "react-router";

const ScienceList = (props) => {
  const [stories, setStories] = useState([]);

  const getStories = async () => {
    try {
      const response = await fetch("/api/v1/science");

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
        getStories();
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getScienceApiStories();
    postNewsApiStories();
  }, []);

  const getScienceApiStories = async () => {
    try {
      const response = await fetch(`api/v1/NewsApi/science`);
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
          <h2 className="search-title"> Ciencia </h2>
        </form>
      </div>
      <div>
        <div className="list-container"> {storyListItems} </div>
      </div>
    </div>
  );
};

export default withRouter(ScienceList);
