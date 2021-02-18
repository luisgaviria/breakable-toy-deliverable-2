import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

// import Link from "@material-ui/core/Link";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import { fade, makeStyles } from "@material-ui/core/styles";

// import SearchIcon from "@material-ui/icons/Search";

const TopBar = ({ user }) => {
  // const classes = useStyles();

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
    // <div className={classes.root}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         edge="start"
    //         className={classes.menuButton}
    //         color="inherit"
    //         aria-label="open drawer"
    //       ></IconButton>
    //       <Typography className={classes.title} variant="h6" noWrap>
    //         Material-UI
    //       </Typography>
    //       <div className={classes.search}>
    //         <div className={classes.searchIcon}></div>
    //         <InputBase
    //           placeholder="Search…"
    //           classes={{
    //             root: classes.inputRoot,
    //             input: classes.inputInput,
    //           }}
    //           inputProps={{ "aria-label": "search" }}
    //         />
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    // </div>

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
