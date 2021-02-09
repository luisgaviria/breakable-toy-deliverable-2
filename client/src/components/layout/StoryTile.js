import React from "react";
import { Link } from "react-router-dom";

const StoryTile = (props) => {
  const { id, title, description, url, urlToImage, author } = props.storyData;
  return (
    <div className="tile-container">
      <div>
        <div className="story-info-cell" id="story-tile">
          <h3 id="tile-title">{title}</h3>
          <img className="tile-image" src={urlToImage} />
          <h5 className="story-description"> {description} </h5>
          <h5 className="story-author">{author}</h5>
        </div>
      </div>
    </div>
  );
};

export default StoryTile;
