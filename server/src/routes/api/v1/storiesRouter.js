import express from "express";
import objection from "objection";
const { ValidationError } = objection;

const storiesRouter = new express.Router();

storiesRouter.get("/", async (req, res) => {
  try {
    const stories = await Story.query();
    debugger;
    return res.status(200).json({ stories: stories });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default storiesRouter;
