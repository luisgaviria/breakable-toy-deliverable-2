import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWith: "100%",
  },
  media: {
    height: 240,
  },
  root: {
    maxWidth: 345,
  },
}));

const StoryTile = (props) => {
  const classes = useStyles();
  const { apiId, title, description, url, urlToImage, author } = props.storyData;

  return (
    // <Card className={classes.root}>
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}
    //       height="140"
    //       image={
    //         urlToImage ||
    //         "https://cdn.shortpixel.ai/client/to_avif,q_glossy,ret_img,w_400,h_264/https://cannabisbydesignphysicians.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
    //       }
    //     />
    //   </CardActionArea>
    // </Card>

    <div className="tile-container">
      <div className="story-info-cell" id="story-tile">
        <img
          className="tile-image"
          src={
            urlToImage ||
            "https://cdn.shortpixel.ai/client/to_avif,q_glossy,ret_img,w_400,h_264/https://cannabisbydesignphysicians.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
          }
        />
        <Link to={`/stories/${apiId}`}>
          <h3 id="tile-title">{title}</h3>
        </Link>
        {/*
          <a target="_blank" href={url}>
            <h3 id="tile-title">{title}</h3>
          </a> */}

        <h5 className="story-description"> {description} </h5>
      </div>
    </div>
  );
};

export default StoryTile;
