import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import storiesRouter from "./api/v1/storiesRouter.js";
import newsApiRouter from "./api/v1/newsApiRouter.js";
import reviewsRouter from "./api/v1/reviewsRouter.js";
import weatherApiRouter from "./api/v1/weatherApiRouter.js";
import youtubeApiRouter from "./api/v1/youtubeApiRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/NewsApi", newsApiRouter);
rootRouter.use("/api/v1/stories", storiesRouter);
rootRouter.use("/api/v1/reviews", reviewsRouter);
rootRouter.use("/api/v1/weatherApi", weatherApiRouter);
rootRouter.use("/api/v1/youtubeApi", youtubeApiRouter);

export default rootRouter;
