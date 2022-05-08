import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";

function AuthRoute({ children, ...rest }: { children: JSX.Element }) {
  const [loggedIn, setLoggedIn] = useState<string | null>(
    localStorage.getItem("email")
  );
  return (
    <Route
      {...rest}
      render={() => {
        return loggedIn || sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
export default AuthRoute;
