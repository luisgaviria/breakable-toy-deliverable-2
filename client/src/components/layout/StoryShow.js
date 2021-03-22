import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import NewReviewForm from "./NewReviewForm.js";
import ReviewTile from "./ReviewTile.js";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 900,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("https://i.postimg.cc/VvDMszs6/PHOTO-2021-02-11-14-19-04.jpg")`,
    height: "1000px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
}));

const StoryShow = (props) => {
  const classes = useStyles();
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
      // console.log(body.story);
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
    console.log(story.description);
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
    <div className="showpage-frame">
      <h5>
        <span>{/* Average rating: {story.averageRating} */}</span>
      </h5>

      <a className="title-class" target="_blank" href={story.url}>
        <img
          className="image-id"
          src={
            story.urlToImage ||
            "https://cdn.shortpixel.ai/client/to_avif,q_glossy,ret_img,w_400,h_264/https://cannabisbydesignphysicians.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
          }
        />
        <div id="title-id">{story.title}</div>
      </a>

      <div id="show-description">{story.description}</div>

      <div textalign="center" id="description">
        {story.content}
      </div>
      <div className="read-more">
        <Button variant="outlined" href={story.url}>
          Read more
        </Button>
      </div>
      <div className="review-comment-box">
        <NewReviewForm storyId={story.id} postReview={postReview} />
        {allTheReviews.length ? allTheReviews : null}
      </div>
    </div>
  );
};

export default withRouter(StoryShow);
