import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import Review from "../../../models/Review.js";

const reviewsRouter = new express.Router();

reviewsRouter.delete("/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.query().findById(reviewId);
    const story = await review.$relatedQuery("story");
    await Review.query().deleteById(review.id);
    return res.status(200).json({
      reviews: story,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

reviewsRouter.patch("/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const comments = req.body.comments;
    const rating = parseFloat(req.body.rating);
    await Review.query().patch({ comments: comments }).findById(reviewId);
    const review = await Review.query()
      .patch({ comments: comments, rating: rating })
      .where("id", "=", reviewId);

    return res.status(201).json({ review: review });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default reviewsRouter;
