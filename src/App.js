import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import config from "./config";

import Header from "./components/layouts/Header";

import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserChat from "./components/UserChat";

import { loadContactList } from "./store/actions";

import socket, { CONNECT } from "./socket";

import "./App.scss";

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.headers.common["external-source"] = "CHAT_APP";

const App = ({ dispatch }) => {
  useEffect(() => {
    socket.on(CONNECT, () => console.log("Connected.."));
    dispatch(loadContactList());
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/home" exact component={Home} />
          <Route path="/user/:id" exact component={UserChat} />
          <Route path="/" exact render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    </div>
  );
};

export default connect()(App);
