import React from "react";
import { Link } from "react-router-dom";

const StoryTile = (props) => {
  const { apiId, title, description, url, urlToImage, author } = props.storyData;
  // if (urlToImage === null) {
  //   urlToImage =
  //     "https://cdn.shortpixel.ai/client/to_avif,q_glossy,ret_img,w_400,h_264/https://cannabisbydesignphysicians.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png";
  // }

  return (
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
