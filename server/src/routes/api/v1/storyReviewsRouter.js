import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import { Park, Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import StorySerializer from "../../serializer/StorySerializer.js";
import ReviewSerializer from "../../serializer/ReviewSerializer.js";

const storyReviewsRouter = new express.Router({ mergeParams: true });

storyReviewsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { rating, comments } = formInput;
  const storyId = req.params.storyId;
  const userId = req.user.id;
});
