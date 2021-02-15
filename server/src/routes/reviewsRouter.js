// import express from "express";
// import objection from "objection";

// import { Review } from "../models/Review.js";
// import StorySerializer from "../routes/serializer/StorySerializer.js";

// const reviewsRouter = new express.Router();

// reviewsRouter.delete("/:reviewId", async (req, res) => {
//   try {
//     const reviewId = req.params.reviewId;
//     const review = await Review.query().findById(reviewId);
//     const story = await review.$relateQuery("story");
//     await Review.query().deleteById(reviewId);
//     const serializedStory = await StorySerializer.showDetails(story);
//     return res.status(200).json({
//       reviews: serializedStory.reviews,
//       averageRating: serializedStory.averageRating,
//     });
//   } catch (error) {
//     return res.status(500).json({ errors: error });
//   }
// });

// reviewsRouter.patch("/:reviewId", async (req, res) => {
//   try {
//     const reviewId = req.params.reviewId;
//     const comments = req.body.comments;
//     const rating = req.body.rating;
//     await Review.query().patch({ comments: comments }).findById(reviewId);
//     const review = await Review.query().patchAndFetchById(reviewId, { rating: rating });
//     const story = await review.$relateQuery("story");
//     const serializedStory = await StorySerializer.showDetails(story);
//     return res.status(201).json({ story: serializedStory });
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       return res.status(422).json({ errors: error.data });
//     }
//     return res.status(500).json({ errors: error });
//   }
// });

// export default reviewsRouter;
