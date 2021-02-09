import React from "react";
import { Link } from "react-router-dom";

const StoryTile = (props) => {
  const { id, title, description, url, urlToImage, author } = props.storyData;
  return (
    <div className="tile-container">
      <div>
        <div className="story-info-cell" id="story-tile">
          <Link to={`${url}`}></Link>
          <img className="tile-image" src={urlToImage} />

          <a target="_blank" href={url}>
            <h3 id="tile-title">{title}</h3>
          </a>

          <h5 className="story-description"> {description} </h5>
          <h5 className="story-author">{author}</h5>
        </div>
      </div>
    </div>
  );
};

export default StoryTile;
