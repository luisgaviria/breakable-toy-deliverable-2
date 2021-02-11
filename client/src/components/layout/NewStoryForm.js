import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import translateServerErrors from "../../services/translateServerErrors.js";
import FormError from "./FormError.js";

const NewStoryForm = (props) => {
  const [newStory, setNewStory] = useState({
    author: "",
    title: "",
    description: "",
    urlToImage: "",
    rating: "",
  });

  const [errors, setErrors] = useState([]);
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
    clearForm();
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
    return <Redirect to="/stories" />;
  }

  return (
    <div className="callout" id="story-form-id">
      <h1>Add your own story to this Page</h1>
      <form className="mb" onSubmit={handleSubmit}>
        <div className="row">
          <label className="medium-6 columns">
            Author:
            <input
              type="text"
              name="author"
              placeholder="Author"
              onChange={handleInputChange}
              value={newStory.author}
            />
            <FormError error={errors.author} />
          </label>

          <label className="medium-6 columns">
            Title:
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={handleInputChange}
              value={newStory.title}
            />
            <FormError error={errors.content} />
          </label>
        </div>
        <label className="medium-6 columns">
          Description:
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
            value={newStory.description}
          />
        </label>

        <label>
          Rating:
          <select name="rating" onChange={handleInputChange} value={newStory.rating}>
            <option value=" "></option>
            <option value="1">1 Star</option>
            <option value="1.5">1.5 Stars</option>
            <option value="2">2 Stars </option>
            <option value="2.5">2.5 Stars </option>
            <option value="3">3 Stars </option>
            <option value="3.5">3.5 Stars </option>
            <option value="4">4 Stars </option>
            <option value="4.5">4.5 Stars </option>
            <option value="5">5 Stars </option>
          </select>
          <FormError error={errors.rating} />
        </label>

        <label>
          Picture:
          <input
            type="text"
            name="urlToImage"
            placeholder="Please enter complete URL"
            onChange={handleInputChange}
            value={newStory.urlToImage}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewStoryForm;
