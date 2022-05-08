import React, { useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./components/About";
import AuthRoute from "./components/AuthRoute";
import Post from "./components/Card/Post";
import Footer from "./components/Footer";
import Forum from "./components/Forum";
import Home from "./components/Home";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import Standings from "./components/Standings";

import { ActionTypes, GlobalState, StateAction, StateValue } from "./Types";

export const GlobalContext = React.createContext<GlobalState>({
  state: {
    email: "",
    loggedIn: false,
  },
  dispatch: () => {},
});

function App() {
  const [state, dispatch] = useReducer<any>(
    (state: StateValue, action: StateAction) => {
      switch (action.type) {
        case ActionTypes.LOG_IN:
          localStorage.setItem("email", action.payload?.email as string);
          return {
            email: action.payload?.email as string,
            loggedIn: true,
          };
        case ActionTypes.LOG_OUT:
          localStorage.removeItem("email");
          sessionStorage.removeItem("token");
          return {
            email: "",
            loggedIn: false,
          };
        default:
          return state;
      }
    },
    {
      state: {
        email: "",
        loggedIn: true,
      },
    }
  );
  return (
    <GlobalContext.Provider
      value={{
        state: state as StateValue,
        dispatch,
      }}
    >
      <BrowserRouter>
        <MobileMenu />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/post/:id">
            <Post />
          </Route>
          <Route path="/forum">
            <AuthRoute>
              <Forum />
            </AuthRoute>
          </Route>
          <Route path="/standings">
            <Standings />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
