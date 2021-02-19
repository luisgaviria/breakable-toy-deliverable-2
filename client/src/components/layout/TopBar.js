import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in" className="button" id="sign-out">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up" className="button" id="sign-out">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out" className="button" id="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="navbar">
      <div className="top-bar" id="top-id">
        <div className="top-bar-left">
          {/* <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">

            </ul>
          </nav> */}
          <div className="menu">
            <ul className="menu" id="ul-top-bar">
              <li>
                <Link to="/">Home</Link>
                {/* <Link href="/" component="button" variant="body2">
                  Home
                </Link> */}
              </li>
              <li>
                <Link to="/stories">Main Headlines</Link>
              </li>
              <li>
                <Link to="/science">Science</Link>
              </li>
              <li>
                <Link to="/sports">Sports</Link>
              </li>
              <li>
                <Link to="/technology">Technology</Link>
              </li>
              <li>
                <Link to="/stories/new">Add your own story</Link>
              </li>
              <li>
                <Link to="/stories/all">All the News</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="top-bar-right">
          <ul className="menu" id="ul-top-bar">
            {user ? authenticatedListItems : unauthenticatedListItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
