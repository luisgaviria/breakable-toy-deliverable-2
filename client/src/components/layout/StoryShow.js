import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";

const StoryShow = (props) => {
  const [errors, setErrors] = useState({});
  const [story, setStory] = useState({});
};
