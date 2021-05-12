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


// const Signup = () => {
// const [signupError, setSignupError] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [passwordConfirmation, setPasswordConfirmation] = useState("");

// function handleSubmit(e) {
//   e.preventDefault();
  // fetch("/api/users", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email,
  //     password,
  //   }),
  // })
  //   .then((r) => r.json())
  //   .then((data) => {
  //     if (data && data.error) {
  //       setSignupError(data.message);
  //     }
  //     if (data && data.token) {
  //       //set cookie
  //       cookie.set("token", data.token, { expires: 2 });
  //       Router.push("/");
  //     }
  //   });
// }
//   return (
//     <Layout>
//       <form onSubmit={handleSubmit}>
//         <p>Sign Up</p>
//         <label htmlFor="email">
//           email
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             name="email"
//             type="email"
//             className="ring-2"
//           />
//         </label>

//         <br />

//         <label for="password">
//           password
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             name="password"
//             type="password"
//             pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//             title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
//             required
//             className="ring-2"
//           />
//         </label>

//         <br />

//         <input type="submit" value="Submit" />
//         {signupError && <p style={{ color: "red" }}>{signupError}</p>}
//       </form>
//     </Layout>
//   );
// };

// export default Signup;