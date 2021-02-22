import express from "express";

import youtubeApiClient from "../../../apiClient/youtubeApiClient.js";

const youtubeApiRouter = new express.Router();

youtubeApiRouter.get("/", (req, res) => {
  youtubeApiClient.getYoutubeVideosData().then((data) => {
    if (data.error) {
      console.log(`Error from Youtube: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default youtubeApiRouter;
