import Layout from "../components/Layout";

import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/");
        }
      });
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>Login</p>
        {/* <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="ring-2 mr-4"
        /> */}
        <input
          name="username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="ring-2 mr-4"
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="ring-2 mr-4"
        />
        <input type="submit" value="Submit" />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
    </Layout>
  );
};

export default Login;
