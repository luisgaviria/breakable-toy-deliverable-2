import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import NewReviewForm from "./NewReviewForm.js";
import ReviewTile from "./ReviewTile.js";
import Grid from "@material-ui/core/Grid";

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
    id: "",
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
      await getReviews(body.story);
    } catch (error) {
      console.error(`Err in fetch: ${error.message}`);
    }
  };

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

  const getReviews = async (tempStory) => {
    let storyId = undefined;
    if (props.match.params.id) {
      storyId = props.match.params.id;
    } else {
      storyId = props.storyData.apiId;
    }
    try {
      const response = await fetch(`/api/v1/stories/${storyId}/reviews/${tempStory.id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
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
          ...tempStory,
          reviews: body.reviews,
        });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteReview = async (review) => {
    try {
      const reviewId = review.id;
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
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
      }
      const body = await response.json();

      setStory({
        ...story,
        reviews: body.reviews,
      });
      getReviews(story);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const updateReview = async (review) => {
    try {
      const reviewId = review.id;
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(review),
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
        setStory({
          ...story,
          reviews: story.reviews,
        });
        setErrors({});
        return;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let loggedInUser;
  if (props.user == undefined) {
    loggedInUser = { email: "guest" };
  } else {
    loggedInUser = props.user;
  }

  let allTheReviews = [];
  if (Array.isArray(story.reviews) && story.reviews.length) {
    allTheReviews = story.reviews.map((review) => {
      return (
        <ReviewTile
          key={review.id}
          deleteReview={() => deleteReview(review)}
          updateReview={updateReview}
          review={review}
          errors={errors}
          user={loggedInUser}
        />
      );
    });
  }

  return (
    <div className="image grid-container small-10 small-centered columns" id="image-container">
      <div id="big-div">
        <div className="image grid-container small-10 small-centered columns" id="image-div">
          <img
            className="showpage-pic"
            src={
              story.urlToImage ||
              "https://cdn.shortpixel.ai/client/to_avif,q_glossy,ret_img,w_400,h_264/https://cannabisbydesignphysicians.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
            }
          />
          <div className="module">
            <Grid container id="text-div" direction="column" justify="flex" alignItems="center">
              <div id="text-div">
                <a target="_blank" href={story.url}>
                  <h3 className="showpage-title">{story.title}</h3>
                </a>

                <h5>
                  <span>{/* Average rating: {story.averageRating} */}</span>
                </h5>
                <br></br>

                <h5 id="story-show-description">{story.description}</h5>

                <h6 id="content"> {story.content}</h6>
              </div>
            </Grid>
          </div>
        </div>
      </div>

      <div className="review-comment-box">
        <NewReviewForm storyId={story.id} postReview={postReview} />
        {allTheReviews.length ? allTheReviews : null}
      </div>
    </div>
  );
};

export default withRouter(StoryShow);
