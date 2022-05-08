import React, { useContext, useRef, useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { GlobalContext } from "../App";
import Logout from "./Logout";

interface IItem {
  href: string;
  desc: string;
}

function MobileMenu() {
  const { state } = useContext(GlobalContext);

  const menuMobile = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<IItem[]>([
    {
      href: "/",
      desc: "Home",
    },
    {
      href: "/login",
      desc: "Login",
    },
    {
      href: "/forum",
      desc: "Forum",
    },
    {
      href: "/standings",
      desc: "Standings",
    },
    {
      href: "/about",
      desc: "About",
    },
  ]);
  return (
    <header>
      <div className="menu-mobile" ref={menuMobile}>
        <button
          onClick={() => {
            let elem: HTMLDivElement = menuMobile.current as HTMLDivElement;
            elem.style.display = "none";
          }}
          style={{
            background: "transparent",
            color: "whitesmoke",
            border: "none",
          }}
        >
          <AiOutlineClose />
          <ul>
            {items.map((e) => (
              <li
                className="menu-item"
                key={`item_ii_menu${items.indexOf(
                  e
                )}${new Date().getMilliseconds()}`}
              >
                <a href={e.href}>{e.desc}</a>
              </li>
            ))}
            <li>{state.email !== "" ? <Logout /> : <></>}</li>
          </ul>
        </button>
      </div>
      <button
        onClick={() => {
          let elem: HTMLDivElement = menuMobile.current as HTMLDivElement;
          elem.style.display = "block";
        }}
        style={{
          background: "transparent",
          color: "whitesmoke",
          border: "none",
        }}
      >
        <AiOutlineMenu />
      </button>
    </header>
  );
}

export default MobileMenu;
