import Layout from "../components/Layout";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "js-cookie";

export default function Home() {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <Layout>
      <Head>
        <title>Auto Exposure</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="max-w-7xl mx-auto text-center">
        <h1 className="font-bold text-6xl my-10">Auto Exposure</h1>
        <h2 className="mb-10">Instagram but for cars.</h2>
        {loggedIn && (
          <>
            <p className="mb-2">Welcome {data.email}!</p>
            <button
              onClick={() => {
                cookie.remove("token");
                revalidate();
              }}
            >
              Logout
            </button>
          </>
        )}
        {!loggedIn && (
          <div className="flex space-x-4 max-w-sm min-w-full justify-center">
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}
