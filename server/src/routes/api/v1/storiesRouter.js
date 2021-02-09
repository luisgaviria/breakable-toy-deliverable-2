import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import Story from "../../../models/Story.js";
import StorySerializer from "../../serializer/StorySerializer.js";

const storiesRouter = new express.Router();

storiesRouter.get("/", async (req, res) => {
  try {
    const stories = await Story.query();
    const serializedStories = [];
    for (const story of stories) {
      const serializedStory = await StorySerializer.showData(story);
      serializedStories.push(serializedStory);
    }
    return res.status(200).json({ stories: stories });
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
