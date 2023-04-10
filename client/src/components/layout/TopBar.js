import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, NavDropdown, Button } from "react-bootstrap";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    // <Button variant="outline-secondary" className="sign-in">
    //   <Link to="/user-sessions/new">Sign In</Link>
    // </Button>,
    // // <li key="sign-in" className="button" id="sign-out">
    // //   <Link to="/user-sessions/new">Sign In</Link>
    // // </li>,
    // // <li key="sign-up" className="button" id="sign-out">
    // //   <Link to="/users/new" className="button">
    // //     Sign Up
    // //   </Link>
    // // </li>,
    // <Button className="sign-up" variant="outline-secondary">
    //   <Link to="/users/new">Sign Up</Link>
    // </Button>,
  ];

  const authenticatedListItems = [
    <>
      <SignOutButton />
    </>,
  ];

  return (
    <header>
      <Navbar className="navbar" collapseOnSelect expand="md" bg="light" variant="light" >
        <Navbar.Brand>
          <a href="http://www.urabatv.com" className="navbar-brand">
            <img
              width="80"
              height="30"
              className="d-inline-block align-top"
              src="https://i.postimg.cc/0QdqK3p7/Screen-Shot-2021-03-10-at-10-52.png"
              alt="Urabatv logo"
            ></img>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" bg="light" expand="lg" variant="light"/>
        <Navbar.Collapse bg="light" expand="lg" variant="light" id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/">
                Home
              </Link>
            </Nav.Link>  */}
            <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/stories">
                Historias principales
              </Link>
            </Nav.Link>
            <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/science">
                Sciencia
              </Link>
            </Nav.Link>
            <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/technology">
                Tecnologia
              </Link>
            </Nav.Link>
            {/* <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/stories/new">
                Agrega tu propia historia
              </Link>
            </Nav.Link> */}
            {/* <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/stories/all">
                Todas las noticias
              </Link>
            </Nav.Link> */}
          </Nav>

          <Nav.Link className="ml-auto">
            {user ? authenticatedListItems : unauthenticatedListItems}
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>

    // <div className="navbar">
    //   <div className="top-bar" id="top-id">
    //     <div className="top-bar-left">
    //       <div className="menu">
    //         <ul className="menu" id="ul-top-bar">
    //           <li>
    //             <Link to="/">Home</Link>
    //           </li>
    //           <li>
    //             <Link to="/stories">Main Headlines</Link>
    //           </li>
    //           <li>
    //             <Link to="/science">Science</Link>
    //           </li>
    //           <li>
    //             <Link to="/sports">Sports</Link>
    //           </li>
    //           <li>
    //             <Link to="/technology">Technology</Link>
    //           </li>
    //           <li>
    //             <Link to="/stories/new">Add your own story</Link>
    //           </li>
    //           <li>
    //             <Link to="/stories/all">All the News</Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="top-bar-right">
    //       <ul className="menu" id="ul-top-bar">
    //         {user ? authenticatedListItems : unauthenticatedListItems}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TopBar;
