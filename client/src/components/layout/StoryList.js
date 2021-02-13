import React, { useState, useEffect } from "react";
import StoryTile from "./StoryTile.js";
import { withRouter } from "react-router";
// import ReactPlayer from "react-player";

const StoryList = (props) => {
  const [stories, setStories] = useState([]);
  // debugger;

  const getStories = async () => {
    try {
      const response = await fetch("/api/v1/stories");
      // debugger;
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      // debugger;
      setStories(body.stories);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    // getStories();
    // getScienceApiStories();
    getNewsApiStories();
    // getMediaStackStories();
  }, []);

  const postNewsApiStories = async (newStories) => {
    // debugger;
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

  const getNewsApiStories = async () => {
    try {
      const response = await fetch(`api/v1/NewsApi`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const NewsData = await response.json();
      // debugger;
      // console.log(NewsData);

      NewsData.map((data) => {
        data.userId = 2;
      });

      setStories(...stories, NewsData);
      // debugger;
      postNewsApiStories(NewsData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  // const getScienceApiStories = async () => {
  //   try {
  //     const response = await fetch(`api/v1/NewsApi`);
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }

  //     const NewsData = await response.json();
  //     debugger;
  //     console.log(NewsData);
  //     setStories(...stories, NewsData);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

  // const getMediaStackStories = async () => {
  //   try {
  //     const response = await fetch(`api/v1/mediaStackApi`);
  //     debugger;
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const StackData = await response.json();
  //     debugger;
  //     console.log(StackData);
  //     setStories(...stories, StackData.data);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

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
  //     // setStories(...stories, tweetData.articles);
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };
  // debugger;
  const storyListItems = stories.map((storyItem) => {
    //storyItem.id is undefined currently
    //flow control to check if the storyItem has an id or an APIid
    //if(storyItem.id)
    //return below return, using storyItemId
    //otherwise we want to return storyItem.apiId
    // debugger;
    if (storyItem.id) {
      return <StoryTile key={storyItem.id} storyData={storyItem} user={props.user} />;
    } else {
      return <StoryTile key={storyItem.apiId} storyData={storyItem} user={props.user} />;
    }

    //add column to story table for apiId.
    //keep in mind to use same logic on story tile
    // return <StoryTile key={storyItem.id} storyData={storyItem} user={props.user} />;
  });

  return (
    <div>
      <div className="top-section">
        <form className="search-form">
          <h2 className="search-title"> Main News </h2>
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

export default withRouter(StoryList);
