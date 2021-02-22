import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import translateServerErrors from "../../services/translateServerErrors.js";
import FormError from "./FormError.js";
import StoryShow from "./StoryShow.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const NewStoryForm = (props) => {
  const [newStory, setNewStory] = useState({
    author: "",
    title: "",
    description: "",
    urlToImage: "",
    rating: "",
    apiId: "3333333",
    added: false,
  });

  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const postStory = async (newStoryData) => {
    try {
      const response = await fetch(`/api/v1/stories`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),

        body: JSON.stringify(newStoryData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);

          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;

          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        setNewStory({
          author: body.story.author ? body.story.author : "",
          content: body.story.content ? body.story.content : "",
          apiId: body.story.apiId,
          description: body.story.description ? body.story.description : "",
          publishedAt: body.story.publishedAt ? body.story.publishedAt : "",
          rating: body.story.rating ? body.story.rating : "",
          title: body.story.title ? body.story.title : "",
          url: body.story.url ? body.story.url : "",
          added: true,
          urlToImage: body.story.urlToImage ? body.story.urlToImage : "",
        });
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewStory({
      ...newStory,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postStory(newStory);
    if (!errors) {
      clearForm();
    }
  };

  const clearForm = () => {
    setNewStory({
      author: "",
      title: "",
      description: "",
      urlToImage: "",
      rating: "",
    });
  };

  if (shouldRedirect) {
    return <Redirect to="/stories/all" />;
  }

  return (
    <div className="div-form">
      <div className="callout" id="story-form-id">
        <h1 className="story-form-title">Add your own story to this Page</h1>

        <form className="mb" onSubmit={handleSubmit}>
          <div className="row">
            <label className="medium-6 columns">
              Author:
              <TextField
                id="filled-secondary"
                label="Author"
                variant="filled"
                color="secondary"
                type="text"
                name="author"
                placeholder="Author"
                onChange={handleInputChange}
                value={newStory.author}
                fullWidth
              />
              <FormError error={errors.Author} />
            </label>

            <label className="medium-6 columns ">
              Title:
              <TextField
                id="filled-secondary"
                label="Title"
                variant="filled"
                color="secondary"
                type="text"
                name="title"
                onChange={handleInputChange}
                value={newStory.title}
                fullWidth
              />
              <FormError error={errors.Title} />
              {/* <ErrorList errors={errors} /> */}
            </label>
          </div>
          <label className="medium-6 columns ">
            Description:
            <TextField
              id="filled-secondary"
              label="Description"
              variant="filled"
              color="secondary"
              type="text"
              name="description"
              onChange={handleInputChange}
              value={newStory.description}
              fullWidth
            />
            <div>{errors.description}</div>
            <FormError error={errors.Description} />
          </label>

          <label>
            Rating:
            <select
              label="Rating"
              name="rating"
              onChange={handleInputChange}
              value={newStory.rating}
            >
              <option value=" "></option>
              <option value="5">★★★★★</option>
              {/* <option value="1.5">1.5 Stars</option> */}
              <option value="4">★★★★ </option>
              {/* <option value="2.5">2.5 Stars </option> */}
              <option value="3">★★★ </option>
              {/* <option value="3.5">3.5 Stars </option> */}
              <option value="2">★★ </option>
              {/* <option value="4.5">4.5 Stars </option> */}
              <option value="1">★ </option>
            </select>
            <FormError error={errors.Rating} />
          </label>

          <label>
            Picture:
            <TextField
              id="filled-secondary"
              label="Please enter complete URL"
              variant="filled"
              color="secondary"
              type="text"
              name="urlToImage"
              onChange={handleInputChange}
              value={newStory.urlToImage}
              fullWidth
            />
            <FormError error={errors.UrlToImage} />
          </label>

          <div>
            <Button size="small" color="primary" variant="contained" type="submit" value="Submit">
              Submit
            </Button>
          </div>
        </form>
        {newStory.added ? <StoryShow storyData={newStory} /> : null}
      </div>
    </div>
  );
};

export default NewStoryForm;
