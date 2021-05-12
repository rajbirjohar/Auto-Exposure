import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Layout from "../components/Layout";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/users", {
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
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //Set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/");
        }
      });
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>Sign Up</p>
        <label htmlFor="email">
          email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
          />
        </label>

        <br />

        <label for="password">
          password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
          />
        </label>

        <br />

        <label for="username">
          username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            type="username"
          />
        </label>

        <br />

        <input type="submit" value="Submit" />
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      </form>
    </Layout>
  );
};

export default Signup;
