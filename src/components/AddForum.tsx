import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../App";
import { AddForumItem } from "../Types";

interface IProps {
  conn: HubConnection;
}

function AddForum({ conn }: IProps) {
  const [newForumItem, setNewForumItem] = useState<AddForumItem>();
  const [forum, setForum] = useState<string>("");
  const { state } = useContext(GlobalContext);
  const handleClick = () => {
    if (forum.length > 0 && conn.state === HubConnectionState.Connected) {
      setTimeout(() => {
        setNewForumItem({
          author: state.email,
          content: forum,
        });
      }, 100);

      conn.invoke("AddForumItem", JSON.stringify(newForumItem));
    } else {
      console.log("Invalid input and/or connection state not proper");
    }
  };

  return (
    <div className="row m-2">
      <div className="col-9 mt-2">
        <input
          className="form-control"
          placeholder="Place your quote here"
          value={forum}
          onChange={(e) => {
            setForum(e.target.value);
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

export default AddForum;
