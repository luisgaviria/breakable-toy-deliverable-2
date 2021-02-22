import React, { useState } from "react";
import ErrorList from "../ErrorList.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ReviewTile = (props) => {
  const [review, setReview] = useState({
    id: props.review.id,
    comments: props.review.comments,
    rating: props.review.rating,
  });

  const saveReview = (event) => {
    event.preventDefault();
    props.updateReview(review);
  };

  const deleteReviewHandler = (event) => {
    event.preventDefault();
    props.deleteReview(props.review);
  };

  const handleInputChange = (event) => {
    if (props.user.email !== props.review.user.email || props.user == "guest") {
      return console.log("You cannot update this review");
    }
    event.preventDefault();
    setReview({
      ...review,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  let buttonClassName;
  if (props.user !== props.review.user.email) {
    buttonClassName = "invisible";
  } else {
    buttonClassName = "button-group";
  }

  return (
    <div className="review-form-reviews">
      <form id="review-form">
        <ErrorList errors={props.errors} />
        <h4>user email: {props.review.user.email}</h4>
        <select name="rating" onChange={handleInputChange} value={review.rating}>
          <option value=" "></option>
          <option value={5}>★★★★★</option>
          {/* <option value={1.5}>1.5 Stars</option> */}
          <option value={4}>★★★★</option>
          {/* <option value={2.5}>2.5 Stars </option> */}
          <option value={3}>★★★</option>
          {/* <option value={3.5}>3.5 Stars </option> */}
          <option value={2}>★★</option>
          {/* <option value={4.5}>4.5 Stars </option> */}
          <option value={1}>★</option>
        </select>
        <div className="button-group">
          <TextField
            id="filled-secondary"
            label="Comments"
            variant="filled"
            color="secondary"
            type="text"
            name="comments"
            onChange={handleInputChange}
            value={review.comments}
            fullWidth
          />
          <Button
            size="small"
            id="delete-button"
            color="primary"
            variant="contained"
            value="Delete"
            onClick={deleteReviewHandler}
          >
            Delete
          </Button>
          <Button
            id="delete-button"
            size="small"
            color="primary"
            variant="contained"
            value="Save Edit"
            onClick={saveReview}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewTile;
