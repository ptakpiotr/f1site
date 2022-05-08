import axios, { AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { NavLink } from "react-router-dom";
import { PopupActions } from "reactjs-popup/dist/types";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const popupRef = useRef<PopupActions>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password must match!");
    } else {
      axios
        .post("https://f1sitebackend.azurewebsites.net/api/Account/register", {
          email,
          password,
          confirmPassword,
        })
        .then((resp: AxiosResponse) => {
          setResponse(resp.data.code);
          popupRef.current?.open();
        })
        .catch((err) => {
          setResponse(err);
          popupRef.current?.open();
        });
    }
  };
  return (
    <main>
      <div className="spec-div register-div">Register</div>
      <Popup ref={popupRef} className="popup" modal>
        <p className="text-dark">{response}</p>
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

        <input
          className="form-control m-2"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <input type="submit" className="btn btn-success m-2" value="Register" />
      </form>
      <NavLink to="login">Click here if you have an account</NavLink>
    </main>
  );
}

export default Register;
