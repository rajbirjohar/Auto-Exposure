import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Layout from "../components/Layout";
import useForm from "../util/useForm";
import validate from "../util/validateInfo";
import Link from "next/link";

const Signup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <Layout>
      <div>
        <form
          onSubmit={handleSubmit}
          className="space-y-2 max-w-sm mx-auto"
          noValidate
        >
          <h1>Sign up to enjoy and share your cars on Auto Exposure.</h1>
          <div className="flex flex-col">
            <label className="font-medium">Username:</label>
            <input
              className="ring-2 ring-gray-200 py-1 px-3 rounded-md"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Email: </label>
            <input
              className="ring-2 ring-gray-200 py-1 px-3 rounded-md"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Password: </label>
            <input
              className="ring-2 ring-gray-200 py-1 px-3 rounded-md"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col pb-4">
            <label className="font-medium">Confirm Password: </label>
            <input
              className="ring-2 ring-gray-200 py-1 px-3 rounded-md"
              type="password"
              name="password2"
              placeholder="Confirm your password"
              value={values.password2}
              onChange={handleChange}
            />
            {errors.password2 && (
              <p className="text-red-500">{errors.password2}</p>
            )}
          </div>
          <button
            className="bg-black rounded-md py-1 px-3 text-white"
            type="submit"
            value="Submit"
          >
            Sign up
          </button>
          <span className="ml-2">
            Already have an account? Login{" "}
            <Link href="/login">
              <a className="underline">here</a>
            </Link>
            .
          </span>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;