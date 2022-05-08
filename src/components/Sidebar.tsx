import React, { useContext } from "react";
import { FcNext } from "react-icons/fc";
import { FaFlagCheckered } from "react-icons/fa";
import { AiFillCar, AiFillContacts, AiFillHome } from "react-icons/ai";
import { MdForum } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../App";
import Logout from "./Logout";

function Sidebar() {
  const { state } = useContext(GlobalContext);
  return (
    <div className="sidebar">
      <div className="row m-4">
        <FcNext
          style={{
            transform: "scale(5)",
          }}
        />
      </div>
      <br />
      <div className="row m-5">
        <div className="col-3"></div>
        <div className="col-6">
          <NavLink to="/">
            <AiFillHome />
          </NavLink>
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row m-5">
        <div className="col-3"></div>
        <div className="col-6">
          {state.email !== "" ? (
            <Logout />
          ) : (
            <NavLink to="/login">
              <AiFillContacts />
            </NavLink>
          )}
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row m-5">
        <div className="col-3"></div>
        <div className="col-6">
          <NavLink to="/standings">
            <AiFillCar />
          </NavLink>
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row m-5">
        <div className="col-3"></div>
        <div className="col-6">
          <NavLink to="/forum">
            <MdForum />
          </NavLink>
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row m-5">
        <div className="col-3"></div>
        <div className="col-6">
          <NavLink to="/about">
            <FaFlagCheckered />
          </NavLink>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Sidebar;
