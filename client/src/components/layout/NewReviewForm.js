import React, { useState } from "react";
import ErrorList from "../ErrorList.js";
import Button from "@material-ui/core/Button";
// import Rating from "@material-ui/lab/Rating";

// import { FaStar } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";

const NewReviewForm = (props) => {
  const [errors, setErrors] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: "",
    comments: "",
  });

  const [rating, setRating] = useState(null);

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.postReview(newReview);
    clearForm();
  };

  const clearForm = () => {
    setNewReview({
      rating: "",
      comments: "",
    });
  };

  return (
    <div className="callout" id="park-review-form">
      {/* <div>
        {[...Array(5).toString()].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label id="star-id">
              <FaStar
                onSubmit={handleSubmit}
                size={40}
                onClick={handleInputChange}
                onClick={() => setNewReview(ratingValue)}
                name="rating"
                value={ratingValue.toString()}
                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              />
            </label>
          );
        })}
      </div> */}

      <h3 id="review-header">Add a review for this story</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select name="rating" onChange={handleInputChange} value={newReview.rating}>
            <option value=" "></option>
            <option value="5">★★★★★</option>
            {/* <option value="1.5">1.5 Stars</option> */}
            <option value="4">★★★★ </option>
            {/* <option value="2.5">2.5 Stars </option> */}
            <option value="3">★★★ </option>
            {/* <option value="3.5">3.5 Stars </option> */}
            <option value="2">★★ </option>
            {/* <option value="4.5">4.5 Stars </option> */}
            <option value="1">★ </option>
          </select>
        </label>

        <label>
          <TextField
            id="filled-secondary"
            label="Comments"
            variant="filled"
            color="secondary"
            type="text"
            name="comments"
            onChange={handleInputChange}
            value={newReview.comments}
            fullWidth
          />
          <br />
          {/* <input
            type="text"
            name="comments"
            onChange={handleInputChange}
            value={newReview.comments}
          /> */}
        </label>
        <div>
          <ErrorList errors={errors} />
        </div>

        <div className="button-group">
          <Button size="small" color="primary" variant="contained" type="submit" value="Submit">
            Submit
          </Button>
          {/* <input className="button" type="submit" value="Submit" /> */}
        </div>
      </form>
    </div>
  );
};

export default NewReviewForm;
