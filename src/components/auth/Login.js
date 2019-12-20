/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";

import { setToken, setUser, isLoggedIn } from "../../authService";
import { getSession } from "../../store/selectors";
import { setSession } from "../../store/actions";

const Login = ({ history, setSession }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      setSession({ loggedIn: true, info: "LOGIN" });
      history.push("/home");
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const {
        data: { token, user }
      } = await axios.post(`/auth/login`, { username, password });

      setToken(token);
      setUser(user);

      setSession({ loggedIn: true, info: "LOGIN", ...user });
      history.push("/home");
    } catch (err) {
      // const { data: errorMessage } = err.response;
      // message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login">
      <h3>
        <span className="custom-header">Login</span>
      </h3>
      <Input
        className="input"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
        placeholder="Username"
      />
      <Input
        className="input"
        type="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="Password"
      />
      <br />
      <Button onClick={() => history.push("/register")}>Register</Button>
      <Button
        primary
        loading={loading}
        onClick={handleLogin}
        disabled={!username.length || !password.length}
      >
        Login
      </Button>
    </section>
  );
};

const mapStateToProps = state => ({ session: getSession(state) });

const mapDispatchToProps = { setSession };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
