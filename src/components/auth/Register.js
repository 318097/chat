import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post("/auth/register", {
        username,
        password,
        name,
        email
      });

      setTimeout(() => setRedirect(true), 1000);
    } catch (err) {
      // const { data: errorMessage } = err.response;
      // message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (redirect) return <Redirect to="/login" />;

  return (
    <section id="register">
      <h3>
        <span className="custom-header">Register</span>
      </h3>
      <form>
        <Input
          className="input"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          placeholder="Name"
        />
        <Input
          className="input"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          placeholder="Email"
        />
        <Input
          className="input"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          placeholder="Username"
        />
        <Input
          type="password"
          className="input"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          placeholder="Password"
        />
        <br />
        <Button primary onClick={handleRegister} loading={loading}>
          Register
        </Button>
      </form>
    </section>
  );
};

export default Register;
