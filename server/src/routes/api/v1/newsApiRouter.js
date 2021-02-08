import express from "express";

import newsApiClient from "../../../apiClient/newsApiClient.js";

const newsApiRouter = new express.Router();

newsApiRouter.get("/", (req, res) => {
  newsApiClient.getNewsData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      const parsedResponse = JSON.parse(data);
      res.set({ "Content-Type": "application/json" }).status(200).json(parsedResponse);
    }
  });
});

export default newsApiRouter;
