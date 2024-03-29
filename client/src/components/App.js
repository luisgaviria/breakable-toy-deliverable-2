import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";

// import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import TopBar from "./layout/TopBar";
import StoryList from "../components/layout/StoryList.js";
import StoryShow from "./layout/StoryShow.js";
// import NewStoryForm from "./layout/NewStoryForm.js";
import ScienceList from "./layout/ScienceList.js";
import SportsList from "./layout/SportsList.js";
import TechList from "./layout/TechList.js";
// import PostedStories from "./layout/PostedStories.js";
import HomePage from "./layout/HomePage.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <HomePage user={currentUser} />
        </Route>
        <Route exact path="/stories">
          <StoryList user={currentUser} />
        </Route>
        <Route exact path="/science">
          <ScienceList user={currentUser} />
        </Route>
        <Route exact path="/sports">
          <SportsList user={currentUser} />
        </Route>
        <Route exact path="/technology">
          <TechList user={currentUser} />
        </Route>
        {/* <Route exact path="/stories/all">
          <PostedStories user={currentUser} />
        </Route> */}
        {/* <AuthenticatedRoute exact path="/stories/new" component={NewStoryForm} user={currentUser} /> */}
        <Route exact path="/stories/:id">
          <StoryShow user={currentUser} />
        </Route>
        {/* <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} /> */}
      </Switch>
    </Router>
  );
};

export default hot(App);
