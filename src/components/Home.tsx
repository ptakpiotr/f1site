import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { INews } from "../Types";

import Card from "./Card";
import VideoComponent from "./VideoComponent";

interface IVideo {
  source: string;
  autoplay: boolean;
}

function Home() {
  const [allNews, setAllNews] = useState<INews[]>([]);

  const [videoObjects, setVideoObjects] = useState<IVideo[]>([
    {
      source: "tUU-I4P00AA",
      autoplay: true,
    },
    {
      source: "OC23guXpTvY",
      autoplay: false,
    },
    {
      source: "ZxOeq_mSedQ",
      autoplay: false,
    },
  ]);

  useEffect(() => {
    axios
      .get("https://f1sitebackend.azurewebsites.net/api/News")
      .then((dt: AxiosResponse) => {
        setAllNews(dt.data);
      });
  }, []);
  return (
    <main>
      <div className="spec-div home-div">F1 FanSite</div>
      <hr />
      <div className="row">
        {allNews.map((news) => {
          return <Card key={`news_${news.id}`} {...news} />;
        })}
      </div>
      <hr />

      <p className="text-center">Watch Formula 1 Videos:</p>
      <div className="row mb-4">
        {videoObjects.map((vo) => (
          <div
            className={`col-md-${12 / videoObjects.length} mt-2`}
            key={vo.source}
          >
            <VideoComponent {...vo} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
