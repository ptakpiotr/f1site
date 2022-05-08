import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { PopupActions } from "reactjs-popup/dist/types";
import { GlobalContext } from "../App";
import { ActionTypes } from "../Types";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { dispatch } = useContext(GlobalContext);
  const popupRef = useRef<PopupActions>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("https://f1sitebackend.azurewebsites.net/api/Account/login", {
        email,
        password,
      })
      .then((dt: AxiosResponse) => {
        sessionStorage.removeItem("token");
        dispatch({
          type: ActionTypes.LOG_IN,
          payload: {
            email,
          },
        });
        sessionStorage.setItem("token", dt.data.code);
        setEmail("");
        setPassword("");
        window.location.href = "/";
      })
      .catch((err) => {
        popupRef.current?.open();
        setTimeout(() => {
          popupRef.current?.close();
        }, 3000);
      });
  };
  return (
    <main>
      <div className="spec-div login-div">Login</div>

      <Popup ref={popupRef} className="popup" modal>
        <p className="text-dark">An error has occured while trying to log in</p>
      </Popup>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control m-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="form-control m-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" className="btn btn-success m-2" value="Login" />
      </form>
      <NavLink to="register">Click here to register</NavLink>
    </main>
  );
}

export default Login;
