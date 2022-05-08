import React from "react";
import YouTube from "react-youtube";

interface IProps {
  source: string;
  autoplay: boolean;
}

function VideoComponent({ source, autoplay }: IProps) {
  return (
    <div>
      <YouTube
        videoId={source}
        opts={{
          playerVars: {
            autoplay,
          },
        }}
      />
    </div>
  );
}

export default VideoComponent;
