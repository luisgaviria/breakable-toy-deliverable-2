import React from "react";
import { Link } from "react-router-dom";

const StoryTile = (props) => {
  const { apiId, title, description, url, urlToImage, author } = props.storyData;
  // debugger;

  // let id;

  // if(props.storyData.id) {
  //   id =
  // }
  // let id = url.split("-").pop();

  return (
    <div className="tile-container">
      <div>
        <div className="story-info-cell" id="story-tile">
          <Link to={`/stories/${apiId}`}>
            <img className="tile-image" src={urlToImage} />
            <h3 id="tile-title">{title}</h3>
          </Link>

          {/* <a target="_blank" href={url}>
            <h3 id="tile-title">{title}</h3>
          </a> */}

          <h5 className="story-description"> {description} </h5>
          {/* <h5 className="story-author">{author}</h5> */}
        </div>
      </div>
    </div>
  );
};

export default StoryTile;
