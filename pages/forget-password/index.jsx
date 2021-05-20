import React, { useState } from "react";
import Head from "next/head";

const ForgetPasswordPage = () => {
  const [msg, setMsg] = useState({ message: "", isError: false });

  async function handleSubmit(e) {
    e.preventDefault(e);

    const body = {
      email: e.currentTarget.email.value,
    };

    const res = await fetch("/api/user/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setMsg({ message: "An email has been sent to your mailbox" });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <section className="mx-auto max-w-sm">
      <Head>
        <title>Auto Exposure | Forgot</title>
      </Head>
      <h1 className="font-bold text-3xl tracking-loose mb-4">
        Forgot Password
      </h1>
      {msg.message ? <p className="text-red-500">{msg.message}</p> : null}
      <form onSubmit={handleSubmit} className="space-y-2 min-w-full max-w-sm">
        <p>
          Don't worry. Your cars will be here when you get back. We just want to
          make sure it's really you.
        </p>
        <div className="flex flex-col pb-4">
          <label className="font-medium">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="form-input border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-blue-400 py-2 px-3 rounded-sm min-w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white rounded-sm py-1 px-3 font-medium"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ForgetPasswordPage;
