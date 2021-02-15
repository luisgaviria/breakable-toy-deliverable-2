import express from "express";

import newsApiClient from "../../../apiClient/newsApiClient.js";
import Story from "../../../models/Story.js";

const newsApiRouter = new express.Router();

newsApiRouter.get("/", (req, res) => {
  newsApiClient.getNewsData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      data.map(async (story) => {
        const storyTemp = await Story.query().findOne({ apiId: story.apiId });
        if (storyTemp) {
          return;
        } else {
          delete story.source;
          if (story.description === null) {
            story.description = "This field does not exits.";
          }
          story.userId = 2;
          await Story.query().insertAndFetch(story);
        }
      });
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

newsApiRouter.get("/science", (req, res) => {
  newsApiClient.getScienceData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      data.map(async (story) => {
        const storyTemp = await Story.query().findOne({ apiId: story.apiId });
        if (storyTemp) {
          return;
        } else {
          delete story.source;
          if (story.description === null) {
            story.description = "This field does not exits.";
          }
          story.userId = 2;
          await Story.query().insertAndFetch(story);
        }
      });
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

newsApiRouter.get("/sports", (req, res) => {
  newsApiClient.getSportsData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      data.map(async (story) => {
        const storyTemp = await Story.query().findOne({ apiId: story.apiId });
        if (storyTemp) {
          return;
        } else {
          delete story.source;
          if (story.description === null) {
            story.description = "This field does not exits.";
          }
          story.userId = 2;
          await Story.query().insertAndFetch(story);
        }
      });
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

newsApiRouter.get("/technology", (req, res) => {
  newsApiClient.getTechData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      data.map(async (story) => {
        const storyTemp = await Story.query().findOne({ apiId: story.apiId });
        if (storyTemp) {
          return;
        } else {
          delete story.source;
          if (story.description === null) {
            story.description = "This field does not exits.";
          }
          story.userId = 2;
          await Story.query().insertAndFetch(story);
        }
      });
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default newsApiRouter;
