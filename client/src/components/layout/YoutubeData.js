import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Carousel from "react-bootstrap/Carousel";
// import AOS from "aos";
// import "aos/dist/aos.css";

const YoutubeData = (props) => {
  let videosItem = null;
  if (props.current) {
    videosItem = props.current.map((item) => {
      const url = `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`;
      return (
        <div className="video-wrapper">
          <ReactPlayer className="d-flex" key={item.id} url={url} muted={false} playing={false} />
        </div>
      );
    });
  } else {
    return null;
  }

  // useEffect(() => {
  //   AOS.init();
  //   AOS.refresh();
  // }, []);

  return (
    <>
      <Carousel>
        {videosItem.map((video) => {
          return <Carousel.Item key={video.props.children.key}>{video}</Carousel.Item>;
        })}
      </Carousel>
    </>
  );
};

export default YoutubeData;
