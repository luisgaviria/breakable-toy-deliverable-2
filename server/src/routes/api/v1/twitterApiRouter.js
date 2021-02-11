import express from "express";

import twitterClient from "../../../apiClient/twitterApiClientWrapper.js";

const twitterApiRouter = new express.Router();

twitterApiRouter.get("/", async (req, res) => {
  try {
    await twitterClient.accountsAndUsers.usersSearch({ q: "twitterDev" });
  } catch (error) {
    console.log(error);
  }

  twitterClient.usersSearch({ q: "twitterDev" }).then((data) => {
    if (data.error) {
      console.log(`Error from news Api: ${data.error}`);
    } else {
      const parsedResponse = JSON.parse(data);

      res.set({ "Content-Type": "application/json" }).status(200).json(parsedResponse);
    }
  });
});

export default twitterApiRouter;
