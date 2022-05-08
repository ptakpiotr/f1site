import React, { useContext } from "react";
import { FaPowerOff } from "react-icons/fa";
import { GlobalContext } from "../App";
import { ActionTypes } from "../Types";
function Logout() {
  const { dispatch } = useContext(GlobalContext);
  const handleClick = () => {
    dispatch({
      type: ActionTypes.LOG_OUT,
    });
    alert("Logged out");
  };
  return (
    <div onClick={handleClick}>
      <FaPowerOff />
    </div>
  );
}

export default Logout;
