import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/index";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/");
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      toast.success("Signed in!");
      const userObj = await res.json();
      mutate(userObj);
    } else {
      // setErrorMsg("Incorrect username or password. Try again!");
      toast.error("Incorrect email or password!");
    }
  }

  return (
    <>
      <Head>
        <title>Auto Exposure | Sign in</title>
      </Head>
      <section className="mx-auto max-w-md">
        <Toaster />
        <h1 className="font-bold text-3xl tracking-loose mb-4">Sign In</h1>
        <h2>
          Log in to your account on Auto Exposure here to continue sharing and
          enjoying cars.
        </h2>
        <h3 className="text-xl font-medium my-4">Login Infomation</h3>
        <form onSubmit={onSubmit} className="space-y-2">
          {errorMsg ? <p className="text-red-600 my-4">{errorMsg}</p> : null}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder=""
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                         dark:bg-gray-800 dark:ring-gray-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col pb-4">
            <label className="font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                        dark:bg-gray-800 dark:ring-gray-500 dark:focus:ring-blue-500"
              id="password"
              type="password"
              name="password"
              placeholder=""
            />
          </div>
          <div className="flex flex-col space-y-3">
            <button
              className="bg-gray-200 text-black rounded-sm py-2 px-3 font-medium
               hover:bg-gray-300 transition hover:shadow-lg duration-200 ease-in-out
                        dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
              type="submit"
            >
              Login
            </button>
            <p className="text-gray-500 dark:text-gray-300">
              Don't have an account? Sign up{" "}
              <Link href="/signup">
                <a className="underline">here</a>
              </Link>
              .
            </p>
            <p className="text-gray-500 dark:text-gray-300">
              Did you{" "}
              <Link href="/forget-password">
                <a className="underline">forget your password?</a>
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
