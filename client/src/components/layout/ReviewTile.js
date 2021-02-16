import React, { useState } from "react";
import ErrorList from "../ErrorList.js";

const ReviewTile = (props) => {
  const [review, setReview] = useState({
    id: props.review.id,
    comments: props.review.comments,
    rating: props.review.rating,
  });

  const saveReview = (event) => {
    event.preventDefault();
    console.log(review);
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
      <form>
        <ErrorList errors={props.errors} />
        <h4>user email: {props.review.user.email}</h4>
        <select name="rating" onChange={handleInputChange} value={review.rating}>
          <option value=" "></option>
          <option value={1}>1 Star</option>
          {/* <option value={1.5}>1.5 Stars</option> */}
          <option value={2}>2 Stars </option>
          {/* <option value={2.5}>2.5 Stars </option> */}
          <option value={3}>3 Stars </option>
          {/* <option value={3.5}>3.5 Stars </option> */}
          <option value={4}>4 Stars </option>
          {/* <option value={4.5}>4.5 Stars </option> */}
          <option value={5}>5 Stars </option>
        </select>
        <div className="button-group">
          <input type="text" name="comments" value={review.comments} onChange={handleInputChange} />
          <div>
            <input type="button" className="none" value="Delete" onClick={deleteReviewHandler} />
          </div>
          <div>
            <input type="button" className="none" value="Save Edit" onClick={saveReview} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewTile;
