import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import NewReviewForm from "./NewReviewForm.js";
import ReviewTile from "./ReviewTile.js";

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
    let storyId = undefined;
    if (props.match.params.id) {
      storyId = props.match.params.id;
    } else {
      storyId = props.storyData.apiId;
    }

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

  // const getReviews = async () => {
  //   const storyId = props.match.params.id;
  //   //integrate this review with front end.
  //   try {
  //     const response = await fetch(`/api/v1/stories/${parkId}`);
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const body = await response.json();
  //     setPark(body.park);
  //   } catch (error) {
  //     console.error(`Err in fetch: ${error.message}`);
  //   }
  // };

  const postReview = async (newReviewData) => {
    try {
      const storyId = props.match.params.id;
      const response = await fetch(`/api/v1/stories/${storyId}/reviews`, {
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
        debugger;
        setStory({
          ...story,
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

  // const allTheReviews = story.reviews.map((review) => {
  //   return <ReviewTile key={review.id} review={review} errors={errors} />;
  // });

  return (
    <div className="image grid-container small-10 small-centered columns" id="image-container">
      <div className="image grid-container small-10 small-centered columns">
        <img className="showpage-pic" src={story.urlToImage} />
        <aside className="module">
          <a target="_blank" href={story.url}>
            <h3 className="showpage-title">{story.title}</h3>
          </a>

          <h5>
            <span>{/* Average rating: {story.averageRating} */}</span>
          </h5>
          <br></br>
        </aside>
        <h5 id="story-show-description">{story.description}</h5>

        <h6> {story.content}</h6>
      </div>
      <div className="review-comment-box">
        <NewReviewForm storyId={story.id} postReview={postReview} />
        {/* {allTheReviews} */}
      </div>
    </div>
  );
};

export default withRouter(StoryShow);
