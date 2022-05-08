import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiOutlineComment,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import { IComment, INews } from "../../Types";
import AddComment from "../AddComment";
import Comment from "../Comment";

interface IQuery {
  id: string;
}

function Post() {
  const { id } = useParams<IQuery>();
  const { state } = useContext(GlobalContext);
  const [conn, setConn] = useState<HubConnection>();
  const [newsData, setNewsData] = useState<INews>();
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    axios
      .get(`https://f1sitebackend.azurewebsites.net/api/News/${id}`)
      .then((data: AxiosResponse) => {
        setNewsData(data.data);
      })
      .catch((err) => {
        window.history.back();
      });

    const connection = new HubConnectionBuilder()
      .withUrl("https://f1sitebackend.azurewebsites.net/comment", {
        accessTokenFactory: () => sessionStorage.getItem("token") as string,
      })
      .withAutomaticReconnect()
      .build();

    connection.on("NewComment", (dt) => {
      setComments((cm) => [JSON.parse(dt), ...cm]);
    });

    connection.on("AllComments", (dt) => {
      setComments(JSON.parse(dt));
    });

    connection.on("UpdatedComment", (dt) => {
      let cm: IComment = JSON.parse(dt);
      setComments([...comments.filter((c) => c.Id !== cm.Id), cm]);
    });

    connection
      .start()
      .then()
      .catch((err) => console.error(err));

    setTimeout(() => {
      if (connection.state === HubConnectionState.Connected) {
        connection
          .invoke("Get", id.toString())
          .then((resp) => {})
          .catch((err) => {
            console.error(err);
          });
      }
    }, 1000);

    setConn(connection);
  }, []);
  return (
    <main className="post-main">
      <div className="post-title">{newsData?.title}</div>
      <div
        className="post-header"
        style={{
          backgroundImage: `url(${newsData?.imageUrl})`,
        }}
      ></div>
      <div className="post-social row">
        <div className="col-3">Social:</div>
        <div className="col-3">
          <AiFillFacebook
            onClick={() => {
              let url: string = window.location.href;
              window.open(
                "http://facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(url),
                "",
                "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
              );
            }}
          />
        </div>
        <div className="col-3">
          <AiFillTwitterSquare
            onClick={() => {
              let url: string = window.location.href;
              let text: string = "<<TITLE-PLACEHOLDER>>";
              window.open(
                "http://twitter.com/share?url=" +
                  encodeURIComponent(url) +
                  "&text=" +
                  encodeURIComponent(text),
                "",
                "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
              );
            }}
          />
        </div>
        <div className="col-3">
          <AiOutlineComment
            onClick={() => {
              if (!window.location.href.includes("#post-")) {
                window.location.href += "#post-comments";
              }
            }}
          />
        </div>
      </div>
      <div className="post-desc">{newsData?.description}</div>
      <p className="post-content">{newsData?.content}</p>
      {localStorage.getItem("email") ? (
        <div id="post-comments">
          <AddComment conn={conn as HubConnection} newsId={parseInt(id)} />
          {comments.map((c) => {
            return <Comment {...c} key={c.Id} conn={conn as HubConnection} />;
          })}
        </div>
      ) : (
        <div className="text-center mb-2">
          Log in order to add and access comments
        </div>
      )}
    </main>
  );
}

export default Post;
