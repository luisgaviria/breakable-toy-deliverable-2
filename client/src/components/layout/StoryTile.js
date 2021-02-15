import React from "react";
import { Link } from "react-router-dom";

const StoryTile = (props) => {
  const { apiId, title, description, url, urlToImage, author } = props.storyData;

  return (
    <div className="tile-container">
      <div className="story-info-cell" id="story-tile">
        <img className="tile-image" src={urlToImage} />
        <Link to={`/stories/${apiId}`}>
          <h3 id="tile-title">{title}</h3>
        </Link>

        {/* 
          <a target="_blank" href={url}>
            <h3 id="tile-title">{title}</h3>
          </a> */}

        <h5 className="story-description"> {description} </h5>
        {/* <h5 className="story-author">{author}</h5> */}
      </div>
    </div>
  );
};

export default StoryTile;
