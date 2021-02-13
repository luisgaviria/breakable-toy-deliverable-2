import express from "express";

import newsApiClient from "../../../apiClient/newsApiClient.js";

const newsApiRouter = new express.Router();

newsApiRouter.get("/", (req, res) => {
  newsApiClient.getNewsData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

newsApiRouter.get("/science", (req, res) => {
  newsApiClient.getScienceData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

newsApiRouter.get("/sports", (req, res) => {
  newsApiClient.getSportsData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

newsApiRouter.get("/technology", (req, res) => {
  newsApiClient.getTechData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default newsApiRouter;
