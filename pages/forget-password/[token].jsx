import React from "react";
import Head from "next/head";
import nc from "next-connect";
import Router from "next/router";
import { database } from "@/middlewares/index";
import { findTokenByIdAndType } from "@/db/index";
import toast, { Toaster } from "react-hot-toast";

const ResetPasswordTokenPage = ({ valid, token }) => {
  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      password: event.currentTarget.password.value,
      token,
    };

    const res = await fetch("/api/user/password/reset", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 400) {
      toast.error("Password not provided!");
    }
    if (res.ok) {
      toast.success("Password has been reset!");
      Router.replace("/");
    }
  }

  return (
    <section className="mx-auto w-lg">
      <Toaster />
      <Head>
        <title>Auto Exposure | Reset</title>
      </Head>
      <h1 className="font-bold text-3xl tracking-loose mb-4">Reset Password</h1>
      {valid ? (
        <>
          <p>Enter your new password.</p>
          <form onSubmit={handleSubmit} className="space-y-2 min-w-full w-lg">
            <div className="flex flex-col">
              <label className="font-medium">New password:</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder=""
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm
                dark:bg-gray-800 dark:ring-gray-500 dark:focus:ring-2 dark:focus:ring-blue-600 mb-4"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-200 text-black rounded-sm py-2 px-3 font-medium 
              hover:bg-gray-300 hover:border-gray-300 hover:shadow-lg transition duration-200 ease-in-out
                         dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white"
            >
              Set Password
            </button>
          </form>
        </>
      ) : (
        <p>This link may have been expired</p>
      )}
    </section>
  );
};

export async function getServerSideProps(ctx) {
  const handler = nc();
  handler.use(database);
  await handler.run(ctx.req, ctx.res);
  const { token } = ctx.query;

  const tokenDoc = await findTokenByIdAndType(
    ctx.req.db,
    ctx.query.token,
    "passwordReset"
  );

  return { props: { token, valid: !!tokenDoc } };
}

export default ResetPasswordTokenPage;
