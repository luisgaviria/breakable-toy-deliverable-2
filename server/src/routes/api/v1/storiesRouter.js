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
    const stories = await Story.query().orderBy("publishedAt", "desc").limit("20");
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
  try {
    const story = await Story.query().findOne({ apiId: storyId });
    return res.status(200).json({ story: story });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

storiesRouter.post("/NewsApi", async (req, res) => {
  let storiesToSendBack = [];
  try {
    const allTheStories = req.body;
    for (const singleStoryData of allTheStories) {
      const currentStory = await Story.query().findOne({ title: singleStoryData.title });
      delete singleStoryData.source;
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

storiesRouter.post("/", async (req, res) => {
  const user = req.user.id;
  const storyData = {
    title: req.body.title.toString(),
    description: req.body.description.toString(),
    userId: user,
    urlToImage: req.body.urlToImage ? req.body.urlToImage : null,
    author: req.body.author ? req.body.author : null,
    rating: req.body.rating ? req.body.rating : null,
    apiId: new Date(),
  };
  try {
    const newStory = await Story.query().insertAndFetch(storyData);
    const serializedStory = await StorySerializer.showData(newStory);
    return res.status(201).json({ story: serializedStory });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }

    return res.status(500).json({ errors: error });
  }
});

export default storiesRouter;
