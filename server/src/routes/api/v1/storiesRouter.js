import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import { Story } from "../../../models/index.js";
import StorySerializer from "../../serializer/StorySerializer.js";
import storyReviewsRouter from "./storyReviewsRouter.js";

const storiesRouter = new express.Router();

storiesRouter.use("/:storyId/reviews", storyReviewsRouter);

storiesRouter.get("/", async (req, res) => {
  try {
    const stories = await Story.query();
    const serializedStories = [];
    for (const story of stories) {
      const serializedStory = await StorySerializer.showData(story);
      serializedStories.push(serializedStory);
    }
    return res.status(200).json({ stories: serializedStories });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

storiesRouter.get("/:id", async (req, res) => {
  const storyId = req.params.id;
  debugger;
  console.log(req.params, "hello form the back end");
  try {
    const story = await Story.query().findById(storyId);
    debugger;
    const serializedStory = await StorySerializer.showDetails(story);
    debugger;
    return res.status(200).json({ story: serializedStory });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ errors: error });
  }
});

storiesRouter.post("/NewsApi", async (req, res) => {
  let storiesToSendBack = [];
  try {
    const allTheStories = req.body;
    for (const singleStoryData of allTheStories) {
      const currentStory = await Story.query().findOne({ title: singleStoryData.title });
      if (!currentStory) {
        const newStory = await Story.query().insertAndFetch(singleStoryData);
        const serializedStory = await StorySerializer.showData(newStory);
        storiesToSendBack.push(serializedStory);
      }
    }
    return res.status(201).json({ stories: storiesToSendBack });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default storiesRouter;
