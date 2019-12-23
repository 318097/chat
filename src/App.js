/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import config from "./config";
import "./App.scss";

import Header from "./components/layouts/Header";
import Home from "./components/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserChat from "./components/UserChat";

import { isLoggedIn, getToken, getUser } from "./authService";
import { loadContactList, setSession } from "./store/actions";
import { getSession } from "./store/selectors";

import socket, { CONNECT } from "./socket";

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.headers.common["external-source"] = "CHAT_APP";

const App = ({ session, setSession, loadContactList }) => {
  useEffect(() => {
    socket.on(CONNECT, () => console.log("Connected.."));
    if (!isLoggedIn()) return;
    const userInfo = getUser();
    setSession({ loggedIn: true, info: "LOGIN", ...userInfo });
  }, []);

  useEffect(() => {
    if (!session.loggedIn) return;
    axios.defaults.headers.common["authorization"] = getToken();
    loadContactList();
  }, [session]);

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute path="/user/:id" exact component={UserChat} />
          <Route path="/" exact render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ session: getSession(state) });

const mapDispatchToProps = { setSession, loadContactList };

export default connect(mapStateToProps, mapDispatchToProps)(App);
