import React from "react";

import { render } from "react-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

/**
 * done:
 * about,standings,sidebar,mobilemenu,videocomponent,authroute,contactus,login,register,Card,Home,AddComment,Forum (Except +/-)
 * todo:
 * Forum (+/-,glitch with login/logout,comments,FK violation)
 */
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
