import React from "react";
import { Link } from "react-router-dom";

const StoryTile = (props) => {
  const { apiId, title, description, url, urlToImage, author } = props.storyData;
  return (
    <div id="story-tile">
      <Link to={`/stories/${apiId}`}>
        <img
          className="tile-image"
          src={
            urlToImage ||
            "https://cdn.shortpixel.ai/client/to_avif,q_glossy,ret_img,w_400,h_264/https://cannabisbydesignphysicians.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
          }
        />

        <h3 id="tile-title">{title}</h3>
      </Link>
    </div>
  );
};

export default StoryTile;
