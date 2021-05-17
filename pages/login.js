import Layout from "../components/Layout";
import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Link from "next/link";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          Router.push("/profile");
        }
      });
  }
  return (
    <Layout>
      <section className="mx-auto max-w-7xl ">
        <form onSubmit={handleSubmit} className="space-y-2 min-w-full max-w-sm">
          <h1 className="font-bold text-3xl tracking-loose">Login</h1>
          <h2>
            Log in to your account on Auto Exposure here to continue sharing and
            enjoying cars.
          </h2>
          <div className="flex flex-col">
            <label className="font-medium">Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full"
            />
          </div>
          <div className="flex flex-col pb-4">
            <label className="font-medium">Password: </label>
            <input
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center md:flex-row flex-col space-y-3 md:space-y-0">
            <button
              className="bg-gray-200 text-black rounded-sm py-1 px-3 font-medium"
              type="submit"
              value="Submit"
            >
              Login
            </button>
            <span className="ml-2">
              Don't have an account? Sign up{" "}
              <Link href="/signup">
                <a className="underline">here</a>
              </Link>
              .
            </span>
          </div>
          {loginError && <p className="text-red-500">{loginError}</p>}
        </form>
      </section>
    </Layout>
  );
};

export default Login;
