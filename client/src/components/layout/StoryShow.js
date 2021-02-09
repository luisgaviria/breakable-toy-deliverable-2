import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";

const StoryShow = (props) => {
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
    try {
      const response = await fetch(`/api/v1/stories/${storyId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setStory(body.story);
    } catch (error) {
      console.error(`Err in fetch: ${error.message}`);
    }
  };

  const postReview = async (newReviewData) => {
    try {
      const storyId = await fetch(`/api/v1/stories/${storyId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewData),
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
        const body = await response.json();
        setStory({
          ...story,
          averageRating: body.story.averageRating,
          reviews: [...story.reviews, body.review],
        });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    getStory();
  }, []);

  const allTheReviews = story.reviews.map((review) => {
    return <ReviewTile key={review.id} review={review} errors={errors} />;
  });

  return (
    <div className="image grid-container small-10 small-centered columns" id="image-container">
      <div className="image grid-container small-10 small-centered columns">
        <img className="showpage-pic" src={story.urlToImage} />
        <aside className="module">
          <h3 className="showpage-title">{story.title}</h3>
          <h5>
            <span>
              <h3 className="title-content">
                {story.content}
                <br />
                Average rating: {story.averageRating}
                <br />
              </h3>
            </span>
          </h5>
          <br></br>
        </aside>
        <p id="park-show-description">{story.description}</p>
      </div>
      <div className="review-comment-box">
        <NewReviewForm parkId={story.id} postReview={postReview} />
        {allTheReviews}
      </div>
    </div>
  );
};
