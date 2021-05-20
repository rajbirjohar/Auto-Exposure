import React from "react";
import Head from "next/head";
import nc from "next-connect";
import Router from "next/router";
import { database } from "@/middlewares/index";
import { findTokenByIdAndType } from "@/db/index";

const ResetPasswordTokenPage = ({ valid, token }) => {
  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      password: event.currentTarget.password.value,
      password2: event.currentTarget.password2.value,
      token,
    };

    const res = await fetch("/api/user/password/reset", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) Router.replace("/");
  }

  return (
    <section className="mx-auto max-w-sm">
      <Head>
        <title>Auto Exposure | Reset</title>
      </Head>
      <h1 className="font-bold text-3xl tracking-loose mb-4">Reset Password</h1>
      {valid ? (
        <>
          <p>Enter your new password.</p>
          <form
            onSubmit={handleSubmit}
            className="space-y-2 min-w-full max-w-sm"
          >
            <div className="flex flex-col">
              <label className="font-medium">New password:</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2
                 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full"
              />
            </div>
            <div className="flex flex-col pb-4">
              <label className="font-medium">New password:</label>
              <input
                id="password2"
                name="password2"
                type="password"
                placeholder="Enter your new password"
                className="form-input border-none ring-2 ring-gray-300 focus:ring-2
                 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white rounded-sm py-1 px-3 font-medium"
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
