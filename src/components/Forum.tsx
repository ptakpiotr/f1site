import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import AddForum from "./AddForum";
import { ForumItem } from "../Types";
import ForumItemIt from "./ForumItem";

function Forum() {
  const [conn, setConn] = useState<HubConnection>();
  const [forumItems, setForumItems] = useState<ForumItem[]>([]);

  useEffect(() => {
    let conn = new HubConnectionBuilder()
      .withUrl("https://f1sitebackend.azurewebsites.net/main", {
        accessTokenFactory: () => sessionStorage.getItem("token") as string,
      })
      .withAutomaticReconnect()
      .build();
    setConn(conn);

    conn?.on("AddForumItemSuccess", (dt) => {
      setForumItems((ft) => [JSON.parse(dt), ...ft]);
    });

    conn?.on("AddForumItemFailure", (dt) => {
      alert("Forum item couldn't be added!");
    });

    conn?.on("TweakedForum", (dt) => {
      let fm: ForumItem = JSON.parse(dt);
      setForumItems([...forumItems.filter((c) => c.id !== fm.id), fm]);
    });

    conn?.on("AllForumItems", (dt) => {
      setForumItems(JSON.parse(dt));
    });

    conn?.start().then(() => {
      setTimeout(() => {
        conn?.invoke("GetAllForumItems");
      }, 100);
    });
  }, []);

  return (
    <main>
      <div className="spec-div forum-div">Forum</div>
      <AddForum conn={conn as HubConnection} />
      {forumItems.map((fi) => {
        return <ForumItemIt key={fi.id} {...fi} conn={conn as HubConnection} />;
      })}
    </main>
  );
}

export default Forum;
