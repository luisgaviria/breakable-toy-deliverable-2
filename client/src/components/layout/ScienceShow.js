import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import NewReviewForm from "./NewReviewForm.js";
import ReviewTile from "./ReviewTile.js";

const ScienceShow = (props) => {
  const [errors, setErrors] = useState({});
  const [story, setStory] = useState({
    author: "",
    content: "",
    publishedAt: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    rating: "",
    reviews: [],
    averageRating: null,
  });

  const getStory = async () => {
    const storyId = props.match.params.id;
    console.log(storyId);
    try {
      const response = await fetch(`/api/v1/science/${storyId}`);

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      console.log(body);
      setStory(body.story);
    } catch (error) {
      console.error(`Err in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getStory();
  }, []);

  return (
    <div className="image grid-container small-10 small-centered columns" id="image-container">
      <div className="image grid-container small-10 small-centered columns">
        <img className="showpage-pic" src={story.urlToImage} />
        <aside className="module">
          <a target="_blank" href={story.url}>
            <h3 id="tile-title">{story.title}</h3>
          </a>
          <h5>
            <span>
              <h3 className="title-content">
                <br />
                {/* Average rating: {story.averageRating} */}
                <br />
              </h3>
            </span>
          </h5>
          <br></br>
        </aside>
        <p id="story-show-description">{story.description}</p>
      </div>
    </div>
  );
};

export default withRouter(ScienceShow);
