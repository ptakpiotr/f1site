import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { ForumItem } from "../Types";

function ForumItemIt({
  author,
  content,
  dislikes,
  id,
  likes,
  conn,
}: ForumItem & { conn: HubConnection }) {
  return (
    <div className="forum-item">
      <b>{author}</b>
      <p> {content} </p>
      <p className="forum-like-area">
        <AiFillLike
          onClick={async () => {
            if (conn.state === HubConnectionState.Connected) {
              await conn.invoke("TweakForum", id, "0");
            }
          }}
        />
        {likes}
        <AiFillDislike
          onClick={async () => {
            if (conn.state === HubConnectionState.Connected) {
              await conn.invoke("TweakForum", id, "1");
            }
          }}
        />
        {dislikes}
      </p>
    </div>
  );
}

export default ForumItemIt;
