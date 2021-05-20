import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      username: e.currentTarget.username.value,
      firstname: e.currentTarget.firstname.value,
      lastname: e.currentTarget.lastname.value,
      password: e.currentTarget.password.value,
      password2: e.currentTarget.password2.value,
    };
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      toast.success("Success!");
      const userObj = await res.json();
      mutate(userObj);
    } else {
      // setErrorMsg(await res.text());
      if (res.status === 400) {
        toast.error("Missing fields!");
      }
      if (res.status === 401) {
        toast.error("Email is invalid!");
      }
      if (res.status === 402) {
        toast.error("Passwords do not match!");
      }
      if (res.status === 403) {
        toast.error("Email already in use!");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Auto Exposure | Sign up</title>
      </Head>
      <section className="mx-auto">
        <Toaster />
        <h1 className="font-bold text-3xl tracking-loose mb-4">Sign Up</h1>
        <h2>Sign up to enjoy and share your cars on Auto Exposure.</h2>
        <h3 className="text-xl font-medium my-4">Personal Infomation</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          {errorMsg ? <p className="text-red-500">{errorMsg}</p> : null}
          <div className="flex md:flex-row flex-col md:space-x-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-600">First Name</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder=""
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-600">Last Name</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder=""
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
              />
            </div>
          </div>
          <h3 className="text-xl font-medium my-4">Account Infomation</h3>
          <div className="flex flex-col">
            <label className="font-medium text-gray-600">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder=""
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-600">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder=""
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-600">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder=""
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
            />
          </div>
          <div className="flex flex-col pb-4">
            <label className="font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              placeholder=""
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <button
              className="bg-black text-white rounded-sm py-2 px-3 font-medium hover:bg-gray-800 hover:shadow-lg transition duration-200 ease-in-out"
              type="submit"
            >
              Sign up
            </button>
            <p className="text-gray-500">
              Already have an account? Sign in{" "}
              <Link href="/login">
                <a className="underline">here</a>
              </Link>
              .
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignupPage;
