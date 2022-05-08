import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { IComment } from "../Types";

function Comment({
  NewsId,
  Id,
  Content,
  Likes,
  Dislikes,
  DateOfCreation,
  conn,
}: IComment & { conn: HubConnection }) {
  return (
    <div className="comment">
      <div className="row">
        <div className="col-9">{Content}</div>
        <div className="col-3 row">
          <div
            className="col-6"
            onClick={async () => {
              if (conn.state === HubConnectionState.Connected) {
                await conn.invoke("Tweak", Id, "0");
              }
            }}
          >
            <AiFillLike /> {Likes}
          </div>
          <div className="col-6">
            <AiFillDislike
              onClick={async () => {
                if (conn.state === HubConnectionState.Connected) {
                  await conn.invoke("Tweak", Id, "1");
                }
              }}
            />{" "}
            {Dislikes}
          </div>
        </div>
      </div>
      by NAME at {new Date(DateOfCreation).toUTCString()}
    </div>
  );
}

export default Comment;
