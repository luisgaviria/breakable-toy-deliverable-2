import React from "react";
import { Link } from "react-router-dom";

const StoryTile = (props) => {
  const { id, title, description, url, urlToImage } = props.storyData;
  return (
    <div className="tile-container">
      <div>
        <div className="story-info-cell">
          <h3>{title}</h3>
          <img className="tile-image" src={urlToImage} />
          <h4>{url}</h4>
          <h5 className="park-show-location"> {description} </h5>
        </div>
      </div>
    </div>
  );
};

export default StoryTile;
