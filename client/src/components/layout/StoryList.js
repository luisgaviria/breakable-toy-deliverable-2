import React, { useState, useEffect } from "react";
import StoryTile from "./StoryTile.js";
import ReactPlayer from "react-player";

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
    getStories();
    getNewsApiStories();
  }, []);

  // const postNewsApiStories = async (newStories) => {
  //   try {
  //     const response = await fetch(`/api/v1/news/NewsApi`, {
  //       method: "POST",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //       }),
  //       body: JSON.stringify(newStories),
  //     });
  //     if (!response.ok) {
  //       if (response.status === 422) {
  //         const body = await response.json();
  //         const newErrors = translateServerErrors(body.errors);
  //         return setErrors(newErrors);
  //       } else {
  //         const errorMessage = `${response.status} (${response.statusText})`;
  //         const error = new Error(errorMessage);
  //         throw error;
  //       }
  //     } else {
  //       // getStories();
  //     }
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

  const getNewsApiStories = async () => {
    try {
      const response = await fetch(`api/v1/NewsApi`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const NewsData = await response.json();
      console.log(NewsData);
      setStories(...stories, NewsData.articles);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  // const getNewsApiStories = async () => {
  //   try {
  //     const response = await fetch(`api/v1/tweets`);
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const tweetData = await response.json();
  //     console.log(tweetData);
  //     // setStories(...stories, NewsData.articles);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

  const storyListItems = stories.map((storyItem) => {
    return <StoryTile key={storyItem.id} storyData={storyItem} user={props.user} />;
  });

  return (
    <div>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      <div className="top-section">
        <form className="search-form">
          <h2 className="search-title"> Welcome Reader </h2>
          <ReactPlayer url="https://www.facebook.com/UrabaTelevision/videos/2413886382237502" />
        </form>
      </div>
      <div>
        <div id="each-park-tile">
          <div id="card-holder"> {storyListItems} </div>
        </div>
      </div>
    </div>
  );
};

export default StoryList;
