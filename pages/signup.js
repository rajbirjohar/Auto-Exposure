import React, { useState } from "react";
import Layout from "../components/Layout";
import useForm from "../util/useForm";
import validate from "../util/validateInfo";
import Link from "next/link";

const Signup = ({ submitForm }) => {
  const [signupError, setSignupError] = useState("");
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-2 max-w-sm"
          noValidate
        >
          <h1 className="font-bold text-6xl my-10 tracking-loose">Sign Up</h1>
          <h2>
            Sign up to enjoy and share your cars on Auto Exposure.
          </h2>
          <div className="flex flex-col">
            <label className="font-medium">Username:</label>
            <input
              className="border-2 border-gray-200 py-1 px-3 rounded-md"
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
              className="border-2 border-gray-200 py-1 px-3 rounded-md"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            {signupError && <p className="text-red-500">{signupError}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Password: </label>
            <input
              className="border-2 border-gray-200 py-1 px-3 rounded-md"
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
              className="border-2 border-gray-200 py-1 px-3 rounded-md"
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
            className="bg-black rounded-md py-1 px-3 text-white font-medium"
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
