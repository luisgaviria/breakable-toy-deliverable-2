import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("https://i.postimg.cc/VvDMszs6/PHOTO-2021-02-11-14-19-04.jpg")`,
    height: "1000px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
  root: {
    "& > *": {
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
      width: "25ch",
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      {/* <Box className={classes.hero}></Box> */}
      <img id="logo-home" src="https://i.postimg.cc/kG2pxwLT/imageedit-17-5936691456.png" />
      <h1 className="title-uraba">Urabá Television</h1>
      <div id="form-id">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
        {/* <div id="youtube-id">
          <ReactPlayer url="https://www.youtube.com/watch?v=s4KunkGyWvU&ab_channel=URABATELEVISION" />
        </div> */}
      </div>

      {/* <p id="home-main-div">Hello there</p>
      <div id="headline">
        <img
          src="https://ak.picdn.net/shutterstock/videos/6137654/thumb/1.jpg"
          id="main-picture"
        ></img>
      </div>
      

      <img
        src="https://codata.org/wp-content/uploads/2020/10/if_open-science.png"
        id="science-picture"
      ></img>
      <img src="https://oaklandtech.com/staff/files/2016/09/sports.jpg" id="sports-picture"></img> */}
    </div>
  );
};

export default HomePage;
