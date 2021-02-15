import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { TopbarData } from "./TopbarData.js";

const TopBar = ({ user }) => {
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sideBar);

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
          {/* <div className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} />
          </div> */}

          <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">
              {/* <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li> */}
              {/* {TopbarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })} */}
            </ul>
          </nav>
          <div className="menu">
            <ul className="menu" id="ul-top-bar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/stories">Colombia</Link>
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
                <Link to="/stories/all">Posted News</Link>
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
