import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../App";

interface IProps {
  conn: HubConnection;
  newsId: number;
}

function AddComment({ conn, newsId }: IProps) {
  const [comment, setComment] = useState<string>("");
  const { state } = useContext(GlobalContext);

  const handleClick = () => {
    if (conn.state === HubConnectionState.Connected) {
      conn
        .invoke(
          "Add",
          JSON.stringify({
            author: state.email,
            content: comment,
            id: newsId,
          })
        )
        .then((resp) => {})
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="row m-2">
      <div className="col-9 mt-2">
        <input
          className="form-control"
          placeholder="Place your comment here"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
      <div className="col-3 mt-2">
        <button className="btn btn-success" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AddComment;
