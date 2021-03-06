import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import { Review, Story } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import StorySerializer from "../../serializer/StorySerializer.js";
import ReviewSerializer from "../../serializer/ReviewSerializer.js";

const storyReviewsRouter = new express.Router({ mergeParams: true });

storyReviewsRouter.get("/:storyId", async (req, res) => {
  try {
    const reviews = await Review.query().where({ storyId: req.params.storyId });

    const serializedReviews = [];
    for (const review of reviews) {
      const serializedReview = await ReviewSerializer.showData(review);
      serializedReviews.push(serializedReview);
    }

    return res.status(200).json({ reviews: serializedReviews });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

storyReviewsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { rating, comments } = formInput;
  const storyId = req.params.storyId;
  const userId = req.user.id;
  const currentStory = await Story.query().findOne({ apiId: storyId });

  try {
    const newReview = await Review.query().insertAndFetch({
      rating,
      comments,
      storyId: currentStory.id,
      userId,
    });

    const serializedReview = await ReviewSerializer.showData(newReview);
    const story = await Story.query().findById(currentStory.id);
    const serializedStory = await StorySerializer.showDetails(story);
    return res.status(201).json({ review: serializedReview, story: serializedStory });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }

    return res.status(500).json({ errors: error });
  }
});

export default storyReviewsRouter;
