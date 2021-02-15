import express from "express";

import mediaStackClient from "../../../apiClient/mediaStackClient.js";

const mediaStackRouter = new express.Router();

mediaStackRouter.get("/", (req, res) => {
  mediaStackClient.getStackData().then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      const parsedResponse = JSON.parse(data);
      debugger;
      res.set({ "Content-Type": "application/json" }).status(200).json(parsedResponse);
    }
  });
});

export default mediaStackRouter;
