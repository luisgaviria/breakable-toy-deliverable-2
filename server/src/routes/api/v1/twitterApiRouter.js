// import express from "express";

// import T from "../../../apiClient/twitterApiClient.js";

// const twitterApiRouter = new express.Router();

// twitterApiRouter.get("/", (req, res) => {
//   T.then((data) => {
//     if (data.error) {
//       console.log(`Error from news Api: ${data.error}`);
//     } else {
//       const parsedResponse = JSON.parse(data);
//       res.set({ "Content-Type": "application/json" }).status(200).json(parsedResponse);
//     }
//   });
// });

// export default twitterApiRouter;
