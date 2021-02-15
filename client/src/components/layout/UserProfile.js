import React from "react";
import { Link } from "react-router-dom";

const UserProfile = (props) => {
  let userName = "";
  if (props.user !== undefined && props.user !== null) {
    userName += props.user.email;
  }
  return (
    <div className="callout small-10 small-centered columns" id="user-profile-card">
      <h1 className="centered-text">Profile: {userName}</h1>
      <div>
        <Link to="/stories/new" className="add-new-story">
          Contribute a local story!
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
