import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import storiesRouter from "./api/v1/storiesRouter.js";
import newsApiRouter from "./api/v1/newsApiRouter.js";
import reviewsRouter from "./api/v1/reviewsRouter.js";
import weatherApiRouter from "./api/v1/weatherApiRouter.js";
// import mediaStackRouter from "./api/v1/mediaStackRouter.js";
// import twitterApiRouter from "./api/v1/twitterApiRouter.js";
// import techApiRouter from "./api/v1/techApiRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/api/v1/NewsApi", newsApiRouter);
rootRouter.use("/api/v1/stories", storiesRouter);
rootRouter.use("/api/v1/reviews", reviewsRouter);
rootRouter.use("/api/v1/weatherApi", weatherApiRouter);
// rootRouter.use("/api/v1/tweets", twitterApiRouter);

export default rootRouter;
