import React, { useRef } from "react";
import { INews } from "../../Types";

import "./index.css";

function Card({ id, imageUrl, title }: INews) {
  const pElem = useRef<HTMLParagraphElement>(null);

  return (
    <div
      className="home-card"
      style={{
        width: "300px",
        backgroundImage: `url(${imageUrl})`,
      }}
      onMouseEnter={() => {
        let paragraph: HTMLParagraphElement =
          pElem.current as HTMLParagraphElement;
        paragraph.style.display = "block";
      }}
      onMouseLeave={() => {
        let paragraph: HTMLParagraphElement =
          pElem.current as HTMLParagraphElement;
        paragraph.style.display = "none";
      }}
    >
      <div className="home-desc" ref={pElem}>
        <a href={`/post/${id}`} target="_blank" rel="noreferrer">
          {title}
        </a>
      </div>
    </div>
  );
}

export default Card;
