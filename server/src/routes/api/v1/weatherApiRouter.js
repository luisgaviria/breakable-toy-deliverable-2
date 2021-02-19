import express from "express";

import weatherApi from "../../../apiClient/weatherApi.js";

const weatherApiRouter = new express.Router();

weatherApiRouter.get("/", (req, res) => {
  weatherApi.getWeatherData().then((data) => {
    if (data.error) {
      console.log(`Error from weather Api: ${data.error}`);
    } else {
      res.set({ "Content-Type": "application/json" }).status(200).json(data);
    }
  });
});

export default weatherApiRouter;
